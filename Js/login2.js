
function iniciar(comprobar, id) {
  console.log('Estás en la página de administrador');
  if (document.title === 'Inicio de sesion') {
    
    console.log('Estás en la página de administrador2');
    let usuario = document.getElementById("correo").value;
    let pas = document.getElementById("password").value;
    console.log(id)
    //let encontrado = (usuario)
    let encontrado={usuario, pas, id, comprobar}//

    miStorage = window.localStorage;
    //No, ya veras,ven para abajo
    if (encontrado) {

      if (active = true) {
        window.localStorage.clear('usuario');
      }

      alert('Sesión Exitosa', ". Bienvenido ", usuario);

      miStorage.setItem('usuario', JSON.stringify(encontrado));//set colocla, get obtener
      //let usuarios1 = miStorage.getItem("usuario");
      let usuarios = JSON.parse(miStorage.getItem('usuario'));


      if (comprobar == 'User') {
        window.location.href = "../html/user/user.html";
        var active = true;
      } else if (comprobar == 'Admin') {
        window.location.href = "../html/administrador/Admin.html";
        var active = true
      } else if (comprobar == 'Entrenador') {
        window.location.href = "../html/entrenador/trainer.html";
        var active = true;

      } else {
        // El usuario no tiene permisos suficientes
        alert("Usuario no se encuentra registrado")
      }


    } else {
      alert("Usuario o contraseña incorrecto")
      document.getElementById("respuesta").innerHTML = 'Usuario o contraseña incorrecto';
    }





    //Si intenta entrar desde un link y no inicio sesion        
  }
  else {
   const Admin = ['Administrador', 'Buscar usuario', 'Enviar reporte', 'Registrar Entrenador', 'Ver estado', 'Registro usuario', 'Generar reporte'];
    Admin.map(x => {
      if (document.title === x) {
      
        let usuarios = JSON.parse(window.localStorage.getItem('usuario'));
        console.log(usuarios.comprobar) 

        if (!usuarios || usuarios.comprobar=="User" || usuarios.comprobar=="Entrenador") {
          alert("Pagina no disponible, por favor iniciar sesion")
          window.location.href = "../html/";

        }
      }

    });


    const User = ['usuario', 'Valoracion', 'Ubicaciones', 'User'];
    User.map(y => {
      if (document.title === y) {
        let usuarios = JSON.parse(window.localStorage.getItem('usuario'));

        if (!usuarios || usuarios.comprobar=="Admin" || usuarios.comprobar=="Entrenador") {
          alert("Pagina no disponible, por favor iniciar sesion")
          window.location.href = "../html/";

        }
      }

    });



    const Entrenador = ['Entrenador'];
    Entrenador.map(y => {
      if (document.title === y) {
        let usuarios = JSON.parse(window.localStorage.getItem('usuario'));
       
        if (!usuarios || usuarios.comprobar=="Admin" || usuarios.comprobar=="User") {
          alert ("Pagina no disponible, por favor iniciar sesion")
          window.location.href = "../html/Login";
        }
      }

    });


  }

}


function cerrar() {
  window.localStorage.clear('usuario');
  window.location.href = "../html/Login.html";

}

function login() {
  const vcorreo = document.getElementById("correo").value;
  const vpasswpord = document.getElementById("password").value;
  const valido = false;
  axios({

    method: 'POST',
    url: 'http://127.0.0.1:3550/compare',
    data: {
      correo: vcorreo,
      password: vpasswpord,
      valido: true
    }

  }).then(function (response) {
    console.log(response.data.length)
    console.log(response);

    
    if (response.data.length > 0) {
      var comprobar = response.data[0].Modulo//llamar la id de

      var id = response.data[0].id//
    
      iniciar(comprobar, id)
    }
    else {
      console.log("Usuario no se encuentra registrado")
      alert("Usuario no se encuentra registrado")
      document.getElementById("respuesta").innerHTML = 'El usuario no se encuentra registrado';
    }

    /*    
    for () {
        }
*/
  }).catch(err => console.log('Error: ', err))

}
