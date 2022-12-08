import $ from "jquery";
import { useEffect } from "react";

import "../../static/css/components/cover-img.css";

export default function CoverImg(params) {
  const { srcImg, text, isShort } = params;
  useEffect(() => {
    if (!isShort) {
      $("#cover-image").height(400).css({
        overflowY: "hidden",
        marginBottom: "0px",
      });
    }
  }, []);
  return (
    <div className="anh-bia" id="cover-image">
      <img src={srcImg} alt="cover-image" />
      <div className="ten-bia">
        <ul>
          <li>
            <h1>
              <span>{text.toUpperCase()}</span>
            </h1>
          </li>
        </ul>
      </div>
    </div>
  );
}
