export let numBooks = 0;
export let countBooks = document.querySelector(".nav_info_num");

export function addToCart() {
   let buttonsBuyNow = document.querySelectorAll(".btn_buy-now");
   buttonsBuyNow.forEach((item) => {
      let buttonBuy = item;
      item.addEventListener("click", () => {
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