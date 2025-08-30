// Auto-detect API_BASE with safe fallbacks (override by setting window.APP_CONFIG.API_BASE before this runs)
(function(){
  var meta = document.querySelector('meta[name="api-base"]');
  var fromMeta = meta && meta.content;
  var loc = window.location;
  var guess = '';

  if (fromMeta && fromMeta.trim()) {
    guess = fromMeta.trim();
  } else if (loc.protocol === 'file:') {
    // فتح مباشر للملف من الجهاز
    guess = 'https://mareekh.onrender.com';
  } else if (loc.port && loc.port !== '80' && loc.port !== '443') {
    // بيئة تطوير (مثلاً http://localhost:5500) → نفترض الباك إند على 8000
    guess = loc.protocol + '//' + loc.hostname + ':8000/api';
  } else {
    // إنتاج/نشر: اجعل الـ API على نفس الدومين
    guess = loc.protocol + '//' + loc.host + '/api';
  }

  // السماح بالـ override إن كان محدد سابقًا
  window.APP_CONFIG = window.APP_CONFIG || {};
  if (!window.APP_CONFIG.API_BASE) {
    window.APP_CONFIG.API_BASE = guess;
  }
  // للتشخيص
  console.log('[APP_CONFIG] API_BASE =', window.APP_CONFIG.API_BASE);
})();
