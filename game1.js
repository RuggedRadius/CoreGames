class Game1 {
    constructor(ctx) {
        this.ctx = ctx;
    }

    start() {
        // Initialize the game, set up players, etc.
        console.log('Starting Game 1');
        this.update();
    }

    update() {
        // Game update logic (e.g., movement, interactions, etc.)
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Render game elements
        this.ctx.fillStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.arc(100, 100, 20, 0, Math.PI * 2);
        this.ctx.fill();

        // Continue game loop
        requestAnimationFrame(() => this.update());
    }

    stop() {
        console.log('Stopping Game 1');
    }
}
