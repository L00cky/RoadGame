game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        // Setting bg color to black
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

        // Calculating middle of the screen
        var middleX = me.game.viewport.width / 2;
        var middleY = me.game.viewport.height / 2;

        // Adding roads
        var roads = [
            me.game.world.addChild(me.pool.pull("road", middleX, middleY), 1),
            me.game.world.addChild(me.pool.pull("road", middleX, middleY - 1 * 154), 1),
            me.game.world.addChild(me.pool.pull("road", middleX, middleY - 2 * 154), 1),
            me.game.world.addChild(me.pool.pull("road", middleX, middleY - 3 * 154), 1),
            me.game.world.addChild(me.pool.pull("road", middleX, middleY - 4 * 154), 1)
        ];

        // Calculating position of grass
        var leftGrassBlockX = (((middleX - 169) + 82 / 2) - 0 * 82) + 5;
        var rightGrassBlockX = (middleX + 169 - 82 / 2) - 5;

        var grassBlockY = middleY - 154 / 2;

        var grassSettings = {
            image: me.loader.getImage("grass_0")
        }

        var grassBG = [
            me.game.world.addChild(me.pool.pull("grass", leftGrassBlockX, grassBlockY, grassSettings), 1),
            me.game.world.addChild(me.pool.pull("grass", leftGrassBlockX - grassSettings.image.width, grassBlockY, grassSettings), 1),
            me.game.world.addChild(me.pool.pull("grass", leftGrassBlockX - 2 * grassSettings.image.width, grassBlockY, grassSettings), 1),

            me.game.world.addChild(me.pool.pull("grass", rightGrassBlockX, grassBlockY, grassSettings), 1),
            me.game.world.addChild(me.pool.pull("grass", rightGrassBlockX + grassSettings.image.width, grassBlockY, grassSettings), 1),
            me.game.world.addChild(me.pool.pull("grass", rightGrassBlockX + 2 * grassSettings.image.width, grassBlockY, grassSettings), 1),

            me.game.world.addChild(me.pool.pull("grass", leftGrassBlockX, grassBlockY - grassSettings.image.height, grassSettings), 1),
            me.game.world.addChild(me.pool.pull("grass", leftGrassBlockX - grassSettings.image.width, grassBlockY - grassSettings.image.height, grassSettings), 1),
            me.game.world.addChild(me.pool.pull("grass", leftGrassBlockX - 2 * grassSettings.image.width, grassBlockY - grassSettings.image.height, grassSettings), 1),

            me.game.world.addChild(me.pool.pull("grass", rightGrassBlockX, grassBlockY - grassSettings.image.height, grassSettings), 1),
            me.game.world.addChild(me.pool.pull("grass", rightGrassBlockX + grassSettings.image.width, grassBlockY - grassSettings.image.height, grassSettings), 1),
            me.game.world.addChild(me.pool.pull("grass", rightGrassBlockX + 2 * grassSettings.image.width, grassBlockY - grassSettings.image.height, grassSettings), 1),
        ]

        var player = me.pool.pull("player");

        me.game.world.addChild(player, 10);

        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.A, "left", true);
        me.input.bindKey(me.input.KEY.D, "right", true);

        me.input.bindKey(me.input.KEY.SPACE, "start");

        // Camera follows player
        me.game.viewport.follow(player);
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