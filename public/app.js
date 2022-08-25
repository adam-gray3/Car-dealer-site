
const testimonals = [
  {
    name: "John Doe",
    testimonal: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque modi corporis molestias recusandae at? Assumenda fuga molestias minus cum nam eligendi natus et, saepe dicta!"
  },
  {
    name: "Bill Smith",
    testimonal: "Random text area for testimonal from clients!"
  },
  {
    name: "Sarah Sands",
    testimonal: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque modi corporis molestias recusandae at? Assumenda fuga molestias minus cum nam eligendi natus et, saepe dicta!"
  },
  {
    name: "Harry Trent",
    testimonal: "Random text area for testimonal from clients!"
  },
];

const displayText = document.querySelector(".testimonal");
const cont = document.querySelector(".slide-cont");
const nxtBtn = document.querySelector(".nxt");
const prevBtn = document.querySelector(".prev");
const displayName = document.querySelector(".name");
let currentSlide = 0;


function showSlide(){
  let activeSlide = document.querySelector(".slide.translate-x-0")
  displayText.textContent = testimonals[currentSlide].testimonal;
  displayName.textContent = testimonals[currentSlide].name;
};

function nxtSlide(){
  currentSlide ++;
  if(currentSlide >= testimonals.length){
    currentSlide = 0;
  }
  showSlide()
};

function prvSlide(){
  currentSlide --;
  if(currentSlide < 0){
    currentSlide = testimonals.length - 1;
  }
  showSlide()
};

setInterval(nxtSlide, 9000)
window.addEventListener("load", showSlide);
nxtBtn.addEventListener("click", nxtSlide);
prevBtn.addEventListener("click", prvSlide);
