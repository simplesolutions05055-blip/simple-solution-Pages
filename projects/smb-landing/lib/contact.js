export const CONTACT = {
  brandName: 'סימפל סולושן',
  brandTagline: 'מערכת אחת לכל הלידים שלך',
  phoneHuman: '050-000-0000',
  phoneIntl: '+972500000000',
  whatsappIntl: '972500000000',
  whatsappMessage: 'היי, ראיתי את הדף נחיתה ואני רוצה לשמוע פרטים על המערכת',
  email: 'hello@example.co.il',
  address: 'רחוב הברזל 12, תל אביב',
};

export const phoneHref = `tel:${CONTACT.phoneIntl}`;
export const whatsappHref = `https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(
  CONTACT.whatsappMessage,
)}`;
