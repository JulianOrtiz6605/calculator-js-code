// Les dejare el código en la descripción, con este código la calculadora queda funcionando con el teclado y con el mouse.
// Mil gracias por todo el apoyo, por favor denle like y suscribanse al canal.
let outputScreen = document.getElementById("output-screen");

function display(num) {
  outputScreen.value += num;
}

function calculate() {
  try {
    let expression = outputScreen.value;
    expression = expression.replace(/(\d+)%/g, function(match, p1) {
      return parseFloat(p1) / 100;
    });

    const result = eval(expression);

    // Verificar si el resultado es un número antes de asignarlo al output
    if (typeof result === "number" && isFinite(result)) {
      outputScreen.value = result;
    } else {
      outputScreen.value = "0";
    }
  } catch (err) {
    outputScreen.value = "0";
  }
}


function clearScreen() {
  outputScreen.value = "";
}

function deleteCharacter() {
  outputScreen.value = outputScreen.value.slice(0, -1);
}

function setActiveButton(key) {
  const buttons = document.getElementsByClassName("key");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  const button = document.querySelector(`[data-key="${key}"]`);
  button.classList.add("active");
}

function removeActiveButton() {
  const buttons = document.getElementsByClassName("key");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
}

// Controladores de eventos de teclado
document.addEventListener("keydown", function(event) {
  const key = event.key;
  switch (key) {
    case "Enter":
      event.preventDefault();
      calculate();
      setActiveButton("=");
      break;
    case "Backspace":
      event.preventDefault();
      deleteCharacter();
      setActiveButton("DEL");
      break;
    case "Delete":
      event.preventDefault();
      clearScreen();
      setActiveButton("Cl");
      break;
    case "Escape":
      clearScreen();
      setActiveButton("Cl");
      break;
    default:
      if (/[0-9%\/*\-+.]/.test(key)) {
        display(key);
        setActiveButton(key);
      }
      break;
  }
});

document.addEventListener("keyup", function(event) {
  removeActiveButton();
});