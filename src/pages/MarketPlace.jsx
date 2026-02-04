import React, { useMemo, useState } from "react";
import "../assets/styles/MarketPlace.scss";
import { useTranslation } from "react-i18next";

import wbLogo from "../assets/market/wb.png";
import ozonLogo from "../assets/market/ozon.png";
import yandexLogo from "../assets/market/yandex.png";
import uzumLogo from "../assets/market/uzum.png";

export default function MarketplaceSection() {
  const { t } = useTranslation();

  const markets = useMemo(
    () => [
      {
        key: "wb",
        name: "Wildberries",
        descKey: "mp.wb.desc",
        logo: wbLogo,
        accent: "#a24cff",
        rating: "4.8",
        deliveryKey: "mp.delivery.1_3",
        payKey: "mp.pay.card_cash",
        link: "#",
      },
      {
        key: "ozon",
        name: "Ozon",
        descKey: "mp.ozon.desc",
        logo: ozonLogo,
        accent: "#2b7cff",
        rating: "4.7",
        deliveryKey: "mp.delivery.2_4",
        payKey: "mp.pay.card_installment",
        link: "#",
      },
      {
        key: "yandex",
        name: "Yandex Market",
        descKey: "mp.yandex.desc",
        logo: yandexLogo,
        accent: "#ff3b30",
        rating: "4.6",
        deliveryKey: "mp.delivery.1_2",
        payKey: "mp.pay.card",
        link: "#",
      },
      {
        key: "uzum",
        name: "Uzum Market",
        descKey: "mp.uzum.desc",
        logo: uzumLogo,
        accent: "#7c3aed",
        rating: "4.9",
        deliveryKey: "mp.delivery.1_3",
        payKey: "mp.pay.card_installment",
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
          <div className="mpPro__eyebrow">{t("mp.eyebrow")}</div>
          <h2 className="mpPro__title">{t("mp.title")}</h2>
          <p className="mpPro__sub">{t("mp.sub")}</p>
        </div>

        {/* Body */}
        <div className="mpPro__grid">
          {/* Left list */}
          <aside className="mpPro__list" role="tablist" aria-label={t("mp.aria.marketplaces")}>
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
                    <span className="mpPro__desc">{t(m.descKey)}</span>
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
                <div className="mpPro__panelLabel">{t("mp.selected")}</div>
                <div className="mpPro__panelTitle">{current.name}</div>
              </div>

              <span className="mpPro__badge">{t(current.descKey)}</span>
            </div>

            <div className="mpPro__stats">
              <div className="mpPro__stat">
                <div className="mpPro__k">{t("mp.k.rating")}</div>
                <div className="mpPro__v">{current.rating}</div>
              </div>
              <div className="mpPro__stat">
                <div className="mpPro__k">{t("mp.k.delivery")}</div>
                <div className="mpPro__v">{t(current.deliveryKey)}</div>
              </div>
              <div className="mpPro__stat">
                <div className="mpPro__k">{t("mp.k.pay")}</div>
                <div className="mpPro__v">{t(current.payKey)}</div>
              </div>
            </div>

            <div className="mpPro__actions">
              <a className="mpPro__btn mpPro__btn--primary" href={current.link}>
                {t("mp.btn.open")}
              </a>

              <button
                className="mpPro__btn"
                type="button"
                onClick={() => navigator.clipboard?.writeText(current.link)}
              >
                {t("mp.btn.copy")}
              </button>
            </div>

            <div className="mpPro__note">{t("mp.note")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
