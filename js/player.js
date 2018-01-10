game.Player = me.Entity.extend({
    init: function () {
        var image = me.loader.getImage("car");
        var middlePosition = (me.game.viewport.width / 2 - image.width / 2) + 18;
        var offset = 50;

        this._super(me.Entity, "init", [
            middlePosition,
            me.game.viewport.height / 2 - image.height - 20,
            { image: image, width: image.width, height: image.height }
        ]);

        this.leftLane = middlePosition - offset;
        this.rightLane = middlePosition + offset;
        this.middleLane = middlePosition;
        this.currentLane = 0;
    },
    update: function (time) {
        this._super(me.Sprite, "update", [time]);

        if (me.input.isKeyPressed("left")) {
            this.currentLane -= 1;
            console.log('current lane', this.currentLane);
        }

        if (me.input.isKeyPressed("right")) {
            this.currentLane += 1;
            console.log('current lane', this.currentLane);
        }

        switch (this.currentLane) {
            case -1:
                this.pos.x = this.leftLane;
                break;
            case 0:
                this.pos.x = this.middleLane;
                break;
            case 1:
                this.pos.x = this.rightLane;
                break;
        }

        this.pos.x = this.pos.x.clamp(this.leftPosition, this.rightPosition);

        return true;
    }
});