const so = require("os");  // se impota y esta losta para utilizarse
const fs = require("fs");  // filesystem    
/* para recibi datos por el teclado*/
const readline = require('readline');

const my_modulo = require("./modulo1"); 

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});
//----------------------------------------//
rl.question('Que conversion desea realizar?\n1. Celsius a Kelvin\n2. Kelvin a Celsius\n3. Celsius a Farenheit\n4. Salir\n\n=>  ',
    (option) =>{   
        rl.question('Digite el valor de la temperatura?\n => ', (temperature)=>{
            switch(option){
                case '1':
                    my_modulo.kelvin(parseFloat(temperature));
                    break;
                case '2':
                    my_modulo.celsius(parseFloat(temperature));
                    break;
                case '3':
                    my_modulo.farenheit(parseFloat(temperature));
                    break;
            } 
            rl.close();
        });
    
 });
 