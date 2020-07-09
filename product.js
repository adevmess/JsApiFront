// // recuperation des parametres de l'url (via la proprieté location) afin de detecter la presence d'un id en particulier su la page web en cours (via window)
// // let position = window.location.href.indexOf("?");
// // console.log(position);
// //-1 signifie que l'occurence n'est pas trouvée
// let position = window.location.href.indexOf("?");
// console.log(position); //on extraie donc l'id
// // ici on enchaine notre fonction d'elements (page produit)
// // puis boucle
// if (position == -1) {
//   getDataCamera();
// } else {
//   let id = window.location.href.substr(position + 1);
//   console.log(id);


/***conexion a l'API */
const apiUrl = "http://localhost:3000/api/cameras";

const currentUrl = new URLSearchParams(window.location.search);
const id = currentUrl.get("id"); //on recupere la valeur associé a ce parametre (id)
console.log(id);

/****function recup object via api */



const getDatasCamera = async function () {
  try {
    let response = await fetch(apiUrl);
    if (response.ok) { //verifie si statut de type 200 ou autre
      let data = await response.json() //on attend la conversion du json en objet
      console.log("c'est ok");
      console.log(data); // on renvoie un  resultat de l'objet reçu

      /****function recup object via api */

      let product = function (data) {
        return oneCamera = data.find(camera => camera._id === id);
        //renvoi objet correspondant a l'id
      }
      product(data)
      console.log(oneCamera);

      function createtemplateProduct(oneCamera) {

        let globalSection = document.querySelector("section");


        let generalCard = document.createElement("div");
        generalCard.className = "card mb-3 shadow ";
        generalCard.innerHTML = `<img src ="${oneCamera.imageUrl}" alt="camera" class="card-img">`;
        globalSection.appendChild(generalCard);

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        generalCard.appendChild(cardBody);

        let cardTitle = document.createElement("h2");
        cardTitle.className = "card-title";
        cardTitle.textContent = oneCamera.name;
        cardBody.appendChild(cardTitle);

        let descriptionCam = document.createElement("p");
        descriptionCam.className = "card-text";
        descriptionCam.textContent = oneCamera.description;
        cardBody.appendChild(descriptionCam);

        let choiceLense = document.createElement("div");
        choiceLense.className = "form-group mt-5 ";
        choiceLense.innerHTML = "<label for='selectLentille'>Choisir le type de lentille :</label>";
        cardBody.appendChild(choiceLense);

        let formLense = document.createElement("form");
        formLense.className = "formLentille"
        choiceLense.appendChild(formLense);

        let formLenseSelect = document.createElement("select");
        formLenseSelect.className = "custom-select my-1 mr-sm-2";
        formLenseSelect.innerHTML = ` <option selected>Lentille d'origine</option> < option value = '1' > Anastigmat spécial f / 3.5, 50 mm < /option> <option value = '2' > Anastigmat f / 4.5, 51 mm < /option> <
        option value = '3' > Anastigmat spécial f / 6.3, 130 mm < /option>"
        choiceLense.appendChild(formLenseSelect)`;
        choiceLense.appendChild(formLenseSelect);

        let choiceQuantity = document.createElement("div");
        choiceQuantity.className = "form-group-Quantite mt-3";
        choiceQuantity.innerHTML = `<label for="q ">Quantité: </label>`;
        cardBody.appendChild(choiceQuantity);


        let choiceQuantitySelect = document.createElement("select");
        choiceQuantitySelect.className = "custom-select  my-1 mr-sm-2"
        choiceQuantitySelect.innerHTML = `<option value="1">oneCamera.value</option><option value="2">2</option><option value="3">3</option>`;
        choiceQuantity.appendChild(choiceQuantitySelect);

        let PriceAndButton = document.createElement("div");
        PriceAndButton.className = "col my-auto text-center ";
        cardBody.appendChild(PriceAndButton);

        let prix = document.createElement("h3");
        prix.className = "price";
        prix.textContent = oneCamera.price / 100 + "€";
        cardBody.appendChild(prix);

        let btnContinuer = document.createElement('div')
        btnContinuer.className = "btn btn-dark  ";
        btnContinuer.innerHTML = `<a href="resumePanier.html?id=${oneCamera._id}">Ajouter au panier</a>`;
        cardBody.appendChild(btnContinuer);
        console.log(btnContinuer); //a enlever 
      }
      createtemplateProduct(oneCamera)


      // Notre boucle for permet d'iterer sur chaque produit et de creer les elements correspondants en utilsant la fonction precedement definie
      // for (let i = 0; i < data.length; i++) {
      //   console.log(data);
      //   templateProduct(data[i]);
      // }
    } // else permet de renvoyer le code erreur
    else {
      console.error('reponse serveur : ', response.status);
    }
  } catch (e) { //catch permet de capturer l'erreur
    console.log(e) //le console.log de (e) affiche l'erreur en question
  }
}
getDatasCamera();

//*****TEmplate pour chaque produit*** */