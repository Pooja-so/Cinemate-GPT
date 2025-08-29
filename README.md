# Netflix GPT

## Run the app: npm run dev

## Project Setup:
1. Created React App using Vite
2. Configured Tailwind CSS
3. Header
4. Basic Routing Setup
5. Built Login and SignUp Forms
6. Form Validation (Validating Input fields using Regex`)
7. useRef hook
8. Firebase setup
9. Deploying app to production
10. Implemented User Authentication using Firebase
    - Authentication in Firebase: https://chatgpt.com/share/68af38ff-bce8-8004-99a9-6a25b6ee3a7e
11. Setup Redux Store
12. Setup Protected Route for Browse Page
13. Register App on TMDB[The Movie Database] website (Stable API - Don't change frequently)
14. Fetch Current Streaming movies using TMDB get API 
15. Custom hooks for Fetching movie list and movie trailer
16. Updated Redux Store: Created MovieSlice for storing movie related data
17. Designed Browse Page Part 1: Video Container

## Features
1. Landing Page
2. Login / Sign Up
    - Shows Login/Sign Up Form
    - After successful authentication, redirect to the Browse Page    
3. Browse Page (Only for authenticated users )
    - Header
    - Main Content (Movie)
        - Trailer running in the background
        - Title and Description
        - Movie Suggestions (Movies list)
    - Netflix GPT
        - Search Bar
        - Movie Suggestions