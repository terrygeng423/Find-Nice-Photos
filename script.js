
const PEXELS_KEY = '1Dwa7HNy1bnKDrdZJwsK2dZu0fRos0xDJ6Wd9Dta4P1paFiAPpgKhMI9';

const searchBtn = document.getElementById('searchBtn');
const searchTermInput = document.getElementById('searchTerm');
const resultDiv = document.getElementById('result');

// 向 Pexels 发送搜索请求，并随机选一张
async function fetchRandomFromPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`;
  const response = await fetch(url, {
    headers: { Authorization: PEXELS_KEY }
  });
  if (!response.ok) {
    throw new Error(`HTTP 错误：${response.status}`);
  }
  const data = await response.json();
  if (!data.photos || data.photos.length === 0) {
    throw new Error('未找到相关图片');
  }
  const randIndex = Math.floor(Math.random() * data.photos.length);
  return data.photos[randIndex].src.medium;
}

// 绑定按钮点击事件
searchBtn.addEventListener('click', async () => {
  const term = searchTermInput.value.trim();
  if (!term) return;                    // 防止空输入
  searchBtn.disabled = true;             // 禁用按钮，防止多次点击
  resultDiv.innerHTML = '<p>加载中...</p>';

  try {
    const imageUrl = await fetchRandomFromPexels(term);
    resultDiv.innerHTML = `<img src="${imageUrl}" alt="${term}" />`;
  } catch (err) {
    resultDiv.innerHTML = `<p class="error">错误：${err.message}</p>`;
  } finally {
    searchBtn.disabled = false;
  }
});






