import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  dictionaries,
  I18nContext,
  localizedSite,
  readInitialLang,
  STORAGE_KEY,
  syncDocument,
  type Dir,
  type I18nContextValue,
  type Lang,
} from "./context";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);
  const dir: Dir = lang === "ar" ? "rtl" : "ltr";
  const t = dictionaries[lang];
  const site = useMemo(() => localizedSite(lang), [lang]);

  useEffect(() => {
    syncDocument(lang, t);
  }, [lang, t]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the URL still carries the choice.
    }
    const url = new URL(window.location.href);
    if (next === "en") {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "ar" ? "en" : "ar");
  }, [lang, setLang]);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, dir, t, site, setLang, toggleLang }),
    [lang, dir, t, site, setLang, toggleLang],
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="sr-only">
        {t.common.languageName}
      </div>
    </I18nContext.Provider>
  );
}
