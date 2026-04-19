# The Recipe Manager

A responsive recipe website where users can sign up, log in, add ingredients, discover matching recipes, save favorites, and switch between English and Arabic.

## Overview
The project is built with plain HTML, CSS, and JavaScript, with data persisted in `localStorage`.

## Features
- Ingredient-based recipe search
- Add custom recipes
- Favorites system
- Recipe details page + share link action
- Login and sign up flow (localStorage-based)
- Route protection for app pages (requires login)
- Logout button on protected pages
- Language switcher (English / Arabic)
- Theme switcher (Light / Dark)
- Responsive layout for desktop and mobile

## Pages
- `login.html`: user login
- `signup.html`: account creation
- `main.html`: ingredient search + recipe cards
- `favourites.html`: favorite recipes
- `add-recipe.html`: add a new recipe
- `recipe.html`: recipe details

## Project Structure
- `script.js`: app logic (recipes, favorites, auth, i18n, theme)
- `style.css`: global styles and responsive design
- `*.html`: app pages
- media files: recipe images used in cards/details

## Run Locally
Because this version is frontend-only, you can run it directly:

1. Open `login.html` in your browser.
2. Create an account from the Sign Up page.
3. Log in and start using the app.

Optional: use VS Code Live Server or any static file server for a better development experience.

## Data Storage
The app stores data in browser `localStorage`:
- users/accounts
- current logged-in user session
- recipes
- favorites
- theme preference
- language preference

## Notes
- Auth is client-side only and intended for learning/demo purposes.
- No backend/API is required for the current version.
- Clearing browser storage will reset saved app data.
