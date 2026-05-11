<div align="center">
  <h1>👁️ 腺而易见 (XianErYiJian)</h1>
  <p><b>睑板腺 MGD 智能辅助诊疗平台 - 前端网站项目 v2.0</b></p>
  
  <p>
    <a href="https://xianeryijian.icu/"><img src="https://img.shields.io/badge/Website-xianeryijian.icu-0088F8?style=for-the-badge&logo=world-wide-web&logoColor=white" alt="Website"></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-0.184.0-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js"></a>
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/badge/Version-v2.0.0-success.svg?style=for-the-badge" alt="Version">
  </p>

  <p>
    <em>专为眼科临床医生与医学影像研究人员打造的沉浸式 Web 展示平台。<br>提供美观、专业的技术白皮书展示、软件下载与学术交流一体化解决方案。</em>
  </p>
</div>

---

## 📑 目录 (Table of Contents)
1. [项目概述 (Overview)](#1-项目概述-overview)
2. [技术架构 (Technical Architecture)](#2-技术架构-technical-architecture)
3. [核心功能模块 (Features)](#3-核心功能模块-features)
4. [UI/UX 设计亮点 (Design Highlights)](#4-uiux-设计亮点-design-highlights)
5. [快速开始 (Quick Start)](#5-快速开始-quick-start)
6. [项目结构 (Project Structure)](#6-项目结构-project-structure)
7. [开发指南 (Development Guide)](#7-开发指南-development-guide)
8. [部署指南 (Deployment)](#8-部署指南-deployment)
9. [学术引用与开源声明 (Citation)](#9-学术引用与开源声明-citation)

---

## 1. 📋 项目概述 (Overview)

本项目是 **"腺而易见"** 睑板腺 MGD 智能辅助诊疗平台的 **前端展示网站，采用现代化前端技术栈构建，
提供专业的医学影像展示、技术白皮书展示、软件下载和反馈系统一体化解决方案。

🌐 **在线访问**: [https://xianeryijian.icu](https://xianeryijian.icu)

### 核心使命
- 🎯 **专业学术展示**：将复杂的医学影像 AI 技术以直观、专业的方式呈现
- 💻 **软件分发平台**：提供跨平台软件下载，支持 Win/Mac/Linux 版本
- 📄 **技术白皮书**：展示完整的技术细节与算法原理
- 🎨 **视觉设计**：科技感与医学专业度并存的 UI 设计

### 项目特点
- 基于 Next.js 16 + React 19 + TypeScript 构建
- 集成 Three.js 3D 视觉效果与 Framer Motion 动效
- Shadcn/UI 组件库 + Tailwind CSS 4.0 样式
- SQLite 数据库支持用户反馈系统
- 响应式设计，完美适配桌面端与移动端

---

## 2. 🏗️ 技术架构 (Technical Architecture)

### 技术栈组成

#### 前端核心技术
- **框架**: Next.js 16.2.3 (App Router)
- **库**: React 19.2.4
- **语言**: TypeScript 5.0+
- **样式**: Tailwind CSS 4.0
- **UI组件**: Shadcn/UI + Radix UI
- **动效**: Framer Motion + Three.js + @react-three/fiber
- **粒子效果**: tsParticles + Simplex Noise

#### 数据存储
- **数据库**: Better-sqlite3
- **缓存**: Next.js 内置静态生成 (SSG/ISR)

#### 3D & 视觉特效
- **WebGL**: Three.js + @react-three/fiber
- **粒子系统**: tsParticles
- **背景**: Vortex 背景效果
- **特效**: Canvas Reveal, Wavy Background, Sparkles

---

## 3. ✨ 核心功能模块 (Features)

### 3.1 主页展示模块
- 动态波浪背景 (Wavy Background)
- Hero 区域展示项目核心亮点
- 核心技术壁垒卡片展示
- 下载中心与软件分发
- 用户反馈表单系统

### 3.2 技术白皮书模块
- 完整的技术文档展示
- 侧边导航与滚动高亮
- 学术论文引用展示
- 演示软件下载区域
- GitHub 仓库链接

### 3.3 下载中心
- Windows 便携版下载
- Mac 版 WebUI 下载
- Linux 命令行版下载
- GitHub 仓库链接
- 文件大小与版本信息

### 3.4 用户反馈系统
- 姓名/机构信息收集
- 联系方式提交
- SQLite 本地存储
- 管理后台查看

---

## 4. 🎨 UI/UX 设计亮点 (Design Highlights)

### 4.1 视觉设计理念
- **科技蓝绿色渐变作为主色调，结合医学专业性
- 深色主题设计，减少眼部疲劳
- 卡片式布局，信息层级分明
- 动态视觉效果，增强交互体验

### 4.2 动效设计
- **首页波浪背景动画
- **悬停效果：卡片揭示效果
- **粒子系统：Vortex 背景
- **Canvas Reveal：交互特效
- **页面平滑过渡：Framer Motion

### 4.3 响应式设计
- 桌面端多列自适应布局
- 移动端单列适配
- 触摸友好的交互元素尺寸

---

## 5. 🚀 快速开始 (Quick Start)

### 环境要求
- **Node.js**: 18.17+
- **npm**: 9.0+ 或 **pnpm**: 8.0+ 或 **yarn**: 1.22+

### 本地开发

```bash
# 克隆项目仓库
git clone https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web.git
cd Xian-Er-Yi-Jian-Web

# 安装依赖
npm install

# 启动开发服务器 (端口 3000)
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器 (端口 3001)
npm start
```

启动开发服务器后，访问 [http://localhost:3000](http://localhost:3000) 即可查看网站。

🌐 **在线体验**: 也可以直接访问生产环境网站 [https://xianeryijian.icu](https://xianeryijian.icu)

---

## 6. 📁 项目结构 (Project Structure)

```
xianeryijian/
├── app/                           # Next.js App Router 目录
│   ├── page.tsx                 # 主页
│   ├── layout.tsx              # 全局布局
│   ├── globals.css             # 全局样式
│   ├── docs/                  # 白皮书页面
│   │   └── page.tsx
│   ├── admin/                 # 管理后台页面
│   │   └── page.tsx
│   ├── login/                 # 登录页面
│   │   └── page.tsx
│   ├── actions/               # Server Actions
│   │   └── feedback.ts
│   └── fonts/                 # 字体文件
├── components/                   # 组件目录
│   ├── ui/                   # Shadcn UI 组件
│   │   ├── canvas-reveal-effect.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── sparkles.tsx
│   │   ├── text-hover-effect.tsx
│   │   ├── vortex.tsx
│   │   └── wavy-background.tsx
│   └── signup-form-demo.tsx
├── lib/                       # 工具库
│   ├── db.ts                 # 数据库连接
│   ├── download.ts          # 下载功能
│   └── utils.ts             # 工具函数
├── public/                    # 静态资源
│   ├── file/                # 软件下载文件
│   │   ├── Windows.腺而易见WebUI.7z
│   │   ├── MacOS.腺而易见WebUI.7z
│   │   ├── Linux.腺而易见.7z
│   │   └── ...
│   └── ...
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.js
└── xianeryijian.db          # SQLite 数据库文件
```

---

## 7. 💻 开发指南 (Development Guide)

### 添加新页面
在 `app/` 目录下创建新的文件夹和 `page.tsx` 文件，Next.js 会自动生成路由。

### 添加新组件
在 `components/` 或 `components/ui/` 目录下创建新的组件文件。

### 数据库操作
使用 `lib/db.ts` 封装了数据库操作，用户反馈存储在 `xianeryijian.db` 中。

### 样式规范
- 使用 Tailwind CSS 类名进行样式开发
- 遵循 Shadcn/UI 的组件设计规范
- 保持与现有设计风格一致

---

## 8. 🌐 部署指南 (Deployment)

### Vercel 部署（推荐）
```bash
# 推送到 GitHub 仓库后
# 通过 Vercel Dashboard 导入项目即可自动部署
```

### Docker 部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### 传统服务器部署
```bash
# 构建
npm run build

# 启动
npm start
# 或使用 PM2
pm2 start npm --name "xianeryijian" -- start
```

---

## 9. 🎓 学术引用与开源声明 (Citation)

### 研发团队
- **网站设计与开发**: 黄宇普 (Huang Yupu)
- **Organization**: NSMC XIANERYIJIAN TEAM
- **Contact**: 2720356281@QQ.COM

### 相关仓库
- 软件工程仓库（深度学习引擎）: [MGD_Project](https://github.com/Yao-Shun-Ya/MGD_Project)
- 网站设计仓库（本项目）: [Xian-Er-Yi-Jian-Web](https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web)

### 开源协议 (License)
本项目代码基于 **MIT License** 开源。

### 免责声明
本网站及其内容仅供学术展示与软件分发平台。医疗诊断必须由具备执业资质的医师做出。
相关软件及 AI 模型输出结果仅供科研与临床辅助参考，
开发团队对任何基于本系统的直接医疗干预后果不承担法律责任。

### 如何引用
如果您在学术论文或项目中使用了本网站的设计或代码，请遵循以下格式引用：

```bibtex
@misc{huang2026xianeryijianweb,
  author = {Yupu Huang},
  title = {XianErYiJian Web Platform: Medical Imaging AI Visualization and Distribution System},
  year = {2026},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web}}
}
```

<div align="center">
  <b>🌟 如果本网站设计对您有启发，请给予项目一个 Star 🌟</b>
</div>

