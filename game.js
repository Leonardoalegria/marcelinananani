const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const levelElement = document.getElementById('level');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let level = 1;

class Cat {
    constructor(name, color, x, y) {
        this.name = name;
        this.color = color;
        this.x = x;
        this.y = y;
        this.radius = 20;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();

        // Drawing cat ears
        context.beginPath();
        context.moveTo(this.x - this.radius / 2, this.y - this.radius);
        context.lineTo(this.x, this.y - this.radius * 1.5);
        context.lineTo(this.x + this.radius / 2, this.y - this.radius);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();

        // Drawing cat eyes
        context.beginPath();
        context.arc(this.x - this.radius / 3, this.y - this.radius / 3, 2, 0, Math.PI * 2);
        context.arc(this.x + this.radius / 3, this.y - this.radius / 3, 2, 0, Math.PI * 2);
        context.fillStyle = 'black';
        context.fill();
    }
}

const marcelina = new Cat('Marcelina', 'white', canvas.width / 2, canvas.height / 2);
const nanani = new Cat('Nanani', 'gray', Math.random() * canvas.width, Math.random() * canvas.height);

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    marcelina.draw();
    nanani.draw();
}

function moveNanani() {
    nanani.x = Math.random() * canvas.width;
    nanani.y = Math.random() * canvas.height;
}

canvas.addEventListener('click', (event) => {
    const distance = Math.sqrt((event.clientX - nanani.x) ** 2 + (event.clientY - nanani.y) ** 2);
    if (distance < nanani.radius * 2) {
        level++;
        levelElement.textContent = `Level: ${level}`;
        if (level <= 5) {
            moveNanani();
        } else {
            alert('Congratulations! You completed all levels!');
            level = 1;
            levelElement.textContent = `Level: ${level}`;
            moveNanani();
        }
    }
});

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
