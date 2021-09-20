var showblock = function (elem) {
    elem.style.display = 'block';
};

var hide = function (elem) {
    elem.style.display = 'none';
};

var hideRest = function (elems) {
    elems.forEach(element => { hide(element); });
};

var toggle = function (elem) {
    console.log(elem);
    if (window.getComputedStyle(elem).display === 'block') {
        hide(elem);
        return;
    }
    showblock(elem);
}

var toggleNext = function (elem) {
    toggle(elem.nextElementSibling);
}



