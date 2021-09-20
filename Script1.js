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
    if (window.getComputedStyle(elem).display === 'block') {
        hide(elem);
        return;
    }
    show(elem);
}

var collapsibles = document.getElementsByClassName("collapsible");

for(var i = 0; i < collapsibles.length; i++){
    collapsibles[i].addEventListener("click", function(){
        console.log(this.nextElementSibling.attr('class'));
        toggle(this.nextElementSibling);
    });
}



