import "../../../static/css/page/DetailManga/manga-content.css";
import { jsUcfirst } from "../../../static/js/function";

export default function MangaContent(params) {
  const { name, author, imgSrc, views, follow, like, tags, description } =
    params.data;
  return (
    <div className="detail-manga-content">
      <div className="detail-manga row">
        <div className="detail-manga-image col-sm-4">
          <img src={imgSrc} alt="" />
        </div>
        <div className="detail-manga-text col-sm-8">
          <div className="detail-manga-categories font-18px">
            {tags.map((ele, index) => {
              return index === 0 ? (
                <a> {jsUcfirst(ele)} </a>
              ) : (
                <a> - {jsUcfirst(ele)} </a>
              );
            })}
          </div>
          <div className="detail-manga-name">
            <h2>{name.toLocaleUpperCase()}</h2>
          </div>
          <div className="detail-manga-author">
            <h3>Tác giả: {author}</h3>
          </div>
          <div className="detail-manga-status">
            <div id="manga-status-like">
              <i className="fas fa-thumbs-up status"></i>
              <span>{follow}</span>
            </div>
            <div id="manga-status-heart">
              <i className="fas fa-heart status"></i>
              <span>{like}</span>
            </div>
            <div id="manga-status-view">
              <i className="fas fa-eye status"></i>
              <span>{views}</span>
            </div>
          </div>
          <div className="detail-manga-intro font-18px">
            {description}
            <div className="btn-news">
              <hr className="hr-left" />
              <hr className="hr-right" />
              <p className="text-btn-news font-18px">Xem thêm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
