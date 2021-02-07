

document.getElementById("searchBtn").addEventListener("click", function (){
    let mealInput = document.getElementById("mealInput").value;
    loadData(mealInput);
    
});

// loadData(); function for fetching the data 
const loadData = (mealInput) => {  //parameter will be the input value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`)
        .then(res => res.json())
        .then(data => {
            displayData(data, mealInput);
        })
}

const displayData = (data,mealInput) => {
    console.log(data);
    const allMeals = data.meals;  // allMeals is an array
    console.log("all Meals: ", allMeals);
    if(allMeals === null) {
        nothingFound(mealInput);
    }
    else{
        const mealContainer = document.getElementById("mealContainer");
    allMeals.forEach(meal => {
        console.log("hello: ", meal.strMeal);
       
        const mealDiv = document.createElement("div");
        mealDiv.className = "mealDiv";
        // mealDiv.onclick = showDetail();  // meal is an array
        mealDiv.innerHTML = `
        <div onclick="mealClicked('${meal.strMeal}')"> 
        <img  class = "mealImage" src = "${meal.strMealThumb}"  >
        <h3 class = "meal-h3">${meal.strMeal}</h3>
        </div>
        `;
        mealContainer.appendChild(mealDiv);
        
        
    });
    }


}
// document.getElementsByClassName("mealDiv").addEventListener("click", showDetail);

const  mealClicked = (name) =>{
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(typeof name);
    console.log("xxxxxxxxx: ", name);

    const mealDetail = document.getElementById("mealDetail");
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showDetail(data);
    })

}

const showDetail = data =>{  // here, data is ..
    console.log(data);
    const meal = data.meals[0];
    let mealDetail = document.getElementById("mealDetail");
    mealDetail.innerHTML = `
    <div>
    <img  src = "${meal.strMealThumb}"  >
    <h3 class = "detailText">${meal.strMeal}</h3>
    <div id = "ingredientsDiv">
    <p class = "detailText">Ingredients</p>
    <p>${meal.strMeasure1} ${meal.strIngredient1}</p>
    <p>${meal.strMeasure2} ${meal.strIngredient2}</p>
    <p>${meal.strMeasure3} ${meal.strIngredient3}</p>
    <p>${meal.strMeasure4} ${meal.strIngredient4}</p>
    <p>${meal.strMeasure5} ${meal.strIngredient5}</p>
    <p>${meal.strMeasure6} ${meal.strIngredient6}</p>
    <p>${meal.strMeasure7} ${meal.strIngredient7}</p>
    <p>${meal.strMeasure8} ${meal.strIngredient8}</p>
    </div>
    </div>
    `;
    const ingredients = document.getElementById("ingredients");
console.log("zzzzzzzzzz: ", meal.strIngredient3)
    

    
    // let valuesArray = Object.values(meal); 
  
    // for (let value of valuesArray) { 
    //   console.log(value); 
    // } 

    // const li = document.createElement("li");
    // li.innerText = ;
}

const nothingFound = (mealInput) =>{
    const mealContainer = document.getElementById("mealContainer");
    mealContainer.style.border = "1px solid black";
    mealContainer.style.display = "block";
    const h1 = document.createElement("h1");
    h1.innerText = "Nothing found named " + "\'" + mealInput + "\'";
    mealContainer.appendChild(h1);
    
    
}

