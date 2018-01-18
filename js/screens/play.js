game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        // Setting bg color to black
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

        var roadSettings = {
            image: me.loader.getImage("road")
        }

        var grassSettings = {
            image: me.loader.getImage("grass_0")
        }

        var playerSettings = {
            image: me.loader.getImage("car")
        }

        var enemySettings = {
            image: me.loader.getImage("truck_0")
        }

        // Variables for layers
        var bgLayer = 1;
        var roadLayer = 2;
        var entitiesLayer = 10;
        var hudLayer = 100;

        // Calculating middle of the screen
        var middleX = me.game.viewport.width / 2;
        var middleY = me.game.viewport.height / 2;

        var obstacles = [];

        for (var i = 0; i < 4; i++) {
            obstacles.push(me.game.world.addChild(me.pool.pull("enemy", 0, me.game.viewport.height / 2 - 450, enemySettings)));
        }

        // Adding roads
        var roads = [];

        for (var i = -1; i < me.game.viewport.height / roadSettings.image.height + 2; i++) {
            roads.push(me.game.world.addChild(me.pool.pull("road", middleX, i * roadSettings.image.height, roadSettings), bgLayer));
        }

        var grassBG = []

        for (var j = 0; j < me.game.viewport.height / grassSettings.image.height; j++) {
            for (var i = 0; i < me.game.viewport.width / grassSettings.image.width; i++) {
                grassBG.push(me.game.world.addChild(me.pool.pull("grass", i * grassSettings.image.width, j * grassSettings.image.height, grassSettings), bgLayer));
            }
        }

        var player = me.pool.pull("player", (me.game.viewport.width / 2 - playerSettings.image.width / 2), me.game.viewport.height / 2 + 50, playerSettings);
        //var enemy = me.pool.pull("enemy", (me.game.viewport.width / 2 - enemySettings.image.width / 2), me.game.viewport.height / 2 - 50, enemySettings);
        //var enemy2 = me.pool.pull("enemy", (me.game.viewport.width / 2 - enemySettings.image.width / 2), me.game.viewport.height / 2 - 300, enemySettings);

        me.game.world.addChild(player, entitiesLayer);
        //me.game.world.addChild(enemy, entitiesLayer);
        //me.game.world.addChild(enemy2, entitiesLayer);

        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.A, "left", true);
        me.input.bindKey(me.input.KEY.D, "right", true);

        me.input.bindKey(me.input.KEY.SPACE, "start");

        // Camera follows player
        //me.game.viewport.follow(player);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {

        me.input.unbindKey(me.input.KEY.LEFT, "left");
        me.input.unbindKey(me.input.KEY.RIGHT, "right");
        me.input.unbindKey(me.input.KEY.A, "left");
        me.input.unbindKey(me.input.KEY.D, "right");

        me.input.unbindKey(me.input.KEY.SPACE, "start");
    }
});