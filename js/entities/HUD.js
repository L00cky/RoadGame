game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        this._super(me.Container, 'init');
        this.isPersistent = true;
        this.floating = true;
        this.name = "HUD";

        this.addChild(new game.HUD.StartingText(-100, -200));
        this.addChild(new game.HUD.GameOverText(-200, -200));
        this.healthArray = [];
        this.hp = game.data.life;
        for (var i = 0; i < this.hp; i++) {
            this.healthArray.push(this.addChild(new game.HUD.Health(i * 25, 10)));
        }
    }
});

game.HUD.Health = me.Sprite.extend({
    init: function (x, y) {
        var image = me.loader.getImage("health");
        this._super(me.Sprite, 'init', [x, y, {
            image: image
        }]);

        this.anchorPoint = new me.Vector2d(0, 0);
    },
    update: function () {
        if (this.hp != game.data.life) {
            this.hp = game.data.life;
        }
    }
})

game.HUD.StartingText = me.Renderable.extend({
    init: function(x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.startingText = 'Press SPACE to play';

        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        this.font.textAlign = "right";
        this.font.textBaseline = "bottom";

        this.gameStarted = false;
    },
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
    draw : function (renderer) {
        this.font.draw(renderer, this.startingText, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
    }

});

game.HUD.GameOverText = me.Renderable.extend({
    init: function (x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.startingText = 'GAME OVER';

        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        this.font.textAlign = "right";
        this.font.textBaseline = "bottom";

        this.gameOver = false;
    },
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
    draw: function (renderer) {
        this.font.draw(renderer, this.startingText, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
    }
});
