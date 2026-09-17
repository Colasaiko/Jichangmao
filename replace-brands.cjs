const fs = require('fs');

let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// Replace 闪跃 FlashLeap row
const shanyueRow = /<tr class="hover:bg-slate-50 dark:hover:bg-slate-800\/20 transition-colors">[\s\S]*?闪跃 FlashLeap[\s\S]*?<\/tr>/;
const weifengRow = `<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">微风网络</td>
                <td class="px-4 py-3 whitespace-nowrap">¥11.00</td>
                <td class="px-4 py-3 whitespace-nowrap">全IPLC专线</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">本站测试</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://edp01.breezenetaff.com/#/?code=bSnymFll" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>`;
content = content.replace(shanyueRow, weifengRow);

// Replace 暮光网络 row
const muguangRow = /<tr class="hover:bg-slate-50 dark:hover:bg-slate-800\/20 transition-colors">[\s\S]*?暮光网络[\s\S]*?<\/tr>/;
const feimaoRow = `<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">飞猫云</td>
                <td class="px-4 py-3 whitespace-nowrap">¥25.00</td>
                <td class="px-4 py-3 whitespace-nowrap">全IPLC专线</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">本站测试</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://flycat1.flycatvipaff.cc/#/?code=UUcH5yh9" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>`;
content = content.replace(muguangRow, feimaoRow);

fs.writeFileSync('src/pages/index.astro', content, 'utf8');
console.log('index.astro updated');
