---
title: "[长篇实战] [含调优方向]记录一次M5 Max 128G 部署 ds4.c + DeepSeek V4 Flash"
source: "https://linux.do/t/topic/2150351"
author:
  - "[[son0ma]]"
published: 2026-05-10
created: 2026-05-11
---
最近看到redis之父antirez 专门为 DeepSeek V4 写了一个 Apple Metal 专用本地推理引擎 ds4.c,项目发布3天,立马收获了5.5k Star,据说性能优化提升很大,既然这么火热,那就本地部署看看能不能实现token自由~

- 在本地跑 **DeepSeek V4 Flash**；
- 用 **Apple Metal** 加速；
- 提供 OpenAI / Anthropic compatible API；
- 可以接 Claude Code / coding agent；

我的机器配置：

```plaintext
cpu: M5 Max
Memory: 128GB
Backend: Metal
Model: DeepSeek V4 Flash q2 GGUF
Project: https://github.com/antirez/ds4
```

## 第一步：克隆源码

```bash
git clone https://github.com/antirez/ds4.git
```

## 第二步：编译

```bash
make -j"$(sysctl -n hw.ncpu)"
```

成功后会生成：

```bash
./ds4
./ds4-server
```

检查一下：

```bash
ls -lh ds4 ds4-server
```

## 第三步：下载 q2 模型

```bash
cd ~/ds4
./download_model.sh q2
```

下载完成后应该看到：

```bash
gguf/DeepSeek-V4-Flash-IQ2XXS-w2Q2K-AProjQ8-SExpQ8-OutQ8-chat-v2.gguf
```

并且会自动创建：

```bash
ds4flash.gguf -> gguf/DeepSeek-V4-Flash-IQ2XXS-w2Q2K-AProjQ8-SExpQ8-OutQ8-chat-v2.gguf
```

检查：

```bash
ls -lh gguf
ls -lh ds4flash.gguf
```

模型大小80G我下载耗时15分钟~

```bash
=== attempt 12 Sun May 10 21:26:30 CST 2026 resume=5541790312 pct=6.39% ===
** Resuming transfer from byte position 5541790312
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1435  100  1435    0     0    314      0  0:00:04  0:00:04 --:--:--   412
100 75.6G  100 75.6G    0     0  83.4M      0  0:15:27  0:15:27 --:--:-- 79.7M

=== attempt 12 ended rc=0 Sun May 10 21:41:58 CST 2026 size=86720111200 ===
=== q2 download complete Sun May 10 21:41:58 CST 2026 ===
```

## 第四步：启动 ds4-server

下载完成后先检查：

```bash
cd ~/ds4
ls -lh gguf/*IQ2XXS*.gguf
ls -lh ds4flash.gguf
```

然后启动：

```bash
cd ~/ds4
./ds4-server \
--ctx 100000 \
--kv-disk-dir /tmp/ds4-kv \
--kv-disk-space-mb 16384
```

启动参数说明  
ctx 我选择100000,也就是100k tokens 上下文 先试试水  
kv-disk-dir kv缓存路径  
kv-disk-space-mb kv缓存大小,我的mac有1T大小,很宽裕,那么我就用16384 也就是16G

那么就写一个快速启动的脚本

```bash
#!/bin/sh
set -e
cd "$(dirname "$0")"

usage() {
  cat <<EOF
Usage:
  ./start-server-q2-custom.sh [CTX_TOKENS] [KV_MB] [PORT]

Defaults:
  CTX_TOKENS = 100000
  KV_MB      = 16384
  PORT       = 8000

Examples:
  ./start-server-q2-custom.sh
  ./start-server-q2-custom.sh 100000 16384
  ./start-server-q2-custom.sh 200000 32768
  ./start-server-q2-custom.sh 65536 8192 8001
EOF
}

case "${1:-}" in
  -h|--help|help)
    usage
    exit 0
    ;;
esac

CTX="${1:-100000}"
KV_MB="${2:-16384}"
PORT="${3:-8000}"
KV_DIR="${DS4_KV_DIR:-/tmp/ds4-kv}"
HOST="${DS4_HOST:-127.0.0.1}"

is_pos_int() {
  case "$1" in
    ''|*[!0-9]*) return 1 ;;
    *) [ "$1" -gt 0 ] ;;
  esac
}

if ! is_pos_int "$CTX"; then
  echo "ERROR: CTX_TOKENS must be a positive integer, got: $CTX" >&2
  usage >&2
  exit 1
fi

if ! is_pos_int "$KV_MB"; then
  echo "ERROR: KV_MB must be a positive integer, got: $KV_MB" >&2
  usage >&2
  exit 1
fi

if ! is_pos_int "$PORT"; then
  echo "ERROR: PORT must be a positive integer, got: $PORT" >&2
  usage >&2
  exit 1
fi

if [ ! -x ./ds4-server ]; then
  echo "ERROR: ./ds4-server not found or not executable. Run make first." >&2
  exit 1
fi

if [ ! -e ./ds4flash.gguf ]; then
  echo "ERROR: ./ds4flash.gguf not found. Download q2 first: ./download_model.sh q2" >&2
  exit 1
fi

mkdir -p "$KV_DIR"

echo "Starting ds4-server..."
echo "  URL:        http://$HOST:$PORT"
echo "  ctx:        $CTX"
echo "  KV dir:     $KV_DIR"
echo "  KV budget:  ${KV_MB} MB"
echo "  model:      ds4flash.gguf"
echo

exec ./ds4-server \
  --host "$HOST" \
  --port "$PORT" \
  --ctx "$CTX" \
  --kv-disk-dir "$KV_DIR" \
  --kv-disk-space-mb "$KV_MB"
```

通过脚本快速启动

```shell
./start-server-q2-custom.sh 100000 16384 8123
```

[![[392b0997317d505dbc94ac02753161d9_MD5.png]]

启动server1373×527 107 KB

](https://cdn3.ldstatic.com/original/4X/9/7/9/979108acd7c57e66076ad6c0177aecc7d9857325.png "启动server")

## 接入工具实测

终于到了实测的时候  
欢迎我们的老朋友~ CC Switch

[![[6e6b62542fde38307b2aa398856593ff_MD5.png]]

ccswitch912×448 30.1 KB

](https://cdn3.ldstatic.com/original/4X/a/8/9/a8900ac6145534d8c34a068faed089aa48690853.png "ccswitch")

  

[![[e9ba4b5ab192ac0a3b039942ddf0c1bc_MD5.png]]

ccswitch2915×747 77.9 KB

](https://cdn3.ldstatic.com/original/4X/1/1/0/11009ff4bdda93024fc64ac2efa098ac3d4ebdfe.png "ccswitch2")

  
这里key随便填写即可

准备进入claude code  

[![[9423edde7bd48a0a93d01a908f283da8_MD5.png]]

image1393×773 57.5 KB

](https://cdn3.ldstatic.com/original/4X/5/b/7/5b7ffafca360d781e70b83e7bac16612ca0aaaf1.png "image")

## 性能查看

首次对话会加载系统提示词,所以会稍微慢一点,让我们观察log 查看一下性能如何  

[![[e6f893fa9e5eb67aa2bf772c313174a2_MD5.png]]

image1393×773 68.6 KB

](https://cdn3.ldstatic.com/original/4X/e/e/e/eee38b10e5e283e0d25860913cbc9ee621bd681a.png "image")

  

[![[5871ddb57542db79767f5384f8cb4108_MD5.png]]

image1393×1049 217 KB

](https://cdn3.ldstatic.com/original/4X/6/f/3/6f39964cb3a6cc94a5814a0c7e1b8ce53e205dad.png "image")

  
首次加载系统提示词 耗时 3m13s

后续对话性能实测  

[![[28667943097bc64c111c628e5d12c689_MD5.png]]

image1393×980 143 KB

](https://cdn3.ldstatic.com/original/4X/f/b/6/fb6a81ea88f8e9d594a16eedbf299e2ed03eeb26.png "image")

  

[![[33cc9685da7acfab6a8c2c6144547160_MD5.png]]

image1307×254 65.2 KB

](https://cdn3.ldstatic.com/original/4X/c/b/4/cb4f8ca0a690deb08b4ac3d7f381ffb732474b25.png "image")

  
第二次对话 耗时 12s,因为已经把claude code系统提示词缓存至了kv,所以速度大大提升

## 干活实测

现在让他干点活试试,因为我一般不会只用对话问题来测模型智商,我只在乎实战时是否能够干活~

目标: 网站: [https://outlook.tw/](https://outlook.tw/), 使用python,实现用目标网站生产临时邮箱,和使用临时邮箱接收邮件,已知 生产邮箱是:[https://outlook.tw/api/generate?length=8&domainIndex=0,响应:{“email”:“2ndfmaet@outlook.tw”,“expires”:1778426900490,“anonymous”:true},获取邮件是:https://outlook.tw/api/emails?mailbox=2ndfmaet%40outlook.tw](https://outlook.tw/api/generate?length=8&domainIndex=0,%E5%93%8D%E5%BA%94:%7B%22email%22:%222ndfmaet@outlook.tw%22,%22expires%22:1778426900490,%22anonymous%22:true%7D,%E8%8E%B7%E5%8F%96%E9%82%AE%E4%BB%B6%E6%98%AF:https://outlook.tw/api/emails?mailbox=2ndfmaet%40outlook.tw)

[![[d73ddcd9086806191be662f16b687bdf_MD5.png]]

image1393×980 157 KB

](https://cdn3.ldstatic.com/original/4X/b/0/b/b0bf7790ea195130729526d45c33b53b75a36d83.png "image")

  

[![[519453735a7ee1492b608bf1f222d99c_MD5.png]]

image1393×980 129 KB

](https://cdn3.ldstatic.com/original/4X/4/0/6/4062beb2e9667c2088471ac292945e834e65f0c2.png "image")

  

[![[18c910a5671e221baea805fdf95f3c6b_MD5.png]]

image1393×1256 137 KB

](https://cdn3.ldstatic.com/original/4X/8/e/3/8e3b29880a199736ab1127ae60635fb8c0d84abb.png "image")

  

[![[5e2c004343e30ddf65ba2506e865526f_MD5.png]]

image1393×1256 149 KB

](https://cdn3.ldstatic.com/original/4X/7/2/2/722174e890bea37641c07bd695413d02e12cb09a.png "image")

  

[![[a1671c5c07620f0887b9114d5b8410d8_MD5.png]]

image1393×1256 145 KB

](https://cdn3.ldstatic.com/original/4X/f/6/3/f63fa44d6733fab8bbd032d7e2ba15c9860db974.png "image")

  

[![[50bae34acb7e33bc2ef0f3b091d7aa81_MD5.png]]

image1393×1256 145 KB

](https://cdn3.ldstatic.com/original/4X/b/7/7/b775a1e946b527954335f1d677bab36db70438c4.png "image")

最终耗时大概15~20分钟左右完成,但是我发现其实启动参数时还有可以优化的地方,并且claude code本来系统提示词就很重,还有我发现一个比较有意思的现象,就是当ds4.c在常驻后台是,内存占用并不大,从活动内存/常驻内存观察，闲置时占用很低；ds4.c 使用 mmap/按需加载，真正推理时内存占用会上来  
干活中:  

[![[29a53d657e1efd000735679ecde5ff57_MD5.png]]

运行时639×148 13.9 KB

](https://cdn3.ldstatic.com/original/4X/c/f/6/cf6ee6a38d8fde6ffd43253206954c4cd5bee14c.png "运行时")

  
闲置时:  

[![[7c9cbc64af657e9c1f975768ad492a10_MD5.png]]

image651×144 12.8 KB

](https://cdn3.ldstatic.com/original/4X/b/7/c/b7c8c9b90535ac9478cce494d47044fe6e3519e6.png "image")

ds4.c不像omlx或者lm studio,模型常驻后台就占用很大的内存,这一点优化做的真的是很棒

## 性能调优

我发现其实还可以在不降智的情况下,将速度调快  

[![[005a5f185cbcd690d84eef9fb1235792_MD5.png]]

image1369×528 122 KB

](https://cdn3.ldstatic.com/original/4X/8/5/4/854085d4a2fa5798e64d29b6af244555eef43bc4.png "image")

  

[![[9448c6b9ee6ef2fcd493b90c6c58d80c_MD5.png]]

image1368×452 103 KB

](https://cdn3.ldstatic.com/original/4X/b/e/8/be8e3a727f985f2d83f9c86edc18f20c9f455dfa.png "image")

  

[![[d1ef8ba5f14bd9322da9b6506a2a409f_MD5.png]]

image1374×886 213 KB

](https://cdn3.ldstatic.com/original/4X/9/5/c/95ca291f8994bcfd9b95ccfdbb4e52a9a6ea36ea.png "image")

我发现每次工具调用后,大概都有3分钟左右的 重建等待,因为默认是从更长的上下文中去找工具调用的缓存,这个其实在硬盘充裕的情况下,可以 加大 kv容量 和 缩短 缓存保存频率

当前git项目里,默认的kv-cache-continued-interval-tokens 是10000  
那么我们就激进一些,设置为2048

每增长多少 tokens 存一次 live KV。数值越小，每次工具调用 后 重建时 可回退的位置越近,但是代价就是增加了读写硬盘的频率,速度和硬盘寿命的平衡,这个就因人而异了,我们只是测试的前提下,暂时就先不考虑硬盘寿命

最终我选择的启动参数如下

```shell
./ds4-server \
    --ctx 100000 \
    --kv-disk-dir "$HOME/ds4-kv" \
    --kv-disk-space-mb 131072 \
    --kv-cache-cold-max-tokens 100000 \
    --kv-cache-continued-interval-tokens 2048
```

128G kv缓存  
长 prompt 也建立缓存  
每 2048 tokens 存一次 kv

那么现在我来删除上次任务的kv,重新跑一次任务试试

```shell
rm -rf /tmp/ds4-kv
```

然后使用调优过的参数启动  

[![[b97f517f4cf698c44a432f392924bc81_MD5.png]]

image1393×1049 88.3 KB

](https://cdn3.ldstatic.com/original/4X/0/0/1/00152e37ce1d0927c68071cc49e68d64d1842b9d.png "image")

同样的任务 重新实测  

[![[3288ad884075dc5284c2b5e28def23f0_MD5.png]]

image1393×1256 80.6 KB

](https://cdn3.ldstatic.com/original/4X/9/5/2/952be33dbf7ee45e14cc704205fb08ce12554001.png "image")

  

[![[bf72c6238a5604edeac15e534f161788_MD5.png]]

image1393×1049 166 KB

](https://cdn3.ldstatic.com/original/4X/3/d/1/3d16cb8d0222d6601a428f5d8f26b33de9f17a4b.png "image")

这次明显可以看到已经根据2048的要求是进行写入kv  

[![[778d04674f9d0c85974c0f7426bf5746_MD5.png]]

image1393×1256 95.8 KB

](https://cdn3.ldstatic.com/original/4X/3/e/5/3e561d5b9ac873dd36c75963356b7c86410f4dd3.png "image")

  
首字耗时依旧在 3m12s 左右  

[![[a328d417a23bc17e2e5d10320b8bf986_MD5.png]]

image1393×1256 120 KB

](https://cdn3.ldstatic.com/original/4X/b/9/5/b95ab1641bcd424e0658c83c471d7f3ee05485c1.png "image")

  

[![[69b3988c92416fbfa48e1d34bcaf66af_MD5.png]]

image2084×1279 662 KB

](https://cdn3.ldstatic.com/original/4X/f/8/6/f86a87c37d1b0ea5bc9d3b4f916b961d4754540f.png "image")

  

[![[986cac7ecf4743f1505dffde44b0c170_MD5.png]]

image1393×1256 161 KB

](https://cdn3.ldstatic.com/original/4X/e/5/e/e5efdf1ef690fb5e4a94c0524012361f6afc1dc6.png "image")

  

[![[71af9a3fe525ef39a45c5091c2d5de0d_MD5.png]]

image2084×1279 684 KB

](https://cdn3.ldstatic.com/original/4X/4/e/7/4e76ae58dbbc059c5da52896cb37eb229d6f7355.png "image")

  

[![[72d9455fad035fc08d3628d223d89595_MD5.png]]

image2084×1279 682 KB

](https://cdn3.ldstatic.com/original/4X/a/9/4/a94b936d330806c639fbc650a48195ab8fd7d44e.png "image")

  

[![[afe7f0bca1865b96c0963ece914ed881_MD5.png]]

image1393×1371 163 KB

](https://cdn3.ldstatic.com/original/4X/e/1/d/e1d5d3f565ee71f970e3bbb04ebc37a08053f849.png "image")

任务完成! 这次总耗时 9m12s - 首字3m12s = 6m !

结论:  
相同的任务,kv-cache-continued-interval-tokens 2048 执行任务的速度基本提升了3倍左右! 假设如果不用claude code,而是用其他工具,我想首字速度应该还能再提升1m~2m左右,毕竟claude的系统提示词太大了!  
最终m5 max 128g 跑DeepSeek V4 Flash q2,速度在20~27 t/s 浮动,如果只是用来养虾或者养马,或者做点小工具,日常问答,已经实现了token自由

至于其他工具调用本地ds v4 那就等到下次再测~  
制作不易,希望点赞~