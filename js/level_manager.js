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

        this.obstacleSettings = {
            image: me.loader.getImage("obstacle_0")
        }

        // Calculating middle of the screen
        this.middleX = me.game.viewport.width / 2;
        this.middleY = me.game.viewport.height / 2;

        this.player = me.pool.pull("player", (me.game.viewport.width / 2 - this.playerSettings.image.width / 2), me.game.viewport.height / 2 + 50, this.playerSettings);

        var offset = 50;
        var minY = 350;
        var maxY = 400;
        var randY = me.game.viewport.height / 2 - (this.getRandomInt(minY, maxY));
        this.middleLane = (me.game.viewport.width / 2 - this.playerSettings.image.width / 2);
        this.leftLane = this.middleLane - offset;
        this.rightLane = this.middleLane + offset;

        this.roadGrassOffset = this.roadSettings.image.width / 2 + this.grassSettings.image.width / 2;

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
            level1: {},
        }

        this.autoSort = true;
        this.sort(true);
    },

    createLevel: function () {
        this.addChild(this.player, this.entitiesLayer);

        for (var i = game.data.currentObstacles; i < game.data.maxObstacles; i++) {
            this.spawnObstacleCar();
        }

        // Adding roads
        for (var i = -1; i < me.game.viewport.height / this.roadSettings.image.height + 2; i++) {
            this.roads.push(this.addChild(me.pool.pull("road", this.middleX, i * this.roadSettings.image.height, this.roadSettings), this.roadLayer));
        }

        this.startingObstacles = game.data.maxObstacles;

        // Adding grass
        this.fillGrass(3);

        this.updateChildBounds();
    },

    update: function (dt) {
        this._super(me.Container, "update", [dt]);
        if (game.data.currentObstacles < game.data.maxObstacles) {
            this.spawnObstacleCar();
        }

        if (game.data.gameStarted) {
            game.data.score += 1 * (dt / 1000);
            var difficultyModifier = this.startingObstacles + Math.floor(game.data.score / 20);
            if (difficultyModifier > 0) {
                game.data.maxObstacles = difficultyModifier;
            }
        }

        if (game.data.life == 0) {
            game.data.gameOver = true;
            game.data.gameStarted = false;
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
        this.obstacles.push(this.addChild(me.pool.pull("enemy", 0, this.player.pos.y, this.enemySettings), this.entitiesLayer));
        this.obstacles.push(this.addChild(me.pool.pull("obstacle", 0, this.player.pos.y, this.obstacleSettings), this.entitiesLayer));
        game.data.currentObstacles += 2;
    },
    fillGrass: function (grassColumns) {
        //Right side of the road
        for (var j = 0; j < me.game.viewport.height / this.grassSettings.image.height; j++) {
            for (var i = 0; i < grassColumns; i++) {
                this.grassBG.push(this.addChild(me.pool.pull("grass", (this.middleX + this.roadGrassOffset) + i * this.grassSettings.image.width, j * this.grassSettings.image.height, this.grassSettings), this.bgLayer));
            }
        }

        // Left side of the road
        for (var j = 0; j < me.game.viewport.height / this.grassSettings.image.height; j++) {
            for (var i = 0; i < grassColumns; i++) {
                this.grassBG.push(this.addChild(me.pool.pull("grass", (this.middleX - this.roadGrassOffset) - i * this.grassSettings.image.width, j * this.grassSettings.image.height, this.grassSettings), this.bgLayer));
            }
        }
    }
});