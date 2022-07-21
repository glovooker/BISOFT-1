let buttonBulbOff = document.getElementById("turnOff");
let buttonBulbOn = document.getElementById("turnOn");
let bulbImage = document.getElementById("bulbImg");

const turnBulbOn = () => {
  bulbImage.src = "./assets/pic_bulbon.gif";
};

const turnBulbOff = () => {
  bulbImage.src = "./assets/pic_bulboff.gif";
};

buttonBulbOff.addEventListener("click", turnBulbOff);
buttonBulbOn.addEventListener("click", turnBulbOn);

// Made with love by Gabriel Lobo <3
