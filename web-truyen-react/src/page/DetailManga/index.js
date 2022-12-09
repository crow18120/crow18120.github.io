import CoverImg from "../../components/CoverImage";
import coverImgSrc from "../../static/img/page/DetailManga/cover-image.png";
import MangaContent from "./MangaContent";

import "../../static/css/page/DetailManga/datail-manga.css";
import MangaChapter from "./MangaChapter";

const mockData = {
  name: "kanojo, okarihimasu",
  author: "MIYAJIMA Reiji (宮島 礼吏)",
  imgSrc: require("../../static/img/mangas/manga-1.png"),
  views: 1800,
  follow: 1800,
  like: 1800,
  tags: ["action", "romance", "other"],
  description:
    "Quéo quèo, biết mô tả thế nào đây? một thằng Zin tên là Kazuya 19 năm mới có bồ không bao lâu thì bị đá , thế là cậu ta phải sử dụng dịch vụ Hẹn hò Thuê, cứ trả xiền là ngày đó bạn sẽ có bạn gái ngay! ... ",
};

export default function DetailManga() {
  return (
    <>
      <CoverImg
        srcImg={coverImgSrc}
        text="Thế giới truyện tranh"
        isHalf={true}
      />
      <div className="link-access font-18px">
        <a href="">Home</a> &gt; <a href="./manga.html">Manga</a> &gt;{" "}
        <span>Kanojo, Okarishimasu</span>
      </div>
      <MangaContent data={mockData} />
      <MangaChapter />
    </>
  );
}
