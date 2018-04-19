game.Player = me.Entity.extend({
    init: function (x, y, settings) {
        var offset = 50;
        var middlePosition = (me.game.viewport.width / 2 - settings.image.width / 4);
        this._super(me.Entity, "init", [
            x,
            y,
            {
                image: settings.image,
                width: settings.image.width / 2,
                height: settings.image.height
            }
        ]);
        this.name = 'player';
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT | me.collision.types.WORLD_SHAPE);
        this.body.gravity = 0;
        this.body.setVelocity(0, 0);

        this.renderable.addAnimation('alive', [0]);
        this.renderable.addAnimation('crashed', [1]);
        this.renderable.setCurrentAnimation('alive');

        this.health = game.data.life;

        this.leftLane = middlePosition - offset;
        this.rightLane = middlePosition + offset;
        this.middleLane = x;
        this.currentLane = 1;

        this.minLane = 0;
        this.maxLane = 2;

        this.settings = settings;
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);

        if (me.input.isKeyPressed("start")) {
            if (!game.data.gameStarted) {
                game.data.gameStarted = true;
            }
        }

        if (game.data.gameStarted) {
            if (me.input.isKeyPressed("left") && this.currentLane > this.minLane) {
                this.currentLane -= 1;
            }

            if (me.input.isKeyPressed("right") && this.currentLane < this.maxLane) {
                this.currentLane += 1;
            }
        }

        if (game.data.life <= 0) {
            this.renderable.setCurrentAnimation('crashed');
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
        if (other.body.collisionType === me.collision.types.ENEMY_OBJECT || other.body.collisionType === me.collision.types.WORLD_SHAPE) {
            var container = this.ancestor;
            var body = this.body;

            body.setCollisionMask();
            container.removeChildNow(other);

            var index = container.obstacles.indexOf(other);            
            game.data.currentObstacles--;
            
            this.renderable.flicker(2000, function () {
                body.setCollisionMask(me.collision.types.ENEMY_OBJECT | me.collision.types.WORLD_SHAPE);
            }.bind(this));
            game.data.life--;
            return false;
        }
    }
});