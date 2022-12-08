import $ from "jquery";

export function active_btn(nameFileItem, currentPage) {
  const itemName = nameFileItem + " .btn-dot";
  const listBtn = $(itemName);
  for (const btn of listBtn) {
    $(btn).text() === currentPage.toString()
      ? $(btn).addClass("active-dots")
      : $(btn).removeClass("active-dots");
  }
}

export function file_item_quote(nameFileItem) {
  let item = nameFileItem + " .file-item .quote";
  let item_description = nameFileItem + " .file-item .quote-excerpt";
  let listItem = $(item);
  if ($(window).width() <= 500) {
    $(item_description).addClass("dp-none");
  } else {
    $(item_description).removeClass("dp-none");
  }

  for (let i = 0; i < listItem.length; i++) {
    if (
      $(listItem[i]).offset().left + $(listItem[i]).outerWidth() >
      $(window).width()
    ) {
      $(listItem[i]).addClass("quote-left");
    }
    if ($(listItem[i]).offset().left < 0) {
      $(listItem[i]).removeClass("quote-left");
    }
  }
}
