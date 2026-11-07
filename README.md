<div align="center">
  <h1>腺而易见 · XianErYiJian</h1>
  <p><b>睑板腺（MGD）红外影像智能分析平台</b><br/>Windows WebUI · Linux CLI · 可复现研究工程</p>

  <p>
    <a href="https://xianeryijian.icu/"><img src="https://img.shields.io/badge/Website-xianeryijian.icu-0088F8?style=for-the-badge" alt="Website"></a>
    <img src="https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge" alt="Next.js">
    <img src="https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge" alt="Python">
    <img src="https://img.shields.io/badge/PyTorch-2.5.1-EE4C2C?style=for-the-badge" alt="PyTorch">
    <img src="https://img.shields.io/badge/Engine-2.3.0-success?style=for-the-badge" alt="Engine">
  </p>
</div>

---

## 1. 这是什么

本仓库包含三件相互校验的产物：

1. **展示网站**：Next.js 16 App Router 构建的学术展示与软件分发站点，包含技术白皮书、下载中心、反馈系统与管理后台。
2. **分析引擎 `mgd/`**：统一的 Python 内核，覆盖数据处理、模型、训练、推理、评估、统计与报告；Windows 提供 Gradio WebUI，Linux 提供训练/评估 CLI。
3. **论文稿 `public/Paper/`**：中英文 LaTeX 稿件、TikZ/pgfplots 图与唯一数值宏源，与引擎基线逐项对齐。

当前交付范围只有 **Windows WebUI** 与 **Linux CLI**。macOS/MPS 分支、安装脚本与依赖文件已删除，不再作为交付承诺。

## 2. 当前事实基线

| 项目 | 事实 |
|---|---|
| 引擎版本 | `2.3.0`（`mgd.__version__` 为唯一版本源） |
| 默认主干 | MGD-Former：MiT-B2 编码器 + 高分辨率融合解码器，stride=4 |
| 对照基线 | UNet / AttentionUNet / WRCANet / MGD-PriorNet |
| 数据 | 999 对影像-腺体-眼睑三元组，患者级划分 694/153/152（239/50/49 患者） |
| 默认推理 | 分块 384×768、overlap 0.25、阈值 0.7、min_area 120 |
| TTA | 关闭 / 2 倍水平翻转 / 8 倍（两尺度 × 四翻转） |
| 测试 | `mgd/tests` 146 项通过 |
| 权重状态 | 演示权重 `MGD_UNet_v1.0.0.pth` 为 `verified=false`，不得作为论文精度依据 |
| 精度结论 | 尚未注入；论文与网站均不报告未实测的 Dice/HD95 |

> 研究纪律：训练集自评（`train_self`）与独立测试集结果必须分表；缺 `split_signature` 的评估报告判为无效。

## 3. 技术架构

### 3.1 网站

- Next.js 16.2.3（App Router）、React 19.2.4、TypeScript 5、Tailwind CSS 4
- Shadcn/UI + Radix UI；Canvas / motion 动效
- SQLite（better-sqlite3，WAL）存储反馈；`db/migrations/*.sql` 管理 schema
- 单管理员口令 + HMAC-SHA256 签名会话；zod strict 校验；登录/反馈限流
- 健康检查：`GET /api/health`

### 3.2 引擎 `mgd/`

```
mgd/
├── core/
│   ├── config.py            # 唯一配置源（路径、尺寸、CLAHE）
│   ├── data/                # 配对、划分、变换、Dataset
│   ├── models/              # MGD-Former / 四基线 / 权重 manifest
│   ├── training/            # schema、引擎、损失、EMA、显存档位、run 编排
│   ├── inference/           # 模型缓存、滑窗、TTA、ROI 回退
│   ├── evaluation/          # 指标、统计检验、消融、绘图
│   ├── imaging/             # 预处理、后处理、临床形态学、可视化
│   ├── reporting/           # 单病例 HTML/CSV/PDF 报告
│   └── workflow/            # pretrain/train/finetune/eval/ablation/report
├── adapters/
│   ├── cli/                 # train / eval / pipeline / data / interactive
│   └── gradio_app/          # Windows WebUI（六个工作区）
├── requirements/            # base / cuda / cpu / ui / dev / optional
├── packaging/               # Windows 与 Linux 安装/启动脚本
└── tests/                   # 146 项契约与回归测试
```

关键契约：

- **训练—推理一致性**：训练在线变换与推理 `preprocess` 共用同一实现，逐像素容差 `1e-6`。
- **三方配对硬失败**：影像、腺体掩膜、眼睑掩膜任一缺失/重名/孤儿即终止，不静默跳过。
- **划分持久化**：`dataset_splits.json` + `split_signature`，同一文件列表复用同一划分。
- **显存档位**：6/8/12/16/24/40 GB 六档，标注“实测/估算”，档位是安全边界而非建议值。
- **评测协议**：bootstrap 1000 次 95% CI、配对 Wilcoxon + Holm；`verified=false` 权重不得转正。

## 4. 快速开始

### 4.1 网站开发

```bash
npm install
cp .env.example .env.local      # 填入 ADMIN_PASSWORD / SESSION_SECRET
npm run db:migrate
npm run dev                     # 默认 3000；PORT 可覆盖
```

常用检查：

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

### 4.2 Windows WebUI

```bat
安装依赖.bat
启动_新版UI.bat
```

安装脚本会在仓库根创建 `venv/`，按 `mgd/requirements/cuda.txt` 安装（无 NVIDIA 显卡可用 `安装依赖.bat cpu`）。启动后访问 `http://127.0.0.1:7860`。

### 4.3 Linux CLI

```bash
bash mgd/packaging/install_linux.sh          # 默认 CUDA；--cpu 切换 CPU
bash mgd/packaging/start_linux.sh           # 交互式训练控制台
```

非交互入口：

```bash
python -m mgd.adapters.cli.train_cli --help
python -m mgd.adapters.cli.eval_cli --help
python -m mgd.adapters.cli.pipeline_cli --help
python -m mgd.ablation_runner --help
python -m mgd.verify_pipeline --epochs 1 --samples 6
```

### 4.4 数据放置

```
data/
├── images/           # *.JPG / *.png
├── gland_masks/      # 与 images 同 basename
└── eyelid_masks/     # 与 images 同 basename
```

```bash
python -m mgd.adapters.cli.data_cli check
python -m mgd.adapters.cli.data_cli splits --mode holdout
```

### 4.5 权重放置

- 引擎按 `MGD_MODEL_DIR` 搜索 `<arch>/<arch>_best.pth` 与 canonical 权重。
- 演示权重 `MGD_UNet_v1.0.0.pth` 与 manifest 放入 `models_weights/` 即可被识别。
- manifest 为 `verified=false` 时，UI 会显式标注；只有经 `mgd-verify --evaluate` 且达到阈值的权重才能转正。

## 5. 论文

- 中文：`public/Paper/zh/main.tex`（xelatex）
- 英文：`public/Paper/en/main.tex`（pdflatex）
- 唯一数值宏源：`public/Paper/{zh,en}/data/results.tex`
- 文献矩阵与写作口径：`public/Paper/analysis/`

编译：

```bash
cd public/Paper/zh
xelatex -interaction=nonstopmode main.tex
bibtex main
xelatex -interaction=nonstopmode main.tex
xelatex -interaction=nonstopmode main.tex
```

验收标准：0 undefined references、0 undefined citations、图表编号连续、结果表不出现未经实测的数字。

## 6. 工程文档

- `docs/engineering/FREEZE_BASELINE.md`：冻结基线
- `docs/engineering/ARCHITECTURE_DECISION.md`：架构决策与取舍
- `docs/engineering/KNOWN_LIMITATIONS.md`：已知限制
- `docs/engineering/RUNBOOK.md`：换机与运维手册

## 7. 安全与合规

- 管理员口令仅从服务端环境变量读取；会话 Cookie 为 `HttpOnly` + `SameSite=Lax` + 生产 `Secure`。
- 管理类 Server Action 内部再次 `requireAdmin()`，不只依赖中间件。
- 反馈提交使用 zod strict schema、trim、长度上限与限流；日志不输出 PII。
- 已启用基础安全响应头并关闭 `X-Powered-By`；CSP 尚未启用。
- 本系统仅用于科研与临床辅助，不构成医疗器械注册或诊断结论。

## 8. 引用

```bibtex
@misc{huang2026xianeryijian,
  author = {Yupu Huang},
  title  = {XianErYiJian: A Reproducible MGD Segmentation and Quantification Platform},
  year   = {2026},
  howpublished = {\url{https://github.com/Yao-Shun-Ya/MGD_Project}}
}
```

## 9. 许可

`Proprietary - internal research use`。对外分发、商用或二次发布前请先与项目团队确认授权。
