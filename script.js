
document.addEventListener("DOMContentLoaded", function() {
    const popupContainer = document.querySelector(".popup-container");
    const closeBtn = document.querySelector(".close-btn");
  
    function showPopup() {
      popupContainer.style.display = "block";
    }
  
    function hidePopup() {
      popupContainer.style.display = "none";
    }
  
    function handleScroll() {
      if (window.pageYOffset > 700) {
        showPopup();
        window.removeEventListener("scroll", handleScroll);
      }
    }
  
    closeBtn.addEventListener("click", hidePopup);
    window.addEventListener("scroll", handleScroll);
  });


var messageButton = document.getElementById("messageButton");
var closeButton = document.getElementsByClassName("close-btn")[0];

messageButton.addEventListener("click", sendMessage);
closeButton.addEventListener("click", closePopup);

function sendMessage(event) {
  event.preventDefault();

  var emailInput = document.getElementById("email");
  var email = emailInput.value;

  var popupContainer = document.getElementsByClassName("popup-container")[0];
  popupContainer.style.display = "none";
}

function closePopup() {
  var popupContainer = document.getElementsByClassName("popup-container")[0];
  popupContainer.style.display = "none";
}


var cartItems = [];
function addToCart(event, productName, productPrice) {
    event.preventDefault();
    var itemIndex = findCartItemIndex(productName);
  
    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity++;
    } else {
      var newItem = {
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
      };
      cartItems.push(newItem);
    }
  
    updateCartDisplay();
    updateTotalPrice(); 
  
  }
  
  function removeFromCart(productName) {
    var itemIndex = findCartItemIndex(productName);
  
    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity--;
  
      if (cartItems[itemIndex].quantity <= 0) {
        cartItems.splice(itemIndex, 1);
      }
  
      updateCartDisplay();
      updateTotalPrice(); 
    }
  }
  
  function increaseQuantity(productName) {
    var itemIndex = findCartItemIndex(productName);
  
    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity++;
      updateCartDisplay();
      updateTotalPrice(); 
    }
  }
  
  function decreaseQuantity(productName) {
    var itemIndex = findCartItemIndex(productName);
  
    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity--;
  
      if (cartItems[itemIndex].quantity <= 0) {
        cartItems.splice(itemIndex, 1);
      }
  
      updateCartDisplay();
      updateTotalPrice(); 
    }
  }

function findCartItemIndex(productName) {
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === productName) {
      return i;
    }
  }
  return -1;
}
function updateCartDisplay() {
    var cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";
  
    var emptyMessage = document.querySelector(".empty-message");
  
    if (cartItems.length === 0) {
      cartContainer.appendChild(emptyMessage);
    } else {
      var cartTitle = document.createElement("h2");
      cartTitle.innerText = "Корзина";
      cartContainer.appendChild(cartTitle);
  
      var totalCost = 0; 
  
      for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
  
        var itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
  
        var itemName = document.createElement("p");
        itemName.classList.add("cart-item-name");
        itemName.innerText = cartItem.name;
        itemElement.appendChild(itemName);
  
        var itemQuantity = document.createElement("p");
        itemQuantity.classList.add("cart-item-quantity");
        itemQuantity.innerText = "Количество: " + cartItem.quantity;
        itemElement.appendChild(itemQuantity);
  
        var itemPrice = document.createElement("p");
        itemPrice.classList.add("cart-item-price");
        var formattedPrice = formatPrice(cartItem.price); 
        itemPrice.innerText = "Цена: " + formattedPrice;
        itemElement.appendChild(itemPrice);
  
        var increaseQuantityBtn = document.createElement("button");
        increaseQuantityBtn.innerText = "+";
        increaseQuantityBtn.addEventListener(
          "click",
          (function (item) {
            return function () {
              increaseQuantity(item.name);
              updateCartDisplay();
            };
          })(cartItem)
        );
        itemElement.appendChild(increaseQuantityBtn);
  
        var decreaseQuantityBtn = document.createElement("button");
        decreaseQuantityBtn.innerText = "-";
        decreaseQuantityBtn.addEventListener(
          "click",
          (function (item) {
            return function () {
              decreaseQuantity(item.name);
              updateCartDisplay();
            };
          })(cartItem)
        );
        itemElement.appendChild(decreaseQuantityBtn);
  
        cartContainer.appendChild(itemElement);
  
        var itemCost = cartItem.price * cartItem.quantity; 
        totalCost += itemCost; 
      }
  
      var totalPriceElement = document.createElement("p");
      totalPriceElement.classList.add("total-price");
      var formattedTotalPrice = formatPrice(totalCost); 
      totalPriceElement.innerText = "Общая стоимость: " + formattedTotalPrice;
      cartContainer.appendChild(totalPriceElement);
    }
  }
  
  function formatPrice(price) {

    return price.toFixed(2) + " руб.";
  }

 