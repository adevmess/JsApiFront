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



//sous total
function subTotal(c, p) {
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i]
    console.log(item);
    // console.log(typeof (item.price));
    let subTotalCart = 0;
    subTotalCart += (c * p);
    // console.log(typeof (subTotalCart));
    console.log(item.name + " : " + subTotalCart);
    return subTotalCart
  }

}




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

  let thUnitPrice = document.createElement("td");
  thUnitPrice.textContent = cart.price;
  thUnitPrice.id = "subPrice";
  tr.appendChild(thUnitPrice);

  let thsubPrice = document.createElement("td");
  thsubPrice.textContent = subTotal(cart.price, cart.count);
  thsubPrice.id = "subPrice";
  tr.appendChild(thsubPrice);

  let btnDelete = document.createElement("button");
  btnDelete.className = "btn my-2 mr-3 btn-danger btn-sm";
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
          console.log(cart[p])
          if (cart[p]) {
            cart.splice(cart[p], 1);
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