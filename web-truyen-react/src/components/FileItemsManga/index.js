import { useEffect, useState } from "react";
import "../../static/css/components/file-items.css";
import { file_item_quote } from "../../static/js/components/file-item";
import { numberWithCommas } from "../../static/js/function";
import ListButton from "./ListButton";

export default function FileItemsManga(params) {
  const { id, text, isListPage, data, hasArrowBtn } = params;
  const [page, setPage] = useState(1);

  useEffect(() => {
    file_item_quote(`#${id}`);
  }, []);

  return (
    <div className={!isListPage ? "file-items" : "file-items col-9"} id={id}>
      <div className="file-title">
        <i className="fas fa-book icon"></i>
        <h3>{text}</h3>
        {!isListPage ? (
          <a href="./manga.html" className="file-button font-18px">
            Xem thêm
          </a>
        ) : null}
      </div>
      <div className={"file-row row manga"}>
        {data.map((ele) => {
          return (
            <div
              className={
                !isListPage
                  ? "file-item col-md-3 col-6"
                  : "file-item col-md-4 col-6"
              }
              key={ele.name}
            >
              <span className="total-item">
                <a href="./detail-manga.html">
                  <img src={ele.imgSrc} alt="" />
                  <div className="item-name font-18px">{ele.name}</div>
                  <div className="item-feature font-16px">
                    Chương {ele.chapter}
                  </div>
                </a>
                <div className="quote font-16px">
                  <div className="quote-name font-18px">{ele.name}</div>
                  <div className="quote-status">Tình trạng: {ele.status}</div>
                  <div className="quote-status">
                    Lượt xem: {numberWithCommas(ele.view)}
                  </div>
                  <div className="quote-status">
                    Lượt theo dõi: {numberWithCommas(ele.follow)}
                  </div>
                  <div className="quote-list-tags">
                    {ele.tags.map((tag) => {
                      return <a href="">{tag}</a>;
                    })}
                  </div>
                  <div className="quote-excerpt">{ele.description}</div>
                </div>
              </span>
            </div>
          );
        })}
      </div>
      <ListButton
        hasArrowBtn={hasArrowBtn}
        numberBtn={7}
        id={id}
        setPage={setPage}
      />
    </div>
  );
}
