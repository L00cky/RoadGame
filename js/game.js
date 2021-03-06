
/* Game namespace */
var game = {

    data: {
        score: 0,
        life: 3,
        maxObstacles: 3,
        currentObstacles: 0,
        gameStarted: false,
        gameOver: false,
        scrollingSpeed: 300
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

        // Set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded": function () {

        // Set the play state
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // Add entities to the pool
        me.pool.register("player", game.Player);
        me.pool.register("road", game.Road);
        me.pool.register("grass", game.Grass);
        me.pool.register("enemy", game.Enemy);
        me.pool.register("obstacle", game.Obstacle);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};