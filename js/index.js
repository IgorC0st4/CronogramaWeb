function allowDrop(ev) {
	ev.preventDefault();
  	ev.dataTransfer.dropEffect = "copy";
}

function drag(ev) {
	ev.dataTransfer.setData("text/plain", ev.target.id);
 	ev.dataTransfer.dropEffect = "copy";
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text/plain");

	var nodeCopy = document.getElementById(data).cloneNode(true);
	nodeCopy.id = "newId";
	ev.dataTransfer.dropEffect = "copy";
	ev.target.appendChild(nodeCopy);
}