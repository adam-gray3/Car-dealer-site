
const closeBtn = document.querySelector(".close");
const mobileMenu = document.querySelector(".mobile-menu");
const openMenu = document.querySelector(".hamburger");


closeBtn.addEventListener("click", () => {
  mobileMenu.classList.add("hidden")
});

openMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden")
});
