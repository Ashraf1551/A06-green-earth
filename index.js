const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayAllCategories(json.categories));
};

const removeActive = () => {
  const categoryButtons = document.querySelectorAll(".category-btn")
  categoryButtons.forEach(btn => btn.classList.remove("active"))
}

const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => displayAllPlants(json.plants));
};


const displayAllPlants = (plants) => {
  const plantContainer = document.getElementById("all-plants-container");
  plantContainer.innerHTML = "";

  for (let plant of plants) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white p-1 lg:p-4 rounded-xl shadow-md">
              <figure class="bg-gray-200 rounded-xl">
                <img src="${plant.image}" alt="${plant.name}" class="rounded-xl h-48 object-cover w-full" />
              </figure>
              <h3 onclick="loadTreeDetails(${plant.id})" class="font-semibold text-base my-3 cursor-pointer">${plant.name} </h3>
              <p class="text-gray-700 text-xs">
                ${plant.description}
              </p>
              <div class="flex justify-between my-4">
                <div
                  class="bg-[#dcfce7] text-sm rounded-xl font-semibold text-green-800 px-3 py-1"
                >
                  ${plant.category}
                </div>
                <p class="font-bold text-sm">৳ <span>${plant.price}</span></p>
              </div>
              <button
                onclick="addToCart('${plant.name}', ${plant.price})"
                class="w-full text-sm bg-[#15803d] text-white font-semibold rounded-2xl py-2 cursor-pointer hover:bg-green-900"
              >
                Add to Cart
              </button>
            </div>
    `;
    plantContainer.append(card)
  }
};


const loadCategoryPlants = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`category-btn-${id}`)
      clickBtn.classList.add("active")
      displayCategoryPlants(data.plants)
    });
};

const displayCategoryPlants = (plants) => {
  const plantContainer = document.getElementById("all-plants-container");
  plantContainer.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white p-1 lg:p-4 rounded-xl shadow-md">
              <figure class="bg-gray-200 rounded-xl">
                <img src="${plant.image}" alt="${plant.name}" class="rounded-xl h-48 object-cover w-full" />
              </figure>
              <h3 onclick="loadTreeDetails(${plant.id})" class="font-semibold text-base my-3 cursor-pointer">${plant.name} </h3>
              <p class="text-gray-700 text-xs">
                ${plant.description}
              </p>
              <div class="flex justify-between my-4">
                <div
                  class="bg-[#dcfce7] text-sm rounded-xl font-semibold text-green-800 px-3 py-1"
                >
                  ${plant.category}
                </div>
                <p class="font-bold text-sm">৳ <span>${plant.price}</span></p>
              </div>
              <button
                onclick="addToCart('${plant.name}', ${plant.price})"
                class="w-full text-sm bg-[#15803d] text-white font-semibold rounded-2xl py-2 cursor-pointer hover:bg-green-900"
              >
                Add to Cart
              </button>
            </div>
    `;
    plantContainer.append(card)
  });
};

const displayAllCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  for (let category of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button
    id="category-btn-${category.id}" onclick="loadCategoryPlants(${category.id})"
    class="text-[#1F2937] font-semibold text-md px-1 border border-green-500 hover:bg-green-700 w-full text-center lg:text-left py-2 rounded-lg cursor-pointer hover:text-white category-btn">${category.category_name}</button>
    `;
    categoryContainer.appendChild(btnDiv);
  }
};

const loadTreeDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((d) => showDetails(d.plants));
};

const showDetails = (de) => {
  console.log(de);

  const detailsBox = document.getElementById("details-cont");
  detailsBox.innerHTML = `
    <div class="space-y-2">
               <h1 class="font-semibold text-2xl">${de.name} </h1>
              <img class="w-full h-48 object-cover rounded-xl" src="${de.image} " alt="" />
              <p><span class="font-bold">Category: </span>${de.category}</p>
              <p><span class="font-bold">Price: </span>৳<span>${de.price}</span></p>
              <p>
                <span class="font-bold">Description: </span> ${de.description}
              </p>
             </div>
    `;
  document.getElementById("my_modal_5").showModal();
};




let cart = {};


function addToCart(plantName, plantPrice) {
  if (cart[plantName]) {
    cart[plantName].quantity += 1;
  } else {
    cart[plantName] = {
      price: plantPrice,
      quantity: 1
    };
  }

  alert(`${plantName} added to the cart!`);
  showCart();
}


function showCart() {
  const cartContainer = document.getElementById("add-to-cart-container");
  cartContainer.innerHTML = '<h2 class="font-bold text-2xl">Your Cart</h2>';

  const cartKeys = Object.keys(cart);

  if (cartKeys.length === 0) {
    cartContainer.innerHTML += '<p class="text-gray-500 text-sm mt-2">Your cart is empty</p>';
    return;
  }

  let total = 0;

  cartKeys.forEach(name => {
    const item = cart[name];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartContainer.innerHTML += `
      <div class="border-b py-2 flex justify-between items-center">
        <div>
          <p class="text-sm">${name}</p>
          <p class="text-sm font-bold">৳${item.price} x ${item.quantity} = ৳${itemTotal}</p>
        </div>
        <button onclick="deleteItem('${name}')" class="text-red-500 hover:text-red-700 text-sm">
          Delete
        </button>
      </div>
    `;
  });

  cartContainer.innerHTML += `
    <div class="border-t-2 border-green-500 pt-2 mt-2">
      <p class="font-bold text-lg">Total: ৳${total}</p>
    </div>
  `;
}


function deleteItem(plantName) {
  delete cart[plantName];
  showCart();
}


loadAllCategories();
loadAllPlants();
showCart();