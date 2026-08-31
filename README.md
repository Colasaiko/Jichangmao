<div align="center">

# 🐱 Jichangmao (机场猫)

**A modern, lightning-fast static website providing comprehensive proxy reviews, client setup guides, and AI tool tutorials.**

[![Website](https://img.shields.io/badge/Website-jichangmao.com-blue?style=for-the-badge)](https://jichangmao.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Colasaiko/Jichangmao)
[![Astro](https://img.shields.io/badge/Built_with-Astro-ff5a03?style=for-the-badge&logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Deployed_on-Cloudflare-f38020?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com/)

</div>

---

## 📖 About

**Jichangmao** is a content-driven platform designed to help users navigate the complex landscape of proxy services (often referred to as "airports" in the community). The project aims to provide objective evaluations, detailed platform-specific client setup guides, and troubleshooting resources. 

Beyond proxy services, Jichangmao also features a rich collection of tutorials on modern AI tools (such as Copilot, Gemini, and Grok) and workflow efficiency strategies. The website is meticulously crafted to deliver information clearly, securely, and with blazingly fast performance.

---

## ✨ Features

- **📊 Comprehensive Evaluations:** Data-driven and in-depth reviews of various proxy/airport services (managed via JSON data and Markdown).
- **📚 Client Setup Guides:** Step-by-step tutorials for configuring proxy clients across all major platforms (Windows, macOS, iOS, Android).
- **🤖 AI & Tech Hub:** Articles covering AI tools, prompt guides, and workflow optimization.
- **⚡ Blazing Fast Performance:** Powered by Astro, shipping zero JavaScript by default for maximum speed and minimal footprint.
- **📱 Responsive UI:** A modern, mobile-first design built with Tailwind CSS, ensuring a seamless reading experience on any device.
- **🔍 SEO & Discoverability:** Automatically generated XML Sitemaps, RSS feeds, and highly optimized metadata structure.
- **☁️ Edge Deployment:** Configured for seamless global content delivery via Cloudflare Workers Static Assets.

---

## 🖥️ Live Website

You can visit the official live website here:  
👉 **[https://jichangmao.com](https://jichangmao.com)**

---

## 🛠️ Tech Stack

This project is built using modern web development technologies to ensure performance, maintainability, and exceptional developer experience.

| Technology | Purpose |
|------------|---------|
| **[Astro](https://astro.build/)** | Core framework & Static Site Generator (SSG) |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS framework for rapid UI styling |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe JavaScript for robust development |
| **MDX / Markdown** | Flexible content authoring for blogs and guides |
| **[Cloudflare Workers](https://workers.cloudflare.com/)**| Global edge hosting and deployment (`wrangler.toml`) |
| **Node.js** | Build environment and package management |

---

## 📂 Project Structure

The repository follows a clean and standard Astro project architecture:

```text
Jichangmao/
├── public/                 # Static assets (images, fonts, raw files) directly copied to build
├── src/                    # Application source code
│   ├── components/         # Reusable UI components (Footer, Navigation, Cards, etc.)
│   ├── content/            # Markdown & MDX source files for blogs, reviews, and guides
│   ├── data/               # JSON data files for brands, pricing, technical details, etc.
│   ├── layouts/            # Page layout templates (BaseLayout, BlogPostLayout)
│   ├── pages/              # File-based routing (index, about, clients, blog, etc.)
│   ├── styles/             # Global CSS and Tailwind directives
│   └── utils/              # TypeScript utility functions (formatDate, readingTime)
├── .env.example            # Example environment variables
├── astro.config.mjs        # Astro framework configuration
├── package.json            # Node.js dependencies and npm scripts
├── tailwind.config.mjs     # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── wrangler.toml           # Cloudflare Workers static assets deployment config
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.17.1 or higher is required for Astro)
- **npm** (or your preferred package manager)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available locally at `http://localhost:4321`.

### Build for Production

To generate the static HTML files into the `dist/` directory:

```bash
npm run build
```

### Deployment

The project is configured to be deployed as static assets on **Cloudflare Workers**. You can deploy it using the Wrangler CLI:

```bash
npm run build
npx wrangler deploy
```
*(Make sure you have authenticated with Cloudflare using `npx wrangler login` beforehand).*
