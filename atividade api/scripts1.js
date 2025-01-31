document.getElementById('cocktailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('cocktailInput').value.trim();
    if (query) {
        fetchCocktail(query);
    }
});

document.getElementById('mealForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('mealInput').value.trim();
    if (query) {
        fetchMeal(query);
    }
});

function fetchCocktail(query) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            console.log("Dados de coquetéis recebidos:", data);
            const resultsContainer = document.getElementById('cocktailResults');
            resultsContainer.innerHTML = '';  
            if (data.drinks) {
                data.drinks.forEach(drink => {
                    const item = document.createElement('div');
                    item.className = 'resultItem';
                    item.innerHTML = `
                        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <h3>${drink.strDrink}</h3>
                        <p><strong>Categoria:</strong> ${drink.strCategory || 'Não informado'}</p>
                        <p><strong>Tipo de copo:</strong> ${drink.strGlass || 'Não informado'}</p>
                        <p><strong>Instruções:</strong> ${drink.strInstructions || 'Nenhuma instrução disponível'}</p>
                    `;
                    resultsContainer.appendChild(item);
                });
            } else {
                displayNoResults(resultsContainer, 'Nenhum coquetel encontrado.');
            }
        })
        .catch(error => console.error('Erro ao buscar coquetel:', error));
}

function fetchMeal(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            console.log("Dados de refeições recebidos:", data);
            const resultsContainer = document.getElementById('mealResults');
            resultsContainer.innerHTML = '';  
            if (data.meals) {
                data.meals.forEach(meal => {
                    const item = document.createElement('div');
                    item.className = 'resultItem';
                    item.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                        <p><strong>Categoria:</strong> ${meal.strCategory || 'Não informado'}</p>
                        <p><strong>Cozinha:</strong> ${meal.strArea || 'Não informado'}</p>
                        <p><strong>Instruções:</strong> ${meal.strInstructions || 'Nenhuma instrução disponível'}</p>
                    `;
                    resultsContainer.appendChild(item);
                });
            } else {
                displayNoResults(resultsContainer, 'Nenhuma refeição encontrada.');
            }
        })
        .catch(error => console.error('Erro ao buscar refeição:', error));
}

function displayNoResults(container, message) {
    const item = document.createElement('div');
    item.className = 'resultItem';
    item.innerHTML = `<p>${message}</p>`;
    container.appendChild(item);
}
