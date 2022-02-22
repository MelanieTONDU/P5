// Récupération du LocalStorage //
let productStorage = JSON.parse(localStorage.getItem("product"));

if (productStorage != null){

var cartIds = [];
productStorage.forEach(product => {
    cartIds.push(product.productId);
})
var uniqueIds = [...new Set(cartIds)];
console.log(uniqueIds)

const promises = uniqueIds.map( id => {
    return fetch("http://localhost:3000/api/products/" + id).then(response => {
    return response.json();
    })})
    
Promise.all(promises).then(products => {
    let totalQuantity = 0;
    let totalPrice = 0;

    productStorage.forEach(product => {
        var found = null;
        products.forEach((p) => {
            if(p._id == product.productId) {
                found = p;
            }
        });
        console.log(found)

        // Création HTML <article> //
        let elementArticle = document.createElement('article');
        elementArticle.classList.add("cart__item");
        document.getElementById('cart__items').appendChild(elementArticle);
        elementArticle.dataset.id = product._id;
        elementArticle.dataset.color = product.optionColor;

        let elementDivImg = document.createElement('div');
        elementDivImg.classList.add("cart__item__img");
        elementArticle.appendChild(elementDivImg);

        let elementImg = document.createElement("img");
        elementDivImg.appendChild(elementImg);
        elementImg.src = found.imageUrl;
    
        elementImg.alt = "Photographie dun canapé";
    
        let elementDiv = document.createElement('div');
        elementDiv.classList.add("cart__item__content");
        elementArticle.appendChild(elementDiv);
        
        let elementDivDescription = document.createElement('div');
        elementDivDescription.classList.add("cart__item__content__description");
        elementDiv.appendChild(elementDivDescription);

        let elementTitle = document.createElement('h2');
        elementDivDescription.appendChild(elementTitle),
        elementTitle.textContent = found.name;

        let elementColor = document.createElement('p');
        elementDivDescription.appendChild(elementColor),
        elementColor.textContent = product.optionColor;

        let elementPrice = document.createElement('p');
        elementDivDescription.appendChild(elementPrice),
        elementPrice.textContent = found.price + " €";
        
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
        
    // Calcul quantité totale //
        totalQuantity += parseInt(product.optionQuantity);
        let total = document.getElementById("totalQuantity");
        total.innerHTML = totalQuantity;

    // Calcul prix total //
        totalPrice += parseInt(found.price) * parseInt(product.optionQuantity);
        let totalP = document.getElementById("totalPrice");
        totalP.innerHTML = totalPrice;

    // Bouton Supprimer //
        elementDelete.addEventListener('click', function(e){
            e.preventDefault();
                document.getElementById('cart__items').removeChild(elementArticle);
                let dataId = elementArticle.dataset.id;
                let dataColor = this.dataset.color;
                productStorage = productStorage.filter( product => product.productId != dataId || product.optionColor != color);
                localStorage.setItem("product", JSON.stringify(productStorage));

            // Modification prix et quantité total après suppression du produit//
                totalQuantity -= parseInt(quantity);
                let total = document.getElementById("totalQuantity");
                total.innerHTML = totalQuantity;
                totalPrice -= parseInt(product.price) * parseInt(quantity);
                let totalP = document.getElementById("totalPrice");
                totalP.innerHTML = totalPrice;
        })

    // Modification quantité //
        const updateQuantity = () => {
            let addQuantity = elementInput.value;
            quantity = addQuantity;
            totalQuantity += parseInt(quantity);
            let total = document.getElementById("totalQuantity");
            total.innerHTML = totalQuantity;

            totalPrice += parseInt(product.price) * parseInt(quantity);
            let totalP = document.getElementById("totalPrice");
            totalP.innerHTML = totalPrice;

            localStorage.setItem("product", JSON.stringify(productStorage));}

        elementInput.addEventListener('change', function(e){
            totalQuantity -= parseInt(quantity);
            totalPrice -= parseInt(product.price) * parseInt(quantity);
            e.preventDefault();
            updateQuantity();
        })
    })
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
    let nomRegex = /^[a-zA-Z/s]{2,20}$/;
    let addressRegex = /^[a-zA-Z0-9\s,'-]{5,30}$/;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Message d'erreur //
    if (prenomRegex.test(firstName.value) == false){
        document.getElementById("firstNameErrorMsg").innerHTML = "Ne doit comporter que des lettres et au minimum 3.";}
    else {
        document.getElementById("firstNameErrorMsg").innerHTML = "";}

    if (nomRegex.test(lastName.value) == false){
        document.getElementById("lastNameErrorMsg").innerHTML = "Ne doit comporter que des lettres.";}
    else{
        document.getElementById("lastNameErrorMsg").innerHTML = "";}

    if (addressRegex.test(address.value) == false){
        document.getElementById("addressErrorMsg").innerHTML = "L'adresse n'est pas valide.";}
    else {
        document.getElementById("firstNameErrorMsg").innerHTML = "";}

    if (nomRegex.test(city.value) == false){
        document.getElementById("cityErrorMsg").innerHTML = "Ne doit comporter que des lettres.";}
    else{
        document.getElementById("cityErrorMsg").innerHTML = "";}

    if (emailRegex.test(email.value) == false){
        document.getElementById("emailErrorMsg").innerHTML = "Email non valide.";}
    else{
        document.getElementById("emailErrorMsg").innerHTML = "";}

// Validation des données du formulaire //          
    let valid = [
        prenomRegex.test(firstName.value),
        nomRegex.test(lastName.value),
        addressRegex.test(address.value),
        nomRegex.test(city.value),
        emailRegex.test(email.value),]

    if (valid.every(element => element == true) && (productStorage.length > 0)){
        const products = productStorage.map(product => {
            return product.productId; })
    
    // Création objet Contact //
        contact = {
            firstName : firstName.value,
            lastName : lastName.value,
            address : address.value,
            city : city.value,
            email : email.value,
        }
        
        let order = {contact , products}

    // Envoi à l'API //   
        fetch("http://localhost:3000/api/products/order", {
            method : 'POST',
            headers : { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json'},
            body : JSON.stringify(order),})
        
        .then(response => {
            response.json().then(data => {
                window.location.href = window.location.origin+ ("/C:/Users/melan/desktop/P5/front/html/confirmation.html?orderId=" + data.orderId);
                localStorage.clear();
            })
        })   
    }
})
}
else{
    let elementArticle = document.createElement('article');
    elementArticle.classList.add("cart__item");
    document.getElementById('cart__items').appendChild(elementArticle);
    elementArticle.textContent = "Le panier est vide !";
}