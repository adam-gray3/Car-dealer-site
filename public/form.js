const form = document.querySelector("form");
const btn = document.querySelector(".btn");
const name = document.querySelector(".name");
const number = document.querySelector(".number");
const email = document.querySelector(".email");
const errorMsg = document.querySelector("small");

form.addEventListener("submit", (e) => {
let errors = [];

function showError(input, message){
  const formControl = input.parentElement;
  const msg = formControl.querySelector("small");
  msg.className = "block font-bold text-red-600 text-sm tracking-wide";
  msg.innerText = message;
};

if(name.value === ""){
  errors.push(name);
  showError(name, "Please enter a valid name!");
  setTimeout(() => {
    hideError(name.previousElementSibling)
  }, 4000)
};

if(number.value.length < 11){
  errors.push(number);
  showError(number, "Please enter a valid contact number!");
  setTimeout(() => {
    hideError(number.previousElementSibling)
  }, 4000)
};

if(email.value === ""){
  errors.push(email);
  showError(email, "Please enter a valid contact email!");
  setTimeout(() => {
    hideError(email.previousElementSibling)
  }, 4000)
};

function hideError(element){
  element.className = "hidden"
};

if(errors.length > 0){
  e.preventDefault()
}
});
