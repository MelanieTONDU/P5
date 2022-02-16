// Récupération du LocalStorage //
let productStorage = JSON.parse(localStorage.getItem("product"));

let totalPrice = 0;
let totalQuantity = 0;

// Boucle pour chaque porduit du LocalStorage //
productStorage.forEach(product => {

// Calcul quantité totale //
    totalQuantity += parseInt(product.optionQuantity);
    let total = document.getElementById("totalQuantity");
    total.innerHTML = totalQuantity;

// Recherche des informations du produit dans l'API //
    let id = product.productId;
    fetch ("http://localhost:3000/api/products/" + id)
    .then(response => {response.json().then(products => {

// Calcul prix total //
        totalPrice += parseInt(products.price) * parseInt(product.optionQuantity);
        let totalP = document.getElementById("totalPrice");
        totalP.innerHTML = totalPrice;

// Création HTML <article> //
        let elementArticle = document.createElement('article');
        elementArticle.classList.add("cart__item");
        document.getElementById('cart__items').appendChild(elementArticle);
        elementArticle.dataset.id = id;
        elementArticle.dataset.color = product.optionColor;

        let elementDivImg = document.createElement('div');
        elementDivImg.classList.add("cart__item__img");
        elementArticle.appendChild(elementDivImg);

        let elementImg = document.createElement("img");
        elementDivImg.appendChild(elementImg);
        elementImg.src = products.imageUrl;
        elementImg.alt = "Photographie dun canapé";
    
        let elementDiv = document.createElement('div');
        elementDiv.classList.add("cart__item__content");
        elementArticle.appendChild(elementDiv);
        
        let elementDivDescription = document.createElement('div');
        elementDivDescription.classList.add("cart__item__content__description");
        elementDiv.appendChild(elementDivDescription);

        let elementTitle = document.createElement('h2');
        elementDivDescription.appendChild(elementTitle),
        elementTitle.textContent = products.name;

        let elementColor = document.createElement('p');
        elementDivDescription.appendChild(elementColor),
        elementColor.textContent = product.optionColor;

        let elementPrice = document.createElement('p');
        elementDivDescription.appendChild(elementPrice),
        elementPrice.textContent = products.price + " €";
        
        let elementSetting = document.createElement('div');
        elementSetting.classList.add("cart__item__content__settings");
        elementDivDescription.appendChild(elementSetting);

        let elementQuantity = document.createElement('div');
        elementQuantity.classList.add("cart__item__content__settings__quantity");
        elementSetting.appendChild(elementQuantity);

        let elementQte = document.createElement('p');
        elementQuantity.appendChild(elementQte);
        elementQte.textContent = "Qté : ";

        let elementInput = document.createElement('input');
        elementInput.classList.add("itemQuantity");
        elementInput.value = product.optionQuantity;
        elementInput.type = "number";
        elementQuantity.appendChild(elementInput);

        let elementDelete = document.createElement('div');
        elementDelete.classList.add("cart__item__content__settings__delete");
        elementDiv.appendChild(elementDelete);
        
        let elementDeleteItem = document.createElement("p");
        elementDeleteItem.classList.add("deleteItem");
        elementDelete.appendChild(elementDeleteItem);
        elementDeleteItem.textContent = "Supprimer";

    // Bouton Supprimer //
        elementDelete.addEventListener('click', function(e){
            e.preventDefault();
            let color = product.optionColor;
            document.getElementById('cart__items').removeChild(elementArticle);
            productStorage = productStorage.filter( product => product.productId != id || product.optionColor != color);
            localStorage.setItem("product", JSON.stringify(productStorage));

    // Modification prix et quantité total après suppression du produit//
            totalQuantity -= parseInt(product.optionQuantity);
            let total = document.getElementById("totalQuantity");
            total.innerHTML = totalQuantity;
            totalPrice -= parseInt(products.price) * parseInt(product.optionQuantity);
            let totalP = document.getElementById("totalPrice");
            totalP.innerHTML = totalPrice;
            console.log(productStorage)
        })

    // Modification quantité //
        const updateQuantity = () => {
            let addQuantity = elementInput.value;
            product.optionQuantity = addQuantity;
            totalQuantity += parseInt(addQuantity);
            let total = document.getElementById("totalQuantity");
            total.innerHTML = totalQuantity;

            totalPrice += parseInt(products.price) * parseInt(addQuantity);
            let totalP = document.getElementById("totalPrice");
            totalP.innerHTML = totalPrice;

            localStorage.setItem("product", JSON.stringify(productStorage));}
        
        elementInput.addEventListener('change', function(e){
            totalQuantity -= parseInt(product.optionQuantity);
            totalPrice -= parseInt(products.price) * parseInt(product.optionQuantity);
            e.preventDefault();
            updateQuantity();
        })
    })})
})

// -------------------- Formulaire --------------------------//
const form = document.querySelector(".cart__order__form");

form.addEventListener('submit', function(e){
    e.preventDefault();

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");

    let prenomRegex = /^[a-zA-Z/s]{3,20}$/;
    let nomRegex = /^[a-zA-Z/s]+$/;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Message d'erreur //
        if (prenomRegex.test(firstName.value) == false){
            document.getElementById("firstNameErrorMsg").innerHTML = "Ne doit comporter que des lettres et au minimum 3.";}
        else {
            document.getElementById("firstNameErrorMsg").innerHTML = "";}

        if (nomRegex.test(lastName.value) == false){
            document.getElementById("lastNameErrorMsg").innerHTML = "Ne doit comporter que des lettres";}
        else{
            document.getElementById("lastNameErrorMsg").innerHTML = "";}
    
        if (nomRegex.test(city.value) == false){
            document.getElementById("cityErrorMsg").innerHTML = "Ne doit comporter que des lettres";}
        else{
            document.getElementById("cityErrorMsg").innerHTML = "";}

        if (emailRegex.test(email.value) == false){
            document.getElementById("emailErrorMsg").innerHTML = "Email non valide";}
        else{
            document.getElementById("emailErrorMsg").innerHTML = "";}

    let contact = {
        prenom : firstName.value,
        nom : lastName.value,
        adresse : address.value,
        ville : city.value,
        email : email.value,
    }

    console.log(contact);
    console.log(productStorage)
})