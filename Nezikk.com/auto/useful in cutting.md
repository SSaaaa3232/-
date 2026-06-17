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


## article：

### content：

khazix-skills：ideal for AI trend analysis, long-form breakdowns, and deep insight output

humanizer-zh：de-ai

### image prompt：

GPT-image2 Skill

baoyu-skill

ian-xiaohei-illustrations

it turns article points, processes, emotions, and metaphors into "little black" style illustrations.

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

## cutting-edge and hardcore video :
![[useful in cutting 2026-06-16 21.56.09.excalidraw]]\
### original:
This video showcases an extremely cutting-edge and hardcore video production method: the video was created without using any traditional non-linear editing software (such as Premiere or Final Cut). Instead, it was "edited" entirely through fully automated code writing and command-line tool invocation by Claude Code in collaboration with Fable 5. The entire workflow is abstracted into a software engineering project, primarily encompassing the following key steps: 1. Full Speech Transcription and Timestamping (Whisper): The 25GB of raw footage captured (17 takes, 4 scenes) is handed over to a locally running Whisper model. The model not only outputs the text but also generates a word-level timestamp JSON file with millisecond precision. 2. AI Intelligent Selection of Best Shots (Subagents): Multiple Subagents (sub-intelligences) automatically analyze and cull filler footage containing filler words like "um" or "ah" based on the generated JSON file, selecting the clearest expressions with the cleanest endings as candidate clips. 3. FFmpeg Automatic Rough Cut: A decision JSON file is generated for the final clips selected by the AI, then ffmpeg is directly invoked via code to seamlessly stitch these clips together, completing the first rough cut. 4. Pure Code Custom Color Grading: The AI handwrites LUTs (Look-Up Table) code from scratch, and to facilitate human intervention, it also automatically generates an HTML webpage with sliders, allowing humans to intuitively adjust color temperature, brightness, and contrast by dragging sliders—the refined parameters are then directly fed back into the code. 5. React Component-Based Animation Production (Remotion): After Effects is not used at all. The AI transcribes originally static graphic files into Remotion animation components based on React. Leveraging the word timestamps from the first step, the AI achieves extremely precise "on-beat" timing—when the author utters a specific word (like "right"), the UI animation automatically triggers, eliminating any need for manual timeline alignment. 6. Figma MCP Collaborative Polishing: The AI exports the generated visuals to Figma for the human design team to handle layout and visual optimization. Once human modifications are complete, the AI uses MCP (Model Context Protocol) to automatically "pull" the latest Figma design back into the code, ultimately rendering a 4K 24fps final cut.

source:https://x.com/trq212/status/2064826394589442448