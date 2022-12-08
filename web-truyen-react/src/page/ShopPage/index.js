import CoverImg from "../../components/CoverImage";
import FileItemsProduct from "../../components/FileItemsProduct";

import coverImgSrc from "../../static/img/page/ShopPage/cover-image.png";
import Banner from "./Banner";

import "../../static/css/page/ShopPage/shop.css";

const product = [
  {
    srcImg: require("../../static/img/index/sanpham1.png"),
    name: "Móc khóa Yuzaki",
    price: 22500,
  },
  {
    srcImg: require("../../static/img/index/sanpham2.png"),
    name: "Móc khóa Yuzaki",
    price: 22500,
  },
  {
    srcImg: require("../../static/img/index/sanpham1.png"),
    name: "Móc khóa Yuzaki",
    price: 22500,
  },
  {
    srcImg: require("../../static/img/index/sanpham2.png"),
    name: "Móc khóa Yuzaki",
    price: 22500,
  },
  {
    srcImg: require("../../static/img/index/sanpham1.png"),
    name: "Móc khóa Yuzaki",
    price: 22500,
  },
  {
    srcImg: require("../../static/img/index/sanpham2.png"),
    name: "Móc khóa Yuzaki",
    price: 22500,
  },
  {
    srcImg: require("../../static/img/index/sanpham1.png"),
    name: "Móc khóa Yuzaki",
    price: 22500,
  },
  {
    srcImg: require("../../static/img/index/sanpham2.png"),
    name: "Móc khóa Yuzaki",
    price: 22500,
  },
];

const voucher = [
  {
    srcImg: require("../../static/img/shop/e-voucher-100k.png"),
    name: "E-Voucher 100",
    price: 100000,
  },
  {
    srcImg: require("../../static/img/shop/e-voucher-200k.png"),
    name: "E-Voucher 200",
    price: 200000,
  },
  {
    srcImg: require("../../static/img/shop/e-voucher-300k.png"),
    name: "E-Voucher 300",
    price: 300000,
  },
  {
    srcImg: require("../../static/img/shop/e-voucher-500k.png"),
    name: "E-Voucher 500",
    price: 500000,
  },
];

export default function ShopPage() {
  return (
    <>
      <CoverImg srcImg={coverImgSrc} text="cửa hàng dịch vụ" />
      <FileItemsProduct
        id="e-voucher"
        text="E-voucher"
        icon="fas fa-tags icon"
        data={voucher}
        btn={false}
      />
      <Banner />
      <FileItemsProduct
        id="other-product"
        text="Sản phẩm đồng hành"
        icon="fas fa-shopping-basket icon"
        data={product}
        btn={true}
      />
    </>
  );
}
