<h1 align="center">What's in the Fridge 🍳</h1>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=flat-square" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=flat-square" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square" alt="JavaScript">
  <img src="https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white&style=flat-square" alt="OpenAI">
</p>

<p align="center">
  <b>English</b> | <b>العربية</b>
</p>

<p align="center">
  A responsive, bilingual recipe web application where users can discover recipes from their available ingredients, explore world cuisines, manage favorites, generate AI-powered meal plans, and enjoy a seamless experience in both English and Arabic.
</p>

<p align="center">
  تطبيق ويب متجاوب وثنائي اللغة يتيح للمستخدمين اكتشاف الوصفات من المكونات المتوفرة لديهم، واستكشاف المأكولات العالمية، وإدارة المفضلات، وتوليد خطط وجبات مدعومة بالذكاء الاصطناعي، مع تجربة سلسة باللغتين الإنجليزية والعربية.
</p>

<p align="center">
  <a href="#-getting-started">🚀 Quick Start</a> •
  <a href="#-features">✨ Features</a> •
  <a href="#-screenshots">📸 Screenshots</a> •
  <a href="#-contributing">🤝 Contributing</a>
</p>

---

## 📑 Table of Contents

- [Features](#-features)
- [World Cuisines](#-world-cuisines)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [AI Meal Planner](#-ai-meal-planner)
- [Data Storage](#-data-storage)
- [Security & Privacy](#-security--privacy)
- [Browser Support](#-browser-support)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [Authors](#-authors)
- [Acknowledgments](#-acknowledgments)
- [Support](#-support)
- [License](#-license)

---

## ✨ Features

### Core Recipe Management
- **🍲 Ingredient-Based Search** — Add ingredients you have and discover matching recipes sorted by relevance.
- **📝 Recipe Instructions** — Every recipe includes detailed step-by-step cooking instructions.
- **➕ Add Custom Recipes** — Easily add your own recipes with name, ingredients, instructions, and image URL.
- **❤️ Favorites System** — Save recipes to your favorites and access them anytime.
- **👁️ Recipe Details Page** — View full recipe details with ingredients, step-by-step instructions, and share functionality.
- **🔗 Share Recipes** — Share recipe links via Web Share API or copy to clipboard.

### World Cuisine Sections
- **🇪🇬 Egyptian Cuisine** — Authentic Egyptian recipes passed down through generations.
- **🇸🇦 Saudi Cuisine** — Traditional Saudi flavors from the heart of Arabia.
- **🇮🇹 Italian Cuisine** — Classic Italian dishes made with passion and tradition.
- **🇪🇸 Spanish Cuisine** — Vibrant Spanish flavors from tapas to traditional feasts.

### User Authentication
- **🔐 Sign Up & Login** — Create an account and log in with email and password.
- **🛡️ Route Protection** — Protected pages (Main, Favorites, Add Recipe, Recipe Details, Profile) require authentication.
- **🔄 Auto-Redirect** — Authenticated users are redirected from auth pages to the main app.
- **🚪 Logout** — Secure logout functionality available on all protected pages.

### Internationalization & Accessibility
- **🌍 Bilingual Support** — Full support for **English (EN)** and **Arabic (AR)** with complete translation coverage.
- **↔️ RTL Layout** — Automatic right-to-left layout switching for Arabic.
- **♿ Accessibility (a11y)** — Semantic HTML, ARIA labels, keyboard navigation, and screen-reader friendly components.

### Theme & UI
- **☀️🌙 Light / Dark Theme** — Toggle between light and dark modes with preference persistence.
- **📱 Responsive Design** — Optimized for desktop, tablet, and mobile devices.
- **🎨 Modern UI** — Clean card-based layout with smooth animations, hover effects, and cuisine-themed sections.
- **🔒 XSS Protection** — HTML escaping to prevent cross-site scripting attacks.

### AI Weekly Meal Planner 🤖
- **📅 Smart Meal Plan Generation** — Generate a 7-day meal plan based on your current ingredients and preferences.
- **🎯 Personalization Options** — Specify preferences like "high protein", "budget friendly", "weight loss", etc.
- **⚖️ Weight-Based Suggestions** — Enter your weight to get personalized nutrition notes.
- **🤖 OpenAI Integration** — Optional GPT-4o-mini integration for advanced AI-generated meal plans (requires API key).
- **📋 Fallback Mode** — Smart mock meal plan generator works without any API key.

---

## 🌍 World Cuisines

### 🇪🇬 Egyptian Cuisine
| Recipe | Key Ingredients |
|--------|----------------|
| **Egyptian Molokhia** | Molokhia leaves, chicken broth, garlic, ghee, coriander |
| **Egyptian Koshari** | Rice, lentils, macaroni, spaghetti, crispy onions, tomato sauce |
| **Egyptian Mahshi** | Rice, herbs, zucchini, eggplant, grape leaves, cabbage |

### 🇸🇦 Saudi Cuisine
| Recipe | Key Ingredients |
|--------|----------------|
| **Saudi Chicken Kabsa** | Chicken, basmati rice, loomi, cinnamon, cardamom, Kabsa spices |
| **Saudi Areeka** | Whole wheat flour, dates, ghee, honey |
| **Saudi Royal Masoub** | Bananas, bread, cream, honey, ghee |

### 🇮🇹 Italian Cuisine
| Recipe | Key Ingredients |
|--------|----------------|
| **Italian Pizza Napoletana** | 00 flour, San Marzano tomatoes, fresh mozzarella, basil |
| **Italian Pasta Carbonara** | Spaghetti, eggs, Parmesan, pancetta, black pepper |
| **Italian Lasagna alla Bolognese** | Beef ragù, béchamel, fresh lasagna sheets, Parmesan |
| **Italian Mushroom Risotto** | Arborio rice, mushrooms, broth, butter, Parmesan |

### 🇪🇸 Spanish Cuisine
| Recipe | Key Ingredients |
|--------|----------------|
| **Spanish Seafood Paella** | Bomba rice, mixed seafood, saffron, paprika |
| **Spanish Tortilla de Patatas** | Potatoes, onion, eggs, olive oil |
| **Spanish Patatas Bravas** | Fried potatoes, smoked paprika, chili sauce |
| **Spanish Churros** | Flour, butter, sugar, cinnamon, dark chocolate |

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
├── main.html               # Home: ingredient search + cuisines + AI meal planner
├── favourites.html         # Saved favorite recipes
├── add-recipe.html         # Add new recipe form (with instructions)
├── recipe.html             # Recipe details page (ingredients + instructions)
├── profile.html            # User profile page
│
├── js/
│   ├── script.js           # Main application logic
│   │   ├── Auth (login/signup/logout/route protection)
│   │   ├── Recipe management (search, add, favorites, instructions)
│   │   ├── Cuisine loaders (Egyptian, Saudi, Italian, Spanish)
│   │   ├── AI meal planner (mock + OpenAI)
│   │   ├── i18n (language switching)
│   │   └── Theme management
│   ├── translations.js     # English & Arabic translation dictionaries
│   └── mockGenerateMealPlan.js # Mock AI meal plan generator
│
├── style.css               # Global styles, responsive design, dark mode
│   ├── Cuisine section themes (green, beige, red, gold)
│   └── Responsive grid layouts
│
├── images/                 # Recipe images
│   ├── Molokhia.jpeg
│   ├── Koshari.jpeg
│   ├── Mahshi.jpeg
│   ├── background.webp
│   └── ...
│
├── h.css                   # Additional helper styles
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

4. **Start exploring** — Add ingredients, search recipes, browse world cuisines, save favorites, and try the AI meal planner!

---

## 🤖 AI Meal Planner

The AI Meal Planner generates a personalized 7-day meal plan based on:
- Your currently added ingredients
- Your dietary preferences (e.g., "high protein", "budget friendly", "weight loss")
- Your weight (for personalized nutrition notes)

### Using Mock Mode (No API Key Required)
Simply click **"Generate Weekly Plan"** without entering an API key. The app will use the built-in smart mock generator to create a meal plan instantly using actual recipes from the app.

### Using OpenAI Integration (Advanced)
For more advanced AI-generated plans:

1. Obtain an OpenAI API key from [platform.openai.com](https://platform.openai.com).
2. Enter your API key in the provided field.
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
| `recipes` | All recipes (default cuisines + user-added) |
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

## 📸 Screenshots

> 📷 **Screenshots are recommended to be placed in the `docs/screenshots/` directory.**

<p align="center">
  <img src="images/screenshots/Light MainPage.jpg" alt="Light Theme — Main Page" width="80%">
  <br>
  <i>Light Theme — Main Page with Cuisine Sections</i>
</p>

<p align="center">
  <img src="images/screenshots/Dark Recipe Instructions.jpg" alt="Dark Theme — Recipe Details" width="80%">
  <br>
  <i>Dark Theme — Recipe Details with Instructions</i>
</p>

<p align="center">
  <img src="images/screenshots/Arabic Meal Plan.jpg" alt="Arabic RTL — AI Meal Planner" width="80%">
  <br>
  <i>Arabic RTL — AI Meal Planner</i>
</p>

---

## 🗺️ Roadmap

- [ ] **Backend Integration** — Add a real backend with Node.js/Express and a database (MongoDB/PostgreSQL) for persistent user data and real authentication.
- [ ] **PWA Support** — Convert the app into a Progressive Web App with offline support and installable on mobile devices.
- [ ] **More Cuisines** — Expand the recipe collection with Asian, Mexican, Indian, and French cuisines.
- [ ] **Social Sharing** — Share recipes directly to social media platforms (Facebook, Twitter, WhatsApp).
- [ ] **Nutrition Facts** — Add detailed nutritional information for each recipe (calories, macros, vitamins).
- [ ] **Voice Search** — Enable voice input for adding ingredients and searching recipes.
- [ ] **Shopping List** — Generate a shopping list from missing ingredients in selected recipes.

---

## ❓ FAQ

### Is this app free to use?
Yes, the app is completely free to use. All features, including the AI Meal Planner's mock mode, work without any cost.

### Does it work offline?
Currently, the app requires an internet connection to load initially. However, since all data is stored in `localStorage`, once loaded, the app functions without a continuous connection.

### Is my data safe?
All your data (recipes, favorites, user info) is stored locally in your browser using `localStorage`. No data is sent to any server except when you optionally use the OpenAI API for advanced meal planning.

### Can I use my own OpenAI API key?
Yes! The app supports optional integration with OpenAI's GPT-4o-mini for more advanced meal plans. Simply enter your API key in the designated field.

### How do I add a new cuisine section?
Follow the steps in the [Contributing](#-contributing) section below. You need to update the recipes in `js/script.js`, add translations in `js/translations.js`, and add corresponding HTML and CSS.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs or suggest features
- Improve translations
- Add new recipes to the default collection
- Add new cuisine sections
- Enhance the UI/UX

To add a new cuisine:
1. Add recipes to `defaultRecipes` in `js/script.js`
2. Add a `load[Cuisine]Recipes()` function
3. Add a section to `main.html` and nav links to all pages
4. Add translations to `js/translations.js`
5. Add CSS styles to `style.css`

---

## 👥 Authors

| Name | Role | GitHub |
|------|------|--------|
| **Mark Bassem** | Lead Developer & Front-End Developer | [@Mark-bassem](https://github.com/Mark-bassem) |

---

## 🙏 Acknowledgments

- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) and [Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic) from Google Fonts.
- **Icons & Inspiration**: Emoji icons used for visual enhancement.
- **OpenAI**: For providing the GPT-4o-mini API used in the advanced meal planner.
- **Community**: Thanks to everyone who contributed ideas, recipes, and feedback.

---

## 🆘 Support

If you encounter any issues or have questions:

1. **Open an Issue**: [GitHub Issues](https://github.com/Mark-bassem/recipe-manager/issues)
2. **Email**: [markbassem8@gmail.com](mailto:markbassem8@gmail.com)

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 What's in the Fridge Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  Made with ❤️ and lots of ☕
</p>

<p align="center">
  <strong>What's in the Fridge</strong> — Your Kitchen Companion
</p>

<p align="center">
  <a href="#-table-of-contents">⬆ Back to Top</a>
</p>
