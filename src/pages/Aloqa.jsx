import React, { useMemo, useState } from "react";
import "../assets/styles/Aloqa.scss";

const CONTACT = {
  title: "Aloqa",
  desc: "Savolingiz bormi yoki buyurtma bermoqchimisiz? Formani to‘ldiring, xabar Gmail orqali tayyor holatda ochiladi.",
  // gmailga yuboriladigan email:
  toEmail: "igugufugigugu@gmail.com",
  info: {
    phone: "+998 97 282 29 02",
    email: "igugufugigugu@gmail.com",
    telegram: "@uzbsdd",
    address: "Buxoro, (lokatsiyani keyin o'zgartirasan)",
  },
  mapEmbedUrl: "https://www.google.com/maps?q=Bukhara&output=embed",
};

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(v).trim());
const isPhone = (v) => String(v).replace(/[^\d]/g, "").length >= 9;

export default function Aloqa() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Ism-familiya majburiy.";
    if (!form.phone.trim()) e.phone = "Telefon majburiy.";
    else if (!isPhone(form.phone)) e.phone = "Telefon noto‘g‘ri ko‘rinishda.";
    if (!form.email.trim()) e.email = "Email majburiy.";
    else if (!isEmail(form.email)) e.email = "Email noto‘g‘ri ko‘rinishda.";
    if (!form.subject.trim()) e.subject = "Mavzu majburiy.";
    if (!form.message.trim()) e.message = "Xabar yozing.";
    else if (form.message.trim().length < 10)
      e.message = "Xabar kamida 10 ta belgi bo‘lsin.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  const onChange = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));
  const onBlur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  // ✅ Gmail compose link (siz bergan formatda)
  const buildGmailComposeUrl = (data) => {
    const subject = `[Sayt] ${data.subject}`;
    const body = [
      `Ism: ${data.fullName}`,
      `Telefon: ${data.phone}`,
      `Email: ${data.email}`,
      "",
      "Xabar:",
      data.message,
    ].join("\n");

    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: CONTACT.toEmail,
      su: subject,
      body: body,
    });

    return `https://mail.google.com/mail/?${params.toString()}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // hammasini touched qilamiz
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      subject: true,
      message: true,
    });

    // ✅ MUHIM: shu yerda real-time tekshiruv qilamiz (statega suyanmaymiz)
    const liveErrors = {};
    if (!form.fullName.trim()) liveErrors.fullName = "Ism-familiya majburiy.";
    if (!form.phone.trim()) liveErrors.phone = "Telefon majburiy.";
    else if (!isPhone(form.phone))
      liveErrors.phone = "Telefon noto‘g‘ri ko‘rinishda.";
    if (!form.email.trim()) liveErrors.email = "Email majburiy.";
    else if (!isEmail(form.email))
      liveErrors.email = "Email noto‘g‘ri ko‘rinishda.";
    if (!form.subject.trim()) liveErrors.subject = "Mavzu majburiy.";
    if (!form.message.trim()) liveErrors.message = "Xabar yozing.";
    else if (form.message.trim().length < 10)
      liveErrors.message = "Xabar kamida 10 ta belgi bo‘lsin.";

    if (Object.keys(liveErrors).length > 0) return;

    // ✅ inputdagi malumotlar bilan gmail url yasaymiz
    const gmailUrl = buildGmailComposeUrl(form);

    // ✅ shu click event ichida ochiladi (popup blok bo‘lmaydi)
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    // xohlasang tozalash
    setForm({ fullName: "", phone: "", email: "", subject: "", message: "" });
    setTouched({});
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        {/* Header */}
        <div className="contact__header">
          <h2 className="contact__title">{CONTACT.title}</h2>
          <p className="contact__desc">{CONTACT.desc}</p>
        </div>

        <div className="contact__grid">
          {/* Left info */}
          <aside className="contact__info">
            <a
              className="info-card"
              href={`tel:${CONTACT.info.phone.replace(/\s/g, "")}`}
            >
              <div className="info-card__icon" aria-hidden="true">
                <PhoneIcon />
              </div>
              <div className="info-card__text">
                <div className="info-card__label">Telefon</div>
                <div className="info-card__value">{CONTACT.info.phone}</div>
              </div>
              <span className="info-card__chev" aria-hidden="true">
                ›
              </span>
            </a>

            {/* ✅ Oddiy mailto emas, gmail compose qilib ham qoldirdik */}
            <a
              className="info-card"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.info.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <div className="info-card__icon" aria-hidden="true">
                <MailIcon />
              </div>
              <div className="info-card__text">
                <div className="info-card__label">Email</div>
                <div className="info-card__value">{CONTACT.info.email}</div>
              </div>
              <span className="info-card__chev" aria-hidden="true">
                ›
              </span>
            </a>

            <a
              className="info-card"
              href={`https://t.me/${CONTACT.info.telegram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="info-card__icon" aria-hidden="true">
                <TelegramIcon />
              </div>
              <div className="info-card__text">
                <div className="info-card__label">Telegram</div>
                <div className="info-card__value">{CONTACT.info.telegram}</div>
              </div>
              <span className="info-card__chev" aria-hidden="true">
                ›
              </span>
            </a>

            <div className="info-card info-card--static">
              <div className="info-card__icon" aria-hidden="true">
                <PinIcon />
              </div>
              <div className="info-card__text">
                <div className="info-card__label">Manzil</div>
                <div className="info-card__value">{CONTACT.info.address}</div>
              </div>
            </div>

            <div className="contact__map">
              <iframe
                src={CONTACT.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              />
            </div>
          </aside>

          {/* Right form */}
          <div className="contact__form">
            <div className="contact__formHead">
              <h3 className="contact__formTitle">Xabar yozish</h3>
              <p className="contact__formSub">
                “Yuborish” bosilganda Gmail ochiladi va xabar tayyor bo‘ladi.
              </p>
            </div>

            <form onSubmit={onSubmit}>
              <div className="form-grid">
                <Field
                  label="Ism familiya"
                  placeholder="Masalan: Umidjon Bahramov"
                  value={form.fullName}
                  onChange={onChange("fullName")}
                  onBlur={onBlur("fullName")}
                  error={touched.fullName ? errors.fullName : ""}
                />
                <Field
                  label="Telefon"
                  placeholder="+998 90 123 45 67"
                  value={form.phone}
                  onChange={onChange("phone")}
                  onBlur={onBlur("phone")}
                  error={touched.phone ? errors.phone : ""}
                />
                <Field
                  label="Email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={onChange("email")}
                  onBlur={onBlur("email")}
                  error={touched.email ? errors.email : ""}
                />
                <Field
                  label="Mavzu"
                  placeholder="Masalan: Darvoza buyurtmasi"
                  value={form.subject}
                  onChange={onChange("subject")}
                  onBlur={onBlur("subject")}
                  error={touched.subject ? errors.subject : ""}
                />

                <div
                  className={`form-field full ${touched.message && errors.message ? "is-error" : ""}`}
                >
                  <label>Xabar</label>
                  <textarea
                    placeholder="Nima kerak, o‘lcham, muddat... qisqacha yozing"
                    value={form.message}
                    onChange={onChange("message")}
                    onBlur={onBlur("message")}
                    rows={6}
                  />
                  {touched.message && errors.message ? (
                    <div className="field-error">{errors.message}</div>
                  ) : (
                    <div className="field-hint">
                      {form.message.trim().length}/500
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button
                  className="btn-submit"
                  type="submit"
                  disabled={!canSubmit}
                >
                  <SendIcon />
                  Yuborish
                </button>

                <button
                  className="btn-ghost"
                  type="button"
                  onClick={() => {
                    setForm({
                      fullName: "",
                      phone: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                    setTouched({});
                  }}
                >
                  Tozalash
                </button>
              </div>

              {/* (ixtiyoriy) Yuborishdan oldin foydalanuvchi Gmail linkni ham ko‘rsin */}
              {/* <a className="mini-link" href={buildGmailComposeUrl()} target="_blank" rel="noopener noreferrer">
                Gmail’da ochish
              </a> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, value, onChange, onBlur, error }) {
  return (
    <div className={`form-field ${error ? "is-error" : ""}`}>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <div className="field-error">{error}</div> : null}
    </div>
  );
}

/* --- Icons (inline, libsiz) --- */
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path
      d="M7 3h4l2 5-3 2c1 2 3 4 5 5l2-3 5 2v4c0 1-1 2-2 2-9 0-16-7-16-16 0-1 1-2 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="m4 7 8 6 8-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path
      d="M21 5 3.5 11.7c-.9.3-.9 1.6 0 1.9l4.5 1.5 1.7 5.1c.2.7 1.1.9 1.7.4l2.6-2.2 4.7 3.4c.7.5 1.7.1 1.9-.8L23 6.5c.2-1.1-.9-2-2-1.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M8 15.1 19.5 7.2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path
      d="M12 21s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path
      d="M22 2 11 13"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M22 2 15 22l-4-9-9-4 20-7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);
