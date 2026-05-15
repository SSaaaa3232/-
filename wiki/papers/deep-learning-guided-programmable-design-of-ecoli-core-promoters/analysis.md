---
title: "Deep learning guided programmable design of Escherichia coli core promoters - methodology analysis"
source_file: "/Users/saaaaa/Obsidian-Template/raw/articles/Deep learning guided programmable design of Escherichia coli core promoters from sequence architecture to strength control.md"
created: 2026-05-15
analysis_style: paper-methodology-reverse-engineering
---

# Deep learning guided programmable design of Escherichia coli core promoters - 方法论分析

## 项目一句话 + 方法论总结

这篇文章把 *E. coli* core promoter 设计问题拆成一个闭环工程：先构造可控、低噪声、可大规模测量的合成 promoter 数据集，再用 Transformer 学 strength map，最后用 conditional diffusion 生成目标强度序列并做实验回验。

```text
测量系统去噪
  -> 结构化突变与 barcode 建库
  -> NGS 建立 sequence-strength 数据集
  -> CNN/LSTM/Transformer 模型比较
  -> 生成模型 + Transformer 反向筛选
  -> 跨 context / 跨 gene 插拔验证
```

核心方法论不是“直接拿 genomic promoters 训练模型”，而是先把数据生成体系工程化：用固定 core promoter 架构、标准化 reporter、barcode、重复过滤和独立测试集，把 promoter strength 变成一个可学习、可设计、可验证的闭环对象。

## 研究设计决策树

| Problem                     | Options                                               | Choice                                                       | Evidence                                                                                                                   | Inference                               |
| --------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| promoter strength 难预测       | consensus motif / genome promoter / synthetic library | synthetic core promoter library                              | 原文指出 -10/-35 consensus 不可靠，genome promoter 边界和 mRNA abundance 有噪声，见 raw article:25, raw article:33                         | 作者把主要瓶颈定义为数据质量，而不是先追模型复杂度               |
| 大规模 sequence-strength 采集    | FACS-seq / MPRA / MBRS                                | MBRS                                                         | MPRA 成本和组合灵活性受限，MBRS 用 mutation + barcoding + sequencing，见 raw article:33, raw article:129                                 | 选择 MBRS 是为了把“序列-强度配对”做成可扩展数据生产流程        |
| reporter 噪声控制               | 普通 plasmid / chromosomal context / robust plasmid     | pSC101 + sfGFP/RFP ratio + BCD2 + RiboJ + PL308-RFP          | pSC101 稳定拷贝，RFP 内参，RiboJ CV 降到 0.06，PL308 RFP CV 0.046，见 raw article:99, raw article:109                                   | 先校准测量系统，避免模型学习 reporter 系统噪声            |
| core promoter 设计空间          | 随机突变全区域 / 固定架构分区变异                                    | -10/-35 energy guided + 17 bp spacer randomization           | L1/L2 显示 conserved region 粗调、spacer 细调；L4 三步构建固定 17 bp spacer，见 raw article:123, raw article:125, raw article:69           | 数据集不是纯随机库，而是由生物机制假设约束的“可学习设计空间”         |
| strength prediction 模型      | CNN / LSTM / Transformer                              | Transformer                                                  | independent test set 上 Transformer R=0.87，CNN=0.76，LSTM=0.81，MAE 最低，见 raw article:171                                      | 作者通过对照实验证明模型选择，而不是只按深度学习潮流选 Transformer |
| de novo sequence generation | WGAN-GP / conditional diffusion                       | conditional diffusion + Transformer filter                   | WGAN-GP R=0.88 但像训练集；conditional diffusion L6 R=0.93/0.95 且多样性和强度分布更均衡，见 raw article:189, raw article:203, raw article:205 | 生成端的目标从“像真序列”转成“可控强度 + 多样性 + 实验可验证”     |
| plug-and-play 验证            | 单 reporter 验证 / 多 context 多 gene 验证                   | six contexts + inducible promoter + six fluorescent proteins | 六种 surrounding sequence R>0.89、平均 R=0.93，L7 覆盖 sfGFP/RFP/CFP/BFP/OFP/YFP，见 raw article:219, raw article:229                | 作者把设计成功定义为跨环境保持梯度，而不是只在训练构型里预测准确        |

## 方法构建推演

1. **先建立可信测量底盘**  
   作者从 plasmid/reporter 噪声入手，而不是直接建库。pSC101 降低 copy-number 波动，RFP 做同 plasmid 内参，BCD2 与 RiboJ 稳定翻译和 5' UTR，PL308 优化 RFP 表达，形成强度测量底座。证据：raw article:99, raw article:109。

2. **再用小库拆 core promoter 的可设计因素**  
   L1 用 RNAP-binding energy 设计 -10/-35，发现 strength 与 energy 有 R=-0.75 但存在异常组合；L2 加入 spacer，发现 spacer 与 conserved region 交互贡献 50.25%，conserved region 负责大幅度变化，spacer 负责 fine-tuning。证据：raw article:123, raw article:125。

3. **把机制观察转成 MBRS 建库策略**  
   L4 的设计不是随机堆量，而是按 -35 mutation + spacer randomization、-10 mutation + barcode、整合进 robust plasmid 三步构建。barcode 放在 TSS 下游 20 bp，17 bp spacer 固定在 σ70 canonical architecture。证据：raw article:69, raw article:71。

4. **用 NGS 把 sequence 和 strength 绑定成训练集**  
   通过 plasmid DNA 建立 promoter-barcode 对应，通过 cDNA barcode abundance/DNA barcode abundance 计算 transcription level，并剔除多 promoter barcode 和三重复不可检测项。最终得到 112,955 条 core promoters，16,226-fold strength range。证据：raw article:129, raw article:153。

5. **模型比较服务于任务，而不是展示模型数量**  
   Transformer/CNN/LSTM 使用独立测试集比较，Transformer 在 R、MAE、KS、EMD 上最好。attention 分析显示模型关注 spacer 和长程依赖，与前面“spacer 细调”的实验观察对齐。证据：raw article:161, raw article:171, raw article:173。

6. **生成模块采用“生成-预测-筛选-实验回验”闭环**  
   作者没有相信生成模型原始输出，而是让 WGAN-GP/conditional diffusion 生成候选，再用 Transformer 预测强度，并用 filter 做 reverse selection。WGAN-GP 更像训练分布，conditional diffusion 以 strength class 做条件约束，最后实验验证。证据：raw article:177, raw article:183, raw article:191。

7. **最后验证可迁移性而不是只验证模型拟合**  
   八个 gradient-strength core promoters 被放入六种上下游 context、诱导系统、六种 fluorescent proteins 中测试。这个设计把论文结论从“模型准确”推进到“promoter 可作为 plug-and-play 工具”。证据：raw article:219, raw article:229。

## 关键实现 / 实验分析

### 1. 测量系统：先把 label 做干净

模式选择：internal reference reporter + low-copy plasmid + insulator/RBS 标准化。

作者思路：如果 strength label 本身受 plasmid copy number、5' UTR、translation initiation、resource competition 影响，模型会学习错误变量。因此他们先搭一个“低噪声测量仪器”，再谈高通量库。

证据：promoter strength 定义为 sfGFP/RFP fluorescence ratio；RiboJ 把 CV 降到 0.06；PL308 让 RFP 达到较高 fluorescence 且 CV=0.046，见 raw article:99, raw article:109。

### 2. 数据集：机制约束下的大规模组合库

模式选择：rational motif design + randomized spacer + barcode linkage。

作者思路：纯随机库难覆盖有效区域，纯 consensus 设计又解释不了 strength。L1/L2 先证明 conserved region 和 spacer 的功能分工，再把这种分工编码进 L4。最终数据集有高 diversity、低 redundancy、可测 strength range。

证据：L1 strength 与 RNAP-binding energy R=-0.75 但存在异常组合；L2 spacer-conserved interaction 贡献 50.25%；L4 最终 112,955 条、CV=0.4、16,226-fold range，见 raw article:123, raw article:125, raw article:153。

### 3. 预测模型：Transformer 用于短序列非线性依赖

模式选择：CNN/LSTM/Transformer 对照，独立测试集定胜负。

作者思路：promoter 是短序列，但 strength 不是只由局部 motif 决定，还受 spacing、composition 和 context interaction 影响。Transformer 的 global attention 和 positional encoding 对这种问题更合适。

证据：Introduction 明确 CNN/LSTM/Transformer 的能力差异；方法中给出 Transformer 8 heads、505,531 trainable parameters；结果中 Transformer R=0.87，MAE=0.212，优于 CNN/LSTM，见 raw article:29, raw article:81, raw article:171。

### 4. 生成模型：从“像训练集”转向“按目标强度生成”

模式选择：WGAN-GP baseline + conditional diffusion target control + Transformer filter。

作者思路：WGAN-GP 能学习 promoter 分布，但容易生成偏弱、接近训练集的分布；conditional diffusion 用 strength class 做条件，解决目标强度控制和多样性问题。

证据：WGAN-GP k-mer correlation >0.96 且 L5 R=0.88；conditional diffusion 分八个 strength classes，L6 目标强度实验 R=0.93，Transformer predicted vs measured R=0.95，见 raw article:187, raw article:189, raw article:191, raw article:203。

### 5. 应用验证：plug-and-play 是最终验收标准

模式选择：跨 sequence context、跨 inducible circuit、跨 protein target 验证。

作者思路：core promoter 如果只能在原始 reporter 架构中工作，工程价值有限；真正的 promoter design 平台必须在不同上下游 context 和不同 gene 中保持梯度可控。

证据：六种 surrounding sequences 中 predicted core promoter strength 与 expression R>0.89，平均 R=0.93；强 core promoters 导致 inducible system leakiness，高动态范围来自中等强度 core promoters；L7 在六种 fluorescent proteins 中显示相似梯度，见 raw article:219, raw article:229。

## 证据表

| #   | Discovery                                                             | Evidence Anchor                                   | Confidence |
| --- | --------------------------------------------------------------------- | ------------------------------------------------- | ---------- |
| 1   | 论文目标是 closed-loop core promoter engineering，而非单纯 prediction           | raw article:17, raw article:35                    | HIGH       |
| 2   | 作者把数据质量视为模型质量瓶颈                                                       | raw article:33, raw article:243                   | HIGH       |
| 3   | robust plasmid/reporter 体系是后续建库前提                                     | raw article:99, raw article:109                   | HIGH       |
| 4   | conserved region 粗调 strength，spacer 细调 strength                       | raw article:125, raw article:241                  | HIGH       |
| 5   | MBRS 的核心是 mutation + barcode + sequencing 的 sequence-strength linkage | raw article:69, raw article:129, raw article:135  | HIGH       |
| 6   | 最终训练数据集包含 112,955 core promoters，strength range 为 16,226-fold         | raw article:153                                   | HIGH       |
| 7   | Transformer 在独立测试集上优于 CNN/LSTM                                        | raw article:171                                   | HIGH       |
| 8   | conditional diffusion 比 WGAN-GP 更适合 target-strength design            | raw article:203, raw article:205, raw article:215 | HIGH       |
| 9   | 设计 promoters 在不同 surrounding sequences 中仍保持高相关                        | raw article:219                                   | HIGH       |
| 10  | 当前系统仍局限于 35 bp fixed-architecture core promoters                      | raw article:251                                   | HIGH       |

## FACTS / INFERENCES / UNKNOWNS

### FACTS

- 文章使用 MBRS 构建 synthetic core promoter dataset，最终得到 112,955 variants 和 16,226-fold expression range，见 raw article:17, raw article:153。
- 预测模型比较包含 Transformer、CNN、LSTM，Transformer 在 independent test set 上 Pearson R=0.87，见 raw article:161, raw article:171。
- 生成模型比较包含 WGAN-GP 和 conditional diffusion，conditional diffusion 生成的 L6 实验验证达到 target class R=0.93、predicted vs measured R=0.95，见 raw article:203。
- 数据和代码公开：NGS raw data 在 BioProject PRJNA1189185，平台代码在 Zenodo DOI 10.5281/zenodo.15737101，见 raw article:271。
- 研究对象是 short 35 bp core promoters with fixed architecture，见 raw article:251。

### INFERENCES

- 作者的真正创新中心是“数据生产系统 + 模型闭环”，不是单个神经网络。推理链：Introduction 批评现有 genomic/transcriptome 数据不可靠，Methods 和 Results 大量篇幅用于 reporter 去噪、MBRS、barcode 过滤、重复验证，然后才比较模型。
- Transformer 的优势来自对 spacer/conserved-region interaction 的建模能力。推理链：L2/L4 证明 spacer 与 conserved region 交互影响 strength，attention 分析显示 Transformer 对 spacer 和长程依赖敏感，独立测试集指标最好。
- conditional diffusion 的优势不只是 R 更高，而是更符合工程设计需求。推理链：WGAN-GP 更像训练分布且偏弱，conditional diffusion 通过 strength class 条件控制输出，并在多样性和强度分布上更均衡。
- plug-and-play 验证是论文说服力的关键。推理链：如果只在训练 reporter 构型中验证，结论停留在模型拟合；跨 context、inducible promoter 和多 fluorescent proteins 才能支持“programmable design”。

### UNKNOWNS

- Zenodo 代码是否完整包含训练脚本、模型权重、webserver 推理流程，本文正文只给 DOI，未在本地运行检查。
- barcode similarity 对 systematic bias 的具体影响程度仍未完全解决；作者只指出这是改进方向，见 raw article:245。
- 对非 *E. coli* 或非 σ70-like promoters 的迁移能力仍是推断；作者认为有潜力，但没有在本文实验验证，见 raw article:247。
- UP element、UTR、RBS、TFBS 等更长 regulatory architecture 的集成仍是未来工作，见 raw article:251。

## 复现路径

1. **定义最小设计对象**：先只做 35 bp σ70-like core promoter，不同时改变 UP/UTR/RBS/TFBS。  
   目的：降低组合空间，让 sequence-strength relation 可学习。

2. **搭建低噪声 reporter plasmid**：低拷贝 backbone、目标 reporter、同 plasmid reference reporter、标准 RBS、insulator、合适 reference promoter。  
   验收：跨 clone / passage CV 足够低，reference reporter 不被 strong target expression 明显拖动。

3. **用小型机制库拆变量贡献**：先做 -10/-35 energy gradient，再做 conserved region x spacer matrix。  
   验收：得到哪些区域负责 coarse tuning、哪些区域负责 fine tuning 的证据。

4. **设计大规模 synthetic library**：固定 promoter architecture；组合 -35、spacer、-10；给每个 promoter 加 barcode；把 barcode 放到尽量不影响 transcription 的位置。  
   验收：barcode-promoter 一对一比例高，library diversity 高，repeat/recombination 风险低。

5. **用 DNA/cDNA NGS 构造 label**：DNA reads 建 promoter-barcode map，cDNA barcode reads 表示 transcript abundance，用 mRNA/DNA ratio 算 promoter strength。  
   验收：biological replicates correlation、PCR cycle comparison、qPCR/fluorescence cross-check 达标。

6. **训练预测模型并做严谨对照**：至少比较 motif-local 模型、sequence-order 模型、attention 模型；保留 independent test set；报告 R、MAE、distribution metrics。  
   验收：模型不仅 overall R 高，还在分布拟合和 error 上优于 baseline。

7. **训练生成模型并接预测筛选**：先用 WGAN-GP 作为“像训练集”的 baseline，再用 conditional diffusion 做 target class control；所有生成候选由预测模型筛选后再实验验证。  
   验收：不仅看生成序列像不像，还看 target strength、diversity、strength distribution 和实验测量。

8. **做工程化验证**：把设计 promoters 放到不同上下游 context、inducible system、不同 target genes 中。  
   验收：强度梯度和 ranking 在新环境中保留，最好能显示 dynamic range 或 practical phenotype。

## 可迁移启发

- 对你的丝状真菌启动子预测任务，最值得迁移的是“先解决 label 和数据采集噪声，再谈模型”的顺序。
- 如果没有可靠 TSS / promoter activity 标签，直接上 Transformer 或 diffusion 意义有限。
- 可以迁移的工程思想：固定最小设计对象、结构化建库、barcode linkage、独立 test set、生成-预测-实验闭环、跨 context 验证。
- 不能直接迁移的部分：*E. coli* σ70 core promoter 的 -10/-35 architecture、17 bp spacer、RNAP energy matrix、pSC101 reporter context。

## 不确定点

- 本分析只基于本地 Markdown 正文，未下载 supplementary zip，也未运行 Zenodo 代码。
- 原文中的模型实现细节可能在 supplementary/code 中更完整；正文提供的参数足以理解方法论，但不足以无缝复现实验。
- 论文的“first implementation”表述来自作者讨论段，是否全领域首个需要额外文献检索验证。

## 参考链接

- 原文 source: https://academic.oup.com/nar/article/53/16/gkaf863/8246948
- 本地原文: `/Users/saaaaa/Obsidian-Template/raw/articles/Deep learning guided programmable design of Escherichia coli core promoters from sequence architecture to strength control.md`
- NGS data: BioProject PRJNA1189185
- Code: https://doi.org/10.5281/zenodo.15737101
