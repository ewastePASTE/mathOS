document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('game-grid');
    const modal = document.getElementById('game-modal');
    const frame = document.getElementById('game-frame');
    const closeBtn = document.querySelector('.close-button');

    // Fetch the list of games
    fetch('games.json')
        .then(res => res.json())
        .then(games => {
            games.forEach(game => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${game.title}</h3>
                    <p>${game.description}</p>
                `;
                
                card.onclick = () => {
                    // Points to the file inside the html/ folder
                    frame.src = `html/${game.file}`;
                    modal.style.display = 'block';
                };
                
                grid.appendChild(card);
            });
        });

    closeBtn.onclick = () => {
        modal.style.display = 'none';
        frame.src = ''; // Stop game sound/activity when closed
    };
});
