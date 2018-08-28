var d = document.getElementById("dibujito");   // para llegar a un tag  que tiene un ID.
var ancho = d.width;
var lienzo = d.getContext("2d");

//  para leer del boton y de la caja de texto
//var texto = document.getElementById("entrada");
//var boton_text = document.getElementById("boton");
var texto;
var boton_text;

//-----------------  Generacion de palabras al azar para adivinar  -------------------//
var word= "palabra";
var palabras = Array("iglesia", "perros", "paisaje", "apartamento", "ballena", "nene", "fiesta", "obstaculo");
var array_letter= [];
var len_word;
var i;
var text;

var ctd=0;
var erro=0;

var random_word;
var len_word;
var letters;

// ejecuta la generacion de una palabra
letters = palabra();
document.getElementById("palabra").innerHTML = letters.join(''); // imprime los campos en id= palabra
//----------------------     FIN PALABRAS   ---------------------//

function Inicio() {
    document.getElementById("cuadro_texto").innerHTML = "Cuantas lineas quieres? <input type='text' id='entrada'/> <input type='button' value='Enviar' id='boton'/>";
//  para leer del boton y de la caja de texto
    texto = document.getElementById("entrada");
    boton_text = document.getElementById("boton");
    // funcion para escuchar eventos
    boton_text.addEventListener("click",dibujo_click);
//----------------
}

function reloaGame(){
    location.reload();
}

function palabra(){
    random_word = Math.round(Math.random()*(palabras.length-1));
    word = palabras[random_word]; // palabra a adivinar
    len_word = word.length    // longitud de palabra a adivinar
    var casillas = new Array(len_word); // array con numero de casillas de palabra a adivinar

    for (i = 0; i < len_word; i++) {
        casillas[i]= "__ "; 
    }
    return casillas;
}

//Cuadrado del lienzo
dibujarLinea("red", 0,0,300,0);
dibujarLinea("red", 300,0,300,300);
dibujarLinea("red", 300,300,0,300);
dibujarLinea("red", 0,300,0,0);

// dibujo para ahorcado
dibujarLinea("yellow", 150,80,150,280);
dibujarLinea("red",150,80,80,80);
dibujarLinea("black",80,80,80,120);

//dibujarCirculo(80, 130, 10, 0);

var intentos = 0;

function dibujo_click(){
    var letter = texto.value;
    var i;
    var j=0;
   if(intentos < 7){ 
        for (j = 0; j < len_word; j++) {
            if(letter == word[j]){
                letters[j] = letter;
                document.getElementById("palabra").innerHTML = letters.join('');
                ctd++;        
            }
        }
        if(ctd == 0){
            intentos= intentos + 1;
            document.getElementById("intentos").innerHTML = "fallo: " + intentos;
            F_intento(intentos);     
            ctd = 0;
        }
        else{
            ctd = 0;
        }
        if(letters.join('') == word){
            erro = 1;
        }
        if(erro == 1){
            document.getElementById("intentos").innerHTML = "HAS ADIVINADO LA PALABRA!!!";        
            //alert("HAS GANADO!!");
            intentos = 0;
            document.getElementById("palabra").innerHTML = "<strong>"+word+"</strong>"; 
            letters = palabra();
        }
        if(intentos >=7){
            document.getElementById("intentos").innerHTML = "PERDISTE, INTENTA DE NUEVO!";
            letters = palabra();
            document.getElementById("palabra").innerHTML = "La palabra era: "+word; 
            //alert("NO HAY MAS INTENTOS!!");
            //window.open("index.html","_self")
        }    
    }
}

function F_intento(intentos){
    switch(intentos){
        case 1:
            dibujarCirculo(80, 130, 10, 0);
            break;
        case 2:
            dibujarLinea("blue",80,140,80,200);
            break;
        case 3:
            dibujarLinea("blue",80,200,60,220);
            break;
        case 4:
            dibujarLinea("blue",80,200,100,220);
            break;
        case 5:
            dibujarLinea("blue",80,160,60,180);
            break;
        case 6:
            dibujarLinea("blue",80,160,100,180);
            break;
        case 7:
            dibujarLinea("blue",30,140,130,140);
            break;
    }
}

function dibujarLinea(color, xi, yi, xf, yf){
    lienzo.beginPath();    // inicia lienzo
    lienzo.strokeStyle= color;   // poner el tipo o color de lapiz   -- propiedad de lienzo
    lienzo.lineWidth = 3;
    lienzo.moveTo(xi, yi);   //s eposiciona en 100, 100
    lienzo.lineTo(xf, yf);   //Hace el trazo  hasta 200, 200
    lienzo.stroke();   //Hace el trazo
}

function dibujarCirculo(cx, cy, radio, theta){
    lienzo.beginPath();
    lienzo.strokeStyle= "blue";   // poner el tipo o color de lapiz   -- propiedad de lienzo
    //lienzo.arc(cx,cy,radio,theta,0,2*Math.PI);
    lienzo.arc(cx, cy, radio, theta, 2 * Math.PI);
    lienzo.stroke();
}
