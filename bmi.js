function calculateBMI() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const resultDiv = document.getElementById('bmi-result');
    const valueText = document.getElementById('bmi-value');
    const statusText = document.getElementById('bmi-status');

    if (weight > 0 && height > 0) {
        // Calculate BMI (Height in meters)
        const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
        
        resultDiv.style.display = 'block';
        valueText.innerHTML = `Your BMI: ${bmi}`;

        let status = "";
        if (bmi < 18.5) {
            status = "Underweight - Time to hit the Bulking plan!";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = "Healthy Weight - Keep maintaining that forge!";
        } else if (bmi >= 25 && bmi <= 29.9) {
            status = "Overweight - Consider our Cutting routines.";
        } else {
            status = "Obese - Let's start with consistent Cardio.";
        }
        
        statusText.innerHTML = status;
    } else {
        alert("Please enter valid weight and height values.");
    }
}




// --- MUSCLE MAP INTERACTIVE LOGIC ---
const workoutData = {
    'chest': {
        title: 'Chest (Pectorals)',
        desc: 'Focus on bench presses, inclines, and flyes to build chest mass and strength.',
        link: 'chest.html'
    },
    'abs': {
        title: 'Core & Abs',
        desc: 'Build a rock-solid midsection with planks, leg raises, and weighted crunches.',
        link: 'Abs.html'
    },
    'biceps': {
        title: 'Biceps (Arms)',
        desc: 'Isolate the peak of your arms using barbell curls, hammer curls, and chin-ups.',
        link: 'Biceps.html'
    },
    'shoulders': {
        title: 'Shoulders (Delts)',
        desc: 'Broaden your frame with overhead presses, lateral raises, and face pulls.',
        link: 'Shoulders.html'
    },
    'legs': {
        title: 'Legs (Quads & Glutes)',
        desc: 'The foundation of strength. Master the squat, lunges, and leg press routines.',
        link: 'Legs.html'
    }
};

document.querySelectorAll('.muscle-unit').forEach(unit => {
    unit.addEventListener('click', function() {
        const muscleId = this.id;
        const data = workoutData[muscleId];

        if(data) {
            // Hide placeholder and show content
            document.getElementById('placeholder-text').style.display = 'none';
            document.getElementById('active-content').style.display = 'block';

            // Update text and link
            document.getElementById('selected-muscle').innerText = data.title;
            document.getElementById('muscle-description').innerText = data.desc;
            document.getElementById('exercise-links').innerHTML = `
                <a href="${data.link}" class="btn btn-primary" style="margin-top:10px">
                    Explore ${data.title} Routine
                </a>
            `;

            // Visual toggle for active muscle
            document.querySelectorAll('.muscle-unit').forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        }
    });
});