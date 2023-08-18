function planes_registrados_anterior() {
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3550/mostrar_planes',

    }).then(function (response) {//es aca si

        const selectElement= document.getElementById('plan')
       
        for (let i = 0; i < response.data.length; i++) {

           
            const option = document.createElement('option');

           
            option.value = response.data[i].id;

         
            option.textContent = response.data[i].nombre;

    
            selectElement.appendChild(option);
        }





    }).catch("Error")

}