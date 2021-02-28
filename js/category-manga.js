$(function() {
    let checkmarks = $('#category-check input');
    console.log($(checkmarks[0]).prop('checked'))
    checkmarks.click(function() {
        if($(this).closest('.filter-box').text().includes('Tất cả')) {
            if($(this).prop('checked') == true) checkmarks.prop('checked', true);
            else checkmarks.prop('checked', false);
        }
    })
})