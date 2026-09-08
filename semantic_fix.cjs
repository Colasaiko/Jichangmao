const fs = require('fs');
const path = require('path');

// Manually curated semantic title/desc/keywords mappings based on actual content analysis
// Format: filename -> { title, description, keywords }
const FIXES = {
  // ===== adv series (network concepts) =====
  'adv-01.md': {
    title: '网络路由是什么？数据包如何在互联网中寻路 - 机场猫',
    description: '从零理解网络路由的工作原理：数据包如何在路由器之间接力转发、如何选择最优路径，以及路由对代理节点选择的实际影响。',
    keywords: '网络路由,路由原理,数据包转发,路由器工作原理'
  },
  'adv-02.md': {
    title: 'ASN自治系统是什么？运营商网络的底层逻辑 - 机场猫',
    description: '深入解析 ASN（自治系统编号）是什么，不同运营商如何通过 ASN 管理各自的网络，以及 ASN 对跨境代理速度的影响。',
    keywords: 'ASN,自治系统,运营商网络,BGP协议'
  },
  'adv-03.md': {
    title: 'BGP协议是什么？互联网全局路由调度原理 - 机场猫',
    description: '通俗解释 BGP（边界网关协议）的工作原理——它不是物理线路，而是互联网的全球导航系统，负责在各运营商网络间动态计算最优路径。',
    keywords: 'BGP协议,边界网关协议,互联网路由,BGP是什么'
  },
  'adv-04.md': {
    title: 'BGP多线机房是什么？为什么比单线贵但更值 - 机场猫',
    description: '解析 BGP 多线机房的核心优势：同时接入电信、联通、移动三大骨干网，通过动态路由让不同运营商的用户自动走最优路径，有效降低跨网延迟。',
    keywords: 'BGP多线机房,BGP机房,三网优化,多线机房'
  },
  'adv-05.md': {
    title: 'ISP运营商分层解析：从家庭宽带到Tier1骨干网 - 机场猫',
    description: '解读 ISP 运营商的层级结构：从最末端的家庭宽带接入商，到掌控跨国海底光缆的 Tier 1 骨干网，不同层级的运营商如何决定你的网络质量。',
    keywords: 'ISP运营商,Tier1骨干网,网络运营商,电信联通移动'
  },
  'adv-06.md': {
    title: '中转节点是什么？为什么中转比直连更快更稳 - 机场猫',
    description: '解答经典疑惑：明明直连距离近，为何中转反而更快？揭示国内优质 BGP 机房作为中转跳板的技术原理，及其在代理场景中的实际价值。',
    keywords: '中转节点,网络中转,直连vs中转,中转代理'
  },
  'adv-07.md': {
    title: '代理链路入口节点与出口节点有什么区别 - 机场猫',
    description: '完整解析代理链路中的入口节点与出口节点分工：入口负责国内接收流量，出口负责海外发送请求，两者如何协作影响连接质量与 IP 归属。',
    keywords: '入口节点,出口节点,代理链路,节点架构'
  },
  'adv-08.md': {
    title: '专线网络的真正含义：物理隔离与独享带宽解析 - 机场猫',
    description: '澄清"专线"的技术定义：不是比公网快一点，而是运营商为特定客户单独划拨的专属通信链路，与公网彻底物理隔离，解释专线为何抗封锁能力极强。',
    keywords: '专线网络,专线是什么,物理专线,专线带宽'
  },
  'adv-09.md': {
    title: 'IPLC是什么？国际私有租用线路的原理与优势 - 机场猫',
    description: '深度解析 IPLC（国际私有租用线路）的技术本质：物理跨境点对点内网专线，不经过 GFW，延迟极低，为何被认为是跨境代理的稳定性天花板。',
    keywords: 'IPLC是什么,IPLC专线,国际私有租用线路,IPLC原理'
  },
  'adv-10.md': {
    title: 'IEPL是什么？IEPL与IPLC的区别详解 - 机场猫',
    description: '清楚区分 IEPL（国际以太网专线）与 IPLC 的技术差异：两者同属内网物理专线，均不过 GFW，但底层实现技术不同，选购时该如何取舍？',
    keywords: 'IEPL是什么,IEPL专线,IEPL与IPLC区别,国际以太网专线'
  },
  'adv-11.md': {
    title: 'CN2是什么？CN2 GIA与普通线路的核心区别 - 机场猫',
    description: '解析电信 CN2 网络（AS4809）与普通 163 骨干网（AS4134）的关键区别，以及 CN2 GIA 为何成为高端跨境线路的代名词，选购时该如何辨别。',
    keywords: 'CN2是什么,CN2 GIA,电信CN2,CN2线路'
  },
  'adv-12.md': {
    title: 'CMI中国移动国际网络解析：骨干网与香港节点优势 - 机场猫',
    description: '解析 CMI（中国移动国际网络，AS58453）在香港及亚太地区的布局优势，以及为何"移动走 CMI"成为用户选购节点的重要参考依据。',
    keywords: 'CMI,中国移动国际,CMI骨干网,移动CMI'
  },
  'adv-13.md': {
    title: '延迟/RTT是什么？Ping值背后的网络往返时间 - 机场猫',
    description: '从技术角度解析延迟（Ping/RTT）的真实含义：RTT 是数据包往返时间，而不仅仅是单向传输速度，以及延迟高低对游戏、视频、AI工具的实际影响。',
    keywords: '网络延迟,RTT,Ping值,延迟是什么'
  },
  'adv-14.md': {
    title: '网络抖动是什么？为什么Ping低游戏还会卡 - 机场猫',
    description: '解释网络抖动（Jitter）的原理：即使 Ping 值不高，连续数据包到达时间的不稳定性也会导致游戏瞬移、语音卡顿。如何判断和改善网络抖动？',
    keywords: '网络抖动,Jitter,游戏卡顿,延迟波动'
  },
  'adv-15.md': {
    title: '带宽与吞吐量的区别：为什么千兆宽带却下载很慢 - 机场猫',
    description: '厘清"带宽"与"吞吐量"的本质区别：带宽是理论上限，吞吐量才是实际传输量。解释为何买了千兆宽带，下载海外资源仍然只有几百KB/s的真实原因。',
    keywords: '带宽与吞吐量,带宽是什么,吞吐量,千兆宽带慢'
  },
  'adv-16.md': {
    title: '网络拥塞是什么？为什么晚高峰节点会变慢 - 机场猫',
    description: '用高速公路堵车的比喻解析网络拥塞的原理：数据包超过路由器队列极限后被丢弃，触发 TCP 降速与重传，导致晚高峰节点延迟飙升的底层机制。',
    keywords: '网络拥塞,晚高峰变慢,节点拥塞,网络拥堵原因'
  },
  'adv-17.md': {
    title: '晚高峰网络为什么变慢？PON共享带宽原理解析 - 机场猫',
    description: '解释"白天测速正常，晚上8到11点频繁卡顿"的根本原因：小区最后一公里 PON 树共享带宽架构，以及代理机场晚高峰体验的评价意义。',
    keywords: '晚高峰网络变慢,PON共享带宽,晚高峰卡顿,最后一公里'
  },
  'adv-18.md': {
    title: '为什么电信联通移动代理速度不同？运营商路由差异 - 机场猫',
    description: '解答为何同一海外服务器，北方联通只需50ms，南方移动却要200ms：不同运营商的骨干网出口、IXP互联结算与跨国海底光缆路径决定了代理速度。',
    keywords: '电信联通移动网速,运营商路由,三网差异,代理速度差异'
  },
  'adv-19.md': {
    title: '数据中心IP是什么？为什么机场IP会被平台封锁 - 机场猫',
    description: '解析数据中心 IP（IDC IP）的特征：ASN 明确归属云服务商，流媒体和 AI 平台为何容易识别并封锁这类 IP，以及原生住宅 IP 的价值所在。',
    keywords: '数据中心IP,IDC IP,机场IP被封,ChatGPT封IP'
  },
  'adv-20.md': {
    title: '住宅IP是什么？与机房IP的区别及使用场景 - 机场猫',
    description: '解析住宅 IP（Residential IP）的来源、与数据中心 IP 的核心区别，以及在流媒体解锁、ChatGPT、跨境电商等高风控场景中的使用价值。',
    keywords: '住宅IP,住宅IP是什么,Residential IP,家宽IP'
  },
  'adv-21.md': {
    title: '原生IP是什么？注册地与物理机房一致才算原生 - 机场猫',
    description: '澄清"原生 IP"的严格定义：IP 注册机构、分配运营商与物理机房完全位于同一国家/地区，与通过 BGP 跨区宣告的非原生 IP 的本质区别。',
    keywords: '原生IP,原生IP是什么,Native IP,原生IP解锁'
  },
  'adv-22.md': {
    title: '独享IP与共享IP有什么区别？哪个更适合你 - 机场猫',
    description: '对比独享 IP 和共享 IP 的使用场景：共享 IP 成本低但有"邻居效应"风险，独享 IP 单人专用但价格高。机场节点如何在两者间做合理选择？',
    keywords: '独享IP,共享IP,独享IP和共享IP区别,机场IP类型'
  },
  'adv-23.md': {
    title: 'IP段和CIDR子网是什么？防火墙封锁整段IP的原理 - 机场猫',
    description: '解析 IP 段（CIDR 子网）的划分逻辑，以及为何防火墙/平台会"拉黑整个 IP 段"——C 段被封、整个机房被屏蔽的底层技术原因。',
    keywords: 'IP段,CIDR,子网掩码,IP段被封'
  },
  'adv-24.md': {
    title: 'IPv4和IPv6有什么区别？代理节点如何选择 - 机场猫',
    description: '对比 IPv4 与 IPv6 的地址格式、数量规模与兼容性差异，以及在选择代理节点或 VPS 时，IPv4 与 IPv6 双栈各自的适用场景与注意事项。',
    keywords: 'IPv4和IPv6区别,IPv6是什么,双栈网络,代理IPv6'
  },
  'adv-25.md': {
    title: '如何识别机场营销话术？专线术语防坑指南 - 机场猫',
    description: '帮你看懂机场宣传中"家宽原生IP""IPLC优质专线""三网BGP入口"等术语的真实含义与价值，避免被营销话术误导，理性评估性价比。',
    keywords: '机场营销话术,机场选购防坑,专线术语解析,机场怎么选'
  },
  'adv-26.md': {
    title: '测速跑满千兆但看视频还是卡？多线程与单线程测速的区别 - 机场猫',
    description: '解释为何测速软件跑满但实际体验差：大多数测速工具测试多线程并发，而视频/游戏只用单线程。了解"单线程吞吐量"才能真正判断代理线路质量。',
    keywords: '测速跑满但视频卡,多线程测速,单线程测速,测速软件'
  },
  'adv-27.md': {
    title: '如何判断网络线路稳定性？持续Ping和MTR测试方法 - 机场猫',
    description: '比"峰值带宽"更重要的是长期稳定性。介绍通过持续 Ping 测试、MTR 链路追踪等工具，客观评估一条网络线路在24小时内的真实稳定表现。',
    keywords: '网络稳定性测试,MTR测试,Ping测试,线路稳定性'
  },
  'adv-28.md': {
    title: '代理线路选购指南：CN2/9929/CMIN2/IPLC全面对比 - 机场猫',
    description: '汇总 CN2 GIA、9929、CMIN2、IPLC、IEPL 各类主流代理线路的技术差异与适用场景，帮助你根据需求和预算做出合理的线路选择。',
    keywords: '代理线路对比,CN2 GIA,IPLC IEPL,9929线路选购'
  },

  // ===== guide series =====
  'guide-01.md': {
    title: '机场是什么？代理订阅服务完全新手入门 - 机场猫',
    description: '面向完全新手解释"机场"的真实含义：不是真实机场，而是提供 SS/V2Ray 等代理节点的服务商，以及购买后如何配合客户端使用。',
    keywords: '机场是什么,机场新手入门,代理订阅,科学上网入门'
  },
  'guide-02.md': {
    title: '节点是什么？机场节点与订阅链接的关系 - 机场猫',
    description: '新手必读：节点是代理服务器的实体，订阅链接是管理节点的入口，详解两者关系，以及为什么不能随意分享自己的订阅链接。',
    keywords: '节点是什么,代理节点,机场节点,订阅链接'
  },
  'guide-03.md': {
    title: '订阅链接是什么？如何正确使用和更新节点订阅 - 机场猫',
    description: '详解机场订阅链接的工作方式：从购买机场获得订阅链接，导入客户端，到自动更新节点——面向新手的完整操作流程说明。',
    keywords: '订阅链接是什么,机场订阅,订阅更新,节点订阅'
  },
  'guide-04.md': {
    title: '科学上网客户端怎么选？各平台推荐对比 - 机场猫',
    description: '对比各平台的主流科学上网客户端：Windows 推荐 Clash Verge Rev，macOS 同样适用，iOS 首选 Shadowrocket，Android 推荐 v2rayNG，帮助新手快速定位。',
    keywords: '科学上网客户端,Clash推荐,Shadowrocket,v2rayN推荐'
  },
  'guide-05.md': {
    title: '机场怎么选？2026稳定机场选择与防坑指南 - 机场猫',
    description: '总结选购机场的核心评估维度：线路质量、晚高峰表现、运营历史、价格合理性、是否支持月付试用，以及常见的机场选购陷阱。',
    keywords: '机场怎么选,机场选购指南,机场防坑,2026机场推荐'
  },
  'guide-06.md': {
    title: '代理软件TUN模式是什么？全局流量接管原理 - 机场猫',
    description: '解析代理客户端 TUN（虚拟网卡）模式的工作原理：与系统代理的区别，TUN 如何实现真正的全局流量接管，以及何时需要开启 TUN 模式。',
    keywords: 'TUN模式是什么,虚拟网卡代理,全局代理,TUN模式'
  },
  'guide-07.md': {
    title: '代理模式有哪些？全局/规则/直连模式区别 - 机场猫',
    description: '详细对比代理软件的三种工作模式：全局代理（所有流量走节点）、规则模式（按规则分流）、直连模式，以及各自的适用场景和配置建议。',
    keywords: '代理模式,全局代理,规则代理,分流模式'
  },
  'guide-08.md': {
    title: '什么是分流规则？Clash规则集如何配置 - 机场猫',
    description: '解释 Clash 分流规则的工作逻辑：哪些域名/IP走代理、哪些直连，如何使用现成规则集（Rule Provider），以及自定义分流规则的基本方法。',
    keywords: '分流规则,Clash规则,规则集,分流配置'
  },
  'guide-09.md': {
    title: '代理DNS污染怎么解决？DNS泄漏与防护方法 - 机场猫',
    description: '解析 DNS 污染的成因与危害，以及如何在代理环境下正确设置 DNS（DoH/DoT）防止真实 IP 通过 DNS 泄漏，保障访问安全和隐私。',
    keywords: 'DNS污染,DNS泄漏,DNS防护,代理DNS设置'
  },
  'guide-10.md': {
    title: '节点延迟高怎么办？代理速度慢的排查方法 - 机场猫',
    description: '系统梳理"节点延迟高/速度慢"的常见原因：节点拥塞、线路质量差、本地宽带限制、客户端配置问题，提供逐步排查和改善的实用方法。',
    keywords: '节点延迟高,代理速度慢,节点连接慢,机场速度排查'
  },
  'guide-11.md': {
    title: '代理节点连不上怎么办？网络故障排查指南 - 机场猫',
    description: '面向遭遇节点全部断线、无法连接的用户，梳理排查步骤：确认本地网络→更新订阅→切换节点→检查防火墙→联系客服，帮助快速定位问题所在。',
    keywords: '节点连不上,代理断线,机场连接失败,网络故障排查'
  },
  'guide-12.md': {
    title: '流媒体解锁是什么？Netflix/Disney+原生IP要求 - 机场猫',
    description: '解释流媒体解锁的技术原理：Netflix、Disney+ 等平台通过 IP 归属地判断用户地区，为何需要原生 IP 才能真正解锁内容，以及如何判断节点是否支持解锁。',
    keywords: '流媒体解锁,Netflix解锁,Disney+解锁,原生IP解锁'
  },
  'guide-13.md': {
    title: '订阅转换工具是什么？如何将机场订阅转为Clash格式 - 机场猫',
    description: '解释订阅转换（Subconverter）的作用：将机场提供的 SS/VMess 订阅格式转换为 Clash YAML 格式，并提供使用注意事项与安全建议。',
    keywords: '订阅转换,Subconverter,订阅格式转换,Clash订阅'
  },
  'guide-14.md': {
    title: '如何测试节点速度？代理速度测试完整教程 - 机场猫',
    description: '介绍科学测试代理节点速度的方法：使用测速网站、Speedtest、iperf等工具，如何在代理开启状态下进行有效测速，以及测速结果怎么解读。',
    keywords: '节点测速,代理速度测试,机场测速,Speedtest代理'
  },
  'guide-15.md': {
    title: 'WebRTC泄漏是什么？如何检测和防止IP泄漏 - 机场猫',
    description: '解析 WebRTC 泄漏的机制：浏览器即使在代理环境下，WebRTC 也可能直接暴露本地真实 IP，以及如何通过测试工具检测并修复这一隐私风险。',
    keywords: 'WebRTC泄漏,IP泄漏,WebRTC检测,代理IP泄漏'
  },
  'guide-16.md': {
    title: '为什么别人网络快我却慢？运营商路由与地区差异解析 - 机场猫',
    description: '解析同一服务不同用户速度差异的根本原因：地理距离、运营商骨干网路由、跨网互联、最后一公里质量，帮你理解为什么换个网络环境体验截然不同。',
    keywords: '网络速度差异,运营商差异,为什么网络慢,地区网络差异'
  },
  'guide-17.md': {
    title: '手机代理怎么设置？iOS和Android全平台配置指南 - 机场猫',
    description: '面向手机用户的代理配置完整指南：iOS 使用 Shadowrocket，Android 使用 v2rayNG 或 Clash Meta，从下载安装到导入订阅的全步骤教程。',
    keywords: '手机代理设置,iOS代理配置,Android代理,手机科学上网'
  },
  'guide-18.md': {
    title: '机场跑路怎么防？选机场避免资金损失的技巧 - 机场猫',
    description: '新手防坑指南：如何辨别高跑路风险的机场，建议优先月付而非年付，以及机场跑路后的应对方式，将资金风险降到最低。',
    keywords: '机场跑路,机场跑路防范,机场选购技巧,月付机场'
  },
  'guide-19.md': {
    title: '优惠码和折扣怎么用？机场省钱技巧整理 - 机场猫',
    description: '整理机场优惠码的使用规则，季付年付的折算方式，以及如何通过合理的付费周期在不牺牲安全性的前提下最大化省钱。',
    keywords: '机场优惠码,机场折扣,机场省钱,机场年付季付'
  },
  'guide-20.md': {
    title: '第一次买机场怎么选？完整新手购买流程 - 机场猫',
    description: '面向完全零基础的新手，给出从了解机场→选择客户端→选择合适套餐→月付试用→导入订阅的完整购买与上手流程，避免常见错误。',
    keywords: '第一次买机场,机场新手购买,机场入门,如何购买机场'
  },

  // ===== tools series =====
  'tools-01.md': {
    title: 'IP地址查询工具使用指南：查看当前出口IP - 机场猫',
    description: '介绍如何使用在线 IP 查询工具查看当前代理出口 IP 的归属地、运营商信息，验证节点是否真的在预期国家和地区生效。',
    keywords: 'IP查询工具,查IP地址,出口IP查询,IP归属地'
  },
  'tools-02.md': {
    title: 'DNS泄漏检测工具使用方法：检查代理DNS设置 - 机场猫',
    description: '详细说明如何使用 DNS 泄漏检测工具判断代理是否正确接管 DNS 请求，避免真实 DNS 服务器暴露本地位置，以及发现泄漏后的修复方式。',
    keywords: 'DNS泄漏检测,DNS泄漏工具,DNS检查,代理DNS'
  },
  'tools-03.md': {
    title: 'WebRTC泄漏检测：浏览器IP泄漏检测方法 - 机场猫',
    description: '使用 WebRTC 泄漏检测工具验证浏览器是否通过 WebRTC 协议暴露本地真实 IP，以及如何在不同浏览器中禁用 WebRTC 防止泄漏。',
    keywords: 'WebRTC泄漏检测,浏览器IP泄漏,WebRTC禁用,IP泄漏检测'
  },
  'tools-04.md': {
    title: '节点延迟测试工具：在线Ping测速与连通性检测 - 机场猫',
    description: '介绍在代理环境下测试节点延迟的在线工具和方法：从 Ping 测试到 HTTP 连通性检测，帮助快速判断当前节点的实际响应速度。',
    keywords: '节点延迟测试,Ping测试工具,代理测速,节点连通性'
  },
  'tools-05.md': {
    title: 'Shadowsocks协议测试工具：SS节点连通性验证 - 机场猫',
    description: '针对 Shadowsocks（SS）协议的专项测试方法：如何验证 SS 节点是否正常工作，常见的连接失败原因排查，以及调试工具的使用。',
    keywords: 'SS节点测试,Shadowsocks连通性,SS协议调试,节点测试'
  },
  'tools-12.md': {
    title: 'V2Ray/VMess协议节点测试与连通性验证方法 - 机场猫',
    description: '针对 VMess/VLESS 等 V2Ray 系协议的连通性测试方法，帮助验证 V2Ray 节点是否正常工作，常见错误的排查思路。',
    keywords: 'V2Ray节点测试,VMess连通性,V2Ray调试,VLESS测试'
  },
  'tools-20.md': {
    title: 'MTR路由追踪工具使用指南：诊断网络路径问题 - 机场猫',
    description: '介绍 MTR（My Traceroute）工具的使用方法：结合 traceroute 和 ping，逐跳追踪网络路径，找到延迟飙升或丢包集中在哪一个网络节点。',
    keywords: 'MTR工具,路由追踪,traceroute,网络路径诊断'
  },
  'tools-21.md': {
    title: 'TCP/UDP协议在代理中的差异与选择建议 - 机场猫',
    description: '对比 TCP 与 UDP 协议在代理场景中的优劣：TCP 稳定但延迟较高，UDP 快速但可能被 QoS 限速，以及 Hysteria2/QUIC 等 UDP 代理协议的使用场景。',
    keywords: 'TCP UDP代理,Hysteria2,UDP代理,代理协议选择'
  },
  'tools-22.md': {
    title: 'IP纯净度检测工具：判断节点IP是否被风控标记 - 机场猫',
    description: '使用 IPPure、IPCheck 等工具检测代理节点 IP 的"纯净度"：评估 IP 是否被列为高风险代理 IP，ChatGPT/Netflix 是否可能识别并封锁该 IP。',
    keywords: 'IP纯净度检测,IPPure,IPCheck,ChatGPT IP检测'
  },
  'tools-23.md': {
    title: 'Trojan协议节点测试：连通性与协议兼容性验证 - 机场猫',
    description: '针对 Trojan 协议节点的测试与验证方法：Trojan 如何伪装成 HTTPS 流量，如何验证节点正常工作，以及常见配置错误的排查步骤。',
    keywords: 'Trojan节点测试,Trojan协议,Trojan连通性,HTTPS伪装'
  },
  'tools-32.md': {
    title: 'Hysteria2协议测试：UDP加速节点性能验证 - 机场猫',
    description: '专门针对 Hysteria2 协议节点的性能测试方法：UDP 加速机制如何工作，如何验证 Hysteria2 节点的连通性，以及与 TCP 协议的实测速度对比。',
    keywords: 'Hysteria2测试,Hysteria2协议,UDP加速,Hysteria2节点'
  },

  // ===== duplicate content groups =====
  'shadowrocket-guide.md': {
    title: 'Shadowrocket（小火箭）配置教程：iOS代理完整使用指南 - 机场猫',
    description: 'iOS 用户的 Shadowrocket 完整配置指南：如何获取非大陆 Apple ID、下载安装 Shadowrocket、导入机场订阅链接，以及日常使用中的常见问题解决。',
    keywords: 'Shadowrocket教程,小火箭使用教程,iOS代理配置,Shadowrocket配置'
  },
  'v2rayng-guide.md': {
    title: 'v2rayNG使用教程：Android安卓代理完整配置指南 - 机场猫',
    description: 'Android 用户的 v2rayNG 完整配置指南：如何下载安装 v2rayNG、导入机场订阅链接、设置规则分流，以及常见连接问题的排查方法。',
    keywords: 'v2rayNG教程,v2rayNG使用,安卓代理配置,v2rayNG配置'
  },
  'ai-tools-01-chatgpt.md': {
    title: 'ChatGPT入门教程：第一次使用ChatGPT怎么开始 - 机场猫',
    description: '面向完全新手的 ChatGPT 入门指南：注册账号、首次对话、免费与付费功能区别，以及如何使用代理访问 ChatGPT 的基础说明。',
    keywords: 'ChatGPT入门,ChatGPT使用教程,ChatGPT新手,ChatGPT怎么用'
  },
  'ai-tools-04-chatgpt-what-is-it.md': {
    title: 'ChatGPT是什么？零基础理解AI对话工具 - 机场猫',
    description: '用最通俗的语言解释 ChatGPT 是什么：阅读了海量文章的虚拟助手，可以回答问题、写作、编程，以及与普通搜索引擎的本质区别。',
    keywords: 'ChatGPT是什么,ChatGPT介绍,AI对话助手,ChatGPT功能'
  },
  'ai-tools-02-claude.md': {
    title: 'Claude AI是什么？Anthropic Claude功能与使用入门 - 机场猫',
    description: '介绍 Anthropic 开发的 Claude AI 助手：功能特点、与 ChatGPT 的对比、如何访问 Claude，以及 Claude 对代理 IP 质量的特殊要求。',
    keywords: 'Claude AI是什么,Claude AI使用,Anthropic Claude,Claude入门'
  },
  'ai-tools-08-claude-what-is-it.md': {
    title: 'Claude AI vs ChatGPT：两者有什么不同 - 机场猫',
    description: '对比 Claude AI 与 ChatGPT 的核心差异：回答风格、内容限制、IP 访问要求、长文处理能力，帮助用户选择更适合自己工作场景的 AI 工具。',
    keywords: 'Claude vs ChatGPT,Claude AI对比,Claude ChatGPT区别,AI工具对比'
  },
  'ai-network-08-routing-issue.md': {
    title: '什么是网络丢包？丢包对代理和游戏的实际影响 - 机场猫',
    description: '用信件投递的比喻解释网络丢包的原理：数据包在传输中丢失如何影响视频播放、游戏延迟和 AI 工具使用，以及如何判断是否存在丢包问题。',
    keywords: '网络丢包,丢包是什么,Packet Loss,丢包影响'
  },
  'ai-network-22-packet-loss.md': {
    title: '代理丢包导致ChatGPT中断？AI工具网络丢包排查 - 机场猫',
    description: '针对 ChatGPT 等海外 AI 工具使用中出现"Network Error"中断的场景，解析网络丢包（Packet Loss）的成因，提供代理环境下的丢包排查与改善方法。',
    keywords: 'ChatGPT丢包,AI工具网络错误,代理丢包,网络丢包排查'
  },
  'ai-drama-02-workflow.md': {
    title: 'AI短剧制作完整流程：从剧本到成片的工作流 - 机场猫',
    description: '系统介绍使用 AI 工具制作短剧的完整工作流程：剧本生成、分镜设计、AI 绘图、视频合成，帮助创作者从零建立高效的 AI 短剧制作管线。',
    keywords: 'AI短剧制作,AI短剧流程,AI视频制作,AI内容创作'
  },
  'ai-drama-03-script.md': {
    title: 'AI辅助短剧剧本创作：用ChatGPT生成剧本的方法 - 机场猫',
    description: '介绍如何用 ChatGPT 等大语言模型辅助创作短剧剧本：从核心故事种子出发，通过 AI 扩写成完整剧本的实用步骤与 Prompt 技巧。',
    keywords: 'AI短剧剧本,ChatGPT写剧本,AI创作剧本,短剧剧本生成'
  },
  'copilot-agents.md': {
    title: 'Microsoft Copilot Agents是什么？智能体配置入门 - 机场猫',
    description: '解释 Microsoft Copilot Agents（智能体）的功能：可定制化的 AI 助手，可赋予特定知识库和工作流程，实现特定领域的自动化任务执行。',
    keywords: 'Copilot Agents,Microsoft Copilot智能体,Copilot自动化,AI智能体'
  },
  'copilot-how-to-use.md': {
    title: 'Microsoft Copilot使用教程：功能介绍与新手入门 - 机场猫',
    description: 'Microsoft Copilot 完整入门指南：从什么是 Copilot 到如何在 Windows、Edge、Microsoft 365 中使用，涵盖对话、写作、图片生成等核心功能。',
    keywords: 'Microsoft Copilot使用教程,Copilot入门,Copilot功能,Copilot怎么用'
  },
  'copilot-deep-research.md': {
    title: 'Copilot Deep Research怎么用？深度研究功能指南 - 机场猫',
    description: '详解 Microsoft Copilot Deep Research 深度研究功能的使用方法：如何发起研究任务、解读结果、引用来源，以及与普通问答功能的区别。',
    keywords: 'Copilot Deep Research,Copilot深度研究,Copilot研究功能,AI深度研究'
  },
  'ai-tools-55-chatgpt-explain.md': {
    title: '用ChatGPT解释复杂概念：费曼技巧与AI学习法 - 机场猫',
    description: '结合费曼技巧（用简单语言解释复杂事物）介绍如何用 ChatGPT 学习和理解难懂概念，包括引导 AI 用比喻、案例逐步解释的 Prompt 技巧。',
    keywords: '费曼技巧ChatGPT,ChatGPT学习方法,ChatGPT解释概念,AI学习技巧'
  },
  'ai-study-04-complex-concept.md': {
    title: 'AI辅助学习复杂概念：用比喻和案例理解难点 - 机场猫',
    description: '介绍如何借助 ChatGPT、Claude 等 AI 工具攻克学习难点：通过要求 AI 提供比喻、类比、反例的 Prompt 策略，将抽象概念转化为易懂内容。',
    keywords: 'AI学习复杂概念,ChatGPT学习,AI学习方法,AI辅助学习'
  },
  'ai-tools-64-claude-new-chat.md': {
    title: 'Claude新对话最佳实践：如何开启高质量对话 - 机场猫',
    description: '分享在 Claude 中开启新对话时的最佳实践：提供足够背景信息、设置角色、分段输入长文，让 Claude 从第一条回复就达到最高质量。',
    keywords: 'Claude对话技巧,Claude Prompt,Claude使用技巧,Claude新对话'
  },
  'ai-network-58-differentiate-issues.md': {
    title: '如何区分网络问题还是平台问题？代理故障诊断思路 - 机场猫',
    description: '梳理代理使用中常见的两类故障来源：本地网络或节点问题 vs AI/流媒体平台自身故障，帮助快速判断问题出在哪里，避免无效排查。',
    keywords: '代理故障诊断,网络问题排查,平台故障区分,代理连接问题'
  },
  'ai-video-13.md': {
    title: 'AI视频生成工具对比：Runway/Sora/Kling哪个好 - 机场猫',
    description: '对比主流 AI 视频生成工具（Runway、Sora、Kling 等）的功能特点、生成质量、价格与使用门槛，帮助创作者选择最适合自己需求的平台。',
    keywords: 'AI视频生成工具,Runway AI,Sora,Kling AI视频'
  },
  'ai-video-17.md': {
    title: 'AI视频制作提示词（Prompt）写法：精准描述生成效果 - 机场猫',
    description: '专门讲解 AI 视频生成 Prompt 的写作技巧：如何描述场景、镜头运动、光线氛围和人物动作，让视频生成结果更接近预期。',
    keywords: 'AI视频Prompt,视频生成提示词,Runway Prompt,AI视频描述词'
  },
};

const dir = 'src/content/blog';
let fixed = 0;
let skipped = 0;

Object.entries(FIXES).forEach(([filename, meta]) => {
  const fp = path.join(dir, filename);
  if (!fs.existsSync(fp)) {
    console.log('[SKIP - NOT FOUND] ' + filename);
    skipped++;
    return;
  }
  let content = fs.readFileSync(fp, 'utf8');
  const orig = content;
  
  content = content.replace(/title:\s*["'][^"']*["']/, 'title: "' + meta.title + '"');
  content = content.replace(/description:\s*["'][^"']*["']/, 'description: "' + meta.description + '"');
  content = content.replace(/keywords:\s*["'][^"']*["']/, 'keywords: "' + meta.keywords + '"');
  
  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log('[FIXED] ' + filename + '\n  -> ' + meta.title);
    fixed++;
  } else {
    console.log('[UNCHANGED] ' + filename);
    skipped++;
  }
});

console.log('\n=== DONE ===');
console.log('Fixed: ' + fixed);
console.log('Skipped/not found: ' + skipped);
