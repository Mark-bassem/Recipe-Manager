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
      ingredients: [
        "500g finely chopped molokhia leaves",
        "3 cups rich chicken or beef broth",
        "1 tbsp ghee",
        "5 garlic cloves",
        "1 tbsp dried coriander",
        "¼ tsp sugar",
        "pinch of baking soda",
      ],
      image: "images/Molokhia.jpeg",
      instructions:
        "Heat the broth with a pinch of sugar and one raw garlic clove. Once boiling, add the molokhia and reduce heat completely. Stir continuously with a whisk to remove lumps. As soon as it starts to boil (one quick bubble), remove from heat immediately. Do not cover. In a pan, sauté garlic in ghee until lightly golden, then add dried coriander and cook until fragrant. Pour the hot tasha over the molokhia, then cover briefly for a few seconds to absorb the aroma.",
      description:
        "A traditional Egyptian green soup made from molokhia leaves, served with rice and meat, known for its unique slimy texture and rich flavor.",
    },
    {
      name: "Egyptian Koshari",
      ingredients: [
        "rice",
        "brown lentils",
        "small macaroni",
        "spaghetti",
        "vermicelli",
        "cooked chickpeas",
        "onions",
        "starch",
        "tomato sauce",
        "vinegar",
        "cumin",
        "black pepper",
        "garlic",
        "chili",
      ],
      image: "images/Koshari.jpeg",
      instructions:
        "Crispy Onions: Slice onions into strips, coat with starch and salt, then deep-fry until golden. Save the frying oil. Rice & Lentils: In a pot, heat some onion oil, toast vermicelli, then add rice, soaked lentils, salt, and cumin. Add water, cover, and cook until done. Pasta: Boil and drain, then toss with 2 tbsp of onion oil and black pepper. Tomato Sauce: Sauté garlic in onion oil, deglaze with vinegar, then add tomato sauce, salt, pepper, cumin, and a pinch of sugar. Daqa: Mix garlic, vinegar, lemon juice, cumin, hot water, and chili. Layer rice, lentils, pasta, chickpeas, top with crispy onions, tomato sauce, and daqa.",
      description:
        "Egypt's national dish, a hearty mix of rice, lentils, pasta, and chickpeas topped with crispy onions and a spicy tomato sauce.",
    },
    {
      name: "Egyptian Mahshi",
      ingredients: [
        "Egyptian rice",
        "thick cooked tomato sauce",
        "minced onions",
        "fresh dill",
        "fresh parsley",
        "fresh coriander",
        "zucchini",
        "eggplant",
        "grape leaves",
        "cabbage",
        "salt",
        "black pepper",
        "cumin",
        "dried coriander",
        "dried mint",
        "chili",
        "chicken or beef broth",
      ],
      image: "images/Mahshi.jpeg",
      instructions:
        "Stuffing: Sauté onions in oil and ghee until soft. Add tomato juice and cook until thickened and oil separates on top. Remove from heat, then mix in rice, herbs, and spices. Do not cook the rice at this stage. Stuff vegetables (zucchini, eggplant, grape leaves, cabbage) but do not overfill as rice expands during cooking. Arrange in a pot and pour hot broth (mixed with a spoon of tomato paste) until just below the top layer. Cook on high heat until most liquid is absorbed, then reduce heat and simmer until fully cooked.",
      description:
        "Stuffed vegetables with rice and herbs, cooked in tomato sauce, a beloved Egyptian comfort food.",
    },
    {
      name: "Saudi Chicken Kabsa",
      ingredients: [
        "1 whole chicken cut into quarters",
        "3 cups basmati rice soaked",
        "1 chopped onion",
        "1 garlic clove",
        "1 grated tomato",
        "1 tbsp tomato paste",
        "dried lime loomi",
        "cinnamon",
        "cardamom",
        "cloves",
        "bay leaves",
        "1 tbsp Kabsa spice mix",
        "turmeric",
        "salt",
        "black pepper",
      ],
      image: "images/Kabsa.jpeg",
      instructions:
        "In a large pot, heat oil and sauté the onion and garlic until soft. Add the whole spices and stir until fragrant. Add the chicken pieces and cook until lightly browned. Then add the tomato, tomato paste, and ground spices. Pour in boiling water and let the chicken cook completely. Once done, remove the chicken (you can roast it later for extra flavor). Add the rice to the broth, making sure the liquid covers it by about 2 cm. Cook on high heat until the liquid is absorbed, then reduce the heat to low and let it simmer until the rice is fluffy and fully cooked.",
      description:
        "Saudi Arabia's iconic spiced rice dish with tender chicken, flavored with aromatic spices and dried lime.",
    },
    {
      name: "Saudi Areeka",
      ingredients: [
        "2 cups whole wheat flour",
        "pinch of salt",
        "warm water for dough",
        "pitted dates",
        "ghee",
        "honey",
        "cream optional",
      ],
      image: "images/Areeka.jpeg",
      instructions:
        "Mix the flour, salt, and water to form a slightly thick batter (a bit thicker than pancake batter). Pour it into a greased pan and cook on both sides until golden, like a large flatbread. While still very hot, place the bread in a bowl or bag with the dates and mash/knead them together thoroughly until fully combined. Shape into a ball, place in a serving dish, make a hole in the center, and fill it with ghee and honey. Garnish with cream if desired.",
      description:
        "A sweet Saudi flatbread made with dates, ghee, and honey, often served during Ramadan.",
    },
    {
      name: "Saudi Royal Masoub",
      ingredients: [
        "3 ripe bananas",
        "2 whole wheat flatbreads or crumbled bread",
        "1 can cream",
        "honey",
        "ghee",
        "grated cheddar cheese optional",
      ],
      image: "images/Masoub.jpeg",
      instructions:
        "Crumble the bread finely using a food processor. Mash the bananas until smooth, then mix with the bread. Add half of the cream and a spoon of ghee, and mix until well combined. Transfer to a serving plate and top with the remaining cream, honey, and optional cheese.",
      description:
        "A luxurious Saudi dessert of bananas and bread soaked in cream and honey.",
    },
    {
      name: "Italian Pizza Napoletana",
      ingredients: [
        "500g high-quality flour (type 00)",
        "325ml warm water",
        "10g salt",
        "3g dry yeast",
        "canned peeled tomatoes",
        "fresh mozzarella",
        "fresh basil leaves",
        "olive oil",
      ],
      image: "images/Pizza Napoletana.jpeg",
      instructions:
        "Knead all the dough ingredients until smooth, then let it rise for 6–8 hours (or overnight in the fridge for better flavor). Divide into balls and stretch them by hand (do not use a rolling pin to preserve air in the edges). Add the sauce, fresh mozzarella, basil leaves, and a drizzle of olive oil. Bake at the highest oven temperature (preferably on a pizza stone) for 5–7 minutes.",
      description:
        "Authentic Neapolitan pizza with thin crust, fresh tomatoes, mozzarella, and basil.",
    },
    {
      name: "Italian Pasta Carbonara",
      ingredients: [
        "200g spaghetti",
        "2 egg yolks + 1 whole egg",
        "50g grated Parmesan cheese",
        "100g pancetta (or salami)",
        "freshly ground black pepper",
      ],
      image: "images/Carbonara.jpeg",
      instructions:
        "Cook the pasta in salted water until al dente. In a bowl, mix the eggs with Parmesan and black pepper. Cook the pancetta in a pan until crispy, then remove from heat and add the cooked pasta along with a little pasta water. Important step: Wait about 30 seconds for the heat to slightly reduce (to avoid scrambling the eggs), then add the egg and cheese mixture. Stir quickly and continuously until a smooth, creamy sauce forms.",
      description: "Creamy Roman pasta with eggs, cheese, and crispy pancetta.",
    },
    {
      name: "Italian Lasagna alla Bolognese",
      ingredients: [
        "lasagna sheets (fresh)",
        "ground beef",
        "onion",
        "carrot",
        "celery",
        "tomato sauce",
        "butter",
        "flour",
        "milk",
        "nutmeg",
        "Parmesan cheese",
      ],
      image: "images/Lasagna alla Bolognese.jpeg",
      instructions:
        "Bolognese Sauce: Sauté ground beef with onion, carrot, and celery, then simmer with tomato sauce on very low heat for about 2 hours. Béchamel Sauce: Melt butter, add flour, then gradually whisk in milk and a pinch of nutmeg until light and smooth. In a baking dish, start with a layer of béchamel, then lasagna sheets, then meat sauce, followed by béchamel and cheese. Repeat the layers, finishing with a generous layer of béchamel and cheese on top. Bake at 180°C (350°F) for 30–40 minutes until golden brown.",
      description:
        "Layered pasta with rich Bolognese sauce and creamy béchamel.",
    },
    {
      name: "Italian Mushroom Risotto",
      ingredients: [
        "1 cup Arborio rice",
        "1 liter hot chicken or vegetable broth",
        "1 chopped onion",
        "fresh mushrooms",
        "butter",
        "Parmesan cheese",
      ],
      image: "images/Mushroom Risotto.jpeg",
      instructions:
        "Sauté the onion in butter, then add the mushrooms and cook. Add the rice (uncooked) and stir for 2 minutes until heated. The key technique: Add one ladle of hot broth at a time, stirring constantly until absorbed. Repeat this process (ladle by ladle) for 18–20 minutes. Once the rice is creamy and cooked, remove from heat and add cold butter and a handful of Parmesan cheese. Stir vigorously (this step is called mantecatura).",
      description: "Creamy Arborio rice cooked with mushrooms and Parmesan.",
    },
    {
      name: "Spanish Seafood Paella",
      ingredients: [
        "2 cups short-grain rice (Bomba or Egyptian)",
        "500g mixed seafood (shrimp, squid, mussels)",
        "1 chopped onion",
        "1 red bell pepper",
        "3 garlic cloves",
        "grated tomatoes",
        "saffron threads",
        "1 tbsp paprika",
        "hot fish stock",
        "olive oil",
      ],
      image: "images/Paella de Marisco.jpeg",
      instructions:
        "In a wide, shallow pan, sauté the seafood in olive oil, then set it aside. In the same pan, sauté the onion, pepper, and garlic. Add the grated tomatoes, paprika, and saffron. Add the rice and stir for 2 minutes. Pour in the hot stock (twice the amount of rice). Arrange the seafood on top and let it cook on low heat for 15–20 minutes without stirring until the liquid is absorbed and you hear a slight crackling sound at the bottom.",
      description: "Spanish rice dish with saffron, seafood, and vegetables.",
    },
    {
      name: "Spanish Tortilla de Patatas",
      ingredients: [
        "4 medium potatoes",
        "1 large onion",
        "5 eggs",
        "extra virgin olive oil",
        "salt",
      ],
      image: "images/Tortilla de Patatas.jpeg",
      instructions:
        "Cut the potatoes into small cubes or thin slices, and slice the onion. Cook the potatoes and onion in plenty of olive oil over low heat until soft (not crispy). Drain them from the oil and mix with beaten eggs and salt. Let the mixture rest for 10 minutes. In a non-stick pan with a little oil, pour the mixture and cook until set. Flip it using a flat plate to cook the other side until golden.",
      description: "Thick Spanish omelette with potatoes and onions.",
    },
    {
      name: "Spanish Patatas Bravas",
      ingredients: [
        "potato cubes for frying",
        "olive oil",
        "1 tbsp flour",
        "1 tbsp smoked paprika",
        "1 tsp chili powder",
        "chicken broth or water",
      ],
      image: "images/Patatas Bravas.jpeg",
      instructions:
        "Fry the potatoes until golden and very crispy. For the sauce: cook the flour in olive oil, then add paprika and chili and stir quickly. Gradually add broth while stirring until you get a thick sauce. Pour the sauce over the potatoes and serve hot.",
      description: "Crispy potatoes with spicy tomato sauce.",
    },
    {
      name: "Spanish Churros",
      ingredients: [
        "1 cup water",
        "2 tbsp butter",
        "1 tbsp sugar",
        "pinch of salt",
        "1 cup flour",
        "1 egg (optional)",
        "sugar and cinnamon for coating",
        "melted dark chocolate for serving",
      ],
      image: "images/Churros.jpeg",
      instructions:
        "In a saucepan, bring water, butter, sugar, and salt to a boil. Add the flour all at once and stir vigorously until a smooth dough forms and pulls away from the sides. Remove from heat, let it cool slightly, then mix in the egg. Transfer the dough to a piping bag with a star tip, and pipe into hot oil. Fry until golden, then roll in sugar and cinnamon. Serve with melted dark chocolate.",
      description:
        "Fried dough pastry coated in sugar and cinnamon, served with chocolate.",
    },
  ];

  const RECIPE_AR_TRANSLATIONS = window.RECIPE_TRANSLATIONS?.ar || {};

  // تحميل مصفوفة من التخزين المحلي بأمان مع التعامل مع أخطاء القراءة.
  // يقرأ مصفوفة من localStorage ويرجع للقيمة الافتراضية عند فشل التحليل.
  function loadJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  // يقرأ قيمة بسيطة/نصية من localStorage مع قيمة افتراضية.
  function loadValue(key, fallback) {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  }

  // يقرأ كائنًا من localStorage مع الحماية من JSON غير صالح.
  function loadObject(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  // ========================================
  // حالة التطبيق - مخزن البيانات المركزي
  // ========================================
  // يزيل الوصفات المكررة بناءً على اسم الوصفة بعد التطبيع.
  function dedupeRecipesByName(recipes) {
    const seen = new Set();
    return recipes.filter((recipe) => {
      const key = String(recipe?.name || "")
        .trim()
        .toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // يدمج الوصفات الافتراضية مع المخزنة محليًا مع الحفاظ على إضافات المستخدم.
  function mergeDefaultRecipes() {
    const stored = loadJson(STORAGE_KEYS.recipes, []);
    if (!stored.length) return [...defaultRecipes];
    const dedupedStored = dedupeRecipesByName(stored);
    const storedNames = new Set(
      dedupedStored.map((r) =>
        String(r?.name || "")
          .trim()
          .toLowerCase(),
      ),
    );
    const missing = defaultRecipes.filter(
      (r) => !storedNames.has(r.name.toLowerCase()),
    );
    const merged = dedupeRecipesByName([...dedupedStored, ...missing]);
    if (merged.length !== stored.length || missing.length) {
      localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(merged));
    }
    return merged;
  }

  const state = {
    userIngredients: [],
    favorites: loadJson(STORAGE_KEYS.favorites, []),
    recipes: mergeDefaultRecipes(),
  };

  // يحفظ الوصفات والمفضلات مرة أخرى داخل localStorage.
  function saveState() {
    localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(state.recipes));
    localStorage.setItem(
      STORAGE_KEYS.favorites,
      JSON.stringify(state.favorites),
    );
  }

  // مساعد سريع لجلب عنصر HTML باستخدام المعرف.
  function getElement(id) {
    return document.getElementById(id);
  }

  // يرجع حاوية وسوم المكونات النشطة في الصفحة الرئيسية.
  function getIngredientsListElement() {
    return getElement("ingredientList");
  }

  // يطبع اسم المكون (إزالة المسافات والتحويل لحروف صغيرة للمطابقة).
  function normalizeIngredient(value) {
    return value.trim().toLowerCase();
  }

  // يرجع رمز اللغة الحالي المستخدم في الواجهة.
  function getCurrentLang() {
    return document.documentElement.lang === "ar" ? "ar" : "en";
  }

  // يوفر وصفًا احتياطيًا للوصفات المضافة بواسطة المستخدم حسب اللغة الحالية.
  function getUserAddedDescription() {
    return getCurrentLang() === "ar"
      ? "وصفة مضافة من المستخدم."
      : "User added recipe.";
  }

  // يبني نموذج عرض للوصفة مترجمًا (الاسم، الوصف، المكونات، التعليمات).
  function getRecipePresentation(recipe) {
    const baseIngredients = Array.isArray(recipe?.ingredients)
      ? recipe.ingredients
      : [];
    const arVersion = RECIPE_AR_TRANSLATIONS[recipe?.name];
    const useArabic = getCurrentLang() === "ar" && arVersion;

    const localizedIngredients =
      useArabic && Array.isArray(arVersion.ingredients)
        ? arVersion.ingredients
        : baseIngredients;

    return {
      name: useArabic ? arVersion.name : recipe?.name,
      description: useArabic
        ? arVersion.description
        : recipe?.description || getUserAddedDescription(),
      ingredients: localizedIngredients,
      instructions: useArabic
        ? arVersion.instructions
        : recipe?.instructions || "",
    };
  }

  // ينشئ عناصر مطابقة للمكونات بعد التطبيع للقيم المترجمة والأصلية.
  function getRecipeIngredientPairs(recipe) {
    const localized = getRecipePresentation(recipe).ingredients || [];
    const original = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];
    const arabicVersion = RECIPE_AR_TRANSLATIONS[recipe?.name];
    const arabicIngredients = Array.isArray(arabicVersion?.ingredients)
      ? arabicVersion.ingredients
      : [];
    const maxLen = Math.max(localized.length, original.length, arabicIngredients.length);
    const pairs = [];

    for (let index = 0; index < maxLen; index += 1) {
      const displayRaw = String(localized[index] ?? original[index] ?? "").trim();
      const fallbackRaw = String(original[index] ?? localized[index] ?? "").trim();
      const arabicRaw = String(arabicIngredients[index] ?? "").trim();
      if (!displayRaw && !fallbackRaw) continue;

      pairs.push({
        display: displayRaw || fallbackRaw,
        matchNorms: [...new Set(
          [displayRaw, fallbackRaw, arabicRaw]
            .map((value) => normalizeIngredient(value))
            .filter(Boolean),
        )],
      });
    }

    return pairs;
  }

  // يبني مفردات بحث لكل من النص الإنجليزي والعربي للوصفة.
  function getRecipeSearchTokens(recipe) {
    const arVersion = RECIPE_AR_TRANSLATIONS[recipe?.name];
    const rawTokens = [
      recipe?.name,
      recipe?.description,
      ...(Array.isArray(recipe?.ingredients) ? recipe.ingredients : []),
      arVersion?.name,
      arVersion?.description,
      ...(Array.isArray(arVersion?.ingredients) ? arVersion.ingredients : []),
    ];

    return [...new Set(
      rawTokens
        .map((token) => normalizeIngredient(String(token || "")))
        .filter(Boolean),
    )];
  }

  // يترجم أسماء وسوم المكونات بين الإنجليزية والعربية عند توفر المقابل.
  function translateIngredientLabel(value) {
    const normalized = normalizeIngredient(String(value || ""));
    if (!normalized) return value;

    for (const recipe of defaultRecipes) {
      const arVersion = RECIPE_AR_TRANSLATIONS[recipe.name];
      if (!arVersion) continue;

      const original = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
      const localized = Array.isArray(arVersion.ingredients)
        ? arVersion.ingredients
        : [];
      const maxLen = Math.max(original.length, localized.length);

      for (let index = 0; index < maxLen; index += 1) {
        const enValue = String(original[index] || "").trim();
        const arValue = String(localized[index] || "").trim();
        if (!enValue || !arValue) continue;

        if (getCurrentLang() === "ar" && normalizeIngredient(enValue) === normalized) {
          return arValue;
        }
        if (getCurrentLang() !== "ar" && normalizeIngredient(arValue) === normalized) {
          return enValue;
        }
      }
    }

    return value;
  }

  // يتحقق من مفتاح المطبخ المُدخل ويطبعه للصيغة المعتمدة.
  function normalizeCuisine(value) {
    const normalized = String(value || "")
      .trim()
      .toLowerCase();
    const allowed = new Set(["egyptian", "saudi", "italian", "spanish"]);
    return allowed.has(normalized) ? normalized : "";
  }

  // يستنتج مفتاح المطبخ من بادئة اسم الوصفة للوصفات القديمة/الافتراضية.
  function inferCuisineFromName(name) {
    const lowerName = String(name || "").toLowerCase();
    if (lowerName.startsWith("egyptian ")) return "egyptian";
    if (lowerName.startsWith("saudi ")) return "saudi";
    if (lowerName.startsWith("italian ")) return "italian";
    if (lowerName.startsWith("spanish ")) return "spanish";
    return "";
  }

  // يحدد مطبخ الوصفة من الحقل الصريح أو من الاسم المستنتج.
  function getRecipeCuisine(recipe) {
    return (
      normalizeCuisine(recipe?.cuisine) ||
      normalizeCuisine(recipe?.restaurant) ||
      inferCuisineFromName(recipe?.name)
    );
  }

  // يطبع البريد الإلكتروني لفحوصات تسجيل الدخول غير الحساسة لحالة الأحرف.
  function normalizeEmail(value) {
    return value.trim().toLowerCase();
  }

  // يحوّل أحرف HTML الخاصة لمنع هجمات XSS.
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  // يعرض رسالة تغذية راجعة على مستوى الصفحة في نموذج إضافة الوصفة.
  function showMessage(message, isError = false) {
    const formMessage = getElement("formMessage");
    if (!formMessage) {
      console.log(message);
      return;
    }

    formMessage.textContent = message;
    formMessage.classList.toggle("is-error", isError);
    formMessage.classList.toggle("is-success", !isError);
  }

  // ينسّق التعليمات إلى فقرات/خطوات سهلة القراءة.
  function formatInstructions(text) {
    if (!text) {
      return `<p>${t("No instructions provided.")}</p>`;
    }

    const sections = text
      .split(/(?:\.\s+|\n+)/)
      .map((s) => s.trim())
      .filter(Boolean);
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

    return `<p>${escapeHtml(text).replaceAll("\n", "<br>")}</p>`;
  }

  // يحمّل جميع المستخدمين المسجلين من التخزين المحلي.
  function getUsers() {
    return loadJson(STORAGE_KEYS.users, []);
  }

  // يحفظ مصفوفة المستخدمين في التخزين المحلي.
  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }

  // يرجع كائن المستخدم المسجّل دخوله حاليًا.
  function getCurrentUser() {
    return loadObject(STORAGE_KEYS.authUser, null);
  }

  // يحفظ بيانات المستخدم الحالي المسجّل دخوله.
  function setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  }

  // يمسح جلسة المستخدم الحالي.
  function clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.authUser);
  }

  // يحوّل أي قيمة رقمية إلى رقم موجب صالح أو null.
  function parsePositiveNumber(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }

  // ينسّق الأرقام لإظهارها بشكل مناسب (بدون كسور غير ضرورية).
  function formatMetricValue(value) {
    if (value === null) return "-";
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  // يرجع وزن المستخدم الحالي من الجلسة أو من بيانات المستخدمين المخزنة.
  function getCurrentUserWeight(defaultWeight = 70) {
    const currentUser = getCurrentUser();
    if (!currentUser) return defaultWeight;

    const directWeight = parsePositiveNumber(currentUser.weight);
    if (directWeight !== null) return directWeight;

    const users = getUsers();
    const storedUser = users.find(
      (entry) =>
        normalizeEmail(entry.email) === normalizeEmail(currentUser.email || ""),
    );
    const storedWeight = parsePositiveNumber(storedUser?.weight);
    return storedWeight === null ? defaultWeight : storedWeight;
  }

  // يستخرج اسم الصفحة الحالية من مسار الرابط.
  function getPageName() {
    const segments = window.location.pathname.split("/");
    return (segments.pop() || "main.html").toLowerCase();
  }

  // يرجع مسار إعادة توجيه آمن من باراميترات الرابط.
  function getRedirectTarget(defaultTarget = "main.html") {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (!redirect) return defaultTarget;
    if (redirect.includes("://") || redirect.startsWith("//"))
      return defaultTarget;
    return redirect;
  }

  // يحدّث رسالة الحالة في صفحات تسجيل الدخول/إنشاء الحساب وكلاسات الحالة.
  function setAuthMessage(key, isError = true) {
    const el = getElement("authMessage");
    if (!el) return;
    el.textContent = t(key);
    el.classList.toggle("is-error", isError);
    el.classList.toggle("is-success", !isError);
  }

  // يحمي الصفحات الخاصة ويحوّل غير المسجّلين إلى صفحة الدخول.
  function requireAuth() {
    const protectedPages = new Set([
      "recipe.html",
      "favourites.html",
      "add-recipe.html",
      "main.html",
      "profile.html",
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

  // يحوّل المستخدم المسجّل بعيدًا عن صفحات تسجيل الدخول/التسجيل.
  function redirectIfAuthenticated() {
    const authPages = new Set(["login.html", "signup.html"]);
    const page = getPageName();
    const user = getCurrentUser();
    if (!authPages.has(page) || !user) return;
    window.location.href = getRedirectTarget("main.html");
  }

  // يدير تدفق إنشاء الحساب: التحقق، كشف التكرار، الحفظ، ثم إعادة التوجيه.
  function signup() {
    const nameInput = getElement("signupName");
    const emailInput = getElement("signupEmail");
    const heightInput = getElement("signupHeight");
    const weightInput = getElement("signupWeight");
    const passwordInput = getElement("signupPassword");
    const confirmInput = getElement("signupConfirmPassword");
    if (
      !nameInput ||
      !emailInput ||
      !heightInput ||
      !weightInput ||
      !passwordInput ||
      !confirmInput
    )
      return;

    const name = nameInput.value.trim();
    const email = normalizeEmail(emailInput.value);
    const height = parsePositiveNumber(heightInput.value);
    const weight = parsePositiveNumber(weightInput.value);
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (!name || !email || !password || !confirmPassword) {
      setAuthMessage("Please fill all fields with valid values.");
      return;
    }
    if (height === null || weight === null) {
      setAuthMessage("Please fill all fields with valid values.");
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

    users.push({ name, email, height, weight, password });
    saveUsers(users);
    setAuthMessage("Account created successfully. Please log in.", false);
    setTimeout(() => {
      window.location.href = "login.html";
    }, 900);
  }

  // يدير تدفق تسجيل الدخول: التحقق من المدخلات والبيانات ثم إعادة التوجيه.
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

    const { password: _ignoredPassword, ...safeUser } = user;
    setCurrentUser(safeUser);
    setAuthMessage("Logged in successfully.", false);
    setTimeout(() => {
      window.location.href = getRedirectTarget("main.html");
    }, 350);
  }

  // يسجّل خروج المستخدم الحالي وينتقل إلى صفحة تسجيل الدخول.
  function logout() {
    clearCurrentUser();
    window.location.href = "login.html";
  }

  // يعرض بيانات المستخدم الحالي داخل صفحة الملف الشخصي.
  function loadProfile() {
    const container = getElement("profileDetails");
    if (!container) return;

    const currentUser = getCurrentUser();
    if (!currentUser) {
      container.innerHTML = `<p class="no-results">${t("Please log in to view your profile.")}</p>`;
      return;
    }

    const users = getUsers();
    const storedUser = users.find(
      (entry) =>
        normalizeEmail(entry.email) === normalizeEmail(currentUser.email || ""),
    );
    const profileUser = storedUser || currentUser;

    if (!profileUser?.email) {
      container.innerHTML = `<p class="no-results">${t("No user data found.")}</p>`;
      return;
    }

    const height = parsePositiveNumber(profileUser.height);
    const weight = parsePositiveNumber(profileUser.weight);
    const bmi =
      height !== null && weight !== null
        ? (weight / ((height / 100) * (height / 100))).toFixed(1)
        : "-";

    const safeName = escapeHtml(profileUser.name || "-");
    const safeEmail = escapeHtml(profileUser.email || "-");
    const safeHeight = escapeHtml(formatMetricValue(height));
    const safeWeight = escapeHtml(formatMetricValue(weight));
    const safeBmi = escapeHtml(bmi);
    const safeFavoritesCount = escapeHtml(String(state.favorites.length));

    container.innerHTML = `
      <article class="card profile-card">
        <div class="card-body">
          <h2>${t("Your Profile")}</h2>
          <p><strong>${t("Name:")}</strong> ${safeName}</p>
          <p><strong>${t("Email:")}</strong> ${safeEmail}</p>
          <p><strong>${t("Height (cm)")}:</strong> ${safeHeight}</p>
          <p><strong>${t("Weight (kg)")}:</strong> ${safeWeight}</p>
        </div>
      </article>
      <article class="card profile-card">
        <div class="card-body">
          <h3>${t("My Statistics")}</h3>
          <div class="profile-stats">
            <p><strong>${t("BMI:")}</strong> ${safeBmi}</p>
            <p><strong>${t("Favorite Recipes:")}</strong> ${safeFavoritesCount}</p>
          </div>
        </div>
      </article>
    `;
  }

  // يمسح المكونات المختارة ونص البحث والنتائج الظاهرة.
  function clearIngredients() {
    state.userIngredients = [];
    const searchInput = getElement("searchInput");
    const recipesContainer = getElement("recipesContainer");

    if (searchInput) searchInput.value = "";
    renderIngredients();
    if (recipesContainer) {
      recipesContainer.innerHTML = "";
    }
  }

  // يحذف وسم مكون واحد ثم يحدّث النتائج.
  function removeIngredient(index) {
    if (index < 0 || index >= state.userIngredients.length) return;
    state.userIngredients.splice(index, 1);
    renderIngredients();
    searchRecipes();
  }

  // يرسم وسوم المكونات المختارة أسفل أدوات البحث.
  function renderIngredients() {
    const list = getIngredientsListElement();
    if (!list) return;

    list.innerHTML = state.userIngredients
      .map(
        (item, index) => `
          <span class="tag">
            ${escapeHtml(translateIngredientLabel(item))}
            <span onclick="RecipeManager.removeIngredient(${index})" class="remove">x</span>
          </span>
        `,
      )
      .join("");
  }

  // ينشئ قالب HTML لكارت وصفة في نتائج مطابقة المكونات.
  function createRecipeCard(recipe, missing) {
    const encodedName = encodeURIComponent(recipe.name);
    const isFavorite = state.favorites.includes(recipe.name);
    const presentation = getRecipePresentation(recipe);

    return `
      <div class="card">
        <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(presentation.name)}">
        <div class="card-body">
          <h3>${escapeHtml(presentation.name)}</h3>
          <p>${presentation.ingredients.map(escapeHtml).join(", ")}</p>
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

  // ينفذ البحث في الوصفات حسب نص البحث أو المكونات المختارة.
  function searchRecipes() {
    const container = getElement("recipesContainer");
    if (!container) return;

    const searchInput = getElement("searchInput");
    const searchTerm = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";
    const hasSearchTerm = searchTerm.length > 0;
    const hasIngredients = state.userIngredients.length > 0;
    if (!hasSearchTerm && !hasIngredients) {
      container.innerHTML = "";
      return;
    }

    let filtered = state.recipes;

    if (hasSearchTerm) {
      const normalizedTerm = normalizeIngredient(searchTerm);
      filtered = filtered.filter((recipe) =>
        getRecipeSearchTokens(recipe).some((token) =>
          token.includes(normalizedTerm),
        ),
      );
    } else if (hasIngredients) {
      filtered = filtered
        .map((recipe) => {
          const ingredientPairs = getRecipeIngredientPairs(recipe);
          const matched = ingredientPairs.filter(
            (ingredient) =>
              ingredient.matchNorms.some((norm) => state.userIngredients.includes(norm)),
          );
          const missing = ingredientPairs
            .filter(
              (ingredient) =>
                !ingredient.matchNorms.some((norm) => state.userIngredients.includes(norm)),
            )
            .map((ingredient) => ingredient.display);

          return {
            ...recipe,
            matchedCount: matched.length,
            missing,
          };
        })
        .filter((recipe) => recipe.matchedCount > 0)
        .sort((a, b) => b.matchedCount - a.matchedCount);
    }

    if (filtered.length === 0) {
      container.innerHTML = `<p style='text-align:center;'>${t("No recipes found.")}</p>`;
      return;
    }

    if (hasSearchTerm) {
      container.innerHTML = filtered
        .map((recipe) => {
          const encodedName = encodeURIComponent(recipe.name);
          const isFavorite = state.favorites.includes(recipe.name);
          const presentation = getRecipePresentation(recipe);
          return `
            <div class="card">
              <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(presentation.name)}">
              <div class="card-body">
                <h3>${escapeHtml(presentation.name)}</h3>
                <p>${presentation.ingredients.map(escapeHtml).join(", ")}</p>
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
    } else {
      container.innerHTML = filtered
        .map((recipe) => createRecipeCard(recipe, recipe.missing))
        .join("");
    }
  }

  // يبدّل حالة المفضلة للوصفة ويحدّث كل العروض المعتمدة عليها.
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
    loadEgyptianRecipes();
    loadSaudiRecipes();
    loadItalianRecipes();
    loadSpanishRecipes();
  }

  // يرسم محتوى صفحة الوصفات المفضلة.
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
        const presentation = getRecipePresentation(recipe);
        return `
          <div class="card">
            <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(presentation.name)}">
            <div class="card-body">
              <h3>${escapeHtml(presentation.name)}</h3>
              <p>${escapeHtml(presentation.description)}</p>
              <div class="actions">
                <button onclick="RecipeManager.goToRecipe('${encodedName}')">${t("View")}</button>
                <button onclick="RecipeManager.toggleFavorite('${encodedName}')" style="background-color: #d9534f;">${t("Remove from favorites")}</button>
                <button onclick="RecipeManager.shareRecipe('${encodedName}')">${t("Share")}</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // يرسم وصفات قسم مطبخ محدد في الصفحة الرئيسية.
  function loadCuisineRecipes(containerId, cuisineKey) {
    const container = getElement(containerId);
    if (!container) return;

    const recipes = state.recipes.filter(
      (recipe) => getRecipeCuisine(recipe) === cuisineKey,
    );

    if (recipes.length === 0) {
      container.innerHTML = `<p style='text-align:center;'>${t("No recipes found.")}</p>`;
      return;
    }

    container.innerHTML = recipes
      .map((recipe) => {
        const encodedName = encodeURIComponent(recipe.name);
        const isFavorite = state.favorites.includes(recipe.name);
        const presentation = getRecipePresentation(recipe);
        return `
          <div class="card">
            <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(presentation.name)}">
            <div class="card-body">
              <h3>${escapeHtml(presentation.name)}</h3>
              <p>${escapeHtml(presentation.description)}</p>
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

  // يحمّل كروت قسم المطبخ المصري.
  function loadEgyptianRecipes() {
    loadCuisineRecipes("egyptianContainer", "egyptian");
  }

  // يحمّل كروت قسم المطبخ السعودي.
  function loadSaudiRecipes() {
    loadCuisineRecipes("saudiContainer", "saudi");
  }

  // يحمّل كروت قسم المطبخ الإيطالي.
  function loadItalianRecipes() {
    loadCuisineRecipes("italianContainer", "italian");
  }

  // يحمّل كروت قسم المطبخ الإسباني.
  function loadSpanishRecipes() {
    loadCuisineRecipes("spanishContainer", "spanish");
  }

  // يتحقق من مدخلات نموذج الإضافة ثم يضيف وصفة جديدة.
  function addRecipe() {
    const nameInput = getElement("newName");
    const ingredientsInput = getElement("newIngredients");
    const imageInput = getElement("newImage");
    const cuisineInput = getElement("newCuisine");
    const instructionsInput = getElement("newInstructions");

    if (!nameInput || !ingredientsInput || !imageInput || !cuisineInput) return;

    const name = nameInput.value.trim();
    const image = imageInput.value.trim();
    const cuisine = normalizeCuisine(cuisineInput.value);
    const instructions = instructionsInput
      ? instructionsInput.value.trim()
      : "";
    const ingredients = ingredientsInput.value
      .split(",")
      .map(normalizeIngredient)
      .filter(Boolean);

    if (!name || !image || ingredients.length === 0 || !cuisine) {
      showMessage(t("Please fill all fields with valid values."), true);
      return;
    }

    const alreadyExists = state.recipes.some(
      (recipe) => recipe.name.toLowerCase() === name.toLowerCase(),
    );
    if (alreadyExists) {
      showMessage(t("A recipe with this name already exists."), true);
      return;
    }

    state.recipes.push({
      name,
      ingredients: [...new Set(ingredients)],
      image,
      instructions,
      cuisine,
    });
    saveState();
    showMessage(t("Recipe added."), false);

    nameInput.value = "";
    ingredientsInput.value = "";
    imageInput.value = "";
    cuisineInput.value = "";
    if (instructionsInput) instructionsInput.value = "";
  }

  // ينتقل إلى صفحة تفاصيل الوصفة اعتمادًا على اسمها.
  function goToRecipe(encodedName) {
    window.location.href = `recipe.html?name=${encodedName}`;
  }

  // يرسم صفحة تفاصيل كاملة للوصفة المختارة.
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

    const isFavorite = state.favorites.includes(recipe.name);
    const favoriteLabel = isFavorite
      ? t("Remove from favorites")
      : t("Add to favorites");
    const favoriteEmoji = isFavorite ? "❤️" : "🤍";
    const presentation = getRecipePresentation(recipe);

    container.innerHTML = `
      <div class="card recipe-detail-card">
        <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(presentation.name)}" style="width:100%;height:300px;object-fit:cover;">
        <div class="card-body">
          <h1 style="margin:0 0 12px 0;font-size:2rem;font-weight:700;">${escapeHtml(presentation.name)}</h1>
          <p style="margin:0 0 20px 0;color:var(--text-secondary);font-size:1.05rem;line-height:1.6;font-style:italic;">${escapeHtml(presentation.description)}</p>
          
          <h3 style="margin:24px 0 16px 0;font-size:1.3rem;font-weight:700;border-bottom:2px solid var(--primary);padding-bottom:8px;">${t("Ingredients:")}</h3>
          <ul style="margin:0 0 24px 0;padding-left:24px;line-height:2;">
            ${presentation.ingredients.map((item) => `<li style="margin-bottom:8px;">${escapeHtml(item)}</li>`).join("")}
          </ul>
          
          <h3 style="margin:24px 0 16px 0;font-size:1.3rem;font-weight:700;border-bottom:2px solid var(--primary);padding-bottom:8px;">${t("Instructions:")}</h3>
          <div style="margin-bottom:24px;line-height:1.8;">
            ${formatInstructions(presentation.instructions)}
          </div>
          
          <div class="actions" style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px;">
            <button onclick="RecipeManager.toggleFavorite('${encodedName}')" style="background:var(--primary);color:#fff;border:none;padding:10px 18px;border-radius:var(--radius-md);cursor:pointer;font-weight:500;font-size:1rem;transition:var(--t);" onmouseover="this.style.background='var(--primary-hover)'" onmouseout="this.style.background='var(--primary)'">${favoriteEmoji} ${favoriteLabel}</button>
            <button onclick="RecipeManager.shareRecipe('${encodedName}')" style="background:var(--slate-200);color:var(--text);border:none;padding:10px 18px;border-radius:var(--radius-md);cursor:pointer;font-weight:500;font-size:1rem;transition:var(--t);" onmouseover="this.style.background='var(--slate-300)'" onmouseout="this.style.background='var(--slate-200)'">${t("Share")}</button>
          </div>
        </div>
      </div>
    `;
  }

  // يشارك رابط الوصفة عبر Web Share API أو ينسخه للحافظة كخيار بديل.
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

  // يبني جدول خطة وجبات تجريبية مترجمة لمدة 7 أيام.
  function generateMockMealPlan(preferences, ingredients, weight) {
    const aiDays = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ].map((d) => t(d));
    const aiMeals = [
      "Egyptian Koshari",
      "Saudi Chicken Kabsa",
      "Italian Pizza Napoletana",
      "Italian Pasta Carbonara",
      "Egyptian Molokhia",
      "Italian Lasagna alla Bolognese",
      "Saudi Areeka",
    ];
    const tableRows = aiDays
      .map((day, i) => {
        const mealIndex = i % aiMeals.length;
        const meal = aiMeals[mealIndex];
        const dayNotes =
          i + 1 === aiDays.length ? t("Rest day") : t("Breakfast/Lunch");
        let personalNote = "";
        if (weight > 80)
          personalNote = `<br><em>${t("High protein for weight management")}</em>`;
        else if (weight < 60)
          personalNote = `<br><em>${t("Calorie dense for energy")}</em>`;
        if (preferences.includes("loss") || preferences.includes("diet"))
          personalNote += `<br><em>${t("Weight loss focus")}</em>`;
        if (preferences.includes("gain") || preferences.includes("muscle"))
          personalNote += `<br><em>${t("Muscle gain focus")}</em>`;
        return `<tr><td><strong>${escapeHtml(day)}</strong></td><td>${escapeHtml(meal)}</td><td>${escapeHtml(dayNotes)}<br><small>${t("Using:")} ${escapeHtml(ingredients)}</small>${preferences.includes("high protein") ? `<br><em>${t("💪 High protein")}</em>` : ""}${preferences.includes("budget") ? `<br><em>${t("💰 Budget friendly")}</em>` : ""}${personalNote}</td></tr>`;
      })
      .join("");
    return `<table class="ai-table"><thead><tr><th>📅 ${t("Day")}</th><th>🍳 ${t("Meal")}</th><th>${t("Notes")}</th></tr></thead><tbody>${tableRows}</tbody></table>`;
  }

  // يولّد خطة الوجبات (OpenAI عند توفر المفتاح، وإلا مولد تجريبي).
  async function generateMealPlan() {
    const resultEl = getElement("aiPlanResult");
    const prefsInput = getElement("aiPreferences");
    if (!resultEl || !prefsInput) return;
    const preferences = prefsInput.value.trim();
    const weight = getCurrentUserWeight(70);
    const ingredients = state.userIngredients.join(", ");
    resultEl.textContent = t(
      "🤖 AI is generating your personalized meal plan...",
    );
    resultEl.className = "ai-result is-loading";
    const openaiKeyInput = getElement("openaiKey");
    const openaiKey = openaiKeyInput ? openaiKeyInput.value.trim() : "";
    if (openaiKey) {
      resultEl.textContent = t("🤖 OpenAI analyzing your data...");
      resultEl.className = "ai-result is-loading";
      const prompt = `Create a 7-day meal plan table for weight ${weight}kg, needs "${preferences}", ingredients "${ingredients}". Use simple healthy recipes. Output ONLY complete HTML table with columns Day, Meal, Notes.`;
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${openaiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [{ role: "user", content: prompt }],
              max_tokens: 1000,
              temperature: 0.7,
            }),
          },
        );
        const data = await response.json();
        const tableHtml = data.choices[0].message.content.trim();
        resultEl.innerHTML = tableHtml;
        resultEl.className = "ai-result";
      } catch (error) {
        resultEl.textContent = t(
          "OpenAI error: {0}. Using smart mock.",
        ).replace("{0}", error.message);
        resultEl.className = "ai-result is-error";
        setTimeout(() => {
          resultEl.innerHTML = generateMockMealPlan(
            preferences,
            ingredients,
            weight,
          );
          resultEl.className = "ai-result";
        }, 500);
      }
      return;
    }
    setTimeout(() => {
      resultEl.innerHTML = generateMockMealPlan(
        preferences,
        ingredients,
        weight,
      );
      resultEl.className = "ai-result";
    }, 2000);
  }

  // واجهة عامة تُستخدم من معالجات الأحداث داخل صفحات HTML.
  const RecipeManager = {
    clearIngredients,
    removeIngredient,
    renderIngredients,
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
    loadProfile,
    shareRecipe,
    generateMealPlan, // مخطط الوجبات بالذكاء الاصطناعي
  };

  // يعرّض واجهة الموديول بشكل عام لاستخدامها داخل القوالب.
  window.RecipeManager = RecipeManager;

  // أسماء عامة قديمة محفوظة للتوافق مع معالجات الأحداث الحالية.
  window.removeIngredient = removeIngredient;
  window.searchRecipes = searchRecipes;
  window.toggleFavorite = toggleFavorite;
  window.loadFavorites = loadFavorites;
  window.addRecipe = addRecipe;
  window.goToRecipe = goToRecipe;
  window.loadRecipeDetails = loadRecipeDetails;
  window.loadProfile = loadProfile;
  window.shareRecipe = shareRecipe;
  window.signup = signup;
  window.login = login;
  window.logout = logout;
  window.generateMealPlan = generateMealPlan;

  // يجلب النص المترجم بالمفتاح من قاموس اللغة الحالي.
  function t(key) {
    const lang = document.documentElement.lang || "en";
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  }

  // يبقي عنوان/نص اختيار المطبخ مترجمًا عند تبديل اللغة.
  function updateAddRecipeDynamicTexts() {
    const cuisineLabel = document.querySelector('label[for="newCuisine"]');
    const cuisineSelect = getElement("newCuisine");
    if (!cuisineLabel || !cuisineSelect) return;

    const isArabic = getCurrentLang() === "ar";
    const labelText = isArabic ? "المطبخ" : "Restaurant";
    const placeholderText = isArabic
      ? "اختر المطبخ ..."
      : "Select restaurant ...";

    cuisineLabel.textContent = labelText;
    cuisineSelect.setAttribute("aria-label", labelText);

    const placeholderOption = cuisineSelect.querySelector('option[value=""]');
    if (placeholderOption) {
      placeholderOption.textContent = placeholderText;
    }
  }

  // يعيد ترجمة العناصر الثابتة والديناميكية بعد تغيير اللغة.
  function updateAllTexts() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      el.setAttribute("placeholder", t(key));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.dataset.i18nAriaLabel;
      el.setAttribute("aria-label", t(key));
    });
    updateAddRecipeDynamicTexts();
    // تحديث العناصر الديناميكية مثل الكروت عند الحاجة.
    if (window.RecipeManager?.renderIngredients)
      window.RecipeManager.renderIngredients();
    if (window.RecipeManager?.searchRecipes)
      window.RecipeManager.searchRecipes();
    if (window.RecipeManager?.loadFavorites)
      window.RecipeManager.loadFavorites();
    if (window.RecipeManager?.loadEgyptianRecipes)
      window.RecipeManager.loadEgyptianRecipes();
    if (window.RecipeManager?.loadSaudiRecipes)
      window.RecipeManager.loadSaudiRecipes();
    if (window.RecipeManager?.loadItalianRecipes)
      window.RecipeManager.loadItalianRecipes();
    if (window.RecipeManager?.loadSpanishRecipes)
      window.RecipeManager.loadSpanishRecipes();
    if (window.RecipeManager?.loadRecipeDetails)
      window.RecipeManager.loadRecipeDetails();
    if (window.RecipeManager?.loadProfile)
      window.RecipeManager.loadProfile();
  }

  // يهيّئ اللغة واتجاه النص والمحتوى المترجم.
  function initLang() {
    const savedLang = loadValue("lang", "en");
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("ar", savedLang === "ar");
    updateAllTexts();
  }

  // يبدّل بين العربية والإنجليزية ثم يحدّث الواجهة المترجمة.
  window.toggleLang = function () {
    const current = document.documentElement.lang || "en";
    const nextLang = current === "en" ? "ar" : "en";
    localStorage.setItem("lang", nextLang);
    initLang();
    document.getElementById("langToggle").textContent = nextLang.toUpperCase();
  };

  // يبدّل بين الوضع الفاتح والداكن ويحفظ تفضيل المستخدم.
  window.toggleTheme = function () {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.getElementById("themeToggle").textContent = "🌙";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.getElementById("themeToggle").textContent = "☀️";
    }
  };

  // يطبق الثيم المحفوظ عند بدء التشغيل.
  function initTheme() {
    const savedTheme = loadValue("theme", "light");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }

  // يفتح أو يغلق قائمة التنقل في وضع الموبايل.
  window.toggleMobileMenu = function () {
    const navLinks = document.querySelector(".nav-links");
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    if (!navLinks || !mobileBtn) return;
    const isHidden = navLinks.classList.contains("mobile-hidden");
    if (isHidden) {
      navLinks.classList.remove("mobile-hidden");
      mobileBtn.classList.add("active");
    } else {
      navLinks.classList.add("mobile-hidden");
      mobileBtn.classList.remove("active");
    }
  };

  // يهيّئ حالة التطبيق وحماية الوصول والرسم الخاص بكل صفحة.
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLang();
    redirectIfAuthenticated();
    if (!requireAuth()) return;

    // تهيئة قائمة الموبايل.
    const navLinks = document.querySelector(".nav-links");
    if (navLinks && window.innerWidth <= 768) {
      navLinks.classList.add("mobile-hidden");
    }

    renderIngredients();
    loadFavorites();
    loadEgyptianRecipes();
    loadSaudiRecipes();
    loadItalianRecipes();
    loadSpanishRecipes();
    loadRecipeDetails();
    loadProfile();
    searchRecipes();

    // ربط أحداث الأزرار إذا كانت العناصر موجودة.
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
