// window.onload = function displayCommande() {
//   let cart = [];

//   //function de recuperation du local storage
//   if (cart) {
//     function loadCart() {
//       cart = JSON.parse(localStorage.getItem("shoppingCart"));
//       saveCart()
//     }
//   }
//   loadCart();
//   console.log(cart)

// }





// recuperation de notre panier via le localStorage
let cart = []

function loadCart() {
  if (!cart) {
    cart = [];
  } else {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }
}
loadCart()

//fonction de transformation du prix en number
function toNumber(priceString) {
  let etapeString = priceString.substring(0, cart[0].price.length - 1);
  return resultToNumber = parseInt(etapeString, 10);
}

//sous total
function subTotal() {
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i]
    // console.log(item);
    let subTotalCart = 0;
    subTotalCart += item.count * toNumber(item.price);
    console.log(subTotalCart);

  }

}
subTotal()

//suppression article

//template
function recapTemplate() {
  //  let cardTitle = document.createElement("h2");
  //  cardTitle.id = "card-title";
  //  cardTitle.textContent = cloneOneCamera.name;
  //  cardBody.appendChild(cardTitle);

  let productResume = document.querySelector("#productResume");

  let tr = document.createElement("tr");
  productResume.appendChild(tr);

  let thName = document.createElement("td");
  thName.id = "nameOfProd";
  thName.innerHTML = "1111111";
  tr.appendChild(thName);

  let thCount = document.createElement("td");
  thCount.innerHTML = "22222222";
  thCount.id = "countOfProd";
  tr.appendChild(thCount);

  let thsubPrice = document.createElement("td");
  thsubPrice.innerHTML = "33333";
  thsubPrice.id = "subPrice";
  tr.appendChild(thsubPrice);

  let subToTal = document.createElement("td");
  subToTal.innerHTML = "subtot";
  subToTal.id = "subTotal";
  tr.appendChild(subToTal);

  let trTotal = document.createElement("tr");
  productResume.appendChild(trTotal);

  let tdTotalCartPrx = document.createElement("td");
  tdTotalCartPrx.id = "totalCartPrice";
  tdTotalCartPrx.innerHTML = "prix Total : ";
  trTotal.appendChild(tdTotalCartPrx);

  // for (let i = 0; i < cart.length; i++) {
  //   console.log(cart);
  //   (cart[i]);
  // }
}
recapTemplate() //ajouter cart ici