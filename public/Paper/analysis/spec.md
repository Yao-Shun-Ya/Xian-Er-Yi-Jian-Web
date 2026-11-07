# 论文整体回写工程基线 v2.3.0 — 规格说明

> 目标：把 `public/Paper/` 下的中英文论文整体回写到 `docs/engineering/` 四份冻结文档与 `mgd/` 真实代码。
> 唯一事实源：`FREEZE_BASELINE.md`（v2.3.0）、`ARCHITECTURE_DECISION.md`、`KNOWN_LIMITATIONS.md`、`RUNBOOK.md`。
> 约束：只改 `public/Paper/`；不改 `mgd/`、`MGD_Project/`、`app/`、`components/`、`lib/`、`styles/`、`package.json`；不 git 提交；不编造数字与引用。

## 1. 已核实、必须写进正文的工程事实

| 事实 | 代码/文档依据 | 论文落点 |
|---|---|---|
| 默认主干 MGD-Former = MiT-B2 编码器 + 高分辨率融合解码器 | `core/models/mgd_former.py`；ADR §2 | 方法 §3.3 |
| MiT-B2：dims 64/128/320/512，depths 3/4/6/3，heads 1/2/5/8，sr_ratio 8/4/2/1；patch1 7×7/s4，patch2–4 3×3/s2 | `mgd_former.py::MiTConfig` | 网络结构 + 图 02 |
| 解码器：四阶段 1×1 投影到 128，自顶向下 fuse16→fuse8→fuse4（3×3+BN+GELU），输出 stride=4，最后双线性回 640×1280 | `MGDFormer.forward` | 方法 §3.3；图 02 |
| 三个深监督头：1/4、1/8、1/16，仅腺体通道，损失权重 1.0/0.5/0.25 | `mgd_former.py`；`losses.py::deep_supervision_loss` | 方法 §3.4 |
| 损失：0.4·Dice + 0.4·CE（`CombinedLoss`），clDice 0.2（前 10% 轮线性 warmup），眼睑辅助 0.25，边界项默认 0 | `MGDCompositeLoss`；`engine.py` warmup | 方法 §3.4 |
| 不单独加骨架一致性项 | ADR §3 | 方法 §3.4 主动取舍 |
| 旧四族：UNet / AttentionUNet / WRCANet / MGD-PriorNet，均可加载、可评测 | `registry.py::MODEL_NAMES` | 方法 §3.5；图 02 |
| MGD-PriorNet：FCAS 频域-对比度前端 + ASAB 各向异性条带块 + APG-DD 眼睑门控双解码器 | `mgd_prior_net.py` | 方法 §3.5 |
| 训练：AMP（仅 CUDA）、EMA 0.999（best 用 EMA 权重）、AdamW lr 1e-4、wd 1e-4、Cosine + warmup、channels_last、梯度累积、分块 384×768、水平翻转、多尺度、强度扰动 | `specs.py`、`engine.py`、`presets.py`、ADR §4 | 方法 §3.6 |
| 禁用垂直翻转：腺体走向近垂直、上下眼睑解剖不对称 | `specs.py` help 文本；ADR §4 | 方法 §3.6（给出理由） |
| TTA：关闭 / 2 倍水平翻转 / 8 倍（四翻转×两尺度）；5 折概率平均 | `specs.py::TTA_OPTIONS`；ADR §4 | 方法 §3.6；实验 §5.5 |
| 推理默认：分块 384×768、overlap 0.25、阈值 0.7、min_area 120、高斯 σ1.2、ROI 开启 | `specs.py` eval 段；`inference/service.py`；`presets.py` | 方法 §3.7；工程章 §4.2 |
| 分块敏感性（同一权重，阈值 0.7，40 例）：128→0.37，192→0.41，256→0.48，384→0.644，448→0.643，512→0.655，整图→0.593 | `KNOWN_LIMITATIONS.md` §3 | **独立成节 §4.2 + 新图 08 + 表** |
| 显存档：6/8/12/16/24/40+ GB；8 GB 实测 225.6 s/epoch、3.10 样本/秒、峰值 1.227 GB；6 GB 实测 0.89 GB、3.54 样本/秒；其余为估算 | `presets.py::TIERS`；FREEZE §9 | **§4.3 + 新图 09 + 表** |
| 划分：holdout 70/15/15（seed 42，持久化 `dataset_splits.json`）+ 5 折；`split_signature=sha256(sorted stems)` | `data/splits.py`；FREEZE §6 | §4.5；实验 §5.2 |
| 统计：bootstrap 1000 次 95% CI；配对 Wilcoxon + Holm；缺 `split_signature` 的报告无效 | `evaluation/stats.py`；FREEZE §6 | §4.5 协议性规定 |
| 评测口径：train_self 显式标注、不得进论文表格；holdout 才可作结论；旧 UNet 权重 Dice 0.7021 因数据泄漏只能作工程回归 | `KNOWN_LIMITATIONS.md` §1–2；FREEZE §9 | §5.2、§6.1、局限 |
| 流水线与登记：run_id、config.yaml 快照、env.json、metrics.jsonl、checkpoints、reference_report.json、run_result.json；阶段 pretrain/train/finetune/eval/ablation/report | `workflow/pipeline.py`；FREEZE §5；RUNBOOK §7 | **§4.4 + 新图 10** |
| 权重 manifest：sha256、输入尺寸、归一化 `scale01+clahe`、clip limit、verified、训练来源；verified=false 必须显式允许并标注 | `models/manifest.py`、`verify.py`；FREEZE §6.7 | §4.1、§4.4 |
| 一致性契约：训练变换与推理 `preprocess_path` 共用函数，逐像素 atol 1e-6；分块参数统一；三方配对硬失败 | `data/transforms.py`、`imaging/preprocess.py`、`data/pairing.py` | **§4.1 + 图 03/04** |
| 工程版本 2.3.0；146 项测试通过 | FREEZE §9 | 系统实现开头 |

## 2. 论文定位（写进摘要/引言/讨论）

核心主张不是“提出新 backbone”（SegFormer 是 2021 年工作），而是：

1. **睑板腺分割领域尚无同协议下的架构对比证据**；本文在统一预处理、统一划分、统一损失与统一推理参数下，首次系统比较 UNet / Attention U-Net / WRCANet / MGD-PriorNet / MGD-Former 五条路线。
2. **揭示被忽视的方法学变量**：分块尺寸可在同一权重下造成 0.37→0.655 的 Dice 摆幅；训练-推理一致性契约与 `split_signature` 报告纪律是可比性的前提。
3. 因此贡献排序为：协议与证据 > 方法学发现 > 架构适配（stride=4 + 预训练解决细结构与小数据冷启动）。

## 3. 文件级改动清单

### 3.1 中文版 `public/Paper/zh/`

| 文件 | 动作 |
|---|---|
| `main.tex` | 标题改为“面向细长管状结构的睑板腺分割：统一协议下的架构比较与方法学变量”；保留 ctexart fontset=windows |
| `sections/00_abstract.tex` | 重写：MGD-Former、stride=4、损失组合、分块敏感性、五路线对比、占位说明 |
| `sections/01_intro.tex` | 重写定位：三个缺口（同协议证据、隐性变量、报告纪律）+ 四条贡献；旧 UNet 定位为基线 |
| `sections/02_related.tex` | 增补 Transformer/SSM/管状结构/clDice/报告规范；保留真实引用键；删去与工程不符的“本文实现 2/4 倍翻转 TTA”等表述 |
| `sections/03_method.tex` | **整节重写**：任务定义、预处理、MGD-Former（含 RCAB 不再作为主干的说明）、损失取舍、四族基线、训练配方、TTA/集成、指标 |
| `sections/04_system.tex` | **改为“工程即方法”实质章节**：4.1 一致性契约；4.2 分块尺寸隐性影响；4.3 显存档位；4.4 流水线与实验登记；4.5 评测纪律与 split_signature；4.6 分层架构 |
| `sections/05_experiments.tex` | 重写实验矩阵：五模型主表、损失/深监督/多任务/TTA/集成/分块消融、5 折、统计检验、数据需求 |
| `sections/06_results.tex` | 表结构改为五模型；train_self 与 holdout 分列不合并；新增分块敏感性表、显存/吞吐表、统计表；全部占位 |
| `sections/07_limitations.tex` | 更新：旧权重泄漏、预训练离线降级、估算档位、单中心、像素未标定、架构对比的协议边界 |
| `sections/08_conclusion.tex` | 重写为“协议贡献 + 方法学发现 + 架构适配”三层 |
| `sections/09_declarations.tex` | 基本保留，补 MGD1k 待核验占位与权重许可 |
| `sections/90_appendix.tex` | 更新超参表为新默认值；补分块敏感性原始点、档位表、注入清单 |
| `data/results.tex` | 新增五模型宏、分块 pgf 宏、显存档宏、消融宏、统计宏；保持 `\resultsavailable=0` |
| `figures/01_overview.tex` | 重画：数据→预处理→MGD-Former→双通道→后处理；加基线下行与契约带 |
| `figures/02_networks.tex` | 重画：(a) MGD-Former（MiT 四级 + 融合解码器 + 3 辅助头）；(b) 四基线（含 RCAB、FCAS/ASAB/APG-DD） |
| `figures/03_preprocess.tex` | 改为“预处理一致性契约”图：影像路径/标签路径/分块参数统一 |
| `figures/04_pairing.tex` | 补 `split_signature`、70/15/15、5 折分支 |
| `figures/05_system.tex` | 补 workflow/pipeline、manifest verified、档位探测 |
| `figures/06_metrics.tex` | 五模型分组柱状；占位分支保留 |
| `figures/07_qualitative.tex` | 行改为 MGD-Former + 四基线；失败案例要求 |
| `figures/08_tiling.tex` | **新增**：真实数据点折线（128/192/256/384/448/512/整图），标注“同一权重、仅改分块”，384 默认 |
| `figures/09_vram.tex` | **新增**：六档柱状/表，实测与估算用不同填充，标 8 GB 实测吞吐 |
| `figures/10_pipeline.tex` | **新增**：实验流程图（数据→划分→5 折训练→评估→统计→报告） |

### 3.2 英文版 `public/Paper/en/`

逐文件与中文版**一一对应**改写，结构、编号、图表顺序、宏名完全对齐；`refs.bib` 已同步，不改条目，仅确保新引用键可解析。

## 4. 关键写作口径

- 结果表：`train_self` 与 `holdout` 必须**分列**（不同列或不同表），表头显式写“训练集自评（不代表泛化）”与“独立测试/留出集”；不得合并、不得用自评填主表。
- 分块敏感性：只写实测七个点与“同一权重、仅改分块、阈值 0.7、40 例”；默认值从 192/256 修为 384 的事实要写明；不 extrapolate。
- 显存档：8 GB 与 6 GB 标“实测”，12/16/24/40 GB 标“估算”并给外推依据；不得把估算写成实测。
- 预训练：写明“离线无缓存时随机初始化并记录 `pretrained_status`”，不得声称一定加载了 ADE20K。
- MGD1k：无正式论文则保留 `\needcheck{待核验}`，不编造 DOI/许可。
- 旧 UNet Dice 0.7021：只作为工程回归锚点，正文明确“不得作为论文独立测试性能”。
- 所有数值宏默认 `\ph`；`\resultsavailable=0` 时图 06 只渲染占位。

## 5. 验收与编译

```powershell
# 中文
cd public\Paper\zh
xelatex -interaction=nonstopmode main.tex
bibtex main
xelatex -interaction=nonstopmode main.tex
xelatex -interaction=nonstopmode main.tex

# 英文
cd ..\en
pdflatex -interaction=nonstopmode main.tex
bibtex main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

验收标准：
1. 两版均生成 PDF，无编译错误；
2. `main.log` 中 `undefined references` / `Citation ... undefined` 为 0；
3. 图表编号连续，所有 `\ref` 可解析；
4. 结果表无任何真实数字（除工程实测的吞吐/显存/分块敏感性，且注明来源）；
5. `\nocite{*}` 不产生缺失条目告警。

## 6. 明确不做

- 不改任何 Python、前端、配置文件；
- 不新增参考文献条目（现有 109 条已核验）；
- 不填写任何精度指标；
- 不做 git 提交。
