'use strict';
window.addEventListener('load', function () {
	var carousels = document.querySelectorAll('.wrap');
	
	for (var i = 0; i < carousels.length; i++) {
		carousel(carousels[i]);
	}
	
});

function carousel(root) {
	var figure = root.querySelector('.ban'),
	nav = root.parentNode.querySelector('.btn'),
	ids = root.querySelector('.dots'),
	images = figure.children,
	n = images.length,
	gap = root.dataset.gap || 0,
	bfc = 'bfc' in root.dataset,
	theta = 2 * Math.PI / n,
	currImage = 0,
	timer=null;
	
	setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
	window.addEventListener('resize', function () {
		setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
	});
	
	setupNavigation();
	setupIndecator();
	setAuto();

	function setupCarousel(n, s) {
		var apothem = s / (2 * Math.tan(Math.PI / n));
		
		figure.style.transformOrigin = '50% 50% ' + -apothem + 'px';
		
		for (var i = 0; i < n; i++) {
			images[i].style.padding = gap + 'px';
		}
		for (i = 1; i < n; i++) {
			images[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
			images[i].style.transform = 'rotateY(' + i * theta + 'rad)';
		}
		if (bfc) for (i = 0; i < n; i++) {
			images[i].style.backfaceVisibility = 'hidden';
		}
		rotateCarousel(currImage);
	}
	
	function setupNavigation() {
		nav.addEventListener('click', onClick, true);
		
		function onClick(e) {
			e.stopPropagation();
			var t = e.target;
			if (t.tagName.toUpperCase() != 'BUTTON') return;
			
			if (t.classList.contains('next')) {
				currImage++;
			} else {
				currImage--;
			}
			indecatorlight(currImage);
			rotateCarousel(currImage);
		}
	}
	function setupIndecator(){
		let children='';
		//初始化li的class为active, 否则会报错
		children += `<li data-index=0 class='active'></li>`
		for(let i = 1; i<n; i++){
			children += `<li data-index=${i}></li>`;
		}
		ids.innerHTML=children;
		ids.addEventListener('click', onClick, true);
		
		function onClick(e){
			e.stopPropagation();
			let t = e.target;
			if(t.nodeName=='LI'){
				t.parentNode.querySelector('.active').classList.remove('active');
				t.classList.add('active');
				//计算已经转过的整圈, 让banner在本次转动的这一圈中转动, 避免回转多圈
				currImage=Math.floor(currImage/n)*n+t.dataset.index*1;
				rotateCarousel(currImage);
			}
		}
	}
	function indecatorlight(imageIndex){
		let idcIndex=Math.abs(imageIndex%n);
		let curIdc=document.querySelector('.dots>li:nth-child('+(idcIndex+1)+')');
		curIdc.parentNode.querySelector('.active').classList.remove('active');
		curIdc.classList.add('active');
		// console.log(curIdc);
	}
	function rotateCarousel(imageIndex) {
		figure.style.transform = 'rotateY(' + imageIndex * -theta + 'rad)';
	}
	
	function setAuto(){
		timer = setInterval(() => {
			currImage++;
			indecatorlight(currImage);
			rotateCarousel(currImage);
		}, 2500);

		//轮播图切换标签页暂停
		document.addEventListener('visibilitychange', onHidden);
		document.addEventListener('visibilitychange', onVisible);

		//鼠标进入停止轮播, 滑出重新开始
		figure.parentNode.parentNode.addEventListener('mouseover', onMouseover, true);
		figure.parentNode.parentNode.addEventListener('mouseout', onMouseout, true);
		// console.log(figure.parentNode.parentNode);
		function onHidden(e){
			e.stopPropagation();

			let hide_state = isHidden();
			if(hide_state){
				clearInterval(timer);
				timer=null;
			}
		}
		function onVisible(e){
			e.stopPropagation();

			let hide_state = isHidden();
			if (!hide_state) {
				timer = setInterval(() => {
					currImage++;
					indecatorlight(currImage);
					rotateCarousel(currImage);
				}, 2500);
			}
		}
		function onMouseover(e){
			e.stopPropagation();
			
			if(timer){
				clearInterval(timer);
				timer=null;
			}
		}
		function onMouseout(e){
			e.stopPropagation();

			let hide_state = isHidden();
			if(!timer){
				timer=setInterval(() => {
					currImage++;
					indecatorlight(currImage);
					rotateCarousel(currImage);
				}, 2500);
			}
		}
	}
	
}


