/**
 * PongService handles the rendering and logic of the Pong game.
 * Supports both integrated canvas and standalone game page.
 */
class PongService {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // UI Elements
    this.gameOverScreen = document.getElementById('game-over');
    this.winnerText = document.getElementById('winner-text');
    this.restartBtn = document.getElementById('restart-btn');
    
    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => this.resetGame());
    }

    this.init();
  }

  init() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.paddleWidth = 10;
    this.paddleHeight = 100;
    this.ballRadius = 8;
    this.winningScore = 5;

    this.resetGame();
    
    // Controls
    this.upPressed = false;
    this.downPressed = false;
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.upPressed = true;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.downPressed = true;
  }

  handleKeyUp(e) {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.upPressed = false;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.downPressed = false;
  }

  resetGame() {
    this.playerScore = 0;
    this.aiScore = 0;
    this.playerY = this.height / 2 - this.paddleHeight / 2;
    this.aiY = this.height / 2 - this.paddleHeight / 2;
    this.resetBall();
    this.gameRunning = true;
    if (this.gameOverScreen) this.gameOverScreen.classList.add('hidden');
  }

  resetBall() {
    this.ballX = this.width / 2;
    this.ballY = this.height / 2;
    this.ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 5;
    this.ballSpeedY = (Math.random() - 0.5) * 10;
  }

  update() {
    if (!this.gameRunning) return;

    // Move player
    if (this.upPressed && this.playerY > 0) this.playerY -= 7;
    if (this.downPressed && this.playerY < this.height - this.paddleHeight) this.playerY += 7;

    // Move AI
    const aiCenter = this.aiY + this.paddleHeight / 2;
    if (aiCenter < this.ballY - 35) this.aiY += 5;
    else if (aiCenter > this.ballY + 35) this.aiY -= 5;
    
    this.aiY = Math.max(0, Math.min(this.height - this.paddleHeight, this.aiY));

    // Move ball
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;

    // Ball collision (top/bottom)
    if (this.ballY - this.ballRadius < 0 || this.ballY + this.ballRadius > this.height) {
      this.ballSpeedY = -this.ballSpeedY;
    }

    // Ball collision (paddles)
    if (this.ballX - this.ballRadius < this.paddleWidth) {
      if (this.ballY > this.playerY && this.ballY < this.playerY + this.paddleHeight) {
        this.ballSpeedX = Math.abs(this.ballSpeedX) * 1.05;
        const deltaY = this.ballY - (this.playerY + this.paddleHeight / 2);
        this.ballSpeedY = deltaY * 0.35;
      } else if (this.ballX < 0) {
        this.aiScore++;
        this.checkWinner();
        if (this.gameRunning) this.resetBall();
      }
    }

    if (this.ballX + this.ballRadius > this.width - this.paddleWidth) {
      if (this.ballY > this.aiY && this.ballY < this.aiY + this.paddleHeight) {
        this.ballSpeedX = -Math.abs(this.ballSpeedX) * 1.05;
        const deltaY = this.ballY - (this.aiY + this.paddleHeight / 2);
        this.ballSpeedY = deltaY * 0.35;
      } else if (this.ballX > this.width) {
        this.playerScore++;
        this.checkWinner();
        if (this.gameRunning) this.resetBall();
      }
    }
  }

  checkWinner() {
    if (this.playerScore >= this.winningScore || this.aiScore >= this.winningScore) {
      this.gameRunning = false;
      if (this.gameOverScreen) {
        this.gameOverScreen.classList.remove('hidden');
        this.winnerText.textContent = this.playerScore >= this.winningScore ? '¡Has ganado!' : 'La IA ha ganado';
      }
    }
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#111827';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw net
    this.ctx.setLineDash([5, 15]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.strokeStyle = '#374151';
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Draw paddles
    this.ctx.fillStyle = '#3b82f6';
    this.ctx.fillRect(0, this.playerY, this.paddleWidth, this.paddleHeight);
    this.ctx.fillStyle = '#ef4444';
    this.ctx.fillRect(this.width - this.paddleWidth, this.aiY, this.paddleWidth, this.paddleHeight);

    // Draw ball
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw scores
    this.ctx.font = 'bold 32px sans-serif';
    this.ctx.fillStyle = '#3b82f6';
    this.ctx.fillText(this.playerScore, this.width / 4, 50);
    this.ctx.fillStyle = '#ef4444';
    this.ctx.fillText(this.aiScore, (this.width / 4) * 3, 50);
  }

  start() {
    const loop = () => {
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// Instantiate and start the service
(function() {
  window.addEventListener('load', () => {
    // Check for both possible canvas IDs
    const canvas = document.getElementById('pongCanvas') || document.getElementById('pong-canvas');
    if (canvas) {
      const service = new PongService(canvas.id);
      service.start();
    }
  });
})();
