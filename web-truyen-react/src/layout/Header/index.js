import "../../static/css/layout/header.css";

export default function Header() {
  return (
    <header className="header-area">
      <div className="header">
        <div className="header-logo">
          <img src={require("../../static/img/icon/logo.svg").default} alt="" />
        </div>
        <div id="header-hamburger" className="col-sm-10">
          <i className="fas fa-bars"></i>
        </div>
        <ul className="btns-header header-left">
          <li id="btn-header-user-left">
            <span>
              <i className="fas fa-user"></i>
            </span>
            <span>ĐĂNG NHẬP</span>
          </li>
          <li className="btn-header-active">
            <span>
              <i className="fas fa-book"></i>
            </span>
            <a href="">MANGA</a>
          </li>
          <li>
            <span>
              <i className="fas fa-store"></i>
            </span>
            <a href="">SHOP</a>
          </li>
          <li>
            <span>
              <i className="fas fa-newspaper"></i>
            </span>
            <a href="">TIN TỨC</a>
          </li>
        </ul>
        <ul className="btns-header header-right">
          <li className="header-search">
            <form className="form-search">
              <input type="text" name="" id="" placeholder="Tìm kiếm" />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
            <a href="#timkiem">
              <i className="fas fa-search btn-header-search btn"></i>
            </a>
          </li>
          <li id="btn-header-user">
            <i className="fas fa-user btn"></i>
          </li>
        </ul>
      </div>
      <div className="header-cover-screen"></div>
    </header>
  );
}
