// Variables globales
let montoTotal, cantidadCuotas, tasaInteresAnual;
let pagos = []; // Array para almacenar los pagos calculados

document.getElementById('calcularBtn').addEventListener('click', mostrarPagoMensual);
document.getElementById('reiniciarBtn').addEventListener('click', reiniciarHistorial);

function calcularPagoEnCuotas(montoTotal, cantidadCuotas, tasaInteresAnual) {
    if (cantidadCuotas <= 0) {
        return "El número de cuotas debe ser mayor a 0";
    }
    if (montoTotal <= 0) {
        return "El monto total debe ser mayor a 0";
    }
    if (tasaInteresAnual < 0) {
        return "La tasa de interés no puede ser negativa";
    }

    const tasaInteresMensual = (tasaInteresAnual / 100) / 12;
    const pagoMensual = tasaInteresMensual > 0
        ? montoTotal * tasaInteresMensual / (1 - Math.pow(1 + tasaInteresMensual, -cantidadCuotas))
        : montoTotal / cantidadCuotas;

    return parseFloat(pagoMensual.toFixed(2));
}

function mostrarPagoMensual() {
    montoTotal = parseFloat(document.getElementById('montoTotal').value);
    cantidadCuotas = parseInt(document.getElementById('cantidadCuotas').value);
    tasaInteresAnual = parseFloat(document.getElementById('tasaInteresAnual').value);

    const resultadoElemento = document.getElementById('resultado');

    if (isNaN(montoTotal) || montoTotal <= 0) {
        resultadoElemento.textContent = "Es necesario ingresar un monto válido para calcular el pago mensual.";
        console.log("Es necesario ingresar un monto válido para calcular el pago mensual.");
    } else if (isNaN(cantidadCuotas) || cantidadCuotas <= 0) {
        if (!isNaN(tasaInteresAnual) && tasaInteresAnual > 0) {
            resultadoElemento.textContent = "Es necesario ingresar un número de cuotas válido cuando hay una tasa de interés.";
            console.log("Es necesario ingresar un número de cuotas válido cuando hay una tasa de interés.");
        } else {
            resultadoElemento.textContent = "Es necesario ingresar un número de cuotas válido.";
            console.log("Es necesario ingresar un número de cuotas válido.");
        }
    } else {
        const resultado = calcularPagoEnCuotas(montoTotal, cantidadCuotas, tasaInteresAnual);
        if (typeof resultado === "string") {
            resultadoElemento.textContent = resultado; // Mensaje de error
            console.log(resultado);
        } else {
            const mensaje = `La cuota mensual sería de $${resultado}`;
            resultadoElemento.textContent = mensaje;
            console.log(mensaje);

            // Almacenar el pago en el array
            pagos.unshift({
                montoTotal,
                cantidadCuotas,
                tasaInteresAnual,
                pagoMensual: resultado
            });

            // Actualizar la lista de pagos en el DOM
            actualizarListaPagos();
        }
    }
}

function actualizarListaPagos() {
    const listaPagosElemento = document.getElementById('listaPagos');
    listaPagosElemento.innerHTML = '';

    pagos.forEach((pago, index) => {
        const li = document.createElement('li');
        li.textContent = `Pago ${index + 1}: Monto Total = $${pago.montoTotal}, Cuotas = ${pago.cantidadCuotas}, Tasa de Interés = ${pago.tasaInteresAnual}%, Pago Mensual = $${pago.pagoMensual}`;
        listaPagosElemento.appendChild(li);
    });
}

function reiniciarHistorial() {
    pagos = [];
    actualizarListaPagos();
}
