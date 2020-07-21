//recupération de l'URL courante
let paramsInfo = (new URL(document.location)).searchParams;

//recupération de l'Id et du prix + verification
let id = paramsInfo.get('id');
console.log(`voici l'id recupéré : ${id}`)
let price = paramsInfo.get('price');
console.log(`voici le prix recupéré : ${price}`)

//affichage
document.querySelector("#infosRecapConfirmation").innerHTML = `Votre commande n°: ${id} <br> d'un montant de : ${price} € est validée`;