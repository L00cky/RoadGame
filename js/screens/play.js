game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
        var roads = [
            me.game.world.addChild(me.pool.pull("road", 0), 1),
            me.game.world.addChild(me.pool.pull("road", 1), 1),
            me.game.world.addChild(me.pool.pull("road", 2), 1),
            me.game.world.addChild(me.pool.pull("road", 3), 1)
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