const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories") //Promis of Response
    .then((res) => res.json()) // Promise of JSON data
    .then((json) => displayAllCategories(json.categories));
};

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
    card.innerHTML= `
    <div class="bg-white p-1 lg:p-4 rounded-xl shadow-md">
              <figure class="bg-gray-200 rounded-xl">
                <img src="${plant.image}" alt="${plant.name}" class="rounded-xl h-48 object-cover w-full" />
              </figure>
              <h3 class="font-semibold text-base my-3">${plant.name} </h3>
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
                class="w-full text-sm bg-[#15803d] text-white font-semibold rounded-2xl py-2 cursor-pointer hover:bg-green-900"
              >
                Add to Cart
              </button>
            </div>

    `;
    plantContainer.append(card)
  }
};

// category wise load
const loadCategoryPlant = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`)
      // clickBtn.classList.add("active")
      displayCategoryPlant(data.plants)
    });
};

// category wise display
const displayCategoryPlant = () =>{

}


const displayAllCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  for (let category of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button class="text-[#1F2937] font-semibold text-md px-1 border border-green-500 hover:bg-green-700 w-full text-center py-2 rounded-lg cursor-pointer hover:text-white">${category.category_name}</button>
    `;

    categoryContainer.appendChild(btnDiv);
  }
};

loadAllCategories();
loadAllPlants();
