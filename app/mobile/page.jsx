const PAGE_OPTIONS = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'projects', label: 'Projects', path: '/projects' },
  { key: 'university', label: 'University', path: '/university' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'contact', label: 'Contact', path: '/contact' }
];

export const metadata = {
  title: 'Mobile Preview - Vittorio\'s Website'
};

export default async function MobilePreviewPage({ searchParams }) {
  const params = await searchParams;
  const selectedKey = PAGE_OPTIONS.some((page) => page.key === params?.page) ? params.page : 'home';
  const selectedPage = PAGE_OPTIONS.find((page) => page.key === selectedKey) ?? PAGE_OPTIONS[0];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <section className="max-w-xl">
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-teal-300">Preview</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Mobile View</h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
            This is a live phone-frame preview of the current Next.js site. Switch pages here instead of opening browser
            device tools every time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {PAGE_OPTIONS.map((page) => {
              const active = page.key === selectedPage.key;
              return (
                <a
                  key={page.key}
                  href={`/mobile?page=${page.key}`}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? 'border-teal-400 bg-teal-400 text-slate-950'
                      : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  {page.label}
                </a>
              );
            })}
          </div>
          <div className="mt-6 text-sm text-slate-400">
            <a className="underline decoration-slate-600 underline-offset-4" href={selectedPage.path} target="_blank" rel="noreferrer">
              Open {selectedPage.label} in a full tab
            </a>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[430px]">
          <div className="rounded-[2.75rem] border border-slate-700 bg-slate-900 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.55)]">
            <div className="mb-3 flex justify-center">
              <div className="h-7 w-32 rounded-full bg-slate-800" />
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-white">
              <iframe
                key={selectedPage.path}
                src={selectedPage.path}
                title={`${selectedPage.label} mobile preview`}
                className="h-[844px] w-full border-0"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
