const input = document.querySelector("#input");
const displayBtn = document.querySelectorAll(".display-btns");
const memRecall = document.querySelector("#mem_recall");
const memClear = document.querySelector("#mem_clear");
const memory = document.querySelector(".memory");


// Clearing the input screen
function clearInput() {
  input.value = "";
}

// Displaying the result
function result() {
  if (input.value.includes("^")) {
    input.value = input.value.replace("^", "**");
  }
  if (input.value.includes("log")) {
    let exp = input.value;
    const logAns = Math.log10(Number(exp.slice(3)));
    input.value = logAns.toFixed(15);
    return;
  }
  if (input.value.includes("ln")) {
    let exp = input.value;
    const lnAns = Math.log(Number(exp.slice(3)));
    input.value = lnAns.toFixed(15);
    return;
  }
  if (input.value.includes("√")) {
    let exp = input.value;
    let exponent = exp.slice(0, exp.indexOf("√"));
    let base = exp.slice(exp.indexOf("√")+1);
    const rootAns = Math.pow(Number(base), 1/Number(exponent));
    input.value = rootAns;
    return;
  }
  if (input.value.includes("sin")) {
    let exp = input.value;
    let num = Number(exp.slice(3)) * (Math.PI/180);
    input.value = Math.sin(num);
  }
  if (input.value.includes("cos")) {
    let exp = input.value;
    let num = Number(exp.slice(3)) * (Math.PI/180);
    input.value = Math.cos(num);
  }
  if (input.value.includes("tan")) {
    let exp = input.value;
    let num = Number(exp.slice(3)) * (Math.PI/180);
    input.value = Math.tan(num);
  }
  const ans = eval(input.value);
  input.value = ans;
}

// Backspace 
function backspace() {
  let remstr = input.value;
  remstr = remstr.slice(0, remstr.length - 1);
  input.value = remstr;
}

// Change Sign
function changeSign() {
  let num = Number(input.value);
  if (Math.sign(num) == -1)
    input.value = input.value.slice(1);
  else
    input.value = "-" + input.value;
}

//Factorial
function factorial() {
  let num = Number(input.value);
  let ans=1;
  for (let i = 1; i <= num; i++)
    ans = ans * i;
  input.value = ans;
}

// Inverse
function inverse() {
  let num = Number(input.value);
  input.value = 1 / num;
}

//Absolute
function absolute() {
  let num = Number(input.value);
  input.value = Math.abs(num);
}

// Square
function square() {
  let num = Number(input.value);
  input.value = Math.pow(num, 2);
}

//Cube
function cube() {
  let num = Number(input.value);
  input.value = Math.pow(num, 3);
}

// Square Root 
function squareRoot() {
  let num = Number(input.value);
  input.value = Math.sqrt(num);
}

// Cube Root
function cubeRoot() {
  let num = Number(input.value);
  input.value = Math.cbrt(num);
}

// Fix to Exponential (F-E Button)
function fixToExp() {
  let num = Number(input.value);
  num = num.toExponential(2).toString();
  input.value = num;
}

// Degree to Radian and Vice-versa
function changeUnit() {
  let val = input.value;
  let unit = document.querySelector("#changeUnit").innerText;
  if (unit == "DEG") {
    val = val * (180 / Math.PI).toString() + "°";
    document.querySelector("#changeUnit").innerText = "RAD";
  }   
  else if (unit == "RAD") {
    val = val * (Math.PI / 180).toString();
    document.querySelector("#changeUnit").innerText = "DEG";
  }
  input.value = val;
}

// Change options (2nd Button)
function changeToSecond() {
  let option = document.getElementById("2nd").innerText;

  if (option == "2nd") {
    document.getElementById("2nd").innerHTML = "1<sup>st</sup>";
    let shownElements = document.getElementsByClassName("shown-btns");
    for (let item of shownElements) {
      item.style.display = "none";
    }
    let hidnElements = document.getElementsByClassName("hidn-btns");
    for (let item of hidnElements) {
      item.style.display = "block";
    }
  }
  else if (option == "1st") {
    document.getElementById("2nd").innerHTML = "2<sup>nd</sup>";
    let shownElements = document.getElementsByClassName("shown-btns");
    for (let item of shownElements) {
      item.style.display = "block";
    }
    let hidnElements = document.getElementsByClassName("hidn-btns");
    for (let item of hidnElements) {
      item.style.display = "none";
    }
  }
}

//Log to the base 2
function logToBase2() {
  let num = Number(input.value);
  input.value = Math.log2(num).toFixed(10);
}

// Enable MC and MR Buttons
function enable() {
  memRecall.disabled = false;
  memClear.disabled = false;
}

//Floor function
function findFloor() {
  let num = Number(input.value);
  input.value = Math.floor(num);
}

//Ceiling function
function findCeil() {
  let num = Number(input.value);
  input.value = Math.ceil(num);
}

// Memory Operations
memory.addEventListener("click", e => {
  let id = e.target.id;
  if (id == "mem_plus") {
    enable();
    let value = Number(input.value);
    value = value + Number(localStorage.getItem("arr"));
    localStorage.setItem("arr", JSON.stringify(value));
    input.value = value.toString();
  }
  else if (id == "mem_minus") {
    enable();
    let value = Number(input.value);
    value = Number(localStorage.getItem("arr")) - value;
    localStorage.setItem("arr", JSON.stringify(value));
    input.value = value.toString();
  }
  else if (id == "mem_store") {
    enable();
    let value = Number(input.value);
    let arr;
    if (localStorage.getItem("arr") === null)
      arr = "";
    else
      arr = JSON.parse(localStorage.getItem("arr"));
    localStorage.setItem("arr", JSON.stringify(value));
    input.value = "";
  }
  else if (id == "mem_recall") {
    input.value = localStorage.getItem("arr").toString();
  }
  else if (id == "mem_clear") {
    memClear.disabled = true;
    memRecall.disabled = true;
    localStorage.clear();
    input.value = "";
  }
});

// Aliases for Buttons and Displaying input text
for (item of displayBtn) {
  item.addEventListener("click", e => {
    btntext = e.target.innerText;
    if (btntext == "÷") {
      btntext = "/";
    }
    if (btntext == "x") {
      btntext = "*";
    }
    if (btntext == "mod") {
      btntext = "%";
    }
    if (btntext == "π") {
      btntext = "3.14159";
    }
    if (btntext == "e") {
      btntext = "2.71828";
    }
    if (btntext == "ex") {
      btntext = "2.71828^";
    }
    if (btntext == "xy") {
      btntext = "^";
    }
    if (btntext == "exp") {
      btntext = "E";
    }
    if (btntext == "10x") {
      btntext = "10^";
    }
    if (btntext == "2x") {
      btntext = "2^";
    }
    if (btntext == "y√x") {
      btntext = "√";
    }
    input.value += btntext;
  });
}


