class Background {
    constructor(imageSrc, scrollType = 'Horizontal', speed = -40) {
      // Scroll types (similar to enum)
      this.ScrollType = {
        Horizontal: 'Horizontal',
        Vertical: 'Vertical',
      };
  
      this.scrollType = scrollType;
      this.speed = speed; // Speed of scrolling
  
      // Image properties
      this.image = new Image();
      this.image.src = imageSrc;
  
      // Positions of the two images
      this.pos1 = { x: 0, y: 0 };
      this.pos2 = { x: 0, y: 0 };
  
      // Scaling factors for HD and FULLHD
      this.scale = 1;
      this.windowWidth = 920; // Adjust as needed
      this.windowHeight = 1080; // Adjust as needed
  
      // Define scale based on window height
      const HD = { x: 2.25, y: 1.5 };
      const FULLHD = { x: 3, y: 2 };
  
      this.scale = this.windowHeight === 720 ? HD : FULLHD;
  
      // Adjust positions based on scroll type
      this.image.onload = () => {
        if (this.scrollType === this.ScrollType.Horizontal) {
          this.pos2.x = this.image.width * this.scale.x;
        } else if (this.scrollType === this.ScrollType.Vertical) {
          this.pos2.y = -this.image.height * this.scale.y;
        }
      };
    }
  
    update(deltaTime) {
      const scaledSpeed = this.speed * deltaTime;
  
      if (this.scrollType === this.ScrollType.Horizontal) {
        // Move positions horizontally
        this.pos1.x += scaledSpeed;
        this.pos2.x += scaledSpeed;
  
        // Reset positions when out of bounds
        if (this.pos1.x <= -this.image.width * this.scale.x) {
          this.pos1.x += this.image.width * this.scale.x * 2;
        }
        if (this.pos2.x <= -this.image.width * this.scale.x) {
          this.pos2.x = this.windowWidth;
        }
      } else if (this.scrollType === this.ScrollType.Vertical) {
        // Move positions vertically
        this.pos1.y -= scaledSpeed;
        this.pos2.y -= scaledSpeed;
  
        // Reset positions when out of bounds
        if (this.pos1.y <= -this.image.height * this.scale.y) {
          this.pos1.y -= this.image.height * this.scale.y * 2;
        }
        if (this.pos2.y <= -this.image.height * this.scale.y) {
          this.pos2.y = -this.image.height * this.scale.y;
        }
      }
    }
  
    draw(context) {
      // Draw the two images
      context.drawImage(
        this.image,
        this.pos1.x,
        this.pos1.y,
        this.image.width * this.scale.x,
        this.image.height * this.scale.y
      );
  
      context.drawImage(
        this.image,
        this.pos2.x,
        this.pos2.y,
        this.image.width * this.scale.x,
        this.image.height * this.scale.y
      );
    }
  }