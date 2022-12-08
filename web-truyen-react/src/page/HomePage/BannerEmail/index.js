import "../../../static/css/page/HomePage/banner.css";

export default function BannerEmail() {
  return (
    <div className="banner dangky-mail">
      <img
        src={require("../../../static/img/page/HomePage/Banner/banner-image.png")}
        alt=""
      />
      <div className="banner-text">
        <div className="banner-title">
          <h3>ĐĂNG KÝ EMAIL NHẬN THÔNG TIN MỚI NHẤT</h3>
        </div>
        <form
          action=""
          className="banner-content font-16px"
          method="get"
          accept-charset="utf-8"
          id="dangky-mail"
        >
          <input
            id="email"
            name="email"
            type="email"
            className="banner-text-form"
            placeholder="Email của bạn"
            pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$"
            required
          />
          <input type="submit" className="banner-form-btn" value="ĐĂNG KÝ" />
        </form>
      </div>
    </div>
  );
}
