game.Grass = me.Sprite.extend({
    init: function (x, y, settings) {
        var newX = x - settings.image.width / 2;
        var images = [];
        if (newX === 404.5 || newX === 560.5 || newX === 79.5) {
            images = ["grass_0", "grass_1"]
            //if (newX === 560.5) {
            //    images.push("grass_6", "grass_7");
            //}
        }

        if (newX === 482.5 || newX === 157.5 || newX === 1.5) {
            images = ["grass_2", "grass_3"]
            //if (newX === 1.5) {
            //    images.push("grass_4", "grass_5");
            //}
        }

        var randomImage = me.loader.getImage(images[this.getRandomInt(0, images.length)]);

        this._super(me.Sprite, "init", [newX, y,
            {
                image: randomImage
            }]);

        this.anchorPoint = new me.Vector2d(0, 0);
        this.name = "grass";
        this.alwaysUpdate = true;
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);

        if (game.data.gameStarted) {
            this.pos.y += game.data.scrollingSpeed * time / 1000;
        }

        if (this.pos.y >= me.game.viewport.height) {
            this.pos.y -= 5 * 154;
        }

        return true;
    },
    getRandomInt: function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
});