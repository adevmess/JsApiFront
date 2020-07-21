// // recuperation des parametres de l'url (via la proprieté location) afin de detecter la presence d'un id du produit en particulier sur la page web en cours (via window)

//on recupere la valeur associé a ce parametre (id)
const currentUrl = new URLSearchParams(window.location.search);
const id = currentUrl.get("id");
console.log(id);

/***conexion a l'API */
const apiUrl = "http://localhost:3000/api/cameras/" + id;


const getDatasCamera = async function () {
  try {
    let response = await fetch(apiUrl);
    if (response.ok) { //verifie si statut de type 200 ou autre
      let data = await response.json() //on attend la conversion du json en objet
      console.log("c'est ok");
      console.log(data); // on renvoie un  resultat de l'objet reçu


      //*****Template pour chaque produit*** */
      function createtemplateProduct(data) {

        let globalSection = document.querySelector("section");


        let generalCard = document.createElement("div");
        generalCard.className = "card mb-3 shadow";
        generalCard.innerHTML = `<img src ="${data.imageUrl}" alt="camera" class="card-img">`;
        globalSection.appendChild(generalCard);

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        generalCard.appendChild(cardBody);

        let cardTitle = document.createElement("h2");
        cardTitle.id = "card-title";
        cardTitle.textContent = data.name;
        cardBody.appendChild(cardTitle);

        let descriptionCam = document.createElement("p");
        descriptionCam.className = "card-text";
        descriptionCam.textContent = data.description;
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


        //****fonction display choix lentiles  */
        let optionSelected = function (data) {
          let lenses = data.lenses;
          for (let i = 0; i < lenses.length; i++) {
            console.log(lenses[i]);
            let option = document.createElement("option");
            formLenseSelect.innerHTML += `<option>${lenses[i]}</option>`;
          }
        }
        optionSelected(data)

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
        prix.textContent = data.price / 100 + "€";
        PriceAndButton.appendChild(prix);

        let btnAddToCart = document.createElement('button')
        btnAddToCart.className = "btn btn-success";
        btnAddToCart.id = "productId";
        btnAddToCart.innerHTML = " Ajouter au panier";
        PriceAndButton.appendChild(btnAddToCart);

        StorageProduct();
      }
      createtemplateProduct(data)

    } // else permet de renvoyer le code erreur
    else {
      console.error('reponse serveur : ', response.status);
    }
  } catch (e) { //catch permet de capturer l'erreur
    console.log(e) //le console.log de (e) affiche l'erreur en question
  }
}
getDatasCamera();

//variables concernant recuperation des infos du produit
let StorageProduct = function () {
  let btnAddCart = document.querySelector("#productId");
  // recuperation des infos du produit
  let name = document.querySelector("#card-title").textContent;
  let priceString = document.querySelector("#priceOfProduct").textContent;
  let pr = (priceString.substring(0, priceString.length - 1));
  let price = parseInt(pr, 10);
  let opt = document.querySelector("#productQuantity").children[1];
  console.log("voici le prix :" + price);
  console.log(typeof (price))
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
    //empeche le rafraichissement dans la page
    e.preventDefault()

    // recupération de la valeur courante du select 
    let count = parseInt(opt.selectedOptions[0].value, 10);

    //ajout d'un objet item au panier
    function addItemToCart(name, price, count, idProduct, options) {

      //function de recuperation du local storage
      function loadCart() {
        if (!cart) {
          cart = [];
        } else {
          cart = JSON.parse(localStorage.getItem("shoppingCart"));
        }
      }
      loadCart()
      saveCart();

      //ajout des items + quantité
      for (let i in cart) {
        if (cart[i].idProduct == idProduct) {
          cart[i].count += count;
          console.log(cart[i].count + " produits de ce type dans le panier");
          alert("produit ajouté au panier !")
          saveCart()
          return;
        }
      }
      let item = new Item(name, price, count, idProduct, options);
      cart.push(item);
      saveCart();
      alert("produit ajouté au panier !")
    }
    addItemToCart(name, price, count, idProduct, options)
    console.log(cart)
    saveCart();
  })
}