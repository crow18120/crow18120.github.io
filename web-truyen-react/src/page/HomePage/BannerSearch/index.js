import { useEffect } from "react";
import "../../../static/css/page/HomePage/banner.css";
import { expand_banner_search } from "../../../static/js/page/HomePage/banner";

export default function BannerSearch() {
  useEffect(() => {
    expand_banner_search();
  }, []);

  return (
    <div className="banner timkiem" id="timkiem">
      <img
        src={require("../../../static/img/page/HomePage/Banner/banner-image-2.png")}
        alt=""
      />
      <div className="banner-text">
        <div className="banner-title">
          <h3>TÌM KIẾM TRUYỆN ĐỌC</h3>
        </div>
        <form className="banner-content normal-search font-16px">
          <input
            type="text"
            id="name-manga"
            className="banner-text-form"
            placeholder="Tên truyện"
            required
          />
          <div className="btn-banner">
            <input type="submit" className="banner-form-btn" value="TÌM KIẾM" />
          </div>
        </form>
        <div
          className="banner-expan font-16px normal-search"
          id="expan-banner-btn"
        >
          <span>
            Tìm kiếm nâng cao
            <i
              className="fa fa-angle-double-down normal-search"
              aria-hidden="true"
            ></i>
          </span>
        </div>
        <form
          className="banner-content advance-search"
          action="category-manga.html"
          method="GET"
        >
          <div className="banner-text-form custom-select font-16px">
            <select>
              <option value="0">Thể loại</option>
              <option value="1">Comedy</option>
              <option value="2">Adventure</option>
              <option value="3">Fantasy</option>
              <option value="4">Shounen</option>
              <option value="5">Action</option>
              <option value="6">Horror</option>
              <option value="7">Isekai</option>
              <option value="8">Detective</option>
              <option value="9">Khác</option>
            </select>
          </div>
          <input
            type="text"
            id="author-manga"
            className="banner-text-form"
            placeholder="Tác giả"
          />
          <input
            type="text"
            className="banner-text-form"
            placeholder="Quốc gia"
          />
          <input
            type="text"
            className="banner-text-form"
            placeholder="Tình trạng"
          />
          <div className="btn-banner">
            <input type="submit" className="banner-form-btn" value="TÌM KIẾM" />
            <input
              type="reset"
              className="banner-form-btn btn-reset"
              value="ĐẶT LẠI"
            />
          </div>
        </form>
        <div
          className="banner-expan font-16px advance-search"
          id="shorten-banner-btn"
        >
          <span>
            Thu gọn <i className="fa fa-angle-double-up" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
