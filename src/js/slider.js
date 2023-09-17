import {resultRequest, nextLoadBooks, toggleCategoryBooks} from "./books.js"

const images = ["src/images/banner1.png", "src/images/banner2.png", "src/images/banner3.png"];

document.addEventListener("DOMContentLoaded", function () {
   initSlider();
   resultRequest();
   nextLoadBooks();
   toggleCategoryBooks();
});

function initSlider() {

   let sliderImages = document.querySelector(".container-slider");
   let sliderDots = document.querySelector(".container-dots");
   let intervalSlider = 5000;

   initImages();
   initDots();
   initAutoplay();

   function initImages() {
      images.forEach((image, index) => {
         let imageDiv = `<div class='img n${index} ${index === 0 ? 'active' : ''}' style='background-image:url(${images[index]});' data-index='${index}'></div>`;
         sliderImages.innerHTML += imageDiv;
      });
   }

   function initDots() {
      images.forEach((image, index) => {
         let dots = `<div class="dot n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
         sliderDots.innerHTML += dots;
      });
      sliderDots.querySelectorAll(".dot").forEach(dot => {
         dot.addEventListener("click", function () {
            moveSlider(this.dataset.index);
         })
      });
   }

   function initAutoplay() {                                         
      setInterval(() => {
          let curNumber = +sliderImages.querySelector('.active').dataset.index;  
          let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1; 
          moveSlider(nextNumber);                                
      }, intervalSlider)
  }

   function moveSlider(num) {
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(".n" + num).classList.add("active");

      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
   }
}