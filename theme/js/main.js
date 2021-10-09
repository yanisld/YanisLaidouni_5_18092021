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