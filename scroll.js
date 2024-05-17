let lastTime = 0;

const animFunc = (time) => {
	const target = Math.round(window.scrollY/window.innerHeight)*window.innerHeight;
	const dTime = (time-lastTime)*0.001;
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

	lastTime = time;
	window.requestAnimationFrame(animFunc);
}

window.requestAnimationFrame(animFunc);
