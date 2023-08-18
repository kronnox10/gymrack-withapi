document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById("formulario");


    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const vnombres = document.getElementById("nombre").value;
        const vdireccion = document.getElementById("direccion").value;
        const vcorreo = document.getElementById("correo").value;
        const vtelefono = document.getElementById("telefono").value;
        const vcontraseña = document.getElementById("password").value;
        const vseguridad = document.getElementById("repetir").value;
        const vedad = document.getElementById("edad").value;

        // oninvalid="this.setCustomValidity('wtf esa fecha no puedo ser, la edad minima es de 18 años ')"
        //2005-08-04


        console.log(vedad)
        const vespecialdad = document.getElementById("trato").value;
        const vgenero = document.getElementById('genero').value;
        const estado = 'activo'
        if (vcontraseña == vseguridad) {
            axios({
                method: 'POST',
                url: 'http://10.0.0.5:6122/add_entrenador',
                data: {
                    name: vnombres,
                    direccion: vdireccion,
                    correo: vcorreo,
                    Fecha_de_nacimiento: vedad,
                    password: vcontraseña,
                    telefono: vtelefono,
                    especialidad: vespecialdad,
                    genero: vgenero,
                    estado: estado
                },
            }).then(function (response) {
                if (response.data[0].Informacion == "Ya_existe") {
                    alert("Ya existe una cuenta con ese nombre de usuario")
                } else {
                    alert("Entrenador agregado ")
                    document.getElementById("nombre").value = "";
                    document.getElementById("direccion").value = "";
                    document.getElementById("correo").value = "";
                    document.getElementById("telefono").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("repetir").value = "";
                    document.getElementById("edad").value = "";
                    document.getElementById("trato").value = "";
                    document.getElementById("genero").value = "";
                }
            }).catch(err => console.log('Error: ', err))
        } else {
            alert("Las contraseñas no coinciden...")
        }
    });
});
var s = ""
var d = ""
function fechaNacimiento() {//Que es esto?--> hacer que el max de tipo date tome el valor de aca
    fecha = new Date();
    console.log(fecha.getFullYear())
    console.log(fecha.getMonth())
    console.log(fecha.getDate())


    //Obtengo el año, dia y mes 
    year = fecha.getFullYear()
    year2 = fecha.getFullYear()
    mes = fecha.getMonth()
    dia = fecha.getDate()
    year = year - 18//-->Esto determinara en que año la persona ya tendra 18 años
    year2 = year2 - 87

    //te sale que la fecha tiene que ser hasta 2005
    s += year + "-0" + mes + "-" + dia// Puedes quitarle el 0 y probarlo registrando una fecha
    console.log(s)
    //

    d += year2 + "-0" + mes + "-" + dia
    console.log(d)


    console.log(year)
    // removeAttribute
    //  v_editar.setAttribute("class", "fade");
    //oninvalid="this.setCustomValidity('La fecha debe ser anterior a 2023-06-12.')"
    const year_html = document.getElementById('edad');//le puse html porque estaba en el html XD
    year_html.setAttribute("max", s);

    const year_html2 = document.getElementById('edad');
    year_html2.setAttribute("min", d);

    //llega aca a estadisiticas un momeento, para decirte la idea de ayer
    console.log(year_html)
}