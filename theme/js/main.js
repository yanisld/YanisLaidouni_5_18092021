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
    let url = new URL(window.location.href);
    let path = url.pathname;
    if (path == "/index.html"){
        displayProductsHome(products);
    }
    else if (path == "/produit.html"){
        displayProductPage(products);
        addToCart();
    }
    else if (path == "/panier.html"){
        displayCart(products);
        getTotalPrice();
        emptyCart();
        sendCartForm();
    }
    else if (path == "/confirmation.html"){
        displayOrder();
        endOrder();
    }
    getCartCount();
}

// Affichage des produits sur la page d'accueil
function displayProductsHome(products) {
    const productList = document.querySelector('#products-list');
    let urlParam = new URLSearchParams();

    for (let product of products) {
        const cardLink = document.createElement("a");
        const divCard = document.createElement("div"); 
        const cardDivImg = document.createElement("div");
        const cardBody = document.createElement("div");
        const cardTitle = document.createElement("h3");
        const cardPrice = document.createElement("p");

        cardDivImg.style.backgroundImage = "url(" + product.imageUrl + ")";
        divCard.classList.add("product-item"); 
        urlParam.set("id", product._id);
        urlParam.set("name", product.name);
        cardLink.setAttribute("href", "/produit.html?" + decodeURIComponent(urlParam));
        cardLink.classList.add("product-list__link");
        cardDivImg.classList.add("product-item__img"); 
        cardBody.classList.add("product-item__body");
        cardTitle.classList.add("product-item__body__title");
        cardPrice.classList.add("product-item__body__price");
        cardTitle.textContent = product.name;
        cardPrice.textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price/100);

        productList.appendChild(cardLink);
        cardLink.appendChild(divCard);
        divCard.appendChild(cardDivImg);
        divCard.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrice);
    }
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

// Afficher les produits dans le panier
function displayCart(products) {
    const cartList = document.querySelector('.cart');  
    const cartIntro = document.querySelector('.cart__intro');  
    let storage = [];
      
    if (!localStorage.getItem("product")) {
        storage.push(0);
        cartIntro.textContent = "Panier vide";
    }
    storage = JSON.parse(localStorage.getItem("product"));
    for (let i in storage) {          
        const cartItem = document.createElement("div");
        const cartImg = document.createElement("img");
        const cartTitle = document.createElement("h3");
        const cartQty = document.createElement("span");
        const cartPrice = document.createElement("span");   
        
        cartItem.classList.add("cart__item");
        cartImg.classList.add("cart__item__img");
        cartTitle.classList.add("cart__item__title");
        cartQty.classList.add("cart__item__qty");
        cartPrice.classList.add("cart__item__price");

        cartList.appendChild(cartItem); 
        cartItem.appendChild(cartImg); 
        cartItem.appendChild(cartTitle);
        cartItem.appendChild(cartQty); 
        cartItem.appendChild(cartPrice);
       
        for (let product of products) {
            if (storage[i].id == product._id) {
                cartImg.src = product.imageUrl;
                cartTitle.textContent = product.name;
                cartQty.textContent = storage[i].quantite;
                cartPrice.textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price/100);
            }   
        }      
    }
}

// Prix total des produits
function getTotalPrice() {
    if (localStorage.getItem("product")) {
        const cartList = document.querySelector('.cart');
        const TotalCartPrice = document.createElement("div"); 
        TotalCartPrice.classList.add("cart__total-price");
        cartList.appendChild(TotalCartPrice);
        
        let total = 0;
        let price = cartList.querySelectorAll(".cart__item__price");
        let quantity = cartList.querySelectorAll(".cart__item__qty");
        let qtyTab = [];
        let i = 0;
        for (let qty of quantity.values()) {
            qtyTab.push(parseFloat(qty.textContent));
        }
        for (let value of price.values()) {
            total = total + parseFloat(value.textContent) * qtyTab[i];
            i++;   
        }
        TotalCartPrice.textContent = "Total: " + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total);
    }
}

// Bouton pour vider le panier
function emptyCart() {
    if (localStorage.getItem("product")) {
        const cartList = document.querySelector('.cart');
        const btnEmptyCart = document.createElement("button");
        btnEmptyCart.classList.add("cart__empty-cart");
        btnEmptyCart.textContent = "Vider le panier";
        cartList.appendChild(btnEmptyCart);

        btnEmptyCart.addEventListener('click', function() {
            localStorage.clear();
            location.reload();
        });
    }
}

// Envoi du formulaire de commande
function sendCartForm() {
    const cartForm = document.getElementById("cart-form");
    cartForm.addEventListener("submit", function(event) {      
        event.preventDefault();
        
        const formData = new FormData();
        for (let input of cartForm) {
            formData.append(input.name, input.value);   
        }
        formData.delete('');

        let dataTab = [];
        for (let data of formData.entries()) {
            dataTab.push(data);
        }
        let contact = Object.fromEntries(dataTab);

        let productsList = JSON.parse(localStorage.getItem("product"));
        let products = [];
        for (let i in productsList) {
            products.push(productsList[i].id);
        }
        let order = {"contact": contact, "products": products};
        
        fetch("http://localhost:3000/api/teddies/order", {
	        method: "POST", 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json; charset=utf-8' 
                },
            body: JSON.stringify(order)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            localStorage.setItem("commande", JSON.stringify(data.orderId));
            localStorage.setItem("total", document.querySelector(".cart__total-price").textContent);
            localStorage.removeItem("product");
            window.location.href = "http://localhost:3000/confirmation.html";
        })
        .catch(function(error) {
            console.log(error);
        });
    });
}

// Affichage de la commande
function displayOrder(){
    const orderDetail = document.getElementById("order-detail");
    const displayIdOrder = document.createElement("div");
    const totalPrice = document.createElement("div");
    orderDetail.appendChild(displayIdOrder);
    orderDetail.appendChild(totalPrice);
    
    displayIdOrder.textContent = "Numéro de commande: " + JSON.parse(localStorage.getItem("commande"));
    totalPrice.textContent = localStorage.getItem("total");
}

// Terminer la commande
function endOrder() {
    const orderDetail = document.getElementById("order-detail");
    const endOrder = document.createElement("button");
    orderDetail.appendChild(endOrder);
    endOrder.textContent = "Terminer la commande";

    endOrder.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = "/index.html";
    });
}

// Comptage des produits dans le panier
function getCartCount() {
    const elemCount = document.getElementById("header__icons__cart-count");
    let productTab = JSON.parse(localStorage.getItem("product"));
    let cartNumber = 0;
    if (!localStorage.getItem("product")) {
        cartNumber = 0;
    }
    else {
        for (let i in productTab){
            cartNumber = cartNumber + productTab[i].quantite;    
        }
        elemCount.innerHTML = cartNumber;
    }
}