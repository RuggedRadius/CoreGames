class GameScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    this.background = new Background('assets/background-track.png', 'Horizontal', -40);
    this.players = [];
    this.raceStart = false;

    this.initPlayers();
    this.bindEvents();
  }

  initPlayers() {
    const playerNames = [
      'Amritha',
      'Ben',
      'Gim',
      'Kenn',
      'Kevin',
      'Alan',
      'Jay',
      'Sherry',
      'Karthika',
    ];
    
    const startX = 130;
    let startY = 1100;
    const yOffset = 100;

    playerNames.forEach((name) => {
      const speed = Math.random() * 2 + 1; // Random speed between 1 and 3
      const player = new Player(name, startX, startY, speed, 'assets/horse1.png');
      this.players.push(player);
      startY -= yOffset;
    });
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.startRace();
      } else if (e.key === 'Escape') {
        this.reset();
      }
    });
  }

  startRace() {
    this.raceStart = true;
  }

  reset() {
    this.players.forEach((player) => {
      player.position.x = 130;
    });
    this.raceStart = false;
  }

  update(deltaTime) {
    if (this.raceStart) {
      this.background.update(deltaTime);
      this.players.forEach((player) => player.update());
    }
  }

  draw() {
    this.background.draw(this.ctx);
    this.players.forEach((player) => player.draw(this.ctx));
  }

  gameLoop(timestamp) {
    const deltaTime = (timestamp - this.lastTime) / 1000 || 0;
    this.lastTime = timestamp;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame((time) => this.gameLoop(time));
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame((time) => this.gameLoop(time));
  }
}