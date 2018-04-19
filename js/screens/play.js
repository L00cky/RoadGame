// Main play screen
game.PlayScreen = me.ScreenObject.extend({
    onResetEvent: function () {
        // Setting bg color to black
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

        // Create LevelManager
        game.levelManager = new game.LevelManager();
        // Create level
        game.levelManager.createLevel();
        // Add level manager to the world
        me.game.world.addChild(game.levelManager);

        // Add HUD to the game world
        this.HUD = new game.HUD.Container();
        // Add HUD to screen
        me.game.world.addChild(this.HUD);

        if (me.device.isMobile) {
            if (me.device.android) {
                console.log("Device type is: Android");
            } else if (me.device.iOS) {
                console.log("Device type is: iOS");
            }
        } else {
            console.log("Device type is: PC");
        }

        // Bind keys
        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.A, "left", true);
        me.input.bindKey(me.input.KEY.D, "right", true)

        me.input.bindKey(me.input.KEY.SPACE, "start");
        me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
            me.event.publish("pointerdown", [event]);
            console.log("pointerdown registered");
            game.data.gameStarted = true;
        });
    },

    // On leaving screen
    onDestroyEvent: function () {
        // Unbind keys on destroy
        me.input.unbindKey(me.input.KEY.LEFT, "left");
        me.input.unbindKey(me.input.KEY.RIGHT, "right");
        me.input.unbindKey(me.input.KEY.A, "left");
        me.input.unbindKey(me.input.KEY.D, "right");

        me.input.unbindKey(me.input.KEY.SPACE, "start");

        // Remove HUD on destroy
        me.game.world.removeChild(this.HUD);
    }
});