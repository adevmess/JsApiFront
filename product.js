//recuperation des parametres de l'url, detection de l' id du produit sur la page web courante (via window)
const currentUrl = new URLSearchParams(window.location.search);
const id = currentUrl.get("id");
console.log(`on recupere bien l'ID courant : ${id}`);

/***conexion a l'API */
const apiUrl = "http://localhost:3000/api/cameras/" + id;


const getDatasOneCamera = async function () {
  try {
    let response = await fetch(apiUrl);
    if (response.ok) { //verifie si statut de type 200 ou autre
      let dataOneCamera = await response.json() //on attend la conversion du json en objet
      console.log("La demande vers l'API à fonctionné, voici les infos :");
      console.log(dataOneCamera); // on renvoie un  resultat de l'objet reçu


      //*****Template pour chaque produit*** */
      function createTemplateProduct(dataOneCamera) {

        let globalSection = document.querySelector("section");


        let generalCard = document.createElement("div");
        generalCard.className = "card mb-3 shadow";
        generalCard.innerHTML = `<img src ="${dataOneCamera.imageUrl}" alt="camera" class="card-img">`;
        globalSection.appendChild(generalCard);

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        generalCard.appendChild(cardBody);

        let cardTitle = document.createElement("h2");
        cardTitle.id = "card-title";
        cardTitle.textContent = dataOneCamera.name;
        cardBody.appendChild(cardTitle);

        let descriptionCam = document.createElement("p");
        descriptionCam.className = "card-text";
        descriptionCam.textContent = dataOneCamera.description;
        cardBody.appendChild(descriptionCam);

        let choiceLense = document.createElement("div");
        choiceLense.className = "form-group mt-5";
        choiceLense.id = "optionProd";
        choiceLense.innerHTML = "<label for='selectLentille'>Choisir le type de lentille :</label>";
        cardBody.appendChild(choiceLense);

        let formLense = document.createElement("form");
        formLense.className = "formLentille"
        choiceLense.appendChild(formLense);


        let formLenseSelect = document.createElement("select");
        formLenseSelect.className = "choiceLenses custom-select my-1 mr-sm-2";
        formLenseSelect.innerHTML += "<option 'selected'>Lentille d'origine</option>";
        choiceLense.appendChild(formLenseSelect);


        //****fonction display choix lentiles  et implémentation dans le template*/
        let optionSelected = function (dataOneCamera) {
          let lenses = dataOneCamera.lenses;
          for (let i = 0; i < lenses.length; i++) {
            console.log(`la boucle renvoie bien l'option du produit : ${lenses[i]}`);
            document.createElement("option");
            formLenseSelect.innerHTML += `<option>${lenses[i]}</option>`;
          }
        }
        optionSelected(dataOneCamera)


        let choiceQuantity = document.createElement("div");
        choiceQuantity.className = "form-group-Quantite mt-3";
        choiceQuantity.id = "productQuantity";
        choiceQuantity.innerHTML = `<label for="q">Quantité: </label>`;
        cardBody.appendChild(choiceQuantity);


        let choiceQuantitySelect = document.createElement("select");
        choiceQuantitySelect.className = "custom-select quantity  my-1 mr-sm-2"
        choiceQuantitySelect.innerHTML = `<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>`;
        choiceQuantity.appendChild(choiceQuantitySelect);

        let PriceAndButton = document.createElement("div");
        PriceAndButton.className = "my-auto text-center";
        cardBody.appendChild(PriceAndButton);

        let prix = document.createElement("h3");
        prix.className = "my-auto text-center price";
        prix.id = "priceOfProduct";
        prix.textContent = `${dataOneCamera.price / 100} €`;
        PriceAndButton.appendChild(prix);

        let btnAddToCart = document.createElement('button')
        btnAddToCart.className = "btn btn-success";
        btnAddToCart.id = "productId";
        btnAddToCart.innerHTML = " Ajouter au panier";
        PriceAndButton.appendChild(btnAddToCart);

        StorageProduct();
      }
      createTemplateProduct(dataOneCamera)

    } // else permet de renvoyer le code erreur
    else {
      console.error('reponse serveur : ', response.status);
    }
  } catch (e) { //catch permet de capturer l'erreur
    console.log(e) //le console.log de (e) affiche l'erreur en question
  }
}
getDatasOneCamera();


//recuperation des infos du produit suite au choix du client et stockage dans le localStorage


//variables 
let StorageProduct = function () {
  let btnAddCart = document.querySelector("#productId");
  let name = document.querySelector("#card-title").textContent;
  let priceString1 = document.querySelector("#priceOfProduct").textContent;
  let priceString2 = (priceString1.substring(0, priceString1.length - 1));
  let price = parseInt(priceString2, 10);
  let count1 = document.querySelector("#productQuantity").children[1];
  console.log(`le prix est bien converti en number : ${typeof (price)}`)
  let idProduct = id;
  let options = document.querySelector("#optionProd").children[2].selectedOptions[0].value;
  let cart = [];


  //function d'enregistrement dans le localStorage
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }


  //function de creation d'objet pour stockakge dans le localStorage
  let Item = function (name, price, count, idProduct, options) {

    this.name = name;
    this.price = price;
    this.count = count;
    this.idProduct = idProduct;
    this.options = options;
  };

  //evenement au clic sur "ajouter au panier"
  btnAddCart.addEventListener("click", function (e) {
    e.preventDefault() //empeche le rafraichissement dans la page

    let count = parseInt(count1.selectedOptions[0].value, 10); // recupération de la valeur courante du select (de la quantité)

    //creation et ajout d'un objet item au panier
    function addItemToCart(name, price, count, idProduct, options) {
      //function de recuperation du local storage et verification si objet present
      function loadCart() {
        if (!cart) {
          cart = [];
        } else {
          cart = JSON.parse(localStorage.getItem("shoppingCart"));
        }
      }

      loadCart();


      // incrémentation de la quantité si meme ID
      for (let i in cart) {
        if (cart[i].idProduct == idProduct) {
          cart[i].count += count;
          console.log(cart[i].count + " produits de ce type dans le panier");
          alert("produit ajouté au panier !")
          saveCart()
          return;
        }
      }


      // sinon creation d'un nouvel objet puis enregistrement dans le panier (cart)
      let item = new Item(name, price, count, idProduct, options);
      cart.push(item);
      saveCart();
      alert("produit ajouté au panier !")
    }


    addItemToCart(name, price, count, idProduct, options)
    console.log("Le panier contient les objets suivants :");
    console.log(cart)
    saveCart();
  })
}