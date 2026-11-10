<div align="center">
  <h1>👁️ 腺而易见 · XianErYiJian</h1>
  <p><b>睑板腺（MGD）红外影像智能分析平台 · 展示与分发网站</b></p>
  <p>
    <a href="https://xianeryijian.icu/"><img src="https://img.shields.io/badge/Website-xianeryijian.icu-0088F8?style=for-the-badge&logo=world-wide-web&logoColor=white" alt="Website"></a>
    <a href="https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web"><img src="https://img.shields.io/badge/GitHub-Xian--Er--Yi--Jian--Web-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
    <a href="https://github.com/Yao-Shun-Ya/MGD_Project"><img src="https://img.shields.io/badge/Engine-MGD__Project-success?style=for-the-badge&logo=github&logoColor=white" alt="Engine"></a>
    <img src="https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
  </p>
  <p><em>技术白皮书、软件下载、用户反馈与管理后台，全部由本仓库承载。</em></p>
</div>

---

## 1. 这个仓库是什么

**只是网站。** 深度学习引擎不在本仓库，而在独立的 [`MGD_Project`](https://github.com/Yao-Shun-Ya/MGD_Project)。

本仓库负责四件事：

1. **学术展示**：技术白皮书（中/英双语模式切换），内容与论文数值同源；
2. **软件分发**：Windows WebUI / Linux CLI 两个交付包的下载入口与说明；
3. **用户反馈**：表单收集问题与建议，落到本地 SQLite；
4. **管理后台**：登录后查看、标记、删除反馈。

> 引擎代码、模型训练与推理、`quality/` 质量门禁、CLI 全部在 `MGD_Project`；本仓库不复制引擎源码。

---

## 2. 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Next.js **16.2.3**（App Router / Turbopack） |
| UI | React **19.2.4**、TypeScript 5、Tailwind CSS 4、shadcn/Radix |
| 数据 | `better-sqlite3`（本地文件库，无外部服务） |
| 动效 | `motion` / `framer-motion`、`three` + `@react-three/fiber`、`@tsparticles/*`、`simplex-noise` |
| 校验 | `zod` |
| 测试 | Node 内置 `node:test`（4 个测试文件） |

---

## 3. 页面与功能

| 路由 | 作用 |
|---|---|
| `/` | 首页：项目介绍、核心技术、下载中心、反馈入口 |
| `/docs` | 技术白皮书（中英模式切换，含公式与图表） |
| `/downloads` | 下载页：Windows / Linux 包、演示权重说明 |
| `/login` | 管理员登录 |
| `/admin` | 反馈管理后台（查看 / 标记已读 / 删除） |
| `/api/health` | 健康检查 |

公开静态资源：

- `public/file/`：两个交付包目录与 `.7z` 压缩包；
- `public/Paper/`：中英文 LaTeX 论文稿（`zh/`、`en/`）。

---

## 4. 目录结构

```text
xianeryijian/
├── app/                    # App Router：页面、server actions、API route
│   ├── page.tsx            # 首页
│   ├── docs/page.tsx       # 白皮书
│   ├── downloads/page.tsx  # 下载页
│   ├── login/  admin/      # 登录与后台
│   ├── actions/            # server actions（auth / feedback）
│   └── api/health/         # 健康检查
├── components/             # UI 组件（docs / downloads / layout / nav / theme / ui）
├── lib/
│   ├── server/             # db / migrations / session / auth / rate-limit / repositories
│   ├── i18n/  theme/       # 国际化与主题
│   └── utils.ts  download.ts
├── scripts/                # migrate / backup-db / restore-db / ts-resolve
├── tests/                  # auth / validation / migrations / repository
├── db/migrations/          # SQL 迁移（0001_init.sql）
├── public/file/            # 交付包与压缩包
├── public/Paper/           # 中英文论文稿（LaTeX）
└── .github/workflows/ci.yml
```

---

## 5. 本地运行

```bash
npm ci
npm run dev        # http://localhost:3000
```

构建与检查：

```bash
npm run typegen     # 生成 Next 路由类型
npm run typecheck   # tsc --noEmit
npm run lint        # eslint --max-warnings 0
npm test            # node:test（4 个文件）
npm run build       # next build
npm start           # 生产模式
```

数据库：

```bash
npm run db:migrate  # 建表/升级
npm run db:backup   # 备份到 db/backups/
npm run db:restore  # 从备份恢复
```

---

## 6. 环境变量

| 变量 | 必需 | 说明 |
|---|---|---|
| `DATABASE_PATH` | 是 | SQLite 文件路径 |
| `SESSION_SECRET` | 是 | 会话签名密钥（≥32 字符） |
| `ADMIN_PASSWORD` | 是 | 管理后台口令 |
| `PORT` | 否 | 监听端口（默认 3000） |

参考 `.env.example`；本地用 `.env.local`，**不要提交**。

---

## 7. CI

`.github/workflows/ci.yml` 只有一个 `quality` job：

```
npm ci → next typegen → tsc --noEmit → eslint（当前非阻断）→ node:test → db:migrate → next build
```

> 引擎侧的 `pytest` / 门禁 / doctor 由 `MGD_Project` 自己的 CI 负责，不在本仓库运行。

---

## 8. 相关链接

- 项目官网：<https://xianeryijian.icu>
- 深度学习引擎：<https://github.com/Yao-Shun-Ya/MGD_Project>
- 前端网站：<https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web>

## 9. 许可

本仓库代码基于 **MIT**；论文、数据与模型权重的授权请分别确认。

> 医疗诊断必须由具备执业资质的医师做出。本站与所分发软件的输出仅供科研与辅助参考。
