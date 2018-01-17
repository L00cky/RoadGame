game.ObstacleManager = me.Container.extend({
    init: function () {
        this._super(me.Container, "init", [0, 0]);
    },
    createObstacle: function (x, y, settings) {
        for (var i = 0; i < game.data.maxObstacles; i++) {
            this.addChild(me.pool.pull("enemy", x, y, settings));
        }
        this.updateChildBounds();
    }
});