import Link from "next/link";

export default function RootRedirectPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var lang = (navigator.language || '').toLowerCase();
                var target = lang.startsWith('en') ? '/en/' : '/id/';
                window.location.replace(target);
              } catch (e) {
                window.location.href = '/id/';
              }
            })();
          `,
        }}
      />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/id/" />
      </noscript>
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4 rounded-xl border border-border bg-surface p-8 shadow-sm">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-ink">
            Timur Dian Radha Sejati
          </h1>
          <p className="text-sm text-ink-muted">
            Mengarahkan ke portofolio / Redirecting to portfolio...
          </p>
          <div className="flex justify-center gap-4 pt-2 text-sm font-medium">
            <Link
              href="/id"
              className="px-4 py-2 rounded-lg bg-cobalt text-white hover:bg-cobalt-hover transition-colors"
            >
              Bahasa Indonesia
            </Link>
            <Link
              href="/en"
              className="px-4 py-2 rounded-lg border border-border bg-surface text-ink hover:text-cobalt transition-colors"
            >
              English
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
