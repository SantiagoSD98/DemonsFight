const BootState = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },
    preload: function () {

    },
    create: function () {
        this.state.start('PreloadState');
    }


}