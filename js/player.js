﻿game.Player = me.Sprite.extend({
    init: function () {
        var image = me.loader.getImage("car");

        var middlePosition = me.game.viewport.width / 2 - image.width / 2;
        var offset = 50;

        this._super(me.Sprite, "init", [
            middlePosition,
            me.game.viewport.height / 2 - image.height - 20,
            { image: image }
        ]);
        this.velx = 450;
        this.minX = middlePosition - offset;
        this.maxX = middlePosition + offset;
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);

        if (me.input.isKeyPressed("left")) {
            this.pos.x -= this.velx * time / 1000;
            this.currentTransform.rotate(-0.030);
        }

        if (me.input.isKeyPressed("right")) {
            this.pos.x += this.velx * time / 1000;
            this.currentTransform.rotate(0.030);
        }

        this.pos.x = this.pos.x.clamp(this.minX, this.maxX);

        return true;
    }
});