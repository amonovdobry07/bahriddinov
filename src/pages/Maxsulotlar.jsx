import { useMemo, useState, useEffect } from "react";
import "../assets/styles/Maxsulot.scss";
import rasm1 from "../assets/images/darvoza-1.jpg";
import rasm2 from "../assets/images/darvoza-2.jpg";
import rasm3 from "../assets/images/gura-2.jpg";
import rasm4 from "../assets/images/pichoq-1.jpg";
import rasm5 from "../assets/images/gura-1.jpg";
import rasm6 from "../assets/images/stol-2.jpg";
import { useTranslation } from "react-i18next";

const PRODUCTS = [
  { id: "p1", nameKey: "Darvozaklassik", catKey: "Darvoza", priceUzs: 3500000, rating: 4.6, reviews: 38, badgeKey: "Top", image: rasm1 },
  { id: "p2", nameKey: "Roshutkauchun", catKey: "Roshutka", priceUzs: 450000, rating: 4.2, reviews: 21, badgeKey: "Yangi", image: rasm2 },
  { id: "p3", nameKey: "Pichoqtemirqolbola", catKey: "Pichoq", priceUzs: 180000, rating: 4.8, reviews: 55, badgeKey: "Top", image: rasm4 },
  { id: "p4", nameKey: "Guratemirdanyasalgan", catKey: "Gura", priceUzs: 120000, rating: 4.1, reviews: 12, badgeKey: "", image: rasm3 },
  { id: "p5", nameKey: "Gazpechyuchun", catKey: "Gazpech", priceUzs: 2200000, rating: 4.4, reviews: 19, badgeKey: "", image: rasm5 },
  { id: "p6", nameKey: "Dirbilkamustahkamkorpus", catKey: "Dirbilka", priceUzs: 950000, rating: 3.9, reviews: 9, badgeKey: "", image: rasm6 },
  { id: "p7", nameKey: "Guratemirdanyasalgan", catKey: "Gura", priceUzs: 120000, rating: 4.1, reviews: 12, badgeKey: "", image: rasm6 },
  { id: "p8", nameKey: "Guramustahkamkatta", catKey: "Gura", priceUzs: 170000, rating: 3.9, reviews: 9, badgeKey: "", image: rasm1 },
  { id: "p9", nameKey: "Gazpechuyuchun", catKey: "Gazpech", priceUzs: 2200000, rating: 4.4, reviews: 19, badgeKey: "", image: rasm3 },
  { id: "p10", nameKey: "Dirbilkamustahkamkorpus", catKey: "Dirbilka", priceUzs: 950000, rating: 3.9, reviews: 9, badgeKey: "", image: rasm5 },
];

const Stars = ({ value = 0 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <div className="stars" aria-label={`Rating ${value} / 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="stars__star stars__star--full">★</span>
      ))}
      {half ? <span className="stars__star stars__star--half">★</span> : null}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="stars__star stars__star--empty">★</span>
      ))}
      <span className="stars__num">{value.toFixed(1)}</span>
    </div>
  );
};

export default function Products() {
  const { t, i18n } = useTranslation();

  const STEP = 4;

  // ✅ narxni tilga mos formatlash (ixtiyoriy: uz/ru/en)
  const numberLocale =
    i18n.language === "ru" ? "ru-RU" : i18n.language === "en" ? "en-US" : "uz-UZ";

  const formatPrice = (n) =>
    new Intl.NumberFormat(numberLocale).format(n) + " " + t("som");

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.catKey));
    return ["Barchasi", ...Array.from(set)];
  }, []);

  const [activeCat, setActiveCat] = useState("Barchasi");
  const [q, setQ] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(STEP);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();

    let list = PRODUCTS.filter((p) => {
      const catOk = activeCat === "Barchasi" || p.catKey === activeCat;
      const name = t(p.nameKey).toLowerCase();
      const qOk = !text || name.includes(text);
      const rOk = p.rating >= minRating;
      return catOk && qOk && rOk;
    });

    if (sort === "priceAsc") list.sort((a, b) => a.priceUzs - b.priceUzs);
    if (sort === "priceDesc") list.sort((a, b) => b.priceUzs - a.priceUzs);
    if (sort === "ratingDesc") list.sort((a, b) => b.rating - a.rating);
    if (sort === "popular") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [activeCat, q, minRating, sort, t]);

  useEffect(() => {
    setVisibleCount(STEP);
  }, [activeCat, q, minRating, sort]);

  const shown = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;
  const canShowLess = filtered.length > STEP && visibleCount > STEP;

  return (
    <div className="products">
      <div className="products__container">
        <header className="products__header">
          <div>
            <h1 className="products__title">{t("Mahsulotlar")}</h1>
            <p className="products__subtitle">{t("Kategoriyafiltrlar")}</p>
          </div>

          <div className="products__tools">
            <input
              className="products__search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("QidirishPlaceholder")}
            />

            <select
              className="products__select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popular">{t("Ommabop")}</option>
              <option value="ratingDesc">{t("Reytingyuqori")}</option>
              <option value="priceAsc">{t("Narxarzonqimmat")}</option>
              <option value="priceDesc">{t("Narxqimmatarzon")}</option>
            </select>

            <select
              className="products__select"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              <option value={0}>{t("Reytinghammasi")}</option>
              <option value={1}>1★ {t("vayuqori")}</option>
              <option value={2}>2★ {t("vayuqori")}</option>
              <option value={3}>3★ {t("vayuqori")}</option>
              <option value={4}>4★ {t("vayuqori")}</option>
              <option value={5}>5★</option>
            </select>
          </div>
        </header>

        <div className="products__cats">
          {categories.map((cKey) => (
            <button
              key={cKey}
              className={cKey === activeCat ? "cat cat--active" : "cat"}
              onClick={() => setActiveCat(cKey)}
              type="button"
            >
              {cKey === "Barchasi" ? t("Barchasi") : t(cKey)}
            </button>
          ))}
        </div>

        <div className="products__count">
          {t("Natija")} <b>{filtered.length}</b> {t("ta")} ({t("korsatilmoqda")}{" "}
          <b>{shown.length}</b>)
        </div>

        <section className="products__grid">
          {shown.map((p) => (
            <article key={p.id} className="card">
              <div className="card__top">
                <div className="card__thumb">
                  <img src={p.image} alt={t(p.nameKey)} loading="lazy" />
                </div>

                {p.badgeKey ? (
                  <span className="card__badge">{t(p.badgeKey)}</span>
                ) : null}

                <span className="card__cat">{t(p.catKey)}</span>
              </div>

              <h3 className="card__title">{t(p.nameKey)}</h3>

              <div className="card__meta">
                <Stars value={p.rating} />
                <span className="card__reviews">
                  ({p.reviews} {t("ta")})
                </span>
              </div>

              <div className="card__price">{formatPrice(p.priceUzs)}</div>

              <div className="card__actions">
                <a
                  className="btn btn--primary"
                  href="https://t.me/uzbsdd"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Narxsorash")}
                </a>
              </div>
            </article>
          ))}
        </section>

        <div className="products__more">
          {canLoadMore ? (
            <button
              className="moreBtn moreBtn--primary"
              type="button"
              onClick={() =>
                setVisibleCount((v) => Math.min(v + STEP, filtered.length))
              }
            >
              {t("Koproq")}
            </button>
          ) : null}

          {canShowLess ? (
            <button
              className="moreBtn moreBtn--ghost"
              type="button"
              onClick={() => setVisibleCount((v) => Math.max(STEP, v - STEP))}
            >
              {t("Kamroq")}
            </button>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <div className="products__empty">
            {t("HechnarsatopilmadiKategoriyaozgartiribkoring")}
          </div>
        ) : null}
      </div>
    </div>
  );
}
