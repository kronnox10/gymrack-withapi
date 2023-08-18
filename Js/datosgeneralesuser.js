
let inform = {}
let tabla = document.getElementById("tablacontacs");
function lista() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    ////////////////////////////////////////////////////////////////////////
    //////////////////////// CONSULTA TODOS ///////////////////////////////

    axios({
        method: 'POST',
        url: 'http://10.0.0.5:6122/datosuser',
        data: {
            id: ide
        }
    }).then(function (response) {
        document.getElementById('nombre').value = response.data[0].nombre;
        document.getElementById('direccion').value = response.data[0].direccion;
        document.getElementById('correo').value = response.data[0].correo;
        document.getElementById('estado').innerText = response.data[0].estado;
        document.getElementById('telefono').value = response.data[0].telefono;

        console.log(response)


    }).catch(err => console.log('Error: ', err))


}

function editar() {
    const v_edit_nombre = document.getElementById('nombre');
    v_edit_nombre.removeAttribute('readonly');
    v_edit_nombre.focus();

    const v_edit_direccion = document.getElementById('direccion');
    v_edit_direccion.removeAttribute('readonly');
    //v_edit_direccion.focus(); 

    const v_edit_correo = document.getElementById('correo');
    v_edit_correo.removeAttribute('readonly');


    const v_edit_telefono = document.getElementById('telefono');
    v_edit_telefono.removeAttribute('readonly');

    //v_edit_correo.focus();

    /*El focus permite que al editar se enfoque*/
}

function actualizarDatosUser() {
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    //alert(ide)

    let vnombre = document.getElementById('nombre').value;
    let vdireccion = document.getElementById('direccion').value;
    let vcorreo = document.getElementById('correo').value;
    let vtelefono = document.getElementById('telefono').value;


    const no_edit_nombre = document.getElementById('nombre');
    no_edit_nombre.setAttribute("readonly", "");

    const no_edit_direccion = document.getElementById('direccion');
    no_edit_direccion.setAttribute("readonly", "");

    const no_edit_correo = document.getElementById('correo');
    no_edit_correo.setAttribute("readonly", "");


    const no_edit_telefono = document.getElementById('telefono');
    no_edit_telefono.setAttribute('readonly', "");

    console.log(no_edit_nombre)
    console.log(no_edit_direccion)
    console.log(no_edit_correo)
    vestado = 'activo';
    axios({

        method: 'PUT',
        url: 'http://10.0.0.5:6122//update/<id>',
        data: {
            name: vnombre,
            direccion: vdireccion,
            correo: vcorreo,
            id: ide,
            telefono: vtelefono,
            estado:vestado
        }


    }).then(function (response) {
        alert("Actualizado")

    })


}





function calificar(item) {
    contador = item.id[0];//captura el primer digito de la id sea desde 1 a 5 dejando estrella
    let nombre = item.id.substring(1);//captura el nombre, el numero fue capturado arriba xd 
    for (let i = 0; i < 5; i++) {
        if (i < contador) {
            document.getElementById((i + 1) + nombre).style.color = 'orange';// Es facil mandarlo a la base de datos
        } else {
            document.getElementById((i + 1) + nombre).style.color = 'gray';
        }
    }
}



var contador = 0;
//Revisa bien
function enviar() {
    alert(contador)

}


function TODOS() {
    asistencia()
    ocultar()
    event.preventDefault();
    mostrar()
}


function asistencia() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id

    axios({
        method: 'POST',
        url: 'http://10.0.0.5:6122/asistencia',
        data: {
            id_usuario: ide
        }

    }).then(function (response) {

        alert("Asistencia realizada")

    }).catch(err => console.log('Error: ', err))



}

function ocultar() {
    document.getElementById("omg").style.display = "none";
}
function mostrar() {
    document.getElementById("ci").style.display = "flex";
}
//, oka
