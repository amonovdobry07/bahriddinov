import "../../assets/styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="simple-footer">
      <div className="simple-footer__container">
        {/* Left: social */}
        <div className="simple-footer__social">
          <a
            className="simple-footer__icon"
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            title="Telegram"
          >
            {/* Telegram icon (SVG) */}
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M9.4 15.6 9.1 19c.4 0 .6-.2.8-.4l1.9-1.8 3.9 2.9c.7.4 1.2.2 1.4-.6l2.5-11.8c.3-1.1-.4-1.5-1.2-1.2L3.6 10.8c-1.1.4-1.1 1.1-.2 1.4l3.8 1.2 8.8-5.5c.4-.2.8-.1.5.2z"
              />
            </svg>
          </a>

          <a
            className="simple-footer__icon"
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            {/* Instagram icon (SVG) */}
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.75 1.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
              />
            </svg>
          </a>
        </div>

        {/* Right: credits */}
        <div className="simple-footer__credits">
          <div className="simple-footer__by">Designed by KHALIMOV</div>
          <div className="simple-footer__tagline">
            Biznesingizni biz bilan barpo eting
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
