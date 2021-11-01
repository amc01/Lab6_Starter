// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
	"https://introweb.tech/assets/json/ghostCookies.json",
	"https://introweb.tech/assets/json/birthdayCake.json",
	"https://introweb.tech/assets/json/chocolateChip.json",
	"/assets/recipes/peanutButterOatmeal.json",
  "/assets/recipes/potatoes.json",
	"/assets/recipes/shrimpSpaget.json",
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {};

window.addEventListener("DOMContentLoaded", init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
	// fetch the recipes and wait for them to load
	let fetchSuccessful = await fetchRecipes();
	// if they didn't successfully load, quit the function
	if (!fetchSuccessful) {
		console.log("Recipe fetch unsuccessful");
		return;
	}
	// Add the first three recipe cards to the page
	createRecipeCards();
	// Make the "Show more" button functional
	bindShowMore();
}

async function fetchRecipes() {
	return new Promise((resolve, reject) => {
		for (let recipe of recipes) {
			fetch(recipe)
				.then((res) => res.json())
				.then((data) => {
					recipeData[recipe] = data;
					if (Object.keys(recipeData).length === recipes.length)
						resolve(true);
				})
				.catch((err) => {
					reject(false);
				});
		}

		// For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
		// in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.
	});
}

function createRecipeCards() {
	for (let i = 0; i < 3; i++) {
		const recipeCard = document.createElement("recipe-card");
		recipeCard.data = recipeData[recipes[i]];
		document.querySelector("main").appendChild(recipeCard);
	}
}

function bindShowMore() {
	var showState = false;
	const button = document.querySelector("button");
	button.addEventListener("click", () => {
		showState = !showState;
		button.innerHTML = showState ? "Show less" : "Show more";
		if (showState) {
			for (let i = 3; i < recipes.length; i++) {
				const recipeCard = document.createElement("recipe-card");
				recipeCard.data = recipeData[recipes[i]];
				document.querySelector("main").appendChild(recipeCard);
			}
		} else {
			const removableRecipes = document.querySelectorAll(
				"main > recipe-card"
			);
			if (removableRecipes.length > 3) {
				for (let i = 3; i < removableRecipes.length; i++) {
					removableRecipes[i].remove();
				}
			}
		}
	});
	// This function is also called for you up above.
	// Use this to add the event listener to the "Show more" button, from within
	// that listener you can then create recipe cards for the rest of the .json files
	// that were fetched. You should fetch every recipe in the beginning, whether you
	// display it or not, so you don't need to fetch them again. Simply access them
	// in the recipeData object where you stored them/
}
