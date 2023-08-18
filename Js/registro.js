
let inform = {}
let tabla = document.getElementById("tablacontacs");
console.log(tabla)

document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById("formulario");


    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const vnombres = document.getElementById("nombre").value;
        const vdireccion = document.getElementById("direccion").value;
        const vcorreo = document.getElementById("correo").value;
        const vtelefono = document.getElementById("telefono").value;
        const vcontraseña = document.getElementById("password").value;
        const seguridad = document.getElementById("repetir").value;
        const vgenero = document.getElementById("genero").value;
        const estado = 'activo'
        if (seguridad == vcontraseña) {
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:6122/add_usuario',
                data: {
                    name: vnombres,
                    direccion: vdireccion,
                    correo: vcorreo,
                    telefono: vtelefono,
                    password: vcontraseña,
                    num_valoracion: null,
                    planes: null,
                    estado: estado,
                    genero: vgenero

                },
            }).then(function (response) {
                if (response.data[0].Informacion == "Ya_existe") {
                    alert("Ya existe una cuenta con ese nombre de usuario")
                } else {
                    alert("Usuario agregado ")
                    document.getElementById("nombre").value = "";
                    document.getElementById("direccion").value = "";
                    document.getElementById("correo").value = "";
                    document.getElementById("telefono").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("repetir").value = "";
                    document.getElementById("genero").value = "";
                }

            }).catch(err => console.log('Error: ', err))
        } else {
            alert("Las contraseñas no coinciden")
        }





    });
});






function lista() {
    document.getElementById("tablacontacs").style = "0px solid black";
    document.getElementById("ocultar").style = "0px solid black";
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:6122/getlista',
    }).then(function (response) {




        let tabla = $('#tablacontacs').DataTable(); // Inicializa DataTables

        tabla.clear(); // Limpia los datos existentes en la tabla

        for (let i = 0; i < response.data.length; i++) {
            tabla.row.add([
                response.data[i].id,
                response.data[i].nombre,
                response.data[i].correo,
                response.data[i].estado
            ]);
        }

        tabla.draw(); // Dibuja la tabla con los nuevos datos y activa la funcionalidad de búsqueda
    }).catch(err => console.log('Error: ', err))
}



/*

function lista() {
  axios({
    method: 'GET',
    url: 'http://127.0.0.1:6122/getlista',
  }).then(function (response) {
    document.getElementById("tablacontacs").style = "0px solid black";
    document.getElementById("ocultar").style="0px solid black";
   

    tabla.innerHTML = ""; // Limpiamos el contenido actual de la tabla

    for (let i = 0; i < response.data.length; i++) {
      let nuevaFila = tabla.insertRow(tabla.length); // Insertamos una nueva fila

      let cell0 = nuevaFila.insertCell(0);
      cell0.innerHTML = response.data[i].id; // Primer elemento

      let cell1 = nuevaFila.insertCell(1);
      cell1.innerHTML = response.data[i].nombre; // Segundo elemento

      let cell2 = nuevaFila.insertCell(2);
      cell2.innerHTML = response.data[i].correo; // Tercer elemento

      let cell3 = nuevaFila.insertCell(3);
      cell3.innerHTML = response.data[i].estado; // Cuarto elemento
    }
  }).catch(err => console.log('Error: ', err))
}
 */


//let inform2 = {}
//let tabla2 = document.getElementById("tablaSolicitud");

function revisar_solicitudes() {
    document.getElementById("ocultar").style.display = "none";
    document.getElementById("tablacontacs").style.display = "none";
    document.getElementById("tablaAceptada").style.display = "none";
    document.getElementById("tablaSolicitud").style = "2px solid black";
    document.getElementById("ocultar2").style = "2px solid black";
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    console.log(ide)
    console.log("hola4")

    axios({
        method: 'POST',
        url: 'http://127.0.0.1:6122/revisarSolicitudes',
        data: {
            id_entrenador: ide
        }

    }).then(function (response) {
        console.log("hola3")



        let tabla2 = $('#tablaSolicitud').DataTable();
        tabla2.clear();
        for (i = 0; i < response.data.length; i++) {
            tabla2.row.add([
                response.data[i].nombre,
                response.data[i].id,

                '<a class="btn btn-outline-orange" onclick="aceptar_solicitud(\'  ' + response.data[i].id + '  \')">Aceptar<a/>  <a class="btn btn-outline-primary" onclick="rechazar_solicitud(\'  ' + response.data[i].id + '  \')">Rechazar<a/> '  /// tercer elemento

            ])

        }
        tabla2.draw();


    }).catch("Error")

}

function rechazar_solicitud(id) {
    vid_entrenador = id
    alert(id)

    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id


    axios({
        method: 'DELETE',
        url: 'http://127.0.0.1:6122/AceptarSolicitudes',
        data: {
            id_entrenador: ide,
            id_usuario: id,


        }

    }).then(function (response) {
        alert("Rechazado")
        revisar_solicitudes()
    }).catch("Error")
}


function aceptar_solicitud(id) {
    vid_entrenador = id
    alert(id)

    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id


    axios({
        method: 'DELETE',
        url: 'http://127.0.0.1:6122/AceptarSolicitudes',
        data: {
            id_entrenador: ide,
            id_usuario: id,


        }

    }).then(function (response) {


    }).catch("Error")


    axios({
        method: 'POST',
        url: 'http://127.0.0.1:6122/AceptarSolicitudes',
        data: {
            id_entrenador: ide,
            id_usuario: id,


        }

    }).then(function (response) {
        revisar_solicitudes()

    }).catch("Error")

}



//let inform3 = {}
//let tabla3 = document.getElementById("tablaAceptada");
//-------------------------Usuarios aceptados por parte del entrenador
function usuarios_aceptados() {
    miStorage = window.localStorage;
    let entrenadorid = JSON.parse(miStorage.getItem('usuario'));
    ide = entrenadorid.id
    console.log(ide)
    document.getElementById("tablacontacs").style.display = "none";
    document.getElementById("tablaSolicitud").style.display = "none";
    document.getElementById("ocultar").style.display = "none";
    document.getElementById("ocultar2").style.display = "none";

    document.getElementById("tablaAceptada").style.display = "block";

    console.log("holaaaaaaaa4")//podrias...
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:6122/usuarios_aceptados',
        data: {
            id_entrenador: ide,
        }

    }).then(function (response) {
        console.log("holaasasas")//


        let tabla3 = $('#tablaAceptada').DataTable();
        tabla3.clear();
        for (i = 0; i < response.data.length; i++) {
            tabla3.row.add([
                response.data[i].id,
                response.data[i].nombre,
                response.data[i].estado,
                response.data[i].correo,



            ])

        }
        tabla3.draw();
    }).catch("Error")
}



