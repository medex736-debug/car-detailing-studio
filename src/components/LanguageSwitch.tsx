import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

type Variant = "nav" | "menu" | "footer";

const base =
  "inline-flex items-center justify-center rounded-lg text-muted-foreground transition-colors duration-[233ms]";

const variants: Record<Variant, string> = {
  nav: "min-h-[44px] min-w-[44px] border border-input px-3 text-sm hover:border-gold hover:text-gold",
  menu: "min-h-[48px] w-full border border-input px-3 text-sm hover:border-gold hover:text-gold",
  footer:
    "min-h-[44px] px-1 text-xs underline-offset-4 hover:text-foreground hover:underline",
};

export function LanguageSwitch({ variant = "nav" }: { variant?: Variant }) {
  const { lang, t, toggleLang } = useI18n();
  const target = lang === "ar" ? "en" : "ar";
  const label = t.common.languages[target];

  return (
    <button
      type="button"
      lang={target}
      onClick={toggleLang}
      aria-label={label.switchTo}
      className={cn(base, variants[variant])}
    >
      <span lang={target}>{label.label}</span>
    </button>
  );
}
