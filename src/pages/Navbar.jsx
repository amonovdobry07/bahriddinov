import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Navbar.scss";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { t, i18n } = useTranslation();

  return (
    <header className={`hdr ${isScrolled ? "hdr--scrolled" : ""}`}>
      {/* overlay */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Main nav */}
      <div className="navwrap">
        <div className="container nav">
          {/* LOGO */}
          <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
            <div className="brand__mark">BM</div>
            <div className="brand__text">
              <div className="brand__name">Bahromov Umidjon</div>
              <div className="brand__sub">{t(`Metallgaishlovberish`)}</div>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="nav__links">
            <Link className="nav__link" to="/">
              {t(`home`)}
            </Link>
            <Link className="nav__link" to="/maxsulotlar">
              {t(`maxsulotlar`)}
            </Link>
            <Link className="nav__link" to="/xizmatlar">
              {t(`xizmatlar`)}
            </Link>
            <Link className="nav__link" to="/marketplace">
              {t(`Market`)}
            </Link>
            <Link className="nav__link" to="/aloqa">
              {t(`aloqa`)}
            </Link>
          </nav>

          {/* ACTIONS */}
          <div className="nav__actions">
            {/* ✅ LANG SWITCH */}
            <div className="lang">
              <select
                className="lang__select"
                defaultValue="uz"
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="uz">🇺🇿 Uzbek</option>
                <option value="ru">🇷🇺 Russian</option>
                <option value="en">🇬🇧 English</option>
                <option value="fr">🇫🇷 French</option>
                <option value="tu">🇹🇷 Turkish</option>
              </select>
            </div>
            {/* BURGER */}
            <button
              className={`burger ${menuOpen ? "burger--open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Mobil menyu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile ${menuOpen ? "mobile--open" : ""}`}>
          <div className="container mobile__inner">
            <div className="mobile__grid">
              <Link
                className="mobile__link"
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Bosh sahifa <span className="mobile__chev">›</span>
              </Link>

              {/* ✅ yo‘llarni bir xil qildim (maxsulotlar / xizmatlar / aloqa) */}
              <Link
                className="mobile__link"
                to="/maxsulotlar"
                onClick={() => setMenuOpen(false)}
              >
                Mahsulotlar <span className="mobile__chev">›</span>
              </Link>

              <Link
                className="mobile__link"
                to="/xizmatlar"
                onClick={() => setMenuOpen(false)}
              >
                Xizmatlar <span className="mobile__chev">›</span>
              </Link>

              <Link
                className="mobile__link"
                to="/aloqa"
                onClick={() => setMenuOpen(false)}
              >
                Aloqa <span className="mobile__chev">›</span>
              </Link>
            </div>

            <div className="mobile__cta">
              <a
                className="btn btn--ghost w100"
                href="tel:+998972822902"
                onClick={() => setMenuOpen(false)}
              >
                Qo‘ng‘iroq qilish
              </a>

              <a
                className="btn btn--primary w100"
                href="https://t.me/uzbsdd"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                Telegramga yozish <span className="btn__arrow">➜</span>
              </a>

              <div className="mobile__hint">
                Mahsulotlar: rushutka, dirbilka, gaz pech, darvoza
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
