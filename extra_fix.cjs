const fs = require('fs');
const path = require('path');

// Additional fixes for remaining duplicate groups
const EXTRA_FIXES = {
  // connection-issues group
  'copilot-connection-issues.md': {
    title: 'Copilot连接失败怎么办？微软Copilot访问问题排查 - 机场猫',
    description: '系统排查 Microsoft Copilot 无法连接的常见原因：代理设置问题、地区访问限制、账号状态异常，以及恢复正常使用的解决步骤。',
    keywords: 'Copilot连接失败,Copilot无法访问,Copilot报错,Copilot网络问题'
  },
  'grok-connection-issues.md': {
    title: 'Grok AI连接失败怎么办？xAI Grok访问问题排查 - 机场猫',
    description: '针对 Grok AI（xAI）访问连接失败的排查指南：代理节点选择、X平台账号状态、地区访问限制等常见问题的解决方法。',
    keywords: 'Grok连接失败,Grok AI无法访问,xAI Grok报错,Grok网络问题'
  },
  'perplexity-connection-issues.md': {
    title: 'Perplexity连接问题排查：网页白屏或加载失败怎么办 - 机场猫',
    description: '系统排查 Perplexity AI 搜索工具连接失败的原因：从代理设置到服务器状态，提供分步骤的诊断方法，帮你快速恢复正常使用。',
    keywords: 'Perplexity连接问题,Perplexity无法使用,Perplexity网络错误,AI搜索连接问题'
  },
  // Grok
  'grok-how-to-use.md': {
    title: 'Grok AI怎么用？xAI Grok使用入门教程 - 机场猫',
    description: '手把手介绍如何使用 Grok AI：功能特点、如何访问 X 平台实时数据、与 ChatGPT 的使用差异，以及对代理节点的地区要求。',
    keywords: 'Grok AI使用教程,Grok怎么用,xAI Grok,Grok入门'
  },
  // tools 13-19 (WireGuard/VPN/Tailscale series)
  'tools-13.md': {
    title: 'OpenVPN是什么？企业级VPN协议原理与使用场景 - 机场猫',
    description: '解析 OpenVPN 的技术特点：基于 SSL/TLS 的企业级 VPN 标准，拥有二十年行业应用历史。介绍其工作原理和与 WireGuard 等新协议的对比。',
    keywords: 'OpenVPN是什么,OpenVPN使用,企业级VPN,OpenVPN教程'
  },
  'tools-14.md': {
    title: 'OpenVPN配置文件(.ovpn)解析：核心参数看懂指南 - 机场猫',
    description: '用通俗语言解读 .ovpn 配置文件的核心参数含义：连接指令、路由规则、内嵌证书密钥的作用，帮助你在遇到连接失败时自行排查。',
    keywords: 'OpenVPN配置文件,ovpn文件,OpenVPN参数,VPN配置'
  },
  'tools-15.md': {
    title: 'WireGuard vs OpenVPN：两种VPN协议哪个更好 - 机场猫',
    description: '深度对比 WireGuard 与 OpenVPN 在性能、配置复杂度、安全性和网络穿透力上的差异，帮助你根据实际使用场景（远程办公/家庭/企业）做出最合适的选择。',
    keywords: 'WireGuard vs OpenVPN,WireGuard对比,VPN协议对比,WireGuard教程'
  },
  'tools-16.md': {
    title: 'Tailscale是什么？无需公网IP的异地组网工具 - 机场猫',
    description: '介绍 Tailscale 的工作原理：基于 WireGuard 的网状组网技术，无需公网 IP 和复杂配置，即可把分散在各地的设备连入同一个专属虚拟局域网。',
    keywords: 'Tailscale是什么,Tailscale使用,异地组网,WireGuard组网'
  },
  'tools-17.md': {
    title: 'WireGuard与Tailscale的关系：底层协议与上层封装 - 机场猫',
    description: '厘清 WireGuard 和 Tailscale 的关系：WireGuard 是底层 VPN 协议（发动机），Tailscale 是在其之上实现了自动密钥分发和 NAT 穿透的完整组网平台。',
    keywords: 'WireGuard和Tailscale,Tailscale WireGuard关系,VPN协议,组网工具'
  },
  'tools-18.md': {
    title: 'Tailscale Exit Node配置：借用远程设备的出口网络 - 机场猫',
    description: '介绍 Tailscale Exit Node 的配置方法：在公共 Wi-Fi 或需要借用家中宽带 IP 时，如何开启出口节点将所有流量加密转发到指定设备再访问公网。',
    keywords: 'Tailscale Exit Node,Tailscale出口节点,Tailscale配置,VPN出口'
  },
  'tools-19.md': {
    title: 'Tailscale Subnet Router：让整个内网设备都可远程访问 - 机场猫',
    description: '介绍 Tailscale Subnet Router（子网路由）的配置方法：让无法安装客户端的 NAS、打印机、摄像头等内网设备，通过路由宣告在外网直接访问。',
    keywords: 'Tailscale Subnet Router,Tailscale子网路由,内网穿透,NAS远程访问'
  },
  // adv-24 to adv-28 (already in FIXES above but template was wrong in audit)
  'adv-24.md': {
    title: 'IPv4和IPv6有什么区别？代理节点与双栈网络解析 - 机场猫',
    description: '对比 IPv4（32位，约43亿地址）与 IPv6（128位，无限地址）的结构差异，以及在代理节点选择、VPS配置和双栈网络场景中的实际影响。',
    keywords: 'IPv4和IPv6区别,IPv6是什么,双栈网络,代理IPv6节点'
  },
  'adv-25.md': {
    title: '如何看穿机场营销话术？专线术语避坑完整指南 - 机场猫',
    description: '教你识别机场宣传中的常见营销噱头：解析"家宽原生IP""IPLC优质专线""三网BGP入口"等术语的真实含义，帮你避开过度包装、理性判断实际价值。',
    keywords: '机场营销话术,机场选购防坑,专线术语识别,机场怎么选'
  },
  'adv-26.md': {
    title: '测速跑满但视频还是卡？多线程vs单线程测速的真相 - 机场猫',
    description: '解释为何测速结果亮眼但体验依然差：主流测速工具测的是多线程并发峰值，而游戏/视频等真实场景关注单线程延迟和抖动，两者评价维度完全不同。',
    keywords: '测速跑满视频卡,多线程测速,单线程测速区别,代理速度测试'
  },
  'adv-27.md': {
    title: '如何判断代理线路稳定性？丢包率与持续Ping检测 - 机场猫',
    description: '讲解如何通过持续 Ping、MTR 路由追踪在高峰期测量丢包率和延迟抖动，得出一条代理线路在实际使用中的真实稳定性评分，而非只看峰值带宽。',
    keywords: '代理线路稳定性,丢包率测试,持续Ping,MTR路由追踪'
  },
  'adv-28.md': {
    title: '代理线路全面对比：CN2/9929/CMIN2/IPLC/IEPL如何选 - 机场猫',
    description: '一篇文章搞懂所有主流代理线路的差异：普通公网直连（163/169）、优化骨干网（CN2/9929/CMIN2）与内网物理专线（IPLC/IEPL）的架构差异与选购建议。',
    keywords: 'CN2 GIA推荐,代理线路对比,IPLC IEPL对比,9929线路,代理线路选购'
  },
};

const dir = 'src/content/blog';
let fixed = 0;

Object.entries(EXTRA_FIXES).forEach(([filename, meta]) => {
  const fp = path.join(dir, filename);
  if (!fs.existsSync(fp)) { console.log('[NOT FOUND] ' + filename); return; }
  let content = fs.readFileSync(fp, 'utf8');
  const orig = content;
  content = content.replace(/title:\s*["'][^"']*["']/, 'title: "' + meta.title + '"');
  content = content.replace(/description:\s*["'][^"']*["']/, 'description: "' + meta.description + '"');
  content = content.replace(/keywords:\s*["'][^"']*["']/, 'keywords: "' + meta.keywords + '"');
  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log('[FIXED] ' + filename);
    fixed++;
  }
});

console.log('Extra fixes applied: ' + fixed);
