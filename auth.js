(function () {
    const SESSION_KEY = 'ironForgeSession';
    const STORAGE_KEY = 'ironForgeUser';

    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');

    if (!session) {
        window.location.href = 'login.html';
        return;
    }

//  Show user's name in top-left corner once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const logo = document.querySelector('.logo');
        if (logo && session.name) {
            const greeting = document.createElement('span');
            greeting.innerHTML = 'Hi ' + session.name.split(' ')[0] + ',<br><span style="color:#cd7f32;">Welcome to the Forge</span>';
            greeting.style.cssText = 'position:fixed; top:18px; left:20px; font-family:Oswald,sans-serif; font-size:1.25rem; font-weight:700; text-transform:uppercase; letter-spacing:1px; z-index:1001; color:white;';
            document.body.appendChild(greeting);
        }
    });

    function logout(event) {
        if (event) event.preventDefault();
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(STORAGE_KEY);
        window.location.href = 'login.html';
    }

    window.IronForgeAuth = { logout };
})();
