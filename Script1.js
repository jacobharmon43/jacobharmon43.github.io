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

var coll = document.getElementsByClassName("collapsible");
var i;

for(i = 0; i < coll.length; i++){
    coll[i].addEventListener("click", function() {
        var content = this.nextElementSibling;
        if(content.style.display === "block"){
            content.style.display = "none";
        }
        else{
            content.style.display = "block";
        }
    });
}


