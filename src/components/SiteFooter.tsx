export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-4 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Sameer Kulkarni</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a className="hover:underline" href="https://github.com/cricketsamya" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="hover:underline" href="https://medium.com/@cricketsamya" target="_blank" rel="noreferrer">
              Medium
            </a>
            <a
              className="hover:underline"
              href="https://www.linkedin.com/in/sameerkulkarni30/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a className="hover:underline" href="mailto:mail@sameerkulkarni.de">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

