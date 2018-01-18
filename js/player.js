game.Player = me.Entity.extend({
    init: function (x, y, settings) {
        var offset = 50;
        var middlePosition = (me.game.viewport.width / 2 - settings.image.width / 2);
        this._super(me.Entity, "init", [
            x,
            y,
            {
                image: settings.image,
                width: settings.image.width,
                height: settings.image.height
            }
        ]);

        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);

        this.leftLane = middlePosition - offset;
        this.rightLane = middlePosition + offset;
        this.middleLane = x;
        this.currentLane = 1;
        this.canMove = false;

        this.minLane = 0;
        this.maxLane = 2;
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);

        if (me.input.isKeyPressed("start")) {
            if (!this.canMove) {
                this.canMove = true;
            }
        }

        if (this.canMove) {
            if (me.input.isKeyPressed("left") && this.currentLane > this.minLane) {
                this.currentLane -= 1;
            }

            if (me.input.isKeyPressed("right") && this.currentLane < this.maxLane) {
                this.currentLane += 1;
            }
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

        this.pos.x = this.pos.x.clamp(this.leftPosition, this.rightPosition);
        
        me.collision.check(this);
        

        return true;
    },
    onCollision: function (res, other) {
        if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            console.log('collided');
            var body = this.body;
            body.setCollisionMask();
            me.game.world.removeChild(other);
            game.data.currentObstacles--;
            this.renderable.flicker(2000, function () {
                body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
            }.bind(this));
            game.data.life--;
            console.log(game.data.life);
            return false;
        }
    }
});