const imprimir = () => {
  const listaMonedas = document.getElementById("slt-moneda");
  const outputResultado = document.getElementById("out-resultado");
  let moneda = listaMonedas.value;

  outputResultado.innerHTML = `${moneda}`;
};

const btnElement = document.getElementById("btn-imprimir");
btnElement.addEventListener("click", imprimir);

// Made with love by Gabriel Lobo
