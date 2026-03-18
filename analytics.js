// OG TECH リンクページ — クリック計測（簡易版）
// 将来的にはSupabaseやGoogle Analyticsに差し替え可能

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('[data-track]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const trackId = link.dataset.track;
      const timestamp = new Date().toISOString();

      // コンソールにログ（開発用）
      console.log(`[OG TECH] Link clicked: ${trackId} at ${timestamp}`);

      // localStorageに簡易記録
      const logs = JSON.parse(localStorage.getItem('ogtech_clicks') || '[]');
      logs.push({ id: trackId, time: timestamp });
      localStorage.setItem('ogtech_clicks', JSON.stringify(logs));
    });
  });
});

// 計測データを確認するユーティリティ
// ブラウザのコンソールで ogtech.showStats() と打てば確認可能
window.ogtech = {
  showStats() {
    const logs = JSON.parse(localStorage.getItem('ogtech_clicks') || '[]');
    const counts = {};
    logs.forEach(log => {
      counts[log.id] = (counts[log.id] || 0) + 1;
    });
    console.table(counts);
    console.log(`Total clicks: ${logs.length}`);
    return counts;
  },
  clearStats() {
    localStorage.removeItem('ogtech_clicks');
    console.log('[OG TECH] Stats cleared.');
  }
};
