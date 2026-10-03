import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
];

export function Nav() {
  const scrolled = useScrollPosition(24);
  const [open, setOpen] = useState(false);

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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8"
      >
        <a
          href="#top"
          className="flex min-h-[44px] flex-col items-center justify-center gap-1.5"
          aria-label={`${site.name} — back to top`}
        >
          <span className="text-base font-medium leading-none text-foreground">
            {site.name}
          </span>
          <span
            className="block h-px w-full bg-gold"
            aria-hidden="true"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="outline" size="sm" className="min-h-[44px] px-4 text-sm">
            <a href="#booking">Book a detail</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:text-gold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background px-6 pb-10 pt-6 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center font-display text-2xl text-foreground transition-colors hover:text-gold sm:text-3xl"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <Button asChild className="w-full">
                <a href="#booking" onClick={() => setOpen(false)}>
                  Book a detail
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}