let soundtrack, start;
const HomeState = {
    init: function (startMessage) {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        this.message = startMessage;
    },
    create: function () {
        //AUDIO
        soundtrack = this.game.add.audio('Soundtrack');
        start = this.game.add.audio('StartSound');

        const background = this.game.add.sprite(this.game.world.centerX, 0, 'preloadBackground');
        background.anchor.setTo(0.5, 0.5);
        background.inputEnabled = true;

        background.events.onInputDown.add(function () {
            start.play();
            soundtrack.play();
            this.state.start('GameState');
        }, this);

        const text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'TOUCH TO START');
        text.anchor.setTo(0.5);
        text.fontSize = 60;
        text.fill = '#9e0707';
        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        text.backgroundColor = '#fff';
    }
}