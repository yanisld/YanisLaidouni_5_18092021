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

    class Product {constructor(id, quantite) {this.id = id; this.quantite = quantite;}}
    
    btnAddToCart.addEventListener('click', function() {   
        let searchParams = new URLSearchParams(window.location.href);
        let url = new URL(decodeURIComponent(searchParams));
        let idUrl = url.searchParams.get("id");
        let productQty = 1;
        let productList = [];
        let newProductList = [];
        
        if(localStorage.getItem("product")){
            productList = JSON.parse(localStorage.getItem("product"));
            newProductList = JSON.parse(localStorage.getItem("product"));
            for (let i in productList){
                if (idUrl == productList[i].id){
                    productList[i].quantite = productList[i].quantite + 1;
                    localStorage.setItem("product", JSON.stringify(productList));
                }
            }
            if (JSON.stringify(productList) == JSON.stringify(newProductList)) {
                    let newProduct = new Product(idUrl, productQty);
                    productList.push(newProduct);
                    localStorage.setItem("product", JSON.stringify(productList));
            }  
        }            
        else {
            let product = new Product(idUrl, productQty);
            productList.push(product);
            localStorage.setItem("product", JSON.stringify(productList));
        }

        getCartCount();
    }); 
}