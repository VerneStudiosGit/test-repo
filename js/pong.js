/**
 * PongGame class handles the game mechanics, input, and game loop.
 */
class PongGame {
    /**
     * @param {string} canvasId - The id of the canvas element.
     * @param {Object} uiElements - UI elements for game over screen and scoring.
     */
    constructor(canvasId, uiElements) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id ${canvasId} not found`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.ui = uiElements;

        // Game constants
        this.PADDLE_WIDTH = 10;
        this.PADDLE_HEIGHT = 100;
        this.BALL_SIZE = 10;
        this.WINNING_SCORE = 5;
        this.PLAYER_SPEED = 7;
        this.AI_SPEED = 5;

        // Game state
        this.playerScore = 0;
        this.aiScore = 0;
        this.ballSpeedX = 5;
        this.gameRunning = false;

        // Controls
        this.keys = {
            up: false,
            down: false
        };

        this.init();
    }

    /**
     * Initializes the game.
     */
    init() {
        this.resetPositions();
        this.initEventListeners();
    }

    /**
     * Resets paddles and ball to starting positions.
     */
    resetPositions() {
        this.playerY = this.canvas.height / 2 - this.PADDLE_HEIGHT / 2;
        this.aiY = this.canvas.height / 2 - this.PADDLE_HEIGHT / 2;
        this.resetBall();
    }

    /**
     * Resets the ball position and flips its direction.
     */
    resetBall() {
        this.ballX = this.canvas.width / 2;
        this.ballY = this.canvas.height / 2;
        this.ballSpeedX = -this.ballSpeedX;
        this.ballSpeedY = (Math.random() - 0.5) * 10;
    }

    /**
     * Sets up event listeners for input and UI interaction.
     */
    initEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));

        if (this.ui.restartBtn) {
            this.ui.restartBtn.addEventListener('click', () => this.restart());
        }
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.keys.up = true;
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.keys.down = true;
    }

    handleKeyUp(e) {
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.keys.up = false;
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.keys.down = false;
    }

    /**
     * Restarts the game.
     */
    restart() {
        this.playerScore = 0;
        this.aiScore = 0;
        this.resetPositions();
        if (this.ui.gameOverScreen) {
            this.ui.gameOverScreen.classList.add('hidden');
        }
        if (!this.gameRunning) {
            this.start();
        }
    }

    /**
     * Updates the game state.
     */
    update() {
        if (!this.gameRunning) return;

        // Move player
        if (this.keys.up && this.playerY > 0) {
            this.playerY -= this.PLAYER_SPEED;
        }
        if (this.keys.down && this.playerY < this.canvas.height - this.PADDLE_HEIGHT) {
            this.playerY += this.PLAYER_SPEED;
        }

        // Move AI
        const aiCenter = this.aiY + this.PADDLE_HEIGHT / 2;
        if (aiCenter < this.ballY - 35) {
            this.aiY += this.AI_SPEED;
        } else if (aiCenter > this.ballY + 35) {
            this.aiY -= this.AI_SPEED;
        }

        // Move ball
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;

        // Ball collision (top/bottom)
        if (this.ballY < 0 || this.ballY > this.canvas.height - this.BALL_SIZE) {
            this.ballSpeedY = -this.ballSpeedY;
        }

        // Ball collision (paddles)
        // Player paddle
        if (this.ballX < this.PADDLE_WIDTH) {
            if (this.ballY > this.playerY && this.ballY < this.playerY + this.PADDLE_HEIGHT) {
                this.ballSpeedX = -this.ballSpeedX;
                const deltaY = this.ballY - (this.playerY + this.PADDLE_HEIGHT / 2);
                this.ballSpeedY = deltaY * 0.35;
            } else {
                this.aiScore++;
                this.checkWinner();
                if (this.gameRunning) this.resetBall();
            }
        }

        // AI paddle
        if (this.ballX > this.canvas.width - this.PADDLE_WIDTH - this.BALL_SIZE) {
            if (this.ballY > this.aiY && this.ballY < this.aiY + this.PADDLE_HEIGHT) {
                this.ballSpeedX = -this.ballSpeedX;
                const deltaY = this.ballY - (this.aiY + this.PADDLE_HEIGHT / 2);
                this.ballSpeedY = deltaY * 0.35;
            } else {
                this.playerScore++;
                this.checkWinner();
                if (this.gameRunning) this.resetBall();
            }
        }
    }

    /**
     * Checks if there is a winner.
     */
    checkWinner() {
        if (this.playerScore >= this.WINNING_SCORE || this.aiScore >= this.WINNING_SCORE) {
            this.gameRunning = false;
            this.showGameOver();
        }
    }

    /**
     * Shows the game over screen.
     */
    showGameOver() {
        if (this.ui.gameOverScreen) {
            this.ui.gameOverScreen.classList.remove('hidden');
            if (this.ui.winnerText) {
                this.ui.winnerText.textContent = this.playerScore >= this.WINNING_SCORE ? '¡Has ganado!' : 'La IA ha ganado';
            }
        }
    }

    /**
     * Draws the game state on the canvas.
     */
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw net
        this.ctx.setLineDash([5, 15]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.strokeStyle = '#333';
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Draw paddles
        this.ctx.fillStyle = '#3b82f6'; // Blue-500
        this.ctx.fillRect(0, this.playerY, this.PADDLE_WIDTH, this.PADDLE_HEIGHT);
        this.ctx.fillStyle = '#ef4444'; // Red-500
        this.ctx.fillRect(this.canvas.width - this.PADDLE_WIDTH, this.aiY, this.PADDLE_WIDTH, this.PADDLE_HEIGHT);

        // Draw ball
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(this.ballX, this.ballY, this.BALL_SIZE / 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw score
        this.ctx.font = '32px sans-serif';
        this.ctx.fillStyle = '#3b82f6';
        this.ctx.fillText(this.playerScore, this.canvas.width / 4, 50);
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fillText(this.aiScore, (this.canvas.width / 4) * 3, 50);
    }

    /**
     * Starts the game loop.
     */
    start() {
        this.gameRunning = true;
        const gameLoop = () => {
            if (!this.gameRunning) return;
            this.update();
            this.draw();
            requestAnimationFrame(gameLoop);
        };
        requestAnimationFrame(gameLoop);
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const uiElements = {
        gameOverScreen: document.getElementById('game-over'),
        winnerText: document.getElementById('winner-text'),
        restartBtn: document.getElementById('restart-btn')
    };

    const game = new PongGame('pongCanvas', uiElements);
    game.start();
});
