// categories loading from API & Error handler
const loadCategories = async() => {
    try{
        const url = "https://openapi.programming-hero.com/api/news/categories"
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);  
         
    }
    catch(error){
        console.log("error");
    }

}

//taking navbars category
const displayCategories = categories => {

    
    const categoriesContainer = document.getElementById("categories-container");

    categories.forEach(category => {

        const categoryDiv = document.createElement("div");
        
        categoryDiv.innerHTML = `
        <a onclick="loadCategoriesId(${category.category_id})" class="nav-link" href="#">${category.category_name}</a>
        
        `
        
        categoriesContainer.appendChild(categoryDiv)
        
   });
   
}

//finding id & Error handler
const loadCategoriesId = async(CategoriesId) => {
    try{
        toggleSpiner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${CategoriesId}` 
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesId(data.data);
    totalCategories(data.data);
    
    }   
    catch{
        console.log("error");
    }

}
//Total item taking
const totalCategories = (totalLength) =>{
    toggleSpiner(false);
    const totalNews = document.getElementById("total-news");
    totalNews.innerText = "";

    const divTotal = document.createElement("div");
    divTotal.innerHTML = `
    <div class="card my-5">
    <div class="card-body">
    <p class="card-text"> <strong> <i class="fa-solid fa-newspaper"></i>  Total  ${totalLength.length} Item found </strong>  </p>
    </div>
        </div>
    `
    totalNews.appendChild(divTotal)

}

// Taking Data and create API data in to cards

const displayCategoriesId = (categoriesNews) =>{

    const newsCardContainer = document.getElementById("news-card-container");

    newsCardContainer.innerText = "";

    categoriesNews.forEach(categoryNews => {
    
        const divCategoryNews = document.createElement("div")
        divCategoryNews.classList.add("card");
        divCategoryNews.classList.add("mb-4");
        divCategoryNews.innerHTML = `
        <div class="row g-0 rounded">
                  <div class="col-md-4">
                    <img src="${categoryNews.thumbnail_url}" class="img-fluid rounded-start p-5" alt="...">
                  </div>
                  <div class="col-md-8 p-5">
                    <div class="card-body">
                      <h5 class="card-title">  <strong>${categoryNews.title}</strong> </h5>
                      <p class="card-text">${categoryNews.details.slice(0, 200)+"..." }</p>
                    </div>
                    <div class=" mt-5 d-flex justify-content-between">
                    
                    <div class="d-flex">
                    <img class="author-img" src="${categoryNews.author.img}" class="img-fluid rounded-start p-5" alt="...">
                    <div class="ms-3 "> 
                    <p>${categoryNews.author.name ? categoryNews.author.name: "Author Name Not found "}</p>
                    <p class="dateParagraph">${categoryNews.author.published_date}</p> 
                    </div>
                    </div> 
                    
                    <div>
                    <i class="fa-solid fa-eye"></i>
                    <span class=""> ${categoryNews.total_view ? categoryNews.total_view: "No Views Data"}</span>
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
                            <h5 class="modal-title" id="staticBackdropLabel">  <strong>${categoryNews.title}</strong></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${categoryNews.details}
                            <br> <strong>Date:</strong>
                             ${categoryNews.author.published_date}
                            <br> <strong>Time & Date:</strong>
                            
                            <strong>Author:</strong>
                            ${categoryNews.author.name}
                            
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

//Spiner loader

const toggleSpiner = isLoading =>{
    const loaderCard = document.getElementById("loader-card"); 
    if(isLoading){
        loaderCard.classList.remove("d-none");
    }
    else{
        loaderCard.classList.add("d-none");
    }

}



// load API
loadCategories();