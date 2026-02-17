import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import BlogList from "./components/blog/BlogList";
import Article1_SEO from "./components/blog/Article1_SEO";
import Article2_Formats from "./components/blog/Article2_Formats";
import Article3_Speed from "./components/blog/Article3_Speed";

function App() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/image-optimization-seo" element={<Article1_SEO />} />
        <Route path="/blog/jpg-vs-png-vs-webp" element={<Article2_Formats />} />
        <Route
          path="/blog/website-speed-optimization"
          element={<Article3_Speed />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
