import Header from "../components/layout/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Maxsulotlar from "../pages/Maxsulotlar";
import Xizmatlar from "../pages/Xizmatlar";
import MarketPlace from "../pages/MarketPlace";
import Aloqa from "../pages/Aloqa";
import Home from "../pages/Home";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "../locales/translationsEn";
import translationRu from "../locales/translationsRu";
import translationUz from "../locales/translationsUz";
import Footer from "../components/layout/Footer";
import translationFr from "../locales/translationFr";
import translationTu from "../locales/translationTu";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    ru: { translation: translationRu },
    uz: { translation: translationUz },
    tu: { translation: translationTu },
    fr: { translation: translationFr }, 
  },
  lng: "uz",
  fallbackLng: "uz",
});

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maxsulotlar" element={<Maxsulotlar />} />
          <Route path="/xizmatlar" element={<Xizmatlar />} />
          <Route path="/marketplace" element={<MarketPlace /> }/> 
          <Route path="/aloqa" element={<Aloqa />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
