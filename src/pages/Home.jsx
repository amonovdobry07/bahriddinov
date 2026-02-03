import React from "react";
import "../assets/styles/Home.scss";

import heroImg from "../assets/images/darvoza-1.jpg";
import gateImg from "../assets/images/darvoza-2.jpg";
import rishotka1 from "../assets/images/rishotka-2.jpg";
import rishotka2 from "../assets/images/rishotka-3.jpg";
import tableImg from "../assets/images/stol-1.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  const products = [
    {
      title: "Darvozalar",
      desc: "Hovli va korxona uchun mustahkam darvozalar. Dizayn va o‘lcham bo‘yicha.",
      img: gateImg,
      tag: "Buyurtma asosida",
      action: { label: "Telegramda so‘rash", href: "https://t.me/uzbsdd" },
    },
    {
      title: "Rishotka",
      desc: "Panjara va himoya konstruktsiyalari. Mustahkam va chiroyli bezak bilan.",
      img: rishotka1,
      tag: "Mustahkam",
      action: { label: "Narx so‘rash", href: "https://t.me/uzbsdd" },
    },
    {
      title: "Zinapoya panjarasi",
      desc: "Uy va bino zinapoyalari uchun zamonaviy, bezakli panjaralar.",
      img: rishotka2,
      tag: "Dizayn + Sifat",
      action: { label: "Qo‘ng‘iroq qilish", href: "tel:+998972822902" },
    },
    {
      title: "Metall stol/ramalar",
      desc: "Kafe, uy yoki sex uchun metall stol va maxsus konstruktsiyalar.",
      img: tableImg,
      tag: "Maxsus buyurtma",
      action: { label: "Aloqaga chiqish", href: "/aloqa" },
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
              2014-yildan beri • Buyurtma asosida
            </div>

            <h1 className="heroV2__title">
              Metall buyumlar va konstruksiyalarni <span>o‘lcham bo‘yicha</span>{" "}
              tayyorlaymiz
            </h1>

            <p className="heroV2__text">
              Darvoza, rishotka, zinapoya panjarasi, metall stol va boshqa
              ishlanmalar. Tez kelishuv, aniq ijro va mustahkam natija.
            </p>

            <div className="heroV2__actions">
              <a
                className="heroV2__btn heroV2__btn--primary"
                href="https://t.me/uzbsdd"
                target="_blank"
                rel="noreferrer"
              >
                Buyurtma berish <span className="arr">➜</span>
              </a>

              <a
                className="heroV2__btn heroV2__btn--ghost"
                href="tel:+998972822902"
              >
                Narx so‘rash
              </a>
            </div>

            <div className="heroV2__meta">
              <div className="metaItem">
                <div className="metaItem__k">📏</div>
                <div className="metaItem__t">O‘lcham bo‘yicha</div>
              </div>
              <div className="metaItem">
                <div className="metaItem__k">🛠️</div>
                <div className="metaItem__t">Usta ijro</div>
              </div>
              <div className="metaItem">
                <div className="metaItem__k">⚡</div>
                <div className="metaItem__t">Tez aloqa</div>
              </div>
            </div>
          </div>

          {/* bottom cards (real images) */}
          <div className="heroV2__cards">
            <a className="miniCard" href="#products">
              <img src={gateImg} alt="Darvoza" />
              <div className="miniCard__overlay" />
              <div className="miniCard__body">
                <div className="miniCard__title">Darvozalar</div>
                <div className="miniCard__desc">Dizayn + mustahkamlik</div>
              </div>
            </a>

            <a className="miniCard" href="#products">
              <img src={rishotka1} alt="Rishotka" />
              <div className="miniCard__overlay" />
              <div className="miniCard__body">
                <div className="miniCard__title">Rishotka</div>
                <div className="miniCard__desc">Himoya va bezak</div>
              </div>
            </a>

            <a className="miniCard" href="#products">
              <img src={tableImg} alt="Metall stol" />
              <div className="miniCard__overlay" />
              <div className="miniCard__body">
                <div className="miniCard__title">Metall ramalar</div>
                <div className="miniCard__desc">Maxsus buyurtma</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" id="products">
        <div className="container">
          <div className="sectionHead">
            <h2 className="sectionTitle">Mahsulotlar</h2>
            <p className="sectionDesc">
              Eng ko‘p buyurtma beriladigan yo‘nalishlar. Har biri buyurtma
              asosida tayyorlanadi.
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
      Bizda buyurtma jarayoni aniq va tushunarli: maslahat → o‘lchov → tayyorlash → topshirish.
      Maqsad: Bahriddinov ustaxonasi sifatli natijani o‘z vaqtida yetkazish.
    </p>

    <div className="stepsUx__list">
      <article className="sCard">
        <div className="sCard__num">01</div>
        <div className="sCard__content">
          <h3 className="sCard__title">Maslahat va dizayn</h3>
          <p className="sCard__desc">
            Darvoza, rishotka, panjara, zinapoya panjarasi yoki metall stol uchun uslub va dizaynni kelishamiz.
            Rasm yuborsangiz, mos variantlarni taklif qilamiz.
          </p>
        </div>
      </article>

      <article className="sCard">
        <div className="sCard__num">02</div>
        <div className="sCard__content">
          <h3 className="sCard__title">O‘lchov va material</h3>
          <p className="sCard__desc">
            O‘lchovlar olinadi, material (temir qalinligi, bezak, bo‘yoq) va barcha detallar bo‘yicha aniq kelishuv qilinadi.
          </p>
        </div>
      </article>

      <article className="sCard">
        <div className="sCard__num">03</div>
        <div className="sCard__content">
          <h3 className="sCard__title">Tayyorlash va topshirish</h3>
          <p className="sCard__desc">
            Ish puxta yig‘iladi, payvand va ishlov nazorat qilinadi.
            Yakunda buyurtma tayyor holatda topshiriladi (kelishuv bo‘yicha o‘rnatish ham mumkin).
          </p>
        </div>
      </article>
    </div>

    <div className="stepsUx__bottom">
      <div className="stepsUx__divider" />

      <div className="stepsUx__headline">
        <div className="stepsUx__label">Buyurtma</div>
        <h2 className="stepsUx__big">SIZNING BUYURTMANGIZ — BIZNING MAS’ULIYATIMIZ</h2>
      </div>

      <div className="stepsUx__actions">
        <a className="stepsUx__btn stepsUx__btn--primary" href="https://t.me/uzbsdd" target="_blank" rel="noreferrer">
          Bog‘lanish <span aria-hidden="true"></span>
        </a>
        <Link className="stepsUx__btn stepsUx__btn--ghost" to="/aloqa">
          Biz haqimizda
        </Link>
      </div>
    </div>
  </div>
</section>


      <div className="spacer" />
    </main>
  );
}
