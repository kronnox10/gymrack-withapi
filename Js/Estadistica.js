function grafica_Asistencia_consulta() {

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3550/estadisticas'
    }).then(function (response) {
        const color = ['rgb(255, 99, 132, 0.5)'];
        a = 0
        while (a < response.data.length) {
            console.log(a)
            color.push('rgb(245, 79, 232, 0.5)')
            color.push('rgb(74, 135, 72, 0.5)')
            color.push('rgb(229, 89, 50, 0.5)')
            a = a + 3

        }
        console.log(color)


        const labels = [];
        const data = [];
        for (let i = 0; i < response.data.length; i++) {
            const uno = response.data[i].Nombre; // Nombre
            const dos = response.data[i].Asistencia; // Asistencia



            if ((uno + 1) > 12) {
                if (uno > 12) {
                    labels.push("De " + uno + "PM a " + (uno + 1) + "PM");
                } else {
                    labels.push("De " + uno + "AM a " + (uno + 1) + "PM");
                }

            } else {
                labels.push("De " + uno + "AM a " + (uno + 1) + "AM");

            }

            data.push(dos);
        }
        let b = 0

        for (let i = 0; i < response.data.length; i++) {

            if (b < response.data[i].Asistencia) {
                b = response.data[i].Asistencia;
            }




        }
        console.log("Asistencia mas alta es:", b)

        const NombreAsistenciaAlta = []
        for (let i = 0; i < response.data.length; i++) {

            if (b == response.data[i].Asistencia) {
                //NombreAsistenciaAlta.push(" " + response.data[i].Nombre)


                if ((response.data[i].Nombre + 1) > 12) {
                    if (response.data[i].Nombre > 12) {
                        NombreAsistenciaAlta.push("De " + parseInt(response.data[i].Nombre) + "PM a " + ((parseInt(response.data[i].Nombre) + parseInt(1))) + "PM");
                    } else {
                        NombreAsistenciaAlta.push("De " + parseInt(response.data[i].Nombre) + "AM a " + ((parseInt(response.data[i].Nombre) + parseInt(1))) + "PM");
                    }

                } else {
                    NombreAsistenciaAlta.push("De " + parseInt(response.data[i].Nombre) + "AM a " + ((parseInt(response.data[i].Nombre) + parseInt(1))) + "AM");

                }




            }



        }
        console.log("Asistencia mas alta es:", NombreAsistenciaAlta)
        document.getElementById('NombrePersona').innerText = NombreAsistenciaAlta
        document.getElementById('TotalAsistencia').innerText = b


        grafica_Asistencia_mostrar(labels, data, color);
    }).catch(err => console.log('Error: ', err));
}

function grafica_Asistencia_mostrar(labels, data, color) {
    var grafica1 = document.getElementById("grafica1").getContext("2d");
    var myChart = new Chart(grafica1, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{//
                label: 'Asistencia',
                data: data,
                backgroundColor: color.slice(0, data.length),

            }]
        },
        options: {
            legend: {
                display: false
            },
            plugins: {
                labels: false, // Desactivar los porcentajes en la gráfica circular
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    }
                }]
            },
            title: {
                display: true,
                text: "Frecuencia de horas en un mes de la asistencia de los usuarios",
                position: "top",

            },
        }
    });

}

//---------------------------------------Generos--------------------------------------------------//
function estadisticas2() {

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3550/estadisticas/genero'
    }).then(function (response) {
        const dataHombre = [];
        const dataMujer = [];//hay van los  valores del result, hombre mujer? si es Hombres 
        const cantHombre = response.data[0].Hombres; // Cantidad de hombre obtenido desde la API
        const cantMujer = response.data[1].Mujeres; // Cantidad de mujer obtenida desde la API
        //Operacion para sacar porcentaje:
        let cant = cantHombre + cantMujer
        console.log(cantHombre)
        console.log(cantMujer)
        let porcentajehombre = (100 / cant) * cantHombre
        let porcentajemujer = (100 / cant) * cantMujer
        console.log(porcentajemujer)

        porcentajehombre = Math.round(porcentajehombre);
        porcentajemujer = Math.round(porcentajemujer);


        dataHombre.push(porcentajehombre);

        dataMujer.push(porcentajemujer);//

        document.getElementById('porcHombre').innerText = porcentajehombre;
        document.getElementById('cantHombre').innerText = cantHombre;

        document.getElementById('porcMujer').innerText = porcentajemujer;
        document.getElementById('cantMujer').innerText = cantMujer;


        grafica_generos(cantHombre, cantMujer);
    }).catch(err => console.log('Error: ', err));
} console.log("si")



function grafica_generos(cantHombre, cantMujer) {
    var grafica2 = document.getElementById("grafica2").getContext("2d");
    var myChart = new Chart(grafica2, {
        type: "pie",
        data: {
            labels: ['Hombres', 'Mujeres'],
            datasets: [{
                label: 'Genero',
                data: [cantHombre, cantMujer],
                backgroundColor: [
                    'rgb(66, 134, 244,0.5)',
                    'rgb(74, 135, 72,0.5)',
                    'rgb(229, 89, 50,0.5)'
                ]
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: "right",
                },
            },
            title: {
                display: true,
                text: "Genero ",
                position: "top",
            },

        },
        //

    });

}


//---------------------------------------Estadistica de asistencia por mes------------------------------------------------------//

function estadisticas_por_mes() {
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3550/estadisticas_por_mes'
    }).then(function (response) {


        const DiaSemana = [];
        const Asistencia = [];//hay van los  valores del result, hombre mujer? si es Hombres 
        for (let i = 0; i < response.data.length; i++) {
            DiaSemana.push(response.data[i].Dia_semana); // 
            Asistencia.push(response.data[i].Asistencia); // 
        }
        console.log("Dia semana:", DiaSemana)
        console.log("Asistencia", Asistencia)

        //-------------------------------Calcular asistencia alta---------------------------------------------------
        let y = 0
        for (let i = 0; i < response.data.length; i++) {
            console.log("d=", response.data[i].Asistencia)

            if (y < response.data[i].Asistencia) {
                y = response.data[i].Asistencia;
            }

        }
        console.log("y=", y)

        const DiaAsistenciaAlta = []
        for (let i = 0; i < response.data.length; i++) {

            if (y == response.data[i].Asistencia) {
                DiaAsistenciaAlta.push(" " + response.data[i].Dia_semana)


            }

        }
        console.log("el dia con la asistencia mas alta es:", DiaAsistenciaAlta)


        //-------------------------------Calcular asistencia mas baja---------------------------------------------------

        for (let i = 0; i < response.data.length; i++) {
            console.log("d=", response.data[i].Asistencia)

            if (y > response.data[i].Asistencia) {
                y = response.data[i].Asistencia;
            }

        }
        console.log("j=")

        const DiaAsistenciaBaja = []
        for (let i = 0; i < response.data.length; i++) {

            if (y == response.data[i].Asistencia) {
                DiaAsistenciaBaja.push(" " + response.data[i].Dia_semana)


            }

        }
        console.log("el dia con la asistencia mas baja es:", DiaAsistenciaBaja)



        document.getElementById('MasAsistencia').innerText = DiaAsistenciaAlta;
        document.getElementById('MenosAsistencia').innerText = DiaAsistenciaBaja;

        //-------------------------------------------------------Asistencia en un mes----------------------------------------------------------------------------//

        var grafica3 = document.getElementById("grafica3").getContext("2d");
        var myChart = new Chart(grafica3, {
            type: "bar",
            data: {
                labels: DiaSemana,
                datasets: [{
                    label: 'Asistencia',
                    data: Asistencia, // 
                    backgroundColor: [
                        'rgb(66, 134, 244,0.5)',
                        'rgb(74, 135, 72,0.5)',
                        'rgb(229, 89, 50,0.5)',
                        'rgb(99, 243, 21,0.5)',
                        'rgb(21, 21, 21,0.5)',
                        'rgb(73, 53, 71,0.5)',
                        'rgb(43, 93, 71,0.5)',
                    ]
                }]
            },
            options: {
                legend: {
                    display: false
                },
                plugins: {
                    labels: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            precision: 0
                        }
                    }]
                }, title: {
                    display: true,
                    text: "Asistencia de los usuarios en un mes",
                    position: "top",

                },
            }
            //

        });




    }).catch(err => console.log('Error: ', err));
} console.log("si")



//---------------------------------------Estadistica de planes-----------------------------------------------------------------//
function estadisticas_planes() {
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3550/estadisticas_De_Planes'//
    }).then(function (response) {


        const vCantidad = [];
        const vPlanes = [];//
        for (let i = 0; i < response.data.length; i++) {
            vCantidad.push(response.data[i].Cantidad);
            vPlanes.push(response.data[i].Planes);
        }
        console.log("cantidad del plan", vCantidad)
        console.log("Nombre del Plan", vPlanes)

        let j = 0
        for (let i = 0; i < response.data.length; i++) {
            if (j < response.data[i].Cantidad) {
                j = response.data[i].Cantidad;
            }
        }

        const vectorPlanes = []
        for (let i = 0; i < response.data.length; i++) {
            if (j == response.data[i].Cantidad) {
                vectorPlanes.push(" " + response.data[i].Planes)

            }

        }

        document.getElementById('MAXPLAN').innerText = vectorPlanes;
        document.getElementById('MAXCANTPLAN').innerText = j

        var grafica4 = document.getElementById("grafica4").getContext("2d");
        var myChart = new Chart(grafica4, {
            type: "polarArea",
            data: {
                labels: vPlanes,
                datasets: [{
                    label: vPlanes,
                    data: vCantidad, // 
                    fill: true,
                    backgroundColor: ['rgba(85, 226, 251, 0.3)',//diamante
                        'rgba(238, 180, 2, 0.3)',//Gold
                        'rgba(145,145,145,0.3)',//medium
                        'rgba(255,255,255,0.4)'],//Plus
                    borderColor: 'rgb(0, 0, 0, 0.3)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }]
            },
            options: {
                legend: {

                },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }, title: {
                    display: true,
                    text: "Planes mas comprado por los usuarios",
                    position: "top",

                },
            }
        });

    }).catch(err => console.log('Error: ', err));
} console.log("si")

//terminos y condiciones ? SI, yo te ayudo aca y hago lo otro, OK, VE CREANDO EL AXIOS ACA XD oka
//----------------------------------------< Enviar Informe entrenadores y sus usarios>----------------------------------------------------

const { jsPDF } = window.jspdf;
function pdf_estadisticas_Entrenador_y_sus_Usuarios() {


    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3550/estadisticas_Entrenador_y_sus_Usuarios',
        //
    }).then(function (response) {
        var body = [];
        //

        for (let i = 0; i < response.data.length; i++) {
            body.push([response.data[i].Nombre, response.data[i].Cantidad]);
        }
        let y = 0
        let y2 = []
        for (let i = 0; i < response.data.length; i++) {
            if (y < response.data[i].Cantidad) {
                y = response.data[i].Cantidad;
            }


        }

        y2.push("\nDe la tabla anterior podemos observar que el/los entrenador/es con mas usuarios asignados son:\n")
        for (let i = 0; i < response.data.length; i++) {
            if (y == response.data[i].Cantidad) {
                y2.push("\n", "-" + response.data[i].Nombre + " con la cantidad de " + response.data[i].Cantidad)
            }
        }


        var doc = new jsPDF();
        doc.setFontSize(35);
        doc.setFont("helvetica");
        doc.text(76, 20, "Gymrack");
        const docWidth = doc.internal.pageSize.getWidth();
        doc.line(0, 30, docWidth, 30);
        doc.setFontSize(18);



        doc.text(12, 40, "Informacion de los entrenadores con mas usuarios para entrenar");
        doc.setFontSize(12);
        doc.text(15, 50, `A continuacion estan los entrenadores que poseen mas usuarios para entrenar.
Es importante conocer la disponibilidad de los entrenadores, es por eso que la tabla esta diseñada
con 2 columnas, el nombre del entrenador y la cantidad de usuarios que entrena`);

        var columns = ["Nombre", "Cantidad de usuario"];
        //var data = [[body],[body2]];

        doc.autoTable(columns, body, {
            startX: 15,
            startY: 70,
        });
        doc.text(12, 110, `Nota: Si tiene mas cantidad de usuarios tiene menos disponibilidad y no podra aceptar a otro usuario`)

        doc.setFontSize(12);
        doc.setFont("helvetica")
        doc.text(12, 120, y2)

        //doc.setFont("bold");
        //doc.text(16, 55, 'PDF de prueba');//las dimensiones de la hoja

        // doc.addPage();
        //doc.text(10, 10, 'bienvenido a gymrack');//las dimensiones de la hoja

        doc.save('entrenadores_usuarios.pdf');


    }).catch()

}


//----------------------------------------< PDF sobre entrenador >----------------------------------------------------
function pdf_entrenador() {//
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();//

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3550/getlistaEntrenador',

    }).then(function (response) {



        //header=[]
        var body = [];
        //var body2=[];

        for (let i = 0; i < response.data.length; i++) {
            body.push([response.data[i].id, response.data[i].nombre, response.data[i].correo, response.data[i].Especialidad, response.data[i].Valoracion]);
        }
        var pdf = new jsPDF();
        pdf.setFontSize(35);
        pdf.setFont("helvetica");
        pdf.text(76, 20, "Gymrack");
        const docWidth = pdf.internal.pageSize.getWidth();
        pdf.line(0, 25, docWidth, 25);
        pdf.setFont("bold");//no es por nada, pero no deberia ser pdf en vez de doc?
        pdf.setFontSize(15);
        pdf.text(65, 32, "Informacion de entrenadores");
        pdf.setFontSize(12);
        pdf.text(15, 40, `El siguiente reporte es sobre la informacion de los entrenadores, para revisar la valoracion que el
entrenador tiene, para evaluar que tan eficiente es el entrenador.
Nota: Se encuentra otros datos como su nombre y correo, ademas la valoracion
es realizada por los usuarios que entrena.`);

        var columns = ["Id", "Nombre", "Correo", "Especialidad", "Valoracion"];
        //var data = [[body],[body2]];

        pdf.autoTable(columns, body,
            { margin: { top: 70 } }
        );


        pdf.save('listentrenador.pdf');


    }).catch(err => console.log('Error: ', err))
}


//------------------------------------------< PDF Generos >--------------------------------------------------
function pdf_genero() {

    const { jsPDF } = window.jspdf;

    var doc = new jsPDF();//


    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3550/estadisticas/genero',

    }).then(function (response) {
        //header=[]

        var body = [];

        var body2 = [];
        //var body2=[];

        
            body.push([response.data[0].Hombres]);
            body2.push([response.data[1].Mujeres]);
        

        var pdf = new jsPDF();

        pdf.setFontSize(35);

        pdf.setFont("helvetica");

        pdf.text(76, 20, "Gymrack");

        const docWidth = pdf.internal.pageSize.getWidth();

        pdf.line(0, 25, docWidth, 25);

        pdf.setFont("bold");//no es por nada, pero no deberia ser pdf en vez de doc?

        pdf.setFontSize(15);

        pdf.text(65, 32, "Informacion de generos");

        pdf.setFontSize(12);

        pdf.text(15, 40, `El siguiente reporte aborda la informacion del genero de los usuarios y entrenadores del gimnasio, podemos 

observar de los usuarios y entrenadores registrados cual genero predomina`);

        let y = 0

        let x = 0

        var m1 = ""

        var m2 = ""



        if (response.data[0].Hombres < response.data[0].Mujeres) {

            y = response.data[1].Mujeres;

            x = response.data[0].Hombres;

            m1 += "mujeres";

            m2 += "hombre";



        } else {
            y = response.data[0].Hombres;
            x = response.data[1].Mujeres;
            m1 += "hombre";
            m2 += "mujeres";
        }

        const yx = []
        yx.push("Podemos obsercar que hay mas " + m1 + " que " + m2 + " ya que la cantidad de " + m1 + " es de " + y + " y la cantidad de","\nmujeres es " + x)
        var columns = ["Hombre"];
        var columns2 = ["Mujeres"];
        //var data = [[body],[body2]];
        pdf.autoTable(columns, body, {

            startX: 1,

            startY: 70,

        });

        pdf.autoTable(columns2, body2, {
            startX: 20,
            startY: 90,

        });
        pdf.text(15, 120, yx)

        pdf.save('Genero.pdf');

    }).catch(err => console.log('Error: ', err))

}

//----------------------------------------<PDF sobre asistencia>----------------------------------------------------
function pdf_asistencia() {//

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3550/estadisticas_por_mes',

    }).then(function (response) {



        //header=[]
        var body = [];
        //var body2=[];

        for (let i = 0; i < response.data.length; i++) {
            body.push([response.data[i].Dia_semana, response.data[i].Asistencia]);
        }
        var pdf = new jsPDF();
        pdf.setFontSize(35);
        pdf.setFont("helvetica");
        pdf.text(76, 20, "Gymrack");
        const docWidth = pdf.internal.pageSize.getWidth();
        pdf.line(0, 30, docWidth, 30);
        pdf.setFontSize(14);
        pdf.setFont("bold");//
        pdf.setFontSize(20);
        pdf.text(32, 40, "Informacion sobre la asistencia de los usuarios");
        pdf.setFontSize(12);
        pdf.text(10, 50, `En la tabla a continuacion, podemos ver los dias de la semana, y el total de asistencia en un mes,
entre mayor sea el numero total de asistencia, signfica que una mayor cantidad de los usuarios suelen
asistir en ese dia
 `)

        var columns = ["Dias", "Total de asistencias"];
        //var data = [[body],[body2]];

        pdf.autoTable(columns, body,
            { margin: { top: 70 } },
        );



        axios({
            method: 'GET',
            url: 'http://127.0.0.1:3550/estadisticas',
        }).then(function (response) {
            var body2 = [];
            //var body2=[];

            for (let i = 0; i < response.data.length; i++) {
                body2.push([response.data[i].Nombre + "HRS", response.data[i].Asistencia]);
            }


            pdf.setFontSize(12);
            pdf.text(10, 150, `En la tabla siguiente, podemos ver las diferentes horas en un dia y el total de asistencia en un mes, en las 
diferentes horas del dia, entre mayor sea el numero total de asistencia, signfica que la frecuencia en el que los
usuarios asisten es en esa determinada hora
     `)


            var columns2 = ["Hora(AM-PM)", "Total de asistencias"];
            //var data = [[body],[body2]];


            pdf.autoTable(columns2, body2, {
                startX: 10,
                startY: 170,
            });


            pdf.save('Reporte_de_asitencia.pdf');

        }).catch("")



    }).catch(err => console.log('Error: ', err))
}







function cosas() {
    mostrar()
    estadisticas2()

}

function ocultar() {
    document.getElementById("no").style.display = "none";
}
function mostrar() {
    document.getElementById("si").style.display = "flex";
}

//https://artskydj.github.io/jsPDF/docs/jsPDF.html