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
console.log(`Voici ce que contient le panier : `)
console.log(cart);

//enregistre les changement dans le localStorage
function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}


//sous total
function subTotal(element) {
  console.log(element.name + " : " + (element.count * element.price));
  return element.count * element.price;
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


//template Produits
function recapTemplateCommande(cart) {
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

}


// initialisation de la variable concernant le prix total
let prixTotalPanier = 0;


//affichage de tous les produits du panier
for (let i = 0; i < cart.length; i++) {
  console.log(cart);
  recapTemplateCommande(cart[i]); // affichage d'un produit en particulier
  prixTotalPanier += subTotal(cart[i]); //calcul du prix total via chaque sous total de chaque produit

}


//  affichage du Prix Total dans tableau
{
  let trTotal = document.createElement("tr");
  productResume.appendChild(trTotal);

  let tdTotalCartPrx = document.createElement("th");
  tdTotalCartPrx.id = "totalCartPrice";
  tdTotalCartPrx.textContent = "prix Total : " + prixTotalPanier + "€";

  trTotal.appendChild(tdTotalCartPrx);

  //rappel du prix total bas de formulaire
  document.querySelector("#rapelPrixTotal").textContent = "prix Total : " + prixTotalPanier + "€";
}



//variable de stockage des data a envoyer au serveur :
// => (product[id des produits commandés], 
// => contact{ infos valides du formulaire })
let infosServeur = {
  products: [],
  contact: {}
};


//recuperation des id de chaque produit du cart
let recupIdProductCart = function () {
  for (i = 0; i < cart.length; i++) {
    let recupIdProd = cart[i]["idProduct"]
    infosServeur.products.push(recupIdProd);
    console.log("voici les ID envoyés vers products : ")
    console.log(infosServeur.products)

  }
}
recupIdProductCart()


// champs du formulaire
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
const btnCommander = document.querySelector("#btnCommander");


//msg d'erreur du formulaire
const firstNameError = document.querySelector("#firstNameErrorMsg");
const lastNameError = document.querySelector("#lastNameErrorMsg");
const addressError = document.querySelector("#addressErrorMsg");
const cityError = document.querySelector("#cityErrorMsg");
const emailError = document.querySelector("#emailErrorMsg");


//fonction de verfication (lastname ,firstName, city)
function verifName(champ, msgErreur) {
  //accepte seulement les lettres, apostrophes, tirets et espaces
  //pas de tiret en debut et fin de champ
  //majuscule seulement au debut
  // accepte champ >=2 et <=25
  const regexNom = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;


  //si format incorrect : false, si format correct : true
  if ((regexNom.test(champ.value) == false) || (champ.value.length < 2 || champ.value.length > 25)) {
    msgErreur.textContent = "Format incorrect";
    msgErreur.style.color = "red";
    return false;
  } else {
    msgErreur.textContent = "";
    return true;
  }
}


//fonction de verfication (email)
function verifEmail(champ, msgErreur) {
  // Correspond à une chaîne de la forme bbb@yyy.zzz
  const regexEmail = /.+@.+\..+/;

  //si format incorrect : false, si format correct : true
  if (!regexEmail.test(champ.value)) {
    msgErreur.textContent = "Adresse invalide";
    msgErreur.style.color = "red";
    return false;
  } else {
    msgErreur.textContent = "";
    return true;
  }
}


//fonction de verfication (address)
function verifAddress(champ, msgErreur) {
  // doit contenir des chiffres, pas de caracteres spéciaux;
  const regexNumber = /[0-9]/;
  const regexSpeciaux = /[$&+:;=?@#|'<>.°^*()%!"{}_"`¨~]/;

  //si format incorrect : false, si format correct : true
  if (regexSpeciaux.test(champ.value)) {
    msgErreur.textContent = "Format incorrect";
    msgErreur.style.color = "red";
    return false;
  }
  if (!regexNumber.test(champ.value)) {
    msgErreur.textContent = "Format incorrect";
    msgErreur.style.color = "red";
    return false;
  } else {
    msgErreur.textContent = "";
    return true;
  }
}


//verification du formulaire lors de l'évenement et post final vers serveur
btnCommander.addEventListener("click", function () {
  verifName(firstName, firstNameError);
  verifName(lastName, lastNameError);
  verifName(city, cityError);
  verifEmail(email, emailError);
  verifAddress(address, addressError);


  //verification des Boolean ( true permet de lancer le reste du processus )
  if (verifName(firstName, firstNameError) &&
    verifName(lastName, lastNameError) &&
    verifName(city, cityError) &&
    verifEmail(email, emailError) && verifAddress(address, addressError)) {
    console.log("les datas du formulaires sont valides");


    //envoi des data valides du formulaire dans notre objet
    const formulaireDataOk = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    }


    //verification des data et stringification avant le post vers le serveur
    infosServeur.contact = formulaireDataOk;
    console.log("Voici le resultat de l'objet contact : ");
    console.log(infosServeur.contact);
    console.log("objet 'info serveur' avant stringification : ");
    console.log(infosServeur);
    let finalDataIdAndContact = JSON.stringify(infosServeur)
    console.log("Voici le resultat stringifié: ");
    console.log(finalDataIdAndContact)


    // post de l'objet "contact" vers API
    const postApiUrl = "http://localhost:3000/api/cameras/order";

    const postdataCart = async function () {
      try {
        let response = await fetch(postApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json" //type de data envoyé au serveur
          },
          body: finalDataIdAndContact //body stringifié
        });
        if (response.ok) {
          let data = await response.json()
          console.log("Le post vers le srveur à fonctionné, voici les infos recupéres :");
          console.log(data); //affiche l'objet retourné par notre serveur

          //recupération des infos nécéssaires à la confirmation
          let idConfirmation = (data["orderId"]) //id
          console.log(idConfirmation);

          let PrixConfirmation = (prixTotalPanier) //prix
          console.log(PrixConfirmation);


          //redirection vers la page de confirmation de commande (envoie des infos nécéssaires dans l'URL)
          window.location = `confirmation.html?id=${data["orderId"]}&price=${PrixConfirmation}`;

        } else {
          console.error('reponse serveur : ', response.status);
        }
      } catch (e) { //catch permet de capturer l'erreur
        console.log(e) //le console.log de (e) affiche l'erreur en question
      }
    }
    postdataCart();
    localStorage.clear();
  }
});