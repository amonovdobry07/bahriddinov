import { useMemo, useState } from "react";
import "../assets/styles/Maxsulot.scss";
import { Link } from "react-router-dom";
import rasm1 from "../assets/images/darvoza-1.jpg";
import rasm2 from "../assets/images/darvoza-2.jpg";
import rasm3 from "../assets/images/gura-2.jpg";
import rasm4 from "../assets/images/pichoq-1.jpg";
import rasm5 from "../assets/images/gura-1.jpg";
import rasm6 from "../assets/images/stol-2.jpg";
import { motion, AnimatePresence } from "framer-motion";

const PRODUCTS = [
  {
    id: "p1",
    name: "Darvoza (klassik)",
    category: "Darvoza",
    priceUzs: 3500000,
    rating: 4.6,
    reviews: 38,
    badge: "Top",
    image: rasm1,
  },
  {
    id: "p2",
    name: "Roshutka (oyna uchun)",
    category: "Roshutka",
    priceUzs: 450000,
    rating: 4.2,
    reviews: 21,
    badge: "Yangi",
    image: rasm2,
  },
  {
    id: "p3",
    name: "Pichoq (temir, qo‘lbola)",
    category: "Pichoq",
    priceUzs: 180000,
    rating: 4.8,
    reviews: 55,
    badge: "Top",
    image: rasm4,
  },
  {
    id: "p4",
    name: "Gura (temirdan yasalgan)",
    category: "Gura",
    priceUzs: 120000,
    rating: 4.1,
    reviews: 12,
    badge: "",
    image: rasm3,
  },
  {
    id: "p5",
    name: "Gaz pech (uy uchun)",
    category: "Gaz pech",
    priceUzs: 2200000,
    rating: 4.4,
    reviews: 19,
    badge: "",
    image: rasm5,
  },
  {
    id: "p6",
    name: "Dirbilka (mustahkam korpus)",
    category: "Dirbilka",
    priceUzs: 950000,
    rating: 3.9,
    reviews: 9,
    badge: "",
    image: rasm6,
  },
  {
    id: "p7",
    name: "Gura (temirdan yasalgan)",
    category: "Gura",
    priceUzs: 120000,
    rating: 4.1,
    reviews: 12,
    badge: "",
    image: rasm6,
  },
  {
    id: "p8",
    name: "Gura (mustahkam, katta)",
    category: "Gura",
    priceUzs: 170000,
    rating: 3.9,
    reviews: 9,
    badge: "",
    image: rasm1,
  },
  {
    id: "p9",
    name: "Gaz pech (uy uchun)",
    category: "Gaz pech",
    priceUzs: 2200000,
    rating: 4.4,
    reviews: 19,
    badge: "",
    image: rasm3,
  },
  {
    id: "p10",
    name: "Dirbilka (mustahkam korpus)",
    category: "Dirbilka",
    priceUzs: 950000,
    rating: 3.9,
    reviews: 9,
    badge: "",
    image: rasm5,
  },
];
const formatUzs = (n) => new Intl.NumberFormat("uz-UZ").format(n) + " so‘m";

const getCategories = (items) => {
  const set = new Set(items.map((p) => p.category));
  return ["Barchasi", ...Array.from(set)];
};

const Stars = ({ value = 0 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <div className="stars" aria-label={`Rating ${value} / 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="stars__star stars__star--full">
          ★
        </span>
      ))}
      {half ? <span className="stars__star stars__star--half">★</span> : null}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="stars__star stars__star--empty">
          ★
        </span>
      ))}
      <span className="stars__num">{value.toFixed(1)}</span>
    </div>
  );
};

const Products = () => {
  const categories = useMemo(() => getCategories(PRODUCTS), []);
  const [activeCat, setActiveCat] = useState("Barchasi");
  const [q, setQ] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popular"); // popular | priceAsc | priceDesc | ratingDesc

  // load more / show less
  const STEP = 4;
  const [visibleCount, setVisibleCount] = useState(STEP);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();

    let list = PRODUCTS.filter((p) => {
      const catOk = activeCat === "Barchasi" || p.category === activeCat;
      const qOk = !text || p.name.toLowerCase().includes(text);
      const rOk = p.rating >= minRating;
      return catOk && qOk && rOk;
    });

    if (sort === "priceAsc") list.sort((a, b) => a.priceUzs - b.priceUzs);
    if (sort === "priceDesc") list.sort((a, b) => b.priceUzs - a.priceUzs);
    if (sort === "ratingDesc") list.sort((a, b) => b.rating - a.rating);
    if (sort === "popular") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [activeCat, q, minRating, sort]);

  // when filters change, reset visible count
  useMemo(() => {
    setVisibleCount(STEP);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCat, q, minRating, sort]);

  const shown = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;
  const canShowLess = filtered.length > STEP && visibleCount > STEP;

  return (
    <div className="products">
      <div className="products__container">
        <header className="products__header">
          <div>
            <h1 className="products__title">Mahsulotlar</h1>
            <p className="products__subtitle">
              Kategoriya, narx (so‘m), reyting (1–5) va filtrlar.
            </p>
          </div>

          <div className="products__tools">
            <input
              className="products__search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Qidirish: darvoza, pichoq..."
            />

            <select
              className="products__select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popular">Ommabop</option>
              <option value="ratingDesc">Reyting yuqori</option>
              <option value="priceAsc">Narx: arzon → qimmat</option>
              <option value="priceDesc">Narx: qimmat → arzon</option>
            </select>

            <select
              className="products__select"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              <option value={0}>Reyting: hammasi</option>
              <option value={1}>1★ va yuqori</option>
              <option value={2}>2★ va yuqori</option>
              <option value={3}>3★ va yuqori</option>
              <option value={4}>4★ va yuqori</option>
              <option value={5}>5★</option>
            </select>
          </div>
        </header>

        <div className="products__cats">
          {categories.map((c) => (
            <button
              key={c}
              className={c === activeCat ? "cat cat--active" : "cat"}
              onClick={() => setActiveCat(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>

        <div className="products__count">
          Natija: <b>{filtered.length}</b> ta (ko‘rsatilmoqda:{" "}
          <b>{shown.length}</b>)
        </div>

        <section className="products__grid">
          {shown.map((p) => (
            <article key={p.id} className="card">
              <div className="card__top">
                <div className="card__thumb">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>

                {p.badge ? (
                  <span className="card__badge">{p.badge}</span>
                ) : null}
                <span className="card__cat">{p.category}</span>
              </div>

              <h3 className="card__title">{p.name}</h3>

              <div className="card__meta">
                <Stars value={p.rating} />
                <span className="card__reviews">({p.reviews} ta)</span>
              </div>

              <div className="card__price">{formatUzs(p.priceUzs)}</div>

              <div className="card__actions">
                <a className="btn btn--primary" href="/contact">
                  Narx so‘rash
                </a>
                <a
                  className="btn btn--ghost"
                  href="https://t.me/uzbsdd"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* Load more / Show less */}
        <div className="products__more">
          {canLoadMore ? (
            <button
              className="moreBtn moreBtn--primary"
              type="button"
              onClick={() =>
                setVisibleCount((v) => Math.min(v + STEP, filtered.length))
              }
            >
              Ko‘proq
            </button>
          ) : null}

          {canShowLess ? (
            <button
              className="moreBtn moreBtn--ghost"
              type="button"
              onClick={() => setVisibleCount((v) => Math.max(STEP, v - STEP))}
            >
              Kamroq
            </button>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <div className="products__empty">
            Hech narsa topilmadi. Kategoriya yoki qidiruvni o‘zgartirib ko‘ring.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Products;
