// Game Manager (handles game switching)
const gameManager = {
    loadGame: function(game) {
        // First, clear the canvas
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Stop any previous game if necessary
        if (this.currentGame) {
            this.currentGame.stop();
        }

        // Load the selected minigame module
        switch(game) {
            case 'game1':
                this.currentGame = new Game1(ctx);
                break;
            case 'game2':
                this.currentGame = new Game2(ctx);
                break;
            case 'game3':
                this.currentGame = new Game3(ctx);
                break;
        }

        // Initialize the game
        this.currentGame.start();
    }
};
