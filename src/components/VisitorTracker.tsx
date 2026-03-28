'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      // Tránh lưu lặp lại khi khách F5 trang trong cùng 1 session
      if (sessionStorage.getItem('cm_visited')) return;

      const visitorData = {
        screen: `${window.screen.width}x${window.screen.height}`,
        ram: (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 'N/A',
        referrer: document.referrer || 'Direct',
        url: window.location.href,
        utm: Object.fromEntries(new URLSearchParams(window.location.search)),
      };

      // Chờ browser rảnh mới gửi (cực kỳ tối ưu cho LCP / CLS)
      const send = () => {
        fetch('/api/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visitorData),
        }).catch(() => {
          // Silent fail – không làm crash UI
        });
        sessionStorage.setItem('cm_visited', 'true');
      };

      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(send, { timeout: 3000 });
      } else {
        // Fallback cho Safari
        setTimeout(send, 300);
      }
    };

    trackVisit();
  }, []);

  return null;
}
