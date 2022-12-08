import { useState } from "react";
import "../../static/css/components/file-items.css";

export default function FileItemsProduct(params) {
  const { id, text, icon, data, hasArrowBtn } = params;
  const [page, setPage] = useState(1);

  return (
    <div class="file-items" id={id}>
      <div class="file-title">
        <i class={icon}></i>
        <h3>{text}</h3>
        <a href="" class="file-button font-18px">
          Xem thêm
        </a>
      </div>
      <div class="file-row row shop">
        {data.map((ele) => {
          return (
            <div class="file-item col-md-3 col-6">
              <img src={ele.srcImg} alt="" />
              <div class="item-name font-18px">{ele.name}</div>
              <div class="item-feature font-16px">
                {ele.price} VNĐ
                <div class="item-feature-icon">
                  <span class="fa fa-shopping-cart" aria-hidden="true"></span>
                  <span class="fa fa-heart" aria-hidden="true"></span>
                </div>
              </div>
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
