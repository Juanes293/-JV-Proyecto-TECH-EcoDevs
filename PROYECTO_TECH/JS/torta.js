const torta = document.getElementById('chartTorta');

// Datos para el gráfico de torta
const energias2 = ['Solar', 'Eólica', 'Hidroeléctrica', 'Otras energías'];
const porcentaje = [0.39550117, 0.07415646, 71.91941, 73.649734];

// Colores para cada sección del gráfico
const colores2 = [
    'rgba(255, 99, 132, 0.5)', // Solar
    'rgba(54, 162, 235, 0.5)', // Eólica
    'rgba(75, 192, 192, 0.5)', // Hidroeléctrica
    'rgba(153, 102, 255, 0.5)' // Otras energías
];

// Bordes de las secciones
const bordes2 = [
    'rgba(255, 99, 132, 1)', 
    'rgba(54, 162, 235, 1)', 
    'rgba(75, 192, 192, 1)', 
    'rgba(153, 102, 255, 1)'
];

// Configuración del gráfico de torta
const data = {
    labels: energias2,
    datasets: [{
        data: porcentaje,
        backgroundColor: colores,
        borderColor: bordes,
        borderWidth: 1
    }]
};

// Opciones para añadir hover y tooltips
const options = {
    responsive: true,
    plugins: {
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    return `${tooltipItem.label}: ${(tooltipItem.raw).toFixed(2)}%`;
                }
            }
        }
    },
    interaction: {
        mode: 'nearest',
        axis: 'xy',
        intersect: false
    }
};

// Crear el gráfico
const chartTorta = new Chart(torta, {
    type: 'pie', // Tipo de gráfico
    data: data,
    options: options
});
