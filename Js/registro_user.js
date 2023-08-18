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
        const vplan = document.getElementById("plan").value;
        const estado = 'activo'
        if (seguridad==vcontraseña){
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
                    id_planes: vplan,
                    estado: estado,
                    genero: vgenero,
                 
    
                },
            }).then(function (response) {
                if (response.data[0].Informacion == "Ya_existe") {
                    alert("Ya existe una cuenta con ese nombre de usuario")
                } else {
                    alert("usuario agregado ")
                    document.getElementById("nombre").value = "";
                    document.getElementById("direccion").value = "";
                    document.getElementById("correo").value = "";
                    document.getElementById("telefono").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("repetir").value = "";
                    document.getElementById("genero").value = "";
                }
            }).catch(err => console.log('Error: ', err)) 
        }else{
            alert("Las contraseñas no coinciden")
        }


    });
});

