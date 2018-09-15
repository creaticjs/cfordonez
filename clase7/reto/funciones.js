var url_request=""; 
var objeto = {};
var data_api = {};  // guardará la primera consulta con ajax a la API
var seleccion="";   // variable que toma el item del select
var aux_naves="";
var aux_vehiculo="";
var aux_films="";
var aux_films_char="";
var aux_films_planet="";
var aux_films_ships = "";
var aux_films_species = "";
var aux_planets_people="";
var aux_planets_films="";
var aux_planets_info = "";
var aux_species_films="";
var aux_species_info = "";
var aux_ships_films="";
var aux_ships_info="";
var aux_auto_films="";
var aux_auto_info="";
var ctd_nave=0;   // numero de naves leidas
var ctd_vehiculo=0;   // numero de naves leidas
var ctd_films=0;   // numero de naves leidas
var size_ships = 0;
var size_vehicles = 0;
var size_films = 0;

var avatars=[
    'https://vignette.wikia.nocookie.net/swfanon/images/d/d8/Luke-promopicture.jpg/revision/latest?cb=20100516123000',
    'https://vignette.wikia.nocookie.net/starwars/images/6/66/C-3PO.jpg/revision/latest?cb=20091202210619',
    'https://vignette.wikia.nocookie.net/es.starwars/images/8/8e/R2d2-0.jpg/revision/latest?cb=20151225103127',
    'https://vignette.wikia.nocookie.net/hitlerparody/images/3/38/Darth-Vader.jpg/revision/latest?cb=20170109114532&path-prefix=es',
    'https://vignette.wikia.nocookie.net/hieloyfuego/images/5/5f/Princess-leia.jpg/revision/latest?cb=20161227184749',
    'https://vignette.wikia.nocookie.net/starwars/images/3/33/Young_owen.jpg/revision/latest?cb=20080313203444', 
    'https://fullstarwars.files.wordpress.com/2015/05/berulars03.jpg?w=1000&h=',
    'https://vignette.wikia.nocookie.net/es.starwars/images/2/2c/R5d4.jpg/revision/latest?cb=20060315232602',
    'https://vignette.wikia.nocookie.net/swfanon/images/5/57/BiggsDarklighter.jpg/revision/latest/scale-to-width-down/350?cb=20120324222406',
    'https://vignette.wikia.nocookie.net/swfans/images/d/d1/ObiWanKenobi.jpg/revision/latest?cb=20130604153336',
    'https://vignette.wikia.nocookie.net/starwars/images/6/61/AnakinSkywalker.jpg/revision/latest?cb=20061223050619',
    'https://vignette.wikia.nocookie.net/legomessageboards/images/1/1d/Chewbacca.jpg/revision/latest?cb=20130430154940'
];

// ----    para cargar o ejecutar una URL una vez se cargue los datos  ----//
function api_request(url){ 
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            data_api = data;
        }
    }
    req.open("GET", url, true);
    req.send();
}

function listar_info(informacion){
    var tabla = document.getElementById('lista_repos');
    var auxT = "";
    informacion.forEach(function(nombres,index){
            auxT += "<tr><th scope='row'>"+ nombres.name + "</th><td><a href='"+nombres.html_url+"' target='_blank'>link "+(index+1)+"</a></td><td>"                
    })
    document.getElementById("tabla_repos").setAttribute("style","display: block;");
    tabla.innerHTML = auxT;
}

///--------------------    RETO   -----------------------------------//

var boton1 = document.getElementById("people");
var boton2 = document.getElementById("films");
var boton3 = document.getElementById("planets");
var boton4 = document.getElementById("species");
var boton5 = document.getElementById("starships");
var boton6 = document.getElementById("vehicles");


boton1.addEventListener("click",selector);
boton2.addEventListener("click",selector);
boton3.addEventListener("click",selector);
boton4.addEventListener("click",selector);
boton5.addEventListener("click",selector);
boton6.addEventListener("click",selector);

var urls_selector=[];

// PRIMERA FUNCION QUE SE LANZA PARA CONSULTAR  cualquier boton
function selector(){
    baseUrl ="https://swapi.co/api/";
    var url= baseUrl + this.id;
    url_request=url;    // URL completa
    urls_selector=[];
    clear_screen();
    var opc = this.id;  // es la opcion:  vehicles, people, starships etc-...
    seleccion= opc;
    var aux = "<option value=0>Seleccionar</option>";
    api_request(url);   // ejecuta una consulta de un boton seleccionado
    var titulo_select= document.getElementById("title_select"); // toma el object titulo del select
    var opc_sel = document.getElementById("opciones");
    setTimeout(function(){
        var opc1 = menu_op(opc);
        titulo_select.innerHTML="<strong>Escoja "+opc1+"</strong>";   // pone un mensaje antes del select
        document.getElementById("opciones").setAttribute("style","display: block;"); // aparece select
        var listas = data_api.results;
        listas.forEach(function(item, index){      // va a recorrer el data para listar las opciones
            urls_selector.push(item.url);
            if(opc == "films")
                aux += "<option value='" + (index+1) +"'>"+item.title +"</option>"    
            else    
                aux += "<option value='" + (index+1) +"'>"+item.name +"</option>"
         });
         opc_sel.innerHTML = aux;
    }, 3000);
}

//https://swapi.co/api/films/?title=A new Hope

var select_button =  document.getElementById("opciones");   // var que recibe Objeto Select
//var table_sort =  document.getElementById("tabla_sort");

select_button.onchange = function() { //detecta cambios sobre el select cargado 
        var nom = this.options[this.selectedIndex].text;   // ubica todo lo seleccionado
        var indice = this.options[this.selectedIndex].value;  // valor numerico de opcion
        var datos = [];
        var req = new XMLHttpRequest();
        var url_consulta = "";
        url_consulta= urls_selector[indice-1];  // tiene la lista o URL del elemento seleccionado 
        /*
        if(seleccion == "starships" || seleccion == "vehicles"){
            url_consulta= urls_selector[indice-1];
        }
        else{
            url_consulta =url_request+"/"+indice;  //
        }*/
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);  
                datos = data;
                despliegue_info(datos, indice);
            }
        }
        req.open("GET", url_consulta, true);
        req.send();
}


function despliegue_info(datos, indice){
    if(seleccion == "people"){
        document.getElementById("div_vehiculo").value="";
        document.getElementById("div_naves").value ="";
        document.getElementById("data_films").value ="";
        document.getElementById("div_img").setAttribute("style","display: block;");
        document.getElementById("foto").setAttribute("src",avatars[indice-1]);
        document.getElementById("info_people_container").setAttribute("style","display: block;");
        document.getElementById("info_people").value ="Nacimiento: "+ datos.birth_year+"\nGenero: "+datos.gender+"\naltura: "+datos.height+"\nMasa: "+ datos.mass+"\n";
        document.getElementById("data_people_container").setAttribute("style","display: block;");
        aux_vehiculo = "";
        aux_naves = "";
        aux_films = "";
        //document.getElementById("data_people").value =datos.homeworld+"\nNaves: "+ datos.starships+"\n";
        get_planet(datos.homeworld); // funcion para data planeta
        var arr_nave = datos.starships;
        var arr_vehiculo = datos.vehicles;
        var arr_films = datos.films;
        size_ships= arr_nave.length;
        size_vehicles= arr_vehiculo.length;
        size_films= arr_films.length;
        arr_nave.forEach(function(nave,index){
            get_naves(nave); // funcion para naves
        });
        arr_vehiculo.forEach(function(medio,index){
            get_vehiculo(medio); // funcion para naves
        });
        arr_films.forEach(function(movie,index){
            get_films(movie); // funcion para naves
        });
    }
    if(seleccion == "films"){
        aux_films_char="";
        aux_films_planet="";
        aux_films_ships = "";
        aux_films_species = "";
        var arr_people = datos.characters;        
        var arr_planets = datos.planets;
        var arr_species = datos.species;
        var arr_ships = datos.starships;
        document.getElementById("info_fimls_container").setAttribute("style","display: block;");
        document.getElementById("data_films_container").setAttribute("style","display: block;");
        document.getElementById("div_reseña").setAttribute("style","display: block;");
        document.getElementById("data_reseña").value =datos.opening_crawl+"\n";
        document.getElementById("films_director").value =datos.director;
        
        arr_people.forEach(function(person,index){
            get_films_characters(person,index); // funcion para naves
        });
        arr_planets.forEach(function(plan,index){
            get_films_planets(plan,index); // funcion para naves
        });
        arr_ships.forEach(function(ship,index){
            get_films_ships(ship,index); // funcion para naves
        });
        arr_species.forEach(function(esp,index){
            get_films_species(esp,index); // funcion para naves
        });
    }
    if(seleccion == "planets"){
        aux_planets_people="";
        aux_planets_films="";
        aux_planets_info = "";
        var arr_resident = datos.residents;        
        var arr_pelis = datos.films;
        document.getElementById("info_planet_container").setAttribute("style","display: block;");
        document.getElementById("data_planet_container").setAttribute("style","display: block;");
        get_planet_info(datos);
        arr_pelis.forEach(function(peli,index){
            get_planet_films(peli,index); // funcion para naves
        });
        arr_resident.forEach(function(res,index){
            get_films_resid(res,index); // funcion para naves
        });   
    }
    if(seleccion == "species"){
        aux_species_films="";
        aux_species_info="";
        var arr_peli = datos.films;        
        document.getElementById("info_species_container").setAttribute("style","display: block;");
        document.getElementById("data_species_container").setAttribute("style","display: block;");
        get_species_info(datos);
        arr_peli.forEach(function(fil,index){
            get_species_films(fil,index); // funcion para pelis donde aparecen
        });
        get_species_planet(data.homeworld); // el planeta de la especie
    }
    if(seleccion == "starships"){
        aux_ships_films="";
        aux_ships_info="";
        var ship_films = datos.films;        
        document.getElementById("info_ships_container").setAttribute("style","display: block;");
        document.getElementById("data_ships_container").setAttribute("style","display: block;");
        get_ships_info(datos);
        ship_films.forEach(function(fil,index){
            get_ships_films(fil); // funcion para pelis donde aparecen
        });
    }
    if(seleccion == "vehicles"){
        aux_auto_films="";
        aux_auto_info="";
        var auto_films = datos.films;        
        document.getElementById("info_auto_container").setAttribute("style","display: block;");
        document.getElementById("data_auto_container").setAttribute("style","display: block;");
        get_auto_info(datos);
        auto_films.forEach(function(fil,index){
            get_auto_films(fil); // funcion para pelis donde aparecen
        });
    }
}

//para cargar informacion mas interna
function get_planet(url){   
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            document.getElementById("data_people").value ="\n"+data.name+"\n";
        }
    }
    req.open("GET", url, true);
    req.send();
}

//para cargar informacion vehiculo
function get_vehiculo(url){ 
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            ctd_vehiculo+=1;
            //var hsAux=`<div><ul><li>${data.name}</li></ul></div>`;
            var hsAux="- "+data.name+"\n";
            aux_vehiculo+=hsAux;
            if(ctd_vehiculo == size_vehicles){                
                //document.getElementById('div_vehiculo').innerHTML = "<h3>Vehiculos:</h3>"+aux_vehiculo;
                document.getElementById("div_vehiculo").value =aux_vehiculo;
                ctd_vehiculo=0;
            }

        }
    }
    req.open("GET", url, true);
    req.send();
}


function get_naves(url){ 
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            ctd_nave+=1;
            //var hsAux=`<div><ul><li>${data.name}</li></ul></div>`;
            var hsAux="- "+data.name+"\n";
            aux_naves+=hsAux;
            if(ctd_nave == size_ships){
                //document.getElementById('div_naves').innerHTML = "<h3>Naves:</h3>"+aux_naves;
                document.getElementById("div_naves").value =aux_naves;
                ctd_nave=0;
            }
        }
    }
    req.open("GET", url, true);
    req.send();
}


function get_films(url){ 
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            ctd_films+=1;
            var hsAux="- "+data.title+"\n";
            aux_films+=hsAux;
            if(ctd_films == size_films){
                //document.getElementById('div_naves').innerHTML = "<h3>Naves:</h3>"+aux_naves;
                document.getElementById("data_films").value =aux_films;
                ctd_films=0;
            }
        }
    }
    req.open("GET", url, true);
    req.send();
}

function get_films_characters(url, indice){   // personajes de  peliculas
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            if(indice < 9){
                var hsAux="- "+data.name+"\n";
                aux_films_char+=hsAux;    
                document.getElementById("films_people").value =aux_films_char;
            }
            /*
            //var hsAux=`<div><ul><li>${data.name}</li></ul></div>`;
            if(ctd_persona == ){
                //document.getElementById('div_naves').innerHTML = "<h3>Naves:</h3>"+aux_naves;
                document.getElementById("div_naves").value =aux_naves;
                ctd_persona=0;
            }*/
        }
    }
    req.open("GET", url, true);
    req.send();
}

function get_films_planets(url, indice){   // personajes de  peliculas
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            if(indice < 5){
                var hsAux="- "+data.name+"\n";
                aux_films_planet+=hsAux;    
                document.getElementById("films_planet").value =aux_films_planet;
            }
            /*
            //var hsAux=`<div><ul><li>${data.name}</li></ul></div>`;
            if(ctd_persona == ){
                //document.getElementById('div_naves').innerHTML = "<h3>Naves:</h3>"+aux_naves;
                document.getElementById("div_naves").value =aux_naves;
                ctd_persona=0;
            }*/
        }
    }
    req.open("GET", url, true);
    req.send();
}

function get_films_ships(url, indice){   // personajes de  peliculas
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            if(indice < 6){
                var hsAux="- "+data.name+"\n";
                aux_films_ships+=hsAux;    
                document.getElementById("films_ships").value =aux_films_ships;
            }
        }
    }
    req.open("GET", url, true);
    req.send();
}

function get_films_species(url, indice){   // personajes de  peliculas
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            if(indice < 6){
                var hsAux="- "+data.name+"\n";
                aux_films_species+=hsAux;    
                document.getElementById("films_species").value =aux_films_species;
            }
        }
    }
    req.open("GET", url, true);
    req.send();
}

function get_planet_info(data){   // info de Planeta
    var hsAux="\n- Periodo: "+data.orbital_period+"\n";  
    hsAux+="- Diametro: "+data.diameter+"\n";
    hsAux+="- Gravedad: "+data.gravity+"\n";
    hsAux+="- Clima: "+data.climate+"\n";
    hsAux+="- Población: "+data.population+"\n";
    hsAux+="- Terreno: "+data.terrain+"\n";
    aux_planets_info +=hsAux;    
    document.getElementById("planets_info").value =aux_planets_info;   
}

function get_planet_films(url, indice){   // personajes de  peliculas
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            if(indice < 5){
                var hsAux="- "+data.title+"\n";
                aux_planets_films+=hsAux;    
                document.getElementById("planets_movie").value =aux_planets_films;
            }
        }
    }
    req.open("GET", url, true);
    req.send();
}


function get_films_resid(url, indice){   // personajes de  peliculas
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            if(indice < 8){
                var hsAux="- "+data.name+"\n";
                aux_planets_people +=hsAux;    
                document.getElementById("planets_people").value =aux_planets_people;
            }
        }
    }
    req.open("GET", url, true);
    req.send();
}

function get_species_info(data){   // info de Planeta
    var hsAux="\n- Clasificación: "+data.classification+"\n";  
    hsAux+="- Designación: "+data.designation+"\n";
    hsAux+="- Altura promedio: "+data.average_height+"\n";
    aux_species_info +=hsAux;    
    document.getElementById("species_info").value =aux_species_info;   
    var lang= data.language;
    document.getElementById("species_lang").value ="\n"+lang+"\n";   
}

function get_species_films(url, indice){   // planetas de especies
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            var hsAux="- "+data.title+"\n";
            aux_species_films+=hsAux;    
            document.getElementById("species_movie").value =aux_species_films;
        }
    }
    req.open("GET", url, true);
    req.send();
}

function get_species_planet(url){   // personajes de  peliculas
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            var hsAux="\n"+data.name+"\n";
            document.getElementById("species_planet").value =hsAux;   
        }
    }
    req.open("GET", url, true);
    req.send();
}

function get_ships_info(data){
    var modelo= data.model;
    var crews= data.crew;
    var hsAux="\n- Longitud: "+data.length+"\n";  
    hsAux+="- Capacidad: "+data.cargo_capacity+"\n";
    hsAux+="- Pasajeros: "+data.passengers+"\n";
    aux_ships_info +=hsAux;    
    document.getElementById("ships_info").value =aux_ships_info;   
    document.getElementById("ships_class").value ="\n"+modelo+"\n";
    document.getElementById("ships_crew").value ="\n"+crews+"\n";
}

function get_ships_films(url){   // naves en peliculas
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            var hsAux="- "+data.title+"\n";
            aux_ships_films +=hsAux;    
            document.getElementById("ships_movies").value =aux_ships_films;
        }
    }
    req.open("GET", url, true);
    req.send();
}

function get_auto_info(data){
    var modelo= data.model;
    var clase= data.vehicle_class;
    var crews= data.crew;
    var fabrica= data.manufacturer;
    var hsAux="\n- Longitud: "+data.length+"\n";  
    hsAux+="- Capacidad: "+data.cargo_capacity+"\n";
    hsAux+="- Maxima Velocidad: "+data.max_atmosphering_speed+"\n";
    hsAux+="- Pasajeros: "+data.passengers+"\n";
    aux_auto_info +=hsAux;    
    document.getElementById("auto_info").value =aux_auto_info;   
    document.getElementById("auto_class").value ="\n"+clase+"\n"; 
    document.getElementById("auto_model").value ="\n"+fabrica+"\n"; 
    document.getElementById("auto_crew").value ="\n"+crews+"\n";
}

function get_auto_films(url){   // naves en peliculas
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            var hsAux="- "+data.title+"\n";
            aux_auto_films +=hsAux;    
            document.getElementById("auto_movies").value = aux_auto_films;
        }
    }
    req.open("GET", url, true);
    req.send();
}



function menu_op(opc){
    var sel;
    switch(opc){
    case 'people':
            sel = " un Personaje";
            break;
    case 'films':
            sel = "una Pelicula";
            break;         
    case 'planets':
            sel = "un planeta";
            break;        
    case 'species':
            sel = "un Especimen";
            break;            
    case 'starships':
            sel = "una nave";
            break;   
    case 'vehicles':
            sel = " un Vehiculo";
            break;                
    }
    return sel;
}

function clear_screen(){
    document.getElementById("div_img").setAttribute("style","display: none;");
    document.getElementById("info_people_container").setAttribute("style","display: none;");
    document.getElementById("data_people_container").setAttribute("style","display: none;");
    document.getElementById("info_fimls_container").setAttribute("style","display: none;");
    document.getElementById("data_films_container").setAttribute("style","display: none;");
    document.getElementById("div_reseña").setAttribute("style","display: none;");
    document.getElementById("data_planet_container").setAttribute("style","display: none;");
    document.getElementById("info_planet_container").setAttribute("style","display: none;");
    document.getElementById("info_species_container").setAttribute("style","display: none;");
    document.getElementById("data_species_container").setAttribute("style","display: none;");
    document.getElementById("info_ships_container").setAttribute("style","display: none;");
    document.getElementById("data_ships_container").setAttribute("style","display: none;");
    document.getElementById("info_auto_container").setAttribute("style","display: none;");
    document.getElementById("data_auto_container").setAttribute("style","display: none;");
}


/*
imgFilms.forEach(function(item){
    var hsAux=`<div class="col-md-4">
                <img src="${item.url}" width="100%" alt="">
                <button class="btn btn-success"> Abrir</button>
            </div>`;
    ux_naves += hsAux;
   
});
document.getElementById('imagenes').innerHTML = htmlString;
*/
//para cargar informacion Naves
