game.Road = me.Sprite.extend({
    init: function () {
        var image = me.loader.getImage("road");

        this._super(me.Sprite, "init", [
            (me.game.viewport.width / 2 - image.width / 2) + 65,
            me.game.viewport.height - image.height / 2,
            { image: image }
        ]);
    }
});