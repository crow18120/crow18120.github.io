import CoverImg from "../../components/CoverImage";

import coverImgSrc from "../../static/img/page/NewsPage/cover-image.png";

import "../../static/css/page/NewsPage/news.css";
import { numberWithCommas } from "../../static/js/function";
const mockData = [
  {
    srcImg: require("../../static/img/news/news-image.png"),
    title: "Tác giả của Assasination Classroom cho ra mắt Manga mới",
    createdDate: "18/01/2021",
    description: `Assassination Classroom hay Lớp học ám sát là bộ manga ăn khách
  được sáng tác bởi Matsui Yuusei, đây cũng...`,
    view: 18000,
    share: 1000,
  },
  {
    srcImg: require("../../static/img/news/news-image(1).png"),
    title: "Hunter x Hunter “đạt kỷ lục” 100 số liên tục không có Chương mới",
    createdDate: "18/01/2021",
    description: `Trong ngành công nghiệp Manga, khi nhắc tới Hunter x Hunter, độc
    giả không ấn tượng với "đây là một...`,
    view: 18000,
    share: 1000,
  },
  {
    srcImg: require("../../static/img/news/news-image.png"),
    title: "Tác giả của Assasination Classroom cho ra mắt Manga mới",
    createdDate: "18/01/2021",
    description: `Assassination Classroom hay Lớp học ám sát là bộ manga ăn khách
  được sáng tác bởi Matsui Yuusei, đây cũng...`,
    view: 18000,
    share: 1000,
  },
  {
    srcImg: require("../../static/img/news/news-image(1).png"),
    title: "Hunter x Hunter “đạt kỷ lục” 100 số liên tục không có Chương mới",
    createdDate: "18/01/2021",
    description: `Trong ngành công nghiệp Manga, khi nhắc tới Hunter x Hunter, độc
    giả không ấn tượng với "đây là một...`,
    view: 18000,
    share: 1000,
  },
];
export default function NewsPage() {
  return (
    <>
      <CoverImg srcImg={coverImgSrc} text="tin tức manga" />
      <div className="content-news row">
        <div className="file-items news-area col-lg-9">
          <div className="file-title">
            <i className="fas fa-newspaper icon"></i>
            <h3>Bài viết mới nhất</h3>
          </div>
          {mockData.map((ele) => {
            return (
              <div className="file-row row news">
                <div className="image-news col-lg-5 col-sm-6">
                  <img src={ele.srcImg} alt="" />
                </div>
                <div className="des-news col-lg-7 col-sm-6">
                  <div className="title-news">
                    <h3>{ele.title}</h3>
                  </div>
                  <div className="date-news font-16px">
                    <i className="fas fa-clock icon"></i>
                    {ele.createdDate}
                  </div>
                  <div className="text-news font-18px col-sm-10">
                    {ele.description}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="file-row btn-news">
            <div className="text-btn-news">
              <h3>
                <span className="more-news">Xem thêm bài viết</span>
              </h3>
            </div>
            <hr />
          </div>
        </div>
        <div className="file-items sub-news-area col-lg-3">
          <div className="sub-sub-news col-lg-12 col-md-8">
            <div className="file-title">
              <i className="fas fa-newspaper icon"></i>
              <h3>Bài viết nổi bật</h3>
            </div>
            {mockData.map((ele, index) => {
              if (index > 2) return null;
              return (
                <div className="file-row row sub-news">
                  <div className="image-news col-lg-12 col-sm-6">
                    <img src={ele.srcImg} alt="" />
                  </div>
                  <div className="des-news col-lg-12 col-sm-6">
                    <div className="title-news font-18px">{ele.title}</div>
                    <div className="feature-news row">
                      <div className="view-news col-6">
                        <i className="fas fa-eye icon"></i>
                        {numberWithCommas(ele.view)} xem
                      </div>
                      <div className="share-news col-6">
                        <i className="fas fa-share-alt icon"></i>
                        {numberWithCommas(ele.share)} share
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sub-sub-news col-lg-12 col-md-4">
            <div className="file-title">
              <i className="fas fa-newspaper icon"></i>
              <h3>Bạn quan tâm</h3>
            </div>
            <ul className="file-row news font-18px">
              <li>
                <i className="fas fa-angle-right icon"></i>
                <a href="">Nhân vật Manga</a>
              </li>
              <li>
                <i className="fas fa-angle-right icon"></i>
                <a href="">Arts & Cosplay</a>
              </li>
              <li>
                <i className="fas fa-angle-right icon"></i>
                <a href="">Phân tích và bình luận</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
