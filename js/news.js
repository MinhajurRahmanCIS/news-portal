// categories loading from API
const loadCategories = async() => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);

}

const displayCategories = categories => {

    // console.log(categories);
    const categoriesContainer = document.getElementById("categories-container");

    categories.forEach(category => {

        const li = document.createElement("div");
        
        li.innerHTML = `
        <a class="nav-link" href="#">${category.category_name}</a>
        `
        categoriesContainer.appendChild(li)
   });

}








loadCategories();