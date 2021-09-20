// JavaScript source code
var showgrid = function (elem) {
    elem.style.display = 'grid';
};

var showblock = function (elem) {
    elem.style.display = 'block';
};

var hide = function (elem) {
    elem.style.display = 'none';
};

var hideRest = function (elems) {
    elems.forEach(element => { hide(element); });
}

var toggle = function (elem) {
    if (window.getComputedStyle(elem).display === 'block') {
        hide(elem);
        return;
    }
    show(elem);
}

var collapsibles = document.getElementsByClassName("collapsible");

for(int i = 0; i < collapsibles.length; i++){
    collapsibles[i].addEventListener("click", function(){
        this.nextElementSibling.display === "block" ? this.nextElementSibling.display = "none" : this.nextElementSibling.display = "block";
    });
}


