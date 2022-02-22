 fetch ("http://localhost:3000/api/products")
  .then(response => {
    response.json().then(products => {
      let html = '';
      products.forEach(product => {
        html += '<a href="./product.html?id='+product._id+'"><article><img src="'+product.imageUrl+'" alt="Lorem ipsum dolor sit amet, Kanap name1"><h3 class="productName">'+ product.name +'</h3><p class="productDescription">'+product.description+'</p></article></a>'
        document.getElementById('items').innerHTML = html;
       });
    })
  })   