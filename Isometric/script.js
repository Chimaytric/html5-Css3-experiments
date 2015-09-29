$(document).ready(function(){
	var canvas = document.getElementById('myCanvas');
	
	var pathMap = new Map(path, 0, 0);
	var character1 = new Character("Pablo", [35, 50], "boy.png");
	var house1 = new FieldObject("Pablo's House", [238, 230], "house.png");
	
	pathMap.draw(canvas, false, function(){
		house1.draw(canvas, [100, 0], function(){
			character1.draw(canvas, [245, 95, 0]);
			character1.draw(canvas, [570, 125, 1]);
		});
	});
	

});

var Map = function(tiles, objects, zones){
	this.tiles = tiles;
	this.objects = objects;
	this.zones = zones;
}

Map.prototype.draw = function(canvas, debugMode, callback){
	canvas.width = this.getWidth() * 64+32+200;
	canvas.height = this.getHeight() * 16+16+200;
	document.getElementById('container').style.width = (this.getWidth() * 64+32)+'px';
	document.getElementById('container').style.height = (this.getHeight() * 8+16)+'px';
	
	var context = canvas.getContext('2d');
	
	var tileset = new Image();
	var myMap = this;
	var posX;
	var startX;
	tileset.onload = function(){
		for(var i in myMap.tiles.landscape){
			for(var j in myMap.tiles.landscape[i]){
				if(myMap.tiles.landscape[i][j] % myMap.getTilesetWidth() == 0)
					startX = (myMap.getTilesetWidth() - 1) * 64;
				else
					startX = ((myMap.tiles.landscape[i][j] % myMap.getTilesetWidth())-1)*64;
				startY = ((Math.ceil(myMap.tiles.landscape[i][j] / myMap.getTilesetWidth())) - 1) * 64;
				posX = j*64;
				if(i%2!=0)
					posX = posX + 32;
					
				context.drawImage(tileset, startX, startY, 64, 64, posX+100, i*16+100, 64, 64);
				context.fillStyle = "#FF00FF";
				if(debugMode)
					context.fillText(myMap.tiles.landscape[i][j],  posX+32+100, i*16+32+100);
			}
		}
		callback();
	}
	tileset.src = "./"+this.tiles.tileset;
}

Map.prototype.getWidth = function(){
	return this.tiles.landscape[0].length;
}
Map.prototype.getHeight = function(){
	return this.tiles.landscape.length;
}
Map.prototype.getTilesetWidth = function(){
	return this.tiles.tilesetWidth;
}
Map.prototype.getTilesetHeight = function(){
	return this.tiles.tilesetWidth;
}

var Character = function(name, size, sprites){
	this.name = name;
	this.size = size;
	this.sprites = sprites;
}

Character.prototype.draw = function(canvas, position){
	var context = canvas.getContext('2d');
	characterSprites = new Image();
	var myCharacter = this;
	characterSprites.onload = function(){
		context.drawImage(characterSprites, 0, position[2]*myCharacter.size[1], myCharacter.size[0] , myCharacter.size[1], position[0] - Math.ceil(myCharacter.size[0] / 2) +100, position[1] - myCharacter.size[1]+100 , myCharacter.size[0], myCharacter.size[1]);
	}
	characterSprites.src = "./"+this.sprites;
}

Character.prototype.draw = function(canvas, position){
	var context = canvas.getContext('2d');
	context.globalCompositeOperation = "source-over";
	characterSprites = new Image();
	var myCharacter = this;
	characterSprites.onload = function(){
		context.drawImage(characterSprites, 0, position[2]*myCharacter.size[1] - 5 , myCharacter.size[0] , myCharacter.size[1], position[0] - Math.ceil(myCharacter.size[0] / 2) +100, position[1] - myCharacter.size[1]+100 , myCharacter.size[0], myCharacter.size[1]);
	}
	characterSprites.src = "./"+this.sprites;
}

var FieldObject = function(name, size, sprites){
	this.name = name;
	this.size = size;
	this.sprites = sprites;
}

FieldObject.prototype.draw = function(canvas, position, callback){
	var context = canvas.getContext('2d');
	context.globalCompositeOperation = "source-over";
	
	objectSprites = new Image();
	var myObject = this;
	
	objectSprites.onload = function(){
		context.drawImage(objectSprites, position[0], position[1]);
		callback();
	}
	objectSprites.src = "./"+this.sprites;
}