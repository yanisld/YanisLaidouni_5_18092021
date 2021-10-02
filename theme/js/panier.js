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
    displayCart();
    getTotalPrice();
    getCartCount();
    sendCartForm();
}

// Afficher les produits dans le panier
function displayCart() {
    const cartList = document.querySelector('.cart');  
    const cartIntro = document.querySelector('.cart__intro');  
    let storage = [];
      
    if (!localStorage.getItem("produit")) {
        storage.push(0);
        cartIntro.textContent = "Panier vide";
    }
    storage = JSON.parse(localStorage.getItem("produit"));
    for (let i in storage) {          
        const cartItem = document.createElement("div");
        const cartImg = document.createElement("img");
        const cartTitle = document.createElement("h3");
        const cartPrice = document.createElement("span");   
        
        cartItem.classList.add("cart__item");
        cartImg.classList.add("cart__item__img");
        cartTitle.classList.add("cart__item__title");
        cartPrice.classList.add("cart__item__price");

        cartList.appendChild(cartItem); 
        cartItem.appendChild(cartImg); 
        cartItem.appendChild(cartTitle); 
        cartItem.appendChild(cartPrice);
       
        cartImg.src = storage[i].image;
        cartTitle.textContent = storage[i].title;
        cartPrice.textContent = storage[i].price;        
    }
}

// Prix total des produits
function getTotalPrice() {
    const cartList = document.querySelector('.cart');
    const TotalCartPrice = document.createElement("div"); 
    TotalCartPrice.classList.add("cart__total-price");
    cartList.appendChild(TotalCartPrice);

    let storage = JSON.parse(localStorage.getItem("produit"));
    let prices = [];
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    for (let i in storage) { 
        prices.push(parseFloat(storage[i].price));
        
        TotalCartPrice.textContent = "Total: " + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prices.reduce(reducer));
    }
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

// Envoi du formulaire
function sendCartForm() {
    const cartForm = document.getElementById("cart-form");
    cartForm.addEventListener("submit", function(event) {      
        event.preventDefault();
        
        const formData = new FormData();
        for (let data of cartForm) {
            formData.append(data.name, data.value);   
        }
        formData.delete('');

        /*class Contact {
            constructor(firstname, lastname, address, city, email) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.address = address;
            this.city = city;
            this.email = email;
            }
        }
        let contact = {};
        for (let key of formData.keys()) {
            for (let value of formData.values()) {
            contact = {key: value};
            }
        }*/
        let productsList = localStorage.getItem("produit");
        let products = [];
        for (let i in productsList) {
            products = productsList[i];
        }
        console.log(products);

        
        fetch("http://localhost:3000/api/teddies/order", {
	        method: "POST", 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json; charset=utf-8' 
                },
            body: formData
        })
        .then(function(response) {
            return response;
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        });
    });
}