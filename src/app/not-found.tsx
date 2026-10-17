import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-sm text-ember">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">This route didn&apos;t survive production.</h1>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-fg px-5 py-3 text-sm font-medium text-bg">Back home</Link>
      </div>
    </main>
  );
}
