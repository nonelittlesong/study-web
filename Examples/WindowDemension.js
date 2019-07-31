// 获取窗口宽度
if (window.innerWidth)
winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
winWidth = document.body.clientWidth;

// 获取窗口高度
if (window.innerHeight)
winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
winHeight = document.body.clientHeight;

// 通过深入 Document 内部对 body 进行检测，获取窗口大小
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
{
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
}

function getInfo() 
{
    var s = "";
    s = " 网页可见区域宽：" document.body.clientWidth;
    s = " 网页可见区域高：" document.body.clientHeight;
    s = " 网页可见区域宽：" document.body.offsetWidth " (包括边线和滚动条的宽)";
    s = " 网页可见区域高：" document.body.offsetHeight " (包括边线的宽)";
    s = " 网页正文全文宽：" document.body.scrollWidth;
    s = " 网页正文全文高：" document.body.scrollHeight;
    s = " 网页被卷去的高(ff)：" document.body.scrollTop;
    s = " 网页被卷去的高(ie)：" document.documentElement.scrollTop;
    s = " 网页被卷去的左：" document.body.scrollLeft;
    s = " 网页正文部分上：" window.screenTop;
    s = " 网页正文部分左：" window.screenLeft;
    s = " 屏幕分辨率的高：" window.screen.height;
    s = " 屏幕分辨率的宽：" window.screen.width;
    s = " 屏幕可用工作区高度：" window.screen.availHeight;
    s = " 屏幕可用工作区宽度：" window.screen.availWidth;

    s = " 你的屏幕设置是 " window.screen.colorDepth " 位彩色";
    s = " 你的屏幕设置 " window.screen.deviceXDPI " 像素/英寸";
    //alert (s);
}
getInfo();
