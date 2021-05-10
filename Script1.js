// JavaScript source code
var show = function (elem) {
    elem.style.display = 'grid';
};

var hide = function (elem) {
    elem.style.display = 'none';
};

var toggle = function (elem) {
    if (window.getComputedStyle(elem).display === 'block') {
        hide(elem);
        return;
    }
    show(elem);
}