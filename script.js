// --- DOM Elements ---
const grid = document.getElementById("games-grid");
const player = document.getElementById("player");
const frame = document.getElementById("game-frame");
const exitBtn = document.getElementById("exit-btn");
const searchBar = document.getElementById("search-bar");

// Views
const homeView = document.getElementById("home-view");
const gamesView = document.getElementById("games-view");

// Nav Buttons
const navHome = document.getElementById("nav-home");
const navGames = document.getElementById("nav-games");

// Global variable to store all games for searching
let allGames = [];

// --- Fetch Games ---
fetch("games.json")
    .then(res => res.json())
    .then(data => {
        // Flatten the data into a single array (handling folders if they exist)
        data.forEach(item => {
            if (item.type === "folder") {
                item.items.forEach(game => allGames.push(game));
            } else {
                allGames.push(item);
            }
        });
        
        // Initial load
        renderGames(allGames);
    })
    .catch(err => console.error("Error loading games.json:", err));

// --- Render Games ---
function renderGames(gamesArray) {
    grid.innerHTML = "";
    
    gamesArray.forEach(game => {
        const card = document.createElement("div");
        card.className = "game";

        card.innerHTML = `
            <img src="${game.icon}" alt="${game.title}">
            <span>${game.title}</span>
        `;

        card.onclick = () => openGame(game);
        grid.appendChild(card);
    });
}

// --- Search Functionality ---
searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredGames = allGames.filter(game => 
        game.title.toLowerCase().includes(searchTerm)
    );
    
    renderGames(filteredGames);
});

// --- Open/Close Game ---
function openGame(game) {
    player.classList.remove("hidden");
    frame.src = `html/${game.file}`; // Adjust path if needed
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

exitBtn.onclick = () => {
    frame.src = ""; // Stop game from running in background
    player.classList.add("hidden");
    document.body.style.overflow = "auto";
}

// --- Navigation Logic ---
function switchView(viewName) {
    if (viewName === 'home') {
        homeView.classList.remove("hidden");
        gamesView.classList.add("hidden");
        navHome.classList.add("active");
        navGames.classList.remove("active");
    } else if (viewName === 'games') {
        homeView.classList.add("hidden");
        gamesView.classList.remove("hidden");
        navHome.classList.remove("active");
        navGames.classList.add("active");
    }
}

navHome.addEventListener("click", () => switchView('home'));
navGames.addEventListener("click", () => switchView('games'));
