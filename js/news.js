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
        <a onclick="loadCategoriesId(${category.category_id })" class="nav-link" href="#">${category.category_name}</a>
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
                      <p class="card-text">${categoryNews.details.slice(0, 200)+"..." }</p>
                    </div>
                    <div class=" mt-5 d-flex justify-content-between">
                    
                    <div class="d-flex">
                    <img class="author rounded-5 " src="${categoryNews.author.img}" class="img-fluid rounded-start p-5" alt="...">
                    <div class="ms-3 "> 
                    <p>${categoryNews.author.name ? categoryNews.author.name: "Name not found"}</p>
                    <p>${categoryNews.author.published_date.slice(0, 11)}</p> 
                    </div>
                    </div> 
                    
                    <div>
                    <i class="fa-solid fa-eye"></i>
                    <span class=""> ${categoryNews.total_view}</span>
                    </div>

                    <div>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    </div>

                    <div>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="fa-solid fa-arrow-right-long"></i>
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">${categoryNews.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${categoryNews.details}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>

                    </div>
                    </div>
                  </div>
                </div>
        `

        newsCardContainer.appendChild(divCategoryNews)
    });

    
    
}



loadCategories();