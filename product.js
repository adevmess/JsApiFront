/***conexion a l'API */
const apiUrl = "http://localhost:3000/api/cameras";

// // recuperation des parametres de l'url (via la proprieté location) afin de detecter la presence d'un id en particulier su la page web en cours (via window)


const currentUrl = new URLSearchParams(window.location.search);
//on recupere la valeur associé a ce parametre (id)
const id = currentUrl.get("id");
console.log(id);



const getDatasCamera = async function () {
  try {
    let response = await fetch(apiUrl);
    if (response.ok) { //verifie si statut de type 200 ou autre
      let data = await response.json() //on attend la conversion du json en objet
      console.log("c'est ok");
      console.log(data); // on renvoie un  resultat de l'objet reçu


      /****function recup object dans le array  */
      //renvoi l'objet qui contient comme valeur l'id courant
      let product = function (data) {
        return oneCamera = data.find(camera => camera._id === id);

      }
      product(data)
      console.log(oneCamera);

      // notre objet camera cloné en local ( voir response.clone())
      let cloneOneCamera = Object.assign({}, oneCamera);
      console.log(cloneOneCamera);

      //*****Template pour chaque produit*** */
      function createtemplateProduct(cloneOneCamera) {

        let globalSection = document.querySelector("section");


        let generalCard = document.createElement("div");
        generalCard.className = "card mb-3 shadow";
        generalCard.innerHTML = `<img src ="${cloneOneCamera.imageUrl}" alt="camera" class="card-img">`;
        globalSection.appendChild(generalCard);

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        generalCard.appendChild(cardBody);

        let cardTitle = document.createElement("h2");
        cardTitle.id = "card-title";
        cardTitle.textContent = cloneOneCamera.name;
        cardBody.appendChild(cardTitle);

        let descriptionCam = document.createElement("p");
        descriptionCam.className = "card-text";
        descriptionCam.textContent = cloneOneCamera.description;
        cardBody.appendChild(descriptionCam);

        let choiceLense = document.createElement("div");
        choiceLense.className = "form-group mt-5";
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
        let optionSelected = function (cloneOneCamera) {
          let lenses = cloneOneCamera.lenses;
          for (let i = 0; i < lenses.length; i++) {
            console.log(lenses[i]);
            let option = document.createElement("option");
            formLenseSelect.innerHTML += `<option>${lenses[i]}</option>`;


          }
        }
        optionSelected(cloneOneCamera)

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
        prix.textContent = cloneOneCamera.price / 100 + "€";
        PriceAndButton.appendChild(prix);

        let btnAddToCart = document.createElement('button')
        btnAddToCart.className = "btn btn-dark";
        btnAddToCart.id = "productId";
        btnAddToCart.innerHTML = `<a href="#?id=${cloneOneCamera._id}">Ajouter au panier</a>`;
        PriceAndButton.appendChild(btnAddToCart);

        cartAndLocalStorageProduct();


      }
      createtemplateProduct(oneCamera)



    } // else permet de renvoyer le code erreur
    else {
      console.error('reponse serveur : ', response.status);
    }
  } catch (e) { //catch permet de capturer l'erreur
    console.log(e) //le console.log de (e) affiche l'erreur en question
  }
}
getDatasCamera();


let cartAndLocalStorageProduct = function () {
  let btnAddCart = document.querySelector("#productId");
  btnAddCart.addEventListener("click", function () {
    alert("salut");


  })
}


// ********fonction panier*********//

// ********localStorage*********//