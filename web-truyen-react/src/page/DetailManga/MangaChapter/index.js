import { useState } from "react";
import "../../../static/css/page/DetailManga/manga-chapter.css";

const mockData = [
  {
    chapter: 7,
    createdDate: "20/01/2021, 09:41",
    status: "locked",
  },
  {
    chapter: 6,
    createdDate: "20/01/2021, 09:41",
    status: "locked",
  },
  {
    chapter: 5,
    createdDate: "20/01/2021, 09:41",
    status: "locked",
  },
  {
    chapter: 4,
    createdDate: "20/01/2021, 09:41",
    status: "locked",
  },
  {
    chapter: 3,
    createdDate: "20/01/2021, 09:41",
    status: "unlocked",
  },
  {
    chapter: 2,
    createdDate: "20/01/2021, 09:41",
    status: "unlocked",
  },
  {
    chapter: 1,
    createdDate: "20/01/2021, 09:41",
    status: "unlocked",
  },
];
export default function MangaChapter() {
  const [data, setData] = useState(mockData);

  return (
    <div className="detail-manga-chapter">
      <div className="title-manga-chapter">
        <h2>Danh sách chương</h2>
      </div>
      <div className="list-chapter">
        <div className="chapters">
          {data.map((ele) => {
            return (
              <div className="chapter">
                <div className="chapter-name font-18px">
                  Chapter {ele.chapter}{" "}
                  {ele.status === "locked" ? (
                    <i className="fas fa-lock status"></i>
                  ) : null}
                </div>
                <div className="chapter-date font-16px">{ele.createdDate}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
