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

  const state = {
    userIngredients: [],
    favorites: loadJson(STORAGE_KEYS.favorites, []),
    recipes: loadJson(STORAGE_KEYS.recipes, defaultRecipes),
  };

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

  function normalizeEmail(value) {
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
    if (redirect.includes("://") || redirect.startsWith("//")) return defaultTarget;
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
    const redirect = encodeURIComponent(`${page}${window.location.search || ""}`);
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
      (entry) => normalizeEmail(entry.email) === email && entry.password === password,
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
      container.innerHTML =
        `<p style='text-align:center;'>${t("No recipes found.")}</p>`;
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
      container.innerHTML =
        `<p style='text-align:center;'>${t("No favorites yet.")}</p>`;
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
    });
    saveState();
    showMessage(t("Recipe added."));

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
  window.signup = signup;
  window.login = login;
  window.logout = logout;

  // Language & Theme Toggle
  const TRANSLATIONS = {
    en: {
      'The Recipe Manager': 'The Recipe Manager',
      'Favourites | The Recipe Manager': 'Favourites | The Recipe Manager',
      'Add Recipe | The Recipe Manager': 'Add Recipe | The Recipe Manager',
      'Recipe Details | The Recipe Manager': 'Recipe Details | The Recipe Manager',
      'Login | The Recipe Manager': 'Login | The Recipe Manager',
      'Sign Up | The Recipe Manager': 'Sign Up | The Recipe Manager',
      Home: 'Home',
      Favourites: 'Favourites',
      'Add Recipe': 'Add Recipe',
      Logout: 'Logout',
      Login: 'Login',
      'Sign Up': 'Sign Up',
      'Welcome Back': 'Welcome Back',
      'Create Account': 'Create Account',
      'No account yet?': 'No account yet?',
      'Create one now': 'Create one now',
      'Already have an account?': 'Already have an account?',
      'Sign in here': 'Sign in here',
      'Full Name': 'Full Name',
      Email: 'Email',
      Password: 'Password',
      'Confirm Password': 'Confirm Password',
      'Find Recipes From Your Ingredients': 'Find Recipes From Your Ingredients',
      'Your Favorites': 'Your Favorites',
      'Add New Recipe': 'Add New Recipe',
      Ingredient: 'Ingredient',
      'Add ingredient ...': 'Add ingredient ...',
      'Recipe Name ...': 'Recipe Name ...',
      Add: 'Add',
      Search: 'Search',
      'Clear All': 'Clear All',
      'AI Weekly Meal Plan': 'AI Weekly Meal Plan',
      'Generate a 7-day meal plan using your current ingredients and your preferences.': 'Generate a 7-day meal plan using your current ingredients and your preferences.',
      'Meal plan preferences': 'Meal plan preferences',
      'Example: high protein, budget friendly, 2 meals/day, no seafood': 'Example: high protein, budget friendly, 2 meals/day, no seafood',
      'Generate Weekly Plan': 'Generate Weekly Plan',
      'Recipe name': 'Recipe name',
      Ingredients: 'Ingredients',
      'Ingredients:': 'Ingredients:',
      'Ingredients (Comma Separated) ...': 'Ingredients (Comma Separated) ...',
      'Image URL': 'Image URL',
      'Image URL ...': 'Image URL ...',
      'Ready to cook': 'Ready to cook',
      'Missing:': 'Missing:',
      View: 'View',
      Share: 'Share',
      Recipe: 'Recipe',
      'Add to favorites': 'Add to favorites',
      'Remove from favorites': 'Remove from favorites',
      'No recipes found.': 'No recipes found.',
      'No favorites yet.': 'No favorites yet.',
      'Recipe not found.': 'Recipe not found.',
      'Recipe added.': 'Recipe added.',
      'Favorites updated.': 'Favorites updated.',
      'Please fill all fields with valid values.': 'Please fill all fields with valid values.',
      'A recipe with this name already exists.': 'A recipe with this name already exists.',
      'Recipe link ready to share.': 'Recipe link ready to share.',
      'Unable to share this recipe right now.': 'Unable to share this recipe right now.',
      'Please enter email and password.': 'Please enter email and password.',
      'Please enter name, email, and password.': 'Please enter name, email, and password.',
      'Passwords do not match.': 'Passwords do not match.',
      'Password must be at least 6 characters.': 'Password must be at least 6 characters.',
      'Email already registered.': 'Email already registered.',
      'Account created successfully. Please log in.': 'Account created successfully. Please log in.',
      'Invalid email or password.': 'Invalid email or password.',
      'Logged in successfully.': 'Logged in successfully.'
    },
    ar: {
      'The Recipe Manager': 'مدير الوصفات',
      'Favourites | The Recipe Manager': 'المفضلة | مدير الوصفات',
      'Add Recipe | The Recipe Manager': 'إضافة وصفة | مدير الوصفات',
      'Recipe Details | The Recipe Manager': 'تفاصيل الوصفة | مدير الوصفات',
      'Login | The Recipe Manager': 'تسجيل الدخول | مدير الوصفات',
      'Sign Up | The Recipe Manager': 'إنشاء حساب | مدير الوصفات',
      Home: 'الرئيسية',
      Favourites: 'المفضلة',
      'Add Recipe': 'إضافة وصفة',
      Logout: 'تسجيل الخروج',
      Login: 'تسجيل الدخول',
      'Sign Up': 'إنشاء حساب',
      'Welcome Back': 'مرحبًا بعودتك',
      'Create Account': 'إنشاء حساب',
      'No account yet?': 'ليس لديك حساب؟',
      'Create one now': 'أنشئ حسابًا الآن',
      'Already have an account?': 'لديك حساب بالفعل؟',
      'Sign in here': 'سجّل الدخول من هنا',
      'Full Name': 'الاسم الكامل',
      Email: 'البريد الإلكتروني',
      Password: 'كلمة المرور',
      'Confirm Password': 'تأكيد كلمة المرور',
      'Find Recipes From Your Ingredients': 'ابحث عن وصفات من مكوناتك',
      'Your Favorites': 'مفضلاتك',
      'Add New Recipe': 'إضافة وصفة جديدة',
      Ingredient: 'مكون',
      'Add ingredient ...': 'أضف مكون...',
      'Recipe Name ...': 'اسم الوصفة...',
      Add: 'إضافة',
      Search: 'بحث',
      'Clear All': 'مسح الكل',
      'AI Weekly Meal Plan': 'خطة وجبات أسبوعية بالذكاء الاصطناعي',
      'Generate a 7-day meal plan using your current ingredients and your preferences.': 'ولّد خطة وجبات لـ7 أيام باستخدام مكوناتك الحالية وتفضيلاتك.',
      'Meal plan preferences': 'تفضيلات خطة الوجبات',
      'Example: high protein, budget friendly, 2 meals/day, no seafood': 'مثال: بروتين عالي، ودود للميزانية، وجبتين/يوم، بدون مأكولات بحرية',
      'Generate Weekly Plan': 'توليد خطة أسبوعية',
      'Recipe name': 'اسم الوصفة',
      Ingredients: 'المكونات',
      'Ingredients:': 'المكونات:',
      'Ingredients (Comma Separated) ...': 'المكونات (مفصولة بفواصل)...',
      'Image URL': 'رابط الصورة',
      'Image URL ...': 'رابط الصورة...',
      'Ready to cook': 'جاهز للطبخ',
      'Missing:': 'ناقص:',
      View: 'عرض',
      Share: 'مشاركة',
      Recipe: 'وصفة',
      'Add to favorites': 'أضف للمفضلة',
      'Remove from favorites': 'إزالة من المفضلة',
      'No recipes found.': 'لم يتم العثور على وصفات.',
      'No favorites yet.': 'لا توجد مفضلات بعد.',
      'Recipe not found.': 'الوصفة غير موجودة.',
      'Recipe added.': 'تمت إضافة الوصفة.',
      'Favorites updated.': 'تم تحديث المفضلة.',
      'Please fill all fields with valid values.': 'يرجى تعبئة جميع الحقول بقيم صحيحة.',
      'A recipe with this name already exists.': 'توجد وصفة بهذا الاسم بالفعل.',
      'Recipe link ready to share.': 'رابط الوصفة جاهز للمشاركة.',
      'Unable to share this recipe right now.': 'تعذر مشاركة هذه الوصفة الآن.',
      'Please enter email and password.': 'يرجى إدخال البريد الإلكتروني وكلمة المرور.',
      'Please enter name, email, and password.': 'يرجى إدخال الاسم والبريد الإلكتروني وكلمة المرور.',
      'Passwords do not match.': 'كلمتا المرور غير متطابقتين.',
      'Password must be at least 6 characters.': 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',
      'Email already registered.': 'هذا البريد الإلكتروني مسجل بالفعل.',
      'Account created successfully. Please log in.': 'تم إنشاء الحساب بنجاح. يرجى تسجيل الدخول.',
      'Invalid email or password.': 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
      'Logged in successfully.': 'تم تسجيل الدخول بنجاح.'
    }
  };

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
    if (window.RecipeManager?.searchRecipes) window.RecipeManager.searchRecipes();
    if (window.RecipeManager?.loadFavorites) window.RecipeManager.loadFavorites();
    if (window.RecipeManager?.loadRecipeDetails) window.RecipeManager.loadRecipeDetails();
  }

  function initLang() {
    const savedLang = loadValue('lang', 'en');
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('ar', savedLang === 'ar');
    updateAllTexts();
  }

  window.toggleLang = function() {
    const current = document.documentElement.lang || 'en';
    const nextLang = current === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', nextLang);
    initLang();
    document.getElementById('langToggle').textContent = nextLang.toUpperCase();
  };

  function initTheme() {
    const savedTheme = loadValue('theme', 'light');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }

  window.toggleTheme = function() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
  };

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLang();
    redirectIfAuthenticated();
    if (!requireAuth()) return;

    renderIngredients();
    loadFavorites();
    loadRecipeDetails();
    searchRecipes();

    // Setup button listeners if elements exist
    const langBtn = document.getElementById('langToggle');
    const themeBtn = document.getElementById('themeToggle');
    const logoutBtn = document.getElementById("logoutBtn");
    if (langBtn) {
      langBtn.textContent = document.documentElement.lang.toUpperCase();
      langBtn.onclick = window.toggleLang;
    }
    if (themeBtn) {
      themeBtn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
      themeBtn.onclick = window.toggleTheme;
    }
    if (logoutBtn) {
      logoutBtn.onclick = window.logout;
    }
  });
})();
