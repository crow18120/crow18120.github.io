import CoverImg from "../../components/CoverImage";
import coverImgSrc from "../../static/img/page/DetailManga/cover-image.png";

export default function DetailManga() {
  return (
    <>
      <CoverImg
        srcImg={coverImgSrc}
        text="Thế giới truyện tranh"
        isHalf={true}
      />
      <div className="link-access font-18px">
        <a href="">Home</a> &gt; <a href="./manga.html">Manga</a> &gt; <span>Kanojo,
            Okarishimasu</span>
      </div>
    </>
  );
}
