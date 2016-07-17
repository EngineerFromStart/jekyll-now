(function(window) {

    var Hexagon = function(selector, options) {
        this.selector = selector;
        this.options = options;

        this.init(selector, options);
    }

    Hexagon.prototype.init = function(selector, options) {

        var canvas = document.querySelector(selector);
        this.canvas = canvas;

        if (this.options.fill) {
            this.fill = this.options.fill;
        }

        canvas.className += "hexagon";

        this.hexagonAngle = 0.523598776; // 30 degrees in radians
        this.sideLength = options.sideLength || 75;
        var row = options.row || 0,
            col = options.col || 0;

        this.hexHeight = Math.sin(this.hexagonAngle) * this.sideLength;
        this.hexRadius = Math.cos(this.hexagonAngle) * this.sideLength;
        this.hexRectangleHeight = this.sideLength + 2 * this.hexHeight;
        this.hexRectangleWidth = 2 * this.hexRadius;

        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#CCCCCC";
            ctx.lineWidth = 1;

            this.drawBoard(ctx, row, col);
        } else {
            throw "Not a canvas: canvas context not found";
        }
    }

    /*
        can loop the i (x) and j (y) amounts to create multiple hexs,
        by row and columns
    */
    Hexagon.prototype.drawBoard = function(canvasContext, row, col) {
        var i = row,
            j = col;
        this.drawHexagon(
            canvasContext,
            i * this.hexRectangleWidth + ((j % 2) * this.hexRadius),
            j * (this.sideLength + this.hexHeight)
        );
    }

    Hexagon.prototype.drawHexagon = function(canvasContext, x, y) {
        var fill = this.fill || false;
        var img;
        var _this = this;

        canvasContext.beginPath();
        canvasContext.moveTo(x + this.hexRadius, y);
        canvasContext.lineTo(x + this.hexRectangleWidth, y + this.hexHeight);
        canvasContext.lineTo(x + this.hexRectangleWidth, y + this.hexHeight + this.sideLength);
        canvasContext.lineTo(x + this.hexRadius, y + this.hexRectangleHeight);
        canvasContext.lineTo(x, y + this.sideLength + this.hexHeight);
        canvasContext.lineTo(x, y + this.hexHeight);
        canvasContext.closePath();

        if (fill) {
            if (fill.type == "image") {
                img = new Image;
                img.onload = function() {
                    canvasContext.clip();
                    canvasContext.fillStyle = "white";
                    canvasContext.fill();
                    canvasContext.drawImage(img, (_this.canvas.width-75)/2,(_this.canvas.height-75)/2, 75, 75);
                }
                img.src = fill.value;
            } else if (fill.type == "text"){
                canvasContext.textAlign = "center";
                canvasContext.fillText(fill.value, this.canvas.width/2, this.canvas.height/2);
            }else if (fill.type == "color") {
                canvasContext.fillStyle = fill.value;
                canvasContext.fill();
            } else {
                canvasContext.fill();
            }
        } else {
            canvasContext.stroke();
        }
    }
    window.Hexagon = Hexagon;
})(window);
