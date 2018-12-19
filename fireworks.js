// >>0 舍弃小数取整运算
const randomNum = (m, n) => (Math.random() * (n - m + 1) + m) >> 0;
const randomBrightColor = () => {
    let arr = [0, 255, randomNum(0,255)];
    //Fisher-Yates 随机排序
    for (let i = arr.length; i--;) {
        const j = randomNum(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return "rgba(" + arr + ","; //方便后续添加alpha值
};

class Star{
    constructor(dX, dY){
        this.g = 0;
        this.coordX = dX;
        this.coordY = dY;
        this.speedR = randomNum(3, 4);
        this.speedAngle = Math.random() * Math.PI * 2;
        this.tailData = [];
    }
}

class Fireworks {
    constructor(cvs){
        this.ctx = cvs.getContext("2d");
        this.color = randomBrightColor();
        this.endY = randomNum((cvs.height * 0.1) >> 0, (cvs.height * 0.5) >> 0);
        this.coorX = randomNum((cvs.width * 0.1) >> 0, (cvs.width * 0.9) >> 0) - 10;
        this.coorY = cvs.height - 10;
        this.stars = [];
        //key是star从存在到消失之间网页的绘制次数(帧数)
        this.key = 0;
    }

    fire() {
        if (this.coorY > this.endY) {
            for (let i = 10; i--;) {
                this.ctx.fillStyle = this.color + (1 - i / 10) + ")";
                this.ctx.fillRect(this.coorX, this.coorY + i * 5, 5, 5);
            }
            this.coorY -= 8;
            return;
        }

        if (this.stars.length === 0) {
            for (let i = 30; i--;) {
                this.stars.push(new Star(this.coorX, this.coorY));
            }
        }

        if (this.key < 120) {
            let tailLength = this.key++ < 60 ? (this.key/2)>>0 : 30;

            for (let star of this.stars) {
                star.tailData.unshift([star.coordX, star.coordY]);
                if(star.tailData.length > tailLength) {star.tailData.pop();} 

                star.coordX += star.speedR * Math.cos(star.speedAngle);
                star.coordY += star.speedR * Math.sin(star.speedAngle) + star.g;
                star.speedR = star.speedR > 0.04 ? star.speedR - 0.03 : 0;
                star.g += 0.02;
            }

            for (let i = tailLength; i--;) {
                //两次亮度衰减确定alpha值：从爆炸到消失的时间尺度衰减，从头部到尾部空间尺度衰减
                this.ctx.fillStyle = this.color + (120 - this.key) * (tailLength - i) / (100 * tailLength) + ")";
                for (let star of this.stars) {
                    this.ctx.fillRect(star.tailData[i][0], star.tailData[i][1], 3, 3);
                }
            }
            return;
        }

        return true;
        //js默认返回undefined；return true 表示此对象已经完成使命可以删除。
    }
}
