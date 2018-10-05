var api_key="D0HqpPNQVefUHDNjMtNDNtiZeeM8MN9NPgcKAEMM";
var url_mars = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1500&camera=";
var ulr_earth = "https://api.nasa.gov/planetary/earth/imagery/?";
var url_search = "https://images-api.nasa.gov/search?q=";
var planeta = "";

var curiosity_img=[];
var rover_name ="";
var date_earth = [];
var camera_name = "";

var rutas_req = [];
var title_req = [];
var description_req = [];

$("#bar_loading").hide();
$("#search_bar_2").hide();
$("#coordinates").hide();
$("#msg_planet").hide();
$("#msg_planet2").hide();
$("#img_earth").hide();
$("#busca_planeta").hide();

$("#earth").on("click",function(){
    $("#coordinates").show();
    $("#search_bar_2").hide();
});                  

$("#rover").on("click",function(){
    $("#coordinates").hide();
    $("#busca_planeta").show();
});  



$("#send_planet, #send_planet2").on("click",function(){
    $("#coordinates").hide();
    $("#imagenes_planeta").html("");
    var titulo = "";    
    var opcion = this.id;   //que opcion selecciono  de los buscadores
    if(opcion == "send_planet"){
        planeta =$("#planet").val();
    }
    else if(opcion == "send_planet2"){
        planeta =$("#planet2").val();
    }
    var url_planet= url_search + planeta;
    if(planeta != ""){ 
        $("#busca_planeta").show();
        request_planet(url_planet).then(function(data){
            titulo = data.collection.items[1].data[0].title;
            $("#main_scope").empty();
            $("#titulo").empty();
            var query = Enumerable.From(data.collection.items)   // USO DE Linq JS   para una reduccion del array
            .Take(20).ToArray(); 

            query.forEach(function(ruta, index){  //  para PROMISES All
                rutas_req.push(ruta.href);
                title_req.push(ruta.data[0].title);
                description_req.push(ruta.data[0].description.substring(0,50));
            })
            // recibe todas las urls con Promise All       una Async Function
            var arr_img1 = `<div class="row">`
            $('#titulo').html(`<h3>${titulo}</h3>`);
            var arr_img = arr_img1 + "";
            getAllPeticiones(rutas_req).then(function(resultado){
                // AQUI DEBO IMPLEMENATR LO QUE ESTA EN EL THEN  de enseguida pq tengo el array con array de Imagenes ya listas
                resultado.forEach(function(ruta, index){
                    arr_img = arr_img + `<div class="col-sm-4">`;    
                    arr_img = arr_img + `   <div class="card" style="width: 15rem;">
                                                <img class="card-img-top" src="${ruta[0]}" height="200px" width="200px">
                                                <div class="card-body">
                                                    <h5 class="card-title">${title_req[index]}</h5>
                                                    <p class="card-text" style="color: black;">${description_req[index]}.</p>
                                                    <button id="pic${index}" value="${ruta[0]}" class="btn btn-primary card_class" data-toggle="modal" data-target="#img_planet${index}"> Ver Imagen</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="img_planet${index}" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content" style="background-color: black; color: white;">
                            <div class="modal-header">
                                <h6 class="modal-title">${title_req[index]}</h6>
                            </div>
                            <div class="modal-body" style="background-color:black;">
                                <img id="planet_img${index}" src="${ruta[0]}" class="img" width="470px" height="470px"> 
                            </div>
                            <p id="text_planet" style="text-align: center"></p>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>`;
                });
                arr_img = arr_img + `</div></div>`;
                description_req = [];
                rutas_req = [];
                title_req = [];
                $("#main_scope").html(arr_img);
                //$("#imagenes_planeta").html(arr_img);
                $("#search_bar_2").show();
                arr_img = "";
                arr_img1 = "";
                planeta = "";
                url_planet = "";
                opcion = "";
                titulo = "";
            });
        }) 
        .catch(function(error){
            console.log("LANZO UN ERROR en request planet: "+ error);
            msgs(opcion);
        })
    }
    else{
       msgs(opcion);
    }
});  

function msgs(opcion){
    if(opcion == "send_planet"){
        $('#msg_planet').show();
        $('#msg_planet').fadeIn('slow');
        $("#msg_planet").delay(2000).fadeOut(400);  // mensaje corto
    }
    else{
        $('#msg_planet2').show();
        $('#msg_planet2').fadeIn('slow');
        $("#msg_planet2").delay(2000).fadeOut(400);  // mensaje corto
    }
}   

// dispara lo que se quiere buscar de la tierra
$("#send_coord").on("click",function(){
    $("#busca_planeta").show();
    $("#zona_search").hide();
    var lat = $("#latitude").val();
    var lon = $("#longitude").val();
    var url = ulr_earth + "lat=" + lat +"&lon=" + lon +"&dim=0.020&api_key="+ api_key;
    $("#latitude").val('');
    $("#longitude").val('');
    request_planet(url).then(function(data){
        $('#titulo').empty();
        var msg = `<h4>Imagen Satelital de la tierra (lat= ${lat} , lon= ${lon})</h4>`;
        var imagen = `<div id="busqueda_tierra" style="margin-left: 100px;">${msg}<img src="${data.url}" class="img" style="margin-left: 120px;"></div>`;
        //$("#main_scope").html(imagen);
        $("#img_earth").show();
        $(".modal-title").text(`IMAGEN SATELITAL (lat= ${lat}, lon= ${lon})`);
        $("#imagen_tierra").attr("src",data.url);
        $("#text_tierra").text(`Fecha de la captura: ${data.date}`);
    })
    .catch(function(error){
        console.log(error);
    })  
})

$(".dropdown-item").click(function(){
    $("#busca_planeta").show();
    $("#zona_search").hide();
    var opc = $(this).val();
    var url = url_mars + opc + "&api_key=" + api_key;
    request_planet(url).then(function(data){
        //424920,
        //var query = Enumerable.From(data.photos)   // USO DE Linq JS   para una reduccion del array
        //.Where("$.id < 424920").ToArray();
        var query = Enumerable.From(data.photos)   // USO DE Linq JS   para una reduccion del array
        .Take(15).ToArray();                        // toma los primeros 15
    
        var arr_photos = query;   // uso de array obtenido de Linq JS
        console.log(data.photos[0]);
        rover_name= data.photos[0].rover.name;
        camera_name = data.photos[0].camera.full_name;
        var tam = arr_photos.length;
        var str_csl = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel"> <ol class="carousel-indicators">`;
        $('#titulo').empty();
        console.log("al foreach a leer");
        arr_photos.forEach(function(img_url, index){
            curiosity_img.push(img_url.img_src);
            date_earth.push(img_url.earth_date);
            str_csl += `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="active"></li>`
        }) 
        str_csl += `</ol><div class="carousel-inner">`;
        curiosity_img.forEach(function(img, index){
            if(index==0){
                str_csl += `<div class="carousel-item active">
                                <img class="d-block img-rounded" height="520" width="950" src="${img}" style="margin-right=50px !important;">   
                                <div class="carousel-caption d-none d-md-block">
                                    <h5><strong>Fecha:</strong> ${date_earth[index]}</h5>
                                    <p class="text_img"><strong>Camara del Rover: </strong> ${camera_name}</p> 
                                </div>
                            </div>`;
            }
            else{
                str_csl += `<div class="carousel-item">
                                <img class="d-block img-rounded" height="520" width="950" src="${img}" style="margin-right=50px !important;">
                                <div class="carousel-caption d-none d-md-block">
                                    <h5><strong>Fecha:</strong> ${date_earth[index]}</h5>
                                    <p class="text_img"><strong>Camara del Rover: </strong> ${camera_name}</p> 
                                </div>
                            </div>`;
            }
        })
        str_csl += `</div><a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>`;

        
        $("#main_scope").html(str_csl);

        curiosity_img=[];
        rover_name ="";
        date_earth = [];
        camera_name = "";
    })
    .catch(function(error){
        console.log(error);
    })  

});

$("#busca_planeta").on('click', function(){
    $("#coordinates").hide();
    $("#search_bar_2").css({
        "margin-top": "30px",
        "margin-left":"20px"
    });
    $("#title_bar2").text("Buscador de imagenes");
    $("#search_bar_2").show();
   
})


$("#card_class").on('click', function(){
    console.log($(this).val());
    var url = $(this).val();
    //var url = $(".card-img-top").attr("src");
    console.log(url);
    $("#planet_img").attr("src", url);
    $("#img_planet").modal();
})


// ejecuta apenas se carga el documento WEB
$(document).ready(function(){
    $("#video_mars").modal();
});


function request_planet(url_p){
    $("#bar_loading").show();
    return new Promise(function(resolve, reject){
        event.preventDefault();  // evitar que envie la respuesta al mismo dominio de la web
        $.ajax({
        url:url_p,
        type:"GET",
        dataType: "json",   // espero que me entregue un JSON
    }).done(function(data){
            resolve(data);  //Si consulta es satisfactoria devuelve el RESOLVE  en tomado en el THEN
    }).fail(function(){
        reject(url_p);
    }).always(function(){
        $("#bar_loading").hide();
    });
    })
}


async function getAllPeticiones(arrID){ //Funcion para mandar varias peticiones de un array de urls de imagenes NASA
    var promesas = arrID.map(function(url){
    return request_planet(url);
    });
    try {
    var nasa_imgs = await Promise.all(promesas);
        //console.log(nasa_imgs);   // entrega array de URL de imagenes lstas para renderizar
        return nasa_imgs;
    } catch (error) {
    console.log(error);
    }
}