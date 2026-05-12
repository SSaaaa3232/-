---
title: "拒绝token焦虑 cpa（CLI Proxy API）反代 chatgpt（Codex） 保姆级全图文教程"
source: "https://linux.do/t/topic/2120257"
author:
  - "[[worenbudaoni]]"
published: 2026-05-06
created: 2026-05-12
---
> 本教材需要全程使用**魔法上网**工具，并打开**虚拟网卡模式（Tun模式）**，并且每个free账号需要接码，成本在3毛至5毛之间，token每周刷新，所以少量至中量使用的情况下，薅30个左右的账号就可以了，成本在10元左右，并且古法接码我用了三周没有账号被封的情况

# cli proxy api

## 安装 cli proxy api（CPA反代工具）

### 下载

> 下载地址：[Releases · router-for-me/CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI/releases)

自己找一个**小于6.10**的版本下载即可，因为自后端6.10.0 前端1.10.0后 **不再提供使用统计** 后端接口也已移除，如果需要统计页面，前端html也要改，这个后面会讲，不需要这个功能也可以使用最新的版本  

[![[d4617ccf83a0448bffe2edfdc941aeec_MD5.png]]

image1384×843 79.6 KB

](https://cdn3.ldstatic.com/original/4X/2/c/3/2c3277491b1a58b41049e3b42ffe934d00c6e3f9.png "image")

### 解压修改配置文件

解压后文件为：  

[![[b7e664dd79a3b969b81aeb2db8451184_MD5.png]]

image697×275 19.7 KB

](https://cdn3.ldstatic.com/original/4X/7/1/7/71770dfe63ef509511b166942e6a7445848b8a43.png "image")

我们修改一下config.yaml文件

可以参考一下官方的文档：[配置选项 | CLIProxyAPI](https://help.router-for.me/cn/configuration/options.html)，简单使用跟着我下面的修改参数即可

```yaml
# 服务器绑定主机/接口，默认空字符串同时绑定 IPv4/IPv6。
# 使用 "127.0.0.1" 或 "localhost" 可限制仅本机访问。
host: ""
# 服务器端口
port: 8317
# 管理 API 设置
remote-management:
# 是否允许远程（非 localhost）访问管理接口。
# 为 false 时仅允许 localhost，仍需管理密钥。
  allow-remote: true
# 管理密钥。若填写明文，启动时会自动哈希后生效。
# 所有管理请求（包括本地）都需要该密钥。
# 留空则完全禁用管理 API（所有 /v0/management 路由返回 404）。
  secret-key: "你的密码"
# 认证目录（支持 ~ 展开为主目录）
# ./.cli-proxy-api 为当前目录下创建一个 .cli-proxy-api 文件
auth-dir: "./.cli-proxy-api"
# 是否启用调试日志
debug: true
# 为 false 时禁用内存用量统计聚合
usage-statistics-enabled: true
```

## 运行并配置认证文件

### 运行

修改完成之后点击cli-proxy-api.exe启动即可，运行完打开：[http://localhost:8317/management.html#/login](http://localhost:8317/management.html#/login)  
就可以看见我们的登录页面了  

[![[380b5551a9f43faaa757e792abb9107b_MD5.png]]

image1816×799 66.1 KB

](https://cdn3.ldstatic.com/original/4X/f/5/e/f5e7f77d03e7118531ef2204d8ce7ebd78f7f5f1.png "image")

### 配置认证文件

#### OAuth 登录

我们点开OAuth登录菜单，点击开始Codex登录，之后的步骤请在**虚拟网卡模式**（Tun模式）进行  

[![[1749858a735c6684dba4bc6ff91568dd_MD5.png]]

image1816×758 70.8 KB

](https://cdn3.ldstatic.com/original/4X/8/c/c/8ccb15d1771c329de019a68c8ffa81b9b25cac9d.png "image")

#### 认证文件

认证完成后我们会得到这样的选项框  

[![[f283d62f2822820c49942013e4e0fd93_MD5.png]]

image1805×799 82.1 KB

](https://cdn3.ldstatic.com/original/4X/2/0/1/2018e75239a1e13e6d5cc28f7d95986ae4dc5974.png "image")

#### 配额管理

刷新一下我们就可以看见这个账号的限额了  

[![[a0efad482b69cb8953bc1e296a282841_MD5.png]]

image1826×742 89 KB

](https://cdn3.ldstatic.com/original/4X/2/4/a/24a93bc60877478b5e22380ee7ebc7abdecb395a.png "image")

#### 配置面板

我们去配置面板添加一个秘钥，点击保存，关于CPA配置的初始内容就结束了  

[![[f38de01fd95a42a6ad5f79f36176206b_MD5.jpg]]

image1836×865 179 KB

](https://cdn3.ldstatic.com/original/4X/5/1/d/51dce42e9f985e44c6545078764d5dfdcf64271e.jpeg "image")

## 使用Codex并配置API Key

> 看到这里的佬应该不会有安装codex的焦虑，网上的教程也是一抓一大把，安装codex我就略过了

### 命令行配置（推荐）

在 PowerShell 中运行，这里需要把apikey修改为自己的哦：

```
$d="$env:USERPROFILE\.codex"; if(!(Test-Path $d)){mkdir $d -Force}; "model_provider = \`"cpaapi\`"\`nmodel = \`"gpt-5.3-codex\`"\`nmodel_reasoning_effort = \`"medium\`"\`n\`n[model_providers.cpaapi]\`nname = \`"cpaapi\`"\`nbase_url = \`"http://localhost:8317/v1\`"\`nwire_api = \`"responses\`"" | Out-File -FilePath "$d\config.toml" -Encoding ascii; "{\`n  \`"OPENAI_API_KEY\`": \`"your apikey\`"\`n}" | Out-File -FilePath "$d\auth.json" -Encoding ascii; Write-Host "Codex configured!"; Write-Host "Files written to: $d"
```

### 手动配置

#### 配置 Codex (`~/.codex/config.toml`)

> 这里可以直接复制

```ini
model_provider = "cpaapi"
model = "gpt-5.3-codex"
model_reasoning_effort = "medium"

[model_providers.cpaapi]
name = "cpaapi"
base_url = "http://localhost:8317/v1"
wire_api = "responses"
```

#### 配置 (`~/.codex/auth.json`)

> 这里需要修改为你自己的apikey

```json
{
  "OPENAI_API_KEY": "your apikey"
}
```

### CC Switch配置（推荐）

在codex中选择添加  

[![[dc857aa09a068d28a072aecdf84a9f01_MD5.png]]

image1209×711 36.6 KB

](https://cdn3.ldstatic.com/original/4X/f/9/5/f9596042604cd8823486edb926a6dcbe27e5e857.png "image")

我们填写三个参数，供应商名称随意，API Key是刚才我们自己生成的，API 请求地址填我这个即可：[http://localhost:8317/v1](http://localhost:8317/v1)  

[![[b73f7ac6e5519425cfa31c7ae754f05d_MD5.png]]

image1209×711 43.1 KB

](https://cdn3.ldstatic.com/original/4X/1/0/f/10f6c9976c65a5cbe2806724079139a4db2f87a0.png "image")

测试一下是否可行：可行  

[![[56081974286188da51c20605fb6c05a6_MD5.png]]

image1209×711 36.3 KB

](https://cdn3.ldstatic.com/original/4X/e/0/f/e0f6f3992dfe960a647dc0c69d552f68397b9024.png "image")

## 使用Codex并且观测额度是否减少（减少代表使用成功）

关闭所有cmd或者PowerShell窗口，并且重新打开cmd窗口  

[![[c2bcec37e0ba4addb55557d831868c14_MD5.png]]

image1423×503 13.1 KB

](https://cdn3.ldstatic.com/original/4X/1/8/b/18bf1031fc9e42321d5c9ed368d46f954eea4a4b.png "image")

[![[c415abeabc8ecf05819ac79e8725715c_MD5.png]]

image1850×598 71.7 KB

](https://cdn3.ldstatic.com/original/4X/3/a/b/3ab2c1fbebdc698b3b9a34a9bad176885c5dcae5.png "image")

## CPA监控中心配置

> 自后端6.10.0 前端1.10.0后 **不再提供使用统计** 后端接口也已移除，如果需要统计页面，前端html也要改  
> 所以我使用的版本为 CLI Proxy API v6.9.49 + Cli-Proxy-API-Management-Center v1.9.3  
> CLI Proxy API 地址：[Releases · router-for-me/CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI/releases)  
> Cli-Proxy-API-Management-Center 地址：[Releases · router-for-me/Cli-Proxy-API-Management-Center](https://github.com/router-for-me/Cli-Proxy-API-Management-Center/releases)  
> 由于之前讲过CLI Proxy API的安装了，这里重点讲一下Cli-Proxy-API-Management-Center的安装

### 下载 Cli-Proxy-API-Management-Center 1.10.0 之前的版本

我们选择前端1.10.0之前的版本下载，下载之后得到一个html文件  

[![[536132c049ea80322073938d39aaea0e_MD5.png]]

image1525×508 39.8 KB

](https://cdn3.ldstatic.com/original/4X/a/6/5/a6516d5fb9632e7a0164284cd2004c1e6c670eb7.png "image")

### 替换management.html文件

我们再关闭CLI Proxy API启动之后的cmd窗口，并且打开CLI Proxy API的文件夹，可以看见一个static文件夹，把这个文件夹中的management.html页面替换为上面下载的management.html页面  

[![[7f690620ab3b999358c405bf1da011fc_MD5.png]]

image775×382 15.9 KB

](https://cdn3.ldstatic.com/original/4X/4/e/e/4ee7d46e4b3cdd89e04450626d61b1d659534cbb.png "image")

### 替换完成后重新运行cli-proxy-api.exe

还记得我们在config.yaml中配置的usage-statistics-enabled参数吗，这个就是启用这个功能的  
这样我们就可以得知剩余token数量了  

[![[09ae3e10f5f9edc2f2c87d7080da8116_MD5.jpg]]

image1853×804 118 KB

](https://cdn3.ldstatic.com/original/4X/7/7/a/77a3a92dc5f6ab0f9b478d8197ea4d1e043b1f8a.jpeg "image")

# 创建多个认证文件

> 上述教程只是cpa的使用，要做到token自由这一个账号是远远不够的  
> 下面我会交大家怎么古法创建账号的思路，也可以把我的思路做成注册机，网上的成品注册机我也研究了三天，着实找不到好用的  
> 注意以下步骤都要使用**魔法上网**，并且OpenAI接码时也会收费，基本上一个账号成本在3毛至5毛之间

## 一、邮箱选择

> 我是用过多种邮箱进行测试，发现openai的add-phone跟邮箱有关系，极少数的邮箱不需要添加手机号，以下是我的测试：  
> **gmail、outlook**：都需要添加手机号，并且注册困难（跟ip有关系，机场万人骑的ip基本过不了）  
> **临时邮箱**：市面上大部分的临时邮箱不可用，少数的临时邮箱可用，极少数临时邮箱不需要add-phone（成功率在二十分之一左右），临时邮箱有个缺点就是邮箱过期后不可找回，也就是说认证文件过期时就重新登录不了了，就很蛋疼  
> **自己买域名搭建 Cloudflare 临时邮件**：还是需要add-phone，并且买域名的钱可以注册三四十个free账号了（接码需要的费用）  
> 我自己的邮箱地址：[https://my-email.wudike.online](https://my-email.wudike.online/) （如果有需要的佬可以找我开用户账号，这样就可以无限创建临时邮箱了，截止到27年的5月份）  
> 大佬的教程放在这了：[【教程】小白也能看懂的自建Cloudflare临时邮箱教程（域名邮箱） - 文档共建 - LINUX DO](https://linux.do/t/topic/316819)  
> **2925邮箱（夯）**：这个也需要add-phone，但是可以无限的创建子邮箱，只需要在主邮箱后面添加不同字符即可（比如你的主邮箱为：`dalaohao@2925.com`，那么子邮箱就可以为`dalaohao1@2925.com`、`dalaohao2@2925.com`等等），并且不过期
> 
> 所以我们就不要浪费时间去试了，可以直接使用2925邮箱

## 二、接码平台

> 这里只推荐两个：  
> 5sim（手续费也有，首冲可以1刀，一个账号成本5毛）：[5sim](https://5sim.net/zh/login)  
> hero-sms（手续费贵点，首冲要3刀，但胜在一个账号成本3.5毛）：[hero-sms](https://hero-sms.com/cn)

### 5sim

> 我们选择运营商需要看看收短信的成功率

[![[25b0b6ae93c7ece7da63bcfad19bc30a_MD5.png]]

image536×785 32.3 KB

](https://cdn3.ldstatic.com/original/4X/d/1/6/d16f3817153fdd46ca9d8c4f9b155ee03d209779.png "image")

### hero-sms

> 我们需要在10个热门国家看成功率，并且这个平台可以选择购买的金额  
> 这里建议10个10个的买，因为这个成功率很玄学，而且这个平台需要2分钟才能取消  
> 可以2分钟之后再操作，20秒接不到码就关闭重来

[![[637fdceac1e54f5be68453d1703e67e1_MD5.png]]

image412×794 39.3 KB

](https://cdn3.ldstatic.com/original/4X/d/f/0/df0c992f101b6ee7adadc94f2e637f84b5bb3c43.png "image")

### 三、关于登录与注册

> 因为每次chatgpt登录都需要获取邮箱验证码，所以这里推荐直接在CPA中的OAuth登录中注册登录，运气好的话就可以节省重复获取邮箱验证码的步骤

### 四、关于多少的认证文件足够日常使用

> 这里就用佬友的回复作为参考，感谢佬友提供的数据：

[![[98814d66dd45123e446d9f4f9521d13c_MD5.png]]

image1122×357 29.9 KB

](https://cdn3.ldstatic.com/original/4X/f/8/d/f8d3f510aea405d9556b7432e902095af427ee74.png "image")