import CoverImg from "../../components/CoverImage";
import FileItemsManga from "../../components/FileItemsManga";
import Filter from "./Filter";

import coverImgSrc from "../../static/img/page/ListManga/cover-image.png";
import "../../static/css/page/ListManga/list-manga.css";

const mockData = [
  {
    imgSrc: require("../../static/img/index/manga-1.png"),
    name: "Kanojo, Okarishimasu",
    chapter: "170",
    status: "update",
    view: 352928,
    follow: 1068,
    tags: ["School Life", "Ecchi", "Romance", "Comedy", "Slice of Life"],
    description: `Quéo quèo, biết mô tả thế nào đây? một thằng Zin tên là Kazuya
      19 năm mới có bồ không bao lâu thì bị đá , thế là cậu ta phải sử
      dụng dịch vụ Hẹn hò Thuê, cứ trả xiền là ngày đó bạn sẽ có bạn
      gái ngay! Cậu ta đã thuê...`,
  },
  {
    imgSrc: require("../../static/img/index/manga-1.png"),
    name: "Kanojo, Okarishimasu 1",
    chapter: "170",
    status: "update",
    view: 352928,
    follow: 1068,
    tags: ["School Life", "Ecchi", "Romance", "Comedy", "Slice of Life"],
    description: `Quéo quèo, biết mô tả thế nào đây? một thằng Zin tên là Kazuya
      19 năm mới có bồ không bao lâu thì bị đá , thế là cậu ta phải sử
      dụng dịch vụ Hẹn hò Thuê, cứ trả xiền là ngày đó bạn sẽ có bạn
      gái ngay! Cậu ta đã thuê...`,
  },
  {
    imgSrc: require("../../static/img/index/manga-1.png"),
    name: "Kanojo, Okarishimasu 2",
    chapter: "170",
    status: "update",
    view: 352928,
    follow: 1068,
    tags: ["School Life", "Ecchi", "Romance", "Comedy", "Slice of Life"],
    description: `Quéo quèo, biết mô tả thế nào đây? một thằng Zin tên là Kazuya
      19 năm mới có bồ không bao lâu thì bị đá , thế là cậu ta phải sử
      dụng dịch vụ Hẹn hò Thuê, cứ trả xiền là ngày đó bạn sẽ có bạn
      gái ngay! Cậu ta đã thuê...`,
  },
  {
    imgSrc: require("../../static/img/index/manga-1.png"),
    name: "Kanojo, Okarishimasu 3",
    chapter: "170",
    status: "update",
    view: 352928,
    follow: 1068,
    tags: ["School Life", "Ecchi", "Romance", "Comedy", "Slice of Life"],
    description: `Quéo quèo, biết mô tả thế nào đây? một thằng Zin tên là Kazuya
      19 năm mới có bồ không bao lâu thì bị đá , thế là cậu ta phải sử
      dụng dịch vụ Hẹn hò Thuê, cứ trả xiền là ngày đó bạn sẽ có bạn
      gái ngay! Cậu ta đã thuê ...`,
  },
  {
    imgSrc: require("../../static/img/index/manga-1.png"),
    name: "Kanojo, Okarishimasu 4",
    chapter: "170",
    status: "update",
    view: 352928,
    follow: 1068,
    tags: ["School Life", "Ecchi", "Romance", "Comedy", "Slice of Life"],
    description: `Quéo quèo, biết mô tả thế nào đây? một thằng Zin tên là Kazuya
      19 năm mới có bồ không bao lâu thì bị đá , thế là cậu ta phải sử
      dụng dịch vụ Hẹn hò Thuê, cứ trả xiền là ngày đó bạn sẽ có bạn
      gái ngay! Cậu ta đã thuê ...`,
  },
  {
    imgSrc: require("../../static/img/index/manga-1.png"),
    name: "Kanojo, Okarishimasu 5",
    chapter: "170",
    status: "update",
    view: 352928,
    follow: 1068,
    tags: ["School Life", "Ecchi", "Romance", "Comedy", "Slice of Life"],
    description: `Quéo quèo, biết mô tả thế nào đây? một thằng Zin tên là Kazuya
      19 năm mới có bồ không bao lâu thì bị đá , thế là cậu ta phải sử
      dụng dịch vụ Hẹn hò Thuê, cứ trả xiền là ngày đó bạn sẽ có bạn
      gái ngay! Cậu ta đã thuê ...`,
  },
];

export default function ListManga() {
  return (
    <>
      <CoverImg
        srcImg={coverImgSrc}
        text="Thế giới truyện tranh"
        isHalf={true}
      />
      <div className="link-access font-18px">
        <a href="./index.html">Home</a> &gt; <span>Manga</span>
      </div>
      <div className="content-category-manga row">
        <Filter />
        <FileItemsManga
          isListPage={true}
          text="Danh sách truyện"
          id="manga"
          data={mockData}
          hasArrowBtn={true}
        />
      </div>
    </>
  );
}
