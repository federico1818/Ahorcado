var ahorcado = new Ahorcado();
var ventana = new Ventana();

function start(){	
	ventana.deleteStart();
	ventana.createEnvironment();

	ventana.setPalabraUser(ahorcado.getPalabraUser());
}

function tryLetter(){
	try{
		ahorcado.tryLetter(ventana.getInputLetter());
		ventana.setPalabraUser(ahorcado.getPalabraUser());
	}
	catch(c){
		ventana.appendWrongLetter(c);
	}
	finally{
		ventana.clearInputLetter();
	}
}