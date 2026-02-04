import { useMemo, useState } from "react";
import "../../assets/styles/Xizmatlar.scss";
import gate1 from "../assets/services/gate-before.jpg"
import gate2 from "../assets/services/gate-after.jpg"
import gril1 from "../assets/services/gril-before.jpg"
import gril2 from "../assets/services/gril-after.jpg"
import tamirlash1 from "../assets/services/tamirlash-1.jpg"
import tamirlash2 from "../assets/services/tamirlash-2.jpg"

const CASES = [
  {
    id: "c1",
    title: "Darvoza",
    before: {
      title: "Eski darvoza: xavfsiz emas",
      points: ["Qiya turadi", "Qulfi yomon", "Ko‘rinishi eskirgan", "Payvand joyi bo‘shagan"],
      image: gate1,
    },
    after: {
      title: "Yangi darvoza: mustahkam va chiroyli",
      points: ["Aniq o‘lcham", "Mustahkam karkas", "Chiroyli dizayn", "Silliq ochilib-yopiladi"],
      image: gate2,
    },
    priceHint: "Narx: o‘lcham va dizaynga bog‘liq",
    timeHint: "Muddat: kelishuv asosida",
  },
  {
    id: "c2",
    title: "Roshutka",
    before: {
      title: "Oyna xavfsizligi past",
      points: ["Xavfsizlik yetarli emas", "O‘lcham mos emas", "Zang bosgan", "Ko‘rinishi yoqimsiz"],
      image: gril1,
    },
    after: {
      title: "Roshutka: xavfsiz + ixcham",
      points: ["Individual o‘lcham", "Sifatli payvand", "Bo‘yoq/ishlov", "Montaj bilan"],
      image: gril2,
    },
    priceHint: "Narx: panjara turi + o‘lcham",
    timeHint: "Muddat: tez tayyorlanadi",
  },
  {
    id: "c3",
    title: "Ta’mirlash",
    before: {
      title: "Eski buyum yaroqsiz bo‘lib qolgan",
      points: ["Payvand ajragan", "Zang bosgan", "Qiyshaygan", "Bo‘yoq ko‘chgan"],
      image: tamirlash1
    },
    after: {
      title: "Qayta tiklash: yangidek ko‘rinish",
      points: ["Diagnostika", "Ta’mirlash", "Mustahkamlash", "Qayta bo‘yash"],
      image: tamirlash2,
    },
    priceHint: "Narx: holati va ish hajmi",
    timeHint: "Muddat: ish turiga qarab",
  },
];

const STORIES = [
  {
    id: "st1",
    title: "Aloqa",
    text: "Telegramga rasm yoki video yuborasiz. Qisqacha nima kerakligini yozasiz.",
  },
  {
    id: "st2",
    title: "O‘lchov & baholash",
    text: "O‘lchamni aniqlaymiz (kerak bo‘lsa kelib ko‘ramiz). Material va dizayn bo‘yicha maslahat beramiz.",
  },
  {
    id: "st3",
    title: "Ishlab chiqarish",
    text: "Payvand, ishlov, tekshiruv: har bosqich nazorat bilan.",
  },
  {
    id: "st4",
    title: "Montaj & yakun",
    text: "O‘rnatib beramiz va yakuniy tekshiruv qilamiz. Mijoz rozi bo‘lsa topshiriladi.",
  },
];

const FAQ = [
  {
    q: "Narxni qanday bilaman?",
    a: "Telegramga rasm/video yuboring. O‘lcham va dizayn bo‘yicha tez baho beramiz. Aniq narx o‘lchovdan keyin aytiladi.",
  },
  {
    q: "Qaysi hududlarga borasiz?",
    a: "Kelishuv asosida. Manzilga qarab o‘lchov va montaj masalasi hal qilinadi.",
  },
  {
    q: "Bo‘yash/ishlov ham qilasizmi?",
    a: "Ha. Ish turi va buyumga qarab bo‘yash va yakuniy ishlov beriladi.",
  },
];

const Xizmatlar = () => {
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
            <div className="baHero__pill">Xizmatlar</div>
            <h1 className="baHero__title">
              Biz tushuntirib charchamaymiz  Ko‘rsatamiz.
            </h1>
            <p className="baHero__sub">
              “Menda muammo bor” degan joydan boshlaymiz. Pastda oldin va keyin holatlarni ko‘ring.
            </p>
          </div>

          <div className="baHero__tabs">
            {CASES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCase(c.id)}
                className={c.id === activeCase ? "baTab baTab--active" : "baTab"}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className="baHero__grid">
            {/* BEFORE */}
            <div className="baCard baCard--before">
              <div className="baCard__top">
                <div className="baMetaL">Muammo</div>
                <div className="baMetaR">{current.timeHint}</div>
              </div>

              <div className="baCard__media">
                <div className="baLabel baLabel--bad">Muammo</div>
                <img
                  src={current.before.image}
                  alt={`${current.title} oldin`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add("is-fallback");
                  }}
                />
                <div className="baFallback">
                  <div className="baFallback__t">{current.title} — oldin</div>
                  <div className="baFallback__p">Namuna rasm qo‘ying: <b>gate-before.jpg</b></div>
                </div>
              </div>

              <h3 className="baCard__title">{current.before.title}</h3>
              <ul className="baCard__list">
                {current.before.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>

            {/* AFTER */}
            <div className="baCard baCard--after">
              <div className="baCard__top">
                <div className="baMetaL">Yechim</div>
                <div className="baMetaR">{current.priceHint}</div>
              </div>

              <div className="baCard__media">
                <div className="baLabel baLabel--good">Yechim</div>
                <img
                  src={current.after.image}
                  alt={`${current.title} keyin`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add("is-fallback");
                  }}
                />
                <div className="baFallback">
                  <div className="baFallback__t">{current.title} — keyin</div>
                  <div className="baFallback__p">Namuna rasm qo‘ying: <b>gate-after.jpg</b></div>
                </div>
              </div>

              <h3 className="baCard__title">{current.after.title}</h3>
              <ul className="baCard__list">
                {current.after.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="baHero__note">
            Tez baho uchun Telegramga <b>1 ta rasm</b> + <b>taxminiy o‘lcham</b> yuboring.
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="storyLine">
        <div className="storyLine__container">
          <div className="sectionHead2">
            <h2>Qanday ishlaymiz?</h2>
            <p>4 qadam: qisqa va tushunarli.</p>
          </div>

          <div className="storyCards">
            {STORIES.map((s, idx) => (
              <div key={s.id} className="storyCard" style={{ animationDelay: `${idx * 60}ms` }}>
               
                <div className="storyCard__title">{s.title}</div>
                <div className="storyCard__text">{s.text}</div>
              </div>
            ))}
          </div>

          <div className="storyCta">
            <div>
              <h3>Muammoingizni ayting, yechimni ko‘rsatamiz.</h3>
              <p>Rasm/video yuboring. Qolganini biz hal qilamiz.</p>
            </div>
            <div className="storyCta__btns">
              <a className="baBtn baBtn--primary" href="https://t.me/uzbsdd" target="_blank" rel="noreferrer">
                Telegramdan yozish
              </a>
              <a className="baBtn baBtn--ghost" href="/products">
                Mahsulotlar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="baFaq">
        <div className="baFaq__container">
          <div className="sectionHead2">
            <h2>FAQ</h2>
            <p>Ko‘p so‘raladigan savollar.</p>
          </div>

          <div className="baFaq__list">
            {FAQ.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div key={item.q} className={open ? "faqRow faqRow--open" : "faqRow"}>
                  <button
                    type="button"
                    className="faqRow__q"
                    onClick={() => setOpenFaq(open ? -1 : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="faqRow__icon">{open ? "−" : "+"}</span>
                  </button>
                  <div className="faqRow__a">
                    <div className="faqRow__aIn">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Xizmatlar;
