fetch("http://localhost:3000/api/teddies")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        return initialize(products);
    })
    .catch(function(error) {
        console.log("Erreur avec fetch " + error);
    });

// Initialisation des scripts
function initialize(products) {
    displayProductPage(products);
}

// Afficher le détail d'un produit
function displayProductPage(products) {
    let searchParams = new URLSearchParams(window.location.href);
    let url = new URL(decodeURIComponent(searchParams));
    let idUrl = url.searchParams.get("id");
    
    for (let product of products) {
        if (product._id == idUrl) {
            const productDetail = document.querySelector('#product-detail');

            const divImgProduct = document.createElement("div");
            const imgProduct = document.createElement("img");
            const detailProduct = document.createElement("div");
            const titleProduct = document.createElement("h2");
            const descProduct = document.createElement("p");
            const priceProduct = document.createElement("span");
            const colorsProduct = document.createElement("select");
            const addToCart = document.createElement("button");
            
            for (let color of product.colors) {
                const colorsOptionProduct = document.createElement("option");
                colorsOptionProduct.innerHTML = color;
                colorsProduct.appendChild(colorsOptionProduct);
            }

            divImgProduct.classList.add("product-detail__img-bloc");
            detailProduct.classList.add("product-detail__text-bloc");
            titleProduct.classList.add("product-detail__text-bloc__title");
            descProduct.classList.add("product-detail__text-bloc__desc");
            priceProduct.classList.add("product-detail__text-bloc__price");
            colorsProduct.classList.add("product-detail__text-bloc__color");
            addToCart.classList.add("product-detail__text-bloc__cart");
            imgProduct.src = product.imageUrl;
            titleProduct.textContent = product.name;
            descProduct.textContent = product.description;
            priceProduct.textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price/100);
            addToCart.textContent = "Ajouter au Panier";
            
            productDetail.appendChild(divImgProduct);
            productDetail.appendChild(detailProduct);
            divImgProduct.appendChild(imgProduct);
            detailProduct.appendChild(titleProduct);
            detailProduct.appendChild(descProduct);
            detailProduct.appendChild(priceProduct);
            detailProduct.appendChild(colorsProduct);
            detailProduct.appendChild(addToCart);
        }
    }
}