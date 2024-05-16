(() => {
	const windows = document.querySelectorAll(".window");
	windows.forEach((window_n) => {
		const closebutton = window_n.querySelectorAll(".windowhead .button.close")[0];
		closebutton.onclick = () => {
			window_n.classList.add("closed");

			setTimeout(() => {
				window_n.classList.remove("closed");

				const darkoverlay = document.createElement("div");
				darkoverlay.style = `
					z-index:9;
					position:absolute;
					top:0;
					left:0;
					width:100%;
					height:100%;
					background-color:#0008;
					transition: opacity 0.4s linear;
					opacity:1;
				`;
				window_n.appendChild(darkoverlay);

				const sadface = document.createElement("img");
				sadface.style = `
					transform-origin:center center;
					position:absolute;
					left:50%;
					top:50%;
					transform:translate(-50%, -50%);
					z-index:10;
				`;
				sadface.src = "nso_sad.webp";

				darkoverlay.appendChild(sadface);
				setTimeout(() => {
					darkoverlay.style.opacity = 0;
				}, 1100);

				setTimeout(() => {
					darkoverlay.remove();
				}, 1500);
			}, Math.random() * 800 + 400);
		}
	});
})();
