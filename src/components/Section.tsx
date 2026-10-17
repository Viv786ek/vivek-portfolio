export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}
