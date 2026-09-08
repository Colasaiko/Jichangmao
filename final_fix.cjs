const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

// Final comprehensive fixes for all remaining "网络专线" and "这个功能" duplicates
const FINAL_FIXES = {
  // === Copilot remaining ===
  'copilot-prompt-guide.md': { title: 'Copilot提示词技巧：如何与微软AI高效沟通 - 机场猫', description: '详解与 Microsoft Copilot 高效沟通的提示词（Prompt）技巧：如何让 AI 准确理解意图，生成高质量内容，以及针对不同任务类型的提问策略。', keywords: 'Copilot提示词,Copilot Prompt技巧,Copilot使用技巧,微软AI提问' },
  'copilot-upload-file.md': { title: 'Copilot上传文件功能：分析PDF和文档的方法 - 机场猫', description: '介绍 Microsoft Copilot 的文件上传功能：如何上传 PDF、Word、Excel 等文档让 AI 进行智能分析、总结和关键信息提取。', keywords: 'Copilot上传文件,Copilot分析文档,Copilot PDF分析,微软AI文件' },
  'copilot-voice-vision.md': { title: 'Copilot语音与视觉功能：Voice和Vision使用指南 - 机场猫', description: '介绍 Copilot Voice（语音对话）和 Copilot Vision（视觉分析）两项多模态功能：如何通过语音与 AI 自然对话，以及如何让 AI 分析图片和屏幕内容。', keywords: 'Copilot Voice,Copilot Vision,Copilot语音,Copilot视觉功能' },

  // === AI Drama remaining ===
  'ai-drama-08-dialogue.md': { title: 'AI短剧台词生成：用AI写出自然的角色对白 - 机场猫', description: '介绍如何利用 ChatGPT 等 AI 工具生成 AI 短剧中的角色台词，避免机械感，写出符合人物性格和剧情节奏的自然对话。', keywords: 'AI短剧台词,AI写对白,AI剧本对话,短剧台词生成' },
  'ai-drama-13-tool-kling.md': { title: '可灵(Kling)AI视频生成教程：短剧场景制作指南 - 机场猫', description: '专门介绍快手可灵（Kling）AI 视频生成工具的使用方法：如何输入提示词生成短剧场景，以及可灵在AI短剧制作中的实际效果和适用场景。', keywords: '可灵AI视频,Kling使用教程,AI短剧制作,可灵短剧' },

  // === AI Network articles (all the network troubleshooting ones) ===
  'ai-network-04-browser-cache.md': { title: '清除浏览器缓存解决代理问题：Cache与Cookie清理指南 - 机场猫', description: '介绍浏览器缓存和 Cookie 对代理使用的影响：为什么切换节点后有些网站仍显示旧版本或旧地区，以及如何通过清缓存解决代理相关的浏览器兼容问题。', keywords: '清除浏览器缓存,Cache清理,代理浏览器问题,Cookie清理' },
  'ai-tools-83-gemini-pdf.md': { title: 'Gemini分析PDF文件：超长上下文处理文档的技巧 - 机场猫', description: '介绍如何利用 Google Gemini 1.5 Pro 的超大上下文窗口处理长篇 PDF 文档：上传步骤、提问技巧，以及 Gemini 在大文档分析上的实际表现。', keywords: 'Gemini分析PDF,Gemini处理文档,Gemini长文档,Google AI文件分析' },
  'ai-tools-84-gemini-accurate.md': { title: 'Gemini回答太浅？让Gemini给出更准确深度回答的技巧 - 机场猫', description: '解析为何 Gemini 有时回答显得"水"缺乏深度，以及通过专属提示词（Prompt）技巧大幅提升 Gemini 回答准确度和专业性的实用方法。', keywords: 'Gemini提示词技巧,Gemini准确回答,Gemini Prompt,提升AI回答质量' },
  'ai-tools-86-gemini-image.md': { title: 'Gemini看图功能：上传图片进行AI分析和解读 - 机场猫', description: '介绍 Google Gemini 的多模态图片分析功能：如何上传照片、图表、外语菜单或数学题图，让 AI 进行识别、分析和解答。', keywords: 'Gemini看图,Gemini图片分析,Google AI视觉,Gemini多模态' },
  'ai-tools-87-gemini-extract.md': { title: 'Gemini信息提取技巧：从长文档中快速提炼关键内容 - 机场猫', description: '介绍如何借助 Google Gemini 处理研究报告、会议记录、法律合同等长篇文档，快速提炼摘要、提取关键信息的实用 Prompt 技巧。', keywords: 'Gemini信息提取,Gemini长文档处理,Gemini提炼摘要,AI文档处理' },
  'ai-work-01-efficiency.md': { title: '上班族用AI提升工作效率：减少无效加班的实用指南 - 机场猫', description: '面向普通职场人的 AI 效率提升实用指南：用 AI 作为得力助手（而非替代品），从日常工作场景出发，减少无效加班，把时间留给真正有价值的工作。', keywords: 'AI提升工作效率,上班族用AI,职场AI工具,AI减少加班' },
  'ai-work-05-excel.md': { title: '用AI写Excel公式：自然语言搞定VLOOKUP和嵌套函数 - 机场猫', description: '介绍如何用 ChatGPT 等 AI 工具处理 Excel 复杂公式：不再需要记忆 VLOOKUP、INDEX-MATCH 等函数语法，用自然语言描述需求让 AI 直接生成公式。', keywords: 'AI写Excel公式,ChatGPT Excel,AI数据处理,Excel AI助手' },
  'ai-work-08-communication.md': { title: '高情商职场沟通：用AI帮你写得体的异议和回复 - 机场猫', description: '介绍如何借助 AI 工具提升职场沟通技巧：在工作群或邮件中提出异议、拒绝请求或表达意见时，如何用 AI 润色语气，做到既专业又不得罪人。', keywords: 'AI职场沟通,高情商回复,AI写邮件,职场AI技巧' },
  'ai-work-09-interview.md': { title: 'AI面试准备：用ChatGPT当私人面试教练 - 机场猫', description: '介绍如何用 ChatGPT 等 AI 工具系统准备求职面试：上传简历和 JD 让 AI 预测面试题、模拟面试对答、优化自我介绍，提升面试成功率。', keywords: 'AI面试准备,ChatGPT面试,AI求职助手,面试AI教练' },
  'ai-workflow-02-student.md': { title: '学生AI学习工作流：从课前预习到课后复习的完整方案 - 机场猫', description: '为学生整理的完整 AI 学习流程：将 ChatGPT、Claude 等 AI 工具融入预习、听课、复习各个环节，建立系统性 AI 辅助学习习惯提升学习效率。', keywords: 'AI学生学习,AI辅助学习工作流,ChatGPT学习,学生用AI' },

  // === Network-related articles with wrong title ===
  'clash-enable-tun-mode.md': { title: 'Clash如何开启TUN模式？Windows全局代理配置步骤 - 机场猫', description: '图文介绍在 Windows 的 Clash Verge Rev 中开启 TUN 模式的完整步骤：TUN 模式的使用场景，以及开启前需要注意的权限和配置要求。', keywords: 'Clash TUN模式,Clash开启TUN,Clash全局代理,Clash Verge TUN' },
  'clash-routing-rules.md': { title: 'Clash分流规则如何应用？规则集配置实战教程 - 机场猫', description: '从理论到实操：如何在 Clash 客户端中配置和应用分流规则，使用预置规则集或自定义规则控制哪些流量走代理、哪些直连。', keywords: 'Clash分流规则配置,Clash规则集,Clash路由规则,Clash分流教程' },
  'dns-resolution-failed.md': { title: 'DNS解析失败怎么办？代理环境DNS故障排查指南 - 机场猫', description: '专门解决代理开启后 DNS 解析失败的问题：区分 DNS 失败与普通连接超时，分步骤排查 DNS 配置错误，以及修复 DNS 泄漏和解析失败的具体方法。', keywords: 'DNS解析失败,代理DNS故障,DNS排查,DNS修复' },
  'how-to-choose-an-airport-guide.md': { title: '机场怎么选？避开常见陷阱的机场选购指南 - 机场猫', description: '面对成百上千家机场服务商，如何避开"跑路预警""虚标节点"等常见陷阱，根据自身需求（速度/价格/稳定性）理性选购适合自己的机场。', keywords: '机场怎么选,机场选购指南,机场防坑,如何选机场' },
  'how-to-read-speedtest-results.md': { title: '测速结果怎么看？下载/上传/延迟/抖动各指标解读 - 机场猫', description: '帮你看懂测速软件给出的下载速度、上传速度、延迟（Ping）、抖动（Jitter）等数据：不同应用场景对各指标的要求不同，以及如何判断一个节点是否真正好用。', keywords: '测速结果解读,下载上传速度,延迟抖动,节点测速指标' },
  'how-to-test-node-speed.md': { title: '如何测试代理节点速度？完整节点体检方法 - 机场猫', description: '讲解如何对代理节点进行全面体检：轻度测试（延迟）、中度测试（单线程下载）、重度测试（多线程并发），结合不同测试工具综合评估节点实际质量。', keywords: '测试节点速度,代理测速,节点体检,如何测速节点' },
  'iplc-iepl-bgp-explained.md': { title: 'IPLC、IEPL和BGP是什么？三种线路类型完整解析 - 机场猫', description: '一文厘清机场营销中最常见的三类线路术语：IPLC（国际私有专线）、IEPL（国际以太网专线）、BGP多线中转——技术差异、价格区别与适用场景。', keywords: 'IPLC IEPL BGP区别,专线是什么,BGP中转,机场线路类型' },
  'mac-clash-verge-rev.md': { title: 'Clash Verge Rev是什么？macOS代理客户端介绍 - 机场猫', description: '介绍 Clash Verge Rev 的定位与特点：基于 Tauri 框架的现代化代理客户端，与其他 Clash 分叉的区别，以及在 macOS 上的安装和基础配置。', keywords: 'Clash Verge Rev,Clash客户端,Clash Verge,macOS代理客户端' },
  'nodes-timeout-troubleshooting.md': { title: '节点全部Timeout怎么办？代理断线完整排查步骤 - 机场猫', description: '专门解决"客户端中所有节点变红显示Timeout"的问题：逐步排查是订阅过期、本地网络故障还是节点被封，以及快速恢复代理连接的处理方法。', keywords: '节点Timeout,节点全部超时,代理断线,节点连不上' },
  'proxy-not-working-troubleshooting-hub.md': { title: '代理连不上网怎么办？连接故障综合排查中心 - 机场猫', description: '代理配置完成但 Google 仍打不开？系统梳理代理连接失败的各类原因和对应排查方向，帮你从几十个可能的故障环节中精准定位问题所在。', keywords: '代理连不上,代理故障排查,科学上网故障,代理不工作' },
  'subscription-no-nodes.md': { title: '订阅链接导入后没有节点？空列表问题排查指南 - 机场猫', description: '解决新手常见问题：订阅链接复制进客户端后界面无反应或节点列表为空——逐步排查订阅格式错误、链接失效、客户端版本问题等常见原因。', keywords: '订阅没有节点,订阅链接空列表,节点导入失败,订阅排查' },
  'top-4-recommended-airports.md': { title: '2026最稳定4款机场推荐：晚高峰实测精选 - 机场猫', description: '综合日常稳定性、晚高峰测速、流媒体解锁和 AI 工具支持等多维度实测，精选推荐当前体验最稳的 4 家机场服务商，包含详细的选择建议。', keywords: '最稳定机场推荐,4款机场推荐,晚高峰机场,机场稳定性测试' },
  'tun-mode-no-internet.md': { title: '开启TUN模式后断网怎么办？TUN模式断网修复指南 - 机场猫', description: '专门解决 TUN 模式开启后整台电脑断网的问题：分析 TUN 模式修改系统路由表导致断网的原因，以及通过关闭 TUN 模式或调整路由配置恢复网络的步骤。', keywords: 'TUN模式断网,TUN模式问题,Clash TUN断网,代理断网修复' },
};

// Also handle all remaining ai-network-* and ai-tools-* and ai-study-* and similar files
// First, list all the files still with the "网络专线" title
const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const dupFiles = allFiles.filter(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  return c.includes('"网络专线：2026最新教程与指南 - 机场猫"');
});

console.log('Files still with 网络专线 title:');
dupFiles.forEach(f => console.log('  ' + f));
console.log('Total: ' + dupFiles.length);

// Apply FINAL_FIXES first
let fixed = 0;
Object.entries(FINAL_FIXES).forEach(([filename, meta]) => {
  const fp = path.join(dir, filename);
  if (!fs.existsSync(fp)) return;
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;
  c = c.replace(/title:\s*["'][^"']*["']/, 'title: "' + meta.title + '"');
  c = c.replace(/description:\s*["'][^"']*["']/, 'description: "' + meta.description + '"');
  c = c.replace(/keywords:\s*["'][^"']*["']/, 'keywords: "' + meta.keywords + '"');
  if (c !== orig) { fs.writeFileSync(fp, c, 'utf8'); console.log('[FIXED] ' + filename); fixed++; }
});
console.log('Fixed in this batch: ' + fixed);
