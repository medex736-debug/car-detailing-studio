interface HeroTitleProps {
  /** The real, unsplit sentence — also the accessible name of the heading. */
  text: string;
  className?: string;
  /** Stagger between words in ms. */
  step?: number;
}

/**
 * Masks each word and slides it up. Splitting is per WORD only: separating
 * Arabic letters would break the joining. The wrapper keeps the real text for
 * screen readers via aria-label while the visual spans are aria-hidden.
 */
export function HeroTitle({ text, className, step = 89 }: HeroTitleProps) {
  const words = text.split(" ").filter(Boolean);

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          <span className="hero-word-mask">
            <span
              className="hero-word"
              style={{ animationDelay: `${index * step}ms` }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
