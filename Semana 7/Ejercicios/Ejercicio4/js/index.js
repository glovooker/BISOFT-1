const imprimir = () => {
  let generosSeleccionados = "";
  listaGeneros.forEach((genero) => {
    if (genero.checked == true) {
      console.log(genero.value);
      generosSeleccionados += genero.value + ", ";
    }
  });

  outputResultado.value = generosSeleccionados;
};

const btnElement = document.getElementById("btn-imprimir");
const listaGeneros = document.querySelectorAll(".chk-generos");
const outputResultado = document.getElementById("out-resultado");
btnElement.addEventListener("click", imprimir);

// Made with love by Gabriel Lobo
