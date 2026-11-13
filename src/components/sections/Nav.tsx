import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { cn } from "@/lib/utils";
import { assetUrl } from "@/lib/assets";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { useI18n } from "@/i18n";

const sectionIds = ["services", "portfolio", "work", "location"];

export function Nav() {
  const { t, site } = useI18n();
  const { scrolled, hidden } = useHideOnScroll(24);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: t.nav.links.services },
    { href: "#portfolio", label: t.nav.links.portfolio },
    { href: "#work", label: t.nav.links.gallery },
    { href: "#location", label: t.nav.links.location },
  ];

  // Escape closes the mobile menu; body scroll locks while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-[233ms] [transition-timing-function:var(--ease-out)]",
          hidden && !open && "-translate-y-full",
          scrolled
            ? "border-border/80 bg-background/70 backdrop-blur-[12px]"
            : "border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label={t.nav.mainLabel}
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8"
        >
          <a
            href="#top"
            className="flex min-h-[44px] items-center"
            aria-label={t.common.backToTop(site.name)}
          >
            <img
              src={assetUrl("/assets/logo-mark.png")}
              alt={site.name}
              className="h-11 w-auto object-contain"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-[var(--space-4)] md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-active={active === link.href.slice(1)}
                  aria-current={active === link.href.slice(1) ? "true" : undefined}
                  className="nav-link inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-[var(--space-2)] md:flex">
            <LanguageSwitch variant="nav" />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="min-h-[44px] px-[var(--space-3)] text-sm"
            >
              <a href="#booking">{t.common.bookNow}</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:text-gold md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile overlay */}
        {open && (
          <div
            id="mobile-menu"
            style={{ animation: "hero-item-in 233ms var(--ease-out) both" }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background/95 px-[var(--space-3)] pb-[var(--space-6)] pt-[var(--space-3)] backdrop-blur-[12px] md:hidden"
          >
            <ul className="flex flex-col gap-[var(--space-1)]">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="menu-item"
                  style={{ animationDelay: `${index * 89}ms` }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href.slice(1) ? "true" : undefined}
                    className="flex min-h-[48px] items-center font-display text-2xl text-foreground transition-colors hover:text-gold sm:text-3xl"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li
                className="menu-item pt-[var(--space-3)]"
                style={{ animationDelay: `${navLinks.length * 89}ms` }}
              >
                <LanguageSwitch variant="menu" />
              </li>
              <li
                className="menu-item pt-[var(--space-2)]"
                style={{ animationDelay: `${(navLinks.length + 1) * 89}ms` }}
              >
                <Button asChild className="w-full">
                  <a href="#booking" onClick={() => setOpen(false)}>
                    {t.common.bookNow}
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
