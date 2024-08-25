const page1 = document.querySelector(".page.page1");

function createPopup(x,y,width,height,title,content,confirmlabel,cancellabel,onconfirm,oncancel){
	const popup = document.createElement("div");
	popup.classList.add("window","noanim");
	popup.style.position = "absolute"
	popup.style.top = y;
	popup.style.left = x;
	popup.style.width = width;
	popup.style.height = height;
	if(!width){
		popup.style.width = "15vw";
	}
	if(!height){
		popup.style.height = "15vw";
	}
	popup.style.zIndex = "11";
	const popup_head = document.createElement("div");
	popup_head.classList.add("windowhead");
	const popup_content = document.createElement("div");
	popup_content.classList.add("window-content");
	popup_content.style.padding = "2vw";
	popup_content.innerHTML = content;

	popup.appendChild(popup_head);
	popup.appendChild(popup_content);

	const popup_head_icon = document.createElement("div");
	popup_head_icon.classList.add("icon");
	popup_head_icon.src="";//TODO: Add a popup icon
	const popup_head_title = document.createElement("div");
	popup_head_title.classList.add("title");
	popup_head_title.textContent = title;
	const popup_head_closebutton = document.createElement("div");
	popup_head_closebutton.classList.add("close","button");
	popup_head_closebutton.textContent = "r";

	popup_head_closebutton.onclick = () => {
		if(oncancel){
			oncancel(popup);
			return;
		}
		popup.remove();
	};

	popup_head.appendChild(popup_head_icon);
	popup_head.appendChild(popup_head_title);
	popup_head.appendChild(popup_head_closebutton);

	const popup_confirm_button = document.createElement("div");
	popup_confirm_button.classList.add("button");
	popup_confirm_button.textContent = confirmlabel;
	popup_confirm_button.style.position = "absolute";
	popup_confirm_button.style.minWidth = "4vw";
	popup_confirm_button.style.minHeight = "2vw";
	popup_confirm_button.style.bottom = "1vw";
	popup_confirm_button.style.left = "2vw";
	popup_confirm_button.style.paddingTop = "0.4vw";
	popup_confirm_button.onclick = () => {
		if(onconfirm){
			onconfirm(popup);
			return;
		}
		popup.remove();
	};


	const popup_cancel_button = document.createElement("div");
	popup_cancel_button.classList.add("button");
	popup_cancel_button.textContent = cancellabel;
	popup_cancel_button.style.position = "absolute";
	popup_cancel_button.style.minWidth = "4vw";
	popup_cancel_button.style.minHeight = "2vw";
	popup_cancel_button.style.bottom = "1vw";
	popup_cancel_button.style.right = "2vw";
	popup_cancel_button.style.paddingTop = "0.4vw";
	popup_cancel_button.onclick = popup_head_closebutton.onclick;


	popup.appendChild(popup_confirm_button);
	popup.appendChild(popup_cancel_button);

	page1.appendChild(popup);
	return popup;
}

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
				}, Math.random() * 800 + 400);
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
