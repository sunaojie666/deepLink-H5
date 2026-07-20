(function () {
  "use strict";

  var APP_KEY = "uimft3";
  var OPENINSTALL_SCRIPT_URL = "https://res.opoinstalljs.com/opo-uimft3.js";
  var DESKTOP_DOWNLOAD_URL = "https://vicastcam.com/download";
  var READY_TIMEOUT_MS = 10000;
  var params = new URLSearchParams(window.location.search);
  var ua = navigator.userAgent || "";
  var DEFAULT_LANGUAGE = "en";

  function preventDefaultIfCancelable(event) {
    if (event.cancelable) event.preventDefault();
  }

  function lockPageZoom() {
    var lastTouchEndAt = 0;
    var nonPassiveOptions = { passive: false };

    document.addEventListener("gesturestart", preventDefaultIfCancelable, nonPassiveOptions);
    document.addEventListener("gesturechange", preventDefaultIfCancelable, nonPassiveOptions);
    document.addEventListener("gestureend", preventDefaultIfCancelable, nonPassiveOptions);
    document.addEventListener("touchmove", function (event) {
      if (event.touches && event.touches.length > 1) preventDefaultIfCancelable(event);
    }, nonPassiveOptions);
    document.addEventListener("touchend", function (event) {
      var now = Date.now();
      if (now - lastTouchEndAt <= 350) preventDefaultIfCancelable(event);
      lastTouchEndAt = now;
    }, nonPassiveOptions);
    document.addEventListener("dblclick", preventDefaultIfCancelable, nonPassiveOptions);
  }

  lockPageZoom();

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
      featureLiveCoverage: "Video teaching and meetings",
      inviteJoinSuffix: " invites you to join VicastCam",
      inviteCodePrefix: "Invite code: ",
      preparing: "Preparing...",
      openApp: "Use now",
      opening: "Opening...",
      downloadApp: "Download app",
      installHint: "If the app did not open, download and install VicastCam.",
      unavailable: "Unable to open",
      loadFailed: "The service failed to load. Refresh the page and try again.",
      timedOut: "Setup timed out. Check your connection and try again."
    },
    id: {
      title: "VicastCam",
      guideTitle: "Buka tautan ini di browser",
      inviteBrand: "VicastCam",
      inviteKicker: "Undangan teman",
      inviteTitle: "Ekosistem Live",
      inviteDescription: "Mobile + desktop, satu suite untuk live streaming di berbagai skenario",
      featureMobileLive: "Live virtual di mobile",
      featureDesktopCamera: "Kamera virtual desktop",
      featureCastControl: "Casting layar dan kontrol jarak jauh",
      featureLiveCoverage: "Pengajaran video dan rapat",
      inviteJoinSuffix: " mengundang Anda bergabung dengan VicastCam",
      inviteCodePrefix: "Kode undangan: ",
      preparing: "Menyiapkan...",
      openApp: "Gunakan sekarang",
      opening: "Membuka...",
      unavailable: "Tidak dapat membuka",
      loadFailed: "Layanan gagal dimuat. Segarkan halaman dan coba lagi.",
      timedOut: "Pengaturan habis waktu. Periksa jaringan Anda dan coba lagi."
    },
    ms: {
      title: "VicastCam",
      guideTitle: "Buka pautan ini dalam pelayar",
      inviteBrand: "VicastCam",
      inviteKicker: "Jemputan rakan",
      inviteTitle: "Ekosistem Langsung",
      inviteDescription: "Mudah alih + desktop, satu suite untuk semua senario penstriman langsung",
      featureMobileLive: "Penstriman langsung maya mudah alih",
      featureDesktopCamera: "Kamera maya desktop",
      featureCastControl: "Pencerminan skrin dan kawalan jauh",
      featureLiveCoverage: "Pembelajaran video dan mesyuarat",
      inviteJoinSuffix: " menjemput anda menyertai VicastCam",
      inviteCodePrefix: "Kod jemputan: ",
      preparing: "Bersedia...",
      openApp: "Guna sekarang",
      opening: "Sedang membuka...",
      unavailable: "Tidak dapat dibuka",
      loadFailed: "Perkhidmatan gagal dimuatkan. Muat semula halaman dan cuba lagi.",
      timedOut: "Persediaan tamat masa. Semak rangkaian anda dan cuba lagi."
    },
    th: {
      title: "VicastCam",
      guideTitle: "เปิดลิงก์นี้ในเบราว์เซอร์",
      inviteBrand: "VicastCam",
      inviteKicker: "คำเชิญจากเพื่อน",
      inviteTitle: "ระบบนิเวศไลฟ์",
      inviteDescription: "มือถือ + เดสก์ท็อป ชุดเดียวสำหรับไลฟ์ทุกสถานการณ์",
      featureMobileLive: "ไลฟ์เสมือนบนมือถือ",
      featureDesktopCamera: "กล้องเสมือนบนเดสก์ท็อป",
      featureCastControl: "แคสต์หน้าจอและควบคุมระยะไกล",
      featureLiveCoverage: "สอนผ่านวิดีโอและประชุม",
      inviteJoinSuffix: " เชิญคุณเข้าร่วม VicastCam",
      inviteCodePrefix: "รหัสเชิญ: ",
      preparing: "กำลังเตรียม...",
      openApp: "ใช้ตอนนี้",
      opening: "กำลังเปิด...",
      unavailable: "ไม่สามารถเปิดได้",
      loadFailed: "โหลดบริการไม่สำเร็จ โปรดรีเฟรชหน้าแล้วลองอีกครั้ง",
      timedOut: "การตั้งค่าหมดเวลา โปรดตรวจสอบเครือข่ายแล้วลองอีกครั้ง"
    },
    vi: {
      title: "VicastCam",
      guideTitle: "Mở liên kết này trong trình duyệt",
      inviteBrand: "VicastCam",
      inviteKicker: "Lời mời từ bạn bè",
      inviteTitle: "Hệ sinh thái livestream",
      inviteDescription: "Di động + máy tính, một bộ cho livestream mọi tình huống",
      featureMobileLive: "Livestream ảo trên di động",
      featureDesktopCamera: "Camera ảo trên máy tính",
      featureCastControl: "Truyền màn hình và điều khiển từ xa",
      featureLiveCoverage: "Dạy học video và họp",
      inviteJoinSuffix: " mời bạn tham gia VicastCam",
      inviteCodePrefix: "Mã mời: ",
      preparing: "Đang chuẩn bị...",
      openApp: "Dùng ngay",
      opening: "Đang mở...",
      unavailable: "Không thể mở",
      loadFailed: "Dịch vụ tải thất bại. Làm mới trang và thử lại.",
      timedOut: "Thiết lập quá thời gian. Kiểm tra mạng và thử lại."
    },
    fil: {
      title: "VicastCam",
      guideTitle: "Buksan ang link na ito sa browser",
      inviteBrand: "VicastCam",
      inviteKicker: "Imbitasyon ng kaibigan",
      inviteTitle: "Live Ecosystem",
      inviteDescription: "Mobile + desktop, isang suite para sa live streaming sa lahat ng sitwasyon",
      featureMobileLive: "Virtual live streaming sa mobile",
      featureDesktopCamera: "Virtual camera sa desktop",
      featureCastControl: "Screen casting at remote control",
      featureLiveCoverage: "Video teaching at meetings",
      inviteJoinSuffix: " nag-iimbita sa iyo na sumali sa VicastCam",
      inviteCodePrefix: "Invite code: ",
      preparing: "Naghahanda...",
      openApp: "Gamitin ngayon",
      opening: "Binubuksan...",
      unavailable: "Hindi mabuksan",
      loadFailed: "Nabigong mag-load ang serbisyo. I-refresh ang page at subukang muli.",
      timedOut: "Nag-time out ang setup. Suriin ang iyong koneksyon at subukang muli."
    },
    es: {
      title: "VicastCam",
      guideTitle: "Abre este enlace en el navegador",
      inviteBrand: "VicastCam",
      inviteKicker: "Invitación de un amigo",
      inviteTitle: "Ecosistema en directo",
      inviteDescription: "Móvil + escritorio, una suite para streaming en directo en cualquier escenario",
      featureMobileLive: "Streaming virtual móvil",
      featureDesktopCamera: "Cámara virtual de escritorio",
      featureCastControl: "Duplicación de pantalla y control remoto",
      featureLiveCoverage: "Clases por video y reuniones",
      inviteJoinSuffix: " te invita a unirte a VicastCam",
      inviteCodePrefix: "Código de invitación: ",
      preparing: "Preparando...",
      openApp: "Usar ahora",
      opening: "Abriendo...",
      unavailable: "No se puede abrir",
      loadFailed: "No se pudo cargar el servicio. Actualiza la página e inténtalo de nuevo.",
      timedOut: "La configuración agotó el tiempo. Revisa tu conexión e inténtalo de nuevo."
    },
    pt: {
      title: "VicastCam",
      guideTitle: "Abra este link no navegador",
      inviteBrand: "VicastCam",
      inviteKicker: "Convite de amigo",
      inviteTitle: "Ecossistema ao vivo",
      inviteDescription: "Celular + desktop, uma suite para transmissões ao vivo em todos os cenários",
      featureMobileLive: "Transmissão virtual pelo celular",
      featureDesktopCamera: "Câmera virtual no desktop",
      featureCastControl: "Espelhamento de tela e controle remoto",
      featureLiveCoverage: "Aulas em vídeo e reuniões",
      inviteJoinSuffix: " convida você para entrar no VicastCam",
      inviteCodePrefix: "Código do convite: ",
      preparing: "Preparando...",
      openApp: "Usar agora",
      opening: "Abrindo...",
      unavailable: "Não foi possível abrir",
      loadFailed: "Falha ao carregar o serviço. Atualize a página e tente novamente.",
      timedOut: "A configuração expirou. Verifique sua conexão e tente novamente."
    },
    ar: {
      direction: "rtl",
      title: "VicastCam",
      guideTitle: "افتح هذا الرابط في المتصفح",
      inviteBrand: "VicastCam",
      inviteKicker: "دعوة من صديق",
      inviteTitle: "منظومة البث المباشر",
      inviteDescription: "الهاتف + سطح المكتب، حزمة واحدة للبث المباشر في كل السيناريوهات",
      featureMobileLive: "بث افتراضي عبر الهاتف",
      featureDesktopCamera: "كاميرا افتراضية لسطح المكتب",
      featureCastControl: "عرض الشاشة والتحكم عن بعد",
      featureLiveCoverage: "تعليم بالفيديو واجتماعات",
      inviteJoinSuffix: " يدعوك للانضمام إلى VicastCam",
      inviteCodePrefix: "رمز الدعوة: ",
      preparing: "جارٍ التحضير...",
      openApp: "استخدم الآن",
      opening: "جارٍ الفتح...",
      unavailable: "تعذر الفتح",
      loadFailed: "فشل تحميل الخدمة. حدّث الصفحة وحاول مرة أخرى.",
      timedOut: "انتهت مهلة الإعداد. تحقق من الشبكة وحاول مرة أخرى."
    },
    ja: {
      title: "VicastCam",
      guideTitle: "このリンクをブラウザで開いてください",
      inviteBrand: "VicastCam",
      inviteKicker: "友達からの招待",
      inviteTitle: "ライブ配信エコシステム",
      inviteDescription: "モバイル + デスクトップ、あらゆる配信シーンを1つのスイートで",
      featureMobileLive: "モバイル仮想ライブ配信",
      featureDesktopCamera: "デスクトップ仮想カメラ",
      featureCastControl: "画面キャストとリモート操作",
      featureLiveCoverage: "ビデオ授業と会議",
      inviteJoinSuffix: "さんがVicastCamに招待しています",
      inviteCodePrefix: "招待コード：",
      preparing: "準備中...",
      openApp: "今すぐ使う",
      opening: "起動中...",
      unavailable: "開けません",
      loadFailed: "サービスの読み込みに失敗しました。ページを更新してもう一度お試しください。",
      timedOut: "設定がタイムアウトしました。ネットワークを確認してもう一度お試しください。"
    },
    tr: {
      title: "VicastCam",
      guideTitle: "Bu bağlantıyı tarayıcıda açın",
      inviteBrand: "VicastCam",
      inviteKicker: "Arkadaş daveti",
      inviteTitle: "Canlı Yayın Ekosistemi",
      inviteDescription: "Mobil + masaüstü, tüm canlı yayın senaryoları için tek paket",
      featureMobileLive: "Mobil sanal canlı yayın",
      featureDesktopCamera: "Masaüstü sanal kamera",
      featureCastControl: "Ekran yansıtma ve uzaktan kontrol",
      featureLiveCoverage: "Video eğitimleri ve toplantılar",
      inviteJoinSuffix: " sizi VicastCam'e katılmaya davet ediyor",
      inviteCodePrefix: "Davet kodu: ",
      preparing: "Hazırlanıyor...",
      openApp: "Şimdi kullan",
      opening: "Açılıyor...",
      unavailable: "Açılamıyor",
      loadFailed: "Hizmet yüklenemedi. Sayfayı yenileyip tekrar deneyin.",
      timedOut: "Kurulum zaman aşımına uğradı. Ağınızı kontrol edip tekrar deneyin."
    },
    it: {
      title: "VicastCam",
      guideTitle: "Apri questo link nel browser",
      inviteBrand: "VicastCam",
      inviteKicker: "Invito da un amico",
      inviteTitle: "Ecosistema live",
      inviteDescription: "Mobile + desktop, una suite per streaming live in ogni scenario",
      featureMobileLive: "Live streaming virtuale da mobile",
      featureDesktopCamera: "Fotocamera virtuale desktop",
      featureCastControl: "Trasmissione schermo e controllo remoto",
      featureLiveCoverage: "Lezioni video e riunioni",
      inviteJoinSuffix: " ti invita a unirti a VicastCam",
      inviteCodePrefix: "Codice invito: ",
      preparing: "Preparazione...",
      openApp: "Usa ora",
      opening: "Apertura...",
      unavailable: "Impossibile aprire",
      loadFailed: "Impossibile caricare il servizio. Aggiorna la pagina e riprova.",
      timedOut: "Configurazione scaduta. Controlla la connessione e riprova."
    },
    de: {
      title: "VicastCam",
      guideTitle: "Diesen Link im Browser öffnen",
      inviteBrand: "VicastCam",
      inviteKicker: "Freundeseinladung",
      inviteTitle: "Live-Ökosystem",
      inviteDescription: "Mobil + Desktop, eine Suite für Live-Streaming in jeder Situation",
      featureMobileLive: "Virtuelles Live-Streaming mobil",
      featureDesktopCamera: "Virtuelle Desktop-Kamera",
      featureCastControl: "Bildschirmübertragung und Fernsteuerung",
      featureLiveCoverage: "Videounterricht und Meetings",
      inviteJoinSuffix: " lädt dich zu VicastCam ein",
      inviteCodePrefix: "Einladungscode: ",
      preparing: "Wird vorbereitet...",
      openApp: "Jetzt nutzen",
      opening: "Wird geöffnet...",
      unavailable: "Kann nicht geöffnet werden",
      loadFailed: "Der Dienst konnte nicht geladen werden. Aktualisiere die Seite und versuche es erneut.",
      timedOut: "Die Einrichtung ist abgelaufen. Prüfe deine Verbindung und versuche es erneut."
    },
    fr: {
      title: "VicastCam",
      guideTitle: "Ouvrez ce lien dans le navigateur",
      inviteBrand: "VicastCam",
      inviteKicker: "Invitation d'un ami",
      inviteTitle: "Écosystème live",
      inviteDescription: "Mobile + ordinateur, une suite pour le streaming live dans tous les scénarios",
      featureMobileLive: "Live virtuel sur mobile",
      featureDesktopCamera: "Caméra virtuelle de bureau",
      featureCastControl: "Diffusion d'écran et contrôle à distance",
      featureLiveCoverage: "Cours vidéo et réunions",
      inviteJoinSuffix: " vous invite à rejoindre VicastCam",
      inviteCodePrefix: "Code d'invitation : ",
      preparing: "Préparation...",
      openApp: "Utiliser maintenant",
      opening: "Ouverture...",
      unavailable: "Impossible d'ouvrir",
      loadFailed: "Le service n'a pas pu se charger. Actualisez la page et réessayez.",
      timedOut: "La configuration a expiré. Vérifiez votre connexion et réessayez."
    },
    ko: {
      title: "VicastCam",
      guideTitle: "이 링크를 브라우저에서 여세요",
      inviteBrand: "VicastCam",
      inviteKicker: "친구 초대",
      inviteTitle: "라이브 생태계",
      inviteDescription: "모바일 + 데스크톱, 모든 라이브 방송을 위한 하나의 제품군",
      featureMobileLive: "모바일 가상 라이브 방송",
      featureDesktopCamera: "데스크톱 가상 카메라",
      featureCastControl: "화면 전송 및 원격 제어",
      featureLiveCoverage: "영상 강의와 회의",
      inviteJoinSuffix: "님이 VicastCam에 초대했습니다",
      inviteCodePrefix: "초대 코드: ",
      preparing: "준비 중...",
      openApp: "지금 사용",
      opening: "여는 중...",
      unavailable: "열 수 없음",
      loadFailed: "서비스를 불러오지 못했습니다. 페이지를 새로고침한 후 다시 시도하세요.",
      timedOut: "설정 시간이 초과되었습니다. 네트워크를 확인하고 다시 시도하세요."
    },
    ru: {
      title: "VicastCam",
      guideTitle: "Откройте эту ссылку в браузере",
      inviteBrand: "VicastCam",
      inviteKicker: "Приглашение от друга",
      inviteTitle: "Экосистема прямых эфиров",
      inviteDescription: "Мобильное + настольное приложение для любых прямых эфиров",
      featureMobileLive: "Виртуальные прямые эфиры с телефона",
      featureDesktopCamera: "Виртуальная камера для ПК",
      featureCastControl: "Трансляция экрана и удаленное управление",
      featureLiveCoverage: "Видеообучение и встречи",
      inviteJoinSuffix: " приглашает вас в VicastCam",
      inviteCodePrefix: "Код приглашения: ",
      preparing: "Подготовка...",
      openApp: "Использовать сейчас",
      opening: "Открываем...",
      unavailable: "Не удалось открыть",
      loadFailed: "Не удалось загрузить сервис. Обновите страницу и попробуйте снова.",
      timedOut: "Время настройки истекло. Проверьте сеть и попробуйте снова."
    },
    pl: {
      title: "VicastCam",
      guideTitle: "Otwórz ten link w przeglądarce",
      inviteBrand: "VicastCam",
      inviteKicker: "Zaproszenie od znajomego",
      inviteTitle: "Ekosystem live",
      inviteDescription: "Telefon + komputer, jeden pakiet do transmisji live w każdej sytuacji",
      featureMobileLive: "Mobilne transmisje wirtualne",
      featureDesktopCamera: "Wirtualna kamera na komputer",
      featureCastControl: "Przesyłanie ekranu i zdalne sterowanie",
      featureLiveCoverage: "Lekcje wideo i spotkania",
      inviteJoinSuffix: " zaprasza Cię do VicastCam",
      inviteCodePrefix: "Kod zaproszenia: ",
      preparing: "Przygotowywanie...",
      openApp: "Użyj teraz",
      opening: "Otwieranie...",
      unavailable: "Nie można otworzyć",
      loadFailed: "Nie udało się załadować usługi. Odśwież stronę i spróbuj ponownie.",
      timedOut: "Konfiguracja przekroczyła limit czasu. Sprawdź sieć i spróbuj ponownie."
    },
    nl: {
      title: "VicastCam",
      guideTitle: "Open deze link in je browser",
      inviteBrand: "VicastCam",
      inviteKicker: "Uitnodiging van een vriend",
      inviteTitle: "Live-ecosysteem",
      inviteDescription: "Mobiel + desktop, één suite voor live streaming in elke situatie",
      featureMobileLive: "Virtuele livestreaming op mobiel",
      featureDesktopCamera: "Virtuele desktopcamera",
      featureCastControl: "Scherm casten en afstandsbediening",
      featureLiveCoverage: "Videolessen en vergaderingen",
      inviteJoinSuffix: " nodigt je uit voor VicastCam",
      inviteCodePrefix: "Uitnodigingscode: ",
      preparing: "Voorbereiden...",
      openApp: "Nu gebruiken",
      opening: "Openen...",
      unavailable: "Kan niet openen",
      loadFailed: "De service kon niet worden geladen. Vernieuw de pagina en probeer het opnieuw.",
      timedOut: "Installatie is verlopen. Controleer je netwerk en probeer het opnieuw."
    },
    hi: {
      title: "VicastCam",
      guideTitle: "इस लिंक को ब्राउज़र में खोलें",
      inviteBrand: "VicastCam",
      inviteKicker: "दोस्त का निमंत्रण",
      inviteTitle: "लाइव इकोसिस्टम",
      inviteDescription: "मोबाइल + डेस्कटॉप, हर लाइव स्ट्रीमिंग परिदृश्य के लिए एक ही सूट",
      featureMobileLive: "मोबाइल वर्चुअल लाइव स्ट्रीमिंग",
      featureDesktopCamera: "डेस्कटॉप वर्चुअल कैमरा",
      featureCastControl: "स्क्रीन कास्टिंग और रिमोट कंट्रोल",
      featureLiveCoverage: "वीडियो शिक्षण और मीटिंग",
      inviteJoinSuffix: " आपको VicastCam से जुड़ने के लिए आमंत्रित करता है",
      inviteCodePrefix: "निमंत्रण कोड: ",
      preparing: "तैयार हो रहा है...",
      openApp: "अभी उपयोग करें",
      opening: "खुल रहा है...",
      unavailable: "खोल नहीं सकते",
      loadFailed: "सेवा लोड नहीं हुई। पेज रिफ्रेश करें और फिर कोशिश करें।",
      timedOut: "सेटअप का समय समाप्त हो गया। नेटवर्क जांचें और फिर कोशिश करें।"
    },
    ur: {
      direction: "rtl",
      title: "VicastCam",
      guideTitle: "اس لنک کو براؤزر میں کھولیں",
      inviteBrand: "VicastCam",
      inviteKicker: "دوست کی دعوت",
      inviteTitle: "لائیو ایکو سسٹم",
      inviteDescription: "موبائل + ڈیسک ٹاپ، ہر لائیو اسٹریمنگ منظر کے لیے ایک ہی سوٹ",
      featureMobileLive: "موبائل ورچوئل لائیو اسٹریمنگ",
      featureDesktopCamera: "ڈیسک ٹاپ ورچوئل کیمرا",
      featureCastControl: "اسکرین کاسٹنگ اور ریموٹ کنٹرول",
      featureLiveCoverage: "ویڈیو تعلیم اور میٹنگز",
      inviteJoinSuffix: " آپ کو VicastCam میں شامل ہونے کی دعوت دیتا ہے",
      inviteCodePrefix: "دعوتی کوڈ: ",
      preparing: "تیار ہو رہا ہے...",
      openApp: "ابھی استعمال کریں",
      opening: "کھل رہا ہے...",
      unavailable: "نہیں کھل سکا",
      loadFailed: "سروس لوڈ نہیں ہو سکی۔ صفحہ ریفریش کریں اور دوبارہ کوشش کریں۔",
      timedOut: "سیٹ اپ کا وقت ختم ہو گیا۔ نیٹ ورک چیک کریں اور دوبارہ کوشش کریں۔"
    },
    bn: {
      title: "VicastCam",
      guideTitle: "এই লিংকটি ব্রাউজারে খুলুন",
      inviteBrand: "VicastCam",
      inviteKicker: "বন্ধুর আমন্ত্রণ",
      inviteTitle: "লাইভ ইকোসিস্টেম",
      inviteDescription: "মোবাইল + ডেস্কটপ, সব ধরনের লাইভ স্ট্রিমিংয়ের জন্য এক স্যুট",
      featureMobileLive: "মোবাইল ভার্চুয়াল লাইভ স্ট্রিমিং",
      featureDesktopCamera: "ডেস্কটপ ভার্চুয়াল ক্যামেরা",
      featureCastControl: "স্ক্রিন কাস্টিং ও রিমোট কন্ট্রোল",
      featureLiveCoverage: "ভিডিও শিক্ষা ও মিটিং",
      inviteJoinSuffix: " আপনাকে VicastCam-এ যোগ দিতে আমন্ত্রণ জানিয়েছেন",
      inviteCodePrefix: "আমন্ত্রণ কোড: ",
      preparing: "প্রস্তুত হচ্ছে...",
      openApp: "এখন ব্যবহার করুন",
      opening: "খোলা হচ্ছে...",
      unavailable: "খোলা যাচ্ছে না",
      loadFailed: "সেবা লোড করতে ব্যর্থ হয়েছে। পেজ রিফ্রেশ করে আবার চেষ্টা করুন।",
      timedOut: "সেটআপের সময় শেষ হয়েছে। নেটওয়ার্ক পরীক্ষা করে আবার চেষ্টা করুন।"
    },
    fa: {
      direction: "rtl",
      title: "VicastCam",
      guideTitle: "این لینک را در مرورگر باز کنید",
      inviteBrand: "VicastCam",
      inviteKicker: "دعوت از طرف دوست",
      inviteTitle: "اکوسیستم پخش زنده",
      inviteDescription: "موبایل + دسکتاپ، یک مجموعه برای پخش زنده در همه سناریوها",
      featureMobileLive: "پخش زنده مجازی موبایل",
      featureDesktopCamera: "دوربین مجازی دسکتاپ",
      featureCastControl: "نمایش صفحه و کنترل از راه دور",
      featureLiveCoverage: "آموزش ویدیویی و جلسه‌ها",
      inviteJoinSuffix: " شما را به VicastCam دعوت می‌کند",
      inviteCodePrefix: "کد دعوت: ",
      preparing: "در حال آماده‌سازی...",
      openApp: "اکنون استفاده کنید",
      opening: "در حال باز شدن...",
      unavailable: "باز نمی‌شود",
      loadFailed: "بارگذاری سرویس ناموفق بود. صفحه را تازه‌سازی کنید و دوباره تلاش کنید.",
      timedOut: "زمان راه‌اندازی تمام شد. شبکه را بررسی کنید و دوباره تلاش کنید."
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
      featureLiveCoverage: "视频教学会议",
      inviteJoinSuffix: "邀请您加入VicastCam",
      inviteCodePrefix: "邀请码：",
      preparing: "准备中...",
      openApp: "立即使用",
      opening: "正在打开...",
      downloadApp: "下载安装",
      installHint: "如果没有打开 App，请下载安装 VicastCam。",
      unavailable: "无法打开",
      loadFailed: "服务加载失败，请刷新页面后重试。",
      timedOut: "初始化超时，请检查网络后重试。"
    },
    "zh-TW": {
      title: "VicastCam",
      guideTitle: "請在瀏覽器中開啟此連結",
      inviteBrand: "VicastCam",
      inviteKicker: "好友邀請",
      inviteTitle: "直播生態",
      inviteDescription: "手機 + 電腦，一套搞定全場景直播",
      featureMobileLive: "行動端虛擬直播",
      featureDesktopCamera: "桌面端虛擬相機",
      featureCastControl: "投屏靈活聯動",
      featureLiveCoverage: "視訊教學會議",
      inviteJoinSuffix: "邀請您加入VicastCam",
      inviteCodePrefix: "邀請碼：",
      preparing: "準備中...",
      openApp: "立即使用",
      opening: "正在開啟...",
      downloadApp: "下載安裝",
      installHint: "如果沒有開啟 App，請下載安裝 VicastCam。",
      unavailable: "無法開啟",
      loadFailed: "服務載入失敗，請重新整理頁面後再試。",
      timedOut: "初始化逾時，請檢查網路後重試。"
    }
  };

  var LANGUAGE_ALIASES = {
    zh: "zh-CN",
    "zh-cn": "zh-CN",
    "zh-sg": "zh-CN",
    "zh-hans": "zh-CN",
    "zh-tw": "zh-TW",
    "zh-hk": "zh-TW",
    "zh-mo": "zh-TW",
    "zh-hant": "zh-TW",
    en: "en",
    id: "id",
    in: "id",
    ms: "ms",
    th: "th",
    vi: "vi",
    fil: "fil",
    tl: "fil",
    es: "es",
    pt: "pt",
    ar: "ar",
    ja: "ja",
    tr: "tr",
    it: "it",
    de: "de",
    fr: "fr",
    ko: "ko",
    ru: "ru",
    pl: "pl",
    nl: "nl",
    hi: "hi",
    ur: "ur",
    bn: "bn",
    fa: "fa"
  };

  function normalizeLanguage(language) {
    var value = String(language || "").toLowerCase().replace(/_/g, "-").trim();
    if (!value) return "";
    value = value.split(/[;,]/)[0];
    if (/^zh-(tw|hk|mo|hant)/.test(value)) return "zh-TW";
    if (/^zh-(cn|sg|hans)/.test(value)) return "zh-CN";
    if (LANGUAGE_ALIASES[value]) return LANGUAGE_ALIASES[value];
    return LANGUAGE_ALIASES[value.split("-")[0]] || "";
  }

  function getUserAgentLanguage() {
    var matchedLanguage = ua.match(/(?:Language|lang|locale)[/=]([a-z]{2}(?:[_-][a-z]{2,4})?)/i);
    if (matchedLanguage && matchedLanguage[1]) return matchedLanguage[1];

    matchedLanguage = ua.match(/\b(zh[-_]?(?:cn|hans|hant|tw|hk|mo)?|en[-_]?[a-z]{2}|id[-_]?[a-z]{2}|ms[-_]?[a-z]{2}|th[-_]?[a-z]{2}|vi[-_]?[a-z]{2}|fil[-_]?[a-z]{2}|tl[-_]?[a-z]{2}|es[-_]?[a-z]{2}|pt[-_]?[a-z]{2}|ar[-_]?[a-z]{2}|ja[-_]?[a-z]{2}|tr[-_]?[a-z]{2}|it[-_]?[a-z]{2}|de[-_]?[a-z]{2}|fr[-_]?[a-z]{2}|ko[-_]?[a-z]{2}|ru[-_]?[a-z]{2}|pl[-_]?[a-z]{2}|nl[-_]?[a-z]{2}|hi[-_]?[a-z]{2}|ur[-_]?[a-z]{2}|bn[-_]?[a-z]{2}|fa[-_]?[a-z]{2})\b/i);
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

    return DEFAULT_LANGUAGE;
  }

  var currentLanguage = getPreferredLanguage();
  var defaultCopy = TRANSLATIONS[DEFAULT_LANGUAGE];
  var copy = TRANSLATIONS[currentLanguage] || defaultCopy;
  var GUIDE_IMAGES = {
    en: "./assets/open-browser-guide-en.png",
    "zh-CN": "./assets/open-browser-guide-zh.jpg",
    "zh-TW": "./assets/open-browser-guide-zh-TW.png",
    id: "./assets/open-browser-guide-id.png",
    ms: "./assets/open-browser-guide-ms.png",
    th: "./assets/open-browser-guide-th.png",
    vi: "./assets/open-browser-guide-vi.png",
    fil: "./assets/open-browser-guide-fil.png",
    es: "./assets/open-browser-guide-es.png",
    pt: "./assets/open-browser-guide-pt.png",
    ar: "./assets/open-browser-guide-ar.png",
    ja: "./assets/open-browser-guide-ja.png",
    tr: "./assets/open-browser-guide-tr.png",
    it: "./assets/open-browser-guide-it.png",
    de: "./assets/open-browser-guide-de.png",
    fr: "./assets/open-browser-guide-fr.png",
    ko: "./assets/open-browser-guide-ko.png",
    ru: "./assets/open-browser-guide-ru.png",
    pl: "./assets/open-browser-guide-pl.png",
    nl: "./assets/open-browser-guide-nl.png",
    hi: "./assets/open-browser-guide-hi.png",
    ur: "./assets/open-browser-guide-ur.png",
    bn: "./assets/open-browser-guide-bn.png",
    fa: "./assets/open-browser-guide-fa.png"
  };

  function getCopy(key) {
    return copy[key] || defaultCopy[key] || "";
  }

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = copy.direction || "ltr";
  document.title = getCopy("title");
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    element.textContent = getCopy(element.getAttribute("data-i18n"));
  });

  function getGuideImage(language) {
    if (GUIDE_IMAGES[language]) return GUIDE_IMAGES[language];
    if (language.indexOf("zh") === 0) return GUIDE_IMAGES["zh-CN"];
    return GUIDE_IMAGES.en;
  }

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

  function isDesktopBrowser() {
    if (params.get("desktop") === "1") return true;
    if (params.get("browser") === "1" || params.get("mobile") === "1") return false;

    var isIpadDesktopMode = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
    var isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet|Windows Phone/i.test(ua);

    return !isIpadDesktopMode && !isMobileOrTablet;
  }

  var embeddedBrowserGuide = document.getElementById("embeddedBrowserGuide");
  var browserGuideImage = document.getElementById("browserGuideImage");
  var invitePage = document.getElementById("invitePage");

  if (isEmbeddedBrowser()) {
    browserGuideImage.src = getGuideImage(currentLanguage);
    browserGuideImage.alt = getCopy("guideTitle");
    embeddedBrowserGuide.hidden = false;
    return;
  }

  if (isDesktopBrowser()) {
    window.location.replace(DESKTOP_DOWNLOAD_URL);
    return;
  }

  invitePage.hidden = false;

  var button = document.getElementById("downloadButton");
  var buttonLabel = document.getElementById("buttonLabel");
  var statusMessage = document.getElementById("statusMessage");
  var inviteCodeRow = document.getElementById("inviteCodeRow");
  var inviterName = document.getElementById("inviterName");
  var inviteCodeLine = document.getElementById("inviteCodeLine");
  var inviteCodeValue = document.getElementById("inviteCodeValue");
  var installInstance = null;
  var sdkReady = false;
  var isLaunching = false;
  var launchTimer = null;

  function getUrlData() {
    var data = {};
    if (window.OpoInstall && typeof window.OpoInstall.parseUrlParams === "function") {
      data = window.OpoInstall.parseUrlParams() || {};
    } else {
      params.forEach(function (value, key) { data[key] = value; });
    }
    data.inviteCode = data.inviteCode || data.invite_code || data.code;
    data.nickname = data.nickname || data.nickName || data.nick_name || data.name;
    return data;
  }

  var inviteData = getUrlData();
  var inviterNickname = String(inviteData.nickname || "").trim();
  var inviterCode = String(inviteData.inviteCode || "").trim();
  if (inviterNickname && inviterCode) {
    inviterName.textContent = inviterNickname;
    inviteCodeValue.textContent = inviterCode;
    inviteCodeLine.hidden = false;
    inviteCodeRow.hidden = false;
  }

  buttonLabel.textContent = getCopy("openApp");

  function setReady() {
    sdkReady = true;
    isLaunching = false;
    clearLaunchTimer();
    button.disabled = false;
    buttonLabel.textContent = getCopy("openApp");
    statusMessage.textContent = "";
  }

  function setUnavailable(message) {
    button.disabled = true;
    buttonLabel.textContent = getCopy("unavailable");
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
      setUnavailable(getCopy("loadFailed"));
    };
    document.head.appendChild(script);
  }

  function initializeOpenInstall() {
    if (typeof window.OpoInstall !== "function") {
      setUnavailable(getCopy("loadFailed"));
      return;
    }

    installInstance = new window.OpoInstall(
      {
        appKey: APP_KEY,
        preferWakeup: true,
        onready: function () {
          installInstance = this;
          setReady();
        }
      },
      inviteData
    );
  }

  function clearLaunchTimer() {
    if (launchTimer) {
      window.clearTimeout(launchTimer);
      launchTimer = null;
    }
  }

  function beginLaunch() {
    isLaunching = true;
    button.disabled = true;
    buttonLabel.textContent = getCopy("opening");
    statusMessage.textContent = "";
  }

  function finishLaunchLater(callback) {
    clearLaunchTimer();
    launchTimer = window.setTimeout(function () {
      launchTimer = null;
      callback();
    }, 2200);
  }

  function openInstalledApp() {
    beginLaunch();

    if (/Android/i.test(ua) && typeof installInstance.schemeWakeup === "function") {
      installInstance.schemeWakeup();
      finishLaunchLater(setReady);
      return;
    }

    installInstance.wakeupOrInstall();
    finishLaunchLater(setReady);
  }

  button.addEventListener("click", function () {
    if (!installInstance || isLaunching) return;
    openInstalledApp();
  });

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && installInstance) setReady();
  });

  window.addEventListener("pageshow", function () {
    if (installInstance) {
      setReady();
    }
  });

  loadOpenInstallScript(initializeOpenInstall);
  window.setTimeout(function () {
    if (!sdkReady) setUnavailable(getCopy("timedOut"));
  }, READY_TIMEOUT_MS);
})();
