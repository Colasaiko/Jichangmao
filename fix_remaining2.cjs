const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

// Semantic title mapping for all remaining files based on content analysis
const REMAINING_FIXES = {
  // === AI Network ===
  'ai-network-06-latency-vs-response.md': { title: '延迟低但AI回复慢？延迟与AI响应时间的区别 - 机场猫', description: '解析 Ping 延迟与 AI 工具响应时间的本质区别：低延迟不代表 AI 回复快，服务器计算时间才是瓶颈，理解两者区别帮助你正确评估节点质量。', keywords: '延迟vs响应时间,AI响应慢,ChatGPT响应慢,节点延迟' },
  'ai-network-16-ping-vs-ai.md': { title: 'Ping值低但ChatGPT还是慢？AI工具速度影响因素 - 机场猫', description: '解答"Ping只有20ms但ChatGPT响应依然很慢"的原因：AI 大模型的生成速度受服务器负载和算力影响，与纯网络延迟无关，如何正确理解和优化 AI 访问体验。', keywords: 'Ping低ChatGPT慢,AI响应速度,ChatGPT速度,AI工具访问' },
  'ai-network-17-time-diff.md': { title: '时区差异对AI使用有影响吗？不同时段节点速度分析 - 机场猫', description: '分析时区差异和使用时段对访问 ChatGPT 等 AI 工具速度的影响：美国服务器的峰值时段与中国白天时段的关系，以及如何选择节点规避高峰期拥堵。', keywords: '时区差异AI访问,ChatGPT使用时段,AI访问高峰,节点时段选择' },
  'ai-network-25-ai-server-down.md': { title: 'ChatGPT/Claude服务器宕机如何判断？服务状态检测方法 - 机场猫', description: '介绍如何区分"节点问题"和"AI平台服务器宕机"：使用官方状态页、第三方监控工具判断 ChatGPT/Claude/Gemini 是否正在全球范围内故障，避免无效排查。', keywords: 'ChatGPT宕机,Claude服务器故障,AI平台状态,服务器故障检测' },
  'ai-network-29-ai-sudden-disconnect.md': { title: 'AI对话突然中断怎么办？ChatGPT断线原因与修复 - 机场猫', description: '解析 ChatGPT 等 AI 工具对话突然中断的常见原因：网络丢包、节点超时、服务器限制，以及如何通过调整代理设置减少中断频率、保护长对话不丢失。', keywords: 'ChatGPT突然中断,AI对话断线,ChatGPT断连修复,AI连接中断' },
  'ai-network-35-proxy-vs-vpn.md': { title: '代理和VPN有什么区别？科学上网工具选择指南 - 机场猫', description: '彻底厘清代理（Proxy/机场）与 VPN 的本质区别：工作原理、加密方式、速度表现、适用场景的对比，以及哪种工具更适合访问 ChatGPT 等 AI 服务。', keywords: '代理和VPN区别,代理vs VPN,VPN是什么,机场和VPN区别' },
  'ai-network-40-ip-leak.md': { title: 'IP泄漏导致ChatGPT封号？代理IP泄漏检测与防护 - 机场猫', description: '解析代理使用中的 IP 泄漏风险：WebRTC 泄漏、DNS 泄漏如何暴露真实 IP，以及如何检测是否存在泄漏、修复配置防止 ChatGPT 等平台识别真实位置。', keywords: 'IP泄漏ChatGPT,代理IP泄漏,WebRTC泄漏,IP泄漏检测防护' },
  'ai-network-41-cloudflare-block.md': { title: 'Cloudflare封锁代理IP？CF防护触发原因与解决方法 - 机场猫', description: '解析 Cloudflare 安全检测（CF盾）拦截代理 IP 的原因：数据中心 IP 被 CF 标记为高风险，如何通过更换节点或使用住宅 IP 绕过 Cloudflare 的访问限制。', keywords: 'Cloudflare封锁代理,CF防护,Cloudflare拦截IP,CF盾' },
  'ai-network-55-latency-stability.md': { title: '延迟稳定性比低延迟更重要？评估网络质量的正确方法 - 机场猫', description: '分析为何延迟稳定性（抖动）比绝对延迟值更影响 AI 工具和视频的使用体验，以及如何通过持续 Ping 测试而非单次测速来更准确地评估代理节点质量。', keywords: '延迟稳定性,网络抖动影响,代理网络质量,节点稳定性评估' },
  'ai-network-56-packet-loss.md': { title: '什么是网络丢包？丢包如何影响AI工具使用体验 - 机场猫', description: '解析网络丢包（Packet Loss）的原理和对 ChatGPT 等 AI 工具的影响：为何丢包会导致 AI 回答中断或加载失败，以及如何通过节点选择降低丢包率。', keywords: '网络丢包影响,丢包AI工具,ChatGPT丢包,代理丢包' },

  // === AI Study ===
  'ai-study-05-quiz.md': { title: 'AI出题测验：用ChatGPT/Claude生成练习题自测 - 机场猫', description: '介绍如何用 ChatGPT 或 Claude 为自己生成测验题（Quiz）进行自我检测：通过提供学习材料让 AI 出选择题、填空题或简答题，提高复习效率。', keywords: 'AI出练习题,ChatGPT出题,AI测验,AI辅助学习' },
  'ai-study-07-exam-prep.md': { title: 'AI辅助备考：用ChatGPT高效准备考试的方法 - 机场猫', description: '系统介绍如何用 ChatGPT 进行考试备考：整理考点、生成模拟题、解析错题、制定复习计划，让 AI 成为你的个人备考助教。', keywords: 'AI备考,ChatGPT备考,AI考试准备,AI学习辅助' },
  'ai-study-08-english.md': { title: 'AI学英语：用ChatGPT提升英语口语和写作的技巧 - 机场猫', description: '介绍如何将 ChatGPT 等 AI 工具用于英语学习：模拟英语对话练习、纠正语法错误、改写英语文章，以及与 AI 对话提升实际语言应用能力。', keywords: 'AI学英语,ChatGPT练英语,AI英语口语,AI英语写作' },
  'ai-study-09-paper.md': { title: 'AI辅助论文写作：ChatGPT帮你完成学术写作的方法 - 机场猫', description: '介绍合理使用 ChatGPT 辅助学术论文写作的方法：文献检索辅助、提纲生成、段落改写润色、语法检查，以及学术写作中 AI 使用的边界与注意事项。', keywords: 'AI写论文,ChatGPT学术写作,AI辅助论文,论文AI工具' },

  // === AI Tools ===
  'ai-tools-05-chatgpt-first-conversation.md': { title: 'ChatGPT第一次对话怎么开始？新手首次使用完整指南 - 机场猫', description: '面向完全新手：打开 ChatGPT 之后如何开始第一次对话，如何提出好问题，常见的新手误区，以及几个立即上手的实用场景示例。', keywords: 'ChatGPT第一次对话,ChatGPT新手使用,ChatGPT怎么问问题,ChatGPT入门' },
  'ai-tools-09-claude-new-chat.md': { title: 'Claude怎么开始新对话？Claude入门使用完整教程 - 机场猫', description: '面向新手介绍如何在 Claude 中开始第一次对话：注册访问方式、界面布局、如何提出第一个问题，以及 Claude 与 ChatGPT 在使用习惯上的主要区别。', keywords: 'Claude新手入门,Claude使用教程,Claude怎么用,Claude第一次使用' },
  'ai-tools-11-chatgpt-format.md': { title: 'ChatGPT输出格式怎么控制？Markdown和JSON格式指定 - 机场猫', description: '介绍如何通过 Prompt 指定 ChatGPT 的输出格式：要求以 Markdown、JSON、表格、列表等特定格式输出，满足开发和内容创作不同场景的需求。', keywords: 'ChatGPT输出格式,ChatGPT Markdown,ChatGPT JSON输出,格式化输出' },
  'ai-tools-12-chatgpt-mistakes.md': { title: 'ChatGPT新手常见错误：这些使用习惯让AI越用越差 - 机场猫', description: '盘点 ChatGPT 新手最容易犯的使用错误：问题太模糊、不给背景信息、不追问、不验证答案等，以及如何改变习惯获得更好的 AI 回复质量。', keywords: 'ChatGPT新手错误,ChatGPT使用误区,ChatGPT使用技巧,ChatGPT提升效果' },
  'ai-tools-13-claude-follow-up.md': { title: 'Claude追问技巧：如何引导Claude深入回答 - 机场猫', description: '介绍与 Claude 进行多轮对话追问的技巧：如何基于上一条回复提出更有针对性的问题，引导 Claude 不断深入、完善回答，提升对话质量。', keywords: 'Claude追问技巧,Claude多轮对话,Claude引导回答,Claude使用技巧' },
  'ai-tools-15-claude-format.md': { title: 'Claude输出格式控制：让AI按你要求的结构输出 - 机场猫', description: '介绍如何通过 Prompt 控制 Claude 的输出格式：指定 Markdown 结构、表格、代码块、列表等，以及 Claude 在格式控制方面与 ChatGPT 的差异。', keywords: 'Claude输出格式,Claude格式控制,Claude Markdown,Claude结构化输出' },
  'ai-tools-16-gemini-follow-up.md': { title: 'Gemini多轮对话技巧：引导Gemini深入展开讨论 - 机场猫', description: '介绍与 Google Gemini 进行高质量多轮对话的技巧：如何在上一条回复基础上追问，引导 Gemini 更详细、更深入地探讨特定话题。', keywords: 'Gemini追问技巧,Gemini多轮对话,Gemini引导,Google AI使用技巧' },
  'ai-tools-17-chatgpt-files.md': { title: 'ChatGPT上传文件功能：如何让AI分析你的文档 - 机场猫', description: '介绍 ChatGPT Plus 的文件上传功能：支持上传 PDF、Word、Excel、代码文件，让 AI 进行阅读分析、摘要提取、数据处理，以及对上传内容的最佳提问方式。', keywords: 'ChatGPT上传文件,ChatGPT文件分析,ChatGPT PDF,AI文档处理' },
  'ai-tools-18-chatgpt-pdf.md': { title: 'ChatGPT读取PDF：分析长篇文档和报告的技巧 - 机场猫', description: '专门介绍用 ChatGPT 处理 PDF 文档的方法：如何上传 PDF、提出正确的问题引导 AI 提炼关键信息，以及 ChatGPT 在长文档处理上的能力上限和技巧。', keywords: 'ChatGPT读PDF,ChatGPT分析PDF,ChatGPT文档,PDF分析AI' },
  'ai-tools-19-claude-pdf.md': { title: 'Claude读取PDF和长文档：超长文本处理技巧 - 机场猫', description: '介绍 Claude 处理 PDF 和长文档的能力：比较 Claude 与 ChatGPT 在长文本处理上的差异，以及如何引导 Claude 从长篇资料中提炼所需信息。', keywords: 'Claude读PDF,Claude长文档,Claude文件处理,Claude vs ChatGPT文档' },
  'ai-tools-20-gemini-image.md': { title: 'Gemini图片分析：让AI解读你的照片和截图 - 机场猫', description: '介绍 Google Gemini 的图片分析功能实际应用：上传照片、截图、图表，让 AI 进行内容识别、数据提取或解答图片中的问题，以及常见使用场景。', keywords: 'Gemini图片分析,Gemini读图,Google AI看图,Gemini多模态' },
  'ai-tools-21-chatgpt-summary.md': { title: 'ChatGPT总结文章技巧：精准提炼长文关键信息 - 机场猫', description: '介绍用 ChatGPT 总结文章、报告和长文的正确方法：如何通过 Prompt 控制摘要的长度、详细程度和重点方向，让 AI 真正提炼你需要的关键信息。', keywords: 'ChatGPT总结文章,ChatGPT摘要,AI文章总结,ChatGPT提炼信息' },
  'ai-tools-24-chatgpt-role.md': { title: 'ChatGPT角色扮演Prompt：让AI扮演专家角色提升回答质量 - 机场猫', description: '介绍在 ChatGPT 中使用角色扮演（Role Prompting）的技巧：通过让 AI 扮演特定专家角色（如资深律师、资深工程师），显著提升回答的专业程度和实用性。', keywords: 'ChatGPT角色扮演,Role Prompting,ChatGPT扮演专家,AI角色设定' },
  'ai-tools-27-claude-code.md': { title: 'Claude写代码：为什么程序员越来越偏爱Claude - 机场猫', description: '分析程序员从 ChatGPT 转向 Claude 的原因：Claude 在代码生成、代码审查和复杂逻辑推理上的优势，以及如何最大化发挥 Claude 编程辅助能力。', keywords: 'Claude写代码,Claude编程,Claude vs ChatGPT代码,程序员用Claude' },
  'ai-tools-28-gemini-workspace.md': { title: 'Gemini在Google Workspace中的使用：Gmail和Docs整合 - 机场猫', description: '介绍 Google Gemini 与 Gmail、Google Docs、Sheets 的深度整合功能：在 Google 生产力套件内直接使用 AI 辅助写作、摘要和数据分析。', keywords: 'Gemini Google Workspace,Gemini Gmail,Gemini Docs,Google AI办公' },
  'ai-tools-29-chatgpt-outline.md': { title: 'ChatGPT生成大纲：让AI帮你快速建立文章结构 - 机场猫', description: '介绍如何用 ChatGPT 生成文章、报告或演讲的逻辑大纲：提供主题和要求后让 AI 快速建立清晰的层级结构，作为内容创作的起点，减少"空白页恐惧"。', keywords: 'ChatGPT生成大纲,AI文章大纲,ChatGPT写作,ChatGPT结构化写作' },
  'ai-tools-30-chatgpt-rewrite.md': { title: 'ChatGPT改写文章：润色和优化已有内容的技巧 - 机场猫', description: '介绍用 ChatGPT 改写和润色已有内容的正确方式：通过精确的指令控制改写程度（仅改语气/全面重构），保留核心意思的同时提升文章质量。', keywords: 'ChatGPT改写文章,ChatGPT润色,AI改写,ChatGPT文章优化' },
  'ai-tools-31-claude-rewrite.md': { title: 'Claude改写和润色文章：保留个人风格的AI编辑技巧 - 机场猫', description: '介绍如何用 Claude 作为编辑角色润色文章：在提升语言质量的同时保留作者原始风格（Voice），以及 Claude 在保留个人写作特色上的优势。', keywords: 'Claude改写文章,Claude润色,AI编辑,保留写作风格' },
  'ai-tools-32-gemini-web.md': { title: 'Gemini联网搜索功能：实时获取最新信息 - 机场猫', description: '介绍 Google Gemini 的联网搜索功能：与只有训练截止日期数据的 AI 不同，Gemini 可以实时搜索互联网获取最新信息，适合查询时事和近期数据。', keywords: 'Gemini联网搜索,Gemini实时搜索,Gemini搜索功能,AI实时信息' },
  'ai-tools-35-claude-extract.md': { title: 'Claude信息提取技巧：从文档中精准抽取结构化数据 - 机场猫', description: '介绍使用 Claude 从长篇文档、合同、报告中提取关键信息的技巧：如何通过结构化 Prompt 指定提取维度，让 AI 直接输出整理好的数据。', keywords: 'Claude信息提取,Claude提取数据,Claude结构化提取,AI文档提取' },
  'ai-tools-36-chatgpt-image.md': { title: 'ChatGPT看图功能：上传图片让AI分析内容 - 机场猫', description: 'ChatGPT Plus 图片分析功能实际应用指南：如何上传截图、照片、图表让 AI 识别内容、解读数据，以及图片分析在工作和学习中的典型使用场景。', keywords: 'ChatGPT看图,ChatGPT图片分析,ChatGPT多模态,AI看图分析' },
  'ai-tools-38-claude-image.md': { title: 'Claude图片识别功能：分析截图、图表和文档图片 - 机场猫', description: '介绍 Claude 的图片识别和分析能力：上传截图、图表、文档图片后如何提问，Claude 在 OCR 文字提取和视觉内容解析上的实际表现。', keywords: 'Claude图片识别,Claude看图,Claude OCR,Claude图片分析' },
  'ai-tools-39-gemini-summary.md': { title: 'Gemini总结和摘要功能：快速处理长文章的技巧 - 机场猫', description: '介绍 Google Gemini 的文章总结和摘要能力：如何提供长文让 Gemini 快速提炼关键点，控制摘要输出的格式和详细程度。', keywords: 'Gemini总结文章,Gemini摘要,Google AI摘要,Gemini信息提炼' },
  'ai-tools-42-claude-artifacts.md': { title: 'Claude Artifacts是什么？代码和文档实时预览功能 - 机场猫', description: '介绍 Claude Artifacts 功能：在对话窗口中直接预览生成的 HTML/React 代码和文档，支持实时修改和迭代，在 AI 辅助开发和内容创作中的实际价值。', keywords: 'Claude Artifacts,Claude代码预览,Claude实时预览,Claude开发功能' },
  'ai-tools-44-chatgpt-math.md': { title: 'ChatGPT解数学题：数学问题正确提问方法 - 机场猫', description: '介绍如何用 ChatGPT 解决数学问题：通过要求 AI 分步骤展示解题过程（Chain of Thought），减少直觉错误，以及对 ChatGPT 数学能力的准确预期。', keywords: 'ChatGPT解数学,ChatGPT数学问题,AI解题,ChatGPT计算' },
  'ai-tools-45-chatgpt-translate.md': { title: 'ChatGPT翻译功能：比翻译软件更智能的AI翻译技巧 - 机场猫', description: '介绍如何用 ChatGPT 进行专业翻译：比普通翻译软件更好地处理语境、专业术语和文化差异，以及通过 Prompt 控制翻译风格（正式/口语/地道）的技巧。', keywords: 'ChatGPT翻译,AI翻译技巧,ChatGPT翻译功能,智能翻译' },
  'ai-tools-47-chatgpt-voice.md': { title: 'ChatGPT语音对话功能（Voice Mode）使用指南 - 机场猫', description: '介绍 ChatGPT 语音对话（Voice Mode）的使用方法：如何开启语音功能、与 AI 进行自然语音对话，以及语音模式在英语练习和口头信息处理中的实际应用。', keywords: 'ChatGPT语音对话,ChatGPT Voice Mode,ChatGPT语音功能,AI语音对话' },
  'ai-tools-50-chatgpt-mistakes.md': { title: '这些习惯让ChatGPT越用越差：常见新手误区 - 机场猫', description: '深入分析导致 ChatGPT 使用效果差的常见习惯：问题不具体、不提供背景、不验证回答、不追问等，以及养成高质量使用习惯的实用建议。', keywords: 'ChatGPT使用误区,ChatGPT坏习惯,ChatGPT提升效果,ChatGPT使用技巧' },
  'ai-tools-51-chatgpt-misunderstanding.md': { title: 'ChatGPT答非所问怎么办？解决AI理解偏差的策略 - 机场猫', description: '解析为什么 ChatGPT 有时无法准确理解你的意图：提供的上下文不足、指令模糊、假设不一致，以及通过明确指令让 AI 真正理解需求的实用策略。', keywords: 'ChatGPT答非所问,ChatGPT理解偏差,ChatGPT指令技巧,AI理解问题' },
  'ai-tools-53-claude-refine.md': { title: 'Claude局部修改技巧：不重新生成只调整特定部分 - 机场猫', description: '介绍 Claude 的局部修改对话技巧：如何针对 AI 回复中的某个具体段落或细节进行精准调整，而无需让 AI 全部重新生成，节省时间提升迭代效率。', keywords: 'Claude局部修改,Claude精准调整,Claude迭代优化,Claude对话技巧' },
  'ai-tools-56-chatgpt-format.md': { title: 'ChatGPT按格式输出：JSON/Markdown/表格结构化输出指南 - 机场猫', description: '介绍如何让 ChatGPT 严格按照指定格式输出：通过 Prompt 要求 JSON（适合程序解析）、Markdown 表格（适合阅读）、代码块等特定结构，满足不同使用场景。', keywords: 'ChatGPT JSON输出,ChatGPT格式化输出,ChatGPT Markdown输出,结构化输出AI' },
  'ai-tools-58-chatgpt-table-output.md': { title: 'ChatGPT生成表格：让AI把信息整理成清晰表格 - 机场猫', description: '介绍用 ChatGPT 生成结构化对比表格的方法：通过简单的 Prompt 技巧让 AI 将杂乱信息整理为清晰的 Markdown 表格，适合数据对比和信息汇总场景。', keywords: 'ChatGPT生成表格,ChatGPT对比表格,AI表格输出,ChatGPT Markdown表格' },
  'ai-tools-59-chatgpt-prompt-guide.md': { title: 'ChatGPT提示词结构：写出有逻辑的高质量Prompt - 机场猫', description: '介绍写出高质量 ChatGPT Prompt 的结构方法：任务定义、背景说明、约束条件、输出格式四要素框架，解决"AI回答干巴巴"的根本问题。', keywords: 'ChatGPT提示词结构,Prompt写法,ChatGPT高质量Prompt,AI提示词技巧' },
  'ai-tools-60-chatgpt-few-shot.md': { title: 'Few-Shot Prompting技巧：给例子让ChatGPT按样学样 - 机场猫', description: '介绍 Few-Shot Prompting（示例驱动提示）的原理和应用：在 Prompt 中提供2-3个示例，比用文字描述格式更有效地控制 ChatGPT 的输出风格和结构。', keywords: 'Few-Shot Prompting,示例提示词,ChatGPT给例子,AI提示词技巧' },
  'ai-tools-61-chatgpt-step-by-step.md': { title: '让ChatGPT分步骤推理：解决AI计算和逻辑错误 - 机场猫', description: '介绍"Chain of Thought"（思维链）提示技巧：让 ChatGPT 分步骤展示推理过程，显著减少复杂数学、逻辑推理任务中的错误率，以及适用场景。', keywords: 'ChatGPT分步推理,Chain of Thought,AI逻辑推理,ChatGPT计算错误' },
  'ai-tools-62-chatgpt-revise.md': { title: 'ChatGPT修改内容技巧：给精准反馈而不是让它重写 - 机场猫', description: '介绍向 ChatGPT 给出精准修改反馈的技巧：指出具体问题点（语气/结构/内容准确性）让 AI 进行局部调整，而非模糊地说"重新写一遍"。', keywords: 'ChatGPT修改技巧,ChatGPT精准反馈,ChatGPT迭代,AI内容修改' },
  'ai-tools-63-chatgpt-complex.md': { title: 'ChatGPT处理大任务：分解复杂项目的Prompt策略 - 机场猫', description: '解析为何不能让 ChatGPT 一次性完成10万字小说或完整应用开发，以及通过"任务分解"策略（将大任务拆为可执行的小步骤）让 AI 有效完成复杂项目的方法。', keywords: 'ChatGPT处理大任务,任务分解Prompt,ChatGPT复杂项目,AI大任务策略' },
  'ai-tools-67-claude-complex-prompt.md': { title: 'Claude XML标签Prompt：处理复杂长Prompt的官方推荐方法 - 机场猫', description: '介绍 Anthropic 官方推荐的 Claude Prompt 结构化方法——使用 XML 标签系统：为什么 XML 标签能帮助 Claude 精准理解超长、多条件的复杂指令。', keywords: 'Claude XML标签,Claude复杂Prompt,Claude Prompt结构化,Anthropic Prompt' },
  'ai-tools-70-claude-step-by-step.md': { title: 'Claude分步推理：让AI展示思考过程减少逻辑错误 - 机场猫', description: '介绍让 Claude 分步骤展示推理过程的方法：通过"Think Step by Step"提示让 Claude 进行深思熟虑的推导，减少直觉性错误，尤其适用于逻辑和数学题。', keywords: 'Claude分步推理,Claude逻辑推理,Claude Think Step by Step,AI推理技巧' },
  'ai-tools-71-claude-off-topic.md': { title: 'Claude为什么会乱编数据？AI幻觉原理与防止方法 - 机场猫', description: '深入解析 AI 幻觉（Hallucination）的本质：Claude 等大语言模型为何会生成看似合理但实际虚假的信息，以及如何通过 Prompt 设计和验证步骤减少幻觉影响。', keywords: 'AI幻觉,Claude幻觉,AI乱编数据,Hallucination' },
  'ai-tools-73-claude-compare-files.md': { title: 'Claude对比多个文档：快速找出合同和文件的差异 - 机场猫', description: '介绍如何用 Claude 对比两份长文档（合同不同版本、财报等）：利用 Claude 的长文本能力快速识别关键差异，比人工逐行对比大幅节省时间。', keywords: 'Claude对比文档,Claude文件对比,AI文档差异,Claude合同对比' },
  'ai-tools-74-claude-ocr.md': { title: 'Claude OCR功能：从图片中精准提取文字内容 - 机场猫', description: '介绍如何用 Claude 的视觉能力进行 OCR（光学字符识别）：上传截图或图片后提取文字，保持原有排版格式，以及比传统 OCR 工具更灵活的使用方式。', keywords: 'Claude OCR,Claude图片提取文字,AI OCR识别,Claude文字识别' },
  'ai-tools-75-claude-web-screenshot.md': { title: 'Claude看网页截图：从截图还原前端代码和布局 - 机场猫', description: '介绍前端开发和 UI 设计师的高级使用场景：上传网页截图让 Claude 分析设计风格并生成对应的 HTML/CSS 代码，大幅加速前端开发中的界面复刻工作。', keywords: 'Claude网页截图,Claude生成代码,AI前端开发,Claude UI复刻' },
  'ai-tools-76-claude-image-error.md': { title: 'Claude图片识别不准？AI视觉幻觉的原因与应对 - 机场猫', description: '分析 Claude 图片识别出现错误（视觉幻觉）的场景：复杂图片信息密度高时为何会"视而不见"或编造细节，以及如何优化上传图片和提问方式减少识图错误。', keywords: 'Claude图片识别错误,AI视觉幻觉,Claude看图不准,AI图片分析错误' },
  'ai-tools-77-claude-coding.md': { title: '程序员用Claude写代码：优于ChatGPT的编程场景 - 机场猫', description: '从程序员视角分析 Claude 在代码生成、代码审查、复杂逻辑实现上的优势，解释越来越多开发者将日常编程 AI 工具从 ChatGPT 切换为 Claude 的原因。', keywords: 'Claude编程,程序员Claude,Claude vs ChatGPT编程,Claude代码生成' },
  'ai-tools-78-claude-project-docs.md': { title: 'Claude整理项目文档：用AI快速消化烂摊子项目 - 机场猫', description: '介绍如何用 Claude 处理接手新项目时的大量文档：上传 PRD、会议记录、代码片段，让 AI 梳理项目背景、识别关键决策和潜在问题，快速建立项目认知。', keywords: 'Claude整理项目文档,Claude PRD分析,Claude项目接手,AI项目文档' },
  'ai-tools-79-claude-outline.md': { title: 'Claude生成文章大纲：用AI克服创作初期的"空白页恐惧" - 机场猫', description: '介绍如何用 Claude 作为头脑风暴工具快速生成文章大纲：提供主题后让 AI 生成多个结构方向供选择，解决内容创作初期不知从何写起的问题。', keywords: 'Claude生成大纲,Claude写作辅助,AI文章大纲,Claude内容创作' },
  'ai-tools-80-claude-editing.md': { title: 'Claude编辑润色：保留个人风格同时提升文章质量 - 机场猫', description: '介绍让 Claude 扮演资深编辑角色润色文章的方法：在提升语言质量、修正逻辑的同时保留作者原始风格（Voice），而非将内容改造为千篇一律的 AI 腔调。', keywords: 'Claude润色文章,Claude编辑,AI保留写作风格,Claude语言润色' },
};

let fixed = 0;
Object.entries(REMAINING_FIXES).forEach(([filename, meta]) => {
  const fp = path.join(dir, filename);
  if (!fs.existsSync(fp)) { console.log('[NOT FOUND] ' + filename); return; }
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;
  c = c.replace(/title:\s*["'][^"']*["']/, 'title: "' + meta.title + '"');
  c = c.replace(/description:\s*["'][^"']*["']/, 'description: "' + meta.description + '"');
  c = c.replace(/keywords:\s*["'][^"']*["']/, 'keywords: "' + meta.keywords + '"');
  if (c !== orig) { fs.writeFileSync(fp, c, 'utf8'); console.log('[FIXED] ' + filename); fixed++; }
  else console.log('[UNCHANGED] ' + filename);
});
console.log('\nFixed: ' + fixed);
