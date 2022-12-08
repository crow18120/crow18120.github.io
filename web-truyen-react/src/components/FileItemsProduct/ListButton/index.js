import { useEffect, useState } from "react";
import { active_btn } from "../../../static/js/components/file-item";

export default function ListButton(params) {
  const { hasArrowBtn, numberBtn, id, setPage } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [showBtns, setShowBtns] = useState(
    numberBtn > 5
      ? [...Array.from({ length: 4 }, (_, i) => i + 1), "..."]
      : Array.from({ length: numberBtn }, (_, i) => i + 1)
  );
  const clickBtnDot = (e) => {
    if (!isNaN(+e.target.innerText)) setCurrentPage(+e.target.innerText);
    else {
      e.target.innerText === "‹"
        ? setCurrentPage((currentPage) => {
            if (currentPage === 1) return currentPage;
            return currentPage - 1;
          })
        : setCurrentPage((currentPage) => {
            if (currentPage === numberBtn) return currentPage;
            return currentPage + 1;
          });
    }
  };

  useEffect(() => {
    active_btn(`#${id}`, currentPage);
    setPage(currentPage);
    numberBtn > 5 &&
      setShowBtns(() => {
        if (currentPage <= 3) {
          return [...Array.from({ length: 4 }, (_, i) => i + 1), "..."];
        } else if (currentPage >= numberBtn - 2) {
          return [
            "...",
            ...Array.from({ length: 4 }, (_, i) => i + numberBtn - 3),
          ];
        } else {
          return ["...", currentPage - 1, currentPage, currentPage + 1, "..."];
        }
      });
  }, [currentPage]);

  return (
    <ul className="file-dots font-16px">
      {hasArrowBtn ? (
        <li className="btn-dot" key="decrease-btn" onClick={clickBtnDot}>
          ‹
        </li>
      ) : null}
      {showBtns.map((ele, i) => {
        return (
          <li
            className="btn-dot"
            key={!isNaN(+ele) ? ele : ele + i}
            onClick={!isNaN(+ele) ? clickBtnDot : null}
          >
            {ele}
          </li>
        );
      })}
      {hasArrowBtn ? (
        <li className="btn-dot" key="increase-btn" onClick={clickBtnDot}>
          ›
        </li>
      ) : null}
    </ul>
  );
}
