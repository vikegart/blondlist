/* Shared garage wishlist: default catalog + storage helpers */
(function (w) {
  var STORAGE_KEY = "wishlist_garage_notes_v1";

  var DEFAULT = [
    {
      title: "Airless basketball",
      note: "Мяч без накачки, «в дырочках» — Wilson Airless Gen1. Официальный Wilson; при неудобной доставке — StockX/eBay с осторожностью.",
      links: [
        { href: "https://www.wilson.com/en-us/basketball/basketballs/airless-balls", label: "Wilson — категория Airless" },
        { href: "https://www.wilson.com/en-us/product/airless-gen1-bskt-black-wz1016103idv", label: "Конкретный SKU Gen1" }
      ]
    },
    {
      title: "Картинг KZ / KZ2",
      notePrefix: "Важно",
      note: "KZ/KZ2 — проф. класс, не прокат на 9 л.с. Часто это трек-дни и команды. Старт — Race Place; уточняй КЗ у картодромов соревновательного уровня.",
      href: "https://race-place.ru/drugie-uslugi/sportivnyij-karting/"
    },
    {
      title: "Один урок дрифта",
      note: "Подарочный сертификат — выбери минимальный пакет (одно занятие), не обязательно полный курс.",
      links: [
        { href: "https://kultura-zanosa.ru/msk/certificate", label: "Культура заноса — сертификаты" },
        { href: "https://ultimate-drift.ru/certificate/", label: "Ultimate Drift — сертификат" }
      ]
    },
    {
      title: "Оклейка MacBook (dbrand)",
      note: "Стильный скин на MacBook — dbrand или аналог по вкусу дарящего. В каталоге выбери свою модель года.",
      href: "https://dbrand.com/search?brands=apple&deviceTypes=laptops&productTypes=skins&sort=new"
    },
    {
      title: "Timekettle W4 Pro (перевод)",
      notePrefix: "Не фейк",
      note: "оригинал — бренд Timekettle и приложение Timekettle; цена уровня топ-переводчиков. Дешёвые «W4» без их экосистемы — часто другая электроника.",
      links: [
        { href: "https://www.timekettle.co/products/w4-pro-ai-interpreter-earbuds-2026", label: "Официальный Timekettle W4 Pro" },
        { href: "https://www.amazon.com/Timekettle-Translator-Bidirectional-Translation-Noise-Canceling/dp/B0F8VDW638", label: "Amazon — проверь продавца" }
      ]
    },
    {
      title: "Стрельба: пулемёт / снайперка",
      note: "Формат и патроны — только по правилам площадки (часто холостые/имитация на полигоне). Уточни у организатора перед покупкой сертификата.",
      href: "https://tankmarshrut.com/uslugi/strelba"
    },
    {
      title: "Под водой: субмарина / глайдер",
      note: "Туристический «суб» часто = мини-суб или шлем-тур. Два варианта ниже — выбери регион.",
      links: [
        { href: "https://discoverycove.com/orlando/upgrades/seaventure/", label: "SeaVenture (Discovery Cove)" },
        { href: "https://www.keywestsnorkelingtours.com/mini-sub-underwater-adventure/", label: "Mini Sub (Key West)" }
      ],
      dashed: true
    },
    {
      title: "Whoop — последняя версия",
      note: "Актуальная линейка на дату покупки: Whoop 5.0 и Whoop MG — сравни комплектацию на официальном сайте.",
      links: [
        { href: "https://www.whoop.com/us/en/thelocker/introducing-whoop-5-0-and-whoop-mg/", label: "Анонс Whoop 5.0 / MG" },
        { href: "https://join.whoop.com/us/en/", label: "Join Whoop (оформление)" }
      ]
    },
    {
      title: "Стол из слика (шины)",
      note: "Не обязательно F1 — любой гоночный слик / шина в интерьере.",
      links: [
        { href: "https://www.etsy.com/listing/1349241391/coffee-table-made-of-racing-tire-slick", label: "Etsy — Pirelli slick table" },
        { href: "https://3guniquedecor.com/products/nascar-tire-table-automotive-coffee-table-racing-inspired-furniture", label: "3G Unique Decor — NASCAR tire" }
      ]
    },
    {
      title: "День в Universal Studios",
      note: "Официальные билеты Universal Orlando (1-day / park-to-park по желанию). Город парка уточни заранее.",
      href: "https://www.universalorlando.com/web/en/us/tickets-packages/park-tickets"
    }
  ];

  function normalizeEntry(raw) {
    if (typeof raw === "string") return { title: raw.trim() };
    if (!raw || typeof raw !== "object") return null;
    var t = raw.title;
    if (typeof t !== "string" || !t.trim()) return null;
    var o = { title: t.trim() };
    if (typeof raw.note === "string") o.note = raw.note;
    if (typeof raw.notePrefix === "string" && raw.notePrefix.trim()) o.notePrefix = raw.notePrefix.trim();
    if (raw.dashed) o.dashed = true;
    if (typeof raw.href === "string" && raw.href) o.href = raw.href;
    if (Array.isArray(raw.links)) {
      o.links = raw.links.filter(function (L) {
        return L && typeof L.href === "string" && L.href && typeof L.label === "string" && L.label;
      });
    }
    return o;
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT.map(function (x) { return JSON.parse(JSON.stringify(x)); });
      var a = JSON.parse(raw);
      if (!Array.isArray(a)) return DEFAULT.map(function (x) { return JSON.parse(JSON.stringify(x)); });
      var out = [];
      for (var i = 0; i < a.length; i++) {
        var e = normalizeEntry(a[i]);
        if (e) out.push(e);
      }
      return out.length ? out : DEFAULT.map(function (x) { return JSON.parse(JSON.stringify(x)); });
    } catch (err) {
      return DEFAULT.map(function (x) { return JSON.parse(JSON.stringify(x)); });
    }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  w.GARAGE_WISHLIST_STORAGE_KEY = STORAGE_KEY;
  w.GARAGE_WISHLIST_DEFAULT = DEFAULT;
  w.loadGarageWishlist = load;
  w.saveGarageWishlist = save;
})(window);
