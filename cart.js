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
function subTotal(carte) {
  console.log(carte.name + " : " + (carte.count * carte.price));
  return carte.count * carte.price;
}




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
  thUnitPrice.id = "unitPrice";

  tr.appendChild(thUnitPrice);

  let thsubPrice = document.createElement("td");
  thsubPrice.textContent = subTotal(cart);
  thsubPrice.id = "subPrice";

  tr.appendChild(thsubPrice);

  let btnDelete = document.createElement("button");
  btnDelete.className = "btn my-2 mr-3 btn-danger btn-sm";
  btnDelete.innerHTML = "X";
  btnDelete.id = cart.idProduct;

  tr.appendChild(btnDelete);

  let btnDel = document.getElementById(cart.idProduct);
  console.log(btnDel);
  // btnDel.addEventListener("click", function () {
  //   let reponse = window.confirm("vouler vous supprimer le Panier ?");
  //   if (!reponse) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   } else {
  //     for (p in cart) {
  //       cart.splice(p, 1);
  //       e.stopPropagation();
  //       document.location.reload(true);
  //       break
  //     }
  //     saveCart()
  //   }
  // })


  //retour de notre valeur sous Total
  return subTotal(cart);
}

var prixTotalPanier = 0;


//création du template en bouclant sur chaque produit de notre panier[i]
for (let i = 0; i < cart.length; i++) {
  // console.log(cart);
  prixTotalPanier += recapTemplateProd(cart[i]);
}


//affichage Prix Total 
{
  let trTotal = document.createElement("tr");
  productResume.appendChild(trTotal);

  let tdTotalCartPrx = document.createElement("th");
  tdTotalCartPrx.id = "totalCartPrice";
  tdTotalCartPrx.textContent = "prix Total : " + prixTotalPanier + "€";

  trTotal.appendChild(tdTotalCartPrx);

  //rappel du prix total
  document.querySelector("#rapelPrixTotal").textContent = "prix Total : " + prixTotalPanier + "€";
}

//enregistre les changement dans le localStorage
function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}




//supprimr un produit
let deleteOneP = document.querySelectorAll("#subPrice").NodeList;
for (i = 0; i < deleteOneP.length; i++) {
  deleteOneP[i].addEventListener("click", function (e) {
    let reponse = window.confirm("vouler vous supprimer ce produit ?");
    if (!reponse) {
      event.preventDefault()
    } else {
      function removeItemFromCart(name) {
        for (i in cart) {
          if (cart[i].id === name) {
            cart.splice(i, 1);
            document.location.reload(true);
            break
          }
        }
        saveCart()
      }
    }
    removeItemFromCart();
  })
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