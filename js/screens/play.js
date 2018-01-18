game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        // Setting bg color to black
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

        game.levelManager = new game.LevelManager();
        game.levelManager.createLevel(game.data.maxObstacles);
        me.game.world.addChild(game.levelManager);

        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.A, "left", true);
        me.input.bindKey(me.input.KEY.D, "right", true);

        me.input.bindKey(me.input.KEY.SPACE, "start");
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