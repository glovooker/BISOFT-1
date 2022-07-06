const imprimir = () => {
  const listaMonedas = document.getElementById("slt-moneda");
  const inputMonto = document.getElementById("txt-monto");
  const outputResultado = document.getElementById("out-resultado");
  let moneda = listaMonedas.value;
  let monto = inputMonto.value;
  let resultado = moneda + monto;

  outputResultado.value = resultado;
};

const btnElement = document.getElementById("btn-imprimir");
btnElement.addEventListener("click", imprimir);

// Made with love by Gabriel Lobo
