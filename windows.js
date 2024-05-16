(() => {
	const windows = document.querySelectorAll(".window");
	windows.forEach((window_n) => {
		const closebutton = window_n.querySelectorAll(".windowhead .button.close")[0];
		closebutton.onclick = () => {
			const sadface = document.createElement("div");
			sadface.innerText = ":(";
			sadface.style = `
				font-family:Kitty-M;
				font-size: 10vw;
				transform-origin:center center;
				position:absolute;
				left:50%;
				top:50%;
				transform:translate(-50%, -50%);
			`;
			setTimeout(() => {
				sadface.remove();
			}, 1500);
			window_n.appendChild(sadface);
		}
	});
})();
