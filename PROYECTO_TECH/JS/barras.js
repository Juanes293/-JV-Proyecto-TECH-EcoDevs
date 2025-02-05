const barra = document.getElementById('chartBarras');
const energia = ['Solar', 'Eólica', 'Hidroeléctrica', 'Geotermia', 'Biocombustibles'];
const cantidad = [0.32, 0.06, 58.19, 0, 8.00661];

const colores = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)'
];

const bordes = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)'
];

// Crear datasets separados para cada energía con su propio label
const datasets = energia.map((tipo, index) => ({
    label: tipo, // Cada tipo de energía tiene su propio label
    data: energia.map((_, i) => (i === index ? cantidad[i] : 0)), // Solo muestra su valor
    backgroundColor: colores[index],
    borderColor: bordes[index],
    borderWidth: 1.5,
    hidden: false, // Todas las barras son visibles al inicio
    barPercentage: 5, // Hace las barras más gruesas
    categoryPercentage: 0.5 // Ocupa el máximo espacio disponible
}));

let barraSeleccionada = null; // Variable para rastrear la barra seleccionada

const myChart = new Chart(barra, {
    type: 'bar',
    data: {
        labels: energia,
        datasets: datasets
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} TWh`;
                    }
                }
            },
            legend: {
                display: true,
                onClick: (e, legendItem) => {
                    const index = legendItem.datasetIndex;

                    if (barraSeleccionada === index) {
                        // Si la misma barra ya estaba seleccionada, restaurar todas
                        barraSeleccionada = null;
                        myChart.data.datasets.forEach((dataset) => {
                            dataset.hidden = false; // Mostrar todas
                            dataset.barPercentage = 5; // Mantener las barras gruesas
                            dataset.categoryPercentage = 0.5; // Mantener la categoría al máximo
                        });
                        myChart.options.scales.y.suggestedMax = Math.max(...cantidad) + 5;
                    } else {
                        // Ocultar todas menos la seleccionada
                        barraSeleccionada = index;
                        myChart.data.datasets.forEach((dataset, i) => {
                            dataset.hidden = i !== index;
                            dataset.barPercentage = i === index ? 1 : 0.5; // Hacer más grande la seleccionada
                        });

                        // Ajustar el eje Y a la barra seleccionada
                        myChart.options.scales.y.suggestedMax = cantidad[index] + 5;
                    }

                    myChart.update();
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: Math.max(...cantidad) * 1.2, // Ajusta dinámicamente el límite superior
                ticks: {
                    precision: 3 // Muestra hasta 3 decimales en los valores del eje Y
                }
            }
        }
    }
});