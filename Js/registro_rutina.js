function getrutina() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    console.log(ide)
    //xd
    const vdescripcion = document.getElementById("descripcion").value;
    const vurl = document.getElementById("url").value;
    const tipo = document.getElementById("rutina").value;
    const vid = ide

    axios({
        //SI
        method: 'POST',
        url: 'http://127.0.0.1:3550/add_rutina',
        data: {
            id_entrenador: vid,
            descripcion: vdescripcion,
            tipo_rutina: tipo,
            URLVIDEO: vurl

        },
    }).then(function (response) {
        if (response.data[0].Informacion == "Ya_existe") {
            alert("Ya existe una rutina con ese nombre")
        } else {
            alert("rutina agregada ")
            document.getElementById("descripcion").value = "";
            document.getElementById("rutina").value = "";
            document.getElementById("url").value = "";
        }


    }).catch(err => console.log('Error: ', err))

}

//----- pues si