/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        this.addChild(new game.HUD.StartingText(-100, -200));
        this.addChild(new game.HUD.GameOverText(-200, -200));
    }
});


/**
 * a basic HUD item to display score
 */
game.HUD.StartingText = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.startingText = 'Press SPACE to play';

        // create the font object
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        // font alignment to right, bottom
        this.font.textAlign = "right";
        this.font.textBaseline = "bottom";

        // local copy of the global score
        this.gameStarted = false;
    },

    /**
     * update function
     */
    update: function () {
        if (this.gameStarted !== game.data.gameStarted) {
            this.gameStarted = game.data.gameStarted;
            return true;
        }

        if (this.gameStarted) {
            this.alpha = 0;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        // draw it baby !
        // this.pos.x, this.pos.y are the relative position from the screen right bottom
        this.font.draw(renderer, this.startingText, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
    }

});

game.HUD.GameOverText = me.Renderable.extend({
    /**
     * constructor
     */
    init: function (x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.startingText = 'GAME OVER';

        // create the font object
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        // font alignment to right, bottom
        this.font.textAlign = "right";
        this.font.textBaseline = "bottom";

        // local copy of the global score
        this.gameOver = false;
    },

    /**
     * update function
     */
    update: function () {
        if (this.gameOver !== game.data.gameOver) {
            this.gameOver = game.data.gameOver;
            return true;
        }

        if (!this.gameOver) {
            this.alpha = 0;
        } else {
            this.alpha = 1;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw: function (renderer) {
        // draw it baby !
        // this.pos.x, this.pos.y are the relative position from the screen right bottom
        this.font.draw(renderer, this.startingText, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
    }

});
