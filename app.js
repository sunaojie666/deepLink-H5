(function () {
  "use strict";

  var APP_KEY = "uimft3";
  var OPENINSTALL_SCRIPT_URL = "https://res.opoinstalljs.com/opo-uimft3.js";
  var READY_TIMEOUT_MS = 10000;
  var params = new URLSearchParams(window.location.search);
  var ua = navigator.userAgent || "";

  var TRANSLATIONS = {
    en: {
      title: "VicastCam",
      guideTitle: "Open this link in your browser",
      inviteBrand: "VicastCam",
      inviteKicker: "Friend invitation",
      inviteTitle: "Live Ecosystem",
      inviteDescription: "Mobile + desktop, one suite for full-scene live streaming",
      featureMobileLive: "Mobile virtual live streaming",
      featureDesktopCamera: "Desktop virtual camera",
      featureCastControl: "Screen casting and remote control",
      featureLiveCoverage: "Full-scene live coverage",
      inviteCode: "Invite code",
      preparing: "Preparing...",
      openApp: "Use now",
      opening: "Opening...",
      unavailable: "Unable to open",
      loadFailed: "The service failed to load. Refresh the page and try again.",
      timedOut: "Setup timed out. Check your connection and try again."
    },
    "zh-CN": {
      title: "VicastCam",
      guideTitle: "请在浏览器中打开此链接",
      inviteBrand: "VicastCam",
      inviteKicker: "好友邀请",
      inviteTitle: "直播生态",
      inviteDescription: "手机 + 电脑，一套搞定全场景直播",
      featureMobileLive: "移动端虚拟直播",
      featureDesktopCamera: "桌面端虚拟相机",
      featureCastControl: "投屏灵活联动",
      featureLiveCoverage: "全场景直播覆盖",
      inviteCode: "邀请码",
      preparing: "准备中...",
      openApp: "立即使用",
      opening: "正在打开...",
      unavailable: "无法打开",
      loadFailed: "服务加载失败，请刷新页面后重试。",
      timedOut: "初始化超时，请检查网络后重试。"
    }
  };

  function normalizeLanguage(language) {
    var value = String(language || "").toLowerCase().replace(/_/g, "-");
    if (!value) return "";
    if (value.indexOf("zh") === 0) return "zh-CN";
    if (value.indexOf("en") === 0) return "en";
    return "";
  }

  function getUserAgentLanguage() {
    var matchedLanguage = ua.match(/(?:Language|lang|locale)[/=]([a-z]{2}(?:[_-][a-z]{2,4})?)/i);
    if (matchedLanguage && matchedLanguage[1]) return matchedLanguage[1];

    matchedLanguage = ua.match(/\b(zh[-_]?(?:cn|hans|hant|tw|hk)?|en[-_]?[a-z]{2})\b/i);
    if (matchedLanguage && matchedLanguage[1]) return matchedLanguage[1];

    return "";
  }

  function getIntlLanguage() {
    if (!window.Intl || !Intl.DateTimeFormat) return "";

    try {
      return Intl.DateTimeFormat().resolvedOptions().locale || "";
    } catch (error) {
      return "";
    }
  }

  function getPreferredLanguage() {
    var previewLanguage = params.get("lang");
    var languageCandidates = [previewLanguage]
      .concat([getUserAgentLanguage()])
      .concat(navigator.languages || [])
      .concat([
        navigator.language,
        navigator.userLanguage,
        navigator.browserLanguage,
        navigator.systemLanguage,
        getIntlLanguage()
      ]);

    for (var i = 0; i < languageCandidates.length; i += 1) {
      var matchedLanguage = normalizeLanguage(languageCandidates[i]);
      if (matchedLanguage && TRANSLATIONS[matchedLanguage]) return matchedLanguage;
    }

    return "en";
  }

  var currentLanguage = getPreferredLanguage();
  var copy = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  var GUIDE_IMAGES = {
    en: "./assets/open-browser-guide-en.png",
    "zh-CN": "./assets/open-browser-guide-zh.jpg"
  };

  document.documentElement.lang = currentLanguage;
  document.title = copy.title;
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    element.textContent = copy[element.getAttribute("data-i18n")] || "";
  });

  function isEmbeddedBrowser() {
    if (params.get("embedded") === "1" || params.get("wechat") === "1") return true;
    if (params.get("browser") === "1") return false;

    var blockedApps = [
      /MicroMessenger/i,
      /\bQQ\/[\d.]+/i,
      /\bQzone\//i,
      /Weibo/i,
      /AlipayClient/i,
      /DingTalk/i,
      /Lark|Feishu/i,
      /BytedanceWebview|NewsArticle|Aweme|TikTok|musical_ly/i,
      /FBAN|FBAV|Instagram/i,
      /\bLine\/[\d.]+/i,
      /Twitter|Snapchat|LinkedInApp|Pinterest|GSA\//i
    ];

    return blockedApps.some(function (pattern) {
      return pattern.test(ua);
    });
  }

  var embeddedBrowserGuide = document.getElementById("embeddedBrowserGuide");
  var browserGuideImage = document.getElementById("browserGuideImage");
  var invitePage = document.getElementById("invitePage");

  if (isEmbeddedBrowser()) {
    browserGuideImage.src = GUIDE_IMAGES[currentLanguage] || GUIDE_IMAGES.en;
    browserGuideImage.alt = copy.guideTitle;
    embeddedBrowserGuide.hidden = false;
    return;
  }

  invitePage.hidden = false;

  var button = document.getElementById("downloadButton");
  var buttonLabel = document.getElementById("buttonLabel");
  var statusMessage = document.getElementById("statusMessage");
  var inviteCodeRow = document.getElementById("inviteCodeRow");
  var inviteCodeValue = document.getElementById("inviteCodeValue");
  var installInstance = null;
  var sdkReady = false;
  var isLaunching = false;

  buttonLabel.textContent = copy.openApp;

  function getUrlData() {
    var data = {};
    if (window.OpoInstall && typeof window.OpoInstall.parseUrlParams === "function") {
      data = window.OpoInstall.parseUrlParams() || {};
    } else {
      params.forEach(function (value, key) { data[key] = value; });
    }
    data.inviteCode = data.inviteCode || data.invite_code || data.code;
    return data;
  }

  var inviteData = getUrlData();
  if (inviteData.inviteCode) {
    inviteCodeValue.textContent = inviteData.inviteCode;
    inviteCodeRow.hidden = false;
  }

  function setReady() {
    sdkReady = true;
    button.disabled = false;
    buttonLabel.textContent = copy.openApp;
    statusMessage.textContent = "";
  }

  function setUnavailable(message) {
    button.disabled = true;
    buttonLabel.textContent = copy.unavailable;
    statusMessage.textContent = message;
  }

  function loadOpenInstallScript(onLoad) {
    if (typeof window.OpoInstall === "function") {
      onLoad();
      return;
    }

    var script = document.createElement("script");
    script.src = OPENINSTALL_SCRIPT_URL;
    script.async = true;
    script.onload = onLoad;
    script.onerror = function () {
      setUnavailable(copy.loadFailed);
    };
    document.head.appendChild(script);
  }

  function initializeOpenInstall() {
    if (typeof window.OpoInstall !== "function") {
      setUnavailable(copy.loadFailed);
      return;
    }

    installInstance = new window.OpoInstall(
      {
        appKey: APP_KEY,
        onready: function () {
          installInstance = this;
          setReady();
          this.schemeWakeup();
        }
      },
      inviteData
    );
  }

  button.addEventListener("click", function () {
    if (!installInstance || isLaunching) return;
    isLaunching = true;
    button.disabled = true;
    buttonLabel.textContent = copy.opening;
    installInstance.wakeupOrInstall();
    window.setTimeout(function () {
      isLaunching = false;
      setReady();
    }, 2200);
  });

  window.addEventListener("pageshow", function () {
    if (installInstance) {
      isLaunching = false;
      setReady();
    }
  });

  loadOpenInstallScript(initializeOpenInstall);
  window.setTimeout(function () {
    if (!sdkReady) setUnavailable(copy.timedOut);
  }, READY_TIMEOUT_MS);
})();
