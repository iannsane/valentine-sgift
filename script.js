const garden = document.querySelector('.garden');
const foliage = document.querySelector('.foliage-container');
const field = document.querySelector('.field');
const menu = document.getElementById('flower-menu');
const startBtn = document.getElementById('start-btn');
const vDayMsg = document.getElementById('v-day-message');
const bloomTxt = document.getElementById('bloom-text');

startBtn.addEventListener('click', () => {
    menu.style.opacity = '0';
    setTimeout(() => {
        menu.style.display = 'none';
        field.style.opacity = '1';
        vDayMsg.style.opacity = '1';
        setTimeout(() => { bloomTxt.style.opacity = '1'; }, 1200);
        setTimeout(() => { startGardenAnimation(); }, 2500); 
    }, 1500);
});

function startGardenAnimation() {
    // 1. Grow Daisies
    plantDaisy(0, 270, 500);      
    plantDaisy(-18, 240, 1200);   
    plantDaisy(18, 240, 1900);    

    // 2. Grow Grass Meadow
    for (let i = 0; i < 150; i++) {
        const blade = document.createElement('div');
        blade.classList.add('grass-blade');
        const finalHeight = 40 + Math.random() * 90;
        blade.style.left = `${Math.random() * 100}vw`;
        blade.style.setProperty('--final-h', `${finalHeight}px`);
        blade.style.width = `${1 + Math.random() * 2}px`;
        // Staggered growth delay + swaying delay
        blade.style.animationDelay = `${Math.random() * 2}s, ${Math.random() * -5}s`; 
        foliage.appendChild(blade);
    }
    
    // 3. Start Hearts and Sparkles
    setInterval(spawnParticles, 500);
}

function plantDaisy(angle, height, delay) {
    const container = document.createElement('div');
    container.classList.add('plant-group');
    
    const stem = document.createElement('div');
    stem.classList.add('stem');
    stem.style.setProperty('--h', `${height}px`);
    stem.style.transform = `rotate(${angle}deg)`;
    stem.style.animationDelay = `${delay}ms`;
    container.appendChild(stem);

    const flower = document.createElement('div');
    flower.classList.add('flower');
    const rad = (angle * Math.PI) / 180;
    flower.style.left = `${Math.sin(rad) * height}px`;
    flower.style.bottom = `${Math.cos(rad) * height}px`;
    flower.style.transform = `rotate(${angle}deg) rotateX(30deg)`;

    const center = document.createElement('div');
    center.classList.add('center');
    flower.appendChild(center);

    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const pAngle = (i / 12) * 360;
        setTimeout(() => {
            petal.style.transition = 'all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            petal.style.opacity = '1';
            petal.style.transform = `rotate(${pAngle}deg) translateY(-10px) scale(1)`;
        }, delay + 1800 + (i * 50));
        flower.appendChild(petal);
    }
    container.appendChild(flower);
    garden.appendChild(container);
}

function spawnParticles() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (12 + Math.random() * 15) + 'px';
    heart.style.bottom = '-5%';
    field.appendChild(heart);

    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.bottom = (10 + Math.random() * 40) + '%';
    field.appendChild(sparkle);

    setTimeout(() => {
        heart.remove();
        sparkle.remove();
    }, 7000);
}