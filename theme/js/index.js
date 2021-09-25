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
    displayProductsHome(products);
}

// Affichage des produits sur la page d'accueil
function displayProductsHome(products) {
    const productList = document.querySelector('#products-list');
    let urlParam = new URLSearchParams("/produit.html?");

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
        cardLink.setAttribute("href", decodeURIComponent(urlParam));
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
