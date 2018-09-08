
// Primer uso de  AJAX   para tomar datos de Github
var objeto = {};

function getRequestGit() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {   // ante un cambio ejecuta la funcion
        if (this.readyState == 4 && this.status == 200) {
            datos = this.responseText;
            objeto = JSON.parse(this.responseText);
            document.getElementById("nombre").innerHTML= objeto.name;
            document.getElementById("nickname").innerHTML= objeto.login;
            document.getElementById("nickname").innerHTML= "<strong>Empresa: </strong>" + objeto.company;
            document.getElementById("demo").innerHTML = "<p>visita el perfil: </p>"+"<a href="+objeto.html_url+" target='_blank'>"+objeto.html_url+"</a>";
            document.getElementById("urlgit").innerHTML = objeto.html_url;
            document.getElementById("urlgit").setAttribute("href",objeto.avatar_url);
            document.getElementById("city").innerHTML = "<strong>Ciudad: </strong>"+ objeto.location;
            document.getElementById("foto").setAttribute("src",objeto.avatar_url);
            document.getElementById("repositorios").innerHTML = "<strong>Lista de   Respositorios:</strong>";
            document.getElementById("urlgit").setAttribute("style","display: block;");
            renderRepo(objeto.repos_url);
        }
    };
    xhttp.open("GET", "https://api.github.com/users/carlosfelipe29", true);
    xhttp.send();
    
    }


var boton_ = document.getElementById("boton");
boton_.addEventListener("click",getRequestGit);

/*
swal(
    'Good job!',
    'You clicked the button!',
    'success'
  )
  */
//var foto = document.getElementById("foto");

function renderRepo(url){   //   para cargar o ejecutar una url una vez se cargue los datos
    var data = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);  
            console.log(data);
            //document.getElementById("repos").innerHTML= this.responseText;
            listar_repos(data);
        }

    }
    req.open("GET", url, true);
    req.send();
}


function listar_repos(repos){
    var tabla = document.getElementById('lista_repos');
    var auxT = "";
    repos.forEach(function(nombres,index){
        console.log(nombres);
            auxT += "<tr><th scope='row'>"+ nombres.name + "</th><td><a href='"+nombres.html_url+"' target='_blank'>link "+(index+1)+"</a></td><td>"                
    })
    document.getElementById("tabla_repos").setAttribute("style","display: block;");
    tabla.innerHTML = auxT;
}
