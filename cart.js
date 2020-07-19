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
// function toNumber(priceString) {
//   let etapeString = priceString.substring(0, cart[0].price.length - 1);
//   return resultToNumber = parseInt(etapeString, 10);
// }

// //sous total
// function subTotal() {
//   for (let i = 0; i < cart.length; i++) {
//     let item = cart[i]
//     // console.log(item);
//     let subTotalCart = 0;
//     subTotalCart += item.count * toNumber(item.price);
//     console.log(typeof (subTotalCart));
//     console.log(subTotalCart);

//   }

// }
// subTotal()



//suppression article

//template Produits
function recapTemplateProd(cart) {

  let productResume = document.querySelector("#productResume");
  let tr = document.createElement("tr");
  productResume.appendChild(tr);

  let thName = document.createElement("td");
  thName.id = "nameOfProd";
  thName.textContent = cart.name;
  tr.appendChild(thName);

  let thCount = document.createElement("td");
  thCount.textContent = cart.count;
  thCount.id = "countOfProd";
  tr.appendChild(thCount);

  let thsubPrice = document.createElement("td");
  thsubPrice.textContent = cart.price;
  thsubPrice.id = "subPrice";
  tr.appendChild(thsubPrice);

  let btnDelete = document.createElement("button");
  btnDelete.className = "btn my-2 btn-danger btn-sm";
  btnDelete.innerHTML = "X";
  btnDelete.id = "deleteProduct";
  tr.appendChild(btnDelete);


} //création du template en bouclant sur chaque produit de notre panier[i]
for (let i = 0; i < cart.length; i++) {
  console.log(cart);
  recapTemplateProd(cart[i]);
}


//template Prix Total
function recapTemplateTotal() {
  let trTotal = document.createElement("tr");
  productResume.appendChild(trTotal);

  let tdTotalCartPrx = document.createElement("th");
  tdTotalCartPrx.id = "totalCartPrice";
  tdTotalCartPrx.textContent = "prix Total : ";
  trTotal.appendChild(tdTotalCartPrx);
}
recapTemplateTotal()


//enregistre les changement dans le localStorage
function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}



//supprimr un produit (pb supprime tjrs le 1er element du )
let deleteOneP = document.querySelectorAll("#deleteProduct");
for (i = 0; i < deleteOneP.length; i++) {
  deleteOneP[i].addEventListener("click", function (e) {
    let reponse = window.confirm("vouler vous supprimer ce produit ?");
    if (!reponse) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      function removeItemFromCart() {
        for (p in cart) {
          console.log(cart[p].name)
          if (cart[p].name) {
            cart.splice(cart[p].name, 1);
            e.stopPropagation();
            console.log(e.target);
            console.log(e.currentTarget);
            document.location.reload(true);
            break
          }

        }
        saveCart()
      }
    }
    removeItemFromCart();
  }, true);
}

// suppression total du panier
let deleteP = document.querySelector("#deletePanier");


deleteP.addEventListener("click", function (e) {
  let reponse = window.confirm("vouler vous supprimer le Panier ?");
  if (!reponse) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    for (i in cart) {
      cart.splice(i);
      e.stopPropagation();
      document.location.reload(true);
      break
    }
    saveCart()
  }
})