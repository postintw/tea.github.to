function mover(e) {
    var lef = document.getElementById('teabar_content').offsetLeft,
        lefwidth = document.getElementById('teabar_content').offsetWidth;
    if (lef > (0 - e)) {
        alert('第一頁不能往前翻');
    }else if ((lef + e) <= (0 - lefwidth)) {
        alert('已經到最後一頁');
    } else {
        $('#teabar_content').animate({
                left: lef + e
            }, 5);
    }
                
}