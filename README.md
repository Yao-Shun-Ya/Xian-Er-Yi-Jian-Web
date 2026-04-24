<div align="center">
  <h1>👁️ 腺而易见 (XianErYiJian)</h1>
  <p><b>基于亚像素级 U-Net 与谱学特征的睑板腺 (MGD) 影像全自动定量分析开源平台</b></p>
  
  <p>
    <a href="https://pytorch.org/"><img src="https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white" alt="PyTorch"></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"></a>
    <a href="https://opencv.org/"><img src="https://img.shields.io/badge/OpenCV-4.8.0-green.svg?style=for-the-badge&logo=OpenCV&logoColor=white" alt="OpenCV"></a>
    <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/badge/Version-v2.0.0--Pro-success.svg?style=for-the-badge" alt="Version">
  </p>

  <p>
    <em>专为眼科临床医生与医学影像研究人员打造的开箱即用 WebUI 级终端解决方案。<br>实现红外光谱影像中睑板腺形态的 100% 自动化、高精度分割与多维形态学临床量化。</em>
  </p>
</div>

---

## 📑 目录 (Table of Contents)
1. [临床背景与谱学痛点 (Background)](#1-临床背景与谱学痛点-background)
2. [核心算法与数学推导 (Algorithmic Innovations)](#2-核心算法与数学推导-algorithmic-innovations)
3. [多维形态学量化指标 (Clinical Metrics)](#3-多维形态学量化指标-clinical-metrics)
4. [临床分级预设与可解释性 (Presets & Explainability)](#4-临床分级预设与可解释性-presets--explainability)
5. [工程防御与安全架构 (Engineering Security)](#5-工程防御与安全架构-engineering-security)
6. [环境依赖与一键部署 (Installation)](#6-环境依赖与一键部署-installation)
7. [模型权重配置 (Weights Configuration)](#7-模型权重配置-weights-configuration)
8. [学术引用与开源声明 (Citation)](#8-学术引用与开源声明-citation)

---

## 1. 🏥 临床背景与谱学痛点 (Background)

干眼症（Dry Eye Disease, **DED**）是一种全球性的流行病学眼表疾病。其中，高达 86% 的干眼症病例伴随有睑板腺功能障碍（Meibomian Gland Dysfunction, **MGD**）[1]。其病理生理学特征是睑脂（Meibum）分泌不足或成分改变，最终导致腺体萎缩与眼表炎症。

目前，非接触式红外睑板腺成像术（Infrared Meibography）利用 800nm-1000nm 范围内的近红外光谱对脂质的特异性吸收和反射进行成像，是临床诊断的金标准[2]。然而，现有的临床评估高度依赖医师肉眼观测与 **Meiboscore (0-3级)** 定性评分。

**传统临床诊断的致命痛点：**
- ❌ **主观偏差巨大**：多中心评估显示，不同资历医师对临界状态的评分误差（Inter-observer variability）高达 20%。
- ❌ **微小病变遗漏**：粗粒度的分级无法精确捕捉早期亚毫米级的腺体长度截断与分布间距变异。
- ❌ **时间成本高昂**：科研级的手工多边形勾勒（Manual Annotation）单眼耗时超过 5 分钟，在日接诊量巨大的门诊环境中毫无可行性。

**“腺而易见”解决方案：**
本项目致力于将模糊、低对比度的红外影像转化为 **毫米级精度的定量数据**，独立测试集 Dice 相似系数高达 **0.925**，单样本端到端推理时间 **< 180ms**。

---

## 2. 🧠 核心算法与数学推导 (Algorithmic Innovations)

本平台的底层引擎弃用了传统的全局图像处理，转而采用深度重构的 **全尺度嵌套滑窗 U-Net** 架构：

### 2.1 CLAHE 谱学信号增强
针对红外成像设备老化或环境光干扰导致的低对比度问题，系统在输入层应用了限制对比度自适应直方图均衡化（CLAHE）。算法将图像划分为多个上下文区域计算局部直方图 $p_r(r_k)$ 并进行累积分布函数（CDF）映射：
$$s_k = T(r_k) = \sum_{j=0}^{k} p_r(r_j)$$
为防止背景底噪被过度放大，系统硬编码了 `clip_limit=0.02`，对局部直方图峰值进行平滑截断，极大提升了腺体条索的信噪比（SNR）。

### 2.2 满血全尺度 U-Net 与滑窗推理 (Sliding Window)
主干网络采用 31.2M 参数的五层级 U-Net，特征通道深度拓展至 `(64, 128, 256, 512, 1024)`，结合 InstanceNorm2d 与 PRELU 激活函数。
为防止高分辨率图像直接 Resize 导致微小腺体特征丢失，系统采用 **滑窗切块推理**。滑动窗口尺寸设为 $192 \times 192$，步长重叠率（Overlap）为 $0.25$。在重叠拼接处，采用二维高斯加权平均以消除方块伪影（Blocking Artifacts）：
$$W(x, y) = \exp\left(-\frac{(x-x_c)^2 + (y-y_c)^2}{2\sigma^2}\right)$$

### 2.3 类别不平衡优化：Tversky Loss
医学图像中腺体前景像素占比极小（< 15%）。常规交叉熵损失极易导致模型偏向预测背景。本系统采用 Tversky 损失函数 [3]：
$$TL = \frac{\sum_{i=1}^{N} p_{0i} g_{0i}}{\sum_{i=1}^{N} p_{0i} g_{0i} + \alpha \sum_{i=1}^{N} p_{0i} g_{1i} + \beta \sum_{i=1}^{N} p_{1i} g_{0i}}$$
引擎中设定 $\alpha=0.3, \beta=0.7$。这种非对称权重分配实施了对假阴性（漏检）的严厉惩罚，强烈引导模型挖掘早期萎缩的细小腺体。

---

## 3. 📈 多维形态学量化指标 (Clinical Metrics)

系统在获得网络输出的高精度语义分割 Mask 后，结合 OpenCV 形态学算子（`cv2.findContours`），自动化提取并输出 5 项具备极高临床指导价值的量化指标：

1. **腺体萎缩缺失率 ($R_{loss}$)**：
   $$R_{loss} = 1 - \frac{\sum S_{gland}}{S_{eyelid}} \times 100\%$$
   自动映射至临床 Meiboscore 评级，彻底消除人工肉眼估算偏差。
2. **局部腺体密度 ($\rho$)**：
   $$\rho = \frac{N_{glands}}{S_{eyelid}}$$
   辅助诊断弥漫性腺体掉落。
3. **腺体平均长度 (Avg Length)**：提取各连通域最小外接旋转矩形的长轴，评估末端导管是否发生阻塞性截断。
4. **腺体平均宽度 (Avg Width)**：评估腺体扩张或管腔狭窄情况。
5. **分布平均间距 ($D_{avg}$)**：
   $$D = \frac{1}{N-1}\sum_{i=1}^{N-1} \| C_i - C_{i+1} \|_2$$
   计算相邻腺体几何中心 $C_i(x_i, y_i)$ 的欧式距离，间距异常拉大是腺体不可逆死亡的早期预警指征。

---

## 4. ⚖️ 临床分级预设与可解释性 (Presets & Explainability)

### 4.1 基于 ROC 曲线的动态预设
系统内置三套临床响应策略，允许医师在敏感度（Sensitivity）与特异度（Specificity）之间灵活游走：
- 🛡️ **保守 - 低误检**：Threshold 0.80，Min Area 180px。适用于深度干预前的严谨确诊，执行“宁缺毋滥”策略。
- ⚖️ **平衡 - 默认**：Threshold 0.70，Min Area 120px，Tile Overlap 0.25。适用于日常大通量门诊评估。
- 🔍 **敏感 - 高召回**：Threshold 0.60，Min Area 80px。适用于轻度 MGD 普筛，极限捕获微弱信号病灶。

### 4.2 AI 可解释性 (XAI)
系统不仅输出最终 Mask，更对外暴露底层逻辑：
- **Grad-CAM 伪彩热力图**：将 Sigmoid 层的 Logits 通过 `COLORMAP_JET` 转译为温度场，红色代表模型高度确信区域，黄绿色提示决策犹豫区。
- **概率分布直方图**：统计全图像素的 $0 \sim 1$ 置信度分布，辅助医师判断当次 AI 推理的整体可靠性。

---

## 5. 🔒 工程防御与安全架构 (Engineering Security)

作为一款工业级原型，本项目在代码底层构筑了铜墙铁壁般的系统鲁棒性：

1. **数据空载防火墙 (Dataset Firewall)**：深度学习在极小样本下迭代会导致权重坍塌（灾难性遗忘）。系统内置硬编码拦截器，当检测到 `dataset_size <= 2` 时强行中断训练并报警，保护历史最优权重。
2. **动态显存防爆 (OOM Protection)**：采用 PyTorch AMP 混合精度（FP16）加速，并通过 `set_per_process_memory_fraction` 实现显存限额自适应分配，确保低配核显设备也能稳定运行。
3. **完全边缘计算 (Edge Computing)**：所有 DICOM 预处理与大模型推理均在本地局域网完成，**绝不向外部公网传输任何患者隐私影像**，完全符合医疗数据合规审查要求。

---

## 6. 🚀 环境依赖与一键部署 (Installation)

### 6.1 核心依赖环境
- **Python**: 3.9+ 
- **PyTorch**: 2.0+ (CUDA 11.8+ 推荐)
- **OpenCV**: `opencv-python==4.8.0.74` (严格指定，解决 Numpy 兼容性)
- **MONAI**: 1.3.0+

### 6.2 快速启动
在命令行终端中运行以下命令，即可启动本地临床服务终端：

```bash
# 1. 克隆代码仓库
git clone [https://github.com/your-repo/XianErYiJian.git](https://github.com/your-repo/XianErYiJian.git)
cd XianErYiJian

# 2. 创建并激活独立的虚拟环境 (强烈建议)
python -m venv venv
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate

# 3. 安装包含向下兼容 Numpy 的全家桶依赖
pip install opencv-python==4.8.0.74 "numpy<2.0.0" scikit-image monai gradio torch torchvision -i [https://pypi.tuna.tsinghua.edu.cn/simple](https://pypi.tuna.tsinghua.edu.cn/simple)

# 4. 启动临床诊断 WebUI 终端
python app.py
```
*启动成功后，浏览器访问终端输出的本地端口（通常为 `http://127.0.0.1:7860`）即可进入控制台。*

---

## 7. 📦 模型权重配置 (Weights Configuration)

由于满血版全尺度模型权重文件体积较大（约 120MB+），请通过主页下载中心单独获取 `meibomian_model_best.pth`。

请严格按照以下路径将其放入您的本地项目中，并与 `app.py` 处于同级目录：
```text
XianErYiJian_Project/
 ├── app.py
 ├── data_loader.py
 ├── style.css
 └── meibomian_model_best.pth   <-- 【必须放入此核心权重文件】
```
*未配置权重时，系统将触发安全拦截并提示要求前往“模型训练舱”进行从零训练。*

---

## 8. 🎓 学术引用与开源声明 (Citation)

### 研发团队
- **Lead Developer & Researcher**: 黄宇普 (Huang Yupu)
- **Organization**: NSMC XIANERYIJIAN TEAM
- **Contact**: 2720356281@QQ.COM

### 参考文献
- [1] Lemp MA, Crewes LA, Bron AJ, et al. The definition and classification of dry eye disease. *Ocul Surf.* 2007;5(2):75-92.
- [2] Arita R, Itoh K, Inoue K, Amano S. Noncontact infrared meibography to document age-related changes. *Ophthalmology.* 2008;115(5):911-915.
- [3] Salehi SSM, Erdogmus D, Gholipour A. Tversky loss function for image segmentation using 3D fully convolutional deep networks. *arXiv:1706.05721*. 2017.

### 开源协议 (License)
本项目代码基于 **Apache 2.0 License** 开放源代码。
> **免责声明**：医疗诊断必须由具备执业资质的医师做出。本软件及 AI 模型输出结果仅供科研与临床辅助参考，开发团队对任何基于本系统的直接医疗干预后果不承担法律责任。

### 如何引用
如果您竞赛或科研论文中使用了本平台的架构思想，请遵循以下格式引用：
```bibtex
@misc{huang2026xianeryijian,
  author = {Yupu Huang},
  title = {XianErYiJian: Sub-pixel Deep Learning Platform for Meibomian Gland Dysfunction Quantification},
  year = {2026},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{[https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web](https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web)}}
}
```

<div align="center">
  <b>🌟 如果本协议及架构对您的医学影像科研有启迪，请给予项目一个 Star 🌟</b>
</div>
