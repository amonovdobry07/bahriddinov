import { useMemo, useState } from "react";
import "../../assets/styles/Xizmatlar.scss";
import gate1 from "../assets/services/gate-before.jpg";
import gate2 from "../assets/services/gate-after.jpg";
import gril1 from "../assets/services/gril-before.jpg";
import gril2 from "../assets/services/gril-after.jpg";
import tamirlash1 from "../assets/services/tamirlash-1.jpg";
import tamirlash2 from "../assets/services/tamirlash-2.jpg";
import { useTranslation } from "react-i18next";

const CASES = [
  {
    id: "c1",
    titleKey: "svc.cases.c1.title",
    before: {
      titleKey: "svc.cases.c1.before.title",
      pointsKey: [
        "svc.cases.c1.before.p1",
        "svc.cases.c1.before.p2",
        "svc.cases.c1.before.p3",
        "svc.cases.c1.before.p4",
      ],
      image: gate1,
    },
    after: {
      titleKey: "svc.cases.c1.after.title",
      pointsKey: [
        "svc.cases.c1.after.p1",
        "svc.cases.c1.after.p2",
        "svc.cases.c1.after.p3",
        "svc.cases.c1.after.p4",
      ],
      image: gate2,
    },
    priceHintKey: "svc.cases.c1.priceHint",
    timeHintKey: "svc.cases.c1.timeHint",
  },
  {
    id: "c2",
    titleKey: "svc.cases.c2.title",
    before: {
      titleKey: "svc.cases.c2.before.title",
      pointsKey: [
        "svc.cases.c2.before.p1",
        "svc.cases.c2.before.p2",
        "svc.cases.c2.before.p3",
        "svc.cases.c2.before.p4",
      ],
      image: gril1,
    },
    after: {
      titleKey: "svc.cases.c2.after.title",
      pointsKey: [
        "svc.cases.c2.after.p1",
        "svc.cases.c2.after.p2",
        "svc.cases.c2.after.p3",
        "svc.cases.c2.after.p4",
      ],
      image: gril2,
    },
    priceHintKey: "svc.cases.c2.priceHint",
    timeHintKey: "svc.cases.c2.timeHint",
  },
  {
    id: "c3",
    titleKey: "svc.cases.c3.title",
    before: {
      titleKey: "svc.cases.c3.before.title",
      pointsKey: [
        "svc.cases.c3.before.p1",
        "svc.cases.c3.before.p2",
        "svc.cases.c3.before.p3",
        "svc.cases.c3.before.p4",
      ],
      image: tamirlash1,
    },
    after: {
      titleKey: "svc.cases.c3.after.title",
      pointsKey: [
        "svc.cases.c3.after.p1",
        "svc.cases.c3.after.p2",
        "svc.cases.c3.after.p3",
        "svc.cases.c3.after.p4",
      ],
      image: tamirlash2,
    },
    priceHintKey: "svc.cases.c3.priceHint",
    timeHintKey: "svc.cases.c3.timeHint",
  },
];

const STORIES = [
  { id: "st1", titleKey: "svc.story.st1.title", textKey: "svc.story.st1.text" },
  { id: "st2", titleKey: "svc.story.st2.title", textKey: "svc.story.st2.text" },
  { id: "st3", titleKey: "svc.story.st3.title", textKey: "svc.story.st3.text" },
  { id: "st4", titleKey: "svc.story.st4.title", textKey: "svc.story.st4.text" },
];

const FAQ = [
  { qKey: "svc.faq.q1.q", aKey: "svc.faq.q1.a" },
  { qKey: "svc.faq.q2.q", aKey: "svc.faq.q2.a" },
  { qKey: "svc.faq.q3.q", aKey: "svc.faq.q3.a" },
];

export default function Xizmatlar() {
  const { t } = useTranslation();

  const [activeCase, setActiveCase] = useState(CASES[0].id);
  const [openFaq, setOpenFaq] = useState(0);

  const current = useMemo(
    () => CASES.find((c) => c.id === activeCase) || CASES[0],
    [activeCase]
  );

  return (
    <div className="svcStory">
      {/* HERO: Before / After */}
      <section className="baHero">
        <div className="baHero__container">
          <div className="baHero__head">
            <div className="baHero__pill">{t("svc.hero.pill")}</div>
            <h1 className="baHero__title">{t("svc.hero.title")}</h1>
            <p className="baHero__sub">{t("svc.hero.sub")}</p>
          </div>

          <div className="baHero__tabs">
            {CASES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCase(c.id)}
                className={c.id === activeCase ? "baTab baTab--active" : "baTab"}
              >
                {t(c.titleKey)}
              </button>
            ))}
          </div>

          <div className="baHero__grid">
            {/* BEFORE */}
            <div className="baCard baCard--before">
              <div className="baCard__top">
                <div className="baMetaL">{t("svc.labels.problem")}</div>
                <div className="baMetaR">{t(current.timeHintKey)}</div>
              </div>

              <div className="baCard__media">
                <div className="baLabel baLabel--bad">{t("svc.labels.problem")}</div>
                <img
                  src={current.before.image}
                  alt={`${t(current.titleKey)} ${t("svc.alt.before")}`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add("is-fallback");
                  }}
                />
                <div className="baFallback">
                  <div className="baFallback__t">
                    {t(current.titleKey)} — {t("svc.alt.before")}
                  </div>
                  <div className="baFallback__p">
                    {t("svc.fallback")} <b>gate-before.jpg</b>
                  </div>
                </div>
              </div>

              <h3 className="baCard__title">{t(current.before.titleKey)}</h3>
              <ul className="baCard__list">
                {current.before.pointsKey.map((k) => (
                  <li key={k}>{t(k)}</li>
                ))}
              </ul>
            </div>

            {/* AFTER */}
            <div className="baCard baCard--after">
              <div className="baCard__top">
                <div className="baMetaL">{t("svc.labels.solution")}</div>
                <div className="baMetaR">{t(current.priceHintKey)}</div>
              </div>

              <div className="baCard__media">
                <div className="baLabel baLabel--good">{t("svc.labels.solution")}</div>
                <img
                  src={current.after.image}
                  alt={`${t(current.titleKey)} ${t("svc.alt.after")}`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add("is-fallback");
                  }}
                />
                <div className="baFallback">
                  <div className="baFallback__t">
                    {t(current.titleKey)} — {t("svc.alt.after")}
                  </div>
                  <div className="baFallback__p">
                    {t("svc.fallback")} <b>gate-after.jpg</b>
                  </div>
                </div>
              </div>

              <h3 className="baCard__title">{t(current.after.titleKey)}</h3>
              <ul className="baCard__list">
                {current.after.pointsKey.map((k) => (
                  <li key={k}>{t(k)}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="baHero__note">{t("svc.hero.note")}</div>
        </div>
      </section>

      {/* STORY */}
      <section className="storyLine">
        <div className="storyLine__container">
          <div className="sectionHead2">
            <h2>{t("svc.story.headTitle")}</h2>
            <p>{t("svc.story.headSub")}</p>
          </div>

          <div className="storyCards">
            {STORIES.map((s, idx) => (
              <div
                key={s.id}
                className="storyCard"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="storyCard__title">{t(s.titleKey)}</div>
                <div className="storyCard__text">{t(s.textKey)}</div>
              </div>
            ))}
          </div>

          <div className="storyCta">
            <div>
              <h3>{t("svc.cta.title")}</h3>
              <p>{t("svc.cta.sub")}</p>
            </div>
            <div className="storyCta__btns">
              <a
                className="baBtn baBtn--primary"
                href="https://t.me/uzbsdd"
                target="_blank"
                rel="noreferrer"
              >
                {t("svc.cta.btnTelegram")}
              </a>
              <a className="baBtn baBtn--ghost" href="/products">
                {t("svc.cta.btnProducts")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="baFaq">
        <div className="baFaq__container">
          <div className="sectionHead2">
            <h2>{t("svc.faq.title")}</h2>
            <p>{t("svc.faq.sub")}</p>
          </div>

          <div className="baFaq__list">
            {FAQ.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div key={item.qKey} className={open ? "faqRow faqRow--open" : "faqRow"}>
                  <button
                    type="button"
                    className="faqRow__q"
                    onClick={() => setOpenFaq(open ? -1 : idx)}
                  >
                    <span>{t(item.qKey)}</span>
                    <span className="faqRow__icon">{open ? "−" : "+"}</span>
                  </button>
                  <div className="faqRow__a">
                    <div className="faqRow__aIn">{t(item.aKey)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
