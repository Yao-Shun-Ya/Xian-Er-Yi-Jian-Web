# 从现稿到可投稿论文：Gap 分析与新故事（2026-11 运行版）

> 目的：在不编造数字的前提下，把当前“方法稿”升级为一篇有明确增量、可被审稿人接受的论文。
> 当前 9 小时实验正在 `MGD_Project/outputs_mgd/study_9h/` 运行；本文只记录设计、假设与待填结果。

## 1. 现稿的真实 gap

现稿的定位是“统一协议下的五路线比较 + 分块敏感性”。它有三个优点：协议意识强、分块发现真实、工程可复现。但它也有三个会被审稿人直接质疑的缺口：

1. **数据不是公开基准**：现稿使用 999 例私有配对数据，审稿人无法复现；而 MGD-1K 已经是公开数据集（1000 图 / 320 患者 / 6 轮专家 Meiboscore，LipiView II），2022 年发表于 *The Ocular Surface*。
2. **划分不是患者独立**：现稿的 699/150/150 是图像级划分，同一患者的上下睑/左右眼可能跨训练与测试。MGD-1K 的官方 200 例测试清单也不是患者独立的：200 张测试图来自 166 名患者，而其余 800 张里有 326 张来自同一批患者。用官方清单训练/测试会系统性高估性能。
3. **没有临床终点**：现稿的 Meiboscore 是由分割掩膜反推的，不是专家临床分级。MGD-1K 提供 6 轮专家 Meiboscore，可以把“分割指标”与“临床分级”真正连起来。

这三点不是“再补一个实验”，而是把论文从“内部方法报告”升级为“公开基准 + 方法学发现”的机会。

## 2. 新的核心主张（建议按此排序）

1. **公开基准与患者级协议**：在 MGD-1K 上建立 patient-independent 划分（239/50/49 患者；694/153/152 图像），并公开划分文件与 assignment signature。
2. **泄漏的量化**：官方 200 例测试与常规图像级训练存在严重患者泄漏（326/800 非测试图来自测试患者；116/166 测试患者出现在患者级训练集中）。我们报告“泄漏 split vs 患者级 split”的性能差，给出可复现的泄漏审计方法。
3. **分块尺寸是被忽视的混杂变量**：同一权重仅改分块高度，Dice 可从 0.370 变到 0.655。我们提出 **Multi-Tile Ensemble (MTE)**：在 256/384/512 三个分块上平均概率，抵消单一分块的尺度偏差；这是不需要重训的推理方法。
4. **拓扑感知的细结构分割**：在腺体掩膜上使用 clDice（warmup），并用 clDice/HD95/骨架断裂率评价连续性；给出“Dice 提升不大但拓扑显著改善”的取舍。
5. **不确定性引导的人工复核**：比较多分块方差、预测熵、TTA 误差三种不确定性对“失败病例”的 AUROC，给出临床可用的 triage 规则。
6. **临床分级一致性**：用 6 轮专家 Meiboscore 评估分割→R_loss→Meiboscore 的准确率、MAE、quadratic weighted kappa；并按上/下睑分层，因为下睑在既往工作中常被排除。

## 3. 为什么这能发（目标期刊与卖点）

- **Medical Image Analysis / IEEE TMI**：如果 MTE + 不确定性 + 患者级泄漏三件事都有完整实验，属于“benchmark + methodology”论文，审稿人看重的是协议严谨与可复现，而不是又一个新的 backbone。
- **npj Digital Medicine / Computers in Biology and Medicine**：如果临床 Meiboscore 一致性与上/下睑分层结果足够强，可以走“临床可用的公开基准”路线。
- **MICCAI / MIDL**：MTE 与不确定性 triage 可以作为短文/workshop 的强卖点，先占位再扩展。

现稿的“MGD-Former 架构”不再作为第一贡献；它是五条路线之一。第一贡献是**协议、泄漏与推理方法**，这更符合当前证据。

## 4. 实验矩阵（9h 运行）

| 实验 | 模型 | 划分 | 目的 |
|---|---|---|---|
| E1 | MGD-Former (ADE20K) | patient-level 694/153/152 | 主模型 |
| E2 | UNet | patient-level | 经典基线 |
| E3 | AttentionUNet | patient-level | 注意力基线 |
| E4 | WRCANet | patient-level | 增强主干基线 |
| E5 | MGD-PriorNet | patient-level | 解剖先验基线 |
| E6 | UNet w/o clDice | patient-level | 拓扑损失消融 |
| E7 | UNet | official-200 leaky | 泄漏对照 |

评估：
- 单分块 384、TTA off：Dice/IoU/HD95/ASSD/clDice/Precision/Recall/R_loss/Meiboscore。
- TTA 8×：仅主模型与 UNet，报告增益与推理成本。
- MTE：256/384/512 三分块概率平均；与单分块、TTA 对比。
- 不确定性：多分块方差、熵、TTA 误差的 AUROC（失败定义：Dice < 0.7）。
- 临床：6 轮专家 Meiboscore 的 accuracy/MAE/QWK。
- 分层：upper vs lower eyelid。
- 泄漏：patient-level UNet vs leaky UNet 在官方 200 与 clean-official 60 图上的差。

## 5. 预期的“可发表点”

1. **泄漏审计表**（已有确定数字）：
   - 官方 200：200 图 / 166 患者；
   - 非测试 800 图中 326 图来自测试患者；
   - 患者级训练集 694 图中 355 图来自官方测试患者（116 患者）；
   - 干净官方子集仅 60 图 / 50 患者。
   这组数字本身就是一个强发现：公开基准的“官方 split”并不患者独立。
2. **MTE 的增益**（待跑）：如果 MTE 在 Dice/HD95/clDice 上稳定优于单分块 384，且不劣于 8× TTA，则它是一个低成本、可解释的新推理方法。
3. **不确定性 triage**（待跑）：如果多分块方差的 AUROC 高于熵、接近 TTA，则说明“换分块”本身就是一种廉价的不确定性来源。
4. **上/下睑差异**（待跑）：如果下睑 Dice 显著低，支持“下睑应单独报告/单独训练”的临床结论，也能解释文献中性能差异。
5. **临床 Meiboscore**（待跑）：如果 QWK ≥ 0.6–0.7，说明分割→R_loss→分级链条可用；若较低，则诚实报告“像素指标不等于临床分级”，同样是贡献。

## 6. 写作口径

- 不把 MGD-Former 写成“全面超越”；写成“在患者级协议下，五条路线的可比证据”。
- 不把 MTE 写成“新网络”；写成“针对分块混杂变量的推理端校正”。
- 不把不确定性写成“可解释性”；写成“失败病例筛查工具”，并报告 AUROC 与复核预算。
- 泄漏部分必须给出可复现的患者 ID 提取规则与 split 文件哈希。
- 所有表格区分 `patient-level test` 与 `official-200`；后者不得作为主表。

## 7. 风险与诚实声明

- 9 小时训练不足以让所有模型完全收敛；结果应标注 epoch 预算与收敛曲线，不能声称“最优”。
- WRCANet 使用梯度检查点，训练时间/显存与原始实现不同，需在附录说明。
- 官方 200 的 clean 子集只有 60 图，统计功效有限；只作为泄漏对照，不作为主结论。
- 临床 Meiboscore 是 6 轮专家分级，但仍存在标注者差异；报告 QWK 与混淆矩阵，不把单点准确率当唯一证据。

## 8. 参考与依据（新增）

- Saha et al., *The Ocular Surface* 2022（MGD-1K 数据集）。
- Li et al., *npj Digital Medicine* 2025（多中心 Meibography AI；明确指出未验证下睑、单一设备）。
- Yu et al., *Frontiers in AI* 2025（MGD-1K + 院内数据；U-Net IoU 0.72 / F1 0.82，可作为公开基线）。
- arXiv 2503.19545（tiling artifacts / feature normalization）。
- MIDL 2024 “Why is patch size important?”（patch size 的 context variability）。
- arXiv 2610.21616（uncertainty 的 decision-aware 评估；TTA 的 error-detection AUROC 优于 MC Dropout）。
- Shit et al., clDice 2021（拓扑保持损失）。
- MIDL 2024 “Structure Size as Confounder in Uncertainty Based Segmentation Quality Prediction”。
