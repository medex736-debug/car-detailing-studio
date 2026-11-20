/**
 * FAQ content — ONE shared source for the visible FAQ section (Faq.tsx) and
 * the FAQPage JSON-LD generated at build time (vite.config.ts). Edit here only
 * and both stay identical.
 *
 * Answer rules: general, factually safe explanations only. No invented prices,
 * durations, warranties or brands. Business-specific answers stay neutral and
 * point to the confirmed phone number / opening hours.
 */
export interface FaqItem {
  id: string;
  q: string;
  a: string;
  qEn: string;
  aEn: string;
}

export const faq: FaqItem[] = [
  {
    id: "what-is-nano-ceramic",
    q: "ما هو طلاء النانو سيراميك؟",
    a: "طلاء النانو سيراميك طبقة سائلة تُطبَّق على طلاء السيارة بعد تنظيفه وتلميعه، وتشكّل سطحاً أملساً يصد الماء والأوساخ ويسهّل تنظيف السيارة ويحمي الطلاء من العوامل الخارجية. نقدّم هذه الخدمة في المصفح، أبوظبي. للاستفسار اتصل على +971 55 215 5543.",
    qEn: "What is nano ceramic coating?",
    aEn: "Nano ceramic coating is a liquid layer applied to your car's paint after it has been cleaned and polished. It forms a smooth surface that repels water and dirt, makes the car easier to clean and protects the paint from outside elements. We offer this service in Mussafah, Abu Dhabi. Call +971 55 215 5543 for details.",
  },
  {
    id: "polishing-vs-ceramic",
    q: "ما الفرق بين التلميع وطلاء السيراميك؟",
    a: "التلميع يعالج سطح الطلاء نفسه: يزيل الشوائب السطحية والخدوش الدقيقة ويعيد اللمعان. أما طلاء النانو سيراميك فيُضاف فوق الطلاء بعد تلميعه كطبقة حماية إضافية. لذلك يُنصح بالتلميع قبل تطبيق السيراميك للحصول على أفضل نتيجة. للاستفسار: +971 55 215 5543.",
    qEn: "What is the difference between polishing and ceramic coating?",
    aEn: "Polishing works on the paint surface itself: it removes surface impurities and fine scratches and restores gloss. Nano ceramic coating is added on top of the paint afterwards as an extra protective layer. That is why polishing is recommended before ceramic coating for the best result. Questions? Call +971 55 215 5543.",
  },
  {
    id: "how-long-service",
    q: "كم يستغرق تلميع السيارة؟",
    a: "المدة تعتمد على حالة السيارة والخدمة المختارة؛ فبعض الخدمات تحتاج ساعات وبعضها يحتاج وقتاً أطول. لا نحدد مدة ثابتة مسبقاً، بل نقدّرها بعد الاطلاع على السيارة. للحصول على تقدير دقيق لسيارتك، تواصل معنا على +971 55 215 5543 أو أرسل صور السيارة عبر واتساب.",
    qEn: "How long does car polishing take?",
    aEn: "The time depends on your car's condition and the service you choose. Some services take a few hours and others need longer. We do not give a fixed time in advance; we estimate it after seeing the car. For an accurate estimate, call +971 55 215 5543 or send photos of your car on WhatsApp.",
  },
  {
    id: "coating-lifespan",
    q: "كم يدوم طلاء النانو سيراميك؟",
    a: "تختلف مدة دوام طلاء النانو سيراميك حسب نوع المنتج وطريقة العناية بالسيارة وظروف الاستخدام. لذلك لا نحدد مدة ثابتة مسبقاً، ونوضح لك التفاصيل عند الحجز بحسب الخدمة المناسبة لسيارتك. تواصل معنا على +971 55 215 5543 لمعرفة الخيارات المتاحة.",
    qEn: "How long does nano ceramic coating last?",
    aEn: "How long nano ceramic coating lasts depends on the product, how the car is cared for and how it is used. We do not state a fixed duration in advance; we explain the details when you book, based on the option that suits your car. Call +971 55 215 5543 to learn about the available options.",
  },
  {
    id: "price-quote",
    q: "كم سعر تلميع السيارة وكيف أحصل على عرض سعر؟",
    a: "السعر يعتمد على حالة السيارة والخدمة المختارة، لذلك نحدده بعد الاطلاع على السيارة. أرسل صور سيارتك عبر واتساب أو اتصل على +971 55 215 5543 للحصول على سعر مناسب. لا توجد أسعار ثابتة لكل السيارات، ويمكنك أيضاً السؤال عند زيارتنا في المصفح.",
    qEn: "What does car polishing cost and how do I get a quote?",
    aEn: "The price depends on your car's condition and the service you choose, so we set it after inspecting the car. Send photos of your car on WhatsApp or call +971 55 215 5543 for a suitable price. There are no fixed prices for every car, and you can also ask when you visit us in Mussafah.",
  },
  {
    id: "appointment",
    q: "هل أحتاج إلى موعد مسبق؟",
    a: "نستقبل العملاء يومياً من 8:00 صباحاً حتى 9:00 مساءً، ويُفضَّل حجز موعد مسبق لضمان توفر الوقت المناسب لسيارتك. يمكنك الحجز عبر واتساب أو بالاتصال على +971 55 215 5543، أو زيارة الورشة في المصفح، أبوظبي.",
    qEn: "Do I need an appointment?",
    aEn: "We welcome customers every day from 8:00 AM to 9:00 PM, and booking ahead is recommended so the right time is reserved for your car. You can book on WhatsApp or by calling +971 55 215 5543, or visit the workshop in Mussafah, Abu Dhabi.",
  },
  {
    id: "location",
    q: "أين تقع الورشة في المصفح؟",
    a: "تقع ورشة سيراميك جولدن لتلميع السيارات في منطقة المصفح في أبوظبي، الإمارات. للوصول بسهولة أو لمعرفة الموقع بدقة، تواصل معنا على +971 55 215 5543 أو عبر واتساب وسنرسل لك الموقع.",
    qEn: "Where is the workshop in Mussafah?",
    aEn: "Ceramic Golden Car Polishing is located in the Mussafah area of Abu Dhabi, UAE. For directions or the exact location, contact us on +971 55 215 5543 or on WhatsApp and we will send you the location.",
  },
  {
    id: "hours",
    q: "ما ساعات العمل؟",
    a: "نعمل يومياً طوال أيام الأسبوع من 8:00 صباحاً حتى 9:00 مساءً. يمكنك زيارتنا خلال هذه الأوقات في المصفح، أبوظبي، أو التواصل معنا على +971 55 215 5543 عبر الاتصال أو واتساب لحجز موعد أو الاستفسار عن الخدمات.",
    qEn: "What are your working hours?",
    aEn: "We are open every day of the week from 8:00 AM to 9:00 PM. You can visit us during these hours in Mussafah, Abu Dhabi, or contact us on +971 55 215 5543 by phone or WhatsApp to book an appointment or ask about our services.",
  },
];
