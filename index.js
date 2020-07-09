//connexion a l'API
const apiUrl = "http://localhost:3000/api/cameras";

const getDataCamera = async function () {
  try {
    let response = await fetch(apiUrl);
    if (response.ok) { //verifie si statut de type 200 ou autre
      let data = await response.json() //on attend la conversion du json en objet
      console.log("c'est ok");
      console.log(data); // on renvoie un  resultat de l'objet reçu

      //puis on parametre notre fonction de creation d'elements qui sera utilisé par la boucle for
      function createNewBloc(data) {

        let globalSection = document.getElementById("section");

        let generalCard = document.createElement("div");
        generalCard.className = "card mb-3 shadow ";
        globalSection.appendChild(generalCard);


        let subDivRow = document.createElement("div");
        subDivRow.className = "row no-gutters ";
        generalCard.appendChild(subDivRow);


        let subDivCol1 = document.createElement("div");
        subDivCol1.className = "col-lg-4 ";
        subDivCol1.innerHTML = `<img src ="${data.imageUrl}" alt="camera" class="card-img">`;
        subDivRow.appendChild(subDivCol1);


        let subDivCol2 = document.createElement("div");
        subDivCol2.className = "col-lg-5 ";
        subDivRow.appendChild(subDivCol2);

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        subDivCol2.appendChild(cardBody);

        let cardTitle = document.createElement("h2");
        cardTitle.className = "card-title";
        cardBody.textContent = data.name;
        subDivCol2.appendChild(cardTitle);


        let descriptionCam = document.createElement("p");
        descriptionCam.className = "card-text ml-3 descriptionCam";
        descriptionCam.textContent = data.description;
        subDivCol2.appendChild(descriptionCam);


        let subDivCol3 = document.createElement("div");
        subDivCol3.className = "col-lg-3 my-auto text-center ";
        subDivRow.appendChild(subDivCol3);

        let prix = document.createElement("h3");
        prix.className = "price";
        prix.textContent = data.price / 100 + "€";
        subDivCol3.appendChild(prix);

        let btnContinuer = document.createElement('div')
        btnContinuer.className = "btn btn-dark  ";
        btnContinuer.innerHTML = `<a href="product.html?id=${data._id}">Continuer</a>`;
        subDivCol3.appendChild(btnContinuer);
        console.log(btnContinuer); //a enlever 

      } // Notre boucle for permet d'iterer sur chaque produit et de creer les elements correspondants en utilsant la fonction precedement definie
      for (let i = 0; i < data.length; i++) {
        console.log(data);
        createNewBloc(data[i]);
      }
    } // else permet de renvoyer le code erreur
    else {
      console.error('reponse serveur : ', response.status);
    }
  } catch (e) { //catch permet de capturer l'erreur
    console.log(e) //le console.log de (e) affiche l'erreur en question
  }
}
getDataCamera();