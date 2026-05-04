// Fixed AI Meal Plan - Arabic meals + real recipes + standalone t()
function mockGenerateMealPlan(preferences, weight, ingredients, resultEl, currentLang) {
  
  // Standalone TRANSLATIONS object (copy from translations.js - self-contained)
  const TRANSLATIONS = {
    en: {
      "Day": "Day",
      "Meal": "Meal", 
      "Notes": "Notes",
      "Rest day": "Rest day",
      "Breakfast/Lunch": "Breakfast/Lunch",
      "Using:": "Using:",
      "High protein for weight management": "High protein for weight management",
      "Calorie dense for energy": "Calorie dense for energy",
      "Weight loss focus": "Weight loss focus",
      "Muscle gain focus": "Muscle gain focus",
      "💪 High protein": "💪 High protein",
      "💰 Budget friendly": "💰 Budget friendly"
    },
    ar: {
      "Day": "اليوم",
      "Meal": "الوجبة", 
      "Notes": "ملاحظات",
      "Rest day": "يوم راحة",
      "Breakfast/Lunch": "إفطار/غداء",
      "Using:": "باستخدام:",
      "High protein for weight management": "بروتين عالي لإدارة الوزن",
      "Calorie dense for energy": "سعرات عالية للطاقة",
      "Weight loss focus": "تركيز على فقدان الوزن",
      "Muscle gain focus": "تركيز على بناء العضلات",
      "💪 High protein": "💪 بروتين عالي",
      "💰 Budget friendly": "💰 ودود للميزانية"
    }
  };
  
  // Local t function
  function t(k) {
    const l = currentLang;
    return TRANSLATIONS[l]?.[k] || TRANSLATIONS.en[k] || k;
  }

  // Days arrays - direct translation (no dependency)
  const aiDaysEn = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const aiDaysAr = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
  const aiDays = currentLang === 'ar' ? aiDaysAr : aiDaysEn;
  
  // Real recipe names from defaultRecipes - FULLY MATCHING RECIPE_TRANSLATIONS.ar keys
  const aiMealsEn = [
    "Egyptian Koshari",
    "Saudi Chicken Kabsa", 
    "Italian Pizza Napoletana",
    "Italian Pasta Carbonara",
    "Egyptian Molokhia",
    "Italian Lasagna alla Bolognese",
    "Saudi Areeka"
  ];
  const aiMealsAr = [
    "كشري مصري",
    "كبسة دجاج سعودية", 
    "بيتزا نابوليتانا إيطالية",
    "باستا كاربونارا إيطالية",
    "ملوخية مصرية",
    "لازانيا بولونيز إيطالية",
    "عريكة سعودية"
  ];
  
  const aiMeals = currentLang === 'ar' ? aiMealsAr : aiMealsEn;

  // escapeHtml helper
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  const tableRows = aiDays.map((day, i) => {
    const mealIndex = i % aiMeals.length;
    const meal = aiMeals[mealIndex];
    const dayNotes = i + 1 === aiDays.length ? t("Rest day") : t("Breakfast/Lunch");
    let personalNote = '';
    if (weight > 80) personalNote = `<br><em>${t("High protein for weight management")}</em>`;
    else if (weight < 60) personalNote = `<br><em>${t("Calorie dense for energy")}</em>`;
    if (preferences.includes('loss') || preferences.includes('diet')) personalNote += `<br><em>${t("Weight loss focus")}</em>`;
    if (preferences.includes('gain') || preferences.includes('muscle')) personalNote += `<br><em>${t("Muscle gain focus")}</em>`;

    return `
      <tr>
        <td><strong>${escapeHtml(day)}</strong></td>
        <td>${escapeHtml(meal)}</td>
        <td>${escapeHtml(dayNotes)}<br><small>${t("Using:")} ${escapeHtml(ingredients)}</small>
          ${preferences.includes("high protein") ? `<br><em>${t("💪 High protein")}</em>` : ''}
          ${preferences.includes("budget") ? `<br><em>${t("💰 Budget friendly")}</em>` : ''}
          ${personalNote}
        </td>
      </tr>
    `;
  }).join("");

  const tableHtml = `
    <table class="ai-table">
      <thead>
        <tr>
          <th>📅 ${t("Day")}</th>
          <th>🍳 ${t("Meal")}</th>
          <th>${t("Notes")}</th>
        </tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>
  `;

  resultEl.innerHTML = tableHtml;
  resultEl.className = "ai-result";
}
