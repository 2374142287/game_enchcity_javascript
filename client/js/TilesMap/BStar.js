/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-2-23
 * Time: 下午2:08
 * To change this template use File | Settings | File Templates.
 */
define(['../TilesMap/Point'],function(Point) {
    var BStar = Class.extend({
        init: function(arrw,arrh) {
            this.arr = Views.MainView.GameView.MapWorker.map2Arr;
            this.arrW = arrw;
            this.arrH = arrh;
            this.lines = new Array();
            this.resultLines = new Array();
            this.end = false;
            this.isstartPoint = true;
            /*
            for(var i=0;i<this.arrW;i++){
                for(var j=0;j<this.arrH;j++){
                    trace("BStar arr["+i+","+j+"]="+this.arr[i][j]);
                }
            }*/
        },
        clearRecord: function(){
            this.lines = [];
            this.resultLines = [];
            this.end = false;
            this.isstartPoint = true;
        },
        move: function(sx, sy, tx, ty) {
            if (this.end) return;
            if (sx < 0 || sx > this.arrW || sy < 0 || sy > this.arrH) return;
            if (this.isBlock(sx, sy)) return;
            if (this.HasMoved(sx, sy)) return;
            if (this.isEnd(sx, sy, tx, ty))
            {
                this.resultLines.push(new Point(sx, sy));
                //trace("x:" + sx + " y:" + sy);
                this.end = true;
                return;
            }
            this.lines.push(new Point(sx, sy));

            this.goNext(sx, sy, tx, ty);
        },
        HasMoved: function(x, y)
        {
            for (var i=0;i<this.lines.length;i++) {
                if (this.lines[i].X == x && this.lines[i].Y == y)
                    return true;
            }
            return false;
        },
        isEnd: function(sx, sy, tx, ty) {
            if ((tx == sx) && (ty == sy)) return true;
            return false;
        },
        isBlock: function(x, y) {
            if (x < 0 || x >= this.arrW || y < 0 || y >= this.arrH) return true;
            //trace("BStar isBlock arr["+x+"]["+y+"]="+this.arr[x][y]);
            return this.arr[x][y];
        },
        goNext: function(x, y,tx,ty) {

            if(this.isstartPoint){
                this.isstartPoint = false;
            }
            else{
                this.resultLines.push(new Point(x,y));
                //trace("BStar x:" + x + " y:" + y);
            }
            //DrawRect(x, y, 0);
            var addx = 1;
            if (tx < x) addx = -1;
            var addy = 1;
            if (ty < y) addy = -1;

            if (!this.isBlock(x + addx, y)) {
                //如果在同一x坐标上
                if (ty == y) this.move(x + addx, y, tx, ty);
                if (tx == x) this.move(x, y + addy, tx, ty);
                //x向目标一步无障碍（假设目标在起始点右下方）
                this.move(x + addx, y, tx, ty);  //往前走
                if (this.isBlock(x + addx, y + addy)) { //右下方有障碍，往下走
                    this.move(x, y + addy, tx, ty);
                }
                if (this.isBlock(x + addx, y - addy)){   //右上方有障碍，往上走
                    this.move(x, y - addy, tx, ty);
                }
                if (this.isBlock(x - addx, y + addy)) {  //左下方有障碍，往下走，往后走
                    this.move(x, y + addy, tx, ty);
                    this.move(x - addx, y, tx, ty);
                }
                if (this.isBlock(x - addx, y - addy))
                {     //左上方有障碍，往上走,往后走
                    this.move(x, y - addy, tx, ty);
                    this.move(x - addx, y, tx, ty);
                }
            }else{  //若前方有障碍
                if (!this.isBlock(x, y + addy)) { //优先向下走
                    this.move(x, y + addy, tx, ty);
                }
                if (!this.isBlock(x, y - addy)) { //向上走
                    this.move(x, y - addy, tx, ty);
                }
            }
        }
});
    return BStar;
});