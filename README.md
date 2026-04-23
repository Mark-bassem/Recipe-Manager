# The Recipe Manager 🍳

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white" alt="OpenAI">
</p>

<p align="center">
  <b>English</b> | <b>العربية</b>
</p>

<p align="center">
  A responsive, bilingual recipe web application where users can discover recipes from their available ingredients, manage favorites, generate AI-powered meal plans, and enjoy a seamless experience in both English and Arabic.
</p>

<p align="center">
  تطبيق ويب متجاوب وثنائي اللغة يتيح للمستخدمين اكتشاف الوصفات من المكونات المتوفرة لديهم، وإدارة المفضلات، وتوليد خطط وجبات مدعومة بالذكاء الاصطناعي، مع تجربة سلسة باللغتين الإنجليزية والعربية.
</p>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [AI Meal Planner](#-ai-meal-planner)
- [Data Storage](#-data-storage)
- [Security & Privacy](#-security--privacy)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Recipe Management
- **Ingredient-Based Search** — Add ingredients you have and discover matching recipes sorted by relevance.
- **Add Custom Recipes** — Easily add your own recipes with name, ingredients, and image URL.
- **Favorites System** — Save recipes to your favorites and access them anytime.
- **Recipe Details Page** — View full recipe details with ingredients list and share functionality.
- **Share Recipes** — Share recipe links via Web Share API or copy to clipboard.

### User Authentication
- **Sign Up & Login** — Create an account and log in with email and password.
- **Route Protection** — Protected pages (Main, Favorites, Add Recipe, Recipe Details) require authentication.
- **Auto-Redirect** — Authenticated users are redirected from auth pages to the main app.
- **Logout** — Secure logout functionality available on all protected pages.

### Internationalization & Accessibility
- **Bilingual Support** — Full support for **English (EN)** and **Arabic (AR)** with complete translation coverage.
- **RTL Layout** — Automatic right-to-left layout switching for Arabic.
- **Accessibility (a11y)** — Semantic HTML, ARIA labels, keyboard navigation, and screen-reader friendly components.

### Theme & UI
- **Light / Dark Theme** — Toggle between light and dark modes with preference persistence.
- **Responsive Design** — Optimized for desktop, tablet, and mobile devices.
- **Modern UI** — Clean card-based layout with smooth animations and hover effects.
- **XSS Protection** — HTML escaping to prevent cross-site scripting attacks.

### AI Weekly Meal Planner 🤖
- **Smart Meal Plan Generation** — Generate a 7-day meal plan based on your current ingredients and preferences.
- **Personalization Options** — Specify preferences like "high protein", "budget friendly", "weight loss", etc.
- **Weight-Based Suggestions** — Enter your weight to get personalized nutrition notes.
- **OpenAI Integration** — Optional GPT-4o-mini integration for advanced AI-generated meal plans (requires API key).
- **Fallback Mode** — Smart mock meal plan generator works without any API key.

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic page structure and templates |
| **CSS3** | Responsive styling, CSS variables for theming, animations |
| **Vanilla JavaScript (ES6+)** | App logic, state management, DOM manipulation |
| **localStorage** | Client-side data persistence |
| **OpenAI API** *(Optional)* | AI-powered meal plan generation |
| **Web Share API** | Native sharing on supported devices |

---

## 📁 Project Structure

```
The Recipe Manager/
│
├── login.html              # Login page
├── signup.html             # Account creation page
├── main.html               # Home: ingredient search + AI meal planner
├── favourites.html         # Saved favorite recipes
├── add-recipe.html         # Add new recipe form
├── recipe.html             # Recipe details page
│
├── script.js               # Main application logic
│   ├── Auth (login/signup/logout/route protection)
│   ├── Recipe management (search, add, favorites)
│   ├── AI meal planner (mock + OpenAI)
│   ├── i18n (language switching)
│   └── Theme management
│
├── style.css               # Global styles, responsive design, dark mode
├── translations.js         # English & Arabic translation dictionaries
├── mockGenerateMealPlan.js # Mock AI meal plan generator
│
├── background.webp         # Background image
├── Omlette.jpg             # Sample recipe image
├── GrilledCheeseSandwich.webp  # Sample recipe image
├── Pancakes.webp           # Sample recipe image
│
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- *(Optional)* VS Code with Live Server extension for better development experience

### Installation

1. **Clone or download** the project files to your local machine.

2. **Open the app**:
   - **Option A**: Open `login.html` directly in your browser.
   - **Option B**: Use a local server (recommended):
     ```bash
     # Using VS Code Live Server
     # Or any static file server, e.g.:
     npx serve .
     ```

3. **Create an account** from the Sign Up page, then log in.

4. **Start exploring** — Add ingredients, search recipes, save favorites, and try the AI meal planner!

---

## 🤖 AI Meal Planner

The AI Meal Planner generates a personalized 7-day meal plan based on:
- Your currently added ingredients
- Your dietary preferences (e.g., "high protein", "budget friendly", "weight loss")
- Your weight (for personalized nutrition notes)

### Using Mock Mode (No API Key Required)
Simply click **"Generate Weekly Plan"** without entering an API key. The app will use the built-in smart mock generator to create a meal plan instantly.

### Using OpenAI Integration (Advanced)
For more advanced AI-generated plans:

1. Obtain an OpenAI API key from [platform.openai.com](https://platform.openai.com).
2. Enter your API key in the provided field *(if available in your version)*.
3. Click **"Generate Weekly Plan"**.
4. The app will use **GPT-4o-mini** to generate a customized HTML table meal plan.

> ⚠️ **Note**: API usage may incur costs. Keep your API key secure and never share it publicly.

---

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`:

| Storage Key | Description |
|-------------|-------------|
| `users` | Registered user accounts |
| `authUser` | Currently logged-in user session |
| `recipes` | All recipes (default + user-added) |
| `favorites` | List of favorite recipe names |
| `lang` | Language preference (`en` or `ar`) |
| `theme` | Theme preference (`light` or `dark`) |

> 🗑️ **Clearing browser storage will reset all saved app data.**

---

## 🔒 Security & Privacy

- **Client-Side Authentication**: The login system is client-side only and intended for learning/demo purposes. It does not provide real security.
- **No Backend**: This is a frontend-only application. No data is sent to any server except when using the optional OpenAI API.
- **XSS Protection**: User inputs are sanitized with HTML escaping to prevent script injection.
- **Privacy**: All personal data remains on your local device.

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Edge | ✅ Full |
| Safari | ✅ Full |
| Mobile Browsers | ✅ Responsive |

> **Web Share API** requires a secure context (HTTPS or localhost). Fallback to clipboard copy is provided.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs or suggest features
- Improve translations
- Add new recipes to the default collection
- Enhance the UI/UX

---

## 📄 License

This project is built for educational purposes. Feel free to use, modify, and distribute.

---

<p align="center">
  Made with ❤️ and lots of ☕
</p>

