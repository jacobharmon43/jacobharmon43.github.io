function dragStart(event) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
}

function drop(event) {
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var curr = (parseInt(style.getPropertyValue("left"), 10) - event.clientX, parseInt(style.getPropertyValue("top"), 10) - event.clientX)
    var initSpeedX = curr[0] - offset[0];
    var initSpeedY = curr[1] - offset[1];
    var dm = document.getElementById('Throwbox');
    var rect = event.getBoundingClientRect();
    while (dm.style.bottom < rect.y + rect.height) {
        setTimeout(()=>{console.log("Delay");}, 500);
        dm.style.left += initSpeedX;
        if (init.style.left <= rect.y - rect.width || init.style.left >= rect.y + rect.width) {
            initSpeedX = 0;
        }
        dm.style.top += initSpeedY;
    }
    dm.style.top = rect.y + rect.height;
    return false;
}

function dragover(event) {
    event.preventDefault();
    return false;
}

