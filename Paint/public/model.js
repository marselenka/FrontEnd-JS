var socket;
const model = {
    canvas: null,
    ctx: null,
    x: 0,
    y: 0,
    draw: false,
    CurrentColor: "black",
    sizeScroll: null,

    isDraw: function () {
        model.draw = true;
    },
    mouseDown: function (e) {
        model.isDraw();
        model.x = e.layerX;
        model.y = e.layerY;
        model.ctx.beginPath();
        model.ctx.moveTo(model.x, model.y);
        model.ctx.strokeStyle = model.CurrentColor;
        model.ctx.stroke();
    },
    mouseMove: function (e) {
        if (model.draw) {
            model.x = e.layerX;
            model.y = e.layerY;
            model.ctx.lineTo(model.x, model.y);
            model.ctx.lineWidth = model.sizeScroll.value;
            model.ctx.stroke();
        }
        console.log("sending: " + e.layerX + "," + e.layerY+model.CurrentColor);
        data = {
            x: e.layerX,
            y: e.layerY,
            draw: model.draw,
        };
        socket.emit('mouseMove', data);
    },

    newPoint: function (data) {
        if (model.draw === false && data.draw === true) {
            model.ctx.moveTo(data.x, data.y);
        }else if (data.draw===true){
            model.ctx.lineTo(data.x, data.y);
        }
        model.draw=data.draw;
        model.ctx.lineWidth = model.sizeScroll.value;
        model.ctx.stroke();
    },
    mouseUp: function () {
        model.draw = false;
    },

    changeColor: function (e) {
        model.CurrentColor = e.target.value;
    },
};

socket = io.connect('http://localhost:3000/');
socket.on('mouseMove', model.newPoint);