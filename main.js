const itemName = document.getElementById("itemName");

const itemQuantity = document.getElementById("itemQuantity");

const itemPrice = document.getElementById("itemPrice");

const addItemBtn = document.getElementById("addItemBtn");

const itemscontainer = document.getElementById("items-container");

const totalCostDisplay = document.getElementById("totalCostDisplay");

const itemsCountDisplay = document.getElementById("itemsCountDisplay");

let shoppingList = [];

addItemBtn.addEventListener("click", function () {
  const name = itemName.value.trim();

  const quantity = parseInt(itemQuantity.value);

  const price = parseFloat(itemPrice.value);

  if (name && quantity > 0 && price > 0) {
    const item = {
      id: Date.now(),
      name: name,
      quantity: quantity,
      price: price,
    };
    shoppingList.push(item);
    itemName.value = "";
    itemQuantity.value = "";
    itemPrice.value = "";
    renderItems();
  } else {
    alert("Please enter valid item details.");
  }
});

function renderItems() {
  itemscontainer.innerHTML = "";
  if (shoppingList.length === 0) {
    itemscontainer.innerHTML = `
            <div
            id="emptyMessage"
            class="text-center text-muted py-5 col-12"
            >
            <i class="bi bi-cart-x mb-2 fs-1 d-block text-secondary"></i>
            <span class="fw-semibold"
              >Your shopping list is empty.<br />Add items to get
              started!</span
             >
             </div>
        `;
  } else {
    shoppingList.forEach(function (item) {
      const itemTotal = (item.quantity * item.price).toFixed(2);

      const itemPriceFormatted = Number(item.price).toFixed(2);

      const cardHTML = `
<div class="col-md-6 col-lg-6">
    <div class="card h-100 shadow-sm border-0 p-3">
        <div class="row g-0 align-items-center">
            <div class="col-3 text-center fs-1 bg-light rounded p-2">
                📦
            </div>
            <div class="col-9 ps-3">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="fw-bold text-dark mb-1">${item.name}</h5>
                    <button onclick="deleteItem(${item.id})" class="btn btn-outline-danger btn-sm border-0">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </div>
                <div class="text-secondary small">
                    <div class="mb-1">Qty: <span class="fw-semibold text-dark">${item.quantity}</span></div>
                    <div class="mb-1">Price: <span class="fw-semibold text-dark">${itemPriceFormatted} $</span></div>
                    <hr class="my-1 text-muted">
                    <div class="fw-bold text-success">Total: ${itemTotal} $</div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
      itemscontainer.innerHTML += cardHTML;
    });
  }
  let overallTotal = 0;
  shoppingList.forEach(function (item) {
    overallTotal += item.quantity * item.price;
  });

  totalCostDisplay.innerHTML = overallTotal.toFixed(2) + " $";
  itemsCountDisplay.innerHTML = `Based on ${shoppingList.length} projects`;
}

function deleteItem(id) {
  shoppingList = shoppingList.filter(function (item) {
    return item.id !== id;
  });

  renderItems();
}
