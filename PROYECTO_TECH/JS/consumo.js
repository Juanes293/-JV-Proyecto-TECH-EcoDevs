let hidrica=58.19


const boton = document.getElementById("calcular")

boton.addEventListener("click", ()=>{
    let valor = parseInt(document.getElementById("total").value)
    console.log(valor)

    //Tera Watts
    let valorConsumo = (valor / 1000000000) * 12
    console.log(valorConsumo)
    let porcentaje = (valorConsumo * 100) / hidrica
    console.log(porcentaje)

    const resultado=document.getElementById("resultado")

    resultado.innerHTML = porcentaje.toFixed(6)+"%"+" TWh"
})
