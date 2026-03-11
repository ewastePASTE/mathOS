const grid = document.getElementById("games-grid");
const player = document.getElementById("player");
const frame = document.getElementById("game-frame");
const exitBtn = document.getElementById("exit-btn");
const searchInput = document.getElementById("search");

// View and Nav elements
const homeScreen = document.getElementById("home-screen");
const gamesScreen = document.getElementById("games-screen");
const navHome = document.getElementById("nav-home");
const navGames = document.getElementById("nav-games");

let allGames = []; // Global array to store games for searching

fetch("games.json")
.then(res => res.json())
.then(data => {
    // Flatten the JSON list so we can search through it easily
    data.forEach(item => {
        if(item.type === "folder"){
            item.items.forEach(game => allGames.push(game));
        } else {
            allGames.push(item);
        }
    });
    
    // Load initial grid
    loadItems(allGames);
});

function loadItems(items){
    grid.innerHTML = "";
    items.forEach(game => createGame(game));
}

function createGame(game){
    const card = document.createElement("div");
    card.className = "game";

    card.innerHTML = `
    <img src="${game.icon}">
    <span>${game.title}</span>
    `;

    card.onclick = () => openGame(game);
    grid.appendChild(card);
}

// Search functionality
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = allGames.filter(game => 
        game.title.toLowerCase().includes(searchTerm)
    );
    loadItems(filteredGames);
});

// Sidebar Navigation functionality
navHome.onclick = () => {
    homeScreen.classList.remove("hidden");
    gamesScreen.classList.add("hidden");
    navHome.classList.add("active");
    navGames.classList.remove("active");
};

navGames.onclick = () => {
    homeScreen.classList.add("hidden");
    gamesScreen.classList.remove("hidden");
    navHome.classList.remove("active");
    navGames.classList.add("active");
};

function openGame(game){
    player.classList.remove("hidden");
    frame.src = `html/${game.file}`;
    document.body.style.overflow = "hidden";
}

exitBtn.onclick = () => {
    frame.src = "";
    player.classList.add("hidden");
    document.body.style.overflow = "auto";
}
