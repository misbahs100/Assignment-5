
let mealInput = document.getElementById("mealInput").value;
document.getElementById("searchBtn").addEventListener("click", function () {
    loadData(mealInput);
})

// loadData(); function for fetching the data 
const loadData = (mealInput) => {  //parameter will be the input value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`)
        .then(res => res.json())
        .then(data => {
            displayData(data);
        })
}

const displayData = data => {
    console.log(data);
    const allMeals = data.meals;  // allMeals is an array
    console.log("all Meals: ", allMeals);
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

const showDetail = data =>{
    console.log(data);
    const meal = data.meals[0];
    let mealDetail = document.getElementById("mealDetail");
    mealDetail.innerHTML = `
    <img  src = "${meal.strMealThumb}"  >
    <h3 >${meal.strMeal}</h3>
    `;
    
}

