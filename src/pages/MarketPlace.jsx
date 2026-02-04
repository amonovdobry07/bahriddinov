import React, { useMemo, useState } from "react";
import "../assets/styles/MarketPlace.scss";

import wbLogo from "../assets/market/wb.png";
import ozonLogo from "../assets/market/ozon.png";
import yandexLogo from "../assets/market/yandex.png";
import uzumLogo from "../assets/market/uzum.png";

export default function MarketplaceSection() {
  const markets = useMemo(
    () => [
      {
        key: "wb",
        name: "Wildberries",
        desc: "Ko‘p buyurtma qilinadigan",
        logo: wbLogo,
        accent: "#a24cff",
        rating: "4.8",
        delivery: "1–3 kun",
        pay: "Karta / Naqd",
        link: "#",
      },
      {
        key: "ozon",
        name: "Ozon",
        desc: "Aksiya tez-tez bo‘ladi",
        logo: ozonLogo,
        accent: "#2b7cff",
        rating: "4.7",
        delivery: "2–4 kun",
        pay: "Karta / Bo‘lib",
        link: "#",
      },
      {
        key: "yandex",
        name: "Yandex Market",
        desc: "Eng tez yetkazish",
        logo: yandexLogo,
        accent: "#ff3b30",
        rating: "4.6",
        delivery: "1–2 kun",
        pay: "Karta",
        link: "#",
      },
      {
        key: "uzum",
        name: "Uzum Market",
        desc: "Narx qulay",
        logo: uzumLogo,
        accent: "#7c3aed",
        rating: "4.9",
        delivery: "1–3 kun",
        pay: "Karta / Bo‘lib",
        link: "#",
      },
    ],
    []
  );

  const [active, setActive] = useState(markets[0].key);
  const current = markets.find((m) => m.key === active) || markets[0];

  return (
    <section className="mpPro" id="marketplace">
      <div className="container mpPro__container">
        {/* Header */}
        <div className="mpPro__head">
          <div className="mpPro__eyebrow">MARKETPLACES</div>
          <h2 className="mpPro__title">Qayerda qulay bo‘lsa, o‘sha yerda xarid qiling</h2>
          <p className="mpPro__sub">
            Yetkazish, to‘lov va reytingni tez solishtiring. Keyin 1 klik bilan marketplace’ga o‘ting.
          </p>
        </div>

        {/* Body */}
        <div className="mpPro__grid">
          {/* Left list */}
          <aside className="mpPro__list" role="tablist" aria-label="Marketplaces">
            {markets.map((m) => {
              const isActive = m.key === active;
              return (
                <button
                  key={m.key}
                  type="button"
                  className={`mpPro__item ${isActive ? "is-active" : ""}`}
                  style={isActive ? { ["--accent"]: m.accent } : undefined}
                  onClick={() => setActive(m.key)}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className="mpPro__logoBox" aria-hidden="true">
                    <img className="mpPro__logo" src={m.logo} alt="" />
                  </span>

                  <span className="mpPro__meta">
                    <span className="mpPro__name">{m.name}</span>
                    <span className="mpPro__desc">{m.desc}</span>
                  </span>

                  <span className="mpPro__chev" aria-hidden="true">›</span>
                </button>
              );
            })}
          </aside>

          {/* Right panel */}
          <div className="mpPro__panel" style={{ ["--accent"]: current.accent }}>
            <div className="mpPro__panelTop">
              <div>
                <div className="mpPro__panelLabel">Tanlangan marketplace</div>
                <div className="mpPro__panelTitle">{current.name}</div>
              </div>

              <span className="mpPro__badge">{current.desc}</span>
            </div>

            <div className="mpPro__stats">
              <div className="mpPro__stat">
                <div className="mpPro__k">Reyting</div>
                <div className="mpPro__v">{current.rating}</div>
              </div>
              <div className="mpPro__stat">
                <div className="mpPro__k">Yetkazish</div>
                <div className="mpPro__v">{current.delivery}</div>
              </div>
              <div className="mpPro__stat">
                <div className="mpPro__k">To‘lov</div>
                <div className="mpPro__v">{current.pay}</div>
              </div>
            </div>

            <div className="mpPro__actions">
              <a className="mpPro__btn mpPro__btn--primary" href={current.link}>
                Marketplace’da ochish
              </a>
              <button
                className="mpPro__btn"
                type="button"
                onClick={() => navigator.clipboard?.writeText(current.link)}
              >
                Linkni nusxalash
              </button>
            </div>

            <div className="mpPro__note">
              Bu bo‘lim “xizmatlar” sahifangizdagi toza card uslubiga mos: oq fon, yumshoq border, accent faqat kerakli joyda.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
