"use strict";

let inputName = document.querySelector("#txtName");
let inputFirstLastName = document.querySelector("#txtLastname1");
let inputSecondLastName = document.querySelector("#txtLastname2");
let inputEmail = document.querySelector("#txtEmail");
let selectRoom = document.querySelector("#roomType");
let inputAdultAmount = document.querySelector("#txtAdults");
let inputChildrenAmount = document.querySelector("#txtChildren");
let inputPetsAmount = document.querySelector("#txtPets");
let inputArrivalDate = document.querySelector("#txtArrivalDate");
let inputArrivalTime = document.querySelector("#txtArrivalTime");
let inputLeavingDate = document.querySelector("#txtLeavingDate");
let inputLeavingTime = document.querySelector("#txtLeavingTime");
let radioPickupTrue = document.querySelector("#pickupTrue");
let radioPickupFalse = document.querySelector("#pickupFalse");
let buttonSend = document.querySelector("#btnSend");

buttonSend.addEventListener("click", SendData);

function ValidateForms() {
  let valueName = inputName.value.toLowerCase();
  let valueFirstLastName = inputFirstLastName.value.toLowerCase();
  let valueSecondLastName = inputSecondLastName.value.toLowerCase();
  let valueEmail = inputEmail.value.toLowerCase();
  let valueRoom = selectRoom.value.toLowerCase();
  let valueAdultAmount;
  let valueChildrenAmount;
  let valuePetsAmount;

  let valueArrivalDate = inputArrivalDate.value;
  let valueArrivalTime = inputArrivalTime.value;
  let valueLeavingDate = inputLeavingDate.value;
  let valueLeavingTime = inputLeavingTime.value;
  let valuePickupTrue = radioPickupTrue.checked;
  let valuePickupFalse = radioPickupFalse.checked;

  if (inputAdultAmount.value != "") {
    valueAdultAmount = Number(inputAdultAmount.value);
  }

  if (inputChildrenAmount.value != "") {
    valueChildrenAmount = Number(inputChildrenAmount.value);
  }

  if (inputPetsAmount.value != "") {
    valuePetsAmount = Number(inputPetsAmount.value);
  }

  if (valueName == "" || valueName == null || valueName == undefined) {
    PrintWarning("El nombre es requerido.");
    LabelWarning("lblName");
    InputWarning("txtName");
    return false;
  }

  if (
    valueFirstLastName == "" ||
    valueFirstLastName == null ||
    valueFirstLastName == undefined
  ) {
    PrintWarning("El primer apellido es requerido.");
    LabelWarning("lblLastname1");
    InputWarning("txtLastname1");
    return false;
  }

  if (
    valueSecondLastName == "" ||
    valueSecondLastName == null ||
    valueSecondLastName == undefined
  ) {
    PrintWarning("El segundo apellido es requerido.");
    LabelWarning("lblLastname2");
    InputWarning("txtLastname2");
    return false;
  }

  if (valueEmail == "" || valueEmail == null || valueEmail == undefined) {
    PrintWarning("El correo electrónico es requerido.");
    LabelWarning("lblEmail");
    InputWarning("txtEmail");
    return false;
  }

  if (valueRoom == "" || valueRoom == null || valueRoom == undefined) {
    PrintWarning("El tipo de habitación es requerido.");
    LabelWarning("lblRoom");
    InputWarning("roomType");
    return false;
  }

  if (valueAdultAmount < 0) {
    PrintWarning("La cantidad de adultos no es válida.");
    LabelWarning("lblAdults");
    InputWarning("txtAdults");
    return false;
  }

  if (valueChildrenAmount < 0) {
    PrintWarning("La cantidad de niños no es válida.");
    LabelWarning("lblAdults");
    InputWarning("txtAdults");
    return false;
  }

  if (valuePetsAmount < 0) {
    PrintWarning("La cantidad de mascotas no es válida.");
    LabelWarning("lblAdults");
    InputWarning("txtAdults");
    return false;
  }

  if (valueAdultAmount == null || valueAdultAmount == undefined) {
    PrintWarning("La cantidad de adultos es requerida.");
    LabelWarning("lblAdults");
    InputWarning("txtAdults");
    return false;
  }

  if (valueChildrenAmount == null || valueChildrenAmount == undefined) {
    PrintWarning("La cantidad de niños es requerida.");
    LabelWarning("lblChildren");
    InputWarning("txtChildren");
    return false;
  }

  console.log(valuePetsAmount);

  if (valuePetsAmount == null || valuePetsAmount == undefined) {
    PrintWarning("La cantidad de mascotas es requerida.");
    LabelWarning("lblPets");
    InputWarning("txtPets");
    return false;
  }

  if (
    valueArrivalDate == "" ||
    valueArrivalDate == null ||
    valueArrivalDate == undefined
  ) {
    PrintWarning("La fecha de llegada es requerida.");
    LabelWarning("lblArrivalDate");
    InputWarning("txtArrivalDate");
    return false;
  }

  if (
    valueArrivalTime == "" ||
    valueArrivalTime == null ||
    valueArrivalTime == undefined
  ) {
    PrintWarning("La hora de llegada es requerida.");
    LabelWarning("lblArrivalDate");
    InputWarning("txtArrivalTime");
    return false;
  }

  if (
    valueLeavingDate == "" ||
    valueLeavingDate == null ||
    valueLeavingDate == undefined
  ) {
    PrintWarning("La fecha de salida es requerida.");
    LabelWarning("lblLeavingDate");
    InputWarning("txtLeavingDate");
    return false;
  }

  if (
    valueLeavingTime == "" ||
    valueLeavingTime == null ||
    valueLeavingTime == undefined
  ) {
    PrintWarning("La hora de salida es requerida.");
    LabelWarning("lblLeavingDate");
    InputWarning("txtLeavingTime");
    return false;
  }

  if (valuePickupFalse == false && valuePickupTrue == false) {
    PrintWarning("El pickup es requerido.");
    LabelWarning("lblPickup");
    LabelWarning("lblPickupTrue");
    LabelWarning("lblPickupFalse");
    InputWarning("pickupTrue");
    InputWarning("pickupFalse");
    return false;
  }

  return true;
}

function PrintWarning(error) {
  Swal.fire({
    title: "¡Error!",
    text: error,
    icon: "error",
    showClass: {
      popup: "animate__animated animate__bounceIn",
    },
    hideClass: {
      popup: "animate__animated animate__bounceOut",
    },
    confirmButtonText: "Aceptar",
  });
}

function PrintSuccess() {
  Swal.fire({
    title: "¡Datos Válidos!",
    text: "Los datos fueron validados correctamente.",
    icon: "success",
    showClass: {
      popup: "animate__animated animate__bounceIn",
    },
    hideClass: {
      popup: "animate__animated animate__bounceOut",
    },
    confirmButtonText: "Aceptar",
  });
}

function LabelWarning(labelId) {
  var elementLabel = document.getElementById(labelId);
  var styleOrigin = elementLabel.style;

  elementLabel.style = "color:red";

  setTimeout(function () {
    elementLabel.style = styleOrigin;
  }, 5000);
}

function InputWarning(inputId) {
  var elementLabel = document.getElementById(inputId);
  var styleOrigin = elementLabel.style;

  elementLabel.style = "border: 3px solid red;";

  setTimeout(function () {
    elementLabel.style = styleOrigin;
  }, 5000);
}

function SendData() {
  if (ValidateForms() == false) {
    return;
  } else {
    PrintSuccess();
  }
}
