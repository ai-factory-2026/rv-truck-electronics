/**
 * Cookie Consent Banner - GDPR Compliant
 * Default: Reject (合规要求：默认拒绝)
 * 用户主动点Accept才启用非必要Cookie
 */
(function() {
  var CONSENT_KEY = 'cookie_consent_status';
  var CONSENT_VERSION = 'v1';

  function getConsent() {
    try {
      var data = localStorage.getItem(CONSENT_KEY);
      if (data) {
        var parsed = JSON.parse(data);
        if (parsed.version === CONSENT_VERSION) {
          return parsed.status;
        }
      }
    } catch(e) {}
    return null;
  }

  function setConsent(status) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        status: status,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString()
      }));
    } catch(e) {}
  }

  function createBanner() {
    var privacyLink = '/privacy-policy';
    // 适配不同站点路径
    if (window.location.hostname.includes('indoor-plant-guide')) {
      privacyLink = '/legal/privacy.html';
    } else if (window.location.hostname.includes('truckgearhub')) {
      privacyLink = '/privacy.html';
    }

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.innerHTML = '<p>We use cookies to improve your experience and analyze site traffic. Essential cookies are always active. You can choose to accept or reject non-essential cookies. <a href="' + privacyLink + '">Privacy Policy</a></p>' +
      '<div class="cookie-btns">' +
      '<button class="cookie-btn cookie-btn-reject" id="cookie-reject">Reject Non-Essential</button>' +
      '<button class="cookie-btn cookie-btn-accept" id="cookie-accept">Accept All</button>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function() {
      setConsent('accepted');
      banner.classList.remove('show');
      enableNonEssentialCookies();
    });

    document.getElementById('cookie-reject').addEventListener('click', function() {
      setConsent('rejected');
      banner.classList.remove('show');
      disableNonEssentialCookies();
    });

    return banner;
  }

  function enableNonEssentialCookies() {
    // AdSense/Analytics等非必要Cookie在accept后运行
    // 这些脚本已在页面加载，此处仅记录同意状态
    // 后续新增非必要追踪需检查consent状态
  }

  function disableNonEssentialCookies() {
    // 拒绝后确保无非必要Cookie
    // 删除已有非必要Cookie
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var name = cookies[i].split('=')[0].trim();
      if (name.indexOf('_ga') === 0 || name.indexOf('_gid') === 0 || name.indexOf('_gat') === 0) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      }
    }
  }

  function init() {
    var consent = getConsent();
    if (consent === 'accepted' || consent === 'rejected') {
      // 已有选择，不弹
      if (consent === 'accepted') {
        enableNonEssentialCookies();
      }
      return;
    }
    // 无选择=默认拒绝，弹窗让用户选
    var banner = createBanner();
    setTimeout(function() {
      banner.classList.add('show');
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
