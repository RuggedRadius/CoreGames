class Player {
    constructor(name, x, y, speed, imageSrc) {
      this.name = name;
      this.position = { x, y };
      this.speed = speed;
  
      this.image = new Image();
      this.image.src = imageSrc;
    }
  
    update() {
      this.position.x += this.speed;
    }
  
    draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, 256, 256);

      // Draw player name
      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(this.name, this.position.x, this.position.y - 25);
    }
  }