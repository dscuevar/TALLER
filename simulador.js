function calcular() {
    // Leer valores
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let arriendo = parseFloat(document.getElementById("txtArriendo").value);
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value);
    let varios = parseFloat(document.getElementById("txtVarios").value);
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseFloat(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);
    let egresos = arriendo + alimentacion + varios

    // VALIDAR
    if (!validarDatos(ingresos, egresos, monto, plazo, tasa)) {
        return;
    }

    // Calcular disponible
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").innerText = disponible;

    // Capacidad
    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").innerText = capacidad;

    // Interés
    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").innerText = interes;

    // Total
    let total = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").innerText = total;

    // Cuota
    let cuota = calcularCuotaMensual(total, plazo);
    document.getElementById("spnCuotaMensual").innerText = cuota.toFixed(2);

    // Aprobación
    let aprobado = aprobarCredito(capacidad, cuota);

    document.getElementById("spnEstadoCredito").innerText =
        aprobado ? "CRÉDITO APROBADO" : "CRÉDITO RECHAZADO";
}




function calcular1(){
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let arriendo = parseFloat(document.getElementById("txtArriendo").value);
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value);
    let varios = parseFloat(document.getElementById("txtVarios").value);

    let egresos = arriendo + alimentacion + varios

    if (isNaN(ingresos)) ingresos = 0;
    if (isNaN(egresos)) egresos = 0;

    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").innerText = disponible;

    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").innerText = capacidad

    resultado1=document.getElementById('txtEgresos');
    resultado1.innerHTML= "Egresos: "+egresos

}

function reiniciar1() {
    // Limpiar inputs
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
}

function reiniciar() {
    // Limpiar inputs
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.value = "");

    // Limpiar mensajes de error y estilos
    limpiarErrores();

    // Limpiar resultados
    document.getElementById("spnDisponible").innerText = "";
    document.getElementById("spnCapacidadPago").innerText = "";
    document.getElementById("spnInteresPagar").innerText = "";
    document.getElementById("spnTotalPrestamo").innerText = "";
    document.getElementById("spnCuotaMensual").innerText = "";

    // Reset estado
    document.getElementById("spnEstadoCredito").innerText = "ANALIZANDO...";
}

function validarDatos(ingresos, egresos, monto, plazo, tasa) {

    limpiarErrores();
    let valido = true;

    // INGRESOS
    if (isNaN(ingresos)) {
        mostrarErrorCampo("txtIngresos", "errorIngresos", "No puede estar vacío");
        valido = false;
    }

    // EGRESOS
    if (isNaN(egresos)) {
        mostrarErrorCampo("txtEgresos", "errorEgresos", "No puede estar vacío");
        valido = false;
    }

    if (!isNaN(ingresos) && !isNaN(egresos) && egresos > ingresos) {
        mostrarErrorCampo("txtEgresos", "errorEgresos", "No puede ser mayor que ingresos");
        valido = false;
    }

    // MONTO
    if (isNaN(monto)) {
        mostrarErrorCampo("txtMonto", "errorMonto", "No puede estar vacío");
        valido = false;
    }

    // PLAZO
    if (isNaN(plazo)) {
        mostrarErrorCampo("txtPlazo", "errorPlazo", "No puede estar vacío");
        valido = false;
    } else if (plazo > 25) {
        mostrarErrorCampo("txtPlazo", "errorPlazo", "Máximo 25 años");
        valido = false;
    }

    // TASA
    if (isNaN(tasa)) {
        mostrarErrorCampo("txtTasaInteres", "errorTasa", "No puede estar vacío");
        valido = false;
    } else if (tasa <= 5) {
        mostrarErrorCampo("txtTasaInteres", "errorTasa", "Debe ser mayor al 5%");
        valido = false;
    }

    return valido;
}

function mostrarErrorCampo(idInput, idError, mensaje) {
    let input = document.getElementById(idInput);
    let error = document.getElementById(idError);

    if (!input || !error) return;

    input.classList.add("error-input");
    error.innerText = mensaje;
}

function limpiarErrores() {
    let errores = document.querySelectorAll(".error");
    let inputs = document.querySelectorAll("input");

    errores.forEach(e => e.innerText = "");
    inputs.forEach(i => i.classList.remove("error-input"));
}