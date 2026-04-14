(() => {
  "use strict";

  const STORAGE_KEYS = {
    recipes: "recipes",
    favorites: "favorites",
  };

  const defaultRecipes = [
    {
      name: "Omelette",
      ingredients: ["egg", "cheese"],
      image: "Omlette.jpg",
    },
    {
      name: "Shakshuka",
      ingredients: ["egg", "tomato", "onion"],
      image:
        "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Cheese Sandwich",
      ingredients: ["bread", "cheese", "butter"],
      image: "GrilledCheeseSandwich.webp",
    },
    {
      name: "Pancakes",
      ingredients: ["flour", "egg", "milk"],
      image: "Pancakes.webp",
    },
  ];

  const state = {
    userIngredients: [],
    favorites: loadJson(STORAGE_KEYS.favorites, []),
    recipes: loadJson(STORAGE_KEYS.recipes, defaultRecipes),
  };

  function loadJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(state.recipes));
    localStorage.setItem(
      STORAGE_KEYS.favorites,
      JSON.stringify(state.favorites),
    );
  }

  function getElement(id) {
    return document.getElementById(id);
  }

  function getIngredientsListElement() {
    return getElement("ingredientsList") || getElement("ingredientList");
  }

  function normalizeIngredient(value) {
    return value.trim().toLowerCase();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function showMessage(message) {
    console.log(message);
  }

  function addIngredient() {
    const input = getElement("ingredientInput");
    if (!input) return;

    const value = normalizeIngredient(input.value);
    if (!value) return;

    if (!state.userIngredients.includes(value)) {
      state.userIngredients.push(value);
      renderIngredients();
    }

    input.value = "";
  }

  function clearIngredients() {
    state.userIngredients = [];
    renderIngredients();
    searchRecipes();
  }

  function removeIngredient(index) {
    if (index < 0 || index >= state.userIngredients.length) return;
    state.userIngredients.splice(index, 1);
    renderIngredients();
    searchRecipes();
  }

  function renderIngredients() {
    const list = getIngredientsListElement();
    if (!list) return;

    list.innerHTML = state.userIngredients
      .map(
        (item, index) => `
          <span class="tag">
            ${escapeHtml(item)}
            <span onclick="RecipeManager.removeIngredient(${index})" class="remove">x</span>
          </span>
        `,
      )
      .join("");
  }

  function createRecipeCard(recipe, missing) {
    const encodedName = encodeURIComponent(recipe.name);
    const isFavorite = state.favorites.includes(recipe.name);

    return `
      <div class="card">
        <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
        <div class="card-body">
          <h3>${escapeHtml(recipe.name)}</h3>
          <p>${recipe.ingredients.map(escapeHtml).join(", ")}</p>
          ${
            missing.length === 0
              ? "<p class='success'>Ready to cook</p>"
              : `<p class="missing">Missing: ${missing.map(escapeHtml).join(", ")}</p>`
          }
          <div class="actions">
            <span class="favorite" onclick="RecipeManager.toggleFavorite('${encodedName}')">
              ${isFavorite ? "❤️" : "🤍"}
            </span>
            <button onclick="RecipeManager.goToRecipe('${encodedName}')">View</button>
            <button onclick="RecipeManager.shareRecipe('${encodedName}')">Share</button>
          </div>
        </div>
      </div>
    `;
  }

  function searchRecipes() {
    const container = getElement("recipesContainer");
    if (!container) return;

    const hasIngredients = state.userIngredients.length > 0;
    const scored = state.recipes
      .map((recipe) => {
        const normalizedIngredients = recipe.ingredients.map(normalizeIngredient);
        const matched = normalizedIngredients.filter((ingredient) =>
          state.userIngredients.includes(ingredient),
        );
        const missing = normalizedIngredients.filter(
          (ingredient) => !state.userIngredients.includes(ingredient),
        );

        return {
          ...recipe,
          matchedCount: matched.length,
          missing,
        };
      })
      .filter((recipe) => (hasIngredients ? recipe.matchedCount > 0 : true))
      .sort((a, b) => b.matchedCount - a.matchedCount);

    if (scored.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>No recipes found.</p>";
      return;
    }

    container.innerHTML = scored
      .map((recipe) => createRecipeCard(recipe, recipe.missing))
      .join("");
  }

  function toggleFavorite(encodedName) {
    const name = decodeURIComponent(encodedName);
    const isFavorite = state.favorites.includes(name);

    state.favorites = isFavorite
      ? state.favorites.filter((favoriteName) => favoriteName !== name)
      : [...state.favorites, name];

    saveState();
    showMessage("Favorites updated.");
    searchRecipes();
    loadFavorites();
    loadRecipeDetails();
  }

  function loadFavorites() {
    const container = getElement("favoritesContainer");
    if (!container) return;

    const favRecipes = state.recipes.filter((recipe) =>
      state.favorites.includes(recipe.name),
    );

    if (favRecipes.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>No favorites yet.</p>";
      return;
    }

    container.innerHTML = favRecipes
      .map((recipe) => {
        const encodedName = encodeURIComponent(recipe.name);
        return `
          <div class="card">
            <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
            <div class="card-body">
              <h3>${escapeHtml(recipe.name)}</h3>
              <button onclick="RecipeManager.goToRecipe('${encodedName}')">View</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function addRecipe() {
    const nameInput = getElement("newName");
    const ingredientsInput = getElement("newIngredients");
    const imageInput = getElement("newImage");

    if (!nameInput || !ingredientsInput || !imageInput) return;

    const name = nameInput.value.trim();
    const image = imageInput.value.trim();
    const ingredients = ingredientsInput.value
      .split(",")
      .map(normalizeIngredient)
      .filter(Boolean);

    if (!name || !image || ingredients.length === 0) {
      showMessage("Please fill all fields with valid values.");
      return;
    }

    const alreadyExists = state.recipes.some(
      (recipe) => recipe.name.toLowerCase() === name.toLowerCase(),
    );
    if (alreadyExists) {
      showMessage("A recipe with this name already exists.");
      return;
    }

    state.recipes.push({
      name,
      ingredients: [...new Set(ingredients)],
      image,
    });
    saveState();
    showMessage("Recipe added.");

    nameInput.value = "";
    ingredientsInput.value = "";
    imageInput.value = "";
  }

  function goToRecipe(encodedName) {
    window.location.href = `recipe.html?name=${encodedName}`;
  }

  function loadRecipeDetails() {
    const container = getElement("recipeDetails");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const encodedName = params.get("name");
    if (!encodedName) return;

    const recipeName = decodeURIComponent(encodedName);
    const recipe = state.recipes.find((entry) => entry.name === recipeName);
    if (!recipe) {
      container.innerHTML = "<p>Recipe not found.</p>";
      return;
    }

    const favoriteLabel = state.favorites.includes(recipe.name)
      ? "Remove from favorites"
      : "Add to favorites";

    container.innerHTML = `
      <div class="card" style="max-width:600px;margin:40px auto;">
        <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
        <div class="card-body">
          <h2>${escapeHtml(recipe.name)}</h2>
          <h4>Ingredients:</h4>
          <ul>${recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          <button onclick="RecipeManager.toggleFavorite('${encodedName}')">${favoriteLabel}</button>
          <button onclick="RecipeManager.shareRecipe('${encodedName}')">Share</button>
        </div>
      </div>
    `;
  }

  async function shareRecipe(encodedName) {
    const url = new URL("recipe.html", window.location.href);
    url.searchParams.set("name", encodedName);
    const link = url.toString();

    try {
      if (navigator.share) {
        await navigator.share({ title: "Recipe", url: link });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        throw new Error("No share API available.");
      }
      showMessage("Recipe link ready to share.");
    } catch {
      showMessage("Unable to share this recipe right now.");
    }
  }

  const RecipeManager = {
    addIngredient,
    clearIngredients,
    removeIngredient,
    searchRecipes,
    toggleFavorite,
    loadFavorites,
    addRecipe,
    goToRecipe,
    loadRecipeDetails,
    shareRecipe,
  };

  window.RecipeManager = RecipeManager;

  window.addIngredient = addIngredient;
  window.removeIngredient = removeIngredient;
  window.searchRecipes = searchRecipes;
  window.toggleFavorite = toggleFavorite;
  window.loadFavorites = loadFavorites;
  window.addRecipe = addRecipe;
  window.goToRecipe = goToRecipe;
  window.loadRecipeDetails = loadRecipeDetails;
  window.shareRecipe = shareRecipe;

  document.addEventListener("DOMContentLoaded", () => {
    renderIngredients();
    loadFavorites();
    loadRecipeDetails();
    searchRecipes();
  });
})();
