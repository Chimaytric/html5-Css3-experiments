function addSheet(){
	var liste = document.getElementById('liste');
	var newElement = document.createElement('li');
	
	var titre = document.createElement('h1');
	var titreTexte = document.createElement('input');
	titreTexte.setAttribute('type', 'text');
	titreTexte.setAttribute('placeholder', 'Nouvelle note');
	
	var deleteButton = document.createElement('span');
	var deleteCross = document.createTextNode('x');
	deleteButton.appendChild(deleteCross);
	deleteButton.addEventListener("click", function(){
		var toDelete = deleteButton.parentNode;
		liste.removeChild(toDelete);
	}, false);
	
	titre.appendChild(titreTexte);
	newElement.appendChild(titre);
	newElement.appendChild(deleteButton);
	liste.appendChild(newElement);
}

var addButton = document.getElementById('addButton');
addButton.addEventListener("click", addSheet, false);