import { CONTACT, phoneHref, whatsappHref } from '@/lib/contact';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-12">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8-4 8 4-8 4-8-4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l8 4 8-4M4 17l8 4 8-4" />
                </svg>
              </span>
              <span className="text-lg font-extrabold">{CONTACT.brandName}</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-500">
              {CONTACT.brandTagline}. אנחנו עוזרים לעסקים קטנים ובינוניים בישראל לסגור יותר עסקאות בפחות עבודה — באמצעות מערכת אחת שאוספת לידים, שיחות והודעות במקום אחד.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-300">צרו קשר</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              <li><a href={phoneHref} className="hover:text-brand-700" dir="ltr">{CONTACT.phoneHuman}</a></li>
              <li><a href={whatsappHref} target="_blank" rel="noopener" className="hover:text-brand-700">וואטסאפ</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="hover:text-brand-700">{CONTACT.email}</a></li>
              <li className="text-ink-500">{CONTACT.address}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-300">קישורים</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              <li><a href="#features" className="hover:text-brand-700">יתרונות</a></li>
              <li><a href="#how" className="hover:text-brand-700">איך זה עובד</a></li>
              <li><a href="#faq" className="hover:text-brand-700">שאלות נפוצות</a></li>
              <li><a href="#lead" className="hover:text-brand-700">צרו קשר</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {CONTACT.brandName}. כל הזכויות שמורות.</p>
          <p>נבנה באהבה על ידי Simple Solution.</p>
        </div>
      </div>
    </footer>
  );
}
