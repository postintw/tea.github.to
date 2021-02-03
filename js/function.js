function maxlength(obj, lg = 10) {    
    for (let i in document.querySelectorAll(obj)) {
        if (i.value.length > lg) {        i.value = i.value.slice(0, lg);    }
}
}
maxlength('input');
// 長度限制
// 全選帶有change事件
function chkAll(obj){
    var ischecked = obj.checked;
    $("input:checkbox[child]").each(function () {
        $(this).prop('checked',ischecked).change();
    });
};
// 表格內全選，DOM路徑table>tr>td>input:checkbox，移動到table>tr>td:first>input:checkbox
// <input type="checkbox" onclick="checkAll(this)">
function checkAll(obj) {
    $(obj).parent.parent.find('tr').each(function () {
        $(this).first.first.checked = obj.checked;
    });
}
function allow(e,i,j,arr){
var cl=$(e.parentNode.parentNode);
     if ($(e).prop('checked') === true) {
        
    cl.find('td:eq(2)>input').attr('name','pic[]');
    cl.find('td:eq(3)>input').attr('name','star[]');
    cl.find('td:eq(4)>input').attr('name','hp[]');
    cl.find('td:eq(5)>input').attr('name','hps[]');
    cl.find('td:eq(5)>input').attr('name','hps[]');
    cl.find('td:eq(6)>input').attr('name','speed[]');
    cl.find('td:eq(7)>input').attr('name','damage[]');
    cl.find('td:eq(8)>input').attr('name','defense[]');
    }else{
        for(var i=2;i<9;i++){
            cl.find(`td:eq(${i})>input`).attr('name','');
        }
    }
}        
function allowsend(e, i, j, arr) {
    var cl = $(e.parentNode.parentNode);
    if ($(e).prop('checked') === true) {
        for (var k = i; k < j; k++){
            // 未完成待續
        }
    }
}
function del(arr,item) {
    var acc = arr.indexOf(item);
    arr.splice(acc, 1);
}