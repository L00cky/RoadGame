game.Grass = me.Sprite.extend({
    init: function (x, y, settings) {
        this._super(me.Sprite, "init", [x, y,
            {
                image: settings.image
            }]);

        this.canMove = false;
        this.speed = 300;
        this.alwaysUpdate = true;
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);

        if (me.input.isKeyPressed("start")) {
            if (!this.canMove) {
                this.canMove = true;
            }
        }

        if (this.canMove) {
            this.pos.y += this.speed * time / 1000;
        }

        if (this.pos.y >= me.game.viewport.height) {
            this.pos.y -= 4 * 154;
        }

        return true;
    }
});