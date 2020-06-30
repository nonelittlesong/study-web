// 参考：
// https://www.jquery123.com/category/offset/
// https://blog.csdn.net/tanga842428/article/details/78213427


//=============== JQuery 实现 ================
// 绝对位置
var x = $('#id').offset().left;
var y = $('#id').offset().top;
// 相对父元素位置
var x = $('#id').position().left;
var y = $('#id').position().top;


// =============== JS 实现 ===============
// https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
// Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
var rect = element.getBoundingClientRect();
