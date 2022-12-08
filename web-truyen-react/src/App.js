import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./static/library/slick/slick.css";
import "./static/library/slick/slick.css";
import "./static/library/slick/slick-theme.css";
import "./static/library/font-awesome-4.7.0/css/font-awesome.min.css";
import "./static/library/fontawesome-free-5.15.2-web/css/fontawesome.css";
import "./static/library/fontawesome-free-5.15.2-web/css/brands.css";
import "./static/library/fontawesome-free-5.15.2-web/css/solid.css";
import "./static/css/font-size.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HomePage from "./page/HomePage";
import ShopPage from "./page/ShopPage";
import NewsPage from "./page/NewsPage";
import ListManga from "./page/ListManga";
import DetailManga from "./page/DetailManga";

function App() {
  return (
    <>
      <Header />
      {/* <HomePage /> */}
      {/* <ShopPage /> */}
      {/* <NewsPage /> */}
      {/* <ListManga /> */}
      <DetailManga />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      <Footer />
    </>
  );
}

export default App;
