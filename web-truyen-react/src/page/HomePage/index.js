import CoverImg from "../../components/CoverImage";
import FileItemsManga from "../../components/FileItemsManga";
import CategoryManga from "./Category";

import coverImgSrc from "../../static/img/page/HomePage/cover-image.png";
import BannerEmail from "./BannerEmail";
import BannerSearch from "./BannerSearch";
import FileItemsProduct from "../../components/FileItemsProduct";

export default function HomePage() {
  return (
    <>
      <CoverImg srcImg={coverImgSrc} text="Thế giới truyện tranh" />
      <CategoryManga />
      <FileItemsManga id="update-manga" text="Truyện cập nhật trong ngày" />
      <BannerEmail />
      <FileItemsManga id="complete-manga" text="Truyện hoàn thành" />
      <BannerSearch />
      <FileItemsProduct id="shop" text="Sản phẩm đồng hành" />
    </>
  );
}
