import "../../../static/css/page/ListManga/filter.css";
import { jsUcfirst } from "../../../static/js/function";
import { useState, useEffect } from "react";
import $ from "jquery";

const categories = [
  "comedy",
  "advanture",
  "fantasy",
  "shounen",
  "action",
  "horror",
  "other",
];

export default function Filter() {
  const [filter, setFilter] = useState({ categories: [], status: "" });
  const handleClickCheckbox = (e) => {
    const checkbox = $(e.target).closest(".filter-box").find("input");
    const categories = filter.categories;
    checkbox.is(":checked")
      ? setFilter({
          ...filter,
          categories: categories.filter((ele) => ele !== checkbox.val()),
        })
      : setFilter({ ...filter, categories: [...categories, checkbox.val()] });
  };

  const handleClickRadiobtn = (e) => {
    const radiobtn = $(e.target).closest(".filter-box").find("input");
    if (!radiobtn.is(":checked")) {
      setFilter({ ...filter, status: radiobtn.val() });
    }
  };

  useEffect(() => {
    const radiobtns = $("#status-check input");
    for (const btn of radiobtns) {
      $(btn).val() === filter.status
        ? $(btn).prop("checked", true)
        : $(btn).prop("checked", false);
    }
  }, []);

  return (
    <>
      <div className="filter-categories-btn">
        <div className="cover-screen-filter"></div>
        <i className="fas fa-filter icon"></i>
      </div>
      <div className="filter-categories col-3">
        <div className="filter-category" id="category-check">
          <div className="filter-title">
            <i className="fas fa-filter icon"></i>
            <h3>Thể loại</h3>
            <i className="fas fa-angle-up icon"></i>
          </div>
          <div className="filter-content font-18px">
            {categories.map((ele) => {
              return (
                <label className="filter-box">
                  {jsUcfirst(ele)}
                  <input type="checkbox" value={ele} />
                  <span
                    className="checkmark"
                    onClick={handleClickCheckbox}
                  ></span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="filter-category" id="status-check">
          <div className="filter-title">
            <i className="fas fa-filter icon"></i>
            <h3>Tình trạng</h3>
            <i className="fas fa-angle-up icon"></i>
          </div>
          <div className="filter-content font-18px">
            <label className="filter-box radio">
              Tất cả
              <input type="radio" name="radio" value="" />
              <span className="checkmark" onClick={handleClickRadiobtn}></span>
            </label>
            <label className="filter-box radio">
              Đang tiến hành
              <input type="radio" name="radio" value="continue" />
              <span className="checkmark" onClick={handleClickRadiobtn}></span>
            </label>
            <label className="filter-box radio">
              Hoàn thành
              <input type="radio" name="radio" value="complete" />
              <span className="checkmark" onClick={handleClickRadiobtn}></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
