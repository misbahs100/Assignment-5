
document.getElementById("searchBtn").addEventListener("click", function () {
    let mealInput = document.getElementById("mealInput").value;

    document.getElementById("mealDetail").innerText = "";     // when new meal is searched, the previous serched-results will be removed
    document.getElementById("mealContainer").innerText = "";   //  ;;
    if (mealInput == "") {
        nothingFound(mealInput);
    }
    else {
        loadData(mealInput);
    }
});

// function for fetching the data 
const loadData = mealInput => {  //parameter will be the searched input value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`)
        .then(res => res.json())
        .then(data => {
            displayData(data, mealInput);
        })
}

// function for displaying all the related/matched meals
const displayData = (data, mealInput) => {
    const allMeals = data.meals;     // allMeals is an array

    if (allMeals === null) {
        nothingFound(mealInput);   // if the searched item is not matched with any meals
    }
    else {
        const mealContainer = document.getElementById("mealContainer");
        mealContainer.style.display = "grid";
        allMeals.forEach(meal => {     // meal is an object
            const mealDiv = document.createElement("div");
            mealDiv.className = "mealDiv";
            mealDiv.innerHTML = `
            <div onclick="mealClicked('${meal.strMeal}')"> 
            <img  class = "mealImage" src = "${meal.strMealThumb}"  >
            <h3 class = "meal-h3">${meal.strMeal}</h3>
            </div>
            `;
            mealContainer.appendChild(mealDiv);
        })
    }
}

// function for when individual searched-result will be clicked
const mealClicked = (mealName) => {
    const mealDetail = document.getElementById("mealDetail");
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showDetail(data);
        })
}

// function for showing details for an individual meal - after when it is clicked
const showDetail = data => {  
    const meal = data.meals[0];   // meal is an object
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
}

// function for showing a message when nothing is searched or no meals matched with the input
const nothingFound = (mealInput) => {
    const mealContainer = document.getElementById("mealContainer");
    
    if (mealInput == "") {    // when nothing is searched
        mealContainer.style.display = "block";
        const h1 = document.createElement("h1");
        h1.innerText = "You did not search anything!";
        mealContainer.appendChild(h1);
    }
    else {   // when no meals matched with the input
        mealContainer.style.display = "block";
        const h1 = document.createElement("h1");
        h1.innerText = "No meals found named " + "\'" + mealInput + "\'";
        mealContainer.appendChild(h1);
    }
}

