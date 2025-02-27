// Initialisation des scripts
function initialize(products) {
    displayCart(products);
    getTotalPrice();
    emptyCart();
    getCartCount();
    sendCartForm();
}

// Afficher les produits dans le panier
function displayCart(products) {
    const cartList = document.querySelector('.cart');  
    const cartIntro = document.querySelector('.cart__intro');  
    let storage = [];
      
    if (!localStorage.getItem("product")) {
        storage.push(0);
        
        cartIntro.textContent = "";
        const alert = document.createElement("div");
        const closeBtn = document.createElement("span");
        alert.classList.add("alert");
        closeBtn.classList.add("closebtn");
        closeBtn.setAttribute("onclick", "this.parentElement.style.display='none';");
        alert.textContent = "Votre Panier est Vide";
        closeBtn.innerHTML = "&times;";

        cartIntro.appendChild(alert); 
        alert.appendChild(closeBtn); 
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

// Récupération des données du formulaire
function getFormDatas() {
    const cartForm = document.getElementById("cart-form");

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
        return contact    
}

// Récupération des produits dans le stockage local
function getProducts() {
    let productsList = JSON.parse(localStorage.getItem("product"));
    let products = [];
    for (let i in productsList) {
        products.push(productsList[i].id);
    }
    return products
}

// Création de l'objet commande
function setOrderObject() {
    let order = {"contact": getFormDatas(), "products": getProducts()};
    return order;
}

// Envoi du formulaire
function sendCartForm() {
    const cartFormSubmit = document.getElementById("cart-form");
    cartFormSubmit.addEventListener("submit", function(event) {      
        event.preventDefault();
        
        fetch("http://localhost:3000/api/teddies/order", {
	        method: "POST", 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json; charset=utf-8' 
                },
            body: JSON.stringify(setOrderObject())
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (!localStorage.getItem("product")){
                const cartIntro = document.querySelector('.cart__intro'); 
                cartIntro.textContent = "";
                const alert = document.createElement("div");
                const closeBtn = document.createElement("span");
                alert.classList.add("alert");
                closeBtn.classList.add("closebtn");
                closeBtn.setAttribute("onclick", "this.parentElement.style.display='none';");
                alert.textContent = "Votre Panier est Vide";
                closeBtn.innerHTML = "&times;";

                cartIntro.appendChild(alert); 
                alert.appendChild(closeBtn); 
            }
            else {
                localStorage.setItem("commande", JSON.stringify(data.orderId));
                localStorage.setItem("total", document.querySelector(".cart__total-price").textContent);
                localStorage.removeItem("product");
                window.location.href = "http://localhost:3000/confirmation.html";
            }  
        })
        .catch(function(error) {
            console.log(error);
        });
    });
}