import { CONTACT, phoneHref, whatsappHref } from '@/lib/contact';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener"
        aria-label="שלחו וואטסאפ"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-glow transition hover:scale-105 hover:bg-emerald-600"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-40" aria-hidden="true" />
        <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="currentColor">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.582-5.946C.165 5.335 5.503 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.55-5.34 11.887-11.893 11.887a11.9 11.9 0 01-5.688-1.45L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.683 5.595l-.999 3.648 3.805-.942zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.474-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        <span className="pointer-events-none absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
          שלחו וואטסאפ
        </span>
      </a>

      <a
        href={phoneHref}
        aria-label={`חיוג: ${CONTACT.phoneHuman}`}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white shadow-glow transition hover:scale-105 hover:bg-brand-700"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
        </svg>
        <span className="pointer-events-none absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
          {CONTACT.phoneHuman}
        </span>
      </a>
    </div>
  );
}
