// 参考
// https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
// https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript
// https://stackoverflow.com/questions/18880890/how-do-i-toggle-an-elements-class-in-pure-javascript

/**
 * Toggle an element's class in pure JavaScript
 */
// Using a class instead, see note http://www.2ality.com/2012/08/ids-are-global.html
const menu = document.querySelector('.menu')
menu.classList.toggle('hidden-phone');
