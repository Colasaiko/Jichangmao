<div align="center">

# 🐱 Jichangmao (机场猫)

**一个现代、极速的静态网站，提供全面的机场（代理）测评、客户端配置指南以及 AI 工具教程。**

[![Website](https://img.shields.io/badge/Website-jichangmao.com-blue?style=for-the-badge)](https://jichangmao.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Colasaiko/Jichangmao)
[![Astro](https://img.shields.io/badge/Built_with-Astro-ff5a03?style=for-the-badge&logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Deployed_on-Cloudflare-f38020?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com/)

</div>

---

## 📖 关于项目

**机场猫 (Jichangmao)** 是一个以内容为核心的平台，旨在帮助用户了解并选择复杂的代理服务（在圈内通常被称为“机场”）。本项目致力于提供客观的服务商测评、详尽的多平台客户端配置教程，以及网络故障排查资源。

除了代理服务，机场猫还收录了丰富的前沿 AI 工具教程（如 Copilot、Gemini、Grok 等）和工作流效率提升指南。网站经过精心设计，以确保内容呈现的清晰度、安全性，并提供极速的加载体验。

---

## ✨ 核心功能

- **📊 详尽的机场测评**：基于数据驱动的各大代理服务商深度测评（通过 JSON 数据和 Markdown 统一管理）。
- **📚 客户端配置指南**：覆盖所有主流平台（Windows、macOS、iOS、Android）的代理客户端图文教程。
- **🤖 AI 与科技专区**：涵盖最新 AI 工具解析、提示词（Prompt）指南以及工作流优化策略的专栏文章。
- **⚡ 极速的加载性能**：采用 Astro 框架构建，默认零 JavaScript 传输，以最小的体积实现最快的页面响应。
- **📱 响应式设计**：使用 Tailwind CSS 打造的现代化、移动端优先的用户界面，确保在任何设备上都能获得顺畅的阅读体验。
- **🔍 优秀的 SEO 优化**：自动生成 XML 站点地图（Sitemap）、RSS 订阅源，并拥有高度优化的页面元数据结构。
- **☁️ 边缘节点部署**：配置了 `wrangler.toml`，完美支持通过 Cloudflare Workers Static Assets 进行全球 CDN 部署。

---

## 🖥️ 在线网站

您可以点击下方链接访问正式上线的官方网站：  
👉 **[https://jichangmao.com](https://jichangmao.com)**

---

## 🛠️ 技术栈

本项目使用现代化的 Web 开发技术构建，以确保卓越的性能、代码可维护性和优秀的开发者体验。

| 技术 | 用途 |
|------------|---------|
| **[Astro](https://astro.build/)** | 核心框架 & 静态站点生成器 (SSG) |
| **[Tailwind CSS](https://tailwindcss.com/)** | 实用优先的 CSS 框架，用于快速编写响应式样式 |
| **[TypeScript](https://www.typescriptlang.org/)** | 提供类型安全的 JavaScript 环境 |
| **MDX / Markdown** | 灵活的内容编写格式，用于撰写博客、测评和指南 |
| **[Cloudflare Workers](https://workers.cloudflare.com/)**| 全球边缘托管与快速部署 (`wrangler.toml`) |
| **Node.js** | 运行构建环境及依赖包管理 |

---

## 📂 项目结构

本项目代码仓库遵循清晰标准的 Astro 项目架构：

```text
Jichangmao/
├── public/                 # 静态资源（图片、字体、原始文件），打包时会直接复制到根目录
├── src/                    # 网站核心源码
│   ├── components/         # 可复用的 UI 组件（如页脚、导航栏、卡片等）
│   ├── content/            # Markdown & MDX 内容文件（博客、测评、指南）
│   ├── data/               # JSON 数据文件（机场品牌信息、价格、评论等）
│   ├── layouts/            # 页面布局模板（如基础布局 BaseLayout、博客布局 BlogPostLayout）
│   ├── pages/              # 基于文件的路由页面（主页、关于、客户端、文章列表等）
│   ├── styles/             # 全局 CSS 样式与 Tailwind 指令
│   └── utils/              # TypeScript 实用工具函数（如日期格式化、阅读时间估算）
├── .env.example            # 环境变量配置示例
├── astro.config.mjs        # Astro 框架核心配置文件
├── package.json            # Node.js 依赖管理和 npm 脚本
├── tailwind.config.mjs     # Tailwind CSS 样式配置文件
├── tsconfig.json           # TypeScript 配置文件
├── wrangler.toml           # Cloudflare Workers 静态资源部署配置
└── README.md               # 项目说明文档 (当前文件)
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** (Astro 需 v18.17.1 或更高版本)
- **npm** (或其它包管理工具)

### 本地开发

1. **安装依赖：**
   ```bash
   npm install
   ```

2. **启动本地开发服务器：**
   ```bash
   npm run dev
   ```
   启动后，可以在浏览器中访问 `http://localhost:4321` 预览网站。

### 生产环境构建

将网站编译输出为静态 HTML 文件（默认输出到 `dist/` 目录）：

```bash
npm run build
```

### 部署上线

本项目已配置为作为静态资源（Static Assets）部署到 **Cloudflare Workers** 上。您可以使用 Wrangler 命令行工具轻松部署：

```bash
npm run build
npx wrangler deploy
```
*(在执行上述命令前，请确保您已经使用 `npx wrangler login` 登录并授权了您的 Cloudflare 账号)。*
