game.Player = me.Sprite.extend({
    init: function () {
        var image = me.loader.getImage("player");

        var middlePosition = me.game.viewport.width / 2 - image.width / 2;
        var offset = 50;

        var shouldMove = false;

        this._super(me.Sprite, "init", [
            middlePosition,
            me.game.viewport.height / 2 - image.height - 20,
            { image: image }
        ]);
        this.velx = 450;
        this.speed = 300;
        this.minX = middlePosition - offset;
        this.maxX = middlePosition + offset;
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);

        if (me.input.isKeyPressed("start")) {
            if (!this.shouldMove) {
                this.shouldMove = true;
        }

        if (this.shouldMove) {
            this.pos.y -= this.speed * time / 1000;
        }

        if (me.input.isKeyPressed("left")) {
            this.pos.x -= this.velx * time / 1000;
        }

        if (me.input.isKeyPressed("right")) {
            this.pos.x += this.velx * time / 1000;
        }

        this.pos.x = this.pos.x.clamp(this.minX, this.maxX);

        return true;
    }
});