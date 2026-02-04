import React from "react";
import "../assets/styles/Home.scss";

import heroImg from "../assets/images/darvoza-1.jpg";
import gateImg from "../assets/images/darvoza-2.jpg";
import rishotka1 from "../assets/images/rishotka-2.jpg";
import rishotka2 from "../assets/images/rishotka-3.jpg";
import tableImg from "../assets/images/stol-1.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {

  const { t, i18n } = useTranslation();

  const products = [
    {
      title: t(`darvoza`),
      desc: t(`Hovlia`),
      img: gateImg,
      tag: t(`Buyurtmaasosida`),
      action: { label: t(`Telegramdasorash`), href: "https://t.me/uzbsdd" },
    },
    {
      title: t(`Rishotka`),
      desc: t(`Panjarava`),
      img: rishotka1,
      tag: t(`Mustahkam`),
      action: { label: t(`Narxsorash`), href: "https://t.me/uzbsdd" },
    },
    {
      title: t(`Zinapoyapanjarasi`),
      desc: t(`Uyva`),
      img: rishotka2,
      tag: t(`DizaynSifat`),
      action: { label: t(`Qongiroqqilish`), href: "tel:+998972822902" },
    },
    {
      title: t(`Metallstolramalar`),
      desc: t(`Kafeuy`),
      img: tableImg,
      tag: t(`Maxsusbuyurtma`),
      action: { label: t(`Aloqagachiqish`), href: "/aloqa" },
    },
  ];

  return (
    <main className="home">
      {/* HERO */}
      <section className="heroV2" id="home">
        {/* background */}
        <div
          className="heroV2__bg"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="heroV2__shade" />
        <div className="heroV2__noise" />

        <div className="container heroV2__inner">
          <div className="heroV2__content">
            <div className="heroV2__pill">
              <span className="dot" />
              {t(`yildanberi`)}
            </div>

            <h1 className="heroV2__title">
              {t(`Metallkonstruksiyalarni`)} <span>{t(`olchamboyicha`)}</span>{" "}
              {t(`tayyorlaymiz`)}
            </h1>

            <p className="heroV2__text">
              {t(`Darvozarishotka`)}
            </p>

            <div className="heroV2__actions">
              <a
                className="heroV2__btn heroV2__btn--primary"
                href="https://t.me/uzbsdd"
                target="_blank"
                rel="noreferrer"
              >
                {t(`Buyurtmaberish`)} <span className="arr">➜</span>
              </a>

              <a
                className="heroV2__btn heroV2__btn--ghost"
                href="tel:+998972822902"
              >
                {t(`Narxsorash`)}
              </a>
            </div>

            <div className="heroV2__meta">
              <div className="metaItem">
                <div className="metaItem__k">📏</div>
                <div className="metaItem__t"> {t(`Olchamboyicha`)}</div>
              </div>
              <div className="metaItem">
                <div className="metaItem__k">🛠️</div>
                <div className="metaItem__t"> {t(`Ustaijro`)}</div>
              </div>
              <div className="metaItem">
                <div className="metaItem__k">⚡</div>
                <div className="metaItem__t"> {t(`Tezaloqa`)}</div>
              </div>
            </div>
          </div>

          {/* bottom cards (real images) */}
          <div className="heroV2__cards">
            <a className="miniCard" href="#products">
              <img src={gateImg} alt="Darvoza" />
              <div className="miniCard__overlay" />
              <div className="miniCard__body">
                <div className="miniCard__title">{t(`Darvozalarrr`)}</div>
                <div className="miniCard__desc">{t(`Dizaynmustahkamlik`)}</div>
              </div>
            </a>

            <a className="miniCard" href="#products">
              <img src={rishotka1} alt="Rishotka" />
              <div className="miniCard__overlay" />
              <div className="miniCard__body">
                <div className="miniCard__title">{t(`Rishotkaa`)}</div>
                <div className="miniCard__desc">{t(`Himoyavabezak`)}</div>
              </div>
            </a>

            <a className="miniCard" href="#products">
              <img src={tableImg} alt="Metall stol" />
              <div className="miniCard__overlay" />
              <div className="miniCard__body">
                <div className="miniCard__title">{t(`Metallramalar`)}</div>
                <div className="miniCard__desc">{t(`Maxsusbuyurtma`)}</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" id="products">
        <div className="container">
          <div className="sectionHead">
            <h2 className="sectionTitle">{t(`Mahsulotlar`)}</h2>
            <p className="sectionDesc">
             {t(`Engkop`)}
            </p>
          </div>

          <div className="grid">
            {products.map((p) => (
              <article className="pCard" key={p.title}>
                <div className="pCard__media">
                  <img className="pCard__img" src={p.img} alt={p.title} />
                  <div className="pCard__shade" />
                  <div className="pCard__tag">{p.tag}</div>
                </div>

                <div className="pCard__body">
                  <h3 className="pCard__title">{p.title}</h3>
                  <p className="pCard__text">{p.desc}</p>

                  {p.action.href.startsWith("/") ? (
                    <a className="pCard__link" href={p.action.href}>
                      {p.action.label} <span>➜</span>
                    </a>
                  ) : (
                    <a
                      className="pCard__link"
                      href={p.action.href}
                      target={
                        p.action.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        p.action.href.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                    >
                      {p.action.label} <span>➜</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + CTA */}
      {/* ABOUT (NEW) */}
      <section className="stepsUx" id="process">
  <div className="container stepsUx__inner">
    <p className="stepsUx__intro">
      {t(`Bizdabuyurtma`)}
    </p>

    <div className="stepsUx__list">
      <article className="sCard">
        <div className="sCard__num">01</div>
        <div className="sCard__content">
          <h3 className="sCard__title">{t(`Maslahatadizayn`)}</h3>
          <p className="sCard__desc">
           {t(`Darvozarishotkapanjara`)}
          </p>
        </div>
      </article>

      <article className="sCard">
        <div className="sCard__num">02</div>
        <div className="sCard__content">
          <h3 className="sCard__title">{t(`Olchovvamaterial`)}</h3>
          <p className="sCard__desc">
           {t(`Olchovlarolinadimaterial`)}
          </p>
        </div>
      </article>

      <article className="sCard">
        <div className="sCard__num">03</div>
        <div className="sCard__content">
          <h3 className="sCard__title">{t(`Tayyorlashvatopshirish`)}</h3>
          <p className="sCard__desc">
            {t(`Ishpuxtayigiladi`)}
          </p>
        </div>
      </article>
    </div>

    <div className="stepsUx__bottom">
      <div className="stepsUx__divider" />

      <div className="stepsUx__headline">
        <div className="stepsUx__label">{t(`Buyurtma`)}</div>
        <h2 className="stepsUx__big">{t(`SIZNINGBUYURTMANGIZBIZNINGMASULIYATIMIZ`)}</h2>
      </div>

      <div className="stepsUx__actions">
        <a className="stepsUx__btn stepsUx__btn--primary" href="https://t.me/uzbsdd" target="_blank" rel="noreferrer">
          {t(`Boglanish`)}<span aria-hidden="true"></span>
        </a>
        <Link className="stepsUx__btn stepsUx__btn--ghost" to="/aloqa">
          {t(`Bizhaqimizda`)}
        </Link>
      </div>
    </div>
  </div>
</section>


      <div className="spacer" />
    </main>
  );
}
