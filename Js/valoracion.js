


function usuario() {

    miStorage = window.localStorage;
    let vid_entrenador = JSON.parse(miStorage.getItem('usuario'));//si
    ide = vid_entrenador.id

    console.log(vid_entrenador)
    console.log(vid_entrenador.id)//los 2 link v:


    axios({
        method: 'POST',
        url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/usuarios_aceptados',
        data: {
            id_entrenador: ide
        },
    }).then(function (response) {
        const selectElement = document.getElementById('valor')

        for (let i = 0; i < response.data.length; i++) {


            const option = document.createElement('option');


            option.value = response.data[i].id;

            option.textContent = response.data[i].nombre;


            selectElement.appendChild(option);
        }


        //xd
    }).catch("informacion: F")


}



var xy=0
function c_valoracion() {

    const v_peso = document.getElementById("peso").value;
    const v_altura = document.getElementById("altura").value;

    v_imc = (v_peso / Math.pow(v_altura, 2));//
    document.getElementById("IMC").value = v_imc;//:D

    //realizamos la prueba en insmoniac ?
    axios({
        method: 'POST',
        url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/valoracion_user',
        data: {
            peso: v_peso,
            altura: v_altura,
            imc: v_imc
        },
    }).then(function (response) {//then 1 
        xy=response.data[0].Informacion
        console.log('222', xy) 
        const vid_usuario = document.getElementById("valor").value;
        axios({

            method: 'PUT',
            url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/valoracion_user',//
            data: {
                id: vid_usuario,
                num_valoracion: vid_usuario,

            },
        }).then(function (response) {//then 2
            
            actualizar2()
        }).catch(function (error) {
            console.error("Error en la petición PUT:", error);
        });
    }).catch(function (error) {
        console.error("Error en la petición POST:", error);
    });
}
//id_usuario=request.JSON['id]<---- error, en la api, ehhh

function actualizar2() {
    const vid_usuario = document.getElementById("valor").value;
    console.log(vid_usuario)
    console.log(xy)

    axios({
        method: 'PUT',
        url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/valoracion_user2',
        data: {
            id: vid_usuario,
            num_valoracion:xy,
        },
    }).then(function (response) {
        alert("Valoracion asignada correctamente s")
    }).catch("")
}