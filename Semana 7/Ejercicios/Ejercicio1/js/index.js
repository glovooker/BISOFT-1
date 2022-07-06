const imprimir = () => {
  const inputNombre = document.getElementById("txt-nombre");
  const outputResultado = document.getElementById("out-resultado");

  let nombre = inputNombre.value;

  outputResultado.innerHTML = `${nombre}`;
};

const btnElement = document.getElementById("btn-imprimir");
btnElement.addEventListener("click", imprimir);

// Made with love by Gabriel Lobo
