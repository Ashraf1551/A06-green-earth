const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories") //Promis of Response
    .then((res) => res.json()) // Promise of JSON data
    .then((json) => displayAllCategories(json.categories));
};

const displayAllCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container")
  categoryContainer.innerHTML = ""

  for(let category of categories){
    console.log(category.category_name)

    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button>${category.category_name}</button>
    `;

    categoryContainer.appendChild(btnDiv)
  }
}

loadAllCategories();