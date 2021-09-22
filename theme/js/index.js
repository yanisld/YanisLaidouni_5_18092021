fetch("http://localhost:3000/api/teddies")
    .then(function(response) {
        console.log("Fetch fonctionne");
        return response.json();
    })
    .then(function(products) {
        console.log("Initialisation réussie");
        return initialize(products);
    })
    .catch(function(error) {
        console.log("Erreur avec fetch " + error);
    });

// Initialisation des scripts
function initialize(products) {
    displayProducts(products);
}

// Affichage des produits sur la page d'accueil
function displayProducts(products) {
    const productList = document.querySelector('#products-list');

    for (let product of products) {
        const cardLink = document.createElement("a");
        const divCard = document.createElement("div"); 
        const cardDivImg = document.createElement("div");
        const cardBody = document.createElement("div");
        const cardTitle = document.createElement("h3");
        const cardPrice = document.createElement("p");

        cardDivImg.style.backgroundImage = "url(" + product.imageUrl + ")";
        divCard.classList.add("product-item"); 
        cardLink.setAttribute("href", "/produit.html"); 
        cardDivImg.classList.add("product-item__img"); 
        cardBody.classList.add("product-item__body");
        cardTitle.classList.add("product-item__body__title");
        cardPrice.classList.add("product-item__body__price");
        cardTitle.textContent = product.name;
        cardPrice.textContent = product.price + " €";

        productList.appendChild(cardLink);
        cardLink.appendChild(divCard);
        divCard.appendChild(cardDivImg);
        divCard.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrice);
    }
}

