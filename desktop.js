const desktop = document.querySelector(".page1 .desktop");

let dragging = {item: null, Xi: 0, Yi: 0};

const killComputer = () => {
	document.body.innerHTML="";
	document.head.innerHTML="";
};

function getParentItem(element){
	if(element.classList.contains("desktop-item")){ return element; }
	else if(element.classList.contains("desktop")){ return null; }
	return getParentItem(element.parentElement);
}

function setSelectedItem(itemElement){
	const otherSelected = desktop.querySelectorAll(".desktop-item.selected");
	otherSelected.forEach(selectedItem => {
		selectedItem.classList.remove("selected");
	});
	if(itemElement){
		itemElement.classList.add("selected");
	}
}

function draggedOntoRecycleBin(){
	const droppedLabel = dragging.item.querySelector('.desktop-item-label');
	if(!droppedLabel){return;}
	if(droppedLabel.innerText == "My Computer"){killComputer();}
	
}

function itemDraggedOntoItem(itemTarget, itemDragged){
	if(!itemTarget.getAttribute("itemdroppedon")){return;}
	eval(itemTarget.getAttribute("itemdroppedon"));
}

desktop.addEventListener("mousedown", function(event){
	const item = getParentItem(event.target);
	setSelectedItem(item);

	dragging.item = item;
	dragging.Xi = event.x;
	dragging.Yi = event.y
});

desktop.addEventListener("mouseup", function(event){
	if(!dragging.item){return;}
	const Xf = event.x;
	const Yf = event.y;
	
	let cssItemSize;
	let cssGapSize;
	Array.from(document.styleSheets[0].cssRules).forEach(cssRule => { //TODO: Please do this better somehow :(
		if(document.querySelector(cssRule.selectorText) != desktop){return;}
		cssItemSize = cssRule.style.getPropertyValue("--item-size");
		cssGapSize = cssRule.style.getPropertyValue("--item-gap");
	});

	const gridGapPx = window.innerWidth * parseFloat(cssGapSize) * 0.01;
	const gridDistPx = window.innerWidth * parseFloat(cssItemSize) * 0.01;

	const Dx = Xf-dragging.Xi;
	const Dy = Yf-dragging.Yi;

	const finalGridPosX = 1+Math.round((event.x-(gridGapPx+gridDistPx)*0.5)/(gridGapPx+gridDistPx));
	const finalGridPosY = 1+Math.round((event.y-(gridGapPx+gridDistPx)*0.5)/(gridGapPx+gridDistPx));

	let dragHandled = false;

	desktop.querySelectorAll(".desktop-item").forEach(item => {
		if(item == dragging.item){return;}
		if(item.style.getPropertyValue("grid-row") != finalGridPosY.toString()){return;}
		if(item.style.getPropertyValue("grid-column") != finalGridPosX.toString()){return;}
		itemDraggedOntoItem(item, dragging.item);
		dragHandled = true;
	});

	if(!dragHandled){
		dragging.item.style.setProperty("grid-area", finalGridPosY + " / " + finalGridPosX);
	}
	
	dragging.item.style.setProperty("--dragoff-x", "0");
	dragging.item.style.setProperty("--dragoff-y", "0");
	dragging.item = null;
	dragging.Xi = 0;
	dragging.Yi = 0;
});

desktop.addEventListener("mousemove", function(event){
	if(!dragging.item) {return;}
	
	dragging.item.style.setProperty("--dragoff-x", event.x-dragging.Xi);
	dragging.item.style.setProperty("--dragoff-y", event.y-dragging.Yi);
});
