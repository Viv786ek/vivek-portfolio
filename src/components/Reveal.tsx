/**
 * Scroll reveal via CSS scroll-driven animations (see `.reveal` in globals.css).
 * No JavaScript, no hydration cost; browsers without support just show content.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="eyebrow mb-4">
        <span className="text-ember">{index}</span> <span className="mx-2 text-faint">/</span> {eyebrow}
      </p>
      <h2 className="text-gradient text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h2>
      {lede ? <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lede}</p> : null}
    </Reveal>
  );
}
