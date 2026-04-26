﻿(() => {
  "use strict";

  const STORAGE_KEYS = {
    recipes: "recipes",
    favorites: "favorites",
    users: "users",
    authUser: "authUser",
  };

  const defaultRecipes = [
    {
      name: "Egyptian Molokhia",
      ingredients: ["500g finely chopped molokhia leaves", "3 cups rich chicken or beef broth", "1 tbsp ghee", "5 garlic cloves", "1 tbsp dried coriander", "¼ tsp sugar", "pinch of baking soda"],
      image: "Molokhia.jpeg",
      instructions: "Heat the broth with a pinch of sugar and one raw garlic clove. Once boiling, add the molokhia and reduce heat completely. Stir continuously with a whisk to remove lumps. As soon as it starts to boil (one quick bubble), remove from heat immediately. Do not cover. In a pan, sauté garlic in ghee until lightly golden, then add dried coriander and cook until fragrant. Pour the hot tasha over the molokhia, then cover briefly for a few seconds to absorb the aroma.",
    },
    {
      name: "Egyptian Koshari",
      ingredients: ["rice", "brown lentils", "small macaroni", "spaghetti", "vermicelli", "cooked chickpeas", "onions", "starch", "tomato sauce", "vinegar", "cumin", "black pepper", "garlic", "chili"],
      image: "Koshari.jpeg",
      instructions: "Crispy Onions: Slice onions into strips, coat with starch and salt, then deep-fry until golden. Save the frying oil. Rice & Lentils: In a pot, heat some onion oil, toast vermicelli, then add rice, soaked lentils, salt, and cumin. Add water, cover, and cook until done. Pasta: Boil and drain, then toss with 2 tbsp of onion oil and black pepper. Tomato Sauce: Sauté garlic in onion oil, deglaze with vinegar, then add tomato sauce, salt, pepper, cumin, and a pinch of sugar. Daqa: Mix garlic, vinegar, lemon juice, cumin, hot water, and chili. Layer rice, lentils, pasta, chickpeas, top with crispy onions, tomato sauce, and daqa.",
    },
    {
      name: "Egyptian Mahshi",
      ingredients: ["Egyptian rice", "thick cooked tomato sauce", "minced onions", "fresh dill", "fresh parsley", "fresh coriander", "zucchini", "eggplant", "grape leaves", "cabbage", "salt", "black pepper", "cumin", "dried coriander", "dried mint", "chili", "chicken or beef broth"],
      image: "Mahshi.jpeg",
      instructions: "Stuffing: Sauté onions in oil and ghee until soft. Add tomato juice and cook until thickened and oil separates on top. Remove from heat, then mix in rice, herbs, and spices. Do not cook the rice at this stage. Stuff vegetables (zucchini, eggplant, grape leaves, cabbage) but do not overfill as rice expands during cooking. Arrange in a pot and pour hot broth (mixed with a spoon of tomato paste) until just below the top layer. Cook on high heat until most liquid is absorbed, then reduce heat and simmer until fully cooked.",
    },
    {
      name: "Saudi Chicken Kabsa",
      ingredients: ["1 whole chicken cut into quarters", "3 cups basmati rice soaked", "1 chopped onion", "1 garlic clove", "1 grated tomato", "1 tbsp tomato paste", "dried lime loomi", "cinnamon", "cardamom", "cloves", "bay leaves", "1 tbsp Kabsa spice mix", "turmeric", "salt", "black pepper"],
      image: "Kabsa.jpeg",
      instructions: "In a large pot, heat oil and sauté the onion and garlic until soft. Add the whole spices and stir until fragrant. Add the chicken pieces and cook until lightly browned. Then add the tomato, tomato paste, and ground spices. Pour in boiling water and let the chicken cook completely. Once done, remove the chicken (you can roast it later for extra flavor). Add the rice to the broth, making sure the liquid covers it by about 2 cm. Cook on high heat until the liquid is absorbed, then reduce the heat to low and let it simmer until the rice is fluffy and fully cooked.",
    },
    {
      name: "Saudi Areeka",
      ingredients: ["2 cups whole wheat flour", "pinch of salt", "warm water for dough", "pitted dates", "ghee", "honey", "cream optional"],
      image: "Areeka.jpeg",
      instructions: "Mix the flour, salt, and water to form a slightly thick batter (a bit thicker than pancake batter). Pour it into a greased pan and cook on both sides until golden, like a large flatbread. While still very hot, place the bread in a bowl or bag with the dates and mash/knead them together thoroughly until fully combined. Shape into a ball, place in a serving dish, make a hole in the center, and fill it with ghee and honey. Garnish with cream if desired.",
    },
    {
      name: "Saudi Royal Masoub",
      ingredients: ["3 ripe bananas", "2 whole wheat flatbreads or crumbled bread", "1 can cream", "honey", "ghee", "grated cheddar cheese optional"],
      image: "Masoub.jpeg",
      instructions: "Crumble the bread finely using a food processor. Mash the bananas until smooth, then mix with the bread. Add half of the cream and a spoon of ghee, and mix until well combined. Transfer to a serving plate and top with the remaining cream, honey, and optional cheese.",
    },
    {
      name: "Italian Pizza Napoletana",
      ingredients: ["500g high-quality flour (type 00)", "325ml warm water", "10g salt", "3g dry yeast", "canned peeled tomatoes", "fresh mozzarella", "fresh basil leaves", "olive oil"],
      image: "Pizza Napoletana.jpeg",
      instructions: "Knead all the dough ingredients until smooth, then let it rise for 6–8 hours (or overnight in the fridge for better flavor). Divide into balls and stretch them by hand (do not use a rolling pin to preserve air in the edges). Add the sauce, fresh mozzarella, basil leaves, and a drizzle of olive oil. Bake at the highest oven temperature (preferably on a pizza stone) for 5–7 minutes.",
    },
    {
      name: "Italian Pasta Carbonara",
      ingredients: ["200g spaghetti", "2 egg yolks + 1 whole egg", "50g grated Parmesan cheese", "100g pancetta (or salami)", "freshly ground black pepper"],
      image: "Carbonara.jpeg",
      instructions: "Cook the pasta in salted water until al dente. In a bowl, mix the eggs with Parmesan and black pepper. Cook the pancetta in a pan until crispy, then remove from heat and add the cooked pasta along with a little pasta water. Important step: Wait about 30 seconds for the heat to slightly reduce (to avoid scrambling the eggs), then add the egg and cheese mixture. Stir quickly and continuously until a smooth, creamy sauce forms.",
    },
    {
      name: "Italian Lasagna alla Bolognese",
      ingredients: ["lasagna sheets (fresh)", "ground beef", "onion", "carrot", "celery", "tomato sauce", "butter", "flour", "milk", "nutmeg", "Parmesan cheese"],
      image: "Lasagna alla Bolognese.jpeg",
      instructions: "Bolognese Sauce: Sauté ground beef with onion, carrot, and celery, then simmer with tomato sauce on very low heat for about 2 hours. Béchamel Sauce: Melt butter, add flour, then gradually whisk in milk and a pinch of nutmeg until light and smooth. In a baking dish, start with a layer of béchamel, then lasagna sheets, then meat sauce, followed by béchamel and cheese. Repeat the layers, finishing with a generous layer of béchamel and cheese on top. Bake at 180°C (350°F) for 30–40 minutes until golden brown.",
    },
    {
      name: "Italian Mushroom Risotto",
      ingredients: ["1 cup Arborio rice", "1 liter hot chicken or vegetable broth", "1 chopped onion", "fresh mushrooms", "butter", "Parmesan cheese"],
      image: "Mushroom Risotto.jpeg",
      instructions: "Sauté the onion in butter, then add the mushrooms and cook. Add the rice (uncooked) and stir for 2 minutes until heated. The key technique: Add one ladle of hot broth at a time, stirring constantly until absorbed. Repeat this process (ladle by ladle) for 18–20 minutes. Once the rice is creamy and cooked, remove from heat and add cold butter and a handful of Parmesan cheese. Stir vigorously (this step is called mantecatura).",
    },
    {
      name: "Spanish Seafood Paella",
      ingredients: ["2 cups short-grain rice (Bomba or Egyptian)", "500g mixed seafood (shrimp, squid, mussels)", "1 chopped onion", "1 red bell pepper", "3 garlic cloves", "grated tomatoes", "saffron threads", "1 tbsp paprika", "hot fish stock", "olive oil"],
      image: "Paella de Marisco.jpeg",
      instructions: "In a wide, shallow pan, sauté the seafood in olive oil, then set it aside. In the same pan, sauté the onion, pepper, and garlic. Add the grated tomatoes, paprika, and saffron. Add the rice and stir for 2 minutes. Pour in the hot stock (twice the amount of rice). Arrange the seafood on top and let it cook on low heat for 15–20 minutes without stirring until the liquid is absorbed and you hear a slight crackling sound at the bottom.",
    },
    {
      name: "Spanish Tortilla de Patatas",
      ingredients: ["4 medium potatoes", "1 large onion", "5 eggs", "extra virgin olive oil", "salt"],
      image: "Tortilla de Patatas.jpeg",
      instructions: "Cut the potatoes into small cubes or thin slices, and slice the onion. Cook the potatoes and onion in plenty of olive oil over low heat until soft (not crispy). Drain them from the oil and mix with beaten eggs and salt. Let the mixture rest for 10 minutes. In a non-stick pan with a little oil, pour the mixture and cook until set. Flip it using a flat plate to cook the other side until golden.",
    },
    {
      name: "Spanish Patatas Bravas",
      ingredients: ["potato cubes for frying", "olive oil", "1 tbsp flour", "1 tbsp smoked paprika", "1 tsp chili powder", "chicken broth or water"],
      image: "Patatas Bravas.jpeg",
      instructions: "Fry the potatoes until golden and very crispy. For the sauce: cook the flour in olive oil, then add paprika and chili and stir quickly. Gradually add broth while stirring until you get a thick sauce. Pour the sauce over the potatoes and serve hot.",
    },
    {
      name: "Spanish Churros",
      ingredients: ["1 cup water", "2 tbsp butter", "1 tbsp sugar", "pinch of salt", "1 cup flour", "1 egg (optional)", "sugar and cinnamon for coating", "melted dark chocolate for serving"],
      image: "Churros.jpeg",
      instructions: "In a saucepan, bring water, butter, sugar, and salt to a boil. Add the flour all at once and stir vigorously until a smooth dough forms and pulls away from the sides. Remove from heat, let it cool slightly, then mix in the egg. Transfer the dough to a piping bag with a star tip, and pipe into hot oil. Fry until golden, then roll in sugar and cinnamon. Serve with melted dark chocolate.",
    },
  ];

  // Load array data from browser storage safely (with error handling)
  function loadJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  function loadValue(key, fallback) {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  }

  function loadObject(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  // ========================================
  // APP STATE - Central data storage
  // ========================================
  function mergeDefaultRecipes() {
    const stored = loadJson(STORAGE_KEYS.recipes, []);
    if (!stored.length) return defaultRecipes;
    const storedNames = new Set(stored.map((r) => r.name));
    const missing = defaultRecipes.filter((r) => !storedNames.has(r.name));
    if (missing.length) {
      const merged = [...stored, ...missing];
      localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(merged));
      return merged;
    }
    return stored;
  }

  function cleanupOldRecipes() {
    const stored = loadJson(STORAGE_KEYS.recipes, []);
    const allowedNames = new Set(defaultRecipes.map((r) => r.name));
    const cleaned = stored.filter((r) => allowedNames.has(r.name));
    if (cleaned.length !== stored.length) {
      localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(cleaned));
    }
    return cleaned;
  }

  function mergeDefaultRecipes() {
    const stored = cleanupOldRecipes();
    if (!stored.length) return defaultRecipes;
    const storedNames = new Set(stored.map((r) => r.name));
    const missing = defaultRecipes.filter((r) => !storedNames.has(r.name));
    if (missing.length) {
      const merged = [...stored, ...missing];
      localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(merged));
      return merged;
    }
    return stored;
  }

  const state = {
    userIngredients: [],
    favorites: loadJson(STORAGE_KEYS.favorites, []),
    recipes: mergeDefaultRecipes(),
  };

  // Save recipes and favorites back to localStorage
  function saveState() {
    localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(state.recipes));
    localStorage.setItem(
      STORAGE_KEYS.favorites,
      JSON.stringify(state.favorites),
    );
  }

  // Quick helper to get HTML elements by ID
  function getElement(id) {
    return document.getElementById(id);
  }

  function getIngredientsListElement() {
    return getElement("ingredientsList") || getElement("ingredientList");
  }

  // Clean ingredient name (remove spaces, lowercase for matching)
  function normalizeIngredient(value) {
    return value.trim().toLowerCase();
  }

  function normalizeEmail(value) {
    return value.trim().toLowerCase();
  }

  // Escape HTML characters to prevent XSS attacks (security)
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

  function formatInstructions(text) {
    if (!text) {
      return `<p>${t("No instructions provided.")}</p>`;
    }

    const sections = text.split(/\. (?=[A-Z])/).filter((s) => s.trim());
    if (sections.length > 1) {
      return sections
        .map(
          (section, index) =>
            `<p><strong>${index + 1}.</strong> ${escapeHtml(
              section.trim(),
            )}</p>`,
        )
        .join("");
    }

    return `<p>${escapeHtml(text)}</p>`;
  }

  function getUsers() {
    return loadJson(STORAGE_KEYS.users, []);
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }

  function getCurrentUser() {
    return loadObject(STORAGE_KEYS.authUser, null);
  }

  function setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  }

  function clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.authUser);
  }

  function getPageName() {
    const segments = window.location.pathname.split("/");
    return (segments.pop() || "main.html").toLowerCase();
  }

  function getRedirectTarget(defaultTarget = "main.html") {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (!redirect) return defaultTarget;
    if (redirect.includes("://") || redirect.startsWith("//"))
      return defaultTarget;
    return redirect;
  }

  function setAuthMessage(key, isError = true) {
    const el = getElement("authMessage");
    if (!el) return;
    el.textContent = t(key);
    el.classList.toggle("is-error", isError);
    el.classList.toggle("is-success", !isError);
  }

  function requireAuth() {
    const protectedPages = new Set([
      "main.html",
      "favourites.html",
      "add-recipe.html",
      "recipe.html",
    ]);
    const page = getPageName();
    const user = getCurrentUser();
    if (!protectedPages.has(page)) return true;
    if (user) return true;
    const redirect = encodeURIComponent(
      `${page}${window.location.search || ""}`,
    );
    window.location.href = `login.html?redirect=${redirect}`;
    return false;
  }

  function redirectIfAuthenticated() {
    const authPages = new Set(["login.html", "signup.html"]);
    const page = getPageName();
    const user = getCurrentUser();
    if (!authPages.has(page) || !user) return;
    window.location.href = getRedirectTarget("main.html");
  }

  function signup() {
    const nameInput = getElement("signupName");
    const emailInput = getElement("signupEmail");
    const passwordInput = getElement("signupPassword");
    const confirmInput = getElement("signupConfirmPassword");
    if (!nameInput || !emailInput || !passwordInput || !confirmInput) return;

    const name = nameInput.value.trim();
    const email = normalizeEmail(emailInput.value);
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (!name || !email || !password || !confirmPassword) {
      setAuthMessage("Please enter name, email, and password.");
      return;
    }
    if (password.length < 6) {
      setAuthMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setAuthMessage("Passwords do not match.");
      return;
    }

    const users = getUsers();
    const exists = users.some((user) => normalizeEmail(user.email) === email);
    if (exists) {
      setAuthMessage("Email already registered.");
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    setAuthMessage("Account created successfully. Please log in.", false);
    setTimeout(() => {
      window.location.href = "login.html";
    }, 900);
  }

  function login() {
    const emailInput = getElement("loginEmail");
    const passwordInput = getElement("loginPassword");
    if (!emailInput || !passwordInput) return;

    const email = normalizeEmail(emailInput.value);
    const password = passwordInput.value;
    if (!email || !password) {
      setAuthMessage("Please enter email and password.");
      return;
    }

    const users = getUsers();
    const user = users.find(
      (entry) =>
        normalizeEmail(entry.email) === email && entry.password === password,
    );
    if (!user) {
      setAuthMessage("Invalid email or password.");
      return;
    }

    setCurrentUser({ name: user.name, email: user.email });
    setAuthMessage("Logged in successfully.", false);
    setTimeout(() => {
      window.location.href = getRedirectTarget("main.html");
    }, 350);
  }

  function logout() {
    clearCurrentUser();
    window.location.href = "login.html";
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
              ? `<p class='success'>${t("Ready to cook")}</p>`
              : `<p class="missing">${t("Missing:")} ${missing.map(escapeHtml).join(", ")}</p>`
          }
          <div class="actions">
            <span class="favorite" onclick="RecipeManager.toggleFavorite('${encodedName}')">
              ${isFavorite ? "❤️" : "🤍"}
            </span>
            <button onclick="RecipeManager.goToRecipe('${encodedName}')">${t("View")}</button>
            <button onclick="RecipeManager.shareRecipe('${encodedName}')">${t("Share")}</button>
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
        const normalizedIngredients =
          recipe.ingredients.map(normalizeIngredient);
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
      container.innerHTML = `<p style='text-align:center;'>${t("No recipes found.")}</p>`;
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
    showMessage(t("Favorites updated."));
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
      container.innerHTML = `<p style='text-align:center;'>${t("No favorites yet.")}</p>`;
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
              <button onclick="RecipeManager.goToRecipe('${encodedName}')">${t("View")}</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function loadEgyptianRecipes() {
    const container = getElement("egyptianContainer");
    if (!container) return;

    const egyptianNames = ["Egyptian Molokhia", "Egyptian Koshari", "Egyptian Mahshi"];
    const egyptianRecipes = state.recipes.filter((recipe) =>
      egyptianNames.includes(recipe.name),
    );

    if (egyptianRecipes.length === 0) {
      container.innerHTML = `<p style='text-align:center;'>${t("No recipes found.")}</p>`;
      return;
    }

    container.innerHTML = egyptianRecipes
      .map((recipe) => {
        const encodedName = encodeURIComponent(recipe.name);
        const isFavorite = state.favorites.includes(recipe.name);
        return `
          <div class="card">
            <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
            <div class="card-body">
              <h3>${escapeHtml(recipe.name)}</h3>
              <p>${recipe.ingredients.map(escapeHtml).join(", ")}</p>
              <div class="actions">
                <span class="favorite" onclick="RecipeManager.toggleFavorite('${encodedName}')">
                  ${isFavorite ? "❤️" : "🤍"}
                </span>
                <button onclick="RecipeManager.goToRecipe('${encodedName}')">${t("View")}</button>
                <button onclick="RecipeManager.shareRecipe('${encodedName}')">${t("Share")}</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function loadSaudiRecipes() {
    const container = getElement("saudiContainer");
    if (!container) return;

    const saudiNames = ["Saudi Chicken Kabsa", "Saudi Areeka", "Saudi Royal Masoub"];
    const saudiRecipes = state.recipes.filter((recipe) =>
      saudiNames.includes(recipe.name),
    );

    if (saudiRecipes.length === 0) {
      container.innerHTML = `<p style='text-align:center;'>${t("No recipes found.")}</p>`;
      return;
    }

    container.innerHTML = saudiRecipes
      .map((recipe) => {
        const encodedName = encodeURIComponent(recipe.name);
        const isFavorite = state.favorites.includes(recipe.name);
        return `
          <div class="card">
            <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
            <div class="card-body">
              <h3>${escapeHtml(recipe.name)}</h3>
              <p>${recipe.ingredients.map(escapeHtml).join(", ")}</p>
              <div class="actions">
                <span class="favorite" onclick="RecipeManager.toggleFavorite('${encodedName}')">
                  ${isFavorite ? "❤️" : "🤍"}
                </span>
                <button onclick="RecipeManager.goToRecipe('${encodedName}')">${t("View")}</button>
                <button onclick="RecipeManager.shareRecipe('${encodedName}')">${t("Share")}</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function loadItalianRecipes() {
    const container = getElement("italianContainer");
    if (!container) return;

    const italianNames = ["Italian Pizza Napoletana", "Italian Pasta Carbonara", "Italian Lasagna alla Bolognese", "Italian Mushroom Risotto"];
    const italianRecipes = state.recipes.filter((recipe) =>
      italianNames.includes(recipe.name),
    );

    if (italianRecipes.length === 0) {
      container.innerHTML = `<p style='text-align:center;'>${t("No recipes found.")}</p>`;
      return;
    }

    container.innerHTML = italianRecipes
      .map((recipe) => {
        const encodedName = encodeURIComponent(recipe.name);
        const isFavorite = state.favorites.includes(recipe.name);
        return `
          <div class="card">
            <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
            <div class="card-body">
              <h3>${escapeHtml(recipe.name)}</h3>
              <p>${recipe.ingredients.map(escapeHtml).join(", ")}</p>
              <div class="actions">
                <span class="favorite" onclick="RecipeManager.toggleFavorite('${encodedName}')">
                  ${isFavorite ? "❤️" : "🤍"}
                </span>
                <button onclick="RecipeManager.goToRecipe('${encodedName}')">${t("View")}</button>
                <button onclick="RecipeManager.shareRecipe('${encodedName}')">${t("Share")}</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function loadSpanishRecipes() {
    const container = getElement("spanishContainer");
    if (!container) return;

    const spanishNames = ["Spanish Seafood Paella", "Spanish Tortilla de Patatas", "Spanish Patatas Bravas", "Spanish Churros"];
    const spanishRecipes = state.recipes.filter((recipe) =>
      spanishNames.includes(recipe.name),
    );

    if (spanishRecipes.length === 0) {
      container.innerHTML = `<p style='text-align:center;'>${t("No recipes found.")}</p>`;
      return;
    }

    container.innerHTML = spanishRecipes
      .map((recipe) => {
        const encodedName = encodeURIComponent(recipe.name);
        const isFavorite = state.favorites.includes(recipe.name);
        return `
          <div class="card">
            <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
            <div class="card-body">
              <h3>${escapeHtml(recipe.name)}</h3>
              <p>${recipe.ingredients.map(escapeHtml).join(", ")}</p>
              <div class="actions">
                <span class="favorite" onclick="RecipeManager.toggleFavorite('${encodedName}')">
                  ${isFavorite ? "❤️" : "🤍"}
                </span>
                <button onclick="RecipeManager.goToRecipe('${encodedName}')">${t("View")}</button>
                <button onclick="RecipeManager.shareRecipe('${encodedName}')">${t("Share")}</button>
              </div>
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
    const instructionsInput = getElement("newInstructions");

    if (!nameInput || !ingredientsInput || !imageInput) return;

    const name = nameInput.value.trim();
    const image = imageInput.value.trim();
    const instructions = instructionsInput ? instructionsInput.value.trim() : "";
    const ingredients = ingredientsInput.value
      .split(",")
      .map(normalizeIngredient)
      .filter(Boolean);

    if (!name || !image || ingredients.length === 0) {
      showMessage(t("Please fill all fields with valid values."));
      return;
    }

    const alreadyExists = state.recipes.some(
      (recipe) => recipe.name.toLowerCase() === name.toLowerCase(),
    );
    if (alreadyExists) {
      showMessage(t("A recipe with this name already exists."));
      return;
    }

    state.recipes.push({
      name,
      ingredients: [...new Set(ingredients)],
      image,
      instructions,
    });
    saveState();
    showMessage(t("Recipe added."));

    nameInput.value = "";
    ingredientsInput.value = "";
    imageInput.value = "";
    if (instructionsInput) instructionsInput.value = "";
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
      container.innerHTML = `<p>${t("Recipe not found.")}</p>`;
      return;
    }

    const favoriteLabel = state.favorites.includes(recipe.name)
      ? t("Remove from favorites")
      : t("Add to favorites");

    container.innerHTML = `
      <div class="card" style="max-width:600px;margin:40px auto;">
        <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
        <div class="card-body">
          <h2>${escapeHtml(recipe.name)}</h2>
          <h4>${t("Ingredients:")}</h4>
          <ul>${recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          <h4>${t("Instructions:")}</h4>
          ${formatInstructions(recipe.instructions)}
          <button onclick="RecipeManager.toggleFavorite('${encodedName}')">${favoriteLabel}</button>
          <button onclick="RecipeManager.shareRecipe('${encodedName}')">${t("Share")}</button>
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
        await navigator.share({ title: t("Recipe"), url: link });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        throw new Error("No share API available.");
      }
      showMessage(t("Recipe link ready to share."));
    } catch {
      showMessage(t("Unable to share this recipe right now."));
    }
  }

  // ========================================
  // NEW AI MEAL PLANNER
  // ========================================
  function generateMockMealPlan(preferences, ingredients, weight) {
    const aiDays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const aiMeals = ["Egyptian Koshari", "Saudi Chicken Kabsa", "Italian Pizza Napoletana", "Italian Pasta Carbonara", "Egyptian Molokhia", "Italian Lasagna alla Bolognese", "Saudi Areeka"];
    const tableRows = aiDays.map((day, i) => {
      const mealIndex = i % aiMeals.length;
      const meal = aiMeals[mealIndex];
      const dayNotes = i + 1 === aiDays.length ? "Rest day" : "Breakfast/Lunch";
      let personalNote = "";
      if (weight > 80) personalNote = "<br><em>High protein for weight management</em>";
      else if (weight < 60) personalNote = "<br><em>Calorie dense for energy</em>";
      if (preferences.includes("loss") || preferences.includes("diet")) personalNote += "<br><em>Weight loss focus</em>";
      if (preferences.includes("gain") || preferences.includes("muscle")) personalNote += "<br><em>Muscle gain focus</em>";
      return `<tr><td><strong>${escapeHtml(day)}</strong></td><td>${escapeHtml(meal)}</td><td>${escapeHtml(dayNotes)}<br><small>Using: ${escapeHtml(ingredients)}</small>${preferences.includes("high protein") ? "<br><em>💪 High protein</em>" : ""}${preferences.includes("budget") ? "<br><em>💰 Budget friendly</em>" : ""}${personalNote}</td></tr>`;
    }).join("");
    return `<table class="ai-table"><thead><tr><th>📅 Day</th><th>🍳 Meal</th><th>Notes</th></tr></thead><tbody>${tableRows}</tbody></table>`;
  }

  async function generateMealPlan() {
    const resultEl = getElement("aiPlanResult");
    const prefsInput = getElement("aiPreferences");
    if (!resultEl || !prefsInput) return;
    const preferences = prefsInput.value.trim();
    const weight = 70;
    const ingredients = state.userIngredients.join(", ");
    resultEl.textContent = "🤖 AI is generating your personalized meal plan...";
    resultEl.className = "ai-result is-loading";
    const openaiKeyInput = getElement("openaiKey");
    const openaiKey = openaiKeyInput ? openaiKeyInput.value.trim() : "";
    if (openaiKey) {
      resultEl.textContent = "🤖 OpenAI analyzing your data...";
      resultEl.className = "ai-result is-loading";
      const prompt = `Create a 7-day meal plan table for weight ${weight}kg, needs "${preferences}", ingredients "${ingredients}". Use simple healthy recipes. Output ONLY complete HTML table with columns Day, Meal, Notes.`;
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${openaiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: prompt }], max_tokens: 1000, temperature: 0.7 })
        });
        const data = await response.json();
        const tableHtml = data.choices[0].message.content.trim();
        resultEl.innerHTML = tableHtml;
        resultEl.className = "ai-result";
      } catch (error) {
        resultEl.textContent = "OpenAI error: " + error.message + ". Using smart mock.";
        resultEl.className = "ai-result is-error";
        setTimeout(() => {
          resultEl.innerHTML = generateMockMealPlan(preferences, ingredients, weight);
          resultEl.className = "ai-result";
        }, 500);
      }
      return;
    }
    setTimeout(() => {
      resultEl.innerHTML = generateMockMealPlan(preferences, ingredients, weight);
      resultEl.className = "ai-result";
    }, 2000);
  }

  const RecipeManager = {
    addIngredient,
    clearIngredients,
    removeIngredient,
    searchRecipes,
    toggleFavorite,
    loadFavorites,
    loadEgyptianRecipes,
    loadSaudiRecipes,
    loadItalianRecipes,
    loadSpanishRecipes,
    addRecipe,
    goToRecipe,
    loadRecipeDetails,
    shareRecipe,
    generateMealPlan, // AI meal planner
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
  window.signup = signup;
  window.login = login;
  window.logout = logout;
  window.generateMealPlan = generateMealPlan;

  // Language & Theme Toggle
  function t(key) {
    const lang = document.documentElement.lang || "en";
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  }

  function updateAllTexts() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      el.setAttribute("placeholder", t(key));
    });
    // Update dynamic elements like cards if needed
    if (window.RecipeManager?.searchRecipes)
      window.RecipeManager.searchRecipes();
    if (window.RecipeManager?.loadFavorites)
      window.RecipeManager.loadFavorites();
    if (window.RecipeManager?.loadRecipeDetails)
      window.RecipeManager.loadRecipeDetails();
  }

  function initLang() {
    const savedLang = loadValue("lang", "en");
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("ar", savedLang === "ar");
    updateAllTexts();
  }

  window.toggleLang = function () {
    const current = document.documentElement.lang || "en";
    const nextLang = current === "en" ? "ar" : "en";
    localStorage.setItem("lang", nextLang);
    initLang();
    document.getElementById("langToggle").textContent = nextLang.toUpperCase();
  };

  function initTheme() {
    const savedTheme = loadValue("theme", "light");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }

  window.toggleTheme = function () {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.getElementById("themeToggle").textContent = isDark ? "☀️" : "🌙";
  };

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLang();
    redirectIfAuthenticated();
    if (!requireAuth()) return;

    renderIngredients();
    loadFavorites();
    loadEgyptianRecipes();
    loadSaudiRecipes();
    loadItalianRecipes();
    loadSpanishRecipes();
    loadRecipeDetails();
    searchRecipes();

    // Setup button listeners if elements exist
    const langBtn = document.getElementById("langToggle");
    const themeBtn = document.getElementById("themeToggle");
    const logoutBtn = document.getElementById("logoutBtn");
    if (langBtn) {
      langBtn.textContent = document.documentElement.lang.toUpperCase();
      langBtn.onclick = window.toggleLang;
    }
    if (themeBtn) {
      themeBtn.textContent = document.documentElement.classList.contains("dark")
        ? "☀️"
        : "🌙";
      themeBtn.onclick = window.toggleTheme;
    }
    if (logoutBtn) {
      logoutBtn.onclick = window.logout;
    }
  });
})();
