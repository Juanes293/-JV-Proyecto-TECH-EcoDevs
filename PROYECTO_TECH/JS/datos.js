async function cargarCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

function procesarCSV(csv) {
    const lineas = csv.split("\n");
    const headers = lineas[0].split(",");
    const filas = lineas.slice(1).filter(linea => linea.trim() !== "");

    return {
        headers,
        filas: filas.map(fila => fila.split(","))
    };
}

function generarTabla(datos) {
    const tabla = document.getElementById("tabla");
    const thead = tabla.querySelector("thead");
    const tbody = tabla.querySelector("tbody");

    thead.innerHTML = "";
    tbody.innerHTML = "";

    const trEncabezados = document.createElement("tr");
    datos.headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        trEncabezados.appendChild(th);
    });
    thead.appendChild(trEncabezados);

    // Crear filas de datos
    datos.filas.forEach(fila => {
        const tr = document.createElement("tr");
        fila.forEach(celda => {
            const td = document.createElement("td");
            td.textContent = celda;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

document.getElementById("cargarBtn").addEventListener("click", async function () {
    const csvData = await cargarCSV("./repositorios/07 share-electricity-hydro.csv");
    const datos = procesarCSV(csvData);
    generarTabla(datos);
});