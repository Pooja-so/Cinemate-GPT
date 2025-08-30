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
14. Planning for Building Browse Page [Main page of the app]
15. Fetch Current Streaming movies using TMDB get API 
16. Custom hooks for Fetching movie list and movie trailer
17. Updated Redux Store: Created MovieSlice for storing movie related data
18. Designed Browse Page Part 1: Video Container
19. Designed Browse Page Part 2: MovieList Container
    - Refactored custom hook for fetching movie APIS (more modular, increase reusability.)

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