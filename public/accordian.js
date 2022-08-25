
//ACCORDIAN SECTION
const btns = document.querySelectorAll(".open");
let active = document.querySelectorAll(".acc-content");

btns.forEach(btn => {
  btn.addEventListener("click", () => {
    const slide = btn.nextElementSibling;
    // slide.classList.toggle("hidden");
    if(slide.className.includes("h-3/4")){
      slide.classList.replace("h-3/4", "h-0");
      slide.classList.replace("opacity-90", "opacity-0");
      slide.classList.remove("p-4");
    } else{
      slide.classList.replace("h-0", "h-3/4");
      slide.classList.replace("opacity-0", "opacity-90");
      slide.classList.add("p-4");
    };

    //close slide when another 
    // active.forEach(activeSlide => {
    //   if(activeSlide.className.includes("h-3/4")){
    //     slide.classList.replace("h-3/4", "h-0");
    //     slide.classList.replace("opacity-90", "opacity-0");
    //     slide.classList.remove("p-4");
    //   }
    // })
  })
});
