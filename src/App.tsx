import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useLayoutEffect } from "react";
import Contact from "./pages/Contact";
import Investments from "./pages/Investments";

function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo({top: 0, left: 0, behavior: "instant"})
  }, [location.pathname])
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
