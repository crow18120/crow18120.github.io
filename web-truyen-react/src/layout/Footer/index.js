import "../../static/css/layout/footer.css";

export default function Footer() {
  return (
    <footer className="footer-area">
      <div className="footer-up">
        <div className="footer-abc">
          <div className="footer-app">
            <div className="title-footer">Rainbow Crow</div>
            <div className="footer-apps">
              <img
                src={require("../../static/img/footer/google-play.png")}
                alt="google-play"
              />
              <img
                src={require("../../static/img/footer/app-store.png")}
                alt="app-store"
              />
            </div>
            <div className="text-footer">
              Đọc truyện hay nhất, mới nhất, chất lượng cao nhất Việt Nam
            </div>
          </div>
          <div className="footer-truyen">
            <div className="title-footer">Truyện</div>
            <ul className="text-footer">
              <li>
                <a href="">Truyện mới</a>
              </li>
              <li>
                <a href="">Phổ biến nhất</a>
              </li>
              <li>
                <a href="">Truyện hoàn thành</a>
              </li>
              <li>
                <a href="">Tin tức</a>
              </li>
            </ul>
          </div>
          <div className="footer-media">
            <div className="title-footer">Theo dõi chúng tôi</div>
            <div className="footer-medias">
              <img
                src={require("../../static/img/icon/twitter-logo.svg").default}
                alt="twitter-logo"
              />
              <img
                src={require("../../static/img/icon/facebook-logo.svg").default}
                alt="facebook-logo"
              />
              <img
                src={
                  require("../../static/img/icon/instagram-logo.svg").default
                }
                alt="instagram-logo"
              />
              <img
                src={
                  require("../../static/img/icon/pinterest-logo.svg").default
                }
                alt="pinterest-logo"
              />
            </div>
          </div>
          <div className="footer-service">
            <div className="title-footer">Dịch vụ & Hỗ trợ</div>
            <ul className="text-footer">
              <li>
                <a href="">Tài khoản của bạn</a>
              </li>
              <li>
                <a href="">Cách thức mua hàng</a>
              </li>
              <li>
                <a href="">Phương thức thanh toán</a>
              </li>
              <li>
                <a href="">Liên hệ</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-down">
        <div className="footer">
          <img src={require("../../static/img/icon/logo.svg").default} alt="" />
          <div className="text-footer">Copyright © 2020 RbCrow.com, Inc.</div>
        </div>
      </div>
    </footer>
  );
}
