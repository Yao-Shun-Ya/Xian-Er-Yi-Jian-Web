# 论文回写任务清单

## T1 中文版方法章重写
- [x] `zh/sections/03_method.tex`：任务定义、预处理、MGD-Former（MiT-B2 + 融合解码器 + stride=4 论证 + ADE20K）、损失组合与“不加骨架项”取舍、四族基线（含 MGD-PriorNet）、训练配方（AMP/EMA/AdamW/warmup-cosine/增强/仅水平翻转/多尺度/TTA/5 折）、指标
- [x] `zh/figures/02_networks.tex` 同步重画
- 验收：方法与 `mgd_former.py`、`losses.py`、`specs.py` 逐项一致

## T2 中文版“工程即方法”章
- [x] `zh/sections/04_system.tex`：4.1 一致性契约；4.2 分块敏感性（新增独立节）；4.3 显存档位；4.4 流水线与实验登记；4.5 评测纪律（split_signature 判无效）；4.6 分层架构
- [x] `zh/figures/03_preprocess.tex`、`04_pairing.tex`、`05_system.tex` 更新
- [x] 新增 `zh/figures/08_tiling.tex`、`09_vram.tex`、`10_pipeline.tex`
- 验收：分块图含 7 个真实点；档位表区分实测/估算

## T3 中文版定位与前后文
- [x] `00_abstract.tex`、`01_intro.tex`、`02_related.tex`、`05_experiments.tex`、`06_results.tex`、`07_limitations.tex`、`08_conclusion.tex`、`09_declarations.tex`、`90_appendix.tex`、`main.tex`
- [x] `figures/01_overview.tex`、`06_metrics.tex`、`07_qualitative.tex` 更新
- [x] `data/results.tex` 新增宏
- 验收：引言/讨论围绕“无同协议对比 + 被忽视的方法学变量”；train_self 与 holdout 分列

## T4 英文版对齐
- [x] `en/` 全部 sections、figures、data、main.tex 与中文版一一对应
- 验收：结构、编号、宏名、图表顺序一致

## T5 双版本编译验收
- [x] zh：xelatex → bibtex → xelatex ×2（31 页，Overfull 0）
- [x] en：pdflatex → bibtex → pdflatex ×2（34 页，Overfull 0）
- [x] 检查 0 undefined references、0 undefined citations、0 缺失 bib 条目
- [x] 清理 aux/log 预览文件（保留 PDF）

## T7 追加验收项（用户确认后新增）
- [x] A1 分块敏感性一节显式声明口径：同一权重、仅改分块高度、阈值 0.7、TTA 关闭、不含后处理与 ROI；缺这句该节不成立（zh 4.2“实验口径”段 + 表注 + 图注；en 同步）
- [x] A2 0.7021 只出现在“训练集自评/同分布”栏，并注明旧训练对全部 1000 例 shuffle、无 holdout、MGD1k 官方 200 例测试名单可能在内；禁止进入独立测试表（经 `\legacyUNetSelfDice` 宏，仅出现在 `tab:self` 及表注）
- [x] A3 “该领域缺少同协议对比”判断只在引言与讨论各出现一次，其余章节不重复（zh 01:9、06:191；en 对应）
- [x] A4 中英两版章节与小节结构严格一一对应；编译后核对目录条目数一致（两版 `.toc` 均为 60 条 = 12 section + 38 subsection）

## T8 v2.3.0 平台收敛与口径修复
- [x] 删除 macOS/MPS 交付面；论文与文档改为“Windows WebUI + Linux CLI”两端
- [x] 版本 2.3.0；测试 146；TTA 8 倍改为“四翻转 × 两尺度”并真实实现
- [x] 数据内容级查重：999 例、699/150/150、`split_signature=6bdacfb0…`
- [x] 重新编译：zh 31 页 / en 34 页，0 undefined refs / 0 undefined citations / 0 Overfull

## T6 报告里程碑
- [x] 方法章完成
- [x] 分块敏感性章完成
- [x] 定位论证完成
- [x] 图表更新完成
- [x] 两版编译通过
