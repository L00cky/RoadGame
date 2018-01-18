﻿game.LevelManager = me.Container.extend({
    init: function () {
        this._super(me.Container, "init", [0, 0]);
        this.name = "levelManager";
        this.data = {
            level1: {
                "road": [
                    // y, y-max, x, x-max, color
                    [25, 100, 0, 480, "#efa615", "red"],
                    [100, 120, 0, 50, "#efa615", "red"],
                    [100, 120, 135, 480, "#efa615", "red"],
                    [130, 240, 0, 480, "#efa615", "red"],
                    [250, 340, 0, 480, "#af6a15", "yellow"],
                    [340, 365, 0, 300, "#af6a15", "yellow"],
                    [340, 365, 390, 480, "#af6a15", "yellow"],
                    [370, 480, 0, 480, "#af6a15", "yellow"]
                ]
            },
        }
    },


    //createLevel: function (levelName) {
    //    let _this = this;
    //    this.data.level[levelName].forEach(function (item) {
    //        for (var i = item[0]; i < item[1]; i += 15) {
    //            for (var j = item[2]; j < item[3]; j += 15) {

    //                _this.addChild(me.pool.pull("ground", j, i, item[4], item[5]), 1);
    //            }

    //        }
    //    });

    //    this.updateChildBounds();
    //},

    update: function (dt) {
        this._super(me.Container, "update", [dt]);
        this.updateChildBounds();
        return true;
    }
});