let inform = {}
let tabla = document.getElementById("tablacontacs");
//y la funcion?
var p = 0
var i = 0
var comprobar = false
var imagen =[]

function siguiente() {

}




function planes_registrados_anterior() {
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:6122/mostrar_planes',

    }).then(function (response) {
       
       

            if (p > 0) {//-------- si p es mayor a 0 significa que ya le dieron siguiente y quieren devolverse
                p = p - 1
                document.getElementById('Nombre').value = response.data[p].nombre;

                document.getElementById('precio').value = response.data[p].precio;

                document.getElementById('descripcion').value = response.data[p].descripcion;
                let  a="";
                a+="../"+response.data[p].imagen;

                document.getElementById('imagen').src = a;

                console.log(p)
            }
       

    }).catch("Error")

}


function planes_registrados() {

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:6122/mostrar_planes',

    }).then(function (response) {



        if (comprobar==false) {//--------Aqui solo entra por primera vez con el onload
            document.getElementById('Nombre').value = response.data[i].nombre;
            document.getElementById('precio').value = response.data[i].precio;
            document.getElementById('descripcion').value = response.data[i].descripcion;
            let  a="";
            a+="../"+response.data[i].imagen;

            document.getElementById('imagen').src = a;
            comprobar=true//-------La variable Comprobar,  ahora es true, eso significa que no volvera a entrar a este condicional hasta que recarges la pagina. Ahora entrara a false
            console.log(comprobar)
            
                
        }else{//espera mientra busco el comando, esta por algun lado 
    console.log(response.data.length)
            while(p+1<response.data.length){//--------Mientras p+1(osea p=1), sea menor a la cantidad de elementos que tiene el arreglo o lista, se ejecutara lo de adentro
                p = p + 1 //--------P ahora es 1, ya que para entrar al sino, se necesita que le de siguiente

            document.getElementById('Nombre').value= response.data[p].nombre;//----Hace que el elemento con la id nombre tome el valor que tiene el arreglo en esa posicion

            document.getElementById('precio').value = response.data[p].precio;
    
            document.getElementById('descripcion').value = response.data[p].descripcion;

            let  a="";
            a+="../"+response.data[p].imagen;

            document.getElementById('imagen').src = a;
          
            console.log(p)


            break
        }
        }
        
        

    }).catch("Error")
}

var nameplan=""
function editar() {
    nameplan=document.getElementById('Nombre').value;
    const v_edit_planname = document.getElementById('Nombre');
    v_edit_planname.removeAttribute('readonly');
    v_edit_planname.focus();
    //El focus solo se le pone a uno no a todos, oka 
    const v_edit_decripcion = document.getElementById('descripcion');
    v_edit_decripcion.removeAttribute('readonly');
   
    
    const v_edit_precio = document.getElementById('precio');
    v_edit_precio.removeAttribute('readonly');
   
    
}

function guardar() {
    console.log(nameplan)
    let vnombre= document.getElementById('Nombre').value;
    let vdescripcion= document.getElementById('descripcion').value;
    let vprecio= document.getElementById('precio').value;

    const no_edit_nombre = document.getElementById('Nombre');
    no_edit_nombre.setAttribute("readonly", "");

    const no_edit_descripcion = document.getElementById('descripcion');
    no_edit_descripcion.setAttribute("readonly", "");
    
    const no_edit_precio = document.getElementById('precio');
    no_edit_precio.setAttribute("readonly", "");

    axios({
        method: 'PUT',
        url: 'http://127.0.0.1:6122//update/planes',
        data:{
            nombre:vnombre,
            descripcion: vdescripcion,
            precio: vprecio,
            nameplan:nameplan
        }
    })
    .then(function (response) {
        alert("Actualizado")
        
    })
}




var p2 = 0
var i2 = 0
var comprobar2 = false
var imagen2 =[]





function planes_registrados_anterior_user() {
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:6122/mostrar_planes',

    }).then(function (response) {
       
       

            if (p2 > 0) {//-------- si p es mayor a 0 significa que ya le dieron siguiente y quieren devolverse
                p2 = p2 - 1
                document.getElementById('Nombre').value = response.data[p2].nombre;

                document.getElementById('precio').value = response.data[p2].precio;

                document.getElementById('descripcion').value = response.data[p2].descripcion;

                document.getElementById('imagen').src =response.data[p2].imagen;

                console.log(p)
            }
       

    }).catch("Error")

}


function planes_registrados_user() {

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:6122/mostrar_planes',

    }).then(function (response) {



        if (comprobar==false) {//--------Aqui solo entra por primera vez con el onload
            document.getElementById('Nombre').value = response.data[i2].nombre;
            document.getElementById('precio').value = response.data[i2].precio;
            document.getElementById('descripcion').value = response.data[i2].descripcion;
           console.log("s")
           //console.log(a)
            document.getElementById('imagen').src =response.data[i2].imagen;
            comprobar=true//-------La variable Comprobar,  ahora es true, eso significa que no volvera a entrar a este condicional hasta que recarges la pagina. Ahora entrara a false
            console.log(comprobar)
            
                
        }else{//espera mientra busco el comando, esta por algun lado 
    console.log(response.data.length)
            while(p+1<response.data.length){//--------Mientras p+1(osea p=1), sea menor a la cantidad de elementos que tiene el arreglo o lista, se ejecutara lo de adentro
                p2 = p2 + 1 //--------P ahora es 1, ya que para entrar al sino, se necesita que le de siguiente

            document.getElementById('Nombre').value= response.data[p2].nombre;//----Hace que el elemento con la id nombre tome el valor que tiene el arreglo en esa posicion

            document.getElementById('precio').value = response.data[p2].precio;
    
            document.getElementById('descripcion').value = response.data[p2].descripcion;

            document.getElementById('imagen').src =response.data[p2].imagen;
          
            console.log(p)


            break
        }
        }
        
        

    }).catch("Error")
}

