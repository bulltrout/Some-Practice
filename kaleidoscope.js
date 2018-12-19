
const randomColor = ()=> '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);

function kaleidoscope(cvs, num, img) {
    if (img===null || img.width===0) return;
    const ctx = cvs.getContext("2d");

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.save();
    ctx.translate(cvs.width/2, cvs.height/2 );
    for (let i = 0; i < num * 2; i++) {
        ctx.rotate(Math.PI * (i % 2) * 2 / num);
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, -img.height*0.2);
    }
    ctx.restore();

}

function kaleido(radius){
    const orgCvs = document.createElement("canvas"),
        orgCtx = orgCvs.getContext("2d");
        
    orgCvs.width = orgCvs.height = radius;
    for (let i = 0; i < radius; i++) {
        orgCtx.save();
        orgCtx.translate(Math.random() * radius, Math.random() * radius);
        orgCtx.rotate(Math.random() * Math.PI);
        orgCtx.fillStyle = randomColor();
        orgCtx.fillRect(0, 0, 15, 15);
        orgCtx.restore();
    }
    return orgCvs;
}

function scale (target) {
    let targetCtx = target.getContext("2d"),
        temp = document.createElement("canvas"),
        canvasSize = 1;

    temp.width = target.width;
    temp.height = target.height;
    temp.getContext("2d").drawImage(target,0,0);
    
    target.onmousewheel = function(event) {

        canvasSize += event.wheelDelta > 0 ? 0.02 : -0.02;
        target.width = temp.width * canvasSize;
        target.height = temp.height * canvasSize;
        targetCtx.save();
        targetCtx.scale(canvasSize, canvasSize);
        targetCtx.drawImage(temp,0,0);
        targetCtx.restore();

        return false;
    };
}

function finiteDrag (select, target) {

    select.onmousedown = function (event) {
        let topGap = event.clientY - select.offsetTop,
            leftGap = event.clientX - select.offsetLeft;

        document.onmousemove = function (event) {
            let selectY = event.clientY - topGap,
                selectX = event.clientX - leftGap;

            if (selectY < target.offsetTop - select.offsetHeight) {
                select.style.top = target.offsetTop - select.offsetHeight + "px";
            } else if (selectY > target.offsetTop + target.offsetHeight + select.offsetWidth) {
                select.style.top = target.offsetTop + target.offsetHeight + select.offsetWidth + "px";
            } else {
                select.style.top = selectY - 1 + "px";
            }

            if (selectX < target.offsetLeft - select.offsetWidth) {
                select.style.left = target.offsetLeft - select.offsetWidth + "px";
            } else if (selectX > target.offsetLeft + target.offsetWidth + select.offsetHeight - 1) {
                select.style.left = target.offsetLeft + target.offsetWidth + select.offsetHeight - 1 + "px";
            } else {
                select.style.left = selectX - 1 + "px";
            }
        };
    };

    document.onmouseup = () => document.onmousemove = null;
}
