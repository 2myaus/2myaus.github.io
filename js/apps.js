const page1 = document.querySelector(".page.page1");

function getParentItem(element){
	if(!element){return null;}
	else if(element.classList.contains("item")){ return element; }
	else if(element.classList.contains("itemcontainer")){ return null; }
	return getParentItem(element.parentElement);
}

page1.addEventListener("click", (event) => {
	const parentItem = getParentItem(event.target);
	if(!parentItem){
		if(!event.target.classList.contains("itemcontainer")){
			return;
		}
		event.target.querySelectorAll(".item").forEach((child) => {
			child.classList.remove("selected");
		});
		return;
	}
	parentItem.parentElement.querySelectorAll(".item").forEach((child) => {
		child.classList.remove("selected");
	});
	parentItem.classList.add("selected");
});

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
	const popup = getWindow(x,y,width,height,title);
	const popup_head = popup.querySelector(".windowhead");
	const popup_content = popup.querySelector(".window-content");
	const popup_head_closebutton = popup_head.querySelector(".close.button");

	popup_head.querySelector(".minimize.button").remove();
	popup_head.querySelector(".maximize.button").remove();

	popup_content.textContent = content;

	popup_content.style.whiteSpace = "pre-line";
	popup_content.style.height = `calc(100% - var(--head-hgt) - 3.5vw)`;
	popup_content.style.boxSizing = "border-box";
	popup_content.style.borderBottom = "2px solid #666";

	popup_head_closebutton.onclick = () => {
		if(oncancel){
			oncancel(popup);
			return;
		}
		popup.remove();
	};

	let popup_confirm_button
	if(confirmlabel){
		popup_confirm_button = document.createElement("div");
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
	}

	let popup_cancel_button
	if(cancellabel){
		popup_cancel_button = document.createElement("div");
		popup_cancel_button.classList.add("button");
		popup_cancel_button.textContent = cancellabel;
		popup_cancel_button.style.position = "absolute";
		popup_cancel_button.style.minWidth = "4vw";
		popup_cancel_button.style.minHeight = "2vw";
		popup_cancel_button.style.bottom = "1vw";
		popup_cancel_button.style.right = "2vw";
		popup_cancel_button.style.paddingTop = "0.4vw";
		popup_cancel_button.onclick = popup_head_closebutton.onclick;
	}


	if(popup_confirm_button){popup.appendChild(popup_confirm_button)};
	if(popup_cancel_button){popup.appendChild(popup_cancel_button)};

	page1.appendChild(popup);
	return popup;
}

function getItem(label, iconSrc){
	const creatingItem = document.createElement("div");
	creatingItem.classList.add("item");
	const itemIcon = document.createElement("img");
	itemIcon.classList.add("item-icon");
	itemIcon.src = iconSrc;
	creatingItem.appendChild(itemIcon);
	const itemLabel = document.createElement("div");
	itemLabel.classList.add("item-label");
	itemLabel.textContent = label;
	creatingItem.appendChild(itemLabel);

	return creatingItem;
}

function openFile(fakefsPath){
	//TODO: Determine how file is read based on file type
	let fileName;
	fetch(`fakefs${fakefsPath}`)
		.then(r=> r.text())
		.then(fileText=>{
			createPopup("20vw", "20vw", null, null, fakefsPath.split('/').pop(), fileText, 'idc', null, null, null);
		}
	);
}

function createFileBrowser(x, y, startingPath){
	const fileBrowser = getWindow(x, y, "40vw", "20vw", "secret_exposer.exe");
	const fileBrowserContent = fileBrowser.querySelector(".window-content");
	const fileContainer = document.createElement("div");
	fileContainer.classList.add("itemcontainer");
	fileContainer.style.position = "absolute";
	fileContainer.style.bottom = "0";
	fileContainer.style.left = "0";
	fileContainer.style.right = "0";
	fileContainer.style.top = "0";
	fileBrowserContent.appendChild(fileContainer);

	fileBrowser.changePath = (newPath) => {
		fileContainer.querySelectorAll("*").forEach((child) => {
			child.remove();
		});

		fetch(`fakefs${newPath}dir.json`)
			.then(response => response.json())
			.then(dirinfo => {
				console.log(dirinfo);
				dirinfo.dirs.forEach(dirName => {
					const item = getItem(dirName, "assets/icon_desktop_folder.png");
					//TODO: Replace with a real icon
					item.setAttribute("ondblclick", `console.log(this.parentElement.parentElement); this.parentElement.parentElement.parentElement.changePath(${newPath+dirName});`);
					fileContainer.appendChild(item);
				});

				dirinfo.files.forEach(fileName => {
					let iconsrc = "assets/icon_no_image.png";
					//TODO: Determine icon based on file type
					const item = getItem(fileName, iconsrc);
					item.setAttribute("ondblclick",`openFile('${newPath+fileName}');`);
					fileContainer.appendChild(item);
				});
				//TODO: Display files and stuff
			});

		fileBrowser.path = newPath;
	}
	fileBrowser.changePath(startingPath);

	page1.appendChild(fileBrowser);
	return fileBrowser;
}
