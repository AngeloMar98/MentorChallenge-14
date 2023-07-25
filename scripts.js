"use strict";

const body = document.querySelector("body");
const header = document.querySelector(".header");
const mobileCheck = window.matchMedia("(max-width: 45em)");
const productImg = document.querySelector(".product-img");
const lightBox = document.querySelector(".light-box");
const closeLightBox = document.querySelector(".btn--close-light-box");
const lightboxProductImg = document
  .querySelector(".light-box")
  .querySelector(".product-img");
const lightboxSliderBtnLeft = document
  .querySelector(".light-box")
  .querySelector(".slider-btn--left");
const lightboxSliderBtnRight = document
  .querySelector(".light-box")
  .querySelector(".slider-btn--right");

const imagesSlider = document.querySelectorAll(".images-slider");

const sliderBtnLeft = document.querySelector(".slider-btn--left");
const sliderBtnRight = document.querySelector(".slider-btn--right");

const addProdNumb = document.querySelector(".add-number");

const mobileNav = document.querySelector(".mobile-nav");
const menuBtn = document.querySelectorAll(".mobile-nav--btn");

const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
const cartNum = document.querySelector(".cart-num");
const cartContent = document.querySelector(".cart-content");

const price = document.querySelector(".price-number");

const removeItem = document.querySelectorAll(".remove-item");
const addToCartBtn = document.querySelector(".btn--add-to-cart");

const closeEverything = function () {
  lightBox.classList.add("hidden");
  mobileNav.classList.remove("open-nav");
  cart.classList.add("hidden");
};

const toggleLightBox = function () {
  lightBox.classList.toggle("hidden");
};

mobileCheck.addEventListener("change", function (e) {
  if (e.matches) {
    closeEverything();
    header.classList.remove("desktop");
    header.classList.add("mobile");
  } else {
    closeEverything();
    header.classList.remove("mobile");
    header.classList.add("desktop");
  }
});

productImg.addEventListener("click", function () {
  toggleLightBox();
});

closeLightBox.addEventListener("click", function () {
  toggleLightBox();
});

menuBtn.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    mobileNav.classList.toggle("open-nav");
    cart.classList.add("hidden");
  })
);

imagesSlider.forEach((slider) =>
  slider.addEventListener("click", function (e) {
    if (!e.target.closest(".img-box")) return;
    const imgBox = e.target.closest(".img-box");

    slider
      .querySelectorAll(".img-box")
      .forEach((box) => box.classList.remove("current-box"));

    imgBox.classList.add("current-box");

    if (slider.closest(".light-box")) {
      lightboxProductImg.src = imgBox.dataset.img;
      return;
    }
    productImg.src = imgBox.dataset.img;
  })
);

addProdNumb.addEventListener("click", function (e) {
  if (!e.target.classList.contains("change-num")) return;

  const num = addProdNumb.querySelector("span");
  const currentNum = Number(num.textContent);
  if (e.target.classList.contains("minus-icon") && currentNum > 0) {
    num.textContent = currentNum - 1;
  } else if (e.target.classList.contains("plus-icon") && currentNum <= 99) {
    num.textContent = currentNum + 1;
  }
});

sliderBtnRight.addEventListener("click", function (e) {
  let currImgNum = Number(productImg.src.at(-5));
  mobileNav.classList.remove("open-nav");

  if (currImgNum < 4) {
    productImg.src = document.querySelector(
      `.img-box${currImgNum + 1}`
    ).dataset.img;
  } else {
    productImg.src = document.querySelector(".img-box1").dataset.img;
  }
});

sliderBtnLeft.addEventListener("click", function (e) {
  let currImgNum = Number(productImg.src.at(-5));
  mobileNav.classList.remove("open-nav");
  if (currImgNum > 1) {
    productImg.src = document.querySelector(
      `.img-box${currImgNum - 1}`
    ).dataset.img;
  } else {
    productImg.src = document.querySelector(".img-box4").dataset.img;
  }
});

lightboxSliderBtnRight.addEventListener("click", function (e) {
  let currImgNum = Number(lightboxProductImg.src.at(-5));

  if (currImgNum < 4) {
    lightboxProductImg.src = document.querySelector(
      `.img-box${currImgNum + 1}`
    ).dataset.img;
  } else {
    lightboxProductImg.src = document.querySelector(".img-box1").dataset.img;
  }

  lightBox
    .querySelectorAll(".img-box")
    .forEach((box) => box.classList.remove("current-box"));

  lightBox
    .querySelector(`.img-box${lightboxProductImg.src.at(-5)}`)
    .classList.add("current-box");
});

lightboxSliderBtnLeft.addEventListener("click", function (e) {
  let currImgNum = Number(lightboxProductImg.src.at(-5));

  mobileNav.classList.remove("open-nav");
  if (currImgNum > 1) {
    lightboxProductImg.src = document.querySelector(
      `.img-box${currImgNum - 1}`
    ).dataset.img;
  } else {
    lightboxProductImg.src = document.querySelector(".img-box4").dataset.img;
  }
  lightBox
    .querySelectorAll(".img-box")
    .forEach((box) => box.classList.remove("current-box"));

  lightBox
    .querySelector(`.img-box${lightboxProductImg.src.at(-5)}`)
    .classList.add("current-box");
});

/* CART BUTTONS */

cart.addEventListener("click", function (e) {
  if (e.target.closest(".remove-item")) {
    cartNum.textContent =
      Number(cartNum.textContent) -
      Number(
        e.target.closest(".cart-item").querySelector(".numb-of-items")
          .textContent
      );
    if (Number(cartNum.textContent) < 99) {
      cartNum.style.backgroundColor = "var(--orange)";
    }
    e.target.closest(".cart-item").remove();

    if (!cart.querySelector(".cart-item")) {
      cartNum.classList.add("hidden");
      cartNum.textContent = "0";
      document.querySelector(".checkout-btn").remove();
      cartContent.insertAdjacentHTML(
        "beforeend",
        `<p class="empty-cart" style="text-align: center; padding: 8rem">
          Your cart is empty
        </p>`
      );
    }
  }
});

cartBtn.addEventListener("click", function (e) {
  cart.classList.toggle("hidden");
  mobileNav.classList.remove("open-nav");
});

addToCartBtn.addEventListener("click", function (e) {
  const itemsNum = Number(document.querySelector(".items-num").textContent);

  if (itemsNum === 0) return;

  cartNum.classList.remove("hidden");
  cartNum.textContent = Number(cartNum.textContent) + itemsNum;
  if (Number(cartNum.textContent) >= 99) {
    cartNum.textContent = "99";
    cartNum.style.backgroundColor = "red";
  }

  if (document.querySelectorAll(".cart-item").length > 3) return;

  document.querySelector(".empty-cart")?.remove();

  const itemPrice =
    itemsNum > 1
      ? `$${
          price.textContent
        } x <span class="numb-of-items">${itemsNum}</span> <strong>$${(
          Number.parseInt(price.textContent) * itemsNum
        ).toFixed(2)}</strong>`
      : `<strong>$${Number.parseInt(price.textContent).toFixed(2)}</strong>`;

  console.log(itemPrice);

  let button = `<button class="btn checkout-btn">Checkout</button>`;

  const newItem = `
  <div class="cart-item">
  <div class="flex row cart-product-info">
    <img class="cart-thumbnail" src="images/image-product-1-thumbnail.jpg" />
    <p>Fall Limited Edition Sneakers <br> ${itemPrice}</p>
    <button class="btn remove-item">
      <img class="icon" src="images/icon-delete.svg" />
    </button>
  </div>

  </div>
  `;

  if (!cart.querySelector(".checkout-btn"))
    cartContent.insertAdjacentHTML("beforeend", button);

  cartContent.insertAdjacentHTML("afterbegin", newItem);
});
