let lastTime = 0;
let lastScroll = -9999;

let lastY = 0;
let scrollDir = 1;
window.addEventListener("scroll", (event) => {
	if(window.scrollY > lastY){
		scrollDir = 1;
	}
	else if(window.scrollY < lastY){
		scrollDir = -1;
	}
	lastY = window.scrollY;
	return;
});

const animFunc = (time) => {
	let target = window.scrollY/window.innerHeight;

	if(scrollDir == 1){
		target = Math.ceil(target);
	}
	else{
		target = Math.floor(target);
	}
	target *= window.innerHeight;

	const dTime = (time-lastTime)*0.001;

	lastTime = time;

	const vel = window.innerHeight * 2; //Pixels per second

	let currentY = window.scrollY

	if(target < window.scrollY){
		currentY = window.scrollY - vel*dTime;
		if(target > currentY){
			currentY = target;
		}
	}
	else if(target > window.scrollY){
		currentY = window.scrollY + vel*dTime;
		if(target < currentY){
			currentY = target;
		}
	}
	window.scrollTo(window.scrollX, currentY);
	window.requestAnimationFrame(animFunc);
};

window.requestAnimationFrame(animFunc);
