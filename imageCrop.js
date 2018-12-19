function finiteDrag(select, target) {
    select.onmousedown = function (e) {
        this.style.backgroundColor = "";
        let topGap = e.clientY - select.offsetTop,
            leftGap = e.clientX - select.offsetLeft;

        document.onmousemove = function (e) {
            let selectY = e.clientY - topGap,
                selectX = e.clientX - leftGap;

            if (selectY < target.offsetTop - select.offsetHeight) {
                select.style.top = target.offsetTop - select.offsetHeight + "px";
            } else if (selectY > target.offsetTop + target.offsetHeight) {
                select.style.top = target.offsetTop + target.offsetHeight + "px";
            } else {
                select.style.top = selectY - 1 + "px";
            }

            if (selectX < target.offsetLeft - select.offsetWidth) {
                select.style.left = target.offsetLeft - select.offsetWidth + "px";
            } else if (selectX > target.offsetLeft + target.offsetWidth - 1) {
                select.style.left = target.offsetLeft + target.offsetWidth - 1 + "px";
            } else {
                select.style.left = selectX - 1 + "px";
            }
        };
    };

    document.onmouseup = () => document.onmousemove = null;
}

function filletCorner (target, ratio,canvas,x,y) {
    const ctx = target.getContext("2d"),
        radius = (target.width > target.height ? target.height : target.width) * ratio / 100;

    ctx.save();
    ctx.clearRect(0, 0, target.width, target.height);
    ctx.beginPath();
    ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
    ctx.arc(target.width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
    ctx.arc(target.width - radius, target.height - radius, radius, 0, Math.PI / 2);
    ctx.arc(radius, target.height - radius, radius, Math.PI / 2, Math.PI);
    ctx.clip();

    ctx.drawImage(canvas,x,y,target.width,target.height,0,0,target.width,target.height);
    ctx.restore();
    }

function showItem(img, bag) {
    const oLi = document.createElement("li"),
        oCanvas = document.createElement("canvas"),
        oContext = oCanvas.getContext("2d"),
        oLabel = document.createElement("span"),
        oText = document.createElement("input"),
        oTrailer = document.createElement("span"),
        oDel = document.createElement("a"),
        oDown = document.createElement("a");

    oLi.key = (bag.lastChild)? bag.lastChild.key + 1: 1;

    oCanvas.width = img.width;
    oCanvas.height = img.height;
    oContext.drawImage(img, 0, 0);
    oLi.appendChild(oCanvas);

    oLabel.innerHTML = "&nbsp;设置此图片的文件名：&nbsp;";
    oLi.appendChild(oLabel);

    oText.type = "text";
    oText.style.width = "100px";
    oText.value = "picture" + oLi.key;
    oLi.appendChild(oText);

    oTrailer.innerHTML = ".png";
    oTrailer.style.marginRight = "24px";
    oLi.appendChild(oTrailer);

    oDel.innerHTML = "删除";
    oDel.href = "javascript:;";
    oLi.appendChild(oDel);

    oDown.innerHTML = "下载";
    oDown.style.marginLeft = "16px";
    oDown.href = img.toDataURL();
    oDown.download = oText.value;
    oLi.appendChild(oDown);

    bag.appendChild(oLi);

    oText.onchange = () => oDown.download = oText.value;
    oDel.onclick = () => bag.removeChild(oLi);
}