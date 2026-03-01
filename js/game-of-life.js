const CELL_SIZE = 14;
const COLORS = ['#3b82f6', '#ef4444', '#fbbf24', '#22c55e', '#ec4899', '#a855f7', '#f97316'];

class GameOfLife {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.running = false;
    this.generation = 0;
    this.intervalId = null;
    this.speed = 150;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.canvas.addEventListener('click', (e) => this.handleClick(e));
    this.canvas.addEventListener('mousemove', (e) => {
      if (e.buttons === 1) this.handleClick(e);
    });

    this.randomize();
  }

  resize() {
    const container = this.canvas.parentElement;
    const w = Math.min(container.clientWidth, 900);
    const h = Math.min(window.innerHeight * 0.55, 500);
    this.cols = Math.floor(w / CELL_SIZE);
    this.rows = Math.floor(h / CELL_SIZE);
    this.canvas.width = this.cols * CELL_SIZE;
    this.canvas.height = this.rows * CELL_SIZE;

    if (this.grid) {
      const newGrid = this.emptyGrid();
      for (let r = 0; r < Math.min(this.rows, this.grid.length); r++) {
        for (let c = 0; c < Math.min(this.cols, this.grid[0].length); c++) {
          newGrid[r][c] = this.grid[r][c];
        }
      }
      this.grid = newGrid;
    } else {
      this.grid = this.emptyGrid();
    }

    this.draw();
  }

  emptyGrid() {
    return Array.from({ length: this.rows }, () => new Uint8Array(this.cols));
  }

  randomize() {
    this.grid = Array.from({ length: this.rows }, () =>
      Uint8Array.from({ length: this.cols }, () => (Math.random() < 0.3 ? 1 : 0))
    );
    this.generation = 0;
    this.updateGeneration();
    this.draw();
  }

  clear() {
    this.grid = this.emptyGrid();
    this.generation = 0;
    this.updateGeneration();
    this.draw();
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      this.grid[row][col] = this.grid[row][col] ? 0 : 1;
      this.draw();
    }
  }

  countNeighbors(grid, r, c) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = (r + dr + this.rows) % this.rows;
        const nc = (c + dc + this.cols) % this.cols;
        count += grid[nr][nc];
      }
    }
    return count;
  }

  step() {
    const next = this.emptyGrid();
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const neighbors = this.countNeighbors(this.grid, r, c);
        const alive = this.grid[r][c];
        if (alive) {
          next[r][c] = neighbors === 2 || neighbors === 3 ? 1 : 0;
        } else {
          next[r][c] = neighbors === 3 ? 1 : 0;
        }
      }
    }
    this.grid = next;
    this.generation++;
    this.updateGeneration();
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    const isDark = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDark ? '#111827' : '#f9fafb';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid lines
    ctx.strokeStyle = isDark ? '#1f2937' : '#e5e7eb';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= this.rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * CELL_SIZE);
      ctx.lineTo(this.canvas.width, r * CELL_SIZE);
      ctx.stroke();
    }
    for (let c = 0; c <= this.cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * CELL_SIZE, 0);
      ctx.lineTo(c * CELL_SIZE, this.canvas.height);
      ctx.stroke();
    }

    // Cells
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c]) {
          const colorIdx = (r * 7 + c * 3) % COLORS.length;
          ctx.fillStyle = COLORS[colorIdx];
          ctx.beginPath();
          ctx.roundRect(
            c * CELL_SIZE + 1,
            r * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2,
            2
          );
          ctx.fill();
        }
      }
    }
  }

  updateGeneration() {
    const el = document.getElementById('generation-count');
    if (el) el.textContent = this.generation;
  }

  setSpeed(val) {
    this.speed = val;
    if (this.running) {
      this.pause();
      this.play();
    }
  }

  play() {
    if (this.running) return;
    this.running = true;
    this.intervalId = setInterval(() => this.step(), this.speed);
    document.getElementById('play-btn').textContent = 'Pausar';
  }

  pause() {
    this.running = false;
    clearInterval(this.intervalId);
    document.getElementById('play-btn').textContent = 'Iniciar';
  }

  toggle() {
    this.running ? this.pause() : this.play();
  }
}

let game;
document.addEventListener('DOMContentLoaded', () => {
  game = new GameOfLife('golCanvas');

  document.getElementById('play-btn').addEventListener('click', () => game.toggle());
  document.getElementById('step-btn').addEventListener('click', () => {
    if (!game.running) game.step();
  });
  document.getElementById('randomize-btn').addEventListener('click', () => {
    game.pause();
    game.randomize();
  });
  document.getElementById('clear-btn').addEventListener('click', () => {
    game.pause();
    game.clear();
  });

  const speedSlider = document.getElementById('speed-slider');
  speedSlider.addEventListener('input', () => {
    // slider value 1-10, map to ms: 10->50ms, 1->500ms
    const ms = Math.round(550 - speedSlider.value * 50);
    game.setSpeed(ms);
    document.getElementById('speed-label').textContent = speedSlider.value;
  });

  // Redraw on theme change
  const observer = new MutationObserver(() => game.draw());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});
