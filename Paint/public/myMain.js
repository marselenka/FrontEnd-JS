const init = () => {
    model.canvas = document.getElementById('canvas');
    model.ctx = model.canvas.getContext("2d");
    model.colorChanger = document.getElementById('color');
    model.sizeScroll = document.getElementById("size");
    model.canvas.onmousedown = model.mouseDown;
    model.canvas.onmousemove = model.mouseMove;
    model.canvas.onmouseup = model.mouseUp;
    model.canvas.onmouseleave = model.mouseUp;
    model.colorChanger.onchange = model.changeColor;
    model.sizeScroll.onchange = model.changeSize;
};
init();

