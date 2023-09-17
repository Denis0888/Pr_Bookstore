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
   let intervalSlider = 2000;

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





const showCaseBooks = document.querySelector(".case-books");
const btnLoadMore = document.querySelector(".btn_load-more");
const linkCategoryBooks = document.querySelectorAll(".category-books_item");

let querySubject = "subject:";
let startIndex = 0;
let nextLoadCat;

function nextLoadBooks() {         // по клику отображаем следующие 6 книг
   btnLoadMore.addEventListener("click", () => {
      startIndex += 6;

      linkCategoryBooks.forEach(item => {
         if (item.classList.contains("active")) {
            nextLoadCat = item.innerText;
         };
      });
      querySubject = `${nextLoadCat}`;
      resultRequest();
   });
};

function toggleCategoryBooks() {   // переключаем категории в блоке категорий
   linkCategoryBooks.forEach(item => {
      let targetCategory = item;
      item.addEventListener("click", () => {
         removeActiveCategory();
         targetCategory.classList.add("active");

         if (item.classList.contains("active")) {
            nextLoadCat = item.innerText;
         };
         showCaseBooks.innerHTML = "";

         querySubject = `${nextLoadCat}`;
         numBooks = 0;
         resultRequest();
      });
   });
};

function removeActiveCategory() {      // убираем класс active с категории
   linkCategoryBooks.forEach(item => {
      if (item.classList.contains("active")) {
         item.classList.remove("active");
      };
   });
};

function initRequest() {
   return fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${querySubject}&key=AIzaSyC8YBwRI2UO8lk5k4S31Z77MyGZr_Lu_bI&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict='ru'`)
      .then((response) => {
         const result = response.json();
         return result;
      })
      .then((data) => {
         return data
      })
      .catch(() => { console.log("error") });
};

async function resultRequest() {
   const data = await initRequest();
   const dataItems = data.items;
   console.log(dataItems)
   drawBooks(dataItems);
   addToCart();
};

function drawBooks(dataItems) {
   dataItems.forEach(item => {
      let books = `<div class="book-position">
                          <img class="${item.volumeInfo?.imageLinks?.thumbnail ? "book-position_image" : "book-position_image-none"}" src="${item.volumeInfo?.imageLinks?.thumbnail}" alt="foto book">
                          <div class="book-position_info">
                              <h2 class="book-position_info-author">${item.volumeInfo?.authors}</h2>
                              <h2 class="book-position_info-title">${item.volumeInfo?.title}</h2>
                              <div class="${item.volumeInfo?.averageRating ? "rating-block" : "rating-block-none"}">
                                  <div class="${item.volumeInfo?.averageRating ? "rating-block_stars" : ""}">   
                                      <div class="${item.volumeInfo?.averageRating === 1 ? "rating-block_stars__one" : ""}">
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__grey"></div>
                                          <div class="rating-block_stars__grey"></div>
                                          <div class="rating-block_stars__grey"></div>
                                          <div class="rating-block_stars__grey"></div>
                                      </div>
                                      <div class="${item.volumeInfo?.averageRating === 2 ? "rating-block_stars__two" : ""}">
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__grey"></div>
                                          <div class="rating-block_stars__grey"></div>
                                          <div class="rating-block_stars__grey"></div>
                                      </div>
                                      <div class="${item.volumeInfo?.averageRating === 3 ? "rating-block_stars__three" : ""}">
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__grey"></div>
                                          <div class="rating-block_stars__grey"></div>
                                      </div>
                                      <div class="${item.volumeInfo?.averageRating === 4 ? "rating-block_stars__four" : ""}">
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__grey"></div>
                                      </div>
                                      <div class="${item.volumeInfo?.averageRating === 5 ? "rating-block_stars__five" : ""}">
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                          <div class="rating-block_stars__yellow"></div>
                                      </div>
                                  </div>
                                  <h2 class="${item.volumeInfo?.ratingsCount ? "rating-block_count" : "rating-block_count-none"}">${item.volumeInfo?.ratingsCount} review</h2>
                              </div>
                              <h2 class="${item.volumeInfo?.description ? "book-position_info-description" : "book-position_info-description-none"}">${item.volumeInfo?.description}</h2>
                              <h2 class="${item.saleInfo?.retailPrice?.amount ? "book-position_info-sale" : "book-position_info-sale-none"}">&#36; ${item.saleInfo?.retailPrice?.amount}</h2>
                              <button class="btn_buy-now" type="button" data-btnbuy="${item.id}">buy now</button>
                          </div>
                      </div>`;

      showCaseBooks.innerHTML += books;
   });
};







let numBooks = 0;

function addToCart() {
   let buttonsBuyNow = document.querySelectorAll(".btn_buy-now");
   buttonsBuyNow.forEach((item) => {
      let buttonBuy = item;
      item.addEventListener("click", () => {
         let countBooks = document.querySelector(".nav_info_num");

         buttonBuy.classList.toggle("btn_in_the_cart")

         if (buttonBuy.classList.contains("btn_in_the_cart")) {
            buttonBuy.innerText = "In the cart";
            numBooks += 1;
            countBooks.innerText = numBooks;
            if (countBooks.innerText > 0) countBooks.classList.add("active");
         }  else {
            buttonBuy.innerText = "buy now";
            numBooks -= 1;
            countBooks.innerText = numBooks;
            if (countBooks.innerText == 0) countBooks.classList.remove("active");
         };
      });
   });
};



