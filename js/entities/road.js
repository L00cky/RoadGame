game.Road = me.Sprite.extend({
    init: function (x, y, settings) {
        var newX = x - settings.image.width / 2;
        this._super(me.Sprite, "init", [newX, y, {
            image: settings.image,
            width: settings.image.width,
            height: settings.image.height
        }]);

        this.anchorPoint = new me.Vector2d(0, 0);
        this.name = "road";
        this.alwaysUpdate = true;
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);

        if (game.data.gameStarted) {
            this.pos.y += game.data.scrollingSpeed * time / 1000;
        }

        if (this.pos.y >= me.game.viewport.height) {
            this.pos.y -= 5 * this.image.height;
        }

        return true;
    }
});