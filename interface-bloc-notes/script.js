function addSheet(){
	var liste = document.getElementById('liste');
	var newElement = document.createElement('li');
	var texte = document.createTextNode('Titre');
	newElement.appendChild(texte);
	liste.appendChild(newElement);
}

var addButton = document.getElementById('addButton')
addButton.addEventListener("click", addSheet, false);