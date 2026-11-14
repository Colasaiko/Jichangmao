import https from 'node:https';

const INDEXNOW_KEY = 'e45b10d738f641efb70f08e5c8e29a43';
const HOST = 'jichangmao.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const updatedUrls = [
  `https://${HOST}/`,
  `https://${HOST}/reviews/`,
  `https://${HOST}/evaluations/review-flyv/`,
  `https://${HOST}/evaluations/review-lingmao/`,
  `https://${HOST}/blog/surge-airport-recommendations/`,
  `https://${HOST}/blog/clash-airport-recommendations/`,
  `https://${HOST}/blog/dedicated-line-airport-recommendations/`,
  `https://${HOST}/blog/shadowrocket-airport-recommendations/`,
  `https://${HOST}/blog/chatgpt-airport-recommendations/`,
  `https://${HOST}/blog/netflix-airport-recommendations/`,
  `https://${HOST}/blog/native-ip-airport-recommendations/`,
  `https://${HOST}/blog/sing-box-airport-recommendations/`,
  `https://${HOST}/blog/quantumult-x-airport-recommendations/`,
  `https://${HOST}/blog/cheap-airport-recommendations/`,
  `https://${HOST}/blog/pay-as-you-go-airport/`,
  `https://${HOST}/blog/ladder-recommendations/`,
  `https://${HOST}/blog/v2rayn-airport-recommendations/`,
  `https://${HOST}/blog/top-4-recommended-airports/`
];

const payload = JSON.stringify({
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: updatedUrls
});

function postIndexNow(endpointHost, endpointPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: endpointHost,
      port: 443,
      path: endpointPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'Jichangmao-IndexNow-Bot/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          body: data
        });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`[IndexNow] 准备向 Bing 提交 ${updatedUrls.length} 个最新更新的网址...`);
  console.log(`[IndexNow] 主机: ${HOST}`);
  console.log(`[IndexNow] Key 验证文件: ${KEY_LOCATION}`);

  const endpoints = [
    { name: 'Bing IndexNow Endpoint', host: 'www.bing.com', path: '/indexnow' },
    { name: 'Global IndexNow API', host: 'api.indexnow.org', path: '/indexnow' }
  ];

  for (const ep of endpoints) {
    try {
      console.log(`\n正在向 ${ep.name} (${ep.host}${ep.path}) 发送通知...`);
      const res = await postIndexNow(ep.host, ep.path);
      console.log(`=> 响应状态码: ${res.statusCode} ${res.statusMessage}`);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✅ 成功向 ${ep.name} 报告更新！Bing 已接收该批次链接。`);
      } else {
        console.log(`ℹ️ 响应信息: ${res.body || '(空响应体)'}`);
      }
    } catch (err) {
      console.error(`❌ 连接 ${ep.host} 失败:`, err.message);
    }
  }

  console.log('\n[IndexNow] 全部通知流程完成。');
}

main();
