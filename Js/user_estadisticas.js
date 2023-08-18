function grafica_Asistencia_consulta() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id

    axios({
        method: 'POST',
        url: 'http://10.0.0.5:6122/estadisticas_user_asistencia',
        data: {
            id:ide
        }
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

        const uno = response.data[0].Nombre; // Nombre obtenido desde la API
        const dos = response.data[0].Asistencia; // Asistencia obtenida desde la API
        labels.push(uno);
        data.push(dos);




        Chart.defaults.global.legend.display = false;

        var grafica1 = document.getElementById("grafica1").getContext("2d");
        var myChart = new Chart(grafica1, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: '',
                    data: data,
                    backgroundColor: color.slice(0, data.length)

                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: "Total de Asistencia",
                    position: "top",
    
                },
            }
        });








    }).catch(err => console.log('Error: ', err));
}



function grafica_Progreso_peso() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id

    axios({
        method: 'POST',
        url: 'http://10.0.0.5:6122/estadisticas_De_Pogreso_peso',
        data: {
            id:ide
        }
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
        const peso = [];
        const altura=[];
        const IMC=[];


         // Nombre obtenido desde la API
        
        for(let i=0; i<response.data.length; i++){
            labels.push('Progreso '+(i+1))
            peso.push(response.data[i].Peso);

        }

        for(let i=0; i<response.data.length; i++){
          
            altura.push(response.data[i].Altura);

        }

        for(let i=0; i<response.data.length; i++){
           
            IMC.push(response.data[i].IMC);

        }
    
        
        Chart.defaults.global.legend.display = true;



        

        var grafica2 = document.getElementById("grafica2").getContext("2d");
        var myChart = new Chart(grafica2    , {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: 'Peso',
                    data: peso,
                    
                    fill: false,
                    borderColor: 'RED',
                    backgroundColor:'WHITE',
                    tension: 0.1

                },{
                    label: 'Altura',
                    data: altura,
                    
                    fill: false,
                    borderColor: 'BLUE',
                    backgroundColor:'WHITE',
                    tension: 0.1

                },{
                    label: 'IMC',
                    data: IMC,
                    
                    fill: false,
                    borderColor: 'GREEN',
                    backgroundColor:'WHITE',
                    tension: 0.1

                },
            ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: "Progreso de los usuarios",
                    position: "top",
    
                },
            }
        });

    }).catch(err => console.log('Error: ', err));
}


function grafica_Progreso_altur() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id

    axios({
        method: 'POST',
        url: 'http://10.0.0.5:6122/estadisticas_De_Pogreso_peso',
        data: {
            id:ide
        }
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

         // Nombre obtenido desde la API
        
        for(let i=0; i<response.data.length; i++){
            labels.push('Peso '+(i+1))
            data.push(response.data[i].Peso);

        }
    
        
        Chart.defaults.global.legend.display = false;



        

        var grafica2 = document.getElementById("grafica2").getContext("2d");
        var myChart = new Chart(grafica2    , {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: '',
                    data: data,
                    
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1

                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: "Progreso de peso de los usuarios",
                    position: "top",
    
                },
            }
        });








    }).catch(err => console.log('Error: ', err));
}


