function planes_registrados_anterior() {
    axios({
        method: 'GET',
        url: 'https://www.pythonanywhere.com/user/kronnox/files/home/kronnox/App.py/mostrar_planes',

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