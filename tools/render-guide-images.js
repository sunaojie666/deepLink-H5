const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");

const cwd = process.cwd();
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const assetsDir = path.join(cwd, "assets");
const tempDir = path.join(os.tmpdir(), "vicastcam-guide-render");
const baseEn = path.join(assetsDir, "open-browser-guide-en.png");
const baseZh = path.join(assetsDir, "open-browser-guide-zh.jpg");

const translations = {
  id: {
    step1: "Ketuk di sini",
    step2: ["Pilih:", "“Buka dengan Browser”"],
    menu: ["Kirim ke Chat", "Bagikan Momen", "Tambah Favorit", "Cari di Halaman", "Salin URL", "Sematkan di Atas", "Buka dengan Browser", "Pengaturan Font"]
  },
  ms: {
    step1: "Ketik di sini",
    step2: ["Pilih:", "“Buka dengan Pelayar”"],
    menu: ["Hantar ke Sembang", "Kongsi ke Moments", "Tambah Kegemaran", "Cari Dalam Halaman", "Salin URL", "Semat di Atas", "Buka dengan Pelayar", "Tetapan Fon"]
  },
  th: {
    step1: "แตะที่นี่",
    step2: ["เลือก:", "“เปิดด้วยเบราว์เซอร์”"],
    menu: ["ส่งไปที่แชท", "แชร์ไปยังโมเมนต์", "เพิ่มในรายการโปรด", "ค้นหาในหน้า", "คัดลอก URL", "ปักหมุดบนสุด", "เปิดด้วยเบราว์เซอร์", "ตั้งค่าแบบอักษร"]
  },
  vi: {
    step1: "Nhấn vào đây",
    step2: ["Chọn:", "“Mở bằng trình duyệt”"],
    menu: ["Gửi vào chat", "Chia sẻ Khoảnh khắc", "Thêm vào yêu thích", "Tìm trong trang", "Sao chép URL", "Ghim lên đầu", "Mở bằng trình duyệt", "Cài đặt phông"]
  },
  fil: {
    step1: "I-tap dito",
    step2: ["Piliin:", "“Buksan gamit ang Browser”"],
    menu: ["Ipadala sa Chat", "I-share sa Moments", "Idagdag sa Favorites", "Maghanap sa Pahina", "Kopyahin URL", "I-pin sa Itaas", "Buksan sa Browser", "Mga Setting ng Font"]
  },
  es: {
    step1: "Toca aquí",
    step2: ["Elige:", "“Abrir con navegador”"],
    menu: ["Enviar al chat", "Compartir en Momentos", "Añadir a favoritos", "Buscar en página", "Copiar URL", "Fijar arriba", "Abrir con navegador", "Ajustes de fuente"]
  },
  pt: {
    step1: "Toque aqui",
    step2: ["Escolha:", "“Abrir com navegador”"],
    menu: ["Enviar ao chat", "Compartilhar nos Momentos", "Adicionar aos favoritos", "Buscar na página", "Copiar URL", "Fixar no topo", "Abrir com navegador", "Ajustes de fonte"]
  },
  ar: {
    dir: "rtl",
    step1: "اضغط هنا",
    step2: ["اختر:", "«فتح بالمتصفح»"],
    menu: ["إرسال إلى الدردشة", "مشاركة في اللحظات", "إضافة إلى المفضلة", "البحث داخل الصفحة", "نسخ الرابط", "تثبيت في الأعلى", "فتح بالمتصفح", "إعدادات الخط"]
  },
  ja: {
    step1: "ここをタップ",
    step2: ["選択:", "「ブラウザで開く」"],
    menu: ["チャットへ送信", "モーメンツで共有", "お気に入りに追加", "ページ内検索", "URLをコピー", "チャットで上部固定", "ブラウザで開く", "フォント設定"]
  },
  tr: {
    step1: "Buraya dokun",
    step2: ["Seç:", "“Tarayıcıyla aç”"],
    menu: ["Sohbete gönder", "Anlarda paylaş", "Favorilere ekle", "Sayfada ara", "URL kopyala", "Üste sabitle", "Tarayıcıyla aç", "Yazı tipi ayarları"]
  },
  it: {
    step1: "Tocca qui",
    step2: ["Scegli:", "“Apri con browser”"],
    menu: ["Invia alla chat", "Condividi nei Momenti", "Aggiungi ai preferiti", "Cerca nella pagina", "Copia URL", "Fissa in alto", "Apri con browser", "Impostazioni font"]
  },
  de: {
    step1: "Hier tippen",
    step2: ["Wählen:", "„Mit Browser öffnen“"],
    menu: ["An Chat senden", "In Momenten teilen", "Zu Favoriten", "Seite durchsuchen", "URL kopieren", "Oben anheften", "Mit Browser öffnen", "Schrifteinstellungen"]
  },
  fr: {
    step1: "Touchez ici",
    step2: ["Choisissez :", "« Ouvrir avec le navigateur »"],
    menu: ["Envoyer au chat", "Partager dans Moments", "Ajouter aux favoris", "Rechercher dans la page", "Copier l’URL", "Épingler en haut", "Ouvrir avec le navigateur", "Paramètres de police"]
  },
  ko: {
    step1: "여기를 탭",
    step2: ["선택:", "“브라우저로 열기”"],
    menu: ["채팅으로 보내기", "모멘트에 공유", "즐겨찾기에 추가", "페이지에서 검색", "URL 복사", "채팅 상단 고정", "브라우저로 열기", "글꼴 설정"]
  },
  ru: {
    step1: "Нажмите здесь",
    step2: ["Выберите:", "«Открыть в браузере»"],
    menu: ["Отправить в чат", "Поделиться в Моментах", "В избранное", "Поиск на странице", "Копировать URL", "Закрепить сверху", "Открыть в браузере", "Настройки шрифта"]
  },
  pl: {
    step1: "Dotknij tutaj",
    step2: ["Wybierz:", "„Otwórz w przeglądarce”"],
    menu: ["Wyślij do czatu", "Udostępnij w Momentach", "Dodaj do ulubionych", "Szukaj na stronie", "Kopiuj URL", "Przypnij u góry", "Otwórz w przeglądarce", "Ustawienia czcionki"]
  },
  nl: {
    step1: "Tik hier",
    step2: ["Kies:", "“Openen met browser”"],
    menu: ["Naar chat sturen", "Delen in Momenten", "Toevoegen aan favorieten", "Zoeken op pagina", "URL kopiëren", "Boven vastzetten", "Openen met browser", "Lettertype-instellingen"]
  },
  hi: {
    step1: "यहाँ टैप करें",
    step2: ["चुनें:", "“ब्राउज़र से खोलें”"],
    menu: ["चैट में भेजें", "मोमेंट्स पर साझा करें", "पसंदीदा में जोड़ें", "पेज में खोजें", "URL कॉपी करें", "ऊपर पिन करें", "ब्राउज़र से खोलें", "फ़ॉन्ट सेटिंग्स"]
  },
  ur: {
    dir: "rtl",
    step1: "یہاں ٹیپ کریں",
    step2: ["منتخب کریں:", "“براؤزر سے کھولیں”"],
    menu: ["چیٹ میں بھیجیں", "مومنٹس میں شیئر کریں", "پسندیدہ میں شامل کریں", "صفحے میں تلاش کریں", "URL کاپی کریں", "اوپر پن کریں", "براؤزر سے کھولیں", "فونٹ سیٹنگز"]
  },
  bn: {
    step1: "এখানে ট্যাপ করুন",
    step2: ["নির্বাচন করুন:", "“ব্রাউজার দিয়ে খুলুন”"],
    menu: ["চ্যাটে পাঠান", "মোমেন্টসে শেয়ার", "পছন্দে যোগ করুন", "পেজে খুঁজুন", "URL কপি করুন", "উপরে পিন করুন", "ব্রাউজার দিয়ে খুলুন", "ফন্ট সেটিংস"]
  },
  fa: {
    dir: "rtl",
    step1: "اینجا بزنید",
    step2: ["انتخاب کنید:", "«باز کردن با مرورگر»"],
    menu: ["ارسال به چت", "اشتراک در Moments", "افزودن به علاقه‌مندی‌ها", "جستجو در صفحه", "کپی URL", "سنجاق در بالا", "باز کردن با مرورگر", "تنظیمات فونت"]
  },
  "zh-TW": {
    base: "zh",
    step1: "點擊右上角三點",
    step2: ["選擇「在瀏覽器開啟」"],
    menu: ["發送給朋友", "分享到朋友圈", "收藏", "搜尋頁面內容", "複製連結", "在聊天中置頂", "在瀏覽器開啟", "調整字體"]
  }
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[ch]));
}

function htmlFor(lang, data) {
  const isZhBase = data.base === "zh";
  const base = isZhBase ? baseZh : baseEn;
  const dir = data.dir || "ltr";
  const row1Y = isZhBase ? 786 : 778;
  const row2Y = isZhBase ? 1006 : 998;
  const step1 = isZhBase
    ? { cover: "left:245px;top:96px;width:430px;height:130px;", text: "left:254px;top:99px;width:405px;height:122px;font-size:56px;" }
    : { cover: "left:238px;top:88px;width:308px;height:146px;", text: "left:252px;top:97px;width:286px;height:126px;font-size:56px;" };
  const step2 = isZhBase
    ? { cover: "left:245px;top:338px;width:585px;height:112px;", text: "left:254px;top:334px;width:570px;height:120px;font-size:52px;" }
    : { cover: "left:245px;top:312px;width:650px;height:150px;", text: "left:252px;top:316px;width:610px;height:142px;font-size:52px;" };
  const centers = [225, 435, 646, 856, 225, 435, 646, 856];
  const menu = data.menu.map((label, index) => {
    const left = centers[index] - 98;
    const top = index < 4 ? row1Y : row2Y;
    const coverTop = top - 8;
    return `<div class="cover" style="left:${left - 10}px;top:${coverTop}px;width:216px;height:92px;"></div><div class="text menu" data-fit="29,17" dir="${dir}" style="left:${left}px;top:${top}px;width:196px;height:80px;">${esc(label)}</div>`;
  }).join("\n");
  const step2Lines = data.step2.map((line) => `<div>${esc(line)}</div>`).join("");

  return `<!doctype html>
<html lang="${esc(lang)}">
<head>
<meta charset="utf-8" />
<style>
html, body { margin: 0; width: 1080px; height: 2074px; overflow: hidden; background: #fff; }
body { visibility: hidden; }
body.ready { visibility: visible; }
.canvas { position: relative; width: 1080px; height: 2074px; background: #fff; overflow: hidden; }
.base { position: absolute; inset: 0; width: 1080px; height: 2074px; }
.blue-overlay { position: absolute; inset: 0; width: 1080px; height: 2074px; }
.cover { position: absolute; background: #fff; }
.text {
  position: absolute;
  color: #0b0b0b;
  font-family: "Segoe UI", "Nirmala UI", "Arial", "Microsoft YaHei", "Microsoft JhengHei", "Yu Gothic", "Meiryo", "Malgun Gothic", "Noto Sans SC", sans-serif;
  letter-spacing: 0;
  overflow: hidden;
  box-sizing: border-box;
  text-rendering: geometricPrecision;
}
.step1 { display: flex; align-items: center; justify-content: flex-start; font-weight: 800; line-height: 1.04; text-align: left; white-space: normal; }
.step2 { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; font-weight: 800; line-height: 1.13; text-align: left; white-space: normal; }
.menu { display: flex; align-items: center; justify-content: center; font-weight: 400; line-height: 1.14; text-align: center; white-space: normal; overflow-wrap: break-word; }
</style>
</head>
<body>
<div class="canvas">
<img class="base" src="${pathToFileURL(base).href}" alt="" />
<div class="cover" style="${step1.cover}"></div>
<div class="text step1" data-fit="56,28" dir="${dir}" style="${step1.text}">${esc(data.step1)}</div>
<div class="cover" style="${step2.cover}"></div>
<div class="text step2" data-fit="52,28" dir="${dir}" style="${step2.text}">${step2Lines}</div>
${menu}
<canvas class="blue-overlay" id="blueOverlay" width="1080" height="2074"></canvas>
</div>
<script>
function restoreBlueOverlay() {
  var img = document.querySelector(".base");
  var canvas = document.getElementById("blueOverlay");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = image.data;
  for (var i = 0; i < data.length; i += 4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    var isGuideBlue = b > 120 && g > 85 && r < 165 && b > r + 25 && g > r + 15 && Math.max(r, g, b) - Math.min(r, g, b) > 45;
    if (!isGuideBlue) data[i + 3] = 0;
  }
  ctx.putImageData(image, 0, 0);
}
function fitText(el) {
  var parts = el.dataset.fit.split(",").map(Number);
  var max = parts[0];
  var min = parts[1];
  for (var size = max; size >= min; size -= 1) {
    el.style.fontSize = size + "px";
    if (el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1) return;
  }
}
function ready() {
  restoreBlueOverlay();
  document.querySelectorAll("[data-fit]").forEach(fitText);
  document.body.classList.add("ready");
}
window.addEventListener("load", function () {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(ready);
  } else {
    setTimeout(ready, 250);
  }
});
</script>
</body>
</html>`;
}

if (!fs.existsSync(chrome)) {
  throw new Error(`Chrome not found: ${chrome}`);
}

fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir, { recursive: true });

for (const [lang, data] of Object.entries(translations)) {
  const htmlPath = path.join(tempDir, `guide-${lang}.html`);
  const outputPath = path.join(assetsDir, `open-browser-guide-${lang}.png`);
  fs.writeFileSync(htmlPath, htmlFor(lang, data), "utf8");
  const result = spawnSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--force-device-scale-factor=1",
    `--user-data-dir=${path.join(tempDir, `profile-${lang}`)}`,
    "--window-size=1080,2074",
    "--virtual-time-budget=3000",
    `--screenshot=${outputPath}`,
    pathToFileURL(htmlPath).href
  ], { encoding: "utf8" });

  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    throw new Error(`Chrome screenshot failed for ${lang}`);
  }

  console.log(`generated ${path.relative(cwd, outputPath)}`);
}
