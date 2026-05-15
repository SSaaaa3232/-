---
title: "Deep learning guided programmable design of Escherichia coli core promoters from sequence architecture to strength control"
source: "https://academic.oup.com/nar/article/53/16/gkaf863/8246948?login=true"
author:
  - "[[Xuan Zhou]]"
  - "[[Renxu Feng]]"
  - "[[Nana Ding]]"
  - "[[Wenyan Cao]]"
  - "[[Yang Liu]]"
  - "[[Shenghu Zhou]]"
  - "[[Yu Deng]]"
published:
created: 2026-05-15
---
## Abstract

Core promoters are essential regulatory elements that control transcription initiation, but accurately predicting and designing their strength remains challenging due to complex sequence-function relationships and the limited generalizability of existing AI-based approaches. To address this, we developed a modular platform integrating rational library design, predictive modelling, and generative optimization into a closed-loop workflow for end-to-end core promoter engineering. Conserved and spacer region of core promoters exert distinct effects on transcriptional strength, with the former driving large-scale variation and the latter enabling finer gradation. Based on this insight, Mutation-Barcoding-Reverse Sequencing approach was used and constructed a synthetic promoter library comprising 112 955 variants with minimal redundancy and a 16 226-fold expression range. A Transformer-based model trained on this dataset achieved a Pearson correlation of 0.87 with experimentally measured promoter strengths. When combined with a conditional diffusion model, the system enabled *de novo* generation of promoter sequences with defined strengths, achieving a design-to-measurement correlation of 0.95 and maintaining high accuracy (*R* = 0.93) across varied sequence contexts. The designed promoters consistently preserved their intended strength gradients, demonstrating robust plug-and-play functionality. This work establishes a scalable and extensible platform ([www.yudenglab.com](http://www.yudenglab.com/)) for deep learning-guided programmable design of *Escherichia coli* core promoters, enabling precise transcriptional control.

Graphical Abstract

[Open in new tab](https://academic.oup.com/view-large/figure/539703695/gkaf863figgra1.jpg?itm_medium=graphical+abstract+image&itm_content=open+image&itm_source=http://academic.oup.com/nar/article/53/16/gkaf863/8246948&itm_campaign=graphical+abstract) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863figgra1.jpeg?Expires=1781659124&Signature=NPmlvEeq5VLtAKphBsCJALDfENyr-d0iDstGN6vrwdvtXs2RmG6R50Tjj5MtO6l4~wRmU8d3x~rO~ACZvvFelihMJFOA0jOq6VFRcdJ2fLJKHg0rvYto17Gk7aehw-zXrdMi-1lqeWnAi~J92ofrntWADGEtDNvQ15VunTNdgpCR0d5PaoSTsc0hrVt0SUgH7Y985UHvHacHB1aQbjw7VrVJOkhlRKDGduFyTnxfbC4aFwrWUaw61Vvg~4i0qFSfXTfoXgi54k3VaPGFWrRoFrhy0N-~hUvuINi8raJrbDLZsbbhgPJ2e8PVdL~kJGMwKxFs3K-UuK4pvR6zuFKWkA__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703695&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127&itm_medium=graphical+abstract+image&itm_content=download+button&itm_source=http://academic.oup.com/nar/article/53/16/gkaf863/8246948&itm_campaign=graphical+abstract)

## Introduction

Promoter regions play a crucial role in regulating gene expression through tuning the transcription initiation rate \[1, 2\]. The core promoter, comprising the -10 box, -35 box, and spacer, represents the most compact but essential parts for controlling transcription initiation. The sequences surrounding the core promoter, including upstream promoter (UP) elements, untranslated regions (UTRs), and transcription factor binding sites (TFBSs) in constitutive and inducible promoters on genomes or plasmids, confer specific transcriptional functions \[3, 4\]. By integrating the core promoter with variants of different strengths within these surrounding sequences, transcriptional output can be fine-tuned while maintaining functional integrity \[5\]. Although the -10 and -35 boxes are relatively conserved across σ <sup>70</sup> promoters, their presence and consensus quality do not reliably predict transcriptional strength \[6\], highlighting the influence of context-dependent features that remain incompletely understood \[7\]. This complexity complicates both rational design and quantitative modelling, highlighting the need to identify and understand the sequence features that truly govern promoter strength.

Artificial intelligence (AI) methods have been developed that can be applied to predict the strength of a given promoter by training on large datasets of promoter sequences and strengths \[8\]. Currently, multiple linear regression \[9\], support vector machines \[10\], and XgBoost \[11\] machine learning models have been applied to predict promoter strength in *Escherichia coli*. However, these models suffer from limited generalizability to unseen data, inability to capture non-linear relationships inherent in promoter activity, and overfitting to small, imbalanced datasets, which reduces their predictive accuracy in practical applications \[12\]. By contrast, deep learning offers superior feature extraction, the ability to handle high-dimensional data, and the capacity to model complex nonlinear relationships, thereby significantly enhancing prediction accuracy.

Accurately modelling promoter strength requires capturing both conserved sequence elements and context-dependent regulatory features within compact DNA regions. Convolutional Neural Networks (CNNs) are well-suited for detecting short, localized motifs such as -10 and -35 boxes, which are central to core promoter function \[13, 14\]. However, CNNs often fail to account for positional dependencies and inter-motif interactions that critically influence transcriptional output, limiting their effectiveness for modelling functional variation among seemingly similar promoter sequences \[15\]. To address this, long short-term memory (LSTM) networks can learn dependencies across nucleotide positions and accommodate sequence-order effects, but they are less effective when applied to short regulatory sequences where functional signals are sparse and gradients can vanish during training \[16\]. Meanwhile, transformer models offer global attention mechanisms and positional encoding, making them especially advantageous for capturing distributed and nonlinear dependencies across conserved and variable regions within the promoter. This architecture is well suited to modelling how small variations in motif spacing, composition, and context can produce large differences in promoter strength \[17\]. Given these contrasting characteristics, systematically evaluating different architectures is essential for identifying models that can effectively capture the regulatory logic embedded in core promoter sequences.

Efficient artificial gene circuits usually require the use of *de novo* designed core promoters with specific strengths to quantitatively control metabolic flux. In this regard, Kotopka *et al.* developed a CNN-based model to predict *Saccharomyces cerevisiae* promoter activity, and used it to screen randomly generated sequences, although this process resulted in a high proportion of nonfunctional candidates and substantial computational burden \[18\]. To improve the efficiency and quality of generated sequences, Generative Adversarial Networks (GANs) and Variational Autoencoders (VAEs), which are specifically designed and optimized for generation tasks. By using GANs to learn the genomic promoter sequences of *E. coli*, combined with a CNN-based strength prediction model for two rounds of screening, the functionality rate of generated promoters was improved to 70.8% \[19\]. Furthermore, Seo *et al.* applied a VAE to map cyanobacterial promoters into a latent space and reconstruct new variants, achieving 95% functionality after predictive screening \[20\]. Thus, integrating GAN or VAE models with a CNN could facilitate the generation of novel promoters with specific strengths \[21\]. However, GANs face stability issues, and VAEs often generate lower resolution outputs, hindering their applications in promoter library data handling \[22, 23\]. Continued improvement of generative architectures and their integration with predictive models remains a promising direction for scalable synthetic promoter design.

The accuracy and size of the dataset directly determine the model's quality. Many previous models were trained on datasets containing genome promoter sequences and transcriptome results \[24\]. However, the boundaries of promoters in the genome are often unclear \[25\], and messenger RNA (mRNA) abundance does not directly reflect genome promoter strength, as multiple promoters can co-regulate the same gene expression, and unknown TFs may also influence gene expression \[26\]. These factors result in barely satisfactory design reliability. To overcome such issues, LaFleur *et al.* constructed a synthetic promoter library comprising 14 206 variants by systematically combining core promoters with UP elements and UTRs. They developed a biophysical and machine learning model based on 346 sequence-derived parameters to explore sequence–activity relationships \[5\]. In parallel, random mutagenesis is frequently used to generate large, diverse promoter libraries with a wide strength range \[27\]. Common methods for linking promoter sequence to strength include massively parallel reporter assays (MPRAs) and fluorescence-activated cell sorting coupled with sequencing (FACS-seq) \[28, 29\]. However, FACS-seq cannot resolve individual promoter strengths, and MPRA requires the pre-synthesis of large oligonucleotide pools, which is costly and labor-intensive, limiting combinatorial flexibility. Therefore, developing new methods to break through the bottleneck of large dataset information collection is urgent.

To address the limitations, we developed the Mutation-Barcoding-Reverse Sequencing (MBRS) method for efficient generation of promoter libraries with measured expression strengths. The resulting dataset enabled the construction of a deep learning-based platform combining Transformer-based prediction with conditional diffusion-based sequence generation. Hosted at [www.yudenglab.com](http://www.yudenglab.com/), the platform supports programmable design of core promoters with defined expression levels across diverse sequence contexts. This work illustrates how structured synthetic datasets and tailored architectures can advance modular, scalable solutions for synthetic promoter engineering.

## Material and methods

### Strains and culture conditions

All strains used in this study are listed in [Supplementary Table S1](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA). *E. coli* JM109 and *E. coli* BL21 (DE3) were used for plasmid cloning and protein expression, respectively. Plasmids containing the pSC101 origin of replication were cultured in conventional Luria Bertani (LB) medium (10 g/L tryptone, 5 g/L yeast extract, and 10 g/L NaCl) supplemented with 34 μg/mL chloramphenicol to maintain plasmid stability, with incubation at 30°C. Plasmids containing the pUC or pJKR origins of replication were cultured in LB medium supplemented with 100 μg/mL ampicillin for plasmid maintenance, with incubation at 30°C. Plasmids containing the pCDF origin of replication were cultured in LB medium supplemented with 100 μg/mL streptomycin to ensure plasmid propagation, also incubated at 30°C. The final concentration of isopropyl-β-d-thiogalactoside (IPTG) was 1 mM.

To verify plasmid stability over generations, *E. coli* BL21 (DE3) cells containing plasmid were inoculated into liquid LB medium and cultured at 30°C with shaking at 250 rpm for 12 h. A portion of the bacterial culture was then spread onto solid LB medium containing chloramphenicol, yielding the first generation. Bacteria were then transferred as a 2% inoculum into fresh liquid LB medium and cultured at 30°C and 250 rpm for 12 h, followed by spreading onto solid LB medium containing chloramphenicol, yielding the second generation. This process was repeated until the sixth generation. From each generation of solid medium, 48 colonies were selected and inoculated into 48-well plates, and cultured at 30°C and 250 rpm for 12−16 h for fluorescence detection.

### Plasmid construction

All plasmids, primers, and key synthetic biology elements used in this study, including relevant gene sequences, are listed in [Supplementary Table S1](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA). The DNA fragment pSC101-sfGFP-RFP, which includes a replication initiation site, superfolder green fluorescent protein (sfGFP), and red fluorescent protein (RFP), was amplified from plasmid pTS-PcaR-PcaIJ-sfGFP-RFP using primer pair F-pSC101/R-pSC101. The rrnB terminator was amplified from plasmid pJKR-H-cdaR \[14\] with primer pair F-rrnB/R-rrnB, and inserted into the DNA fragment pSC101-sfGFP-RFP using a One Step Cloning Kit (Vazyme, Nanjing, China), affording plasmid pSC101-rrnB-sfGFP-RFP. The promoter of sfGFP was P <sub>Trc</sub> <sub>*</sub> and the RBS was consistent with the sequence used previously \[30\]. Whole-plasmid polymerase chain reaction (PCR) was performed using primer pair F-RBS/R-P <sub>Trc</sub> <sub>*</sub> and plasmid pSC101-rrnB-sfGFP-RFP as template. Recombinant plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -sfGFP-RFP was constructed by DpnI digestion, transformed into *E. coli* JM109, incubated at 30°C for 12−16 h, and verified by colony PCR and Sanger sequencing. Whole-plasmid PCR was performed using primer pair F-BCD2/R-BCD2 with plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -sfGFP-RFP as template, affording plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -BCD2-sfGFP-RFP. Plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP-RFP was constructed using primer pair F-RiboJ/R-RiboJ and whole-plasmid PCR of pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -BCD2-sfGFP-RFP.

To optimize the expression level of RFP, whole-plasmid PCR was applied using primer pair F-Jn/R-Jn with plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP-RFP as the template. Plasmids pSC101-rrnB-Jn-RiboJ-BCD2-sfGFP-RFP (Jn represents J23119, J23102, J23100, J23107, J23110, J23105, J23109, J23113, or J23103) were constructed by self-ligation and DpnI digestion. In order to regulate the sfGFP expression level by varying the amount of inducer added, *lacI* was added to plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP-RFP and the P <sub>Trc</sub> <sub>*</sub> promoter of sfGFP was replaced with the T7 promoter. Furthermore, we selected 19 promoters with different strengths (PL3456, PL3478, PL1294, PL851, PL1118, PL957, PL2558, PL308, PL1786, PL1324, PL1642, PL2884, PL420, PL70, PL1677, PL1253, PL2487, PL2244, and PL1555) reported previously \[11\] to control the expression of sfGFP. Plasmids pSC101-rrnB-T7-RiboJ-BCD2-sfGFP-PS-RFP were constructed using primer pair F-PS/R-PS through whole-plasmid PCR with pSC101-rrnB-T7-RiboJ-BCD2-sfGFP-RFP as the template. Finally, plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP-PL308-RFP was constructed using primer pair F-PL308/R-PL308 and plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP-RFP as the template. Promoter libraries L1, L2, L5, and L6 were constructed using whole-plasmid PCR with primer pair F-P/R-P and plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP-PL308-RFP as the template, affording plasmids pSC101-rrnB-P-RiboJ-BCD2-sfGFP-PL308-RFP (where P represents promoters from L1, L2, L5, or L6).

To avoid the impact of RiboJ cleavage on the detection of barcode sequences in mRNAs, whole-plasmid PCR was performed using primer pair F-R/R-R with plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP-PL308-RFP as the template, affording plasmids pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -BCD2-sfGFP-PL308-RFP. Promoter library L3 was constructed using MBRS and plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -BCD2-sfGFP-PL308-RFP as the template, yielding plasmids pSC101-rrnB-P3-BCD2-sfGFP-PL308-RFP (where P3 represents promoters from L3).

To validate the effectiveness of promoters designed by the platform in different upstream and downstream sequence contexts, the plasmid pSC101-rrnB-P <sub>Trc*</sub> -RiboJ-BCD2-sfGFP-PL308-RFP was used as a template for full-plasmid PCR with the primer pair F-UD-N-PX /R-UD-N-PX. This resulted in the plasmid pSC101-UD-N-PX, where N (A–F) represents six distinct upstream and downstream sequence contexts, and X represents platform-generated promoter sequences, numbered 1–8. Similarly, to assess the regulatory performance of these promoters in inducible systems, the plasmids pJKR-H-cdaR was used as templates for full-plasmid PCR with the primer pairs F-GA-PX/R-GA-PX. This resulted in the plasmids pJKR-PX, where PX refers to the same set of platform-generated promoter sequences, P1–P8.

To validate the platform's effectiveness in expressing different genes, whole-plasmid PCR was performed using primer pair F-DM/R-DM with plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP-PL308-RFP as the template, affording plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP. The DNA fragment pSC101-DM, which includes a replication initiation site, RiboJ, and BCD2, was amplified from plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP using primer pair F-DM-z/R-dm-z. Genes encoding cyan fluorescent protein (CFP), blue fluorescent protein (BFP), orange fluorescent protein (OFP), and yellow fluorescent protein (YFP) were synthesized, cloned using primer pair F-nFP/R-nFP, and inserted into the DNA fragment pSC101-DM using a One Step Cloning Kit (Vazyme), resulting in plasmids pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-nFP (where nFP represents sfGFP, RFP, CFP, BFP, OFP, or YFP). Plasmid pSC101-rrnB-P7-RiboJ-BCD2-nFP was constructed using primer pair F-nFP/R-P7 and plasmid pSC101-rrnB-P <sub>Trc</sub> \*-RiboJ-BCD2-nFP as the template (where P7 represents promoters from L7).

### Fluorescence assays

Single colonies were selected and inoculated into 1 mL of fresh LB medium containing 34 μg/mL chloramphenicol in 48-well plates and incubated overnight at 30°C and 250 rpm. Overnight cultures were inoculated at 2% inoculum into 1 mL of fresh LB medium in a 48-well plate and cultured at 30°C and 250 rpm for 12−16 h. To reduce the interference of the medium on fluorescence detection, cells were collected and resuspended in 1 mL of phosphate-buffered saline (PBS; pH 7.4). Before starting the fluorescence assay, the OD <sub>600</sub> was diluted to 0.5−0.8 using PBS. A 200 μL sample was transferred to a black 96-well plate to measure the fluorescence of sfGFP (485 nm excitation, 528 nm emission), RFP (588 nm excitation, 633 nm emission), BFP (383 nm excitation, 448 nm emission), CFP (458 nm excitation, 489 nm emission), YFP (500 nm excitation, 528 nm emission), and OFP (530 nm excitation, 560 nm emission) using an HT plate analyser (Biotek, Winooski, VT, USA). For a given measurement, normalized fluorescence was determined by dividing fluorescence by OD <sub>600</sub>. The ratio of fluorescence to absorbance at 600 nm (AU/OD) was used to compensate for changes in cell density over time and between experiments. Promoter strength was defined using the following equation:

Select a single colony harbouring the plasmid with an inducible promoter and inoculate it into 1 mL of fresh LB medium containing the appropriate antibiotic in a 48-well plate. Incubate overnight at 30°C with shaking at 250 rpm. Transfer the overnight culture into 1 ml of fresh LB medium in a 48-well plate with a 2% inoculum and cultivate at 30°C and 250 rpm for 12 h. To minimize interference from the medium during fluorescence detection, collect the cells and resuspend them in 1 ml of PBS, pH 7.4. Before starting the fluorescence assay, dilute the OD <sub>600</sub> to 0.5–0.8 using PBS. Transfer 200 μL of the sample to a black 96-well plate and measure the fluorescence of sfGFP (485 nm excitation, 528 nm emission) and RFP (588 nm excitation, 633 nm emission) using an HT plate reader.

### Real-time fluorescence quantitative PCR

Overnight cultured strains were transferred to fresh LB medium containing 34 μg/mL chloramphenicol at 2% inoculum and incubated at 30°C and 250 rpm for 12−16 h. According to the manufacturer's instructions, an appropriate amount of fermentation broth was taken, and total RNA was extracted using an RNApure Bacteria Kit (DNase I; CoWin Biosciences, Beijing, China). Next, a HiFiScript gDNA Removal cDNA Synthesis Kit (CoWin Biosciences) was used to remove genomic DNA and reverse transcribe. PCR amplification of the synthesized cDNA was carried out using UltraSYBR Mixture reagent (CoWin Biosciences) with F-rt-sfgfp/R-rt-sfgfp and F-rt-rfp/R-rt-rfp as primer pairs. Quantitative PCR (qPCR) was performed on a CFX96 instrument (Bio-Rad, Hercules, CA, USA) according to the manufacturer’s instructions. Each reaction was carried out in triplicate, and the reported cycle threshold (Ct) values are averages of triplicate samples. Transcript levels were calculated using the 2^−ΔΔCt method \[31\].

### Design and construction of promoter library L4

Promoter library L4 was constructed in three steps. The first step involved introducing mutations in the -35 box and randomizing the spacer sequence. In doing this, F-35-X/R-35 (X = 1−252) was used as PCR primer pair to linearize plasmid pUC-18a. The linearized plasmid was purified using a PCR Product Purification Kit (Sangon Biotech) and digested by restriction enzyme DpnI (TaKaRa, Dalian, China). Finally, the digested product was transformed into *E. coli* JM109, affording plasmid library pUC-35. The second step involved introducing mutations in the -10 box and adding barcode sequences. The barcodes were positioned 20 bp downstream of the transcription start site to avoid affecting transcription \[5\]. Plasmid library pUC-35 was linearized using PCR primer pair F-TAG/R-10-Y (Y = 1−117). The linearized plasmid was purified using a PCR Product Purification Kit (Sangon Biotech) and digested by restriction enzyme DpnI (TaKaRa). Finally, the digested product was transformed into *E. coli* JM109, affording the pUC-barcode library. The third step involved integrating the promoter fragment into a robust plasmid. To do this, the core promoter-barcode library was amplified from the pUC-barcode library by primer pair F-barcode-Library/R-barcode-Library. The core promoter-barcode library was then cloned into plasmid pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -BCD2-sfGFP-PL308-RFP to replace the P <sub>Trc</sub> <sub>*</sub> promoter. This cloning was performed with a 3:1 ratio of core promoter-barcode fragment to vector fragment using 2 × MultiF Seamless Assembly Mix ligase, affording the pSC101-barcode-L4 library. The barcode-containing primers were reused in Step 3 to enhance amplification efficiency of the short promoter-barcode fragments. Since the barcodes were already present in the template, this did not introduce any new sequence variation.

This modular, stepwise construction strategy reflects the core principles of the MBRS method. By separately varying the -35 and -10 motifs and introducing randomized spacer sequences in a controlled manner, the resulting promoter library enables systematic investigation of core promoter logic. Fixing the spacer length at 17 bp was a deliberate choice based on the canonical σ <sup>70</sup> promoter architecture in *E. coli*, ensuring biological relevance while isolating the effects of motif combinations.

### Next-generation sequencing procedures

Promoter library L4 was transformed into *E. coli* BL21 (DE3) for library storage. Plasmid DNA from promoter library L4 was then extracted. PCR was performed using primer pair F-NGS-P-Barcode 1/R-P-NGS-Barcode 2 to obtain PCR products containing promoter and barcode sequences. Additionally, sfGFP complementary DNA (cDNA) of promoter library L4 was amplified using primer pair F-NGS-Barcode 1/R-NGS-Barcode 2 to obtain PCR products containing the barcode sequences. These PCR products were purified and subjected to amplicon sequencing. Library sequencing was conducted with a TruSeq DNA PCR-Free Sample Preparation Kit for Illumina (Illumina, San Diego, CA, USA) according to the manufacturer's instructions. A Nova-Seq 6000 sequencer (Illumina, San Diego, CA, USA) with a read length of 150 bp was used for pairing and sequencing. FLASH \[32\] v1.2.11 was then used to merge the paired data by default and perform polymorphic statistical analysis on the merged reads in each sublibrary. Promoter sequences were extracted by removing noise sequences from the original reads.

### Training the core promoter predictive models

Two-thirds of the dataset was used for model training and the rest was used for model testing. Promoter strength in the large dataset was preprocessed by plus 1 and then taking the base-2 logarithm.

For Transformer model training, we used a batch size of 1024, a hidden layer dimensionality of 128, eight heads in the multi-head attention mechanism, and a feed-forward network hidden layer dimensionality of 512. We employed a custom schedule to dynamically adjust the learning rate, facilitating faster convergence in the early training stages while preventing instability from excessively high learning rates in later stages. The Adam optimizer was used with parameters β <sub>1</sub> = 0.9, β <sub>2</sub> = 0.98, and ϵ = 1×10 <sup>−9</sup>. The total number of trainable parameters in the Transformer model was 505 531.

For CNN model training, the batch size was set to 128 and the epoch count was 10 000. The CNN model was constructed using three sets of convolutional layers, namely batch normalization layers, activation layers, and pooling layers, followed by a Flatten layer, Dense layer, Batch Normalization layer, LeakyReLU layer, Dropout layer, and Dense layer to complete the CNN architecture. We used the Adam optimizer with a learning rate of 0.0001. The total number of trainable parameters in the CNN model was 1 744 645.

For LSTM model training, the batch size was set to 128, and the epoch count was 100. The LSTM model architecture consisted of two LSTM layers of 50 units each, followed by dropout layers and a dense layer. The Adam optimizer with a learning rate of 0.0001 was employed. The total number of trainable parameters in the LSTM model was 31 251.

### Training the WGAN-GP model

The training dataset contained 112 955 *E. coli* promoter sequences. We used all promoter sequences in this dataset as real samples. In the WGAN-GP model, the input to the generator is a uniformly distributed random variable, the batch size was set to 128, and the iteration time was set to 20 000. We used stochastic gradient descent as the optimization method for our model, and the batch size was set to 32. To obtain the best results from the WGAN-GP model, we trained the discriminator five times and the generator once in each training batch. The optimizer used Adam with a learning rate equal to 0.0001, β <sub>1</sub> equal to 0.5, and β <sub>2</sub> equal to 0.9. We trained the network for 200 000 iterations.

### Training the conditional diffusion model

We divided the promoter strengths into eight sublibraries based on the log <sub>2</sub> values of promoter strengths. Based on these sublibraries, we developed a conditional diffusion model to generate novel promoter sequences with target strengths. The model first uses a β scheduling function (linear\_β\_schedule) to generate a sequence of β values. This sequence determines the amount of noise added at each step. Next, an α value is calculated from the β values (α = 1 − β). The cumulative product of the α values (cumulative α) is then calculated, representing the amount of original signal retained from the beginning to the current time step. Finally, for each time step, the gradual addition of noise makes the data noisier at each step. The model implements denoising via UNET, which iterates the denoising process in reverse according to the above process of adding noise. The original data are recovered through the reverse noise process. The backward diffusion process can generate new data that is very similar to the original data.

## Results

### Construction of robust plasmids to accurately evaluate promoter strength

Robust plasmids are crucial for creating a core promoter library and accurately measuring promoter strength. The replication origin significantly impacts plasmid stability \[33\]. Low-copy-number plasmids such as pSC101 (∼5 copies/cell) maintain a consistent copy number by tightly controlling replication initiation and coupling it with host chromosomal DNA synthesis, even under stress conditions \[34, 35\]. Therefore, the sfGFP gene was overexpressed under a P <sub>Trc</sub> <sub>*</sub> promoter on pSC101 to evaluate plasmid stability. Furthermore, to minimize the impact of plasmid copy number fluctuations on promoter strength, a RFP gene was constitutively expressed as an internal reference on the same plasmid \[36\]. Promoter strength was defined by the fluorescence ratio of sfGFP to RFP. On this basis, to ensure stable translation initiation, a standard ribosome-binding site (RBS) \[37\], BCD2, was used to stabilize sfGFP translation (Fig. 1A). Compared to the normal RBS, the standard RBS exhibited lower sfGFP expression but had a smaller coefficient of variation among different clones (Fig. 1B), indicating that the standard RBS is a more stable element for sfGFP translation. To further mitigate the influence of the 5′-UTR on sfGFP expression, the RiboJ insulator \[38\] was introduced upstream of the RBS (Fig. 1C). The results demonstrated that, although sfGFP expression levels decreased, the coefficient of variation within individual colonies was decreased by 76% to 0.06 (Fig. 1B), indicating that RiboJ effectively stabilizes sfGFP translation. Continuous passage for six generations to evaluate plasmid stability yielded a coefficient of variation of 0.065 (Fig. 1D), demonstrating high stability.

![[7c2476ed623c456ea7156f6cb4fa9884_MD5.jpg]]

Figure 1.

Construction, optimization, and characterization of a robust plasmid. (**A**) Optimization of the RBS of sfGFP. The rrnB terminator was inserted upstream of the P <sub>trc*</sub> promoter to prevent read through of potential upstream promoters. (**B**) Comparison of sfGFP expression levels and coefficients of variation between the use of normal RBS, standard RBS, and RiboJ. (**C**) Diagram of plasmid structure with addition of RiboJ. (**D**) Continuous passage culturing to investigate sfGFP expression stability controlled by standard RBS and RiboJ. (**E**) Modulating sfGFP expression levels using constitutive promoters with different strengths. (**F**) Changes in RFP expression levels in response to variations in sfGFP expression levels on plasmids, as illustrated in Fig. 1E. (**G**) Construction of plasmids to optimize the expression level of RFP. Expression of sfGFP was controlled by the T7 promoter with different concentrations (0, 6, 8, 10, 20, 30, 40, and 50 μM) of IPTG for induction. (**H**) RFP expression levels and coefficients of variation under different constitutive promoters, with sfGFP expression levels varied by adjusting the IPTG concentration.

[Open in new tab](https://academic.oup.com/view-large/figure/539703737/gkaf863fig1.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig1.jpeg?Expires=1781659124&Signature=OJgl1xQxzCqW8o2Ijd5n2T2XQmz0TE9Th4jt2FOxL7zsWMrllNIThRSSQllm2jolB3NNp1TS9dbnOGfZhOW0CWSOFUW~~UKJp3bliPKJDrVxzveKEEcn1Kn8y4aUmHU8Vqke014AxoWLflRM7xKWMYRq7Q8TF9af84JEwj9qUoXyBn11hyfasgr0w9e6mOEmu8KLVC0WNPXspOvMCgqWLOo3hZTyVc7bB-whQ39gzAJTvh3tl4TMezPPn7xQSWgvIslw5IoWcX75tbs-xYHfGJcmOrpjwuumB2zCfYUR-N6IxppdXgL~Oq6NjGrL4r~Uo7TsJ1UxXJbzwcVISasxhw__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703737&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

Additionally, given the stable quantities of transcription and translation resources in cells, an inappropriate RFP expression level may compete for a substantial share of RNA polymerases (RNAPs), ribosomes, and tRNAs, thereby affecting the expression of sfGFP when using super-strong promoters \[39, 40\]. As a proof of concept, we replaced the P <sub>Trc</sub> <sub>*</sub> promoter with a series of Anderson promoters of different strengths to control sfGFP expression (Fig. 1E). Excessive sfGFP expression significantly reduced RFP expression, indicating strong competition for resources between them (Fig. 1F). Therefore, it is crucial to select a suitable constitutive promoter to control RFP expression that remains unaffected by varying levels of sfGFP expression. To achieve this, we used the T7 promoter to modulate sfGFP expression by adjusting the inducer concentration ([Supplementary Fig. S1A](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)) and optimized RFP expression using 19 constitutive promoters \[11\] of varying strengths (Fig. 1G). Under the original P0 promoter, a 10-fold change in sfGFP expression resulted in a 3-fold change in RFP expression ([Supplementary Fig. S1B](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). Meanwhile, after promoter optimization, the highest RFP fluorescence level with the lowest coefficient of variation (0.046) was achieved under the control of the PL308 promoter (Fig. 1H). Finally, a robust plasmid, pSC101-rrnB-P <sub>Trc</sub> <sub>*</sub> -RiboJ-BCD2-sfGFP-PL308-RFP, was developed, enabling the creation of a core promoter library and precise strength assessments.

### Exploring the contribution of different core promoter regions on promoter strength

The -10 box, -35 box, and spacer region were found to significantly influence promoter strength \[41\]. However, their extent of their contributions on promoter strength remains unresolved, restricting the design of a comprehensive promoter library that spans a wide range of strengths with significant sequence variation. Numerous *E. coli* promoters are regulated by the σ <sup>70</sup> transcription factor of RNAP, which interacts with the -10 and -35 boxes. Therefore, the affinity between the core promoter and RNAP may directly determine promoter strength. Phillips *et al.* developed an energy matrix for calculating the binding energy of RNAP and -10 and -35 boxes by quantifying the energy needed for each base \[42\]. Chen *et al.* leveraged this energy matrix to design diverse -10 and -35 boxes, tailoring promoter strength for optimizing sensor performance \[43\]. In this regard, the robust constitutive P <sub>Trc</sub> <sub>*</sub> promoter was used as the template, and its -10 and -35 boxes guided by the energy matrix. To this end, six -10 boxes and six -35 boxes with RNAP gradient binding energies were designed, resulting in promoter library L1 (Fig. 2A and [Supplementary Table S2](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)).

![[059d0621f3792a45056e848d933e0d01_MD5.jpg]]

Figure 2.

Influence of the promoter conserved region and spacer on promoter strength. (**A**) Promoter sequences and RNAP-binding energy matrix. The designed -35 and -10 boxes with a range of binding energies are listed. (**B**) Heatmap of promoter strengths for library L1. The black box represents the P <sub>Trc*</sub> promoter. The red box represents promoters with abnormal strength. (**C**) Correlation analysis of promoter strength and RNAP-binding energy for promoter library L1. (**D**) ANOVA of the L1 promoter library to evaluate the contributions of the -10 and -35 boxes to promoter strength. (**E**) Heatmap of promoter strengths for library L2. The black box represents the P <sub>Trc*</sub> promoter. (**F**) ANOVA of the L2 promoter library to evaluate the contributions of the conserved region and spacer to promoter strength. (**G**) Analysis of the amplitude of variation in promoter strength when either the conserved region or spacer was altered.

[Open in new tab](https://academic.oup.com/view-large/figure/539703741/gkaf863fig2.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig2.jpeg?Expires=1781659124&Signature=rt655I46oMT~FCGQhBEc7-FUDqhW~gzgrST6NlqXwuXWivs9iFOoLjNWhQ2H0qsFnE8hqzXOTfgs3LD4h2nKi1Lx~vLZd6X4VHYT62uB1mzAl7s8ET3YvwKVOSah9vIPJ-rp9W~cfIsWCj7jh4FKIz5XDhRTYDsAhr0BYh~ku9OXRmSPlCOnS9jtGruRYt-b9~FXPtT7sDSjW7tNQMuwmIYQi2n2ShPUbNAMyWUxrbqTlV2ibDyUeiRJOcJjvDb5RG-~UI-ncDXQfEHKPv5PqOqDYWeoE-uvYj4hjoAEAaFJ2am5byayd8JG8o8BCoJR-z8bu4EC3wVeitayLcdaVQ__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703741&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

Analyzing the strengths of promoter library L1, we found that promoters with lower binding energies generally exhibited higher strengths (Fig. 2B). Further analysis of promoter library L1 revealed a considerable correlation between promoter strength and RNAP-binding energies, with a Pearson coefficient *R* of −0.75 (Fig. 2C). However, some promoter combinations exhibited abnormally strong or weak strengths without a clear correlation to the binding energy of the -10 and -35 boxes, indicating the complexity of the mechanisms between promoter strength and sequences (Fig. 2B). Analysis of variance (ANOVA) of L1 promoter strength revealed that the interaction between the -10 and -35 box sequences predominantly influence the promoter strength (Fig. 2D).

Furthermore, the spacer region also impacts promoter strength through an unknown mechanism \[44\]. On this basis, we designed 12 different spacer regions and combined them with 12 different conserved regions (-10/-35 box) to construct promoter library L2 ([Supplementary Table S3](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). We found that spacer region sequences critically influence promoter strength (Fig. 2E), with spacers of intermediate rigidity exhibiting optimal expression levels ([Supplementary Fig. S2](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)), thereby underscoring the spacer’s functional importance in core promoter activity. ANOVA results demonstrated that the spacer region primarily influences promoter strength through its interaction with the conserved region (50.25%; Figure 2F). By contrast, the spacer alone contributed only 14.26% to promoter strength, significantly lower than the conserved region alone. We further analyzed the strength variations within groups of promoters that share the same conserved region but differ in spacers, as well as groups that share the same spacers but differ in conserved region. The average coefficient of variation for promoter strengths with different conserved regions was 1.9, compared with 1.1 for those with different spacers (Fig. 2G). These results indicate that the conserved region substantially influences promoter strength, while spacer sequences are responsible for fine-tuning it. Therefore, designing a conserved region based on binding energy and introducing randomness into spacer sequences could yield promoter libraries with a broad and well-proportioned spectrum of strengths.

### Establishing the MBRS method to construct a core promoter library for collecting large datasets

To obtain a large dataset containing hundreds of thousands of core promoter sequences and their corresponding strengths, it is essential to apply the MPRA method for high-throughput promoter strength evaluation. However, the current MPRA method relies on DNA arrays for library construction, which are inherently costly and limited in size. Thus, we established the MBRS method, which primarily involved constructing a promoter library based on mutations and barcoding, followed by high-throughput sequencing to determine promoter strength (Fig. 3A). Library construction involved three cloning steps for core promoter mutation and barcoding (see "Materials and methods" section). The library was constructed in a fully synthetic and modular fashion, with combinatorial assembly of -10 and -35 motifs and spacer regions. This structured design enables systematic analysis of sequence-function relationships. In addition, the use of a plasmid-based expression system minimizes variability from chromosomal context and endogenous regulation, allowing promoter activity to be attributed directly to the designed sequence elements. After constructing the library, we extracted plasmid DNA and mRNA. High-throughput sequencing of plasmid DNA established the correspondence between promoters and barcodes in mRNA. We measured the mRNA and DNA abundance of the barcodes and calculated the mRNA-to-DNA ratio to determine the transcription level of each barcode \[28\]. By combining promoter-barcode correspondence with transcription levels, we obtained the transcription level of each promoter (Fig. 3A).

![[6a59b22bfcb48090e2eeeae85507e052_MD5.jpg]]

Figure 3.

Establishing and evaluating the MBRS method. (**A**) Flowchart of the MBRS method. The first step involves randomizing the spacer and incorporating various -35 boxes along with a fixed -10 box (TATAAT). In the second step, the -10 box is mutated and a 12 bp random barcode is added. The third step involves homologous recombination of the resulting promoter library into pSC101-rrnB-P <sub>Trc*</sub> -RiboJ-BCD2-sfGFP-PL308-RFP to replace the P <sub>Trc*</sub> promoter. The final step involves extracting DNA and mRNA from the promoter library, then calculating the ratio of barcode abundance between DNA and mRNA samples. This ratio, along with promoter-barcode correspondence, generates a comprehensive dataset. (**B**) 3D scatter plot of promoter strengths for all promoters in the library L3. In amplicon sequencing, 30 PCR cycles were used to amplify cDNA. A regression plane was fitted to the three biological replicates to evaluate overall consistency, and the reported *R* ² value reflects the goodness of fit of this plane to the triplicate data. (**C**) Correlation analysis of amplicon sequencing results from the MBRS method using 25 and 30 PCR cycles across biological triplicates. Rep1, Rep2, and Rep3 represent the promoter strength measured in three independent biological replicate experiments. (**D**) Correlation analysis of amplicon sequencing results from the MBRS method using 25 and 30 PCR cycles. (**E**) Correlation analysis between sfGFP fluorescence and transcription levels. (**F** and **G**) Correlation analysis of amplicon sequencing results for 30 PCR cycles with sfGFP fluorescence (F) and transcription levels (G). (**H** and **I**) Correlation analysis of amplicon sequencing results for 25 PCR cycles with sfGFP fluorescence (H) and transcription levels (I).

[Open in new tab](https://academic.oup.com/view-large/figure/539703746/gkaf863fig3.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig3.jpeg?Expires=1781659124&Signature=xvR7cZQuMNB6Z4k79PHabaHe8UXiQGYRXMgYQyhe5H3nkpJMWyEdwWANZFnnb8K60ugw0Q~cFSDQlZdb~RtOUXvzsg2dWwa76llYpT~gwtEuCiAy3~TfsfFzpWK5lWTmY6HCQXCXzp5e8OYorrslUGPHUaaF4orqgqtmf4N6Yjml5JzDmyr7C9uIurDwJwMSZZBXyzPXggACB8m-xPjLPdbVc55YlAdOSPRP5NzzxDo~t-~zyeA9OKlz8CKvNnYZlXj9Vp~NNlHLwsudWkJCUN-wb4q~bEyz57Oqc-I5pVVjtZRreXKM0HFHaxMEWe6BOEYIHLv~2~sJFGZ-kgxOEw__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703746&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

The MBRS method was applied to construct promoter library L3 to verify its feasibility ([Supplementary Table S4](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). The strengths of promoters in library L3 were analyzed in biological triplicates to investigate the reproducibility of the MBRS method (Fig. 3B). The results demonstrated a high degree of consistency among the biological triplicates, with a coefficient of determination (*R* ²) of 0.87, indicating good repeatability for this method. High-throughput measurement of promoter strength required transforming mRNA to cDNA and amplifying the barcode region for amplicon sequencing. During this process, amplification primer preference may generate expression noise for promoters with different barcodes. To examine the impact of primer preference on amplicon sequencing, we compared the detected promoter strengths using 30 and 25 PCR cycles, assessing the correlation for each biological triplicates. The results yielded high correlation coefficients exceeding 0.89 (Fig. 3C). The detection results for the 30 and 25 PCR cycles showed a high correlation (0.98), suggesting that PCR primer preference has minimal impact on the MBRS method (Fig. 3D). To further verify the accuracy of amplicon sequencing, the mRNA and sfGFP expression levels of library L3 were measured and compared with the high-throughput sequencing results (Fig. 3 E− I). All correlation coefficients were >0.85, indicating the high reliability of the MBRS method. Given that the 30-cycle PCR gave higher correlation coefficients than the 25-cycle PCR (Fig. 3F and H), we employed 30 cycles for subsequent larger dataset collection.

### Collecting and analysing the core promoter large dataset

We designed 117 -10 boxes and 252 -35 boxes with a range of RNAP binding energies <0. Next, the 17 bp spacers with randomized sequences were combined with 252 -35 boxes by PCR amplification with the constant -10 box (TATAAT), yielding a library with 360 000 members and a commendable 81% positive rate (Fig. 4A). On this basis, a second round of whole-plasmid PCR was performed using this promoter library as template. This process introduced 117 -10 boxes and barcode sequences into the library, expanding the library size to 580 000 with a positive rate of 56% (Fig. 4A). A DNA barcode containing a 12 bp random sequence was introduced upstream of the standard RBS of the 5′UTR. Finally, the constructed core promoter library was cloned upstream of BCD2 to replace the P <sub>Trc</sub> <sub>*</sub> promoter, generating a final core promoter library L4 with 600 000 members and a positive rate of 52% (Fig. 4A). Therefore, library L4 theoretically contains 312 000 (600 000 × 52%) core promoter combinations, which is sufficient for collecting large datasets to train a deep learning-based core promoter design platform.

![[c2fb5bb703e7601e60429354122fc6d7_MD5.jpg]]

Figure 4.

Construction, evaluation, and analysis of the L4 promoter library. (**A**) Positive rate changes during three-step construction of library L4 using the MBRS method. (**B**) Base frequency analysis of all detected promoters in library L4. The -10 and -35 boxes share significant conserved sequence features. (**C**) Frequency analysis of the maximum shared sequence length in library L4. *L* <sub>max</sub> refers to the length of the longest continuous sequence of repeated bases shared between different promoter sequences. (**D**) Analysis of base preferences at each position of the promoters. (**E**) Correlation analysis between promoter strength and RNAP-binding energy. (**F**) Relationship between spacer rigidity and promoter strength.

[Open in new tab](https://academic.oup.com/view-large/figure/539703750/gkaf863fig4.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig4.jpeg?Expires=1781659124&Signature=n996kNNF4IJjnwpFLlYF3yEk4wb8ZCFpcbhYqoyNDHsK0Oayew0lcdxkm2u0EdRqstLkkSWgqXm1c6eIXUlgStPexci2bds13nZsQCUYWAgN16m3MC9qrCewoiMsLrw1SLfgKKqa4LHDi~YJzI2J8L6Otmn3kOLySV~xJXxDn5dFR3uDpIgo-VxHXLcYnVTGibTvqa~D3BL3SFOTR7Dvtms8ELhNWsRJ3rmcIoazm~B1GYL5zk7xAviRX4jWK5B8gml6y3vFnBUJwuxtOSVI4uepiFN-191eM0wl5HpHVtIPvjAeCGMSyVrF9NyyNNEmBrGP3mqdLsYmfsrK5l6SDw__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703750&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

Library L4 was subjected to amplicon sequencing to calculate the copy numbers of different promoters, measure the mRNA levels of sfGFP, and map each core promoter to its unique barcode. To ensure accurate one-to-one mapping between promoters and barcodes, any barcode associated with multiple promoter sequences was removed from the dataset. Therefore, we obtained a comprehensive library L4 comprising 391 178 unique core promoters with specific barcodes, and mRNA levels were determined for 233 469 of these promoter sequences ([Supplementary Table S5](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). Furthermore, we retained only the promoters with detectable mRNA levels across all three biological replicates. Finally, a robust dataset containing 112 955 core promoters and their corresponding strengths, with an average biological coefficient of variation of 0.4, was collected, demonstrating an impressive 16 226-fold range in strength.

Next, we evaluated the sequence diversity and redundancy of the promoter sequences in library L4 to ensure the robustness and reliability of the dataset for training deep learning models. Examination of sequence diversity revealed a balanced distribution of the four possible bases in the spacer region, indicating high sequence diversity (Fig. 4B). Meanwhile, we calculated the Shannon entropy for each position of the promoters in library L4 ([Supplementary Table S5](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). The Shannon entropy of the spacer exceeded 1.96 (with a maximum possible value of 2 for nucleotide diversity), indicating high sequence diversity within the library. Conversely, a 21 bp repeat sequence can trigger homologous recombination in *E. coli*, potentially excising DNA between the repeats and disrupting system functionality \[29\]. To evaluate this risk, we assessed the sequence redundancy of library L4 by calculating the maximum shared repeat length (*L* <sub>max,</sub> Fig. 4C). *L* <sub>max</sub> was defined as the length of the longest contiguous subsequence shared between any two non-identical promoter sequences in the library \[29\]. Our analysis revealed that *L* <sub>max</sub> in library L4 was concentrated between 3 and 7 bp, which was insufficient to induce homologous recombination, demonstrating low sequence redundancy and high stability. Collectively, an accurate, large dataset was obtained, exhibiting a wide range of strengths, high sequence diversity, and low sequence redundancy, making it an ideal data source for training core promoter design models.

The remaining 157 709 core promoters either lacked function or were too weak to be detected. Detected promoters were defined as functional promoters, while undetected ones were defined as nonfunctional promoters. Sequence profiles of both groups were analyzed and compared to explore potential relationships between sequence features and promoter strength. Weblogo analysis revealed no significant differences between them ([Supplementary Fig. S3](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). However, chi-square tests of base frequency at each position showed significant A and T preferences not only in the conserved region but also in the spacer region when comparing functional promoters with nonfunctional promoters (Fig. 4D and [Supplementary Fig. S4](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). Promoters with low C or G content occasionally exhibited moderate strength, suggesting that GC content might have less influence on promoter strength than AT content. Meanwhile, an excessive proportion of any single base significantly decreased promoter strength ([Supplementary Fig. S5](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). Given the significant influence of conserved regions on promoter strength, we analyzed the relationship between promoter strength and the binding energy of -10 and -30 boxes. The results revealed a moderate negative correlation between promoter strength and binding energy (Fig. 4E). This implies that factors beyond binding energy may play a role in determining promoter strength. The rigidity of the spacer region influences promoter strength by affecting the binding efficiency and conformational stability of RNAP with the DNA \[45\]. Consistent with observations from the L2 promoter library, where spacers with intermediate rigidity were more likely to support higher expression, a similar trend was observed in the L4 promoter library (Fig. 4F). Strong promoters (strength > 20) exhibited rigidity concentrated in the range of 46−51 nm, indicating that both excessively high and low rigidity reduce promoter strength. We further stratified the L4 promoter library into 20 bins based on RNAP-binding energy to control for the influence of conserved region variation. The enrichment of optimal rigidity (46–51 nm) among strong promoters remained consistent across multiple energy bins ([Supplementary Fig. S6](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)), supporting the robustness of this trend.

### Construction of the core promoter strength prediction platform based on deep learning

Various diverse AI-based DNA sequence and function prediction models have been developed including Transformer \[46\], CNN \[14\], and LSTM \[47\] models. These deep learning models have great potential for learning sequence-strength correlations of DNA and predicting the strengths of promoters and RBSs. By leveraging the unique advantages of each model, we established Transformer, CNN, and LSTM models, and compared and identified the most suitable model for promoter strength prediction (Fig. 5A and B).

![[3c014aabc8bc1840003391d3101b8a59_MD5.jpg]]

Figure 5.

Construction and evaluation of a core promoter strength prediction platform. (**A**) Illustration of the promoter strength prediction framework. The input consists of the core promoter sequences and their corresponding strengths. These sequences are processed through Transformer, CNN, or LSTM models to predict promoter strength. (**B**) Diagram of model architecture. Core promoter sequences and their corresponding strengths from the database are fed into Transformer, CNN, and LSTM models for feature extraction and strength prediction. The Transformer model includes embedding, positional encoding, multi-headed self-attention, feed-forward layers, and normalization. The CNN model consists of multiple convolution and pooling layers, followed by fully connected layers. The LSTM model employs recurrent units for sequence processing and uses dense layers for final prediction. (**C−E**) Correlation analysis between predicted and actual promoter strengths for Transformer (C), CNN (D), and LSTM (E) models. All performance metrics presented in this figure were calculated based on predictions on the independent test set.

[Open in new tab](https://academic.oup.com/view-large/figure/539703756/gkaf863fig5.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig5.jpeg?Expires=1781659124&Signature=iotWoOT0xnlPDs4b1cL7W5OmF~I1-vul03~9475gcO3ELqyz5hdJ70vANVC~ioMg7pSaAaloQRn-ipxNlZSToc1bzdWEhNWf7vBXXUSmsPRkuX3Imo13sjvMgvIlSBtcDZhq7qKwYwoiocaUFsSNE-rW-ItpLEYJtbuP9CqdVoliKdCYPMVP8crxWF22W2j6YCC4iGx2h7TrBC-WdNUWXlnJ4g6yMf0nTRkUdNJ818p576dK9ZRDs6MNYDX0pARRLWd-2NPZYXBX0LvG0WgY7BIfCCfJ99U7kYvJ0T78uUXFBuqW6z297TcITv2Y5w-u8gbzhxhrq-QwaEjt5CZ-ww__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703756&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

Correlations between true and predicted values in the test set (Fig. 5 C– E) and the performance metrics derived from cumulative distribution function (CDF) analysis served as criteria to evaluate the performance of prediction models ([Supplementary Fig. S7](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). To rigorously assess model generalization, we randomly partitioned the dataset into a training set (two-thirds) and a held-out test set (one-third). All evaluations of model performance, including Pearson correlation coefficients, Kolmogorov–Smirnov (KS) statistics, and Earth Mover's Distance (EMD) values, were conducted exclusively on the independent test set to ensure unbiased assessment. Analyzing correlations between true and predicted values on the independent test set, we found that the Transformer model exhibited the highest Pearson correlation coefficient *R* value of 0.87, higher than that of the CNN model (0.76) and the LSTM model (0.81). The Transformer model also achieved the lowest mean absolute error (MAE = 0.212), compared to the CNN (MAE = 0.382) and LSTM (MAE = 0.288) models, further supporting its superior predictive accuracy. The KS statistics for the Transformer, CNN, and LSTM models were 0.068, 0.152, and 0.198, respectively, and EMD values were 0.070, 0.198, and 0.128, respectively. The lower KS statistics and EMD values highlighted the Transformer model's robustness and accuracy. Therefore, the Transformer model was considered superior for promoter strength prediction, offering a promising avenue for future research and practical applications in synthetic biology.

To gain insight into how the Transformer interprets promoter sequences, we analyzed its attention patterns ([Supplementary Fig. S8A](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA) –F). The model placed higher attention on the spacer region than on the conserved -10 and -35 motifs, reflecting its focus on variable features that fine-tune transcriptional output. The canonical 5′-TG-3′ motif, located at the upstream boundary of the -10 element and previously associated with enhanced promoter activity, was not strongly attended by the model. This may indicate that the motif's regulatory role was learned in earlier network layers due to its consistent presence across functional sequences. In contrast, upstream positions of the -10 box showed strong vertical attention signals extending downstream ([Supplementary Fig. S9](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)), indicating that the model captured long-range dependencies within the promoter sequence. These results demonstrate that the Transformer accurately predicts promoter strength while also learning context-dependent regulatory logic, making it particularly well-suited for promoter modeling and design in synthetic biology.

### Developing a core promoter de novo design platform based on conditional diffusion and WGAN-GP models

We attempted to develop a core promoter *de nov* o design platform to directly generate promoters with the desired strength. However, current generative models, such as GANs and diffusion models, struggle to accurately control the expression levels of the generated sequences. Therefore, we propose constructing generation models for sequence generation, followed by strength prediction using the Transformer model developed above, and ultimately employing a filtering mechanism for reverse selection to achieve core promoter designs with target strengths (Fig. 6A). Here, we attempted to construct two generative models based on GAN and diffusion frameworks: A Wasserstein Generative Adversarial Network with Gradient Penalty (WGAN-GP) model, and a conditional diffusion model. By comparing the features and strength distributions of the generated sequences, the most suitable model was selected for the desired core promoter design.

![[48d0f33cf392b6a8cdeaf506f0bcb1d8_MD5.jpg]]

Figure 6.

Construction and evaluation of a WGAN-GP-based core promoter *de novo* design platform. (**A**) Flowchart of the core promoter *de novo* design platform. Upon receiving a target promoter strength from the user, the platform’s generative model generates promoters. These promoters are then evaluated by a Transformer model to predict their strength, followed by a reverse search using a filter model to output the promoters that match the input requirements. WGAN-GP or conditional diffusion model was used as generative model. (**B**) Flowchart of the WGAN-GP model. (**C**) Correlation analysis between predicted and observed strengths of promoters generated by the WGAN-GP model. Transformer model was used for strength prediction.

[Open in new tab](https://academic.oup.com/view-large/figure/539703761/gkaf863fig6.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig6.jpeg?Expires=1781659124&Signature=gPZZY5kTnDcxlpixjA-4ljCcg~JZ-ffIXxGi~IZW4NB1L8~5N2augtN8gchTFeJxkkHqLp2iy0z-QdGI9XPEtFE8qILdz-Drak4jB-aiPQnmi9pF7WIfLSUtN9-U4yryeM1Ud2F5xnexOpPjKCwA7xyIuOKVoJjdawAvfXlgrRfNNCoZO4hWtzq4CE5TjPz71IhosPJbOcjeKnIez~9JleTOYkk5mLbgB--dkJWkF-NQnsKz5dCNJ52QVCJNXsqGlPTAIO7sQ~OiUmh2uDHCBiEfPCCdu1d5ng5vq9ZKBgf26buqc5BZ7IyiW1ynY9dCDsUWyqDHKUysunvIg~Fgqw__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703761&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

Through adversarial training between the generator and the discriminator, GAN extracts promoter sequence features from a library, while WGAN-GP introduces Wasserstein distance and gradient penalty parameters to address instability in traditional GAN training and improve the quality of generated sequences \[48\]. In this process, a promoter sequences dataset was used to train the WGAN-GP model (Fig. 6B). Since WGAN-GP optimizes the generator and discriminator through adversarial learning, the generator attempts to generate sequences similar to the real data, while the discriminator distinguishes between generated and real sequences. Therefore, the distribution of sequences generated by WGAN-GP is closer to that of real sequences. To evaluate the effectiveness of the WGAN-GP generative model, we used Weblogo \[49\] to analyze both the generated and input sequences ([Supplementary Fig. S10A](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). The results showed that the generated sequences accurately captured the characteristics of conserved regions. Further analysis of *k* -mer count correlations (ranging from 2-mers to 6-mers) between the sequences generated by WGAN-GP and our training dataset revealed that the correlations exceeded 0.96 for all *k* -mer frequencies. This indicates that the model performed exceptionally well in learning promoter sequence characteristics ([Supplementary Fig. S10B](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA) –F).

We randomly selected 80 promoters generated by the WGAN-GP model to construct promoter library L5 for accuracy validation ([Supplementary Table S6](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). A total of 85% of promoters generated by the WGAN-GP model were stronger than the commonly used weak promoter J23109 ([Supplementary Fig. S11](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)), indicating that the majority of the generated promoters were functional. Additionally, the promoter strength distribution of the generated sequences was compared to the input sequences ([Supplementary Fig. S12](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)), revealing a strong similarity with both distributions predominantly concentrated in the weaker promoter range. Subsequently, we used the Transformer model to predict the strengths of the promoters in library L5, achieving a high Pearson correlation coefficient *R* of 0.88 between predicted and measured strengths, demonstrating the effectiveness of the combined WGAN-GP and Transformer model (Fig. 6C).

Like GAN models, diffusion models have also been used for DNA sequence generation. Diffusion models \[50\] are a parameterized Markov chains trained by variational inference to efficiently reverse the noise-adding diffusion process and produce samples matching the data after a finite time \[51\]. Unlike GAN models, which suffer from low stability \[52\] and generate a low diversity of sequences \[53\], the high sequence diversity produced by diffusion models indicates its strong potential for generating high-quality novel promoters. To train diffusion models, we divided the large dataset into eight classes according to promoter strengths. Next, a conditional diffusion model barcoded by these strength levels was constructed to generate target strength promoter sequences (Fig. 7A). Unlike traditional diffusion models, the conditional diffusion model introduces strength-level constraints, allowing for more precise control over the generated sequences. This method enhances the model's ability to produce promoters that match specific strength targets, improving both the accuracy and practical utility of the generated sequences.

 $Evaluation of the conditional diffusion model-based core promoter de novo design platform. (A) Flowchart of the construction of the conditional diffusion model. The promoter dataset was divided into eight strength levels based on equal divisions of their log2 strengths, corresponding to the following ranges of original strength: >10.5, 3.98−10.5, 1.51−3.98, 0.57−1.51, 0.217−0.57, 0.082−0.217, and <0.031. The model generates sequences by progressively adding noise and then gradually removing it for each promoter strength level. Tn is the time step indicating the stage of the diffusion process; $\beta n$ is the noise level at that time step; UNETn is the neural network used for denoising at that step. (B) Ten promoters from each strength class were selected for experimental validation. (C) Correlation analysis between experimentally measured strengths and the desired strength classes of generated promoter sequences. (D) Correlation analysis between predicted and observed strengths of promoters generated by the conditional diffusion model. Transformer model was used for strength prediction.$ 

Figure 7.

Evaluation of the conditional diffusion model-based core promoter *de novo* design platform. (**A**) Flowchart of the construction of the conditional diffusion model. The promoter dataset was divided into eight strength levels based on equal divisions of their log <sub>2</sub> strengths, corresponding to the following ranges of original strength: >10.5, 3.98−10.5, 1.51−3.98, 0.57−1.51, 0.217−0.57, 0.082−0.217, and <0.031. The model generates sequences by progressively adding noise and then gradually removing it for each promoter strength level. *T <sub>n</sub>* is the time step indicating the stage of the diffusion process; $\beta n$ is the noise level at that time step; UNET <sub><em>n</em></sub> is the neural network used for denoising at that step. (**B**) Ten promoters from each strength class were selected for experimental validation. (**C**) Correlation analysis between experimentally measured strengths and the desired strength classes of generated promoter sequences. (**D**) Correlation analysis between predicted and observed strengths of promoters generated by the conditional diffusion model. Transformer model was used for strength prediction.

[Open in new tab](https://academic.oup.com/view-large/figure/539703765/gkaf863fig7.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig7.jpeg?Expires=1781659124&Signature=MkF1dadTY0wNm6CjIuLzaKLyiozYzsWLwNHhjP-52Ah3YJN7~3Hoje1v-ZJrMII1vws6ubS-riZzGLYM5rPjnxc17AzHKk~kV13zdLLUZW271Fdl2EbolUdSSreUDSXpwC0Vz9DX4-2s6fZ2Lw40Ask~8mJBC3lpddK~-j4i5Vjf8Y8EtuX7DWOgyiirVfWE9fO8kH9N4mz9zOTXaeGSN463SZnmosRiJ~MqFd7K9HbRob5VOZtaE1wlyw2zF2TFh2Qxa~VdBA5YFK5IkL9fi7rgRbgrL~iwJtXX7OZv5k4~gitpCVPsLHp6npDVo3fNZB5voNWeR1iFH1avqc9GVw__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703765&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

To verify the reliability of the established conditional diffusion models, the features of the overall input and output promoter sequences were analyzed by Weblogo and *k* -mer base frequency analyses. The results indicated that the generated and input promoters had distinct conserved regions and spacer regions ([Supplementary Fig. S13A](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). Furthermore, the correlations between all *k* -mer (2-mer, 3-mer, 4-mer, 5-mer, and 6-mer) frequencies of the input and generated promoters exceeded 0.76, demonstrating the model's reliability in learning promoter sequence features ([Supplementary Fig. S13B](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA) –F). The input and output promoter sequences for each of the eight strength classes in the conditional diffusion model were analyzed individually using Weblogo ([Supplementary Fig. S14](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)) and *k* -mer base frequency ([Supplementary Fig. S15](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). The Weblogo analysis showed that, compared with the input promoters, promoters of different strength had distinct conserved regions and exhibited clear base preferences in spacer regions. Similarly, the *k* -mer frequency correlation between generated promoters and input promoters across different strength levels ranged from 0.29 to 0.89, with particularly low correlations observed for 6-mer frequencies. These findings indicate that the conditional diffusion model not only captures the conserved regions of input promoter sequences, but also uncovers additional potential sequence patterns, moving beyond merely replicating the training data. By gradually introducing and removing noise in the latent space, the model generates new sequences that retain key features while revealing hidden patterns.

We selected 10 promoters from each strength class generated by the conditional diffusion model, resulting in 80 promoters, and constructed promoter library L6 for accuracy verification ([Supplementary Table S7](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). The results showed consistency between the generated promoters and the experimental detection results for eight strength levels (Fig. 7B), with a high correlation of 0.93 and uniform distribution of promoter strengths (Fig. 7C). This indicates that the established conditional diffusion model successfully extracted base preferences of promoters at different strength levels. Furthermore, compared to the P <sub>Trc</sub> <sub>*</sub> promoter and Anderson promoter, the model-generated promoters exhibited a wide range of strengths, providing a powerful tool for gene expression regulation (Fig. 7C). Subsequently, we used the Transformer model to predict the strengths of the promoters in library L6, achieving a high correlation of 0.95 between the predicted and measured strengths. This result demonstrates the strong synergistic effect of combining the conditional diffusion model with the Transformer model in enhancing prediction accuracy (Fig. 7D).

Our results indicate that both the WGAN-GP model and the conditional diffusion model combined with the Transformer model achieved high design accuracy. However, generative models often require substantial computational resources. To achieve target-strength promoter sequences more efficiently, we aimed to generate promoter sequences with greater diversity and a broader strength range with well-proportioned strengths. The characteristics of sequences generated by both models were compared with the input sequences using Weblogo (Fig. 8A). The results indicate that sequences generated by the WGAN-GP model closely resembled the input sequences, whereas those generated by the conditional diffusion model exhibited a broader array of motifs, demonstrating higher sequence diversity. In particular, the conditional diffusion model enables direct control over output strength classes, making it well suited for targeted expression design.

![[75d966f10361d2640235b6bd74ea718d_MD5.jpg]]

Figure 8.

Comparison of sequence characteristics and strengths generated by WGAN-GP and conditional diffusion models. (**A**) Weblogo analysis of promoter sequences generated by the WGAN-GP model, the conditional diffusion model, and input promoter sequences. (**B**) Strength distribution of promoters generated by WGAN-GP and conditional diffusion models. Density reflects the probability of promoter emergence. Strength was predicted by the Transformer model. (**C**) Experimentally validated strength distribution of sequences generated by WGAN-GP and conditional diffusion models.

[Open in new tab](https://academic.oup.com/view-large/figure/539703769/gkaf863fig8.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig8.jpeg?Expires=1781659124&Signature=Qr9HDRU~oTVEwrR~sA4b1rQFJlbk6zuQqntwDpR5srZ~oJJGUQZ~pIEdQp26RbC5Ijv6oc~kFVI64gJIUBCFi0AL6sJEiIPC3UWEHgJ3bNY3Dh~2qgAnOHMghgAtklXUDfPrP-qVC7BQ3gsqtwRRsmaD6JmL2FsDVrdNBrztekdZspjAm9IKQysOc6divJifvqrIOligPz8dsh7MSqJTAIgGn-kJK5SCFt-Yzk-2f9illQEoyBMv-ZQJ9Hcd2Hc7e5XFfs~4IAkhIpISLFSQ3NOm5db9mft6Sy7pfhZVZMrUP3zKxLP-cdyiwjybq4Xg6sAI7Ofc4dVs6jVZBhRdWA__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703769&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

In addition, sequences generated by the conditional diffusion model displayed a more balanced strength distribution (Fig. 8B) and a higher fraction of promoters with predicted strengths >2.5 compared to WGAN-GP generated sequences and training dataset ([Supplementary Fig. S16](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). A uniform distribution of promoter strengths ensures comprehensive promoter coverage, increased platform efficiency, and decreased computing power requirements. Further experiments comparing the strengths of sequences generated by the two models revealed that the promoter sequences generated by the conditional diffusion model exhibited a broader strength range and higher average strength (Fig. 8C). Collectively, the core promoters generated by the conditional diffusion model exhibited higher sequence diversity and a wider and well-proportioned strength distribution, demonstrating superior performance than the WGAN-GP model.

### Rationally designed promoters as plug-and-play tools to precisely regulate gene expression in different surrounding sequences

The established promoter design platform enables the rapid acquisition of artificial promoters with specific strengths, which are essential for customizing promoters in synthetic biology. To validate the platform's effectiveness to design plug-and-play tools, eight core promoters with gradient strengths were generated, and their strength predictability was analyzed across six distinct upstream and Disc sequences (Fig. 9A and [Supplementary Table S8](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). The surrounding sequences (66.7%–95.2% AT-content) from LaFleur *et al.* \[5\] exhibited graded transcriptional effects, enabling robust assessment of core promoter performance. The results demonstrate a strong linear correlation between predicted core promoter strength and actual gene expression levels across different surrounding sequences (*R* > 0.89) ([Supplementary Fig. S17](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). Analyzing the variation in gene expression levels for the same core promoter, we found that surrounding sequences influence the final transcription output, with the degree of influence depending on the core promoter used (Fig. 9B). Despite this, the overall correlation between predicted core promoter strength and measured average expression levels remained high (*R* = 0.93), highlighting the predictable output of the designed core promoters as plug-and-play tools (Fig. 9C). Furthermore, these eight core promoters were used to optimize the performance of a glucaric acid-inducible promoter (Fig. 9D and E). Strong core promoters (P1–P3) resulted in high leaky expression, while medium-strength core promoters (P4–P6) exhibited extremely low leaky expression and high maximum output after induction, resulting in high dynamic ranges. However, weak-strength promoters (P7 and P8) lost the expression function of the inducible promoter (Fig. 9F and [Supplementary Fig. S18](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). These results indicate that the designed core promoters are useful plug-and-play tools for regulating inducible expression systems.

![[003a49664701ec0b60d3fb51e81132a0_MD5.jpg]]

Figure 9.

Functional validation of core promoters generated by the promoter design platform in different surrounding sequences. (**A**) A schematic diagram illustrating the replacement of the core promoter, upstream sequence, and Disc sequence. The upstream sequence consists of 16–20 bp located upstream of the -35 box, while the Disc sequence includes the 6 bp downstream of the -10 box and the transcription start site. (**B**) Variation in sfGFP expression levels regulated by eight gradient-strength core promoters across six different surrounding sequences. (**C**) Correlation analysis between the predicted value and observed strengths of eight gradient-strength core promoters under six different surrounding sequences. The coloured points represent different surrounding sequences. (**D**) The working principle of the glucarate-inducible promoter. In the absence of glucarate, cdaR remains inactive, keeping the inducible promoter in the “OFF” state. In the presence of glucarate, cdaR is activated, which simultaneously enhances the expression of its own genes as well as those controlled by P <sub>gudP</sub>. This activation switches the inducible promoter to the “ON” state. (**E**) Replacing the core promoter of P <sub>gudP</sub> with platform-designed core promoters to modulate the inducibility. (**F**) Optimization the performance of glucarate-inducible promoter by eight gradient-strength core promoters. Leakiness represents the basal expression level in the absence of an inducer. V\_max represents the maximum expression level after induction. Dynamic range represents the fold change between leaky and maximal expression. Error bars represent the mean ± standard deviation from three independent biological replicates.

[Open in new tab](https://academic.oup.com/view-large/figure/539703773/gkaf863fig9.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig9.jpeg?Expires=1781659124&Signature=GTiLrWW7tYIY7FadRIRkJcGAl~bb5YUlpMoevP8qhApB1i-MOBUDczTkTJhXpzAPAqqkwoffSPgZPLoAoxU7L0S4RntDOsLPF020Yo~mYiGzupXM-dlKDKpzNr5jPOXMMz9DiNkjqKbkxd~Dss5HTRrCgFgO~WYxD1u1YHUo7BzZ-fo-U30-cN6PJtky8xIqwxUGSiDT~buQZg1l3zpVPkI6Kj3~N3hL5I7BlrwG-Lp7YLdVJgeBMHLfLCInIWPtIPn2Jf207EdZodig1fsjNLIJIdYRHMt2S03i4sFoP7hHeLhqumAONiM68BnOGz95ol8fBTI0TY7mhJzbqAPg1Q__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703773&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

Furthermore, the promoter library L7 with gradient strengths were generated to regulate the expression of sfGFP, RFP, CFP, BFP, OFP, and YFP, thereby verifying its broader applicability in expressing different genes (Fig. 10A and [Supplementary Table S9](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). The results revealed similar gradient expression levels for all six fluorescent proteins. To visually illustrate the functions of the *de novo* designed promoters, we measured the luminescence of each fluorescent protein under the control of promoters with varying strengths on agar plates (Fig. 10B and [Supplementary Fig. S19](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781659124&Signature=C5two0xsPNSIukxE1MtKl1Q5vREl~-8LTnQud0tdmrt5AtVmk89zH8KX7tBash8OoL7Yh-RxI1RnfjiNUHk7Gp4O-BGkeJRqcamARdkjtphlNRwW4Ki85--MOJtYa2fqLVtmuZMtocL4ddunFGTT~4C6KkBqNbdizBdofaBswzWayfehPC6ScOy9oottFzK5WPAdZGITSACLoc2zySyCrp84fcuZZyGDfcBmABApMou0FZnlFZXIuxZuvfLpUurTkIBRpspmgYrSN1~vbqnck70-46CG3kfi26oH3UCcYAnOT9Ah~ZgvZSeByFmK9sDb3kG345C~7b3XrSnrw01Ocg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA)). While low expression levels may be difficult to distinguish with the naked eye, medium- to high-strength promoters clearly displayed a range of expression levels for different fluorescent protein genes. Using medium- and high-strength promoters to express fluorescent proteins resulted in a colorful display (Fig. 10C and D), demonstrating the flexible application of the generated promoters.

![[3b42b186152fe34bd4d4cb875b145322_MD5.jpg]]

Figure 10.

Fine-tuning the expression of different genes using promoters designed by the promoter design platform. (**A**) Expression levels of various fluorescent proteins regulated by gradient-strength core promoters. (**B**) Visual comparison of the expression levels of six different fluorescent proteins. (**C**) Visual analysis of strains expressing different fluorescent proteins at different levels. Fluorescence images were captured under a 365–370 nm UV light source without a filter, as well as using a Thmorgan GFP fluorescence observation filter with a 445–488 nm excitation light source and a 488–750 nm emission filter (Thmorgan, Beijing, China). These two images were then overlaid using Photoshop to generate the final image (Fig. 10B and C). (**D**) Preliminary sketch of Fig. 10C. The employed promoters and fluorescent proteins are illustrated in different areas of the graphic.

[Open in new tab](https://academic.oup.com/view-large/figure/539703775/gkaf863fig10.jpg) [Download slide](https://academic.oup.com/DownloadFile/DownloadImage.aspx?image=https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863fig10.jpeg?Expires=1781659124&Signature=dm09ifzImvEVZnxXZ6AsqPMGXl5ho5YdQqr1iBNkZFED6ZqJBOWx9sLUZ~96wpG4Nev~2kR2NF4dBLpCX31pVmwn7anpXk~xO-eq9pK7QJ0NETRHsf~wVCHYdgmmtCRiZDqEh4vVsuCPO4M4iLukdj9AKbA1M3TUFBNhf8lsRUTGoK2mkZAu~61l6LR86yMtCYZqZ1tjKWuStahZKgOKUPO07E1rJZxuiNgY-5NkssYoJDUa2fMTZYSImXI~FO3SdGVItYBRfxKSPey3xTSXYJnQW-1~E9koiSlfWFnfsquH596ypsgrdufL2PSdb8N2K8QGmB3SW4itft2oXhlRLQ__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&sec=539703775&ar=8246948&xsltPath=~/UI/app/XSLT&imagename=&siteId=5127)

## Discussion

Predicting and designing promoter strength is central to achieving precise transcriptional control in synthetic biology \[54, 55\]. Despite the well-characterized sequence motifs of *E. coli* promoters, their strength remains difficult to predict, due to complex and nonlinear sequence–function relationships. Deep learning models offer a promising solution by capturing such complexity from large-scale data. To support deep learning, we established the MBRS method to construct a large-scale synthetic core promoter library and generate a dataset of 112 955 variants. Analysis revealed that conserved and spacer regions modulate promoter strength via RNAP binding affinity and DNA rigidity, enabling coarse and fine tuning, respectively. Using the obtained large dataset, we established and compared different deep learning models to develop a promoter strength prediction platform. Additionally, we developed a promoter *de novo* design platform based on a conditional diffusion model and a WGAN-GP model to design novel promoters with desired strengths. This platform exhibited robust functionality in designing core promoters and expressing different genes within various surrounding sequences, demonstrating significant application potential in synthetic biology.

The quality and size of the dataset for training deep learning models is critical for its accuracy. To obtain an appropriate dataset, researchers often mine genomes to obtain numerous promoter features. For instance, Wang *et al.* used 14 098 *E. coli* genomic promoters to train a WGAN-GP model, achieving a 70.8% functionality rate for generated sequences \[19\]. Additionally, Wang *et al.* developed DRSAdesign and Ndesign models to generate promoters and predict promoter strength, respectively, using genomic promoters as a dataset \[56\]. The predicted promoter strength had a correlation of 0.5 with the experimentally measured actual strength. The context-specific activity of genomic promoters and their interactions with potential TFs may reduce the accuracy of a dataset, and further decrease the predictability of trained models.

To address these limitations, we developed the high-throughput MBRS method to construct a diverse and functionally validated promoter library. Unlike Sanger sequencing \[11\] or FACS-based virtual allocation \[18, 57\], our approach combines rational design of -10/-35 boxes and spacer randomization to achieve both functional resolution and sequence diversity, yielding this dataset, spanning four orders of magnitude in expression. Minor variability was observed, likely due to stochastic factors and barcode-related noise. To mitigate such effects, we used a standardized RBS \[37\] to buffer 5′UTR-associated noise, alongside log <sub>2</sub> transformation and replicate filtering. The final dataset achieved replicate correlations of *R* = 0.74–0.77 and a mean CV of 0.4. Some barcode similarity may have introduced minor systematic bias, highlighting opportunities to further improve barcode design. Nevertheless, the dataset supported highly accurate predictive and generative models, confirming its robustness for data-driven promoter design. Compared to traditional MPRA, the MBRS workflow offers enhanced design modularity and scalability through structured primer assembly, while maintaining compatibility with barcode-based expression quantification strategies. As such, MBRS can be viewed as an MPRA-aligned but more flexible and cost-effective approach for constructing large-scale synthetic libraries.

Different models have advantages and disadvantages in learning a given dataset. Wang *et al.* compared WGAN-GP, PSSM, and DCGAN models for sequence generation, finding WGAN-GP advantageous for generating new promoter sequences \[19\]. Therefore, the WGAN-GP model was selected in this study to learn our dataset for promoter generation. Ahmed *et al.* utilized deep learning models, including CNN, Transformer and LSTM, to predict enhancer–promoter interactions \[58\]. The results demonstrated that the Transformer-based model outperformed the others in terms of area under the receiver operating characteristic curve (AUC-ROC), the area under the precision-recall curve (PR-AUC), and accuracy. Based on this, to select a suitable model for promoter strength prediction, we tested Transformer, CNN and LSTM models, ultimately finding the Transformer architecture best suited for our dataset. Moreover, inspired by the customization of novel promoters with required strength, LaFleur *et al.* trained a hybrid biophysical-machine learning model using 5 193 promoters with measured expression levels, and calculated structural and energetic properties to predict transcription initiation rates, achieving highly accurate predictions (*R* ² = 0.80) and generating σ <sup>70</sup> promoters with ideal transcription rates \[5\]. To improve design accuracy, we constructed a substantially larger and more diverse synthetic dataset. This enabled the development of a deep learning-based *de novo* promoter design platform in *E. coli*, which achieved a high correlation of 0.95 between predicted and measured strengths. These results also underscore the ability of the Transformer model to accurately predict the strengths of entirely novel promoter sequences not seen during training. As the first implementation of such a system in this organism, it lays the foundation for broader applications. We believe this framework holds strong potential for adaptation to other bacterial species, particularly those sharing conserved σ <sup>70</sup> -type promoter features.

Core promoters, as minimal gene transcription regulatory elements, play a crucial role in the development of diverse functional synthetic biology tools \[59\]. Combining TFBSs, UTRs, UP elements and RBSs with core promoters can generate a variety of novel functional gene regulation tools \[60\]. The sequences surrounding core promoters also influence gene expression levels \[21\]. To design promoters and predict their strengths while considering surrounding sequences, Zhang *et al.* developed the DeepSEED model using deep learning methods with MPRA results from 29 249 promoters (165 bp including core promoter, UP element, and UTR region) as the training dataset \[21\]. Additionally, LaFleur *et al.* used 5193 promoters (75 bp including core promoter, UP element, discriminator, and initial transcribed region) to develop a 346-parameter model by combining MPRA, biophysics, and machine learning \[5\]. Consequently, the established models effectively learned the features of the input datasets. However, simultaneous changes in multiple functional regions create billions of possible promoter combinations, and the small size of the input training dataset often leads to failures in designing desired promoters or predicting promoter strengths in various scenarios. Furthermore, training models on long DNA sequences demands substantial computational resources and intricate fine-tuning \[46\]. Therefore, an extremely large and accurate dataset is essential for *de novo* promoter design and strength prediction, taking surrounding sequences into consideration.

Although this study focuses on short (35 bp) core promoters with a fixed architecture, it represents the first implementation of a closed-loop design framework that is inherently extensible. The current dataset and model structure provide a solid foundation for future integration of additional regulatory components, such as UP elements, UTRs, RBSs, and TFBSs, which can be incorporated through region-specific randomization and retraining strategies. Moreover, the attention-based architecture of the Transformer model offers interpretable insights into promoter regulatory logic, laying the groundwork for mechanism-aware design of more complex regulatory architectures. This modular design supports the systematic exploration of combinatorial regulatory logic and facilitates adaptation to more complex promoter architectures in synthetic biology. Notably, the predicted strength distribution of generated promoters was more balanced relative to the training set, indicating the model's potential to explore stronger, previously unsampled designs. To enhance accessibility, we have deployed the platform as a public webserver ([www.yudenglab.com](http://www.yudenglab.com/)), where users can design, predict, and evaluate synthetic promoters. The platform has demonstrated plug-and-play functionality across diverse sequence contexts and enables programmable control of gene expression in synthetic biology applications.

## Acknowledgements

*Author contributions*: Xuan Zhou (Data curation \[lead\], Investigation \[equal\], Methodology \[equal\], Software \[equal\], Validation \[lead\], Visualization \[lead\], Writing—original draft \[lead\]), Renxu Feng (Software \[supporting\], Validation \[supporting\]), Nana Ding (Conceptualization \[supporting\], Investigation \[supporting\]), Wenyan Cao (Data curation \[supporting\], Validation \[supporting\], Visualization \[supporting\]), Yang Liu (Software \[lead\], Supervision \[equal\]), Shenghu Zhou (Conceptualization \[lead\], Funding acquisition \[equal\], Investigation \[equal\], Supervision \[equal\], Writing—review & editing \[lead\]), Yu Deng (Funding acquisition \[lead\], Supervision \[equal\], Writing—review & editing \[equal\]).

## Supplementary data

[Supplementary data](https://academic.oup.com/nar/article-lookup/doi/10.1093/nar/gkaf863#supplementary-data) is available at NAR online.

## Conflict of interest

The authors declare no competing interests.

## Funding

This work was supported by the National Key R&D Program of China (2024YFA0918000), Distinguished Young Scholars of Jiangsu Province (BK20220089), Key R&D Project of Jiangsu Province (Modern Agriculture) (BE2022322), the National Natural Science Foundation of China (22378170 and 22478156), and the “Pilot Plan” Internet of Things Special Project (China Institute of IoT \[Wuxi\] and Wuxi Internet of Things Innovation Promotion Center; 2022SP-T16-B). Funding to pay the Open Access publication charges for this article was provided by the National Key R&D Program of China with grant agreement number 2024YFA0918000.

## Data availability

Raw data of NGS for promoter library L4 has been deposited to the NCBI Short Read Archive, with Accession No. BioProject: PRJNA1189185 ([https://dataview.ncbi.nlm.nih.gov/object/PRJNA1189185](https://dataview.ncbi.nlm.nih.gov/object/PRJNA1189185)). Computer source codes for the core promoter strength prediction platform and the *de novo* promoter design platform, based on the conditional diffusion model and Transformer model, can be found at [https://doi.org/10.5281/zenodo.15737101](https://doi.org/10.5281/zenodo.15737101).

## Notes

Mailing address: National Engineering Laboratory for Cereal Fermentation Technology, Jiangnan University, 1800 Lihu Road, Wuxi, Jiangsu 214122, China.

## References

Van Brempt

M

,

Clauwaert

J

,

Mey

F

et al...

Nat Commun

.

2020

;

11

:

5822

[10.1038/s41467-020-19446-w](https://doi.org/10.1038/s41467-020-19446-w)

.

Espah

Borujeni A

,

Zhang

J

,

Doosthosseini

H

et al...

Nat Commun

.

2020

;

11

:

5001

[10.1038/s41467-020-18630-2](https://doi.org/10.1038/s41467-020-18630-2)

.

Ireland

WT

,

Beeler

SM

,

Flores-Bautista

E

et al...

eLife

.

2020

;

9

:

e55308

[10.7554/eLife.55308](https://doi.org/10.7554/eLife.55308)

.

Cvetesic

N

,

Lenhard

B

.

Nat Biotechnol

.

2017

;

35

:

123

–

4

.

[10.1038/nbt.3788](https://doi.org/10.1038/nbt.3788)

.

LaFleur

TL

,

Hossain

A

,

Salis

HM

.

Nat Commun

.

2022

;

13

:

5159

[10.1038/s41467-022-32829-5](https://doi.org/10.1038/s41467-022-32829-5)

.

Shultzaberger

RK

,

Chen

Z

,

Lewis

KA

et al...

Nucleic Acids Res

.

2007

;

35

:

771

–

88

.

[10.1093/nar/gkl956](https://doi.org/10.1093/nar/gkl956)

.

Mazumder

A

,

Kapanidis

AN

.

J Mol Biol

.

2019

;

431

:

3947

–

59

.

[10.1016/j.jmb.2019.04.046](https://doi.org/10.1016/j.jmb.2019.04.046)

.

Bharanikumar

R

,

Premkumar

KAR

,

Palaniappan

A

.

PeerJ

.

2018

;

6

:

e5862

[10.7717/peerj.5862](https://doi.org/10.7717/peerj.5862)

.

Meng

H

,

Ma

Y

,

Mai

G

et al...

Quant Biol

.

2017

;

5

:

90

–

8

.

[10.1007/s40484-017-0096-3](https://doi.org/10.1007/s40484-017-0096-3)

.

Zhao

M

,

Yuan

Z

,

Wu

L

et al...

ACS Synth Biol

.

2022

;

11

:

92

–

102

.

[10.1021/acssynbio.1c00117](https://doi.org/10.1021/acssynbio.1c00117)

.

Li

W

,

Yin

Y

,

Quan

X

et al...

Front Genet

.

2019

;

10

:

1077

[10.3389/fgene.2019.01077](https://doi.org/10.3389/fgene.2019.01077)

.

Yang

W

,

Li

D

,

Huang

R

.

Front Microbiol

.

2023

;

14

:

1215609

[10.3389/fmicb.2023.1215609](https://doi.org/10.3389/fmicb.2023.1215609)

.

Ding

N

,

Yuan

Z

,

Zhang

X

et al...

Nucleic Acids Res

.

2020

;

48

:

10602

–

13

.

[10.1093/nar/gkaa786](https://doi.org/10.1093/nar/gkaa786)

.

LeCun

Y

,

Bengio

Y

,

Hinton

G

.

Nature

.

2015

;

521

:

436

–

44

.

[10.1038/nature14539](https://doi.org/10.1038/nature14539)

.

Zimerman

I

,

Wolf

L

.

arXiv

28 November 2023, preprint: not peer reviewed

[10.48550/arXiv.2311.16620](https://doi.org/10.48550/arXiv.2311.16620)

.

Kotopka

BJ

,

Smolke

CD

.

Nat Commun

.

2020

;

11

:

2113

[10.1038/s41467-020-15977-4](https://doi.org/10.1038/s41467-020-15977-4)

.

Wang

Y

,

Wang

H

,

Wei

L

et al...

Nucleic Acids Res

.

2020

;

48

:

6403

–

12

.

[10.1093/nar/gkaa325](https://doi.org/10.1093/nar/gkaa325)

.

Seo

E

,

Choi

YN

,

Shin

YR

et al...

Nucleic Acids Res

.

2023

;

51

:

7071

–

82

.

[10.1093/nar/gkad451](https://doi.org/10.1093/nar/gkad451)

.

Zhang

P

,

Wang

H

,

Xu

H

et al...

Nat Commun

.

2023

;

14

:

6309

[10.1038/s41467-023-41899-y](https://doi.org/10.1038/s41467-023-41899-y)

.

Kingma

DP

,

Welling

M

.

arXiv

10 December 2022, preprint: not peer reviewed

[10.48550/arXiv.1312.6114](https://doi.org/10.48550/arXiv.1312.6114)

.23.

Doersch

C

.

arXiv

3 January 2021, preprint: not peer reviewed

[10.48550/arXiv.1606.05908](https://doi.org/10.48550/arXiv.1606.05908)

.

Li

Y

,

Wei

X

,

Yang

Q

et al...

BMC Biol

.

2024

;

22

:

126

[10.1186/s12915-024-01923-z](https://doi.org/10.1186/s12915-024-01923-z)

.

Sasikala

S

,

Ratha

Jeyalakshmi T

.

Int J Inf Tecnol

.

2021

;

13

:

493

–

9

.

[10.1007/s41870-020-00565-y](https://doi.org/10.1007/s41870-020-00565-y)

.

Panigrahi

A

,

O’Malley

BW

.

Genome Biol

.

2021

;

22

:

108

[10.1186/s13059-021-02322-1](https://doi.org/10.1186/s13059-021-02322-1)

.

Xu

K

,

Yu

S

,

Wang

K

et al...

ACS Synth Biol

.

2024

;

13

:

402

–

7

.

[10.1021/acssynbio.3c00578](https://doi.org/10.1021/acssynbio.3c00578)

.

Xu

H

,

Li

C

,

Xu

C

et al...

Nat Commun

.

2023

;

14

:

1826

[10.1038/s41467-023-37610-w](https://doi.org/10.1038/s41467-023-37610-w)

.

Hossain

A

,

Lopez

E

,

Halper

SM

et al...

Nat Biotechnol

.

2020

;

38

:

1466

–

75

.

[10.1038/s41587-020-0584-2](https://doi.org/10.1038/s41587-020-0584-2)

.

Kim

B

,

Binkley

R

,

Kim

HU

et al...

Biotech Bioeng

.

2018

;

115

:

2554

–

64

.

[10.1002/bit.26797](https://doi.org/10.1002/bit.26797)

.

Thompson

MG

,

Sedaghatian

N

,

Barajas

JF

et al...

Sci Rep

.

2018

;

8

:

1590

.

Ebersbach

G

,

Gerdes

K

.

Annu Rev Genet

.

2005

;

39

:

453

–

79

.

[10.1146/annurev.genet.38.072902.091252](https://doi.org/10.1146/annurev.genet.38.072902.091252)

.

Jahn

M

,

Vorpahl

C

,

Hubschmann

T

et al...

Microb Cell Fact

.

2016

;

15

:

211

[10.1186/s12934-016-0610-8](https://doi.org/10.1186/s12934-016-0610-8)

.

Mutalik

VK

,

Guimaraes

JC

,

Cambray

G

et al...

Nat Methods

.

2013

;

10

:

354

–

60

.

[10.1038/nmeth.2404](https://doi.org/10.1038/nmeth.2404)

.

Lou

C

,

Stanton

B

,

Chen

YJ

et al...

Nat Biotechnol

.

2012

;

30

:

1137

–

42

.

[10.1038/nbt.2401](https://doi.org/10.1038/nbt.2401)

.

Qian

Y

,

Huang

HH

,

Jimenez

JI

et al...

ACS Synth Biol

.

2017

;

6

:

1263

–

72

.

[10.1021/acssynbio.6b00361](https://doi.org/10.1021/acssynbio.6b00361)

.

Sarvari

P

,

Ingram

D

,

Stan

GB

.

Biology

.

2021

;

10

:

37

.

Browning

DF

,

Busby

SJ

.

Nat Rev Micro

.

2004

;

2

:

57

–

65

.

[10.1038/nrmicro787](https://doi.org/10.1038/nrmicro787)

.

Brewster

RC

,

Jones

DL

,

Phillips

R

.

PLoS Comput Biol

.

2012

;

8

:

e1002811

[10.1371/journal.pcbi.1002811](https://doi.org/10.1371/journal.pcbi.1002811)

.

Chen

Y

,

Ho

JML

,

Shis

DL

et al...

Nat Commun

.

2018

;

9

:

64

[10.1038/s41467-017-02473-5](https://doi.org/10.1038/s41467-017-02473-5)

.

Li

J

,

Zhang

Y

.

Eur Phys J E

.

2014

;

37

:

44

[10.1140/epje/i2014-14086-1](https://doi.org/10.1140/epje/i2014-14086-1)

.

Geggier

S

,

Vologodskii

A

.

Proc Natl Acad Sci USA

.

2010

;

107

:

15421

–

6

.

[10.1073/pnas.1004809107](https://doi.org/10.1073/pnas.1004809107)

.

Vaishnav

ED

,

de Boer

CG

,

Molinet

J

et al...

Nature

.

2022

;

603

:

455

–

63

.

[10.1038/s41586-022-04506-6](https://doi.org/10.1038/s41586-022-04506-6)

.

Tang

X

,

Zheng

P

,

Li

X

et al...

Methods

.

2022

;

204

:

142

–

50

.

[10.1016/j.ymeth.2022.04.011](https://doi.org/10.1016/j.ymeth.2022.04.011)

.

Zeng

W

,

Wu

M

,

Jiang

R

.

BMC Genomics

.

2018

;

19

:

84

[10.1186/s12864-018-4459-6](https://doi.org/10.1186/s12864-018-4459-6)

.

Crooks

GE

,

Hon

G

,

Chandonia

JM

et al...

Genome Res

.

2004

;

14

:

1188

–

90

.

[10.1101/gr.849004](https://doi.org/10.1101/gr.849004)

.

Sohl-Dickstein

J

,

Weiss

E

,

Maheswaranathan

N

et al..

Francis

B

,

David

B

Proceedings of the 32nd International Conference on Machine Learning

.

2015

;

37

:

PMLR

2256

–

65

.

Proceedings of Machine Learning Research

.

Ho

J

,

Jain

A

,

Abbeel

P

.

arXiv

16 December 2020, preprint: not peer reviewed

[10.48550/arXiv.2006.11239](https://doi.org/10.48550/arXiv.2006.11239)

.

Martin

Arjovsky SC

,

Bottou

L

.

arXiv

6 December 2017, preprint: not peer reviewed

[10.48550/arXiv.1701.07875](https://doi.org/10.48550/arXiv.1701.07875)

.

Feng

T

,

Hu

T

,

Liu

W

et al...

Int J Mol Sci

.

2023

;

24

:

17548

[10.3390/ijms242417548](https://doi.org/10.3390/ijms242417548)

.

Hwang

HJ

,

Lee

SY

,

Lee

PC

.

Biotechnol Biofuels

.

2018

;

11

:

103

[10.1186/s13068-018-1104-1](https://doi.org/10.1186/s13068-018-1104-1)

.

Jin

LQ

,

Jin

WR

,

Ma

ZC

et al...

Appl Microbiol Biotechnol

.

2019

;

103

:

8725

–

36

.

[10.1007/s00253-019-10172-y](https://doi.org/10.1007/s00253-019-10172-y)

.

Wang

X

,

Xu

K

,

Tan

Y

et al...

Advanced Genetics

.

2023

;

4

:

2300184

[10.1002/ggn2.202300184](https://doi.org/10.1002/ggn2.202300184)

.

Zhou

Y

,

Yuan

Y

,

Wu

Y

et al...

ACS Synth Biol

.

2022

;

11

:

977

–

89

.

[10.1021/acssynbio.1c00595](https://doi.org/10.1021/acssynbio.1c00595)

.

Ahmed

FS

,

Aly

S

,

Liu

X

.

BMC Bioinf

.

2024

;

25

:

216

[10.1186/s12859-024-05784-9](https://doi.org/10.1186/s12859-024-05784-9)

.

Teng

Y

,

Zhang

J

,

Jiang

T

et al...

Curr Opin Biotechnol

.

2022

;

75

:

102696

[10.1016/j.copbio.2022.102696](https://doi.org/10.1016/j.copbio.2022.102696)

.

de Boer

CG

,

Vaishnav

ED

,

Sadeh

R

et al...

Nat Biotechnol

.

2020

;

38

:

1211

[10.1038/s41587-020-0665-2](https://doi.org/10.1038/s41587-020-0665-2)

.

## Supplementary data

[gkaf863\_Supplemental\_Files](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/53/16/10.1093_nar_gkaf863/2/gkaf863_supplemental_files.zip?Expires=1781842242&Signature=H1WPv80vhxiRmtYAco0vSQMaNiVJ4bwaVIqdwcqG4~ajfocsIHhNMaBIFJK909wgQlU4~SaD9hTGFBWVF3AU1fabQjBw3HMMWdylne5O~LIgWgQGDBArEpMx3AwyzrE9BJN8gaE-24M7rfRhxKAigVEa2otCmH3HO8iZSXluhAyjSVl6~2sUK5Rxoq-4BWn4UGZohBkr1KEFP3Z-tZGYklz2W2C5lyOZWEVIBNMGGpYC8RtugFS1~pMHt9OLbuc96w9ch0OxcA3waXBfiHx0s1H65XDJVTvmd~6OQ5iRCtMN5VmFraAQ6q1Xfljeq4kNBe23GkAODaK8Y~0nVyRTLw__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA) - zip file