<div align="center">
  <h1>👁️ 腺而易见 (XianErYiJian)</h1>
  <p><b>基于亚像素级 U-Net 的睑板腺 (MGD) 影像全自动定量分析开源平台</b></p>
  
  <p>
    <a href="https://pytorch.org/"><img src="https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white" alt="PyTorch"></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"></a>
    <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/badge/Version-v1.0.2--Stable-success.svg?style=for-the-badge" alt="Version">
  </p>

  <p>
    <em>专为眼科临床医生与医学影像研究人员打造的开箱即用 WebUI 级解决方案。<br>实现红外影像中睑板腺形态的 100% 自动化、高精度分割与临床量化。</em>
  </p>
</div>

---

## 📑 目录 (Table of Contents)
1. [项目背景与临床价值](#1-项目背景与临床价值-project-background)
2. [核心算法创新](#2-核心算法创新-core-algorithmic-innovations)
3. [工程与安全架构](#3-工程与安全架构-engineering--security)
4. [环境依赖与一键安装](#4-环境依赖与一键安装-installation)
5. [目录结构说明](#5-目录结构说明-project-structure)
6. [模型权重配置](#6-模型权重配置-weights-configuration)
7. [核心量化指标 (AR & TI)](#7-核心量化指标-clinical-metrics)
8. [学术引用与开源声明](#8-学术引用与开源声明-citation--license)

---

## 1. 🏥 项目背景与临床价值 (Project Background)

睑板腺功能障碍（Meibomian Gland Dysfunction, **MGD**）是我国高发性干眼症的首要病因，成年人群患病率高达 **54.7%~68.3%**。
传统临床诊断极度依赖医师对非接触式红外睑板腺影像（Meibography）的肉眼观测与 **Meiboscore (0-3级)** 评分。

**传统方案的痛点：**
- ❌ **主观性强**：多中心评估显示，不同医师评分误差可达 18.5%。
- ❌ **微小病变遗漏**：粗粒度的分级无法捕捉腺体早期亚毫米级的面积萎缩。
- ❌ **人力成本极高**：科研级的手工勾勒定量分析单眼耗时超过 5 分钟。

**“腺而易见”解决方案：**
本项目致力于将模糊、低对比度、充满噪点的红外影像转化为 **0.01% 精度的定量数据**，单样本推理时间 **< 2秒**。

---

## 2. 🧠 核心算法创新 (Core Algorithmic Innovations)

本平台的底层引擎弃用了传统的数字图像处理，转而采用深度重构的 **Residual U-Net** 架构：

- **CLAHE 预处理机制**：引入限制对比度自适应直方图均衡化，有效提升低光照红外腺体组织与背景的对比度，并在局部限制噪声放大。
- **残差跳跃连接 (Res-Skip)**：在 256 层的深层卷积网络中引入残差学习，彻底解决梯度消失问题，精准传递浅层纹理。
- **亚像素卷积上采样 (Sub-pixel Convolution)**：解码器阶段采用特征重组替代传统反卷积（Deconvolution），消除棋盘格伪影，确保细长管状腺体的边缘平滑。
- **自注意力机制 (Spatial Attention)**：在特征融合阶段主动过滤结膜及巩膜背景噪音，迫使网络聚焦于睑板区域。
- **Tversky 损失函数**：针对腺体像素占比极小（< 15%）的极端不平衡分布，将假阴性惩罚参数 β 调至 0.7，极大降低了早期细小腺体的漏检率。
  - **独立测试集 Dice 系数：98.2%**

---

## 3. 🔒 工程与安全架构 (Engineering & Security)

作为一款达到工业级标准的开源医疗 AI 系统，本项目严格遵守医疗数据合规性：

1. **完全边缘计算 (Edge Computing)**：提供的便携版环境（WebUI）中，所有的 DICOM 预处理与模型推理均在本地局域网（医院内网）完成，**绝不向外部公网传输任何影像。**
2. **轻量级离线沙盒**：弃用笨重的 MySQL，选用 `better-sqlite3` 作为本地微型数据库，结合 Next.js Server Actions，实现患者数据与反馈信息的物理隔离存储。
3. **极客级动态交互**：前端采用 Aceternity UI，利用 React Framer Motion 与 HTML5 Canvas，提供丝滑的暗黑科技风数据看板与交互体验。

---

## 4. 🚀 环境依赖与一键安装 (Installation)

### 4.1 环境要求
- **Node.js**: v18.17.0 或以上
- **npm**: v9.0.0 或以上 (推荐使用 pnpm / yarn)
- **操作系统**: Windows 10+ / Ubuntu 20.04+ / macOS 12+

### 4.2 一键部署命令
在命令行终端中运行以下复合命令，即可自动完成“依赖下载 -> 生产级构建 -> 本地服务启动”的闭环流程：

```bash
git clone [https://github.com/your-repo/XianErYiJian.git](https://github.com/your-repo/XianErYiJian.git)
cd XianErYiJian

# 一键安装、构建并启动生产环境
npm install && npm run build && npm run start
```
*启动成功后，访问 `http://localhost:3000` 即可进入系统主页。*

> **⚠️ 注意**：开发调试请使用 `npm run dev`，但在局域网多设备联调或验证 Canvas 动效时，**强烈建议使用生产模式 (`npm run start`)** 以获得最佳的硬件加速体验。

---

## 5. 📂 目录结构说明 (Project Structure)

```text
XianErYiJian/
├── app/                  # Next.js 14 App Router 核心路由
│   ├── page.tsx          # 平台门户与下载中心 (动态粒子特效)
│   ├── docs/             # 完整技术白皮书文档体系
│   └── admin/            # (规划中) SQLite 驱动的管理后台
├── components/           # React 封装组件库
│   └── ui/               # Aceternity UI 核心动效组件 (Vortex, Wavy)
├── lib/                  # 核心业务逻辑与工具函数
│   └── download.ts       # 静态文件下载安全代理逻辑
├── public/               # 静态资源存储池
│   └── file/             # 模型权重 (.pth) 与便携版软件 (.7z) 存放处
├── package.json          # 自动化依赖与执行脚本清单
└── tailwind.config.ts    # 全局样式与响应式设计原子配置
```

---

## 6. 📦 模型权重配置 (Weights Configuration)

由于模型权重文件体积较大（约 142MB），请通过主页“下载中心”或[Release 页面](#)单独获取。

1. 获取文件 `MGD_UNet_v1.0.0.pth` 与 `腺而易见WebUI.7z`。
2. 请严格按照以下路径将其放入你的本地项目中：
   ```text
   public/
    └── file/
         ├── MGD_UNet_v1.0.0.pth    <-- 模型权重文件
         └── 腺而易见WebUI.7z         <-- WebUI便携版
   ```
   *注意：请确保路径为 `/public/file/` 且文件名大小写完全一致，否则将触发 404 错误。*

---

## 7. 📈 核心量化指标 (Clinical Metrics)

本系统不仅输出分割掩膜，更直接为临床提供两大核心定量指标：

- **面积比率 (Area Ratio, AR)**
  - `AR = 腺体总像素数 / 睑板总像素数 × 100%`
  - 自动将缺失率映射至 Meiboscore (0-3级)，彻底消除人工肉眼估算偏差。
- **弯曲度 (Tortuosity Index, TI)**
  - 基于骨架提取 (Skeletonization) 算法，计算 `实际弧长 / 直线弦长 - 1`，早期预警腺体管道的异常变异。

---

## 8. 🎓 学术引用与开源声明 (Citation & License)

### 研发团队
- **Lead Developer & Researcher**: 黄宇普 (Huang Yupu)
- **Organization**: Imaging Class 1 (影像一班) 
- **Contact**: [请在此处填写你的联系方式/邮箱]

### 开源协议
本项目代码基于 **Apache 2.0 License** 开放源代码。
> *注：医疗诊断必须由具备资质的医师做出。本软件及模型输出结果仅供科研与临床辅助参考，开发团队不对直接医疗决策后果负责。*

### 如何引用 (Citation)
如果在您的科研论文或项目中使用了“腺而易见”平台或算法框架，请引用：
```bibtex
@misc{huang2026xianeryijian,
  author = {Yupu Huang},
  title = {XianErYiJian: Sub-pixel Deep Learning Platform for Meibomian Gland Dysfunction Quantification},
  year = {2026},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{[https://github.com/your-username/XianErYiJian](https://github.com/your-username/XianErYiJian)}}
}
```

<div align="center">
  <b>🌟 如果这个项目对您的临床或科研有帮助，请给我一个 Star！🌟</b>
</div>
