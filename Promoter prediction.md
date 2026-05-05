---
type: concept
title: "Promoter prediction"
complexity: intermediate
domain: "synthetic biology, fungal genomics, machine learning"
aliases:
  - 丝状真菌启动子预测
  - fungal promoter prediction
created: 2026-05-05
updated: 2026-05-05
tags:
  - concept
  - promoter
  - fungi
  - machine-learning
  - genomics
status: seed
related:
  - "[[llm-from-scratch]]"
sources:
  - "https://fungi.ensembl.org/"
  - "https://fungidb.org/"
  - "https://mycocosm.jgi.doe.gov/"
  - "https://www.ncbi.nlm.nih.gov/datasets/"
  - "https://epd.expasy.org/epd/"
---

# Promoter prediction

## 一句话

训练丝状真菌启动子预测模型，底层流程和 `llm-from-scratch` 训练小 GPT 很像：都是把序列变成数字，让模型反复做题、计算错误、更新参数。区别是 GPT 预测“下一个字符”，启动子模型预测“一段 DNA 是不是启动子”。

## 和 GPT 训练流程的对应关系

| GPT 小模型 | 启动子预测模型 |
|---|---|
| 文本 | DNA 序列 |
| tokenizer 把文字变数字 | DNA 编码把 A/T/C/G/N 变数字 |
| Transformer 预测下一个字符 | CNN/Transformer 判断是否为 promoter |
| train.py 训练下一个 token | train.py 训练二分类 |
| generate.py 生成文字 | predict.py 预测 promoter 概率 |
| checkpoint 保存模型大脑 | checkpoint 保存生物预测模型 |

对应到代码结构：

```text
model.py    模型的大脑结构：CNN / Transformer / DNABERT-like classifier
train.py    训练流程：读数据、编码 DNA、喂给模型、算 loss、更新参数
predict.py  推理流程：输入新 DNA 序列，输出 promoter 概率
```

## 第一版任务定义

不要一开始就做“万能启动子模型”。第一版建议定义成一个清楚的二分类问题：

```text
输入：固定长度 DNA 序列，例如 1000 bp
输出：这段序列是不是启动子
标签：1 = promoter，0 = non-promoter
```

训练数据格式可以先做成 CSV：

```csv
sequence,label,species,gene_id,source,split
ATGCGTAC...,1,Aspergillus_nidulans,AN0001,upstream_1000,train
CGTTAGCA...,0,Aspergillus_nidulans,neg_0001,intergenic,val
```

## 训练集从哪里来

### 1. 实验验证 promoter

这是质量最高的数据。

来源包括：

- EPD / Eukaryotic Promoter Database：实验定义的真核 promoter 和 TSS 数据。  
  https://epd.expasy.org/epd/
- 文献中的 fungal promoter、constitutive promoter、inducible promoter、synthetic promoter。
- 具体物种论文，例如 Aspergillus、Neurospora、Fusarium、Trichoderma 相关启动子研究。

优点：

```text
标签可信度高，适合做高质量测试集。
```

缺点：

```text
数量通常少，尤其是丝状真菌领域，不一定够训练深度模型。
```

### 2. 从基因组注释中构造 putative promoter

这是实际训练中更常用的大规模数据来源。

基本假设：

```text
已知基因起始位置附近的上游区域，通常包含启动子。
```

如果有 TSS：

```text
TSS 上游 1000 bp = promoter 正样本
```

如果没有 TSS，只能先退一步：

```text
ATG 起始密码子上游 1000 bp = putative promoter 正样本
```

注意：这里叫 `putative promoter`，意思是“推测启动子”，不是 100% 实验证明。

可用数据源：

- Ensembl Fungi：真菌基因组、注释、上游序列。  
  https://fungi.ensembl.org/
- FungiDB：面向真菌和卵菌的综合数据库。  
  https://fungidb.org/
- JGI MycoCosm：大量真菌基因组和注释。  
  https://mycocosm.jgi.doe.gov/
- NCBI Datasets：下载 genome FASTA、GFF3 注释、蛋白、转录本。  
  https://www.ncbi.nlm.nih.gov/datasets/

## 正样本怎么构造

需要两个文件：

```text
genome.fa       物种基因组序列
annotation.gff3 基因坐标注释
```

正样本提取规则：

```text
对每个 protein-coding gene：
  如果基因在 + 链：
    promoter = gene_start 上游 1000 bp
  如果基因在 - 链：
    promoter = gene_end 下游 1000 bp，并取反向互补序列
```

需要过滤：

```text
长度不足 1000 bp 的序列
含 N 太多的序列
和相邻基因重叠太多的上游区域
重复序列比例过高的片段
```

推荐第一版窗口：

```text
上游 1000 bp
```

后续可以比较：

```text
500 bp
1000 bp
1500 bp
2000 bp
```

## 负样本怎么构造

负样本比正样本更容易出问题。

不要随便随机抽。否则模型可能学到错误规律，例如只学会区分 GC 含量、重复序列、染色体位置，而不是启动子特征。

可选负样本：

```text
1. CDS 区域片段
2. 远离基因起始位点的 intergenic 区域
3. downstream 区域
4. shuffled promoter sequence
5. GC 含量匹配的随机区域
```

第一版建议：

```text
正样本：基因上游 1000 bp
负样本：远离任何 gene start 至少 2000 bp 的 intergenic 1000 bp
比例：1:1
```

更严谨版本：

```text
负样本 GC 含量分布尽量匹配正样本
每个物种内部单独采负样本
避免同一基因附近区域同时出现在 train 和 test
```

## 推荐数据规模

粗略判断：

```text
几百条：玩具实验，只能验证代码
几千条：可以训练简单 CNN
几万条：可以做比较像样的模型
几十万条：才适合较大的 Transformer
```

一个丝状真菌基因组通常有几千到一万多个基因。一个物种可以构造几千到一万条候选 promoter。多个物种合并后，可以得到几万条样本。

推荐第一批物种方向：

```text
Aspergillus
Fusarium
Neurospora
Trichoderma
Penicillium
```

## Colab 上的完整路线

### Step 1：选物种

先选 3-5 个丝状真菌物种，不要一开始全抓。

目标：

```text
每个物种下载 genome FASTA + GFF3 annotation
```

### Step 2：下载数据

可选路线：

```text
NCBI Datasets：适合自动化下载
Ensembl Fungi：适合 BioMart / REST / FTP
FungiDB：适合查特定真菌资源
JGI MycoCosm：物种多，但部分数据可能需要账号
```

### Step 3：解析 GFF3

从 GFF3 找出 gene 坐标：

```text
chromosome
start
end
strand
gene_id
biotype
```

优先保留：

```text
protein-coding gene
```

### Step 4：提取正样本

对每个基因提取上游 1000 bp。

注意链方向：

```text
+ 链：start 前面的 1000 bp
- 链：end 后面的 1000 bp，然后 reverse complement
```

### Step 5：提取负样本

从非启动子区域抽同样长度的序列。

第一版：

```text
抽 intergenic 区域
避开所有 gene start 周围 2000 bp
长度固定 1000 bp
正负样本比例 1:1
```

### Step 6：划分训练集

不要随机乱分就结束。最好做两个版本：

```text
版本 A：同物种随机划分
train / val / test = 80 / 10 / 10

版本 B：跨物种测试
几个物种训练，留一个物种完全不参与训练，只做 test
```

跨物种测试更能证明模型不是只记住某个物种的序列偏好。

### Step 7：编码 DNA

第一版用 one-hot：

```text
A = [1,0,0,0]
C = [0,1,0,0]
G = [0,0,1,0]
T = [0,0,0,1]
N = [0,0,0,0]
```

输入形状：

```text
batch_size x 4 x 1000
```

### Step 8：训练第一版 CNN

第一版不建议直接上大 Transformer。CNN 更适合先学习局部 motif，例如 TATA box、CAAT box、GC-rich 区域。

基础结构：

```text
Conv1D
ReLU
MaxPool
Conv1D
ReLU
GlobalMaxPool
Linear
Sigmoid
```

loss：

```text
Binary Cross Entropy
```

评价指标：

```text
Accuracy
Precision
Recall
F1
ROC-AUC
PR-AUC
```

### Step 9：保存模型

像 GPT checkpoint 一样保存：

```text
model_state_dict
model_config
species_list
sequence_length
label_definition
train_val_test_split
```

### Step 10：预测新序列

训练好后写 `predict.py`：

```text
输入：DNA 序列
输出：promoter probability
```

例如：

```text
0.87 = 模型认为这段序列有 87% 概率像 promoter
```

## 项目文件建议

如果按 `llm-from-scratch` 的方式组织，可以这样建：

```text
fungal-promoter-prediction/
├── data/
│   ├── raw/                 # genome.fa / annotation.gff3
│   ├── processed/           # promoter.csv / non_promoter.csv
│   └── splits/              # train.csv / val.csv / test.csv
├── notebooks/
│   └── colab_train.ipynb
├── scripts/
│   ├── download_ncbi.py
│   ├── extract_promoters.py
│   ├── build_negatives.py
│   └── make_splits.py
├── model.py
├── train.py
├── predict.py
├── evaluate.py
└── README.md
```

## 风险和检查点

### 数据泄漏

不要让高度相似的序列同时出现在训练集和测试集。

检查方法：

```text
按物种分 test
按基因邻域分组
去除重复或近重复序列
```

### 负样本偏差

如果负样本太随意，模型可能学到“假规律”。

检查方法：

```text
比较正负样本 GC 含量
比较 N 比例
比较重复序列比例
比较染色体位置分布
```

### 标签噪声

ATG 上游区域不一定就是真启动子。

解决方式：

```text
把它叫 putative promoter
用实验验证 promoter 做独立测试集
如果有 RNA-seq / CAGE / TSS-seq，优先用 TSS 定义 promoter
```

### 跨物种泛化

丝状真菌不同属/种差异大。

检查方法：

```text
leave-one-species-out test
```

也就是：

```text
用 Aspergillus + Fusarium + Trichoderma 训练
用 Neurospora 单独测试
```

## 后续升级路线

### 第一版

```text
one-hot DNA + CNN 二分类
```

目标：

```text
跑通全流程，确认数据构造和训练脚本可靠。
```

### 第二版

```text
k-mer tokenizer + Transformer
```

把 DNA 按 3-mer、4-mer、6-mer 切成 token。

### 第三版

```text
多特征融合
```

加入：

```text
k-mer frequency
GC content
TATA box / CAAT box
TFBS motif
DNA shape
gene expression evidence
```

### 第四版

```text
跨物种 contrastive learning
```

目标是让模型学到更稳定的 promoter 表示，而不是只记住某个物种的碱基偏好。

可以设计：

```text
同源基因 promoter 拉近
promoter 与 CDS / random intergenic 拉远
同表达模块 promoter 拉近
不同表达模式 promoter 拉远
```

## 最小可行结论

要训练丝状真菌启动子预测模型，真正的第一步不是写模型，而是构建可靠训练集：

```text
1. 下载多个丝状真菌 genome FASTA + GFF3
2. 从基因上游提取 putative promoter 正样本
3. 从非启动子区域构造匹配负样本
4. 做 train / val / test，最好包含跨物种测试
5. 先用 one-hot + CNN 训练二分类模型
6. 再逐步升级到 k-mer Transformer 和多特征融合
```

最重要的判断：

```text
模型复杂度不是第一瓶颈。
训练集定义、负样本构造、跨物种验证，才是这个项目能不能成立的核心。
```
