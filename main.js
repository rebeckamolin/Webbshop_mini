let shoppingCart;
let total = 0;
let price;
fetch("./products.json")
  .then(products => products.json())
  .then(products => showProducts(products));
function showProducts(products) {
  let output = "";
  products.forEach(product => {
    output +=
      '<p class= "m-5"> ' +
      "<img src= " +
      product.image +
      " >" +
      "<br>" +
      product.item +
      "<br>" +
      product.color +
      "<br>" +
      product.price +
      " kr" +
      "<br>" +
      '<button class= "addItemBtn">' +
      "köp" +
      "</button>" +
      "</p>";
  });
  document.getElementById("productDiv").innerHTML = output;
  addItemBtn(products);
}
function addItemBtn(product) {
  let addItemBtn = document.getElementsByClassName("addItemBtn");
  for (let i = 0; i < addItemBtn.length; i++) {
    addItemBtn[i].addEventListener("click", function(event) {
      myShoppingCart(product[i]);
    });
  }
}
function myShoppingCart(item) {
  if (shoppingCart == null) {
    shoppingCart = [];
    console.log("skapar ny array");
  }
  shoppingCart.push(item);
  drawOutShoppingCart();
  orderBtn();
}
function drawOutShoppingCart() {
  if (shoppingCart.length === 0) {
    output = " ";
    document.getElementById("total").innerHTML = total + " sek";
    document.getElementById("shoppingCartItems").innerHTML = output;
  } else {
    let output = " ";
    for (let i = 0; i < shoppingCart.length; i++) {
      console.log(shoppingCart);
      price = shoppingCart[i].price;
      output +=
        '<p id="' +
        i +
        '">' +
        "<img src= " +
        shoppingCart[i].image +
        " >" +
        shoppingCart[i].item +
        " " +
        shoppingCart[i].price +
        " kr " +
        '<button class= "removeItemBtn" id="' +
        i +
        '">' +
        "Ta bort varan" +
        "</button>";
      console.log(output);
      document.getElementById("shoppingCartItems").innerHTML = output;
      console.log(shoppingCart[i].price);
    }
    console.log("här är arrayen");
    console.log(shoppingCart);
    emptyBasket();
    removeProduct();
    getTotal();
  }
}
function getTotal() {
  total = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    total += shoppingCart[i].price;
  }
  document.getElementById("total").innerHTML = total + " sek";
}
function orderBtn() {
  let orderBtn = document.getElementById("orderBtn");
  orderBtn.addEventListener("click", function() {
    alert("Tack för din beställning!");
    shoppingCart.splice(0, shoppingCart.length);
    console.log(shoppingCart);
    getTotal();
    drawOutShoppingCart();
  });
}
function emptyBasket() {
  let emptyBtn = document.getElementById("emptyBtn");
  emptyBtn.addEventListener("click", function(event) {
    shoppingCart.splice(0, shoppingCart.length);
    getTotal();
    drawOutShoppingCart();
  });
}
function removeProduct() {
  let btn = document.getElementsByClassName("removeItemBtn");
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function(event) {
      let knapp = btn[i].id;
      shoppingCart.splice(knapp, 1);
      getTotal();
      drawOutShoppingCart();
    });
  }
}
