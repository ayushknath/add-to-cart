fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json"
)
  .then((res) => res.json())
  .then((data) => {
    setProductInfo(data.product);
  });

const thumbnails = Array.from(
  document.querySelectorAll("[data-thumbnails] > li img")
);
const currentImage = document.querySelector("[data-currentImage] > img");

const productVendor = document.querySelector("[data-productVendor]");
const productTitle = document.querySelector("[data-productTitle]");
const originalPrice = document.querySelector("[data-compareAtPrice]");
const discountedPrice = document.querySelector("[data-price]");
const discountAmount = document.querySelector("[data-discount]");
const productDescription = document.querySelector("[data-productDescription]");
const addToCartSection = document.querySelector("[data-addToCart]");
const addToCartButton = addToCartSection.querySelector(
  "[data-addToCartAction]"
);

const checkboxes = Array.from(
  document.querySelectorAll("[data-checkboxMimic]")
);
const colorsGrp = document.querySelector(".product-color > :nth-child(2)");
let colorVariant = "Yellow";

const sizeRadio = Array.from(document.querySelectorAll('input[type="radio"]'));
let size = "Small";

const productQuantity = document.querySelector("[data-productQuantity]");
const increaseButton = document.querySelector("[data-increaseQuantity]");
const decreaseButton = document.querySelector("[data-decreaseQuantity]");

// Set product details fetched after fetching from server
function setProductInfo(product) {
  const compareAtPrice = parseInt(product.compare_at_price.slice(1));
  const price = parseInt(product.price.slice(1));
  const discount = parseInt(((compareAtPrice - price) / compareAtPrice) * 100);

  productVendor.textContent = product.vendor;
  productTitle.textContent = product.title;
  discountedPrice.textContent = `$${price.toFixed(2)}`;
  originalPrice.innerHTML = `<del>$${compareAtPrice.toFixed(2)}</del>`;
  discountAmount.textContent = `${discount}% Off`;
  productDescription.innerHTML = product.description;
}

// Select thumbnail to preview
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    currentImage.src = thumbnail.src;
    Array.from(thumbnail.parentElement.parentElement.children).forEach(
      (child) => {
        child.classList.remove("selected-image");
      }
    );
    thumbnail.parentElement.classList.add("selected-image");
  });
});

// Logic to select one color variant checkbox at a time
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    if (!e.target.classList.contains("checked")) {
      Array.from(colorsGrp.children).forEach((child) => {
        child.classList.remove("checked");
      });

      e.target.classList.add("checked");
      colorVariant = e.target.dataset.value;
    }
  });
});

// Select size
sizeRadio.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    size = e.target.value;
    Array.from(e.target.parentElement.parentElement.children).forEach(
      (child) => {
        child.classList.remove("selected-size");
      }
    );
    e.target.parentElement.classList.add("selected-size");
  });
});

// Change quantity of the product
function changeQuantity(action) {
  let currentQuantity = parseInt(productQuantity.textContent);

  switch (action) {
    case "INCREASE":
      currentQuantity++;
      break;
    case "DECREASE":
      currentQuantity > 1 && currentQuantity--;
      break;
    default:
      console.log("Action doesn't exist");
      break;
  }

  productQuantity.textContent = currentQuantity;
}

increaseButton.addEventListener("click", () => {
  changeQuantity("INCREASE");
});

decreaseButton.addEventListener("click", () => {
  changeQuantity("DECREASE");
});

// Add to cart message
addToCartButton.addEventListener("click", () => {
  const div = document.createElement("div");
  const span = document.createElement("span");
  const text = `${productTitle.textContent} with Color ${colorVariant} and Size ${size} added to cart`;
  const textNode = document.createTextNode(text);
  span.appendChild(textNode);
  div.appendChild(span);
  div.classList.add("message", "addtocart-message");
  addToCartSection.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
});
