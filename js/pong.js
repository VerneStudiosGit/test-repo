const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const gameOverScreen = document.getElementById('game-over');
const winnerText = document.getElementById('winner-text');
const restartBtn = document.getElementById('restart-btn');

// Game constants
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const WINNING_SCORE = 5;

// Game state
let playerY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let aiY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let playerScore = 0;
let aiScore = 0;
let gameRunning = true;

// Controls
let upPressed = false;
let downPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') upPressed = true;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') downPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') upPressed = false;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') downPressed = false;
});

restartBtn.addEventListener('click', resetGame);

function resetGame() {
    playerScore = 0;
    aiScore = 0;
    playerY = canvas.height / 2 - PADDLE_HEIGHT / 2;
    aiY = canvas.height / 2 - PADDLE_HEIGHT / 2;
    resetBall();
    gameRunning = true;
    gameOverScreen.classList.add('hidden');
    requestAnimationFrame(update);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = (Math.random() - 0.5) * 10;
}

function update() {
    if (!gameRunning) return;

    // Move player
    if (upPressed && playerY > 0) playerY -= 7;
    if (downPressed && playerY < canvas.height - PADDLE_HEIGHT) playerY += 7;

    // Move AI
    const aiCenter = aiY + PADDLE_HEIGHT / 2;
    if (aiCenter < ballY - 35) aiY += 5;
    else if (aiCenter > ballY + 35) aiY -= 5;

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision (top/bottom)
    if (ballY < 0 || ballY > canvas.height - BALL_SIZE) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision (paddles)
    if (ballX < PADDLE_WIDTH) {
        if (ballY > playerY && ballY < playerY + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            // Add some spin
            const deltaY = ballY - (playerY + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            aiScore++;
            checkWinner();
            resetBall();
        }
    }

    if (ballX > canvas.width - PADDLE_WIDTH - BALL_SIZE) {
        if (ballY > aiY && ballY < aiY + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            const deltaY = ballY - (aiY + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            playerScore++;
            checkWinner();
            resetBall();
        }
    }

    draw();
    if (gameRunning) requestAnimationFrame(update);
}

function checkWinner() {
    if (playerScore >= WINNING_SCORE || aiScore >= WINNING_SCORE) {
        gameRunning = false;
        gameOverScreen.classList.remove('hidden');
        winnerText.textContent = playerScore >= WINNING_SCORE ? '¡Has ganado!' : 'La IA ha ganado';
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw net
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#3b82f6'; // Blue-500
    ctx.fillRect(0, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = '#ef4444'; // Red-500
    ctx.fillRect(canvas.width - PADDLE_WIDTH, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ballX, ballY, BALL_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw score
    ctx.font = '32px sans-serif';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(playerScore, canvas.width / 4, 50);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(aiScore, (canvas.width / 4) * 3, 50);
}

update();
