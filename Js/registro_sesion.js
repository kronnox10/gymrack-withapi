function getsesion() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    console.log(ide)
    const ntrainer = document.getElementById("NombreTrainer").value;
    console.log(ntrainer)
    const tipo = document.getElementById("TipoRutina").value;
    console.log(tipo)
    const vid = ide
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3550/add_sesion',
        data: {
            id_usuario: vid,
            name: ntrainer,
            tipo_rutina: tipo  
        },
    }).then(function (response) {
        if (response.data.length > 0) {
            alert("sesion agregada ")//
        }
        else {
            alert("No puedes repetir el mismo tipo de rutina, la sesion con esa rutina ya existe")
        }
    }).catch(err => console.log('Error: ', err))
    //document.getElementById("descripcion").value = "";
    document.getElementById("TipoRutina").value = "";
}

