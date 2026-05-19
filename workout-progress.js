// workout-progress.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Progress Bar HTML if it doesn't exist yet, but typically we'll add it via HTML
    // However, for consistency, we can dynamically add the completion message to the body.
    
    if (!document.getElementById('completion-message')) {
        const messageHtml = `
            <div id="completion-message">
                <h2>Workout Complete!</h2>
                <p>Outstanding work today. You've earned your rest.</p>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', messageHtml);
    }

    const checkboxes = document.querySelectorAll('.exercise-checkbox');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-percentage');
    const completionMessage = document.getElementById('completion-message');
    
    if (!checkboxes.length || !progressFill || !progressText) return;

    let hasCompleted = false;

    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.exercise-checkbox:checked').length;
        
        const percentage = Math.round((checked / total) * 100);
        
        progressFill.style.width = `${percentage}%`;
        progressText.innerText = `${percentage}%`;

        if (percentage === 100 && !hasCompleted) {
            hasCompleted = true;
            triggerCompletion();
        } else if (percentage < 100) {
            hasCompleted = false;
        }
    }

    function triggerCompletion() {
        // Show Message
        completionMessage.classList.add('show');
        
        // Hide message after 4 seconds
        setTimeout(() => {
            completionMessage.classList.remove('show');
        }, 4000);

        // Trigger Confetti
        if (typeof confetti === 'function') {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateProgress);
    });

    // Initialize progress on load (in case some are pre-checked)
    updateProgress();
});
