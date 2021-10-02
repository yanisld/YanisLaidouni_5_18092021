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
    getCartCount();
    addToCart();
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
            imgProduct.classList.add("product-detail__img-bloc__img");
            detailProduct.classList.add("product-detail__text-bloc");
            titleProduct.classList.add("product-detail__text-bloc__title");
            descProduct.classList.add("product-detail__text-bloc__desc");
            priceProduct.classList.add("product-detail__text-bloc__price");
            colorsProduct.classList.add("product-detail__text-bloc__color");
            addToCart.classList.add("product-detail__text-bloc__cart");
            addToCart.setAttribute("id", "btn-cart");
            imgProduct.setAttribute("id", "product-img-detail");
            titleProduct.setAttribute("id", "product-title-detail");
            priceProduct.setAttribute("id", "product-price-detail");
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

// Ajouter un produit au panier
function addToCart() { 
    const btnAddToCart = document.getElementById("btn-cart");

    let searchParams = new URLSearchParams(window.location.href);
    let url = new URL(decodeURIComponent(searchParams));
    let idUrl = url.searchParams.get("id");

    class Product {
        constructor(id, image, title, price) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.price = price;
        }
    }

    let obj = [];
    
    btnAddToCart.addEventListener('click', function() {   
        let searchParams = new URLSearchParams(window.location.href);
        let url = new URL(decodeURIComponent(searchParams));
        let idUrl = url.searchParams.get("id");
        
        const productImg = document.getElementById("product-img-detail");
        const productTitle = document.getElementById("product-title-detail");
        const productPrice = document.getElementById("product-price-detail");
        const elemCount = document.getElementById("header__icons__cart-count");

        if(localStorage.getItem("produit")){
            obj = JSON.parse(localStorage.getItem("produit"));
        }
        let productDatas = new Product(idUrl, productImg.src, productTitle.innerHTML, productPrice.textContent);
        obj.push(productDatas);
        localStorage.setItem("produit", JSON.stringify(obj));
        elemCount.innerHTML = obj.length;
    }); 
}

// Comptage des produits dans le panier
function getCartCount() {
    const elemCount = document.getElementById("header__icons__cart-count");
    let productTab = [];
    if (!localStorage.getItem("produit")) {
        productTab.push(0);
    }
    else {
        productTab = JSON.parse(localStorage.getItem("produit"));
        elemCount.innerHTML = productTab.length;
    } 
}