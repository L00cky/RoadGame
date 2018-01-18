
/* Game namespace */
var game = {

    data: {
        score: 0,
        life: 3,
        maxObstacles: 3,
        currentObstacles: 0
    },

    // Run on page load.
    "onload": function () {
        // Initialize the video.
        if (!me.video.init(640, 480, { wrapper: "screen", scale: "auto" })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded": function () {
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("player", game.Player);
        me.pool.register("road", game.Road);
        me.pool.register("grass", game.Grass);
        me.pool.register("enemy", game.Enemy);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
