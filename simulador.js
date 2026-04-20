function calcular() {
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    if (isNaN(ingresos)) ingresos = 0;
    if (isNaN(egresos)) egresos = 0;

    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").innerText = disponible;

    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").innerText = capacidad;

    let monto = parseInt(document.getElementById("txtMonto").value);
    let plazo = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseInt(document.getElementById("txtTasaInteres").value);

    if (isNaN(monto)) monto = 0;
    if (isNaN(plazo)) plazo = 0;
    if (isNaN(tasa)) tasa = 0;

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").innerText = interes;

    let total = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").innerText = total;

    let cuota = calcularCuotaMensual(total, plazo);
    document.getElementById("spnCuotaMensual").innerText = cuota.toFixed(2);

    let aprobado = aprobarCredito(capacidad, cuota);

    if (aprobado) {
        document.getElementById("spnEstadoCredito").innerText = "CRÉDITO APROBADO";
    } else {
        document.getElementById("spnEstadoCredito").innerText = "CRÉDITO RECHAZADO";
    }
}




function calcular1(){
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    if (isNaN(ingresos)) ingresos = 0;
    if (isNaN(egresos)) egresos = 0;

    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").innerText = disponible;

    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").innerText = capacidad
}

function reiniciar1() {
    // Limpiar inputs
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
}

function reiniciar() {
    // Limpiar inputs
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // Limpiar resultados
    document.getElementById("spnDisponible").innerText = "";
    document.getElementById("spnCapacidadPago").innerText = "";
    document.getElementById("spnInteresPagar").innerText = "";
    document.getElementById("spnTotalPrestamo").innerText = "";
    document.getElementById("spnCuotaMensual").innerText = "";

    // Reset estado
    document.getElementById("spnEstadoCredito").innerText = "ANALIZANDO...";
}