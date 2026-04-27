function mockGenerateMealPlan(preferences, weight, ingredients, resultEl) {
  const aiDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => t(d));
  const aiMeals = [
    "Omelette with cheese",
    "Pancakes with fruit",
    "Cheese sandwich",
    "Shakshuka eggs",
  ];

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
