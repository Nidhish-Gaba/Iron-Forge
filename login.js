const STORAGE_KEY = 'ironForgeUser';

const form = document.getElementById('registerForm');
const notice = document.getElementById('notice');

function setNotice(message, type = '') {
    notice.textContent = message;
    notice.className = `notice ${type}`.trim();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value, 10);
    const email = document.getElementById('email').value.trim();

    if (!name) {
        setNotice('Please enter your full name.', 'error');
        return;
    }

    if (!age || age < 10 || age > 100) {
        setNotice('Please enter a valid age between 10 and 100.', 'error');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setNotice('Please enter a valid email address.', 'error');
        return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, age, email }));
    localStorage.setItem('ironForgeSession', JSON.stringify({ name, email }));
    setNotice('Account created! Redirecting...', 'success');
    setTimeout(() => window.location.href = 'index.html', 1200);
});
