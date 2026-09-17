const fs = require('fs');
let content = fs.readFileSync('src/pages/index.astro', 'utf8');

const newTbody = `<tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">微风网络</td>
                <td class="px-4 py-3 whitespace-nowrap">¥11.00</td>
                <td class="px-4 py-3 whitespace-nowrap">全IPLC专线</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">本站测试</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://edp01.breezenetaff.com/#/?code=bSnymFll" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">飞猫云</td>
                <td class="px-4 py-3 whitespace-nowrap">¥25.00</td>
                <td class="px-4 py-3 whitespace-nowrap">全IPLC专线</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">本站测试</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://flycat1.flycatvipaff.cc/#/?code=UUcH5yh9" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">firefly</td>
                <td class="px-4 py-3 whitespace-nowrap">¥25.00</td>
                <td class="px-4 py-3 whitespace-nowrap">IPLC专线</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">官方资料</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://vip02.fireflyaff.com/#/?code=mcYQUZxG" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">跨界云</td>
                <td class="px-4 py-3 whitespace-nowrap">¥20.00</td>
                <td class="px-4 py-3 whitespace-nowrap">IPLC专线</td>
                <td class="px-4 py-3 whitespace-nowrap">SS</td>
                <td class="px-4 py-3 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">官方资料</span></td>
                <td class="px-4 py-3 whitespace-nowrap"><a href="https://vip02.kuajieaff.com/#/?code=HRzqSLrR" target="_blank" rel="nofollow noopener" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">查看详情</a></td>
              </tr>
            </tbody>`;

content = content.replace(/<tbody class="divide-y divide-slate-100 dark:divide-slate-800">[\s\S]*?<\/tbody>/, newTbody);
fs.writeFileSync('src/pages/index.astro', content, 'utf8');
