
let m_button = document.querySelector(".menu");
let c_button = document.querySelector(".mclose");
let categ_button = document.querySelector(".categorybutton");
let area_button = document.querySelector(".area")






$(m_button).click(function(){
    $(".firsthalf").animate({width:"100%"},600);
    $(c_button).removeClass("d-none");
    $(m_button).addClass("d-none");
   

   

})

   $(c_button).click(function(){
    $(".firsthalf").animate({width:"0%"},600);
    $(c_button).addClass("d-none")
    $(m_button).removeClass("d-none");
   })


$(categ_button).click(function(){

    category();
    $(".details").addClass("d-none");
    $(".main").removeClass("d-none");


})
$(area_button).click(function(){

    area();
    $(".details").addClass("d-none");
    $(".main").removeClass("d-none");


})


$(".searchbutton").click(function(){

    $(".main").addClass("d-none");
    $(".details").addClass("d-none");
    $(".searchpage").removeClass("d-none");
})









   async function getrandommeals(){
    let frandommeals = await  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`);
    `https://www.themealdb.com/api/json/v1/1/categories.php`
    let randommeals = await frandommeals.json();
   showmealsfirstpage(randommeals.meals);
    
   }
   
   getrandommeals();

   function showmeals(randommeals){
     
    let cartoona =``

    for(let i=0; randommeals.length > i; i++)
    {
        cartoona += ` <div class="meals col-md-3 position-relative overflow-hidden py-5  ">
                
        <img src="${randommeals[i].strMealThumb}" data-*=${randommeals[i].idMeal}  alt="">
        <div class="layer position-absolute  h-100 w-100 " data-id = ${randommeals[i].idMeal}></div>  
    </div>`
    }

    document.querySelector(".search").innerHTML = cartoona;

    let mealname = document.querySelectorAll(".meals");

    console.log(mealname)

    for(let i =0; mealname.length>i;i++){

        mealname[i].children[0].addEventListener("click",(e) =>{
            detailspage(e.target.getAttribute("data-*"));
        })

        mealname[i].children[1].addEventListener("click",(e) =>{
            detailspage(e.target.getAttribute("data-id"));
        })
    }
  
   }
   function showmealsfirstpage(randommeals){
     
    let cartoona =``

    for(let i=0; randommeals.length > i; i++)
    {
        cartoona += ` <div class="meals col-md-3 position-relative overflow-hidden py-5  "  >
                
        <img  src="${randommeals[i].strMealThumb}" data-*=${randommeals[i].idMeal}  alt="" >
        <div class="layer position-absolute  h-100 w-100 " data-id=${randommeals[i].idMeal} ></div>
        

    </div>`

   
    }
    document.querySelector(".firstpage").innerHTML = cartoona;
    let card = document.querySelectorAll(".meals");
    console.log(card);
   
    for(let i =0; card.length>i;i++){

        card[i].children[0].addEventListener("click",(e) =>{
            detailspage(e.target.getAttribute("data-*"));
        })

        card[i].children[1].addEventListener("click",(e) =>{
            detailspage(e.target.getAttribute("data-id"));
        })
    }


   }

   async function detailspage(id){

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let meal = await response.json();
console.log(meal.meals)
   displaydetailspage(meal.meals);

   }

   async function displaydetailspage(meal){

     let cartoona =`<div class ="container"><div class ="row py-5">  <div class="col-md-4 text-white">
     <img class="w-100 rounded-3" src="${meal[0].strMealThumb}"
         alt="">
         <h2>${meal[0].strMeal}</h2>
 </div>
 <div class="col-md-8 text-white">
     <h2>Instructions</h2>
     <p>${meal[0].strInstructions}</p>
     <h3><span class="fw-bolder">Area : </span>${meal[0].strArea}</h3>
     <h3><span class="fw-bolder">Category : </span>${meal[0].strCategory}</h3>
     <h3>Recipes :</h3>
     <ul class="list-unstyled d-flex g-3 flex-wrap">
        
     </ul>

     <h3>Tags :</h3>
     <ul class="list-unstyled d-flex g-3 flex-wrap">
        
     </ul>

     <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
     <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
 </div> </div> </div> `


 document.querySelector(".details").innerHTML = cartoona;

 $(".main").addClass("d-none");
 $(".searchpage").addClass("d-none")
$(".details").removeClass("d-none");

   }

 












  async function searchbyname(input){
     
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
     let mealname = await response.json();
     
     showmeals(mealname.meals)


   }



   async function searchbyfirst(input){
     
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`);
    let mealname = await response.json();


  


    showmeals(mealname.meals)


  }






  async function category()
  {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let category = await response.json();
    console.log(category.categories);
    showcategories(category.categories);
  }


  function showcategories(arr){

    let cartoona  = ``;

    for(let i =0 ; arr.length > i;i++ ){

        cartoona += `<div class="meals col-md-3 position-relative overflow-hidden " data-id="">
                
        <img src="${arr[i].strCategoryThumb}" data-*=${arr[i].strCategory} alt="">
        </div>
        `
       
    }
console.log(cartoona);
    document.querySelector(".firstpage").innerHTML = cartoona;

    let categ_card = document.querySelectorAll(".meals");
    for(let i=0; categ_card.length>i;i++)
    {
        categ_card[i].children[0].addEventListener("click",(e) =>{

            categ_filter(e.target.getAttribute("data-*"));

        })
    }
  }


  async function categ_filter(input)
  {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`)
    let categmeals = await response.json();
    showmealsfirstpage(categmeals.meals);
  }










  async function area()
  {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let Area = await response.json();
    console.log(Area.meals);
    showarea(Area.meals);
  }


  function showarea(arr){

    let cartoona  = ``;

    for(let i =0 ; arr.length > i;i++ ){

        cartoona += `<div class="meals col-md-3 position-relative overflow-hidden text-center text-white" data-id="${arr[i].strArea}">
                
        <h3 data-id="${arr[i].strArea}">${arr[i].strArea}</h3>
        </div>
        `
       
    }
console.log(cartoona);
    document.querySelector(".firstpage").innerHTML = cartoona;

    let categ_card = document.querySelectorAll(".meals");
    console.log(categ_card);
    for(let i=0; categ_card.length>i;i++)
    {
        categ_card[i].children[0].addEventListener("click",(e) =>{

            area_filter(e.target.getAttribute("data-id"));

        })
    }
  }


  async function area_filter(input)
  {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`)
    let areameals = await response.json();
    console.log(areameals.meals)
    showmealsfirstpage(areameals.meals);
  }

