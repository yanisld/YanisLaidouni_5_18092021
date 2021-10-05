// Affichage de la commande
function displayOrder(){
    const orderDetail = document.getElementById("order-detail");
    const displayIdOrder = document.createElement("div");
    const totalPrice = document.createElement("div");
    orderDetail.appendChild(displayIdOrder);
    orderDetail.appendChild(totalPrice);
    
    displayIdOrder.textContent = JSON.parse(localStorage.getItem("commande"));
    totalPrice.textContent = "total" + localStorage.getItem("total");
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

// Initialisation des scripts
displayOrder();
endOrder();