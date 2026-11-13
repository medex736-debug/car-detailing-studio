/**
 * Arabic UI dictionary — the default language. Every value here is the exact
 * Arabic copy that was previously inline in the components; do not reword it.
 * English lives in en.ts and must mirror this shape.
 */
export const ar = {
  meta: {
    title: "سيراميك جولدن | تلميع وسيراميك السيارات في المصفح، أبوظبي",
    description:
      "سيراميك جولدن لتلميع السيارات في المصفح، أبوظبي — تنظيف وتلميع وبوليش وطلاء نانو سيراميك للسيارات. للحجز والاستفسار: +971 55 215 5543.",
    ogLocale: "ar_AE",
  },
  common: {
    skipToBooking: "تخطي إلى الحجز",
    bookNow: "احجز الآن",
    callNow: "اتصل الآن",
    backToTop: (name: string) => `${name} — العودة إلى الأعلى`,
    addressSeparator: "، ",
    languageName: "العربية",
    languages: {
      ar: { label: "العربية", switchTo: "التبديل إلى العربية" },
      en: { label: "EN", switchTo: "Switch to English" },
    },
  },
  nav: {
    mainLabel: "القائمة الرئيسية",
    links: {
      services: "خدماتنا",
      portfolio: "أعمالنا",
      gallery: "المعرض",
      location: "موقعنا",
    },
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
  },
  hero: {
    title: "نعيد لسيارتك لمعانها وحمايتها",
    paragraph:
      "تنظيف وتلميع وبوليش ونانو سيراميك في المصفح، أبوظبي. عناية دقيقة بكل تفصيلة لتعود سيارتك بلمعانها.",
    whatsappCta: "احجز عبر واتساب",
    whatsappGreeting: "مرحباً، أرغب بحجز موعد",
    locationLabel: "الموقع",
    hoursLabel: "ساعات العمل",
  },
  trust: {
    label: "معلومات سريعة",
    ratingSr: (score: string, count: number) =>
      `${score} من ${count} تقييم على Google`,
    ratingOn: "على",
    google: "Google",
    reviewsLabel: (_count: number) => "تقييم",
  },
  services: {
    title: "أربع خدمات للعناية بسيارتك",
    intro:
      "من التنظيف الشامل للسيارة إلى حماية الطلاء بالنانو سيراميك، اختر الخدمة التي تحتاجها وسنساعدك في تحديد السعر المناسب.",
    askPrice: "اسأل عن السعر",
  },
  portfolio: {
    title: "أفضل أعمالنا",
    intro: "لمحة من أعمالنا في تنظيف وتلميع السيارات.",
    genericAlt: "صورة من أعمالنا",
    playVideo: "تشغيل الفيديو",
  },
  gallery: {
    title: "معرض الصور",
    intro: "صور إضافية من أعمالنا في تنظيف وتلميع السيارات.",
    genericAlt: "صورة من معرض الأعمال",
    zoom: (label: string) => `تكبير ${label}`,
    dialogLabel: "عرض الصورة",
    close: "إغلاق",
    previous: "الصورة السابقة",
    next: "الصورة التالية",
  },
  videos: {
    title: "فيديوهات من أعمالنا",
    genericLabel: "فيديو من أعمالنا",
    play: "تشغيل الفيديو",
    instagramCta: "شاهد المزيد على إنستغرام",
  },
  pricing: {
    title: "السعر حسب حالة السيارة",
    body: "كل سيارة تختلف عن الأخرى، لذلك نحدد السعر بعد الاطلاع على السيارة. أرسل لنا صوراً عبر واتساب أو اتصل بنا للحصول على سعر.",
    whatsappCta: "اطلب سعراً عبر واتساب",
    whatsappMessage:
      "مرحباً، أرغب بالحصول على سعر لسيارتي. سأرسل لكم صور السيارة عبر واتساب.",
  },
  reviews: {
    title: "آراء عملائنا",
    intro: "تقييمات عملاء شاركونا تجربتهم على Google.",
    ratingSr: (score: string, count: number) => `${score} من ${count} تقييم`,
    reviewsLabel: (_count: number) => "تقييم",
    ratingAria: (score: string, count: number) =>
      `تقييم Google ${score} من ${count} تقييم`,
    fallback: "اقرأ التقييمات على Google",
  },
  location: {
    title: "موقعنا وساعات العمل",
    addressLabel: "العنوان",
    hoursLabel: "ساعات العمل",
    followLabel: "تابعنا",
    instagram: "إنستغرام",
    facebook: "فيسبوك",
    mapTitle: "خريطة موقع سيراميك جولدن",
  },
  booking: {
    title: "احجز موعدك",
    intro:
      "اختر الخدمة والتاريخ والوقت المناسبين، وأرسل طلبك عبر واتساب. سيتواصل معك فريقنا لتأكيد الموعد النهائي.",
    phonePrompt: "تفضل التحدث معنا أولاً؟",
    labels: {
      name: "الاسم",
      phone: "رقم الهاتف",
      vehicle: "السيارة",
      email: "البريد الإلكتروني (اختياري)",
      service: "الخدمة",
      date: "التاريخ المفضل",
      time: "الوقت المفضل",
      notes: "ملاحظات (اختياري)",
    },
    placeholders: {
      name: "اسمك",
      phone: "رقم هاتفك",
      vehicle: "نوع السيارة والموديل",
      email: "بريدك الإلكتروني",
      time: "اختر الوقت",
      notes: "حالة الطلاء، ملاحظات، أو أي تفاصيل…",
    },
    timeSlots: [
      "8:00 ص",
      "9:00 ص",
      "10:00 ص",
      "11:00 ص",
      "12:00 م",
      "1:00 م",
      "2:00 م",
      "3:00 م",
      "4:00 م",
      "5:00 م",
      "6:00 م",
      "7:00 م",
      "8:00 م",
      "9:00 م",
    ],
    submit: "أرسل طلب الموعد عبر واتساب",
    footnote:
      "سيُفتح واتساب مع طلبك جاهزاً للإرسال — يتم تأكيد الموعد النهائي هناك.",
    message: {
      greeting: "مرحباً، أرغب بطلب موعد:",
      service: "الخدمة",
      date: "التاريخ المفضل",
      time: "الوقت المفضل",
      name: "الاسم",
      pending: "(بانتظار تأكيدكم للموعد)",
    },
    success: {
      sent: "تم إرسال الطلب عبر واتساب",
      service: "الخدمة",
      vehicle: "السيارة",
      date: "التاريخ المفضل",
      time: "الوقت المفضل",
      note: "تم فتح محادثة واتساب مع طلبك جاهزاً للإرسال. اضغط إرسال، وسيؤكد فريقنا الموعد النهائي هناك.",
      again: "إرسال طلب آخر",
    },
  },
  footer: {
    addressLabel: "العنوان",
    hoursLabel: "ساعات العمل",
    contactLabel: "تواصل معنا",
    whatsapp: "واتساب",
    instagram: "إنستغرام",
    facebook: "فيسبوك",
    rights: (year: number, name: string) =>
      `© ${year} ${name}. جميع الحقوق محفوظة.`,
    priceNote: "الأسعار حسب حالة السيارة.",
  },
  whatsapp: {
    greeting: "مرحباً، أرغب بالاستفسار عن خدماتكم",
    aria: "تواصل معنا عبر واتساب",
  },
};

export type Dictionary = typeof ar;
