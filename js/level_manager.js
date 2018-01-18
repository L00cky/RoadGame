game.LevelManager = me.Container.extend({
    init: function () {

        this.enemySettings = {
            image: me.loader.getImage("truck_0")
        }

        this.roadSettings = {
            image: me.loader.getImage("road")
        }

        this.grassSettings = {
            image: me.loader.getImage("grass_0")
        }

        this.playerSettings = {
            image: me.loader.getImage("car")
        }

        this.player = me.pool.pull("player", (me.game.viewport.width / 2 - this.playerSettings.image.width / 2), me.game.viewport.height / 2 + 50, this.playerSettings);

        var offset = 50;
        var minY = 350;
        var maxY = 2000;
        var randY = me.game.viewport.height / 2 - (this.getRandomInt(minY, maxY));
        var middlePosition = (me.game.viewport.width / 2 - this.enemySettings.image.width / 2);

        var obstacleCollisionType = me.collision.types.ENEMY_OBJECT;
        var obstacleCarsYVelocity = 200;

        var canMove = false;
        var leftLane = middlePosition - offset;
        var rightLane = middlePosition + offset;
        this.middleLane = middlePosition;
        var currentLane = Math.floor(Math.random() * 3);
        
        var alwaysUpdate = true;
        var speed = 200;

        // Calculating middle of the screen
        this.middleX = me.game.viewport.width / 2;
        this.middleY = me.game.viewport.height / 2;

        // Variables for layers
        this.bgLayer = 1;
        this.roadLayer = 2;
        this.entitiesLayer = 10;
        this.hudLayer = 100;

        this.obstacles = [];
        this.roads = [];
        this.grassBG = []

        this._super(me.Container, "init", [0, 0]);
        this.name = "levelManager";
        this.data = {
            level1: {
                "enemies": {

                },
            },
        }
    },


    createLevel: function (maxCars) {
        me.game.world.addChild(this.player, this.entitiesLayer);     

        for (var i = game.data.currentObstacles; i < maxCars; i++) {
            this.spawnObstacleCar();
        }

        // Adding roads
        for (var i = -1; i < me.game.viewport.height / this.roadSettings.image.height + 2; i++) {
            this.roads.push(me.game.world.addChild(me.pool.pull("road", this.middleX, i * this.roadSettings.image.height, this.roadSettings), this.roadLayer));
        }

        for (var j = 0; j < me.game.viewport.height / this.grassSettings.image.height; j++) {
            for (var i = 0; i < me.game.viewport.width / this.grassSettings.image.width; i++) {
                this.grassBG.push(me.game.world.addChild(me.pool.pull("grass", i * this.grassSettings.image.width, j * this.grassSettings.image.height, this.grassSettings), this.bgLayer));
            }
        }

        this.updateChildBounds();
    },

    update: function (dt) {
        this._super(me.Container, "update", [dt]);
        if (game.data.currentObstacles < game.data.maxObstacles) {
            this.spawnObstacleCar();
        }
        this.updateChildBounds();
        return true;
    },
    getRandomInt: function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
    spawnObstacleCar: function () {
        this.obstacles.push(me.game.world.addChild(me.pool.pull("enemy", 0, this.player.pos.y - 450, this.enemySettings), this.entitiesLayer));
        console.log('players y', this.player.pos.y);
        game.data.currentObstacles++;
    }
});