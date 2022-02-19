let orderIdStorage = localStorage.getItem("orderId");
orderIdStorage = [];
orderIdStorage.push(data.orderId);
localStorage.setItem("orderId", data.orderId);



let orderIdStorage = localStorage.getItem("orderId");
let order = orderIdStorage;

if(order != undefined){
    document.getElementById("orderId").innerHTML = order;
    localStorage.clear();
    }
else {
    window.location.href = window.location.origin+ ("/C:/Users/melan/desktop/P5/front/html/index.html");
    }

// Bouton Supprimer //
elementDelete.addEventListener('click', function(e){
    e.preventDefault();
        document.getElementById('cart__items').removeChild(elementArticle);
        productStorage = productStorage.filter( product => product.productId != product._id || product.optionColor != color);
        localStorage.setItem("product", JSON.stringify(productStorage));

    // Modification prix et quantité total après suppression du produit//
        totalQuantity -= parseInt(quantity);
        let total = document.getElementById("totalQuantity");
        total.innerHTML = totalQuantity;
        totalPrice -= parseInt(product.price) * parseInt(quantity);
        let totalP = document.getElementById("totalPrice");
        totalP.innerHTML = totalPrice;
})