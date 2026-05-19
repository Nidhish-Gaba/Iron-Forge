// --- TIMER CONFIGURATION ---
const DEFAULT_TIME = 10 * 60;
let timeLeft = DEFAULT_TIME;
let timerInterval = null;
let isRunning = false;

const display = document.getElementById('timer-display');
const ctrlBtn = document.getElementById('timer-control');
const beep = document.getElementById('beep-sound');
const timerContainer = document.getElementById('workout-timer');

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        ctrlBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        ctrlBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                beep.play();
                timerContainer.classList.add('timer-finished');
                ctrlBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            }
        }, 1000);
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = DEFAULT_TIME;
    updateDisplay();
    ctrlBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    timerContainer.classList.remove('timer-finished');
    beep.pause();
    beep.currentTime = 0;
}

// --- CHECKBOX PROGRESS LOGIC ---
const checkboxes = document.querySelectorAll('.ex-check');
const missionMessage = document.getElementById('mission-message');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const card = this.closest('.ex-card');
        if (this.checked) card.classList.add('completed');
        else card.classList.remove('completed');

        const allChecked = Array.from(checkboxes).every(c => c.checked);
        if (allChecked) {
            missionMessage.style.display = 'block';
            missionMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            missionMessage.style.display = 'none';
        }
    });
});

// Initialize display
updateDisplay();