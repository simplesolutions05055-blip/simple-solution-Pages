import { CONTACT, phoneHref } from '@/lib/contact';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100/80 bg-white/80 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8-4 8 4-8 4-8-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l8 4 8-4M4 17l8 4 8-4" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight">{CONTACT.brandName}</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink-700 md:flex">
          <a href="#features" className="hover:text-brand-700">יתרונות</a>
          <a href="#how" className="hover:text-brand-700">איך זה עובד</a>
          <a href="#faq" className="hover:text-brand-700">שאלות נפוצות</a>
          <a href="#lead" className="hover:text-brand-700">צור קשר</a>
        </nav>

        <div className="flex items-center gap-2">
          <a href={phoneHref} className="hidden text-sm font-semibold text-ink-700 hover:text-brand-700 sm:inline">
            {CONTACT.phoneHuman}
          </a>
          <a href="#lead" className="btn-primary !px-5 !py-2 text-sm">
            דברו איתי
          </a>
        </div>
      </div>
    </header>
  );
}
