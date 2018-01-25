game.Enemy = me.Entity.extend({
    init: function (x, y, settings) {
        var images = ["truck_0", "truck_1"]
        var randomImage = me.loader.getImage(images[this.getRandomInt(0, images.length)]);

        var offset = 50;
        var minY = 350;
        var maxY = 1000;
        var randY = y - (this.getRandomInt(minY, maxY));
        var middlePosition = (me.game.viewport.width / 2 - settings.image.width / 2);
        this._super(me.Entity, "init", [
            x,
            randY,
            {
                image: randomImage,
                width: randomImage.width,
                height: randomImage.height
            }
        ]);

        this.name = 'obstacle_car';

        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.body.gravity = 0;
        this.body.setVelocity(0, 0);

        this.leftLane = middlePosition - offset;
        this.rightLane = middlePosition + offset;
        this.middleLane = middlePosition;
        this.currentLane = Math.floor(Math.random() * 3);
        this.alwaysUpdate = true;
        this.speed = 200;
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);

        if (game.data.gameStarted) {
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

        if (this.pos.y > me.game.viewport.height) {
            var container = this.ancestor;
            var body = this.body;

            container.removeChildNow(this);
            var index = container.obstacles.indexOf(this);
            game.data.currentObstacles--;

            return false;
        }

        me.collision.check(this);
        return true;
    },
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
});