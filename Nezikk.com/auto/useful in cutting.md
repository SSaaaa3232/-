---
aliases:
  - https://datawhalechina.github.io/happy-figure/chapter1/
sourse: happy-figure
---
## basic

### Top 3：

scientific，logical，artistic

#### artistic：

Aesthetic preferences in different 

### **Physics, Computer Science and Artificial Intelligence**

### style：

Minimalism

### represent：

CVPR、NeurIPS，Nature Physics

### preference：

flat design and vector aesthetics

They mostly use low-saturation Morandi color schemes, with sharp and clear lines, emphasizing the direct expression of topological structure and logical flow, and rejecting unnecessary 3D rendering and lighting embellishment.

### **Biological, Medical and Materials Science**

### style：

simulation

### represent：
Nature、Science，Cell 

### preference：

3D texture and realistic environment

They emphasize the richness of microscopic details, often using rendering techniques such as ambient occlusion (AO) and subsurface scattering (SSS) to simulate the realistic texture of cells, proteins, or nanomaterials, creating an immersive microscopic world through a strong visual impact.

### technology dependence：

LLM spatial reasoning and native text rendering capabilitie

## video：

HyperFrames、Remotion Skills、video-use、ffmpeg-skill、Manim Skill、OpenMontage

TTS：Voxtts

这个是专门做了个网站，用的 three.js 之类的，然后录屏

主要是 Codex 和 Hyperframes

## article：

### content：

khazix-skills：ideal for AI trend analysis, long-form breakdowns, and deep insight output

humanizer-zh：de-ai

### image prompt：

GPT-image2 Skill

baoyu-skill

ian-xiaohei-illustrations：it turns article points, processes, emotions, and metaphors into "little black" style illustrations.

不同风格抽卡

nskill

ncreate

## tips：

1:
plastic feel

specify the HEX color value directly in the prompt text

```
[Structural Constraint] - Preserve all components and connections from Image - Do not add or remove any elements [Style & Color Enforcement] - Visual Style: CVPR / NeurIPS academic schematic - Rendering: 2D flat vector, clean and minimal - Background: Pure White (#FFFFFF) - Color Scheme: * Inputs and Linear layers: Light Grey (#E0E0E0) * Attention core: Pastel Purple (#D1C4E9) * Concat layer: Pastel Yellow (#FFF59D)
```

2:
image to image---complexity，style transfer

structural framework of spatial topology

- use excalidraw to draw a skeleton（draft）or draw by yourself

the target style that defines visual features

```
[Layout Constraints] 
* Type: Vertical Stack (Bottom-up Flow) 
* Background: Pure White, No Shadow 

[Zone 1: Inputs (Bottom)] 

- Objects: Three labels "V", "K", "Q" arranged horizontally 
- Connection: Arrows pointing upward to Zone 2 

[Zone 2: Linear Projections] 

- Shape: 3 small rounded rectangles arranged horizontally 
- Label: "Linear" inside each box 
- Outline: 2px solid outline 

[Zone 3: The Multi-Head Core (Middle)] 

- Main Object: A wide rectangle labeled "Scaled Dot-Product Attention" 
- Visual Effect: Stacked layers to represent multiple heads 
- Connection: Receiving arrows from Zone 2 

[Zone 4: Output Processing (Top)] 

- Object A: A rectangle labeled "Concat" 
- Object B: A rectangle labeled "Linear" 
- Layout: Object B is placed above Object A 

[Rendering Notes] 

- Use the provided reference image for visual language only 
- Layout and structure must strictly follow the constraints above
```

## edit：

de-watermark：https://github.com/GargantuaX/gemini-watermark-remover/tree/main

High-definition magnification：https://github.com/xinntao/Real-ESRGAN

[[3f13dbf0de433f676da7388019ef26f4_MD5.jpg|Open: Screenshot 2026-06-11 at 2.53.20 PM.png]]
![[3f13dbf0de433f676da7388019ef26f4_MD5.jpg]]