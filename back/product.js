// Récupération de l'id du produit grâce l'url de la page//
let str = "http://localhost:3000/api/products.html" + window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

// Récupération et intégration des données du produit //
fetch ("http://localhost:3000/api/products/" + id)
.then(response => {
  response.json().then(product => {
    let description = document.getElementById('description');
    description.innerHTML = product.description;     
      
    let name = document.getElementById('title');
    name.innerHTML =product.name;
    
    let price = document.getElementById('price');
    price.innerHTML= product.price;
    
    let image = document.querySelector(".item__img");
    image.innerHTML= '<img src="'+product.imageUrl+'" alt="Photographie dun canapé">';

    for (let i=0; i<product.colors.length; i++) {
      let newColor = document.createElement("option");
      let color = document.getElementById("colors");
      newColor.setAttribute('valeur', color[i]);
      newColor.innerHTML = product.colors[i];
      color.appendChild(newColor);
    }
  })
})

// Récupération des choix de l'utilisateur //
const addColor = document.getElementById('colors');

const addQuantity = document.getElementById('quantity');
addQuantity.addEventListener('click', function(e){
  e.preventDefault();
})

//------------------- Au clic sur "Ajouter au panier" ---------------------//
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', function(e){
  e.preventDefault();
  if (addQuantity.value < 1 || addColor.value == ""){
    alert("Oups ! Tu as oublié quelque chose ");
  }
  else if (addQuantity.value > 100){
    alert("As-tu vraiment besoin d'autant de canapé ?");
  }
  else {

  // Variable produit //
    let optionProduct = {
      productId : id,
      optionColor : addColor.value,
      optionQuantity : addQuantity.value,
    }

  // Local Storage //
  let productStorage = JSON.parse(localStorage.getItem("product"));
  
    const ChangeQuantity = () => {
      let foundProductId = productStorage.find(p => p.productId == optionProduct.productId && p.optionColor==optionProduct.optionColor);
      if(foundProductId != undefined ){
        let foundQuantity = parseInt(foundProductId.optionQuantity);
        let foundOptionQuantity = parseInt(optionProduct.optionQuantity);
        foundProductId.optionQuantity = foundQuantity + foundOptionQuantity;
      }
      else{
        productStorage.push(optionProduct);
      }
    }

    if(productStorage){
      ChangeQuantity();
      localStorage.setItem("product", JSON.stringify(productStorage));
    }
    else{
      productStorage = [];
      productStorage.push(optionProduct);
      localStorage.setItem("product", JSON.stringify(productStorage));
    }
  }
})


//-----------------------------------------------------------//  