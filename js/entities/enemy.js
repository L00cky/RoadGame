game.Enemy = me.Entity.extend({
    init: function (x, y, settings) {
        var images = ["truck_0", "truck_1"]
        var randomImage = images[this.getRandomInt(0, images.length)];

        var offset = 50;
        var minY = 350;
        var maxY = 400;
        var randY = y - (this.getRandomInt(minY, maxY));
        var middlePosition = (me.game.viewport.width / 2 - settings.image.width / 2);
        this._super(me.Entity, "init", [
            x,
            randY,
            {
                image: randomImage,
                width: settings.image.width,
                height: settings.image.height
            }
        ]);

        this.name = 'obstacle_car';

        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        //this.body.setVelocity(0, 200);
        this.body.gravity = 0;

        this.leftLane = middlePosition - offset;
        this.rightLane = middlePosition + offset;
        this.middleLane = middlePosition;
        this.currentLane = Math.floor(Math.random() * 3);
        console.log('Spawning obstacle car', this.currentLane, randY);
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

        if (!this.inViewport) {
            //game.data.currentObstacles--;
            this.alive = false;
        }

        this.body.update(time);
        return true;
    },
    getRandomInt: function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
});