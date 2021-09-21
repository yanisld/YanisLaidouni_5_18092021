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
    const productList = document.querySelector('#product-list');

    for (let product of products) {
        const divCard = document.createElement("div");
        const cardDivImg = document.createElement("div");
        const cardBody = document.createElement("div");
        const cardTitle = document.createElement("h3");
        const cardPrice = document.createElement("p");
        const cardButton = document.createElement("button");

        cardDivImg.style.height = "350px";
        cardDivImg.style.backgroundImage = "url(" + product.imageUrl + ")";
        cardDivImg.style.backgroundSize = "cover";
        cardDivImg.style.backgroundPosition = "center";
        cardTitle.textContent = product.name;
        cardPrice.textContent = product.price + " €";
        cardButton.textContent = "Ajouter au panier";
        cardButton.classList.add("btn", "btn-primary");

        productList.appendChild(divCard);
        divCard.appendChild(cardDivImg);
        divCard.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(cardButton);
    }
}

