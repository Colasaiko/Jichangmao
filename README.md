<div align="center">

# 🐱 Jichangmao (机场猫)

> **一个专注于机场、代理订阅服务与相关网络工具信息整理的中文资料库与导航网站。**

[![Website](https://img.shields.io/badge/Official_Website-jichangmao.com-blue?style=for-the-badge)](https://jichangmao.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Colasaiko/Jichangmao)
[![Astro](https://img.shields.io/badge/Built_with-Astro-ff5a03?style=for-the-badge&logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Deployed_on-Cloudflare-f38020?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com/)

</div>

---

## 🧭 Jichangmao 是什么？

**Jichangmao（机场猫）** 并不是一个单纯的开发项目，而是一个**面向最终用户的中文网络信息整理平台**。

它的核心定位是为广大中文互联网用户提供关于「机场」（代理订阅服务）的全面、客观且高度结构化的信息。网站围绕网络环境搭建的方方面面，主要提供以下几类资料：

* **机场品牌资料**：收录各大主流代理服务商的基础信息。
* **套餐与线路信息**：整理不同服务商的价格、流量、底层线路（如 IPLC / IEPL / BGP）。
* **使用相关教程**：从零开始教用户如何在不同设备上配置网络。
* **网络与 AI 辅助教程**：长篇系统性的深度 Blog，涵盖网络排障指南，以及如何利用优质网络访问现代 AI 工具（如 ChatGPT、Copilot、Perplexity、Grok）。

---

## 🤔 为什么需要 Jichangmao？

目前网络上关于「机场」和「科学上网」的信息极其**碎片化**和**鱼龙混杂**。

当一个普通用户需要寻找一个适合自己的代理服务时，他们通常需要在服务商官网、Telegram 群组、零散的个人博客、杂乱的论坛和各种带有强烈营销色彩的评测网站之间来回穿梭，收集拼凑信息。

**Jichangmao 的建立就是为了打破这种混乱。** 

我们希望将这些分散的信息进行清晰、客观的归纳整理，为用户提供一条完整的认知路径：

1. **了解需求**：知道什么是机场、代理协议的区别。
2. **查看资料**：集中浏览各大品牌的客观数据。
3. **比较选择**：对比价格、线路质量和设备限制。
4. **阅读教程**：根据购买的服务，获取对应的客户端配置指南。
5. **高效使用**：阅读网站提供的 AI 与工作流教程，将优质网络转化为生产力。

通过系统化的信息重组，让用户最终能够**基于事实，做出属于自己的理性判断**。

---

## 🗺️ 网站内容地图 (Website Content Map)

根据网站当前的真实架构，Jichangmao 的主要内容划分如下：

| 栏目 | URL 路径 | 用途：用户来到这里可以找到什么？ |
|---|---|---|
| **首页** | `/` | 网站的总入口，展示核心导航、最新文章及特色服务推荐。 |
| **机场测评** | `/evaluations/` | 每个服务商的独立资料页，包含品牌介绍、套餐价格、线路详情与节点协议。 |
| **客户端指南** | `/clients/` | 针对 Windows, macOS, iOS, Android 各大系统的主流代理软件配置教程。 |
| **工具与资源** | `/tools/`, `/download/` | 常用代理客户端下载引导与网络辅助测试工具。 |
| **长文博客** | `/blog/` | 涵盖网络知识普及、疑难杂症排查以及 AI 工具高效使用指南的长篇文章。 |
| **网站说明** | `/about/`, `/privacy/` | 网站关于我们、评测方法论、隐私权与免责声明等基础建设信息。 |

---

## ✈️ 机场与服务资料体系 (Airport Information)

代理服务资料是 Jichangmao 的核心骨架。

为了让用户不再面对眼花缭乱的广告，我们将每家服务商的信息统一拆解为标准化的信息字段，并为每一家服务商建立了专属的独立页面。目前主要整理的数据维度包括：

* **基础信息**：品牌名称、专属优惠码、直达官方注册入口。
* **套餐与价格**：周期定价、每月流量限制。
* **技术参数**：底层线路类型（如深东 IEPL、全 IPLC、BGP 多线智能调度）、支持的协议（SS、VLESS 等）。
* **使用限制**：是否限制同时在线设备数量、是否提供原生 IP 支持、是否限速。

> 💡 *在 Jichangmao，不同机场的服务被抽象为统一结构的信息页面，让用户无需在不同网站间反复切换即可查阅所有核心指标。*

---

## 📝 博客与长文体系 (Blog & Articles)

Jichangmao 并不只是一个冰冷的“价格表”。网站内置了庞大的 Blog 系统，用于发布深度内容。

目前，博客涵盖了以下几大核心方向：

1. **基础知识科普**：如《什么是 TUN 模式》、《TCP 与 UDP 代理的区别》、《IPLC 与 IEPL 解析》。
2. **排障指南中心**：如《节点超时问题排查》、《手机能连但电脑连不上怎么办》、《某些特定网站打不开如何解决》。
3. **客户端深度剖析**：如 Surge, Quantumult X, Loon, Clash Verge Rev, Sing-box, Stash 等进阶客户端的高级玩法与订阅转换指南。

---

## 🤖 AI 与现代网络工具 (AI & Tools)

**为什么一个代理信息网站会有大量 AI 内容？**

因为在当前的互联网语境下，**“优质的网络环境”与“使用世界级 AI 服务”之间存在着强绑定关系。** 大多数用户寻找机场的核心痛点，正是为了稳定访问 ChatGPT、Copilot、Perplexity 和 Grok 等工具。

因此，Jichangmao 的 Blog 中特意整理了大量与 AI 工具相关的教程。例如：
* 各大 AI 工具的核心功能介绍与网络连通性排查。
* Prompt（提示词）高效使用指南。
* 如何利用 AI 辅助文件处理、编程、信息检索与日常办公流。

这是一个从“提供网络工具”延伸到“利用网络工具创造价值”的自然延伸。

---

## ✨ 网站特色 (What Makes Us Different?)

1. **极致的信息聚焦**：剥离浮夸的营销话术，只保留核心价格、线路与技术参数。
2. **SEO 友好与独立化**：全站静态生成（SSG），每个品牌、每篇文章都拥有完全独立的 URL 结构，配合 `sitemap-index.xml` 和完善的 Metadata，对搜索引擎极其友好。
3. **沉浸式阅读体验**：采用现代化的响应式设计，摒弃弹窗广告与冗余交互，无论是移动端还是桌面端，阅读长篇指南都极为顺畅。
4. **结构化的更新机制**：所有文字内容与品牌数据均通过 Markdown/MDX 与 JSON 独立解耦维护。

---

## 📊 网站规模 (Project Overview)

截止至当前版本，Jichangmao 已成具规模，内容体系不断扩充：

| 内容类型 | 当前状态 |
|:---|---:|
| **品牌与服务库** | 20+ 家收录品牌 |
| **深度博客文章** | 400+ 篇独立文章 |
| **系统静态页面** | 构建产物达 430+ 页面 |
| **客户端覆盖** | Win / Mac / iOS / Android 全覆盖 |

---

## 🔄 内容更新与维护 (Content Updates)

Jichangmao 的所有内容均由源码驱动。
* **数据修改**：机场的价格与优惠信息统一在 `src/data/` 目录下的 JSON 配置文件中管理，修改后全站自动同步更新。
* **文章发布**：所有新教程与博客作为 Markdown 文件存放在 `src/content/` 目录下。
* **发布流程**：内容更新后，只需通过 `npm run build` 重新静态编译整个网站，随后通过 Cloudflare 进行全网毫秒级刷新。

---

## ⚠️ 免责声明 (Disclaimer)

Jichangmao 是一个**纯粹的信息整理与技术分享平台**。

* 本站不提供、不运营、不售卖任何网络代理服务。
* 本站整理的各家机场/代理服务商的线路、价格、优惠码及服务状态，可能会随着时间或服务商自身的调整而发生变化。
* 用户在选择或购买第三方服务前，请务必自行前往其官方网站确认最新信息与相关条款。
* Jichangmao 与收录的第三方服务商之间不存在官方附属或合作关系，所有资料仅供学习、研究与参考。

---

## 🎯 项目愿景 (Project Vision)

Jichangmao 希望能逐渐成为中文互联网中一个结构化、高品质的网络工具与代理知识库。

让用户的行为模式从盲目的**“搜索一个好用的机场”**，逐渐转变为系统性的**“了解自身网络需求 → 查看客观资料 → 比较服务差异 → 阅读配置指南 → 最终做出适合自己的理性判断”**。

---

## 🛣️ 未来路线图 (Roadmap)

* 持续扩充与验证现有的机场资料库，剔除失效信息。
* 完善与细化更多小众客户端的使用教程。
* 改善文章分类结构，让 400+ 篇文章更容易被检索。
* 针对移动端阅读体验进行更深度的 UI 优化。

---

## 💻 开发与部署 (Development & Deployment)

虽然 Jichangmao 的重心是内容，但它拥有非常现代化的技术底层支撑。

### 技术栈
* **框架**：[Astro](https://astro.build/) (极速静态站点生成器)
* **样式**：[Tailwind CSS](https://tailwindcss.com/)
* **内容解析**：MDX / Markdown / JSON
* **边缘计算与托管**：[Cloudflare Workers](https://workers.cloudflare.com/) 

### 本地开发 (Local Development)

```bash
# 1. 克隆仓库
git clone https://github.com/Colasaiko/Jichangmao.git

# 2. 安装依赖
npm install

# 3. 启动本地服务器 (http://localhost:4321)
npm run dev

# 4. 构建生产版本 (输出至 /dist 目录)
npm run build
```

### 云端部署 (Deployment)

项目已通过 `wrangler.toml` 配置了完整的 Cloudflare 静态资产部署流程：

```bash
# 生成最新的静态页面
npm run build

# 自动推送到 Cloudflare 边缘网络
npx wrangler deploy
```

---

## 📂 项目结构 (Project Structure)

```text
Jichangmao/
├── src/                    # 网站核心源码
│   ├── components/         # 页面 UI 组件库
│   ├── content/            # 内容库 (400+ Markdown/MDX 博客与教程)
│   ├── data/               # 数据库 (品牌价格、线路、评论等 JSON 数据)
│   ├── layouts/            # 核心布局模板
│   ├── pages/              # 路由页面 (首页、分类页、独立详情页等)
│   ├── styles/             # Tailwind 全局样式
│   └── utils/              # TypeScript 核心工具函数
├── public/                 # 静态资源 (图片、爬虫协议、Favicon)
├── astro.config.mjs        # Astro 构建配置
├── tailwind.config.mjs     # 样式设计系统配置
├── wrangler.toml           # Cloudflare 部署配置
└── package.json            # 依赖与脚本
```

---

## 🔗 相关链接 (Links)

🌐 **官方网站 (Official Website)**  
[https://jichangmao.com](https://jichangmao.com)

💻 **GitHub 仓库 (GitHub Repository)**  
[https://github.com/Colasaiko/Jichangmao](https://github.com/Colasaiko/Jichangmao)
