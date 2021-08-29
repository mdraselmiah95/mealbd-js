const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchFieldText)

    //clear data 
    searchField.value = '';


    //load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // searchResult.innerHTML = '';
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick = "loadMealDetails(${meal.idMeal})" class = "card p-2">
                <img src = "${meal.strMealThumb}" class = "card-img-top img-fluid" alt = "meal picture">
                <div class = "card-body">
                    <h5 class ="card-title fw-bolder text-warning">${meal.strMeal}</h5>
                    <p class ="card-text">${meal.strInstructions.slice(0,100)}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);

    });
}

const loadMealDetails = mealId => {
    // console.log(mealId)

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    // console.log(meal)
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src = "${meal.strMealThumb}" class = "card-img-top img-fluid" alt = "meal picture">
        <div class = "card-body">
            <h3 class = "card-title fw-bolder text-warning"> ${meal.strMeal} </h3> 
            <p class = "card-text"> ${meal.strInstructions.slice(0, 130)} </p>
            <a href = "${meal.strYoutube}" class = "btn btn-outline-warning"> Go somewhere </a>
        </div>
    `;
    mealDetails.appendChild(div);
}