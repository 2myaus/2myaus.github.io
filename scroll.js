let lastTime = 0;
let lastScroll = -9999;

const animFunc = (time) => {

	const target = Math.round(window.scrollY/window.innerHeight)*window.innerHeight;
	const dTime = (time-lastTime)*0.001;

	lastTime = time;

	if(time-lastScroll < 400){
		window.requestAnimationFrame(animFunc);
		return;
	}

	const vel = window.innerHeight * 1.2; //Pixels per second

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
}

window.requestAnimationFrame(animFunc);
