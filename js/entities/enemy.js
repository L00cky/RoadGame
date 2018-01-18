game.Enemy = me.Entity.extend({
    init: function (x, y, settings) {
        var offset = 50;
        var minY = 350;
        var maxY = 2000;
        var randY = me.game.viewport.height / 2 - (this.getRandomInt(minY, maxY));
        var middlePosition = (me.game.viewport.width / 2 - settings.image.width / 2);
        this._super(me.Entity, "init", [
            x,
            randY,
            {
                image: settings.image,
                width: settings.image.width,
                height: settings.image.height
            }
        ]);

        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.body.setVelocity(0, 200);

        this.canMove = false;
        this.leftLane = middlePosition - offset;
        this.rightLane = middlePosition + offset;
        this.middleLane = middlePosition;
        this.currentLane = Math.floor(Math.random() * 3);
        console.log(this.currentLane, randY);
        this.alwaysUpdate = true;
        this.speed = 200;
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);

        if (me.input.isKeyPressed("start")) {
            if (!this.canMove) {
                this.canMove = true;
            }
        }

        if (this.canMove) {
            this.pos.y += this.speed * time / 1000;
        }

        switch (this.currentLane) {
            case 0:
                this.pos.x = this.leftLane;
                break;
            case 1:
                this.pos.x = this.middleLane;
                break;
            case 2:
                this.pos.x = this.rightLane;
                break;
        }

        return true;
    },
    getRandomInt: function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
});