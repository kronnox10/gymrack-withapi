let inform = {}
let tabla = document.getElementById('tablaSesion')

function MostrarRutinaCreada() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id

    console.log("hola")
    axios({
        method: 'POST',
        url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/MostrarNombreEntrenadorParaSesion',
        data: {
            id_usuario: ide

        },
    }).then(function (response) {

        const SelectNameTrainer = document.getElementById('NombreTrainer')

        for (let i = 0; i < response.data.length; i++) {


            const option = document.createElement('option');


            option.value = response.data[i].NombreEntrenador;


            option.textContent = response.data[i].NombreEntrenador;


            SelectNameTrainer.appendChild(option);
        }

        axios({
            method: 'POST',
            url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/MostrarRutinaCreadaPorEntrenador',
            data: {
                id_usuario: ide

            },
        }).then(function (response) {
            const selectTipoRutina = document.getElementById('TipoRutina')
            for (let i = 0; i < response.data.length; i++) {
                const option2 = document.createElement('option');
                option2.value = response.data[i].tipoDeRutina;
                option2.textContent = response.data[i].tipoDeRutina;
                selectTipoRutina.appendChild(option2);
            }

        }).catch("informacion")

    }).catch(err => console.log('Error: ', err))
}

var nuevaid = ""
function MostrarSesionCreada() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    console.log(ide)
    axios({
        method: 'POST',
        url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/MostrarSesionCreadaPorUsuario',
        data: {
            id_usuario: ide
        },
    }).then(function (response) {
        let tabla = $('#tablaSesion').DataTable();
        tabla.clear();
        for (i = 0; i < response.data.length; i++) {
            nuevaid = "uereele" + i

            tabla.row.add([
                response.data[i].NombreDeEntrenador,
                response.data[i].tipoRutina,//
                '<a class="" target="_blank" id="' + nuevaid + '" onclick="video(\'' + response.data[i].tipoRutina + '\', \'' + nuevaid + '\')"> <img src="../../img/see.jpg" width="20%" class="me-5"></a>'
                //<a href="https://www.youtube.com/watch?v=JVeAtudHuhk&list=PLNq-RFxFnmyQWKmRjB8BL_UOwwWSYEk5R&index=1" target="_blank"><img src="img/flecha.png" width="25px" alt="Papu"> 

            ])
            console.log(response.data[i].NombreDeEntrenador)
            console.log(response.data[i].tipoRutina)
            tipo = response.data[i].tipoDeRutina
            vtipo = response.data[i].tipoRutina
            console.log("ss")


        }
        tabla.draw();

    }).catch(err => console.log('Error: ', err))
}
var vtipo = 0
var NombreDeEntrenador = 0

//ya, voy a probar, VAYA
function video(tipo3, idnew) {
    console.log("lll", tipo3)
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    console.log(ide)
    axios({
        method: 'POST',
        url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/url_video',
        data: {
            tipo: tipo3,
            id_usuario: ide,

        }
    }).then(function (response) {

        console.log(idnew)
        console.log(response.data[0].url)




        const a = document.getElementById(idnew);
        console.log(a)


        a.setAttribute('href', response.data[0].url)
        console.log("aqui esta el console .log")
        console.log(a)
    }).catch(function (error) {
        console.error("Error en la solicitud:", error);
    });
}


function mostrarDescripcion() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    const vtipo = document.getElementById('TipoRutina').value;
    const vnombre = document.getElementById('NombreTrainer').value;
    console.log("--", vtipo)
    console.log("--", vnombre)

    axios({
        method: 'POST',
        url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/MostrarDescripcionCreadaPorEntrenador',
        data: {
            tipo: vtipo,
            id_usuario: ide,
            name: vnombre,
        }
    }).then(function (response) {
        console.log("s")
        document.getElementById('description').value = response.data[0].Descripcion;

        document.getElementById('description').innerText = response.data[0].Descripcion;
    }).catch("AXD")//
}




const BTipoRutina = document.getElementById('TipoRutina');
const Bname = document.getElementById('NombreTrainer');
const ValueTipoRutina = document.getElementById('TipoRutina').value;


BTipoRutina.addEventListener('change', () => {
    const valuename = document.getElementById('NombreTrainer').value;
    const ValueTipoRutina = document.getElementById('TipoRutina').value;

    console.log(valuename)
    if (valuename == "") {

        document.getElementById('TipoRutina').value = "";
        document.getElementById('NombreTrainer').value = "";



    } else {
        if (ValueTipoRutina == "") {

            document.getElementById('TipoRutina').value = "";

            document.getElementById('description').value = "";
        } else {

            mostrarDescripcion()
        }
    }

});
Bname.addEventListener('change', () => {
    const valuename = document.getElementById('NombreTrainer').value;
    console.log(valuename)
    if (valuename == "") {

        document.getElementById('TipoRutina').value = "";
        document.getElementById('NombreTrainer').value = "";
        document.getElementById('description').value = "";


    } else {
        mostrarDescripcion()//
    }

});
