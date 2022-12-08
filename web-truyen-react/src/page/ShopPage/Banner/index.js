import "../../../static/css/page/ShopPage/banner.css";

import bannerImg from "../../../static/img/page/ShopPage/banner-image.jpg";
export default function Banner() {
  return (
    <div class="banner">
      <img src={bannerImg} alt="" />
      <div class="banner-text">
        <div class="banner-title">
          <h2>MỘT SỐ SẢN PHẦM ĐỒNG HÀNH KHÁC</h2>
        </div>
      </div>
    </div>
  );
}
