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

        const categoryDiv = document.createElement("div");
        
        categoryDiv.innerHTML = `
        <a onclick="loadCategoriesId(${category.category_id})" class="nav-link" href="#">${category.category_name}</a>
        `
        categoriesContainer.appendChild(categoryDiv)
   });

}


const loadCategoriesId = async(CategoriesId) => {

    const url = `https://openapi.programming-hero.com/api/news/category/0${CategoriesId}` 
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesId(data.data);
    // console.log(data.length);

}


const displayCategoriesId = (categoriesNews) =>{
    console.log(categoriesNews);
    const newsCardContainer = document.getElementById("news-card-container");

    newsCardContainer.innerText = "";

    categoriesNews.forEach(categoryNews => {
        const divCategoryNews = document.createElement("div")
        divCategoryNews.classList.add("card");
        divCategoryNews.classList.add("mb-4");
        divCategoryNews.innerHTML = `
        <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${categoryNews.thumbnail_url}" class="img-fluid rounded-start p-5" alt="...">
                  </div>
                  <div class="col-md-8 p-5">
                    <div class="card-body">
                      <h5 class="card-title">${categoryNews.title}</h5>
                      <p class="card-text">${categoryNews.details.slice(0, 200) }</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
        `

        newsCardContainer.appendChild(divCategoryNews)
    });

    
    
}



loadCategories();