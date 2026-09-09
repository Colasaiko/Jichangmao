const fs = require('fs');
const descs = {
  'windows-general.mdx': '本指南为您详细介绍如何在 Windows 系统中下载、安装并配置主流代理客户端。涵盖从订阅链接获取、节点导入到日常使用模式切换的完整流程，帮助您快速连通网络。',
  'macos-general.mdx': '专门针对 macOS 用户的全方位客户端使用教程。无论您使用哪款代理工具，本文都将引导您完成下载安装、订阅配置与高级网络设置，轻松实现流畅的访问体验。',
  'android-general.mdx': 'Android 安卓平台代理客户端配置实战教程。我们将从零开始讲解如何获取工具包、导入您的机场订阅，并针对常见的网络断联与更新问题提供排障指引。',
  'ios-nextin.mdx': 'iOS 设备由于系统限制，配置代理常需特定客户端与外区账号。本文详细拆解苹果手机上的代理导入步骤，包含节点选择与分流规则配置，助您快速稳定连接。'
};
for (const [file, desc] of Object.entries(descs)) {
  const p = 'src/content/clients/' + file;
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('description:')) {
    c = c.replace(/---/, '---\ndescription: "' + desc + '"');
    fs.writeFileSync(p, c, 'utf8');
  }
}
