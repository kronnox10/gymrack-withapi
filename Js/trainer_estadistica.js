function grafica_Asistencia_consulta() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id

    axios({
        method: 'POST',
        url: 'http://10.0.0.5:6122/user_asistencia_Entrenador',
        data: {
            id: ide
        }
    }).then(function (response) {
        const color = ['rgb(55, 99, 132, 0.5)'];
        a = 0
        while (a < response.data.length) {
            console.log(a)
            color.push('rgb(45, 29, 932, 0.5)')
            color.push('rgb(4, 235, 82, 0.5)')
            color.push('rgb(229, 89, 50, 0.5)')
            a = a + 3

        }
        console.log(color)//si? o si?


        const labels = [];
        const data = [];


        console.log(response.data.length)
        for (let i=0; i<response.data.length; i++){
            labels.push(response.data[i].Nombre);
            data.push(response.data[i].Asistencia);
        }
       




        Chart.defaults.global.legend.display = false;

        var grafica1 = document.getElementById("grafica1").getContext("2d");
        var myChart = new Chart(grafica1, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label:'Numero de Asistencia',
                  
                    data: data,
                    backgroundColor: color.slice(0, data.length)

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
                    fontColor:'black',
                    text: "Asistencia de los usuarios",
                    position: "top",
                    fontSize: 17,
    
                },
            }
        });








    }).catch(err => console.log('Error: ', err));
}
