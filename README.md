<div align="center">
  <h1>👁️ 腺而易见 · XianErYiJian</h1>
  <p><b>睑板腺（MGD）红外影像智能分析平台 · 展示网站 + 分析引擎 + 论文稿</b></p>
  <p>
    <a href="https://xianeryijian.icu/"><img src="https://img.shields.io/badge/Website-xianeryijian.icu-0088F8?style=for-the-badge&logo=world-wide-web&logoColor=white" alt="Website"></a>
    <a href="https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web"><img src="https://img.shields.io/badge/GitHub-Xian--Er--Yi--Jian--Web-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
    <img src="https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
    <img src="https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
    <img src="https://img.shields.io/badge/Engine-2.3.0-success?style=for-the-badge" alt="Engine">
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
  </p>
  <p><em>研究展示、论文分发、软件下载与反馈一体化；前台与引擎共用同一套事实基线。</em></p>
</div>

---

## 📑 目录

1. [这是什么](#1-这是什么)
2. [当前事实基线（2026-11）](#2-当前事实基线2026-11)
3. [这次更新了什么](#3-这次更新了什么)
4. [技术栈](#4-技术栈)
5. [架构：网站 / 引擎 / 论文](#5-架构网站--引擎--论文)
6. [页面与功能](#6-页面与功能)
7. [快速开始：网站](#7-快速开始网站)
8. [快速开始：引擎](#8-快速开始引擎)
9. [环境变量](#9-环境变量)
10. [数据库、迁移与备份](#10-数据库迁移与备份)
11. [Docker（引擎容器）](#11-docker引擎容器)
12. [论文与数值注入](#12-论文与数值注入)
13. [仓库结构](#13-仓库结构)
14. [验证与 CI](#14-验证与-ci)
15. [安全与合规](#15-安全与合规)
16. [数据、权重与下载包](#16-数据权重与下载包)
17. [引用与许可](#17-引用与许可)

---

## 1. 这是什么

这个仓库不是单纯的 Landing Page，而是三件互相校验的产物：

1. **展示网站**：Next.js 16 App Router 构建的学术展示与软件分发站点，包含技术白皮书、下载中心、反馈系统、登录与管理后台。
2. **分析引擎 `mgd/`**：统一的 Python 内核，覆盖数据处理、模型、训练、推理、评估、统计与报告；Windows 提供 Gradio WebUI，Linux 提供训练/评估 CLI。
3. **论文稿 `public/Paper/`**：中英文 LaTeX 稿件、TikZ/pgfplots 图与唯一数值宏源；论文表格与网站白皮书读取同一组 `summary.json` 注入值。

当前交付范围只有 **Windows WebUI** 与 **Linux CLI**。macOS/MPS 分支、安装脚本与依赖文件已删除，不再作为交付承诺。

---

## 2. 当前事实基线（2026-11）

| 项目 | 事实 |
|---|---|
| 引擎版本 | `2.3.0`（`mgd.__version__` 为唯一版本源） |
| 默认主干 | MGD-Former：MiT-B2 编码器 + 高分辨率融合解码器，stride=4 |
| 对照基线 | UNet / AttentionUNet / WRCANet / MGD-PriorNet |
| 数据 | 999 对影像-腺体-眼睑三元组，患者级划分 694/153/152（239/50/49 患者） |
| 默认推理 | 分块 384×768、overlap 0.25、阈值 0.7、min_area 120 |
| TTA | 关闭 / 2 倍水平翻转 / 8 倍（两尺度 × 四翻转） |
| 测试 | `mgd/tests` **146 passed** |
| 网站构建 | `npm run build` 通过；`docs.html` 含 `0.7771 / 0.7749` |
| 论文 | 中文 34 页、英文 38 页；0 Overfull / 0 undefined refs |
| 权重状态 | 演示权重 `MGD_UNet_v1.0.0.pth` 为 `verified=false`，不得作为论文精度依据 |
| 精度结论 | 已注入 2026-11 患者级结果；不再写“待注入/未实测” |

### 2.1 2026-11 患者级实测

9 小时单次 patient-level holdout，测试集 152 图 / 49 患者；**不是 5 折，不是最终投稿数字**。

| 模型 | Dice | clDice | HD95 (px) |
|---|---:|---:|---:|
| AttentionUNet (15 ep) | **0.7771** | 0.8349 | 118.44 |
| MGD-Former (45 ep, ADE20K) | 0.7749 | 0.8156 | **68.05** |
| MGD-PriorNet (≈12 ep) | 0.7640 | 0.8539 | 154.03 |
| UNet (30 ep) | 0.7119 | **0.8531** | 148.03 |

配对 Wilcoxon（MGD-Former 减基线）：

- vs AttentionUNet：**-0.0022**，CI 跨 0，p=0.016 → 只能报告“可比”，不能宣称胜出；
- vs UNet：+0.063，p=5.4e-20 → 明确更好；
- vs MGD-PriorNet：+0.011，p=0.714 → 统计上不显著；1.5M 参数很有性价比。

关键负面/边界结果：

- **WRCANet 不进入排名**：8 GB 卡单 epoch 约 38 min，预算内只完成 1 epoch（val Dice 0.006）。
- **MTE**：Dice 0.7736 vs 单分块 0.7749（未提高），HD95 68.05 → **61.85**；边界校正，不是涨点方法。
- **8× TTA**：Dice **0.7808**，成本约 8×。
- **不确定性**：多分块方差 AUROC 0.639、熵 0.483、TTA8 1.000（受标签–信号耦合影响，不能直接当 triage 证据）。
- **临床 Meiboscore**：accuracy 0.164、MAE 1.105、**QWK 0.131**；高 Dice 没有转化为临床分级一致性。
- **上/下睑**：lower 0.7905 > upper 0.7584，与“下睑更难”的常见假设相反；必须分开报告。
- **泄漏审计**：官方 200 例来自 166 名患者；其余 800 例中 326 例同患者；患者级训练集仍含 116/166 名官方测试患者；clean-official 仅 60 图/50 患者；泄漏对照 0.7243 vs 0.6870（未观察到膨胀，但风险真实）。

---

## 3. 这次更新了什么

- **技术白皮书**：`app/docs/page.tsx` 增加 2026-11 患者级表、泄漏审计、负面结果；`docs.html` 已确认包含 `0.7771 / 0.7749`。
- **下载页措辞**：从“解压开箱即用”改为“含 6 例演示数据；完整数据/权重按 README 单独下载”，避免误导。
- **交付包**：`public/file/Windows.腺而易见WebUI.7z`（约 1.0 MB）与 `Linux.腺而易见.7z`（约 0.89 MB）重建；内含 6 例真实演示数据（3 上睑 + 3 下睑）、英文启动器、与主树一致的 `mgd` 代码。
- **启动器英文化**：Windows 为 `install_dependencies.bat` / `run_self_check.bat` / `start_webui.bat` / `start_training_cli.bat`；Linux 为 `install.sh` / `run_self_check.sh` / `start_cli.sh`。所有 `.bat` 为 ASCII + CRLF。
- **代码一致性**：主运行树与两个包的 `mgd` 代码逐文件 SHA-256 一致（95 文件，0 diff）；包与主树只差数据/权重体积。
- **论文 PDF**：`public/Paper/zh/main.pdf`（34 页）与 `en/main.pdf`（38 页）已用真实 `summary.json` 注入，0 Overfull / 0 undefined refs。
- **仓库同步**：`MGD_Project` 重置为 v2.3.0 结构（不再有 `data/win|linux|mac` 多平台目录）；网站仓库合并当前树，保留远端历史，未 force-push。

---

## 4. 技术栈

### 4.1 网站

| 层 | 选型 |
|---|---|
| 框架 | Next.js **16.2.3**（App Router） |
| UI | React **19.2.4**、TypeScript 5、Tailwind CSS 4 |
| 组件 | Shadcn/UI、Radix UI、Lucide、Tabler Icons |
| 动效/3D | Framer Motion / motion、Three.js 0.184、@react-three/fiber、tsParticles、Simplex Noise |
| 数据 | SQLite（better-sqlite3，WAL） |
| 校验 | zod 4（strict schema） |
| 认证 | 单管理员口令 + HMAC-SHA256 签名会话 |
| 部署 | Node.js ≥ 22.6；Vercel / 传统 Node / PM2 均可 |

### 4.2 引擎

- Python 3.10+；PyTorch 2.5.1；MONAI；OpenCV；Gradio（仅 Windows WebUI）。
- Windows：`mgd-ui` / `start_webui.bat`；Linux：`start_cli.sh` / `python -m mgd.adapters.cli.*`。
- 训练/推理共用同一预处理与变换契约；`num_workers=0`（MONAI 变换含 lambda，不可 pickle）。

---

## 5. 架构：网站 / 引擎 / 论文

### 5.1 网站请求链路

```
Browser
  ├─ /                    → 首页（Hero / 3D / 研究叙事）
  ├─ /docs                → 技术白皮书（2026-11 患者级结果）
  ├─ /login               → 管理员登录（限流 + 会话）
  ├─ /admin               → 反馈管理（requireAdmin）
  ├─ /api/health          → SELECT 1，返回 DB 状态
  └─ Server Actions       → feedback / auth / admin
        ↓
   lib/server/db.ts       → better-sqlite3（WAL）
        ↓
   xianeryijian.db        → feedbacks 表（迁移 0001_init.sql）
```

### 5.2 引擎链路

```
data/{images,gland_masks,eyelid_masks}
  → pairing / split（patient-level, split_signature）
  → transforms（train / val）
  → model（MGD-Former / baselines）
  → training（loss, AMP, EMA, checkpoint + manifest）
  → inference（sliding window, MTE, TTA, postprocess）
  → evaluation（Dice/IoU/HD95/ASSD/clDice, bootstrap, Wilcoxon）
  → clinical metrics（R_loss, density, length, width, spacing）
  → report（HTML / CSV / PDF）
```

### 5.3 事实同步

```
outputs_mgd/.../eval/summary.json
  ├─→ app/docs/page.tsx（白皮书数字）
  ├─→ public/Paper/{zh,en}/data/results.tex（唯一宏源）
  └─→ tools/ 报告与下载页文案
```

原则：**先有 summary.json，再有表格；没有实测的数字不写。**

---

## 6. 页面与功能

### 6.1 首页 `/`

- 波场/粒子/3D 视觉叙事，面向临床医生与研究者的第一屏解释。
- 研究流程、上下睑分层、引擎能力、下载入口。
- 响应式布局；移动端降级动效。

### 6.2 技术白皮书 `/docs`

- 任务定义、数据划分、泄漏审计、2026-11 患者级主表。
- 配对检验、MTE/TTA、不确定性、临床 QWK、上下睑分层。
- 明确标注“9 h 单次 holdout，非 5 折”；负面结果不藏。
- 论文 PDF 下载（中/英）。

### 6.3 下载中心

- `Windows.腺而易见WebUI.7z`：Windows WebUI + 6 例演示数据 + 英文启动器。
- `Linux.腺而易见.7z`：Linux CLI + 6 例演示数据 + 英文启动器。
- `MGD_UNet_v1.0.0.pth`（99.1 MB）与 manifest：演示权重，`verified=false`。
- 完整 999 例数据与训练权重不塞进包内，按 README/下载页单独获取。

### 6.4 反馈 `/` 表单 + `/admin`

- zod strict：`name` 1–100、`contact` 1–200、`message` 1–2000。
- 限流；日志不输出 PII。
- 管理后台可标记已读；所有管理 Action 内部再次 `requireAdmin()`，不只依赖路由保护。

### 6.5 健康检查 `/api/health`

```json
{ "status": "ok", "database": "ok" }
```

数据库不可用时返回 503，便于容器/反代探活。

---

## 7. 快速开始：网站

### 7.1 环境

- Node.js **≥ 22.6**（`package.json` engines）
- npm 10+（或 pnpm/yarn，仓库锁定 npm）
- 可写目录用于 SQLite

### 7.2 安装与启动

```bash
npm install
cp .env.example .env.local
# 编辑 .env.local：至少改 ADMIN_PASSWORD 与 SESSION_SECRET
npm run db:migrate
npm run dev
```

默认开发端口 3000；如需 3001：

```bash
PORT=3001 npm run dev
```

生产：

```bash
npm run build
npm run start
```

### 7.3 质量检查

```bash
npm run typecheck     # next typegen && tsc --noEmit
npm run lint          # eslint --max-warnings 0
npm test              # node --test：auth / validation / migrations / repository
npm run build         # Next 生产构建
```

> CI 中 lint 目前是 `continue-on-error`（历史 UI 组件债务）；本地仍建议清零后再提交。

### 7.4 常见问题

- **`better-sqlite3` 编译失败**：确认 Node 版本 ≥22.6，安装平台构建工具；Windows 需要 VS Build Tools。
- **登录后立刻掉线**：`SESSION_SECRET` 变更会使旧 Cookie 失效；确认生产 `Secure` + HTTPS。
- **数据库路径漂移**：生产用绝对路径 `DATABASE_PATH=/var/lib/xianeryijian/xianeryijian.db`。
- **端口占用**：`PORT=3001 npm run dev`，或 `npm run dev -- -p 3001`。

---

## 8. 快速开始：引擎

### 8.1 Windows WebUI

```bat
install_dependencies.bat
run_self_check.bat
start_webui.bat
start_training_cli.bat
```

- `install_dependencies.bat`：检测 `venv` 与依赖；已安装则跳过，不重复下载。
- `run_self_check.bat`：6 例端到端自检，预期 `[PASS]`。
- `start_webui.bat`：默认 `http://127.0.0.1:7860`。
- `start_training_cli.bat`：交互式训练 CLI。

所有 `.bat` 为 **ASCII + CRLF**；可用 `MGD_PYTHON` 指定已有 Python。

### 8.2 Linux CLI

```bash
bash install.sh          # 默认 CUDA；--cpu 切换 CPU 轮子
bash run_self_check.sh
bash start_cli.sh
```

非交互入口：

```bash
python -m mgd.adapters.cli.train_cli --help
python -m mgd.adapters.cli.eval_cli --help
python -m mgd.adapters.cli.pipeline_cli --help
python -m mgd.verify_pipeline --epochs 1 --samples 6
```

Linux 交付承诺为 **CLI only**，不安装 Gradio。当前 Windows 主机无 WSL，`.sh` 未在本机执行；需在 Linux 上跑一次 `bash run_self_check.sh` 验收。

### 8.3 数据与权重

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

权重放 `models_weights/<arch>/`；演示权重 `MGD_UNet_v1.0.0.pth` + manifest 放 `models_weights/` 即可识别。`verified=false` 会在 UI 显式标注。

---

## 9. 环境变量

| 变量 | 必填 | 默认/示例 | 说明 |
|---|---|---|---|
| `ADMIN_PASSWORD` | 是 | `change-me-before-deploy` | 单管理员口令，仅服务端读取 |
| `SESSION_SECRET` | 是 | 32 字节随机 hex | 会话 HMAC 密钥；上线必须换 |
| `DATABASE_PATH` | 否 | `./xianeryijian.db` | SQLite 文件；生产建议绝对路径 |
| `PORT` | 否 | `3001`（示例）/ `3000`（dev） | Next 监听端口 |
| `MGD_DATA_DIR` | 否 | `<root>/data` | 引擎数据目录 |
| `MGD_MODEL_DIR` | 否 | `<root>/models_weights` | 引擎权重目录 |
| `MGD_OUTPUT_DIR` | 否 | `<root>/outputs_mgd` | run 输出目录 |
| `MGD_HOST` / `MGD_PORT` | 否 | `127.0.0.1` / `7860` | Gradio WebUI |
| `MGD_PRETRAINED_DIR` | 否 | `<root>/models_weights/pretrained` | ADE20K 等预训练权重 |
| `MGD_PYTHON` | 否 | `<root>/venv/Scripts/python.exe` | 启动器使用的 Python |

生成密钥：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 10. 数据库、迁移与备份

- 引擎：`lib/server/db.ts`（better-sqlite3，WAL）；迁移由 `lib/server/migrations.ts` 执行。
- 迁移文件：`db/migrations/0001_init.sql`。
- 当前 schema：`feedbacks(id, name, contact, message, created_at, is_read)` + `idx_feedbacks_read_created`。
- 命令：

```bash
npm run db:migrate
npm run db:backup
npm run db:restore
```

- 生产建议：`DATABASE_PATH` 使用绝对路径；备份 `xianeryijian.db`、`-wal`、`-shm` 三件套，或使用 `db:backup` 的一致性快照。
- 不要把 `xianeryijian.db` 提交到 git；仓库根目录的本地库只用于开发。

---

## 11. Docker（引擎容器）

> 注意：`docker/Dockerfile.cpu` 与 `docker/Dockerfile.cuda` 构建的是 **Python 引擎/Gradio**，不是 Next.js 网站。网站部署用 Node/Vercel，不要拿这两个 Dockerfile 当网站镜像。

### 11.1 CUDA

```bash
docker build -f docker/Dockerfile.cuda -t mgd-seg:cuda .
docker run --gpus all -p 7860:7860 \
  -v /path/images:/data \
  -v /path/weights:/weights \
  -v /path/outputs:/outputs \
  mgd-seg:cuda
```

### 11.2 CPU

```bash
docker build -f docker/Dockerfile.cpu -t mgd-seg:cpu .
docker run -p 7860:7860 \
  -v /path/images:/data \
  -v /path/weights:/weights \
  -v /path/outputs:/outputs \
  mgd-seg:cpu
```

容器内环境：`MGD_HOST=0.0.0.0`、`MGD_PORT=7860`、`MGD_DATA_DIR=/data`、`MGD_MODEL_DIR=/weights`、`MGD_OUTPUT_DIR=/outputs`；非 root 用户 `mgd`（UID 10001）。

---

## 12. 论文与数值注入

- 中文：`public/Paper/zh/main.tex`（xelatex），产出 34 页 `main.pdf`。
- 英文：`public/Paper/en/main.tex`（pdflatex），产出 38 页 `main.pdf`。
- 唯一数值宏源：`public/Paper/{zh,en}/data/results.tex`；由 `summary.json` 注入，禁止手改表格数字。
- 写作口径与文献矩阵：`public/Paper/analysis/benchmark_plan.md`、`literature_matrix.md`、`spec.md`、`tasks.md`。

编译：

```bash
cd public/Paper/zh
xelatex -interaction=nonstopmode main.tex
bibtex main
xelatex -interaction=nonstopmode main.tex
xelatex -interaction=nonstopmode main.tex
```

英文把 `zh` 换成 `en`，用 `pdflatex`。验收：0 undefined references / citations、图表编号连续、结果表不出现未实测数字。

---

## 13. 仓库结构

```
xianeryijian/
├── app/
│   ├── page.tsx              # 首页
│   ├── docs/page.tsx         # 技术白皮书（2026-11 结果）
│   ├── login/page.tsx        # 管理员登录
│   ├── admin/page.tsx        # 反馈管理
│   ├── api/health/route.ts   # DB 健康检查
│   ├── actions/              # auth / feedback / admin Server Actions
│   └── fonts/ globals.css layout.tsx error.tsx
├── components/
│   ├── ui/                   # Shadcn/UI 基础组件
│   ├── canvas-reveal-effect.tsx
│   ├── sparkles.tsx
│   ├── vortex.tsx
│   ├── wave-background.tsx
│   └── ...
├── lib/
│   ├── server/
│   │   ├── auth.ts session.ts rate-limit.ts request.ts
│   │   ├── db.ts db-core.ts migrations.ts backup-core.ts
│   │   ├── repositories/
│   │   └── validation/
│   ├── shared/
│   └── download.ts utils.ts
├── db/
│   ├── migrations/0001_init.sql
│   └── backups/
├── public/
│   ├── file/                 # Windows/Linux .7z + 演示权重
│   └── Paper/{zh,en,analysis}/
├── scripts/                  # migrate / backup / restore / ts-resolve
├── tests/                    # auth / validation / migrations / repository
├── docker/                   # Dockerfile.cpu / Dockerfile.cuda（引擎）
├── docs/engineering/         # 冻结基线 / 架构决策 / 已知限制 / RUNBOOK
├── mgd/                      # Python 引擎（与 MGD_Project 同源）
├── mgd/tests/                # 146 项
├── package.json
└── next.config.ts
```

---

## 14. 验证与 CI

### 14.1 本机已验证

- `npm run build`：通过。
- `npm run typecheck`：通过。
- `npm test`：auth / validation / migrations / repository 全过。
- `python -m pytest mgd/tests -q`：**146 passed**。
- `run_self_check.bat`：**PASS**（6 例端到端）。
- `start_webui.bat`：**HTTP 200**（127.0.0.1:7860）。
- `start_training_cli.bat`：进入菜单，EOF 正常退出 0。
- `docs.html` 含 `0.7771 / 0.7749`；`public/Paper/*/main.pdf` 0 Overfull / 0 undefined refs。

### 14.2 CI

`.github/workflows/ci.yml` 双 job：

- **quality**：Node 24 → `npm ci` → `next typegen` → `tsc --noEmit` → eslint（当前非阻断）→ node tests → migrate → `next build`。
- **python-quality**：Python 3.11 → CPU torch 2.5.1 → `pip install -e ".[dev]"` → `compileall` → `pytest mgd/tests` → `mgd-doctor --json`。

CI 的环境变量使用示例值，不要复用为生产密钥。

---

## 15. 安全与合规

- 管理员口令仅从服务端环境变量读取，不进入客户端 bundle。
- 会话 Cookie：`HttpOnly` + `SameSite=Lax`；生产 `Secure`。
- 管理类 Server Action 内部再次 `requireAdmin()`，不只依赖路由/中间件。
- 反馈：zod strict、trim、长度上限、限流；日志不输出 PII。
- 响应头：`X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy`、`Permissions-Policy`、`HSTS`；关闭 `X-Powered-By`。
- CSP 尚未启用；上线前建议补 nonce/hash CSP。
- 本系统仅用于科研与临床辅助，不构成医疗器械注册或诊断结论；医疗诊断必须由执业医师做出。

---

## 16. 数据、权重与下载包

| 产物 | 大小 | 内容 |
|---|---:|---|
| `Windows.腺而易见WebUI.7z` | ~1.0 MB | Windows WebUI + 6 例演示数据 + 英文启动器 + 同源 `mgd` |
| `Linux.腺而易见.7z` | ~0.89 MB | Linux CLI + 6 例演示数据 + 英文启动器 + 同源 `mgd` |
| `MGD_UNet_v1.0.0.pth` | 99.1 MB | 演示权重，`verified=false`，不用于论文精度 |
| `MGD_UNet_v1.0.0.pth.manifest.json` | <1 KB | 权重 manifest（verified / split / seed / run_dir） |
| 完整 999 例数据 | 单独下载 | 影像 + 腺体 + 眼睑掩膜 + `dataset_splits.json` |
| 训练权重 | 单独下载 | `<arch>_best.pth` + manifest |

包内 `models_weights` 为空时 WebUI 仍可启动并训练；直接推理需放权重。包与主树只差数据/权重体积，代码逐文件 SHA-256 一致（95 文件，0 diff）。

---

## 17. 引用与许可

### 研发团队

- **Lead Developer & Researcher**: 黄宇普 (Huang Yupu)
- **Organization**: NSMC XIANERYIJIAN TEAM
- **Contact**: 2720356281@QQ.COM

### 相关仓库

- 项目官网：<https://xianeryijian.icu>
- 深度学习引擎：<https://github.com/Yao-Shun-Ya/MGD_Project>
- 前端网站：<https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web>

### 许可

本仓库代码基于 **MIT License** 开放源代码；论文、数据与模型权重的授权请单独确认。

> **免责声明**：医疗诊断必须由具备执业资质的医师做出。本软件及 AI 模型输出结果仅供科研与临床辅助参考，开发团队对任何基于本系统的直接医疗干预后果不承担法律责任。

### 引用

```bibtex
@misc{huang2026xianeryijian,
  author = {Yupu Huang},
  title  = {XianErYiJian: A Reproducible MGD Segmentation and Quantification Platform},
  year   = {2026},
  publisher = {GitHub},
  howpublished = {\url{https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web}}
}
```

<div align="center">
  <b>🌟 如果这个平台、白皮书或负面结果对您的研究有帮助，请给项目一个 Star 🌟</b>
</div>
