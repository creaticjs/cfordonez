var liga;
var Equipos_array=[];
var Equipos_sort=[];
var CpyEquipos_array=[];

var dataEquipos = [
    {
        nombre: "Nacional",
        urlimage:"https://botw-pd.s3.amazonaws.com/styles/logo-original-577x577/s3/072015/escudo_atletico_nacional.png?itok=MluXWJ-C",
        dt: "Jorge Almidon",
        jugadores: ["Dayro Moreno", "Omar Duarte", "Fernando Monetti", "Daniel Bocanegra", "Alexis Enriquez", 
                    "Felipe Aguilar", 
                    "Gustavo Torres", "Deiver Machado"],
        resena: "El Atlético Nacional S. A.,1​ mejor conocido como Atlético Nacional, o simplemente Nacional, es un club de fútbol de la ciudad de Medellín, Colombia, fundado el 7 de marzo de 1947 bajo el nombre de Club Atlético Municipal de Medellín, aunque por escritura pública esta sociedad fue constituida el 30 de abril de 1947 en la notaría primera de Medellín. En 1950, el expresidente de la Liga Antioqueña de fútbol, Luis Alberto Villegas, cambió el nombre del club por Club Atlético Nacional.13​ El club participa en la máxima categoría de la División Mayor del Fútbol Colombiano, la Categoría Primera A desde su fundación en 1948, siendo uno de los tres únicos equipos que ha participado en todos sus torneos, junto a Millonarios y Santa Fe",
        estrellas: "15",
        puntos: [6, 3, 2, 1, 9, 5, 4, 11],
        liga: "a"
    },
    {
        nombre: "America",
        urlimage:"https://upload.wikimedia.org/wikipedia/en/7/75/New_Logo_2013_Am%C3%A9rica_de_Cali.svg",
        dt: "Fernando Castro",
        jugadores: ["Diego Herner", "Yamilson Rivera", "Jefferson Cuero", "Neto Volpi", "Alejandro Bernal"],
        resena: "El América de Cali S. A., conocido como América de Cali o simplemente América, es un club de fútbol colombiano de la ciudad de Cali. Es considerado uno de los clubes más grandes y populares de Colombia y uno de los más importantes de América del Sur.10​ Fue fundado el domingo 13 de febrero de 1927. Disputa sus partidos en el Estadio Olímpico Pascual Guerrero y el color que identifica al club desde sus inicios ha sido el rojo escarlata.",
        estrellas: "10",
        puntos: [6, 1, 2, 3, 1, 5, -4, 5],
        liga: "a"
    },
    {
        nombre: "Millonarios",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/5/55/Escudo_Millonarios_1989.png",
        dt: "Miguel Angel Russo",
        jugadores: ["Ayron del Valle", "Gabriel Hauche", "Christian Marrugo", "Macalister Silva", "oscar Barreto", "Jhon Duque"],
        resena: "Millonarios Fútbol Club, oficialmente Azul y Blanco Millonarios Fútbol Club S. A.​, mejor conocido como Millonarios, ​ es un club de fútbol de la ciudad de Bogotá, capital de Colombia.",
        estrellas: "14",
        puntos: [6, 2, 3, 1, 7, 4, 3, 9],
        liga: "a"
    },
    {
        nombre: "Santa Fe",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo_de_Independiente_Santa_Fe.svg",
        dt: "Gregorio Perez",
        jugadores: ["Omar Perez", "Yeison Gordillo", "Carlos Henao", "William Tesillo", "Yulian Anchico", "Robinson Zapata", "Huberto Osorio"],
        resena: "El Club Independiente Santa Fe S. A., más conocido como Independiente Santa Fe, o simplemente Santa Fe, es un club de fútbol de la ciudad de Bogotá, capital de Colombia",
        estrellas: "8",
        puntos: [6, 1, 4, 1, 5, 3, 2, 7],
        liga: "a"
    },
    {
        nombre: "Tolima",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/4/4a/Escudo_del_Deportes_Tolima.svg",
        dt: "Alberto Gamero",
        jugadores: ["Marco Perez", "Rafael Robayo", "Robin Ramirez", "Danovis Banguero", "Omar Albornoz","Luis payares", "juan Vargas"],
        resena: "El Club Deportes Tolima S. A., comúnmente conocido como Deportes Tolima o Tolima, es un club de fútbol colombiano de la ciudad de Ibagué, fundado el 18 de diciembre de 1954 y juega en la Categoría Primera A del fútbol profesional colombiano",
        estrellas: "1",
        puntos: [6, 4, 1, 1, 10, 7, 3, 13],
        liga: "a"
    },
    {
        nombre: "Medellin",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/c/c2/Escudo_del_Deportivo_Independiente_Medell%C3%ADn.png",
        dt: "Octavio Zambrano",
        jugadores: ["German Cano", "David Gonzales", "Juan Fernando Caicedo", "Ever Valencia", "Yorley Mena", "Javier Calle", "Jhonatan Barbosa"],
        resena: "El Deportivo Independiente Medellín, más conocido como Independiente Medellín, DIM, o simplemente Medellín, es un club de fútbol colombiano fundado bajo el nombre de «Medellín Football Club» el 14 de noviembre de 1913 por Alberto Uribe Piedrahíta",
        estrellas: "5",
        puntos: [6, 3, 1, 2, 7, 5, 2, 10],
        liga: "a"
    },   
    {
        nombre: "Pasto",
        urlimage:"http://www.futbolcolombiano.com.co/wp-content/uploads/2015/12/EscudoDeportivoPasto.png",
        dt: "Hernan Alberto Lisi",
        jugadores: ["Gilberto Garcia", "Wilmar Cruz", "Brayan Lucumi", "Mauricio Casierra"],
        resena: "La asociación Deportivo Pasto es un club de fútbol colombiano de la ciudad de San Juan de Pasto, en el departamento de Nariño. Fue fundado el 12 de octubre de 1949.1​4​ Actualmente juega en la Categoría Primera A del fútbol profesional colombiano y disputa los encuentros como local en el estadio departamental Libertad con capacidad para 28.000 espectadores.",
        estrellas: "1",
        puntos: [6, 1, 1, 4, 2, 7, -5, 4],
        liga: "a"
    },   
    {
        nombre: "Deportivo Cali",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/e/ef/Escudo_del_Deportivo_Cali.svg",
        dt: "Gerardo pelusso",
        jugadores: ["Nicolas Benedetti", "Kevin balanta", "Macnelly torres", "pablo Mina"],
        resena: "El Deportivo Cali12​ es un club deportivo de la ciudad de Cali, en el departamento del Valle del Cauca, Colombia, Fundado el 23 de noviembre de 1912 como (Cali Football Club) que después de pasar por dos re-estructuraciones desde su fundación por cuestiones económicas, en el año de 1959 se constituye como asociación y es reconocida oficialmente en 1962 lo que en la actualidad es la Asociación Deportivo Cali.6​13​ El Deportivo Cali es más conocido como un club de fútbol, aunque compite en otras disciplinas como el baloncesto,14​ el tenis, la natación,15​ y futsal.",
        estrellas: "4",
        puntos: [6, 2, 3, 1, 6, 6, 0, 9],
        liga: "a"
    },   
    {
        nombre: "Atletico Junior",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/f/fc/Escudo_de_Atl%C3%A9tico_Junior.svg",
        dt: "Julio Comesaña",
        jugadores: ["Sebastian Viera", "David Murillo", "Sebastian Hernandez", "Teofilo Gutierrez", "Fabian Sambuesa", "Deivy Balanta", "Luis Carlos Ruiz"],
        resena: "El Club Deportivo Popular Junior F. C. S. A., mejor conocido como Junior de Barranquilla o también por su antiguo nombre de Atlético Junior es un club de fútbol de la ciudad de Barranquilla, Colombia. Fue fundado el 7 de agosto de 1924, convirtiéndose en el tercer club más antiguo del país.12​ A nivel deportivo se ha consagrado campeón de la Primera división del fútbol profesional colombiano en siete ocasiones (1977, 1980, 1993, 1995, 2004-II, 2010-I, 2011-II).13​ También cuenta en su palmarés con dos títulos de Copa Colombia (2015 y 2017). Sumando un total de nueve títulos oficiales en el profesionalismo, que lo convierte en el sexto club más ganador del fútbol colombiano.",
        estrellas: "9",
        puntos: [6, 4, 1, 1, 6, 10, 3, 13],
        liga: "a"
    },  
    {
        nombre: "Equidad",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/0/09/La_Equidad.png",
        dt: "Luis Fernando Suarez",
        jugadores: ["Stalin Mota", "Matias mier", "Oscar Bernal", "Andres Correa", "Luis Alberto Perea", "Diego Novoa"],
        resena: "El Club Deportivo La Equidad, cuya razón social es Club Deportivo La Equidad Seguros Sociedad Anónima, ​ también conocido simplemente como La Equidad es un club de fútbol de la ciudad de Bogotá, Colombia.",
        estrellas: "9",
        puntos: [6, 6, 0, 0, 9, 0, 9, 18],
        liga: "a"
    },   
    {
        nombre: "Real Cartagena",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/4/4a/Escudo_de_real_cartagena.jpg",
        dt: "Richard Parra",
        jugadores: ["Jorge Obregon", "Juan Salcedo", "Camilo Ceballos", "Diego Basto"],
        resena: "El Real Cartagena es un club de fútbol colombiano de la ciudad de Cartagena de Indias. Fue fundado el 21 de marzo de 1971 y juega actualmente en la Categoría Primera B colombiana",
        estrellas: "0",
        puntos: [22, 9, 5, 8, 27, 28, -1, 32],
        liga: "b"
    },
    {
        nombre: "Deportes Quindio",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/d/d7/Deportes_Quindio_Antiguo.png",
        dt: "Alberto Suarez",
        jugadores: ["Wilson carpintero", "Diego Sevvillano", "Juan Ortiz", "Danny Santoya"],
        resena: "El Deportes Quindío es un club de fútbol colombiano de la ciudad de Armenia, capital del departamento de Quindío. Fue fundado el 8 de enero de 1951​​ y actualmente juega en la Categoría Primera B de Colombia",
        estrellas: "0",
        puntos: [22, 6, 8, 8, 21, 28, -7, 26],
        liga: "b"
    },
    {
        nombre: "Union Magdalena",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/2/27/Escudo_del_Uni%C3%B3n_Magdalena_F%C3%BAtbol_Club.png",
        dt: "Harold Rivera",
        jugadores: ["Gustavo sanchez", "Fabian Cantillo", "David Fereira", "Antonio Romero"],
        resena: "El Unión Magdalena es un club de fútbol colombiano de la ciudad de Santa Marta, capital del departamento de Magdalena, fundado el 19 de abril de 1953. Desde 2006 disputa sus partidos en la Primera B del fútbol colombiano. ",
        estrellas: "0",
        puntos: [21, 12, 5, 4, 35, 14, 21, 41],
        liga: "b"
    },
    {
        nombre: "Cucuta Deportivo",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/9/91/Escudo_del_C%C3%BAcuta_Deportivo.svg",
        dt: "Lucas Pusieni",
        jugadores: ["Darwin Carrero", "Mauricio Duarte", "Braynner Garcia"],
        resena: "El Cúcuta Deportivo​ es un club de fútbol colombiano con sede en la ciudad de Cúcuta en el departamento de Norte de Santander",
        estrellas: "0",
        puntos: [22, 16, 6, 0, 41, 12, 29, 54],
        liga: "b"
    },
    {
        nombre: "Club Llaneros",
        urlimage:"https://pbs.twimg.com/profile_images/2373752363/w8fgkg31p2lyv7iwmisd_400x400.jpeg",
        dt: "Nelson gomez",
        jugadores: ["Daniel LLoreda", "Nicolas Machado", "Victor Gutierrez", "Claudio Rubiano"],
        resena: "El Club Llaneros Sociedad Anónima​ conocido como Llaneros Fútbol Club o Club Llaneros o simplemente Llaneros es un club de fútbol de Colombia, que tiene como sede la ciudad de Villavicencio en el departamento del Meta.",
        estrellas: "0",
        puntos: [21, 5, 9, 7, 22, 25, -3, 24],
        liga: "b"
    },
    {
        nombre: "Deportivo Pereira",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/1/11/Deportivo_Pereira.png",
        dt: "Jose Fernando Santa",
        jugadores: ["Harlen Castillo", "Sebastian Puerta", "Juan Grisales", "Juan Florez", "Alvaro Melendez"],
        resena: "El Deportivo Pereira, llamado oficialmente por su razón social Corporación Social Deportiva y Cultural de Pereira - Corpereira​ es un club de fútbol colombiano de la ciudad de Pereira, capital .",
        estrellas: "0",
        puntos: [22, 11, 5, 6, 31, 24, 7, 38],
        liga: "b"
    },
    {
        nombre: "Universitario de Popayan",
        urlimage:"https://upload.wikimedia.org/wikipedia/commons/7/7d/Universitario_de_Popay%C3%A1n.png",
        dt: "Cesar Torres",
        jugadores: ["Nicolas Muñoz", "Marcos Mina", "Michael Hernandez", "Luis Mina", "Carlos Carabali", "Jesus Arboleda", "Mateo Garavito", "Juan Prieto", "Diego Rodriguez"],
        resena: "El Universitario de Popayán es un club de fútbol Colombiano profesional de la ciudad de Popayán, capital del departamento del Cauca. Fue fundado el 21 de mayo de 2011, actualmente juega en la Categoría Primera B, del fútbol profesional colombiano.",
        estrellas: "0",
        puntos: [22, 7, 8, 7, 27, 29, -2, 29],
        liga: "b"
    }

];


var boton_a = document.getElementById("botonA");
var boton_b = document.getElementById("botonB");

boton_a.addEventListener("click",mostrar_selectA);
boton_b.addEventListener("click",mostrar_selectB);

var selEquipos =  document.getElementById("equipos")   // el select de equipos

selEquipos.onchange = function() { // onchange detecta cambios // Si lo hay dispare una funcion  ciega
    //console.log("EQUIPO: " + this.value);    // para no repetir el  selEquipos se emplea   "this"
    var nom = this.options[this.selectedIndex].text;
    //console.log(this.selectedIndex)
    // acceder al nombre del option no al value
    //console.log(this.options[this.selectedIndex]);   // captura y entrega el option del  indice selecccionado
    
    //console.log(this.options[this.selectedIndex].text);  // para esa opcion accedo al texto    que se mostro en el selector

    document.getElementById("nombre").innerHTML="<strong>Equipo seleccionado: " + nom;
    //document.getElementById("escudo").setAttribute("src",dirImagen[this.selectedIndex]);
    document.getElementById("escudo").setAttribute("src",Equipos_array[this.selectedIndex].urlimage);
    //document.getElementById("escudo").setAttribute("width",500);
    document.getElementById("team").innerHTML = "<strong>Nombre del Equipo: </strong>"+Equipos_array[this.selectedIndex].nombre;
    document.getElementById("stars").innerHTML ="<strong>Numero de estrellas: </strong>"+Equipos_array[this.selectedIndex].estrellas;
    document.getElementById("coach").innerHTML ="<strong>Director tecnico: </strong>"+Equipos_array[this.selectedIndex].dt;
    var i;
    var team_players = "";
    for(i=0; i < dataEquipos[this.selectedIndex].jugadores.length; i++){
        team_players += dataEquipos[this.selectedIndex].jugadores[i] + "<br>";
    }

    document.getElementById("players").innerHTML ="<strong>Jugadores:</strong><br>"+ team_players;
    document.getElementById("description").innerHTML ="<strong>Descripcion: </strong>"+dataEquipos[this.selectedIndex].resena;
}

function mostrar_selectA(){
    liga = "a";
    fields_reset();
    document.getElementById("equipos").setAttribute("style","display: block;");
    //document.getElementById("equiposb").setAttribute("style","display: none;");
    Equipos_array = dataEquipos.filter(function(objeto) {
        return objeto.liga == liga;      //  filtra de acuerdo a la igualdad    filtra por franquicia  1ra y 2da division
    //return objeto.nombre == "carlos molano";   //  devuelve un array   asi sea un elemento
    });

    var aux = "";
    var titulo_select= document.getElementById("title_select");
    document.getElementById("tabla_sort").setAttribute("style","display: block;");
    titulo_select.innerHTML="Escoja un equipo";
    var cont = document.getElementById("equipos");
    CpyEquipos_array = Equipos_array;
    Equipos_array.forEach(function(item, index){
        aux += "<option value='" + item.nombre +"'>"+item.nombre+"</option>"
    });
    cont.innerHTML = aux;
    tabla_posiciones(Equipos_array);
}

function mostrar_selectB(){
    liga = "b";
    fields_reset();
    document.getElementById("equipos").setAttribute("style","display: block;");
    Equipos_array = dataEquipos.filter(function(objeto) {
        return objeto.liga == liga;      //  filtra de acuerdo a la igualdad    filtra por franquicia  1ra y 2da division
    });

    var aux = "";
    var titulo_select= document.getElementById("title_select");
    titulo_select.innerHTML="Escoja un equipo";
    document.getElementById("tabla_sort").setAttribute("style","display: block;");
    var cont = document.getElementById("equipos");
    CpyEquipos_array = Equipos_array;
    Equipos_array.forEach(function(item, index){
        aux += "<option value='" + item.nombre +"'>"+item.nombre+"</option>"
    });
    cont.innerHTML = aux;
    tabla_posiciones(Equipos_array);
}


function tabla_posiciones(array_equipos){
    var obj_table = document.getElementById('bodytable');
    var auxT = "";
    array_equipos.forEach(function(equipo,index){
            auxT += "<tr><th scope='row'>"+ (index+1) + "</th><td>"+equipo.nombre+"</td><td>"+equipo.puntos[0]+"</td><td>"+equipo.puntos[1]+
                "</td><td>"+equipo.puntos[2]+"</td><td>"+equipo.puntos[3]+"</td><td>"+equipo.puntos[4]+"</td><td>"+equipo.puntos[5]+"</td><td>"+
                equipo.puntos[6]+"</td><td>"+equipo.puntos[7]+"</td></tr>";
    })
    obj_table.innerHTML = auxT;
}

//Funcion que se ejecuta con el click sobre algun item del titulo de la tabla  y se pasa el # columna
function despliegue(number){
    switch(number){
        case 3:
            ordenar(number);
            tabla_posiciones(Equipos_sort);
            break;
        case 4:
            ordenar(number);
            tabla_posiciones(Equipos_sort);
            break;
        case 5:
            ordenar(number);
            tabla_posiciones(Equipos_sort);
            break;
        case 6:
            ordenar(number);
            tabla_posiciones(Equipos_sort);
            break;
        case 7:
            ordenar(number);
            tabla_posiciones(Equipos_sort);
            break;
    };
}

// Funcion de Sort    descendente
function ordenar(col){    // uso de slice()  para que no cambie el array original
    Equipos_sort= CpyEquipos_array.slice().sort(function(a,b){
        if (a.puntos[col] < b.puntos[col]) {    // >    ordena de mayor a menor
            return 1;
            }
            if (a.puntos[col] > b.puntos[col]) {
            return -1;
            }
            // a must be equal to b
            return 0;
    });
}    

function fields_reset(){
    document.getElementById("nombre").innerHTML=" ";
    document.getElementById("escudo").setAttribute("src"," ");
    document.getElementById("team").innerHTML = " ";
    document.getElementById("stars").innerHTML =" ";
    document.getElementById("coach").innerHTML =" ";
    document.getElementById("players").innerHTML =" ";
    document.getElementById("description").innerHTML =" ";
}

//  hacer una tabla de posiciones

//  arreglo para equipos de 1ra y 2da.

//  Tabla de posiciones    que se ordene de mayor a menor      o viceversa

/* Esto recorre el array    FOREACH    para renderizar la tabla de equipos por posiciones*/

//dataEquipos.forEach(function(item){
    //console.log(item);     // me entrega todo lo que recorre   del array   en lista   atraves de ITEM
    //console.log(item.dt);
    //console.log(item);
//});

//otra forma    es lo mismo que lo anterior
//defino la funcion afuera y se la entrego
/*
//var recorrer =function(item){console.log(item)};//Este retorna todo lo de cada item (cada equipo con todo)
//var recorrer =function(item){console.log(item.estrellas)}; //retorna las estrellas de c/equipo
var recorrer =function(item){console.log(item.dt)};  // retorna solo el tecnico de cada item
dataEquipos.forEach(recorrer);

// ----------------------    ||||||   FIN  FOREACH ---------------------------------  //
*/

/*USO de PUSH   -  agrega al final */
//dataEquipos.push({});   //agrega el elemento vacio
   
/*
//   USO del FILTER   y reglas 
var mejorequipo = dataEquipos.filter(function(objeto) {   // se trabaja como una regla a cumplir
        return objeto.nombre == "Santa Fe";      //  filtra de acuerdo a la igualdad    filtra por franquicia  1ra y 2da division
    });
//console.log("resultado Filter: ");
//console.log(mejorequipo);

var nombres =[{nombre:"carlos molano", edad:36},{nombre:"felipe ordoñez", edad:37},{nombre:"juan urbano", edad:39},{nombre:"Jose ordonez", edad:36}, {nombre:"camilo pedraza", edad:30}]; 
var persona = nombres.filter(function(objeto) {
    return objeto.edad >= 37;      //  filtra de acuerdo a la igualdad    filtra por franquicia  1ra y 2da division
    //return objeto.nombre == "carlos molano";   //  devuelve un array   asi sea un elemento
});
*/


//console.log("resultado de personas:\n");
//console.log(persona);
//console.log(persona[0].edad);

//var persona2 = nombres.find(function(objeto) {
//    return objeto.edad >= 37;      //Retorna un objeto ,  el primero que tenga coincidencia
//});


//console.log("resultado de Find:\n");
//console.log(persona2);

/* FIN USO DEL FILTER*/


/*  USO DEL SORT() */

/*
var ordenAs = nombres.sort(function(a,b){
    if (a.edad > b.edad) {    // >    ordena de menor a mayor
        return 1;
        }
        if (a.edad < b.edad) {
        return -1;
        }
        // a must be equal to b
        return 0;
});

var ordenDes = nombres.sort(function(a,b){
    if (a.edad < b.edad) {    // >    ordena de menor a mayor
        return 1;
        }
        if (a.edad < b.edad) {
        return -1;
        }
        // a must be equal to b
        return 0;
});

//   FUNCION MUY UTIL PARA ORGANIZAR  ascendente o descendente
var orden_ptos = dataEquipos.sort(function(a,b){
    if (a.puntos[7] < b.puntos[7]) {    // >    ordena de menor a mayor
        return 1;
        }
        if (a.puntos[7] > b.puntos[7]) {
        return -1;
        }
        // a must be equal to b
        return 0;
});

*/

//  -------------------------   USO DE PROTOTYPE    ----------------------------    //
/*
if (!Array.prototype.primero){
    Array.prototype.primero = function(){
        return this[0];
    }
}
*/