const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

// All remaining files with duplicate titles, mapped to semantic titles/descriptions
const MASS_FIXES = {
  // === AI Drama series ===
  'ai-drama-04-character.md': {
    title: 'AI短剧角色一致性：如何让主角始终保持同一张脸 - 机场猫',
    description: '解决 AI 视频创作中"角色换脸"的常见难题：通过角色设定文档、提示词锁定、Seed值控制等方法，让 AI 生成的短剧主角在每个场景中保持人物一致性。',
    keywords: 'AI短剧角色一致性,AI生成视频换脸,角色设定,AI视频角色'
  },
  'ai-drama-05-consistency.md': {
    title: 'AI视频"变脸"问题怎么解决？角色一致性进阶方案 - 机场猫',
    description: '汇总从入门到进阶的 AI 视频角色一致性解决方案：提示词+Seed锁定（基础级）、IP-Adapter、参考图等方式，按难度从低到高帮你解决 AI 短剧主角"变脸"问题。',
    keywords: 'AI视频变脸解决,角色一致性AI,IP-Adapter,AI短剧制作技巧'
  },
  'ai-drama-06-prompt.md': {
    title: 'AI短剧分镜提示词写法：精准控制场景与镜头 - 机场猫',
    description: '专为 AI 短剧制作者整理的分镜 Prompt 写法：如何描述场景氛围、镜头角度、人物动作和画面细节，让 AI 生成的每一帧更接近脑海中的分镜效果。',
    keywords: 'AI短剧分镜提示词,AI视频Prompt,分镜写法,AI短剧制作'
  },
  'ai-drama-07-video-gen.md': {
    title: 'AI短剧视频生成实战：Runway/Pika/Kling生成教程 - 机场猫',
    description: '从分镜图到最终视频的完整生成实战：对比 Runway、Pika、可灵(Kling)、海螺等主流 AI 视频工具的 Text to Video 和 Image to Video 两种生成模式的使用要点。',
    keywords: 'AI视频生成实战,Runway教程,Pika使用,可灵Kling教程'
  },

  // === Copilot series ===
  'copilot-image-generation.md': {
    title: 'Copilot图像生成怎么用？DALL-E 3 AI绘图教程 - 机场猫',
    description: '详解 Microsoft Copilot 集成的 DALL-E 3 图像生成功能使用方法：如何撰写生成提示词、调整图片风格，以及访问 Copilot 图像生成所需的代理配置。',
    keywords: 'Copilot图像生成,DALL-E 3,Copilot AI绘图,Copilot绘画'
  },
  'copilot-microsoft-365.md': {
    title: 'Microsoft 365 Copilot是什么？Word/Excel/Teams使用指南 - 机场猫',
    description: '介绍 Microsoft 365 Copilot 如何与 Word、Excel、PowerPoint、Outlook、Teams 深度整合，实现文档生成、数据分析、邮件起草等生产力自动化功能。',
    keywords: 'Microsoft 365 Copilot,Copilot Word,Copilot Excel,Office AI助手'
  },
  'copilot-pages.md': {
    title: 'Copilot Pages是什么？AI协作文档功能使用指南 - 机场猫',
    description: '介绍 Microsoft Copilot Pages 功能：将 AI 对话内容一键转换为可多人实时协作编辑的持久页面，适合团队头脑风暴和 AI 辅助内容创作场景。',
    keywords: 'Copilot Pages,Copilot协作文档,Microsoft Copilot功能,AI协作'
  },
  'copilot-what-is.md': {
    title: 'Microsoft Copilot是什么？微软AI助手全面介绍 - 机场猫',
    description: '全面介绍 Microsoft Copilot 的定位与功能：基于 GPT-4 的 AI 助手，深度整合微软生态系统，涵盖撰写文档、总结网页、生成代码、AI 绘图等场景。',
    keywords: 'Microsoft Copilot是什么,Copilot介绍,微软AI助手,Copilot功能'
  },

  // === Grok series ===
  'grok-app.md': {
    title: 'Grok手机版怎么用？在X(Twitter)上使用Grok AI - 机场猫',
    description: '介绍如何在 X（原 Twitter）移动客户端中使用 Grok AI：无需下载独立应用，访问步骤与对代理 IP 地区的要求。',
    keywords: 'Grok手机版,Grok移动端,X Twitter Grok,Grok使用'
  },
  'grok-file-processing.md': {
    title: 'Grok文件处理功能：上传PDF和文档进行AI分析 - 机场猫',
    description: '介绍 Grok 的文件处理能力：支持上传 PDF、表格、代码文件，AI 协助提炼摘要、提取关键信息或数据分析，提升工作和学习效率的使用技巧。',
    keywords: 'Grok文件处理,Grok上传PDF,Grok文档分析,AI文件分析'
  },
  'grok-image-analysis.md': {
    title: 'Grok图片分析怎么用？多模态视觉功能使用指南 - 机场猫',
    description: '介绍 Grok 的多模态图片分析（视觉）功能：如何上传图片让 AI 解释图表、识别物体、分析内容，以及 Grok 视觉能力与其他 AI 工具的对比。',
    keywords: 'Grok图片分析,Grok视觉功能,Grok多模态,AI看图分析'
  },
  'grok-modes.md': {
    title: 'Grok对话模式怎么切换？幽默模式与正式模式区别 - 机场猫',
    description: '介绍 Grok 内置的多种对话模式：正式解决问题模式、幽默/讽刺模式等，如何根据需求切换模式，以及各模式在实际对话中的表现差异。',
    keywords: 'Grok对话模式,Grok幽默模式,Grok使用技巧,Grok模式切换'
  },
  'grok-prompt-guide.md': {
    title: 'Grok提示词写法：如何发挥Grok的幽默与反叛特性 - 机场猫',
    description: '专为 Grok 定制的 Prompt 写作指南：利用 Grok 的幽默感和较少内容限制的特点，针对不同场景编写能够激发最佳回答的提示词技巧。',
    keywords: 'Grok提示词,Grok Prompt写法,Grok使用技巧,xAI Grok提问'
  },
  'grok-realtime-search.md': {
    title: 'Grok实时搜索功能：直接访问X平台最新信息 - 机场猫',
    description: '介绍 Grok 实时搜索 X（Twitter）平台的独特能力：如何使用 Grok 获取最新热点资讯、追踪实时事件，以及 Grok 搜索与 Perplexity 等工具的适用场景对比。',
    keywords: 'Grok实时搜索,Grok搜索Twitter,Grok实时信息,xAI Grok搜索'
  },
  'grok-what-is.md': {
    title: 'Grok AI是什么？xAI旗下幽默AI助手完整介绍 - 机场猫',
    description: '介绍马斯克旗下 xAI 公司推出的 Grok AI 助手：幽默风格、反叛特性、实时访问 X 平台数据的独特能力，以及与 ChatGPT/Claude 的核心差异。',
    keywords: 'Grok AI是什么,xAI Grok,Grok介绍,Grok vs ChatGPT'
  },

  // === Perplexity series ===
  'perplexity-citations.md': {
    title: 'Perplexity引用标注功能：如何验证AI回答的可信度 - 机场猫',
    description: '介绍 Perplexity 的引用标注（Citations）功能：如何追溯 AI 回答的信息来源，验证答案的真实性，避免 AI "幻觉"，以及引用来源的查阅方法。',
    keywords: 'Perplexity引用,Perplexity来源验证,AI引用标注,Perplexity可信度'
  },
  'perplexity-how-to-use.md': {
    title: 'Perplexity AI怎么用？零基础上手AI搜索引擎 - 机场猫',
    description: '从零开始了解 Perplexity：AI 问答搜索引擎的工作方式、如何提问获取带引用来源的回答，以及 Perplexity 与传统搜索引擎的实际使用差异。',
    keywords: 'Perplexity怎么用,Perplexity使用教程,AI搜索引擎,Perplexity入门'
  },
  'perplexity-pro-search.md': {
    title: 'Perplexity Pro Search是什么？高级深度搜索功能详解 - 机场猫',
    description: '详解 Perplexity Pro Search 的工作方式：针对复杂问题进行多步骤深度检索，如同研究助手一样主动搜集、筛选、整理信息，以及与普通搜索的区别。',
    keywords: 'Perplexity Pro Search,Perplexity深度搜索,Perplexity Pro,AI深度研究'
  },
  'perplexity-projects.md': {
    title: 'Perplexity Projects功能：创建专属AI知识库工作空间 - 机场猫',
    description: '介绍 Perplexity Projects（项目空间）功能：为不同任务创建专属工作区，设置自定义 AI 指令并上传参考文件，构建聚焦特定领域的 AI 知识库。',
    keywords: 'Perplexity Projects,Perplexity项目空间,Perplexity知识库,AI工作空间'
  },
  'perplexity-prompt-guide.md': {
    title: 'Perplexity提示词技巧：如何问出更精准的AI搜索结果 - 机场猫',
    description: '专为 Perplexity 整理的提问（Prompt）技巧：如何通过合理构建查询词激发更深度的信息检索能力，获取更有深度、更有引用来源的回答。',
    keywords: 'Perplexity提示词,Perplexity Prompt,Perplexity使用技巧,AI搜索提问'
  },
  'perplexity-upload-file.md': {
    title: 'Perplexity上传文件功能：让AI分析总结长篇文档 - 机场猫',
    description: '介绍 Perplexity 的文件上传功能（PDF、TXT等）：如何让 AI 快速总结长篇报告、提取核心数据或翻译文档，大幅提升处理文档的工作效率。',
    keywords: 'Perplexity上传文件,Perplexity分析PDF,Perplexity文档功能,AI文档分析'
  },
  'perplexity-vs-search.md': {
    title: 'Perplexity vs 谷歌搜索：AI搜索与传统搜索的区别 - 机场猫',
    description: '深度对比 Perplexity AI 搜索与 Google 等传统搜索引擎的本质差异：AI 直接给答案 vs 返回网页列表，各自适用的搜索场景与优劣势分析。',
    keywords: 'Perplexity vs Google,AI搜索vs传统搜索,Perplexity区别,AI搜索引擎'
  },
  'perplexity-what-is.md': {
    title: 'Perplexity是什么？颠覆传统的AI答案引擎介绍 - 机场猫',
    description: '介绍 Perplexity AI 这款"答案引擎"：如何将人工智能与搜索引擎结合，用自然语言提问直接获取带引用来源的整合答案，以及为何越来越多人转向 AI 搜索。',
    keywords: 'Perplexity是什么,Perplexity AI介绍,AI答案引擎,Perplexity搜索'
  },

  // === Poe series ===
  'poe-create-bot.md': {
    title: 'Poe自定义Bot教程：无代码创建专属AI机器人 - 机场猫',
    description: '手把手介绍在 Poe 平台上不需要编写代码，通过设置提示词（Prompt）和上传知识库，创建属于自己的个性化 AI 机器人（Bot）的完整步骤。',
    keywords: 'Poe创建Bot,Poe自定义AI,Poe机器人,Poe Bot教程'
  },
  'poe-how-to-use.md': {
    title: 'Poe AI平台怎么用？ChatGPT/Claude聚合平台使用教程 - 机场猫',
    description: '介绍 Poe 平台的使用方法：在一个界面内与 ChatGPT、Claude、Gemini 等多款主流 AI 模型对话切换，以及 Poe 的订阅方案和对代理 IP 的访问要求。',
    keywords: 'Poe怎么用,Poe使用教程,Poe AI平台,Poe聚合ChatGPT Claude'
  },
  'poe-image-video-bots.md': {
    title: 'Poe图像和视频生成Bot：一站体验多款AI绘图工具 - 机场猫',
    description: '介绍如何在 Poe 平台一站式体验图像和视频生成 AI 工具，无需在多个平台分别订阅，通过 Poe 聚合访问各类图像/视频生成 Bot 的方法。',
    keywords: 'Poe图像生成,Poe视频生成Bot,Poe AI绘图,Poe生成工具'
  },
  'poe-manage-chat.md': {
    title: 'Poe聊天记录管理：如何删除和整理对话历史 - 机场猫',
    description: '介绍 Poe 平台聊天记录的管理方法：如何有效组织大量 Bot 对话列表，以及删除包含隐私信息的聊天记录的完整操作步骤。',
    keywords: 'Poe聊天记录,Poe删除对话,Poe对话管理,Poe隐私'
  },
  'poe-memory.md': {
    title: 'Poe记忆功能：让AI记住偏好 vs 无痕对话模式 - 机场猫',
    description: '介绍 Poe 的 Memory（记忆）功能与无痕对话模式：如何让 AI 记住个人偏好避免重复说明，以及何时切换到隐私保护的无痕对话模式。',
    keywords: 'Poe记忆功能,Poe Memory,Poe无痕对话,AI记忆功能'
  },
  'poe-prompt-guide.md': {
    title: 'Poe提示词技巧：针对不同AI模型的高效提问方法 - 机场猫',
    description: '专为 Poe 多模型平台整理的 Prompt 写作指南：针对 ChatGPT、Claude、Gemini 等不同模型的特点，如何调整提问策略获得最佳回答质量。',
    keywords: 'Poe提示词,Poe Prompt写法,Poe使用技巧,AI提示词技巧'
  },
  'poe-switch-bots.md': {
    title: 'Poe如何切换Bot？快速找到适合任务的AI模型 - 机场猫',
    description: '介绍在 Poe 平台上如何快速搜索和切换不同的 AI Bot：面对海量官方和社区 Bot，如何根据当前任务类型高效定位并一键切换最适合的 AI 模型。',
    keywords: 'Poe切换Bot,Poe选择AI模型,Poe搜索Bot,Poe使用技巧'
  },
  'poe-upload-file.md': {
    title: 'Poe上传文件功能：让AI读取和分析你的文档 - 机场猫',
    description: '介绍 Poe 的文件上传功能（PDF、Word、代码等）：结合大模型对长文档进行阅读、总结、翻译和信息提取，以及不同 AI Bot 在文件处理能力上的差异。',
    keywords: 'Poe上传文件,Poe文档分析,Poe读取PDF,AI文件处理'
  },
  'poe-what-is.md': {
    title: 'Poe是什么？Quora推出的AI模型聚合平台介绍 - 机场猫',
    description: '介绍 Poe 平台的定位与特点：由 Quora 推出的多款顶尖 AI 模型聚合应用，在一个界面内无缝切换 ChatGPT、Claude、Gemini，以及访问所需的代理要求。',
    keywords: 'Poe是什么,Poe平台介绍,Quora Poe,AI模型聚合平台'
  },
};

let fixed = 0;
Object.entries(MASS_FIXES).forEach(([filename, meta]) => {
  const fp = path.join(dir, filename);
  if (!fs.existsSync(fp)) { console.log('[NOT FOUND] ' + filename); return; }
  let content = fs.readFileSync(fp, 'utf8');
  const orig = content;
  content = content.replace(/title:\s*["'][^"']*["']/, 'title: "' + meta.title + '"');
  content = content.replace(/description:\s*["'][^"']*["']/, 'description: "' + meta.description + '"');
  content = content.replace(/keywords:\s*["'][^"']*["']/, 'keywords: "' + meta.keywords + '"');
  if (content !== orig) { fs.writeFileSync(fp, content, 'utf8'); console.log('[FIXED] ' + filename); fixed++; }
  else console.log('[UNCHANGED] ' + filename);
});
console.log('Fixed: ' + fixed);
