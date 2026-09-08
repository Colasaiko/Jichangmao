# SEO 关键词地图 (seo-keyword-map.md)
> 本文件用于规划全站关键词归属，避免同一关键词被多个页面竞争（关键词内耗）。
> 新增文章前请先对照本表，确认该关键词已有归属页面，或在对应页面强化，而非新建重复页面。

---

## 核心页面

| URL | Primary Keyword | Secondary Keywords | Search Intent |
|---|---|---|---|
| `/` | 机场推荐 | 2026机场推荐, 稳定机场推荐, 便宜机场推荐, 专线机场推荐, 靠谱机场推荐, 机场排行榜 | 寻找全面、靠谱的机场推荐首页 |
| `/reviews/` | 2026机场推荐排行榜 | 机场推荐排行榜, 稳定机场推荐, 高性价比机场推荐, 专线机场推荐, 老牌机场推荐, 高速机场推荐 | 寻找高价值、详细的机场测评和天梯排行榜 |

---

## 商业型关键词集群（Topic Cluster A: 价格/使用场景）

| URL | Primary Keyword | Secondary Keywords | Search Intent |
|---|---|---|---|
| `/blog/cheap-airport-recommendations/` | 便宜机场推荐 | 低价机场推荐, 高性价比机场推荐, 便宜稳定机场, 学生党机场推荐, 月付机场推荐, 小流量机场 | 寻找低价格、高性价比或支持月付的小流量/学生机场 |
| `/blog/pay-as-you-go-airport/` | 按量计费机场 | 不限时机场推荐, 流量包机场推荐, 小流量机场推荐, 按量机场推荐 | 寻找不过期、按流量计费的备用机场 |
| `/blog/dedicated-line-airport-recommendations/` | 专线机场推荐 | IPLC机场推荐, IEPL机场推荐, 中转机场推荐, 低延迟机场推荐, 晚高峰稳定机场 | 追求晚高峰稳定、极低延迟的高端用户 |

---

## 客户端型关键词集群（Topic Cluster B: 客户端 × 机场）

| URL | Primary Keyword | Secondary Keywords | Search Intent |
|---|---|---|---|
| `/blog/clash-airport-recommendations/` | Clash机场推荐 | Clash订阅机场推荐, Clash节点推荐, Clash Verge推荐 | 专门为使用Clash系列客户端的用户推荐兼容性好的机场 |
| `/blog/shadowrocket-airport-recommendations/` | Shadowrocket机场推荐 | 小火箭机场推荐, 小火箭订阅推荐, iOS机场推荐 | 为iOS平台Shadowrocket用户推荐适配机场 |
| `/blog/v2rayn-airport-recommendations/` | v2rayN机场推荐 | v2rayNG机场推荐, v2ray节点推荐, Windows机场推荐, Android机场推荐 | 为Windows/Android v2ray用户推荐支持良好的机场 |

---

## 场景型关键词集群（Topic Cluster C: 使用场景）

| URL | Primary Keyword | Secondary Keywords | Search Intent |
|---|---|---|---|
| `/blog/chatgpt-airport-recommendations/` | ChatGPT机场推荐 | Claude机场推荐, AI服务机场推荐, 流媒体解锁机场推荐, ChatGPT节点推荐 | 为需要访问ChatGPT/Claude等AI服务的用户推荐高IP质量机场 |
| `/blog/ladder-recommendations/` | 梯子推荐 | 2026梯子推荐, 稳定梯子推荐, 好用的梯子推荐, 手机梯子推荐, 电脑梯子推荐, 梯子软件推荐 | 面向泛用户搜索"梯子"这一宽泛词，提供科普及引导至机场的入口 |

---

## 关键词归属规则（防止内耗）

### 绝对归属原则
- **"机场推荐"**：仅由首页 `/` 主打，`/reviews/` 作为次要承接
- **"机场推荐排行榜"**：仅由 `/reviews/` 主打，首页勿重复主攻
- **"便宜机场"**：仅由 `/blog/cheap-airport-recommendations/` 主打
- **"Clash机场"**：仅由 `/blog/clash-airport-recommendations/` 主打
- **"梯子推荐"**：仅由 `/blog/ladder-recommendations/` 主打，其他页面不堆砌

### 禁止的竞争关系
- `/reviews/` 和 `/` 不要同时出现完全相同的 H1 和 Title
- `/blog/clash-airport-recommendations/` 和 `/blog/shadowrocket-airport-recommendations/` 不要互相复制内容
- 品牌测评页（`/blog/review-*`）不主打通用机场推荐词，主打该品牌名

---

## 现有博客文章 SEO 修复记录（第十阶段）

### 已修复的 Title 模板问题
- 原模板 `"深入解析基本概念原理 | Clash节点 - 机场猫"` → 改为文章实际内容对应的标题
- 原模板 `"2026最新网络专线进阶教程 | AI效率神器 - 机场猫"` → 改为文章实际主题的标题
- 原模板 Description `"经常遇到网络连通问题？..."` → 每篇独立描述
- 共修复 **412** 篇博客文章的 Title 和 Description

### 修复原则
1. Title 必须真实描述正文
2. Description 根据文章真实内容独立编写
3. 同一 Category 内的文章 Title 不使用相同模板

---

## 内部链接架构图

```
首页 /
├── /reviews/（机场推荐排行榜）
│   ├── /blog/review-weifeng/（微风网络测评）
│   ├── /blog/review-chengfeng/（乘风网络测评）
│   └── ... （其他品牌测评）
│
├── /blog/cheap-airport-recommendations/（便宜机场推荐）
│   ├── → /reviews/
│   └── → /blog/pay-as-you-go-airport/
│
├── /blog/dedicated-line-airport-recommendations/（专线机场推荐）
│   ├── → /reviews/
│   └── → /blog/chatgpt-airport-recommendations/
│
├── /blog/clash-airport-recommendations/（Clash机场推荐）
│   ├── → /blog/shadowrocket-airport-recommendations/
│   └── → /blog/v2rayn-airport-recommendations/
│
├── /blog/chatgpt-airport-recommendations/（ChatGPT机场推荐）
│   ├── → /reviews/
│   └── → /blog/dedicated-line-airport-recommendations/
│
└── /blog/ladder-recommendations/（梯子推荐）
    ├── → /reviews/
    ├── → /blog/clash-airport-recommendations/
    └── → /blog/cheap-airport-recommendations/
```
