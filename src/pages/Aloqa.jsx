import React, { useMemo, useState } from "react";
import "../assets/styles/Aloqa.scss";
import { useTranslation } from "react-i18next";

const CONTACT = {
  // matnlar endi i18n’da, bu yerda faqat data:
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
  const { t } = useTranslation();

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
    if (!form.fullName.trim()) e.fullName = t("contact.errors.fullNameRequired");
    if (!form.phone.trim()) e.phone = t("contact.errors.phoneRequired");
    else if (!isPhone(form.phone)) e.phone = t("contact.errors.phoneInvalid");

    if (!form.email.trim()) e.email = t("contact.errors.emailRequired");
    else if (!isEmail(form.email)) e.email = t("contact.errors.emailInvalid");

    if (!form.subject.trim()) e.subject = t("contact.errors.subjectRequired");

    if (!form.message.trim()) e.message = t("contact.errors.messageRequired");
    else if (form.message.trim().length < 10)
      e.message = t("contact.errors.messageMin", { count: 10 });

    return e;
  }, [form, t]);

  const canSubmit = Object.keys(errors).length === 0;

  const onChange = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));
  const onBlur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  // Gmail compose link
  const buildGmailComposeUrl = (data) => {
    const subject = t("contact.gmail.subjectPrefix", { subject: data.subject }); // masalan: [Sayt] {subject}
    const body = [
      t("contact.gmail.body.fullName", { value: data.fullName }),
      t("contact.gmail.body.phone", { value: data.phone }),
      t("contact.gmail.body.email", { value: data.email }),
      "",
      t("contact.gmail.body.messageLabel"),
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

    setTouched({
      fullName: true,
      phone: true,
      email: true,
      subject: true,
      message: true,
    });

    // live validate
    const liveErrors = {};
    if (!form.fullName.trim()) liveErrors.fullName = true;
    if (!form.phone.trim()) liveErrors.phone = true;
    else if (!isPhone(form.phone)) liveErrors.phone = true;

    if (!form.email.trim()) liveErrors.email = true;
    else if (!isEmail(form.email)) liveErrors.email = true;

    if (!form.subject.trim()) liveErrors.subject = true;

    if (!form.message.trim()) liveErrors.message = true;
    else if (form.message.trim().length < 10) liveErrors.message = true;

    if (Object.keys(liveErrors).length > 0) return;

    const gmailUrl = buildGmailComposeUrl(form);
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    setForm({ fullName: "", phone: "", email: "", subject: "", message: "" });
    setTouched({});
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        {/* Header */}
        <div className="contact__header">
          <h2 className="contact__title">{t("contact.title")}</h2>
          <p className="contact__desc">{t("contact.desc")}</p>
        </div>

        <div className="contact__grid">
          {/* Left info */}
          <aside className="contact__info">
            <a className="info-card" href={`tel:${CONTACT.info.phone.replace(/\s/g, "")}`}>
              <div className="info-card__icon" aria-hidden="true"><PhoneIcon /></div>
              <div className="info-card__text">
                <div className="info-card__label">{t("contact.labels.phone")}</div>
                <div className="info-card__value">{CONTACT.info.phone}</div>
              </div>
              <span className="info-card__chev" aria-hidden="true">›</span>
            </a>

            {/* Gmail compose */}
            <a
              className="info-card"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.info.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("contact.labels.email")}
            >
              <div className="info-card__icon" aria-hidden="true"><MailIcon /></div>
              <div className="info-card__text">
                <div className="info-card__label">{t("contact.labels.email")}</div>
                <div className="info-card__value">{CONTACT.info.email}</div>
              </div>
              <span className="info-card__chev" aria-hidden="true">›</span>
            </a>

            <a
              className="info-card"
              href={`https://t.me/${CONTACT.info.telegram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="info-card__icon" aria-hidden="true"><TelegramIcon /></div>
              <div className="info-card__text">
                <div className="info-card__label">{t("contact.labels.telegram")}</div>
                <div className="info-card__value">{CONTACT.info.telegram}</div>
              </div>
              <span className="info-card__chev" aria-hidden="true">›</span>
            </a>

            <div className="info-card info-card--static">
              <div className="info-card__icon" aria-hidden="true"><PinIcon /></div>
              <div className="info-card__text">
                <div className="info-card__label">{t("contact.labels.address")}</div>
                <div className="info-card__value">{CONTACT.info.address}</div>
              </div>
            </div>

            <div className="contact__map">
              <iframe
                src={CONTACT.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("contact.mapTitle")}
              />
            </div>
          </aside>

          {/* Right form */}
          <div className="contact__form">
            <div className="contact__formHead">
              <h3 className="contact__formTitle">{t("contact.form.title")}</h3>
              <p className="contact__formSub">{t("contact.form.sub")}</p>
            </div>

            <form onSubmit={onSubmit}>
              <div className="form-grid">
                <Field
                  label={t("contact.form.fullName.label")}
                  placeholder={t("contact.form.fullName.ph")}
                  value={form.fullName}
                  onChange={onChange("fullName")}
                  onBlur={onBlur("fullName")}
                  error={touched.fullName ? errors.fullName : ""}
                />

                <Field
                  label={t("contact.form.phone.label")}
                  placeholder={t("contact.form.phone.ph")}
                  value={form.phone}
                  onChange={onChange("phone")}
                  onBlur={onBlur("phone")}
                  error={touched.phone ? errors.phone : ""}
                />

                <Field
                  label={t("contact.form.email.label")}
                  placeholder={t("contact.form.email.ph")}
                  value={form.email}
                  onChange={onChange("email")}
                  onBlur={onBlur("email")}
                  error={touched.email ? errors.email : ""}
                />

                <Field
                  label={t("contact.form.subject.label")}
                  placeholder={t("contact.form.subject.ph")}
                  value={form.subject}
                  onChange={onChange("subject")}
                  onBlur={onBlur("subject")}
                  error={touched.subject ? errors.subject : ""}
                />

                <div className={`form-field full ${touched.message && errors.message ? "is-error" : ""}`}>
                  <label>{t("contact.form.message.label")}</label>
                  <textarea
                    placeholder={t("contact.form.message.ph")}
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
                <button className="btn-submit" type="submit" disabled={!canSubmit}>
                  <SendIcon />
                  {t("contact.form.send")}
                </button>

                <button
                  className="btn-ghost"
                  type="button"
                  onClick={() => {
                    setForm({ fullName: "", phone: "", email: "", subject: "", message: "" });
                    setTouched({});
                  }}
                >
                  {t("contact.form.clear")}
                </button>
              </div>
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
      <input placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} />
      {error ? <div className="field-error">{error}</div> : null}
    </div>
  );
}

/* --- Icons (inline, libsiz) --- */
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M7 3h4l2 5-3 2c1 2 3 4 5 5l2-3 5 2v4c0 1-1 2-2 2-9 0-16-7-16-16 0-1 1-2 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M21 5 3.5 11.7c-.9.3-.9 1.6 0 1.9l4.5 1.5 1.7 5.1c.2.7 1.1.9 1.7.4l2.6-2.2 4.7 3.4c.7.5 1.7.1 1.9-.8L23 6.5c.2-1.1-.9-2-2-1.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M8 15.1 19.5 7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M12 21s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M22 2 11 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);
