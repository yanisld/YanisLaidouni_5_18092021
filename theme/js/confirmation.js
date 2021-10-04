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
    displayOrder();
}

// Affichage de la commande
function displayOrder(){
    const orderDetail = document.getElementById("order-detail");
    const displayIdOrder = document.createElement("div");
    const totalPrice = document.createElement("div");
    orderDetail.appendChild(displayIdOrder);
    orderDetail.appendChild(totalPrice);

    displayIdOrder.textContent = JSON.parse(localStorage.getItem("commande"));
    totalPrice.textContent = localStorage.getItem("total");
}