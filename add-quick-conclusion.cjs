const fs = require('fs');
let indexContent = fs.readFileSync('src/pages/index.astro', 'utf8');

const quickConclusionHTML = `
    <!-- Quick Conclusion Section -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-4 relative z-10">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="text-primary-500">⚡</span> 2026 机场推荐快速结论
        </h2>
        <p class="text-slate-600 dark:text-slate-400 mb-6 text-sm md:text-base">无需阅读复杂教程，如果您正在寻找 2026 年高性价比且靠谱的机场，可直接参考以下概览。</p>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead class="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 uppercase">
              <tr>
                <th class="px-4 py-3 rounded-tl-lg whitespace-nowrap">品牌</th>
                <th class="px-4 py-3 whitespace-nowrap">最低月付</th>
                <th class="px-4 py-3 whitespace-nowrap">线路类型</th>
                <th class="px-4 py-3 whitespace-nowrap">协议</th>
                <th class="px-4 py-3 whitespace-nowrap">信息来源</th>
                <th class="px-4 py-3 rounded-tr-lg whitespace-nowrap">前往官网</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">闪跃 FlashLeap</td>
                <td class="px-4 py-3 whitespace-nowrap">¥24.00</td>
                <td class="px-4 py-3 whitespace-nowrap">全IPLC专线</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">本站测试</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://vip02.flashleapaff.com/#/?code=hCwClNUi" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">暮光网络</td>
                <td class="px-4 py-3 whitespace-nowrap">¥20.00</td>
                <td class="px-4 py-3 whitespace-nowrap">BGP智能调度</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">本站测试</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://varnexa.twilightaff.com/#/?code=1eGqV85O" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">边缘节点</td>
                <td class="px-4 py-3 whitespace-nowrap">¥15.00</td>
                <td class="px-4 py-3 whitespace-nowrap">IPLC专线</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">官方资料</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://work.edgenovaaff.cc/#/?code=etUBOp4S" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">飞V</td>
                <td class="px-4 py-3 whitespace-nowrap">¥25.00</td>
                <td class="px-4 py-3 whitespace-nowrap">全链路专线</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">官方资料</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://varnexa.flyvaff.com/#/?code=6ae5FH9i" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-6 text-center">
          <a href="/reviews/" class="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">查看完整机场排行榜 &rarr;</a>
        </div>
      </div>
    </section>
`;

if (!indexContent.includes('2026 机场推荐快速结论')) {
  // Insert right after the hero section
  const heroEnd = '</section>';
  const heroEndIndex = indexContent.indexOf(heroEnd);
  if (heroEndIndex !== -1) {
    indexContent = indexContent.slice(0, heroEndIndex + heroEnd.length) + '\n' + quickConclusionHTML + indexContent.slice(heroEndIndex + heroEnd.length);
    fs.writeFileSync('src/pages/index.astro', indexContent, 'utf8');
    console.log('Successfully inserted quick conclusion block into index.astro');
  } else {
    console.log('Could not find hero section end tag.');
  }
} else {
  console.log('Quick conclusion block already exists.');
}
