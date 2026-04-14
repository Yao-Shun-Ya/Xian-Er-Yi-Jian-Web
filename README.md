# 腺而易见 (XianErYiJian) — MGD 精准诊疗辅助系统

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![AI-Model](https://img.shields.io/badge/Model-U--Net%20%7C%20DeepLabV3+-red)
![Field](https://img.shields.io/badge/Field-Medical%20Imaging-orange)

> **"Bridging Clinical Insight with AI Precision."**
> 
> 本项目由 **腺而易见** 团队开发，是一个集成深度学习多模态图像分析的睑板腺功能障碍 (MGD) 诊疗辅助平台。

---

## 📖 目录
1. [设计思路与架构](#-设计思路与架构)
2. [核心技术壁垒](#-核心技术壁垒)
3. [环境预要求](#-环境预要求)
4. [一键快速开始](#-一键快速开始)
5. [开箱使用指南](#-开箱使用指南)
6. [安全性与隐私声明](#-安全性与隐私声明)
7. [资源下载](#-资源下载)

---

## 🧠 设计思路与架构

### 1. 开发背景
针对睑板腺功能障碍 (MGD) 在我国极高的患病率（54.7%~68.3%），临床诊断长期面临**手动勾勒效率低**、**主观评估差异大**等问题。

### 2. 设计哲学
- **医学合规为先**：采用 SQLite 本地持久化存储，确保敏感临床数据不出本地网络。
- **极简工程化**：基于 Next.js 15 App Router 架构，实现从前端展示到后端 Server Actions 的无缝连接。
- **沉浸式交互**：集成 Aceternity UI 动效，模拟工业级医疗终端的视觉反馈（如 x.ai 风格的文字悬停感应）。

### 3. 系统架构图


---

## 🛠️ 核心技术壁垒

- **全自动分割引擎**：底层调用训练好的 **U-Net** 与 **DeepLabV3+** 模型，实现对腺体边缘的亚像素级识别。
- **多维度量化指标**：自动计算腺体缺失率、面积比及弯曲度，直接对接临床金标准。
- **全栈响应式控制台**：支持移动端与 PC 端双模式访问，内置数据实时分析看板。

---

## 📋 环境预要求

在开始之前，请确保你的开发环境已安装：
- **Node.js**: 18.x 或更高版本
- **Package Manager**: npm (建议 9.x+)
- **Git**: 用于版本克隆
- **Python (可选)**: 若需运行推理脚本，建议使用 Python 3.9+

---

## ⚡ 一键快速开始

为了实现“开箱即用”，请在终端复制并运行以下复合命令：

```bash
# 克隆仓库并进入目录
git clone [https://github.com/your-username/xianeryijian.git](https://github.com/your-username/xianeryijian.git) && cd xianeryijian

# 一键安装依赖并初始化本地数据库环境
npm install && npm run build && npm run dev
```

---

## 🍱 开箱使用指南

### Step 1: 访问主入口
运行成功后，访问 `http://localhost:3000`。
- **英雄区**: 点击“免费试用模型”即可触发本地权重文件的下载流（需自行将模型放入 `public/file/`）。
- **反馈区**: 医生或研究员可在此提交临床使用意见。

### Step 2: 进入管理控制台
访问 `http://localhost:3000/admin`。
- **数据管理**: 实时查看、标记或删除 SQLite 数据库中的反馈记录。
- **系统状态**: 监控数据库连接状态与版本更新日志。

---

## 🔒 安全性与隐私声明

作为医疗辅助项目，本项目在设计上严格遵守数据主权逻辑：
1. **零外部泄露**：系统不集成任何第三方追踪插件。
2. **本地存储**：`feedbacks.db` 默认受 `.gitignore` 保护，不参与版本提交。
3. **模型透明**：开源所有推理前端代码，确保算法逻辑可审计。

---

## 📂 资源下载

由于 Git 不适合存储超大二进制文件，请在 **GitHub Releases** 页面手动获取以下资源并放置于对应目录：

| 资源名称 | 推荐存放目录 | 说明 |
| :--- | :--- | :--- |
| **MGD_UNet_v1.pth** | `/public/file/` | AI 模型核心权重文件 |
| **XianErYiJian_Setup.exe** | `/public/file/` | Windows 离线演示软件 |

---

## 👥 团队与贡献

- **Design**: 黄宇普 (Huang Yupu)
- **所属团队**: NSMC · XianErYiJian Team Project

如果你有任何关于医学影像分割或 Next.js 开发的建议，欢迎提交 PR。

---
© 2026 HUANG YUPU. ALL RIGHTS RESERVED.
```
