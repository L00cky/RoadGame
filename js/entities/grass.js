game.Grass = me.Sprite.extend({
    init: function (x, y, settings) {
        var images = ["grass_0", "grass_1", "grass_2", "grass_3"] //, "grass_4", "grass_5", "grass_6", "grass_7"
        var randomImage = me.loader.getImage(images[this.getRandomInt(0, images.length)]);

        this._super(me.Sprite, "init", [x, y,
            {
                image: randomImage
            }]);
        this.name = "grass";
        this.alwaysUpdate = true;
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);

        if (game.data.gameStarted) {
            this.pos.y += game.data.scrollingSpeed * time / 1000;
        }

        if (this.pos.y >= me.game.viewport.height) {
            this.pos.y -= 4 * 154;
        }

        return true;
    },
    getRandomInt: function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
});