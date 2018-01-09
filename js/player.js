game.Player = me.Sprite.extend({
    init: function () {
        var image = me.loader.getImage("car");

        var middlePosition = (me.game.viewport.width / 2 - image.width / 2) + 18;
        var offset = 50;


        this._super(me.Sprite, "init", [
            middlePosition,
            me.game.viewport.height / 2 - image.height - 20,
            { image: image }
        ]);
        this.velx = 500;
        this.leftPosition = middlePosition - offset;
        this.elapsed = 1.5;
        this.rightPosition = middlePosition + offset;
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);
        var oldX = this.pos.x;

        if (me.input.isKeyPressed("left")) {
            var distance = Math.sqrt(Math.pow(this.leftPosition - oldX, 2));
            var directionX = (this.leftPosition - oldX) / distance;
            var moving = true;

            if (moving == true) {
                this.pos.x += (directionX * this.velx) / this.elapsed;
                if (Math.sqrt(Math.pow(this.pos.x - oldX, 2)) >= distance) {
                    this.pos.x = this.leftPosition + 1;
                    moving = false;
                }
            }
        }

        if (me.input.isKeyPressed("right")) {
            var distance = Math.sqrt(Math.pow(this.rightPosition - oldX, 2));
            var directionX = (this.rightPosition - oldX) / distance;
            var moving = true;

            if (moving == true) {
                this.pos.x += (directionX * this.velx) / this.elapsed;
                if (Math.sqrt(Math.pow(this.pos.x - oldX, 2)) >= distance) {
                    this.pos.x = this.rightPosition + 1;
                    moving = false;
                }
            }
        }

        this.pos.x = this.pos.x.clamp(this.leftPosition, this.rightPosition);

        return true;
    }
});