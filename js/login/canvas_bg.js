let bg_can = document.getElementById('login_bg'),
	bg_ctx=bg_can.getContext('2d'),
	w,
	h,
	logo,
	quaver,
	bg_pic;
function init(){
	w=bg_can.width=innerWidth;
	h=bg_can.height=innerHeight;
	logo=new LogoObj();
	logo.init();
	// quaver=new QuaverObj();
	bg_pic=new Image();
	bg_pic.src='images/icons/bg_profile_unlogin.jpg';
	bg_pic.onload=function(){console.log(w,h)};
}
function loop(){
	requestAnimFrame(loop);
	bg_ctx.drawImage(bg_pic, 0, 0, w, h);
	logoMonitor();
	logo.draw();
}
function start(){
	init();
	loop();
}
window.addEventListener('load', start);