game.Road = me.Sprite.extend({
    init: function (x) {
        var image = me.loader.getImage("road");

        this._super(me.Sprite, "init", [
            (me.game.viewport.width / 2 - image.width / 2) + 65,
            (me.game.viewport.height - image.height / 2) - x * image.height,
            { image: image }
        ]);

        this.canMove = false;
        this.speed = 300;
        //this.height = image.height;
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

        //if (this.pos.y >= -100) {
        //    this.pos.y += 300;
        //    this.pos.x += 50;
        //    console.log('moving up', this.pos.x);
        //}

        return true;
    }
});