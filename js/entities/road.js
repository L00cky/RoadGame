game.Road = me.Sprite.extend({
    init: function (x, y, settings) {
        this._super(me.Sprite, "init", [x, y, {
            image: settings.image,
            width: settings.image.width,
            height: settings.image.height
        }]);
        
        this.speed = 300;
        this.alwaysUpdate = true;
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);

        if (game.data.gameStarted) {
            this.pos.y += this.speed * time / 1000;
        }

        if (this.pos.y >= me.game.viewport.height) {
            this.pos.y -= 5 * this.image.height;
        }

        return true;
    }
});