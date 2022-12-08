import Slider from "react-slick";
import "../../../static/css/page/HomePage/category-manga.css";

export default function CategoryManga() {
  const mockData = [
    {
      srcImg: require("../../../static/img/page/HomePage/Category/category-action.png"),
      name: "action",
    },
    {
      srcImg: require("../../../static/img/page/HomePage/Category/category-adventure.png"),
      name: "adventure",
    },
    {
      srcImg: require("../../../static/img/page/HomePage/Category/category-comedy.png"),
      name: "comedy",
    },
    {
      srcImg: require("../../../static/img/page/HomePage/Category/category-detective.png"),
      name: "detective",
    },
    {
      srcImg: require("../../../static/img/page/HomePage/Category/category-fantasy.png"),
      name: "fantasy",
    },
    {
      srcImg: require("../../../static/img/page/HomePage/Category/category-horror.png"),
      name: "horror",
    },
    {
      srcImg: require("../../../static/img/page/HomePage/Category/category-isekai.png"),
      name: "isekai",
    },
    {
      srcImg: require("../../../static/img/page/HomePage/Category/category-shounen.png"),
      name: "shounen",
    },
  ];

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    dots: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 850,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 690,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 401,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="category-manga">
      <div className="category-title">
        <h2>THỂ LOẠI</h2>
      </div>
      <Slider className="categories" {...settings}>
        {mockData.map((ele) => {
          return (
            <div key={ele.name}>
              <div className="category">
                <img src={ele.srcImg} alt="img-category" />
                <div className="category-name">
                  <h3>{ele.name.toLocaleUpperCase()}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <button className="category-button">
        {/* <a href="./category-manga.html"> */}
        <a>
          <h3>TẤT CẢ THỂ LOẠI</h3>
        </a>
      </button>
    </div>
  );
}
