/*
let inform = {}
let tabla2 = document.getElementById("tablaSolicitud");

function revisar_solicitudes() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    console.log(ide)
    console.log("hola")
    axios({
        method: 'POST',
        url: 'http://10.0.0.5:6122/revisarSolicitudes',
        data:{
            id_entrenador: ide
        }
     
    }).then(function (response) {
        console.log("hola2")
        for (let i = 0; i < response.data.length; i++) {
            console.log(tabla2)
            let nuevaFila = tabla2.insertRow(tabla2.lenght);

            cell0 = nuevaFila.insertCell(0);
            cell0.innerHTML = response.data[i].nombre; /// primer elemento

            cell1 = nuevaFila.insertCell(1);
            cell1.innerHTML = response.data[i].estado; /// segundo elemento


        }


    }).catch("Error")

}
*/

var arrow = document.getElementById("arrow");
var x= 0;
var s
var z
var v
var omg
function contenedor() {
    move()
    Mover()
}
function move() {
    x=x+1; 
    arrow.style.left= x+ "px";
    console.log(x)
    console.log(s)
    if(x==s){ 
            
        clearInterval (omg)
   }
}
function Mover() {
    omg =setInterval(move,5)
}//mano YA, pruebalo

function valoracion(){
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    // 
    axios({
        method: "POST",
        url: 'http://10.0.0.5:6122/usuariomove',
        data: {
            id: ide
        }
    }).then(function (response) {// 
        document.getElementById("mas*g").value = response.data[0].peso;
        document.getElementById("alto").value = response.data[0].altura;
        document.getElementById("masas").value = response.data[0].imc;
        v=response.data[0].imc;
        console.log(v)
        if (v < 19) {
            s = 210;
            z="Su indice de masa corporal es mas bajo de lo que deberia, no te desanimes"
        } else if (v >= 19 && v < 25) {
            s = 450;
            z="Su indice de masa corporal es el ideal para sus caracteristicas, enhorabuena"
        } else if (v >= 25 && v <= 30) {
            s = 330;
            z="Su indice de masa corporal es más alto de lo que deberia, no te desanimes"
        } else if (v >= 30 ) {//mmm
            s = 130; 
            z="Tienes obesidad :D, te recomendamos esforzarte mas en aerobicos y cardio"
        } else if (v > 40) {
            s = 20;
            z=",_, porfavor ponte a dieta y has mucho ejercicio, aun tienes tiempo"
        }
        setTimeout(contenedor(),700)
        setTimeout(document.getElementById("valoracion").value=z,1000)
console.log(s)
      
    }).catch(err => console.log('Error: ', err));
     
//400 = s
//300 = a
//200 = b
//110 = c
//20 = d
     //
}