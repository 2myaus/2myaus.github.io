(() => {
	const windows = document.querySelectorAll(".window.noclose");
	windows.forEach((window_n) => {
		window_n.timesClicked = -1;
		window_n.popupsOpen = 0;
		const closebuttons = window_n.querySelectorAll(".windowhead .button.close, .windowhead .button.minimize");
		closebuttons.forEach((button) => {
			button.onclick = () => {
				window_n.timesClicked++;
				if(window_n.timesClicked == 1){
					button.style.animation="button-walk 0.2s linear";
					button.style.animationFillMode="forwards";
					button.style.animationDelay="0.4s";
					window_n.wasClickedTwice = true;
					return;
				}
				else if(window_n.timesClicked >= 2){
					if(window_n.popupsOpen > 0){return;}
					const x = `calc(10vw + ${getComputedStyle(window_n).left} + ${window_n.popupsOpen}vw)`;
					const y = `calc(12vw + ${getComputedStyle(window_n).top} + ${window_n.popupsOpen}vw)`;
					createPopup(x, y, "25vw", "10vw", "do you really hate me", "are you sure? i'll cry", "yes, i hate you", "no, i'm sorry", (popup) => {
						window_n.classList.add("closed");
						popup.remove();
					}, (popup) => {
						window_n.popupsOpen--;
						popup.remove();
					});
					window_n.popupsOpen++;
					return;
				}
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
						width:10vw;
					`;
					sadface.src = "assets/nso_sad.webp";

					darkoverlay.appendChild(sadface);
					setTimeout(() => {
						darkoverlay.style.opacity = 0;
					}, 1100);

					setTimeout(() => {
						darkoverlay.remove();
					}, 1500);
				}, Math.random() * 3200 + 400);
			}
		});

		const maxButton = window_n.querySelector(".windowhead .button.maximize");
		maxButton.onclick = () => {
			if(window_n.classList.contains("maximized")){
				window_n.classList.remove("maximized");
				return;
			}
			window_n.classList.add("maximized");
		}
	});
})();
