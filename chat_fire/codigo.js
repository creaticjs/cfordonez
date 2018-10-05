// Initialize Firebase
        var config = {
            apiKey: "AIzaSyCv-N4XikVZjihsZrED1ZJjHejZMTLehWQ",
            authDomain: "testbootcamp-fed2b.firebaseapp.com",
            databaseURL: "https://testbootcamp-fed2b.firebaseio.com",
            projectId: "testbootcamp-fed2b",
            storageBucket: "testbootcamp-fed2b.appspot.com",
            messagingSenderId: "48949287024"
        };
        firebase.initializeApp(config);

        var basedeDatos = firebase.database().ref('mensajes');
        basedeDatos.on('child_added', function (data) {
            $('#mensajes').append(`</p><p>${data.val().body}<p/>`);
        });

        $('#enviar').on('click', enviarMSG);
        $('#textoMsg').on('keypress',function(e){
            if(e.which == 13) {
                enviarMSG();
            }
        });
 
        function enviarMSG(){
            console.log('Enviar mensaje');
            basedeDatos.push().set({body: $('#textoMsg').val()})
            $('#textoMsg').val('');
        }