game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
        var middleX = me.game.viewport.width / 2;
        var middleY = me.game.viewport.height / 2;

        var roads = [
            me.game.world.addChild(me.pool.pull("road", middleX, middleY), 1),
            me.game.world.addChild(me.pool.pull("road", middleX, middleY - 1 * 154), 1),
            me.game.world.addChild(me.pool.pull("road", middleX, middleY - 2 * 154), 1),
            me.game.world.addChild(me.pool.pull("road", middleX, middleY - 3 * 154), 1),
            me.game.world.addChild(me.pool.pull("road", middleX, middleY - 4 * 154), 1)
        ];

        var player = me.pool.pull("player");

        me.game.world.addChild(player, 10);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");

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