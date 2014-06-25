/*
 * HACE FALTA EXTENDER LA CLASE "String"
 * PARA REEMPLAZAR UN CARCATER EN UNA POSICION
 */
String.prototype.replaceAt = function(index, character) {
	return this.substr(0, index) + character + this.substr(index+character.length);
}

//CLASE AHORACADO
function Ahorcado(){
	this.film = null;
	
	var lives;
	var points;
	var observer;
	var palabraUser = '';
	var cantLetters;
	var wrongLetters = [];
	var level = new LevelEasy();
	var filmDao = new FilmDAO(this);
	
	this.inicializarPalabraUser = function(){
		for(var i = 0; i < film.Title.length; i++)
			if(film.Title[i] == ' ')
				palabraUser += ' ';
			else
				palabraUser += '_';
			
	};
	
	
	this.setObserver = function(ob) {
		observer = ob;
	}
	
	this.getTitle = function(){
		return film.Title;
	};

	this.getPoster = function() {
		return film.Poster;
	}
	
	this.getPoints = function() {
		return points;
	}
	
	this.tryLetter = function(c){
		if(this.letterExists(c)){
			this.modificarPalabraUser(c);
//			if(cantLetters <= 0)
//				throw new WinFilmException();
		}
		else{
			if(!this.wasPressed(c)){
				this.lostLive();
				wrongLetters.push(c);
				throw c;
			}
		}
	}

	this.wasPressed = function(c) {
		for(var i = 0; i < wrongLetters.length; i++)
			if(wrongLetters[i] == c)
				return true;
		
		return false;
	}
	
	this.lostLive = function(){
		if(--lives <= 0)
			this.lostFilm();
	}
	
	this.lostFilm = function() {
		points -= 10;
		throw new LostFilmException();		
	}
	
	this.letterExists = function(c){
		for(var i = 0; i < film.Title.length; i++)
			if(film.Title[i] == c)
				return true;
			
		return false;
	};

	this.modificarPalabraUser = function(c){			
		for(var i = 0; i < film.Title.length; i++){
			if(film.Title[i] == c){
				palabraUser = palabraUser.replaceAt(i, c);
				//cantLetters--;
			}
		}
	}

	this.getPalabraUser = function(){
		return palabraUser;	
	}

	
	this.orderFilm = function() {
		filmDao.orderFilm();
	}
	
	//METODO OBSERVER
	this.filmReady = function(film){
		this.film = film;
		this.inicializarPalabraUser();
		this.film.Title = this.film.Title.toUpperCase(); 
		cantLetters = this.film.Title.length;
		console.log(this.film.Title);
		observer.filmReady();
	}
	
	this.start = function() {
		points = 50;
		this.playAgain();
	}
	
	this.playAgain = function(){
		lives = 5;
		palabraUser = '';
		wrongLetters = [];
		this.orderFilm();
	}
}
