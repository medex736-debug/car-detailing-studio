import { renderToString } from "react-dom/server";

import App from "./App";
import { LanguageProvider } from "./i18n";

/**
 * Build-time pre-render entry. Renders the default (Arabic, RTL) page so that
 * crawlers that do not execute JavaScript receive the real h1, sections, FAQ
 * and NAP text in dist/index.html. The client still boots normally and can
 * switch to English via ?lang=en / localStorage.
 */
export function render(): string {
  return renderToString(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );
}
