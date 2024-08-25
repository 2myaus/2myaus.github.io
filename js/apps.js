const page1 = document.querySelector(".page.page1");

function getWindow(x,y,width,height,title){
	const cWindow = document.createElement("div");
	cWindow.classList.add("window","noanim");
	cWindow.style.position = "absolute"
	cWindow.style.top = y;
	cWindow.style.left = x;
	cWindow.style.width = width;
	cWindow.style.height = height;
	if(!width){
		cWindow.style.width = "15vw";
	}
	if(!height){
		cWindow.style.height = "15vw";
	}
	cWindow.style.zIndex = "11";
	const cWindow_head = document.createElement("div");
	cWindow_head.classList.add("windowhead");
	const cWindow_content = document.createElement("div");
	cWindow_content.classList.add("window-content");
	cWindow_content.style.padding = "2vw";

	cWindow.appendChild(cWindow_head);
	cWindow.appendChild(cWindow_content);

	const cWindow_head_icon = document.createElement("div");
	cWindow_head_icon.classList.add("icon");
	cWindow_head_icon.src="";//TODO: Add a popup icon
	const cWindow_head_title = document.createElement("div");
	cWindow_head_title.classList.add("title");
	cWindow_head_title.textContent = title;

	const cWindow_head_minbutton = document.createElement("div");
	cWindow_head_minbutton.classList.add("minimize","button");
	cWindow_head_minbutton.textContent = "0";

	const cWindow_head_maxbutton = document.createElement("div");
	cWindow_head_maxbutton.classList.add("maximize","button");
	cWindow_head_maxbutton.textContent = "1";

	const cWindow_head_closebutton = document.createElement("div");
	cWindow_head_closebutton.classList.add("close","button");
	cWindow_head_closebutton.textContent = "r";

	cWindow_head_closebutton.onclick = () => {
		cWindow.remove();
	};

	cWindow_head_minbutton.onclick = cWindow_head_closebutton.onclick;

	cWindow_head.appendChild(cWindow_head_icon);
	cWindow_head.appendChild(cWindow_head_title);
	cWindow_head.appendChild(cWindow_head_minbutton);
	cWindow_head.appendChild(cWindow_head_maxbutton);
	cWindow_head.appendChild(cWindow_head_closebutton);

	return cWindow;
}


function createPopup(x,y,width,height,title,content,confirmlabel,cancellabel,onconfirm,oncancel){
	/*
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
	popup.style.zIndex = "25";
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
	*/

	const popup = getWindow(x,y,width,height,title);
	const popup_head = popup.querySelector(".windowhead");
	const popup_content = popup.querySelector(".window-content");
	const popup_head_closebutton = popup_head.querySelector(".close.button");

	popup_head.querySelector(".minimize.button").remove();
	popup_head.querySelector(".maximize.button").remove();

	popup_content.innerHTML = content;

	popup_head_closebutton.onclick = () => {
		if(oncancel){
			oncancel(popup);
			return;
		}
		popup.remove();
	};

	/*
	popup_head.appendChild(popup_head_icon);
	popup_head.appendChild(popup_head_title);
	popup_head.appendChild(popup_head_closebutton);
	*/

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
