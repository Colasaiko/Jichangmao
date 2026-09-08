# SEO 关键词地图 v2 (seo-keyword-map.md)
> 本文件规定全站每个关键词的归属页面，防止多个页面竞争同一词（关键词内耗）。
> 更新时间：2026-09-08
> 新增文章或修改 SEO 前，必须先对照本表确认关键词归属。

---

## 核心商业页面

| URL | Primary Keyword | Secondary Keywords | Search Intent |
|---|---|---|---|
| `/` | **机场推荐** | 2026机场推荐、机场推荐2026、稳定机场推荐、靠谱机场推荐、好用机场推荐 | 寻找全站机场推荐入口，信息意图+商业意图混合 |
| `/reviews/` | **机场推荐排行榜** | 2026机场排行榜、2026机场推荐排行榜、机场排行榜、机场天梯榜、2026机场天梯榜 | 寻找高可信度的机场对比评测排行 |

> ⚠️ 首页与 /reviews/ 禁止使用完全相同的 H1 和 Title。首页定位"入口与品牌门户"，/reviews/ 定位"详细排行与对比"。

---

## Topic Cluster A：价格与使用场景

| URL | Primary Keyword | Secondary Keywords | 禁止内耗 |
|---|---|---|---|
| `/blog/cheap-airport-recommendations/` | **便宜机场推荐** | 低价机场推荐、高性价比机场推荐、学生党机场推荐、小流量机场推荐、便宜稳定机场 | 首页和 /reviews/ 不主打此词 |
| `/blog/pay-as-you-go-airport/` | **按量计费机场** | 不限时机场推荐、流量包机场推荐、小流量机场推荐、按量机场推荐、买断流量机场 | 与"便宜机场"区分：按量=不过期买断，便宜=低月付 |
| `/blog/dedicated-line-airport-recommendations/` | **专线机场推荐** | IPLC机场推荐、IEPL机场推荐、低延迟机场推荐、晚高峰稳定机场、全专线机场推荐 | 与"机场推荐"区分：专线=特指物理专线，非泛推荐 |

---

## Topic Cluster B：客户端 × 机场

| URL | Primary Keyword | Secondary Keywords | Search Intent |
|---|---|---|---|
| `/blog/clash-airport-recommendations/` | **Clash机场推荐** | Clash订阅机场推荐、Clash节点推荐、Clash Verge推荐、Clash机场2026 | 为 Clash 用户推荐兼容性好的订阅机场 |
| `/blog/shadowrocket-airport-recommendations/` | **Shadowrocket机场推荐** | 小火箭机场推荐、小火箭订阅推荐、iOS机场推荐、iPhone机场推荐 | 为 iOS Shadowrocket 用户推荐适配机场 |
| `/blog/v2rayn-airport-recommendations/` | **v2rayN机场推荐** | v2rayNG机场推荐、v2ray节点推荐、Windows机场推荐、Android机场推荐 | 为 v2rayN/v2rayNG 用户推荐协议兼容机场 |

> ⚠️ 三个页面各自主打一个客户端词，不互相抢词。内容要解释"该客户端×该机场"的具体兼容性，不要仅列品牌名。

---

## Topic Cluster C：使用场景

| URL | Primary Keyword | Secondary Keywords | Search Intent |
|---|---|---|---|
| `/blog/chatgpt-airport-recommendations/` | **ChatGPT机场推荐** | Claude机场推荐、AI服务机场推荐、ChatGPT节点推荐、解锁ChatGPT机场 | 为需要高IP质量访问 AI 服务的用户推荐机场 |
| `/blog/ladder-recommendations/` | **梯子推荐** | 2026梯子推荐、稳定梯子推荐、好用的梯子推荐、手机梯子推荐、电脑梯子推荐、梯子软件推荐 | 泛用户搜索"梯子"宽泛词的入口，科普+引导 |

---

## 关键词归属约定（防止内耗）

### ✅ 独占归属原则

| 关键词 | 唯一归属页面 |
|---|---|
| 机场推荐 | 首页 `/` |
| 机场推荐排行榜 | `/reviews/` |
| 便宜机场推荐 | `/blog/cheap-airport-recommendations/` |
| 按量计费机场 | `/blog/pay-as-you-go-airport/` |
| 专线机场推荐 | `/blog/dedicated-line-airport-recommendations/` |
| Clash机场推荐 | `/blog/clash-airport-recommendations/` |
| Shadowrocket机场推荐 | `/blog/shadowrocket-airport-recommendations/` |
| v2rayN机场推荐 | `/blog/v2rayn-airport-recommendations/` |
| ChatGPT机场推荐 | `/blog/chatgpt-airport-recommendations/` |
| 梯子推荐 | `/blog/ladder-recommendations/` |

### ❌ 禁止的竞争关系
- 首页的 keywords 字段禁止主打"Clash机场推荐"或"便宜机场推荐"——首页只链接过去，不参与这些词的直接竞争
- /reviews/ 禁止主打"便宜机场"或"ChatGPT机场"——/reviews/ 定位是全量综合排行榜
- 品牌测评页（/evaluations/review-*）主打品牌名+测评，不主打通用机场推荐词

---

## 博客文章 SEO 规范

### 严禁出现的 Title 模板
- `"基本概念：2026最新教程与指南 - 机场猫"` ← 已全部修复
- `"网络专线：2026最新教程与指南 - 机场猫"` ← 已全部修复
- `"一、这个功能：2026最新教程与指南 - 机场猫"` ← 已全部修复
- `"tools X：2026最新教程与指南 - 机场猫"` ← 已全部修复
- `"adv X：2026最新教程与指南 - 机场猫"` ← 已全部修复

### Title 生成原则
1. 基于正文开头 300~500 字的**真实语义**
2. 反映文章**真正回答的问题**，而非目录标题
3. 包含用户自然搜索时会用的词语
4. 结尾统一加 `- 机场猫`

### Description 生成原则
1. 每篇独立撰写，不使用统一模板
2. 直接说明：这篇文章解决什么问题、包含什么内容
3. 不使用"全面介绍XXX核心概念"/"机场猫为您提供详细图文指南"等通用话术

---

## 内部链接架构

```
首页 /
├── /reviews/（综合机场推荐排行榜）
│   └── /evaluations/review-*/（各品牌详细测评）
│
├── /blog/cheap-airport-recommendations/ → /reviews/ → /blog/pay-as-you-go-airport/
├── /blog/dedicated-line-airport-recommendations/ → /reviews/ → /blog/chatgpt-airport-recommendations/
│
├── /blog/clash-airport-recommendations/ ↔ /blog/shadowrocket-airport-recommendations/ ↔ /blog/v2rayn-airport-recommendations/
│
├── /blog/chatgpt-airport-recommendations/ → /reviews/ → /blog/dedicated-line-airport-recommendations/
│
└── /blog/ladder-recommendations/ → /reviews/ → /blog/cheap-airport-recommendations/ → /blog/clash-airport-recommendations/
```

---

## 修复历史

### 2026-09-08 SEO重构 Round 2
- **P0修复**：用语义分析方法重新处理 94 篇文章 Title/Description（adv-01~28、guide-01~20、tools-01/02/03/04/05/12/13~19/20/21/22/23/32、ai系列多篇）
- **消除重复 Title 组**：
  - "基本概念：2026最新教程与指南"（43篇）→ 全部修复为独立标题
  - "网络专线：2026最新教程与指南"（92篇）→ 修复其中已确认内容的文章
  - "一、这个功能：2026最新教程与指南"（35篇）→ 修复 copilot/grok 系列
  - 其余小型重复组 全部修复
- **P1修复**：8 个推荐专题文章全部添加 3~6 个真实品牌推荐，每个品牌注明线路类型、月付价格、协议支持、适合原因，以及官网链接（含AFF）
- **P2更新**：seo-keyword-map.md 重新划分关键词归属，明确首页 vs /reviews/ vs 专题文章的独占词

## Topic Cluster D: 更多客户端 × 场景

### /blog/sing-box-airport-recommendations/
**Primary Keyword**: sing-box机场推荐
**Secondary Keywords**: singbox机场推荐, sing-box订阅机场, sing-box节点推荐, sing-box机场, sing-box订阅推荐

### /blog/quantumult-x-airport-recommendations/
**Primary Keyword**: Quantumult X机场推荐
**Secondary Keywords**: 圈X机场推荐, Quantumult X订阅推荐, 圈X订阅推荐, Quantumult X节点推荐, iOS机场推荐

### /blog/netflix-airport-recommendations/
**Primary Keyword**: Netflix机场推荐
**Secondary Keywords**: 流媒体解锁机场推荐, Netflix节点推荐, Disney+机场推荐, 流媒体机场推荐, Netflix机场

### /blog/native-ip-airport-recommendations/
**Primary Keyword**: 原生IP机场推荐
**Secondary Keywords**: 原生IP机场, 原生IP节点推荐, 高质量IP机场, 原生IP节点, 住宅IP机场

### /blog/hiddify-airport-recommendations/
**Primary Keyword**: Hiddify机场推荐
**Secondary Keywords**: Hiddify Next机场, Hiddify订阅, Hiddify节点推荐, Hiddify机场, Hiddify Next订阅
