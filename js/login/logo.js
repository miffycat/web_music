function LogoObj(){
	this.x=[];
	this.y=[];
	this.l=[];
	this.ratex=[];
	this.ratey=[];
	this.alpha=[];
	this.alive=[];
	this.pic_color=[];
	this.red=new Image();
	this.black=new Image();
	this.white=new Image();
	this.gray=new Image();
}
LogoObj.prototype.shadowColor='rgba(255,255,255,0.3)';
LogoObj.prototype.num=30;
LogoObj.prototype.p_c_list=['r', 'w', 'b', 'g'];
LogoObj.prototype.init=function(){
	for(let i=0; i<this.num; i++){
		this.x[i]=rand(0, w);
		this.y[i]=rand(0, h);
		this.l[i]=rand(40, 70);
		this.ratex[i]=rand(0.1, 1)/10;
		this.ratey[i]=rand(0.1, 1);
		this.alpha[i]=rand(0.5, 0.9);
		// console.log(this.rate[i]);
		this.alive[i]=false;
		this.pic_color[i]=this.p_c_list[rndi2(0, 4)];
	}
	this.red.src='images/icons/red_logo.png';
	this.white.src='images/icons/white_logo.png';
	this.gray.src='images/icons/gray_logo.png';
	this.black.src='images/icons/red_logo.png';

}
LogoObj.prototype.draw=function(){
	for(let i=0; i<this.num; i++){
		if(this.alive[i]){
			this.x[i]+=this.ratex[i];
			this.y[i]-=this.ratey[i];
			if(this.y[i]<-40){
				this.alive[i]=false;
			}
			let pic=this.randLogo(this.pic_color[i]);
			bg_ctx.globalAlpha=this.alpha[i];
			bg_ctx.shadowColor=this.shadowColor;
			bg_ctx.shadowBlur=this.alpha*10;
			bg_ctx.drawImage(pic, this.x[i], this.y[i], this.l[i], this.l[i]);
		}
		
	}
}

LogoObj.prototype.randLogo=function(i){
	let src=null;
	switch (i){
		case 'r':
		src=this.red;
		break;
		case 'w':
		src=this.white;
		break;
		case 'b':
		src=this.black;
		break;
		case 'g':
		src=this.gray;
		break;
		default:
		src=this.red;
		break;
	}
	return src;
}
LogoObj.prototype.create=function(){
	for(let i=0; i<this.num; i++){
		if(!this.alive[i]){
			// console.log(i);
			this.alive[i]=true;
			this.y[i]=rand(0, h);
			return;
		}
	}
}
let logoMonitor=function(){
	
	let count=0;
	for(let i=0; i<logo.num; i++){
		if(logo.alive[i]){
			count++;
		}
	}
	if(count<30){
		logo.create();
	}
}