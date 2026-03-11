document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const appWin = document.getElementById('app-window');
    const iframe = document.getElementById('app-iframe');
    const winTitle = document.getElementById('active-window-title');
    const winIcon = document.getElementById('active-window-icon');
    const indicator = document.getElementById('active-indicator');
    const tbActiveIcon = document.getElementById('tb-active-icon');

    // 1. Load Desktop Games
    fetch('games.json')
        .then(res => res.json())
        .then(games => {
            games.forEach(game => {
                const div = document.createElement('div');
                div.className = 'icon';
                div.innerHTML = `<img src="${game.icon}"><span>${game.title}</span>`;
                div.onclick = () => openApp(`html/${game.file}`, game.title, game.icon);
                desktop.appendChild(div);
            });
            
            // Check if user came via direct game link
            const path = window.location.pathname;
            if (path.includes('/html/')) {
                const fileName = path.split('/').pop();
                const game = games.find(g => g.file === fileName);
                if (game) openApp(`html/${game.file}`, game.title, game.icon);
            }
        });

    // Function used by Games and Taskbar Apps
    window.openApp = function(url, title, icon) {
        winTitle.innerText = title;
        winIcon.src = icon;
        tbActiveIcon.src = icon;
        iframe.src = url;
        
        appWin.style.display = 'flex';
        indicator.classList.remove('hidden');

        // Mask URL to look like ewastepaste.github.io/mathOS/html/amaze.html
        if (!url.startsWith('http')) {
            const newPath = window.location.origin + window.location.pathname.replace('index.html', '') + url;
            window.history.pushState({}, '', newPath);
        }
    };

    // Special handler for Web Apps (Chrome/Spotify)
    window.openWeb = function(url, title, icon) {
        openApp(url, title, icon);
    };

    // 2. Windows 11 Clock Logic
    function updateClock() {
        const now = new Date();
        document.getElementById('time').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        document.getElementById('date').innerText = now.toLocaleDateString();
    }
    setInterval(updateClock, 1000);
    updateClock();
});

function closeApp() {
    document.getElementById('app-window').style.display = 'none';
    document.getElementById('app-iframe').src = '';
    document.getElementById('active-indicator').classList.add('hidden');
    
    // Return URL to root index
    const root = window.location.pathname.split('/html/')[0];
    window.history.pushState({}, '', root);
}
