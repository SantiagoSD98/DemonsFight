let firstplayer = '', secondplayer = '', biteAudio, swordsAudio, punchAudio, playerSelect;
const styleGS = {
    fill: '#fff',
    align: 'center',
    stroke: '#000000',
    strokeThickness: 2
}
const GameState = {
    create: function () {

        //BACKGROUND
        const background = this.game.add.sprite(this.game.world.centerX, 0, 'preloadBackground');
        background.anchor.setTo(0.5, 0.5);

        //AUDIOS
        biteAudio = this.game.add.audio('Bite');
        swordsAudio = this.game.add.audio('Swords');
        punchAudio = this.game.add.audio('Punch');
        playerSelect = this.game.add.audio('Select');

        //TITLE
        title = this.game.add.text(this.game.world.centerX, 75, 'FIRST PLAYER SELECT YOUR CHARACTER', styleGS);
        title.anchor.setTo(0.5);
        title.setShadow(5, 5, 'rgba(0,0,0,0.7)', 5);

        //FLYING EYE
        this.flyingeye = this.game.add.sprite(this.game.world.centerX - 250, this.game.world.centerY, 'FEFlight');
        this.flyingeye.anchor.setTo(0.5);
        this.flyingeye.inputEnabled = true;
        this.flyingeye.input.useHandCursor = true;
        this.flyingeye.customParams = {
            name: 'FEFlight',
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 0],
            nameWalk: 'FEFlight',
            walking: [0, 1, 2, 3, 4, 5, 6, 7, 0],
            framesPS: 24,
            nameAttack: 'FEAttack',
            attacking: [0, 1, 2, 3, 4, 5, 6, 7, 0],
            health: 100,
            damage: 25,
            movingLeft: false,
            movingRight: false,
            attack: false,
            roundsWin: 0,
            audio: biteAudio
        }
        this.flyingeye.events.onInputDown.add(this.pickCharacter, this);
        this.flyingeye.animations.add('idleFE', [0, 1, 2, 3, 4, 5, 6, 7, 0], 24, true);
        this.flyingeye.animations.play('idleFE');

        //GOBLIN
        this.goblin = this.game.add.sprite(this.game.world.centerX - 75, this.game.world.centerY, 'GIdle');
        this.goblin.anchor.setTo(0.5);
        this.goblin.inputEnabled = true;
        this.goblin.input.useHandCursor = true;
        this.goblin.customParams = {
            name: 'GIdle',
            frames: [0, 1, 2, 3],
            nameWalk: 'GRun',
            walking: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            framesPS: 12,
            nameAttack: 'GAttack',
            attacking: [0, 1, 2, 3, 4 , 5, 6, 7, 8],
            health: 100,
            damage: 25,
            movingLeft: false,
            movingRight: false,
            attack: false,
            roundsWin: 0,
            audio: swordsAudio
        }
        this.goblin.events.onInputDown.add(this.pickCharacter, this);
        this.goblin.animations.add('idleG', [0, 1, 2, 3], 12, true);
        this.goblin.animations.play('idleG');

        /*GOBLIN ANIMATIONS
        this.goblin.animations.add('walkingG', [0, 1, 2, 3, 4, 5, 6, 7, 8], 16, true);
        this.goblin.animations.add('attackG', [0, 1, 2, 3, 4 , 5, 6, 7, 8], 12, true);*/

        //MUSHROOM
        this.mushroom = this.game.add.sprite(this.game.world.centerX + 75, this.game.world.centerY, 'MIdle');
        this.mushroom.anchor.setTo(0.5);
        this.mushroom.inputEnabled = true;
        this.mushroom.input.useHandCursor = true;
        this.mushroom.customParams = {
            name: 'MIdle',
            frames: [0, 1, 2, 3],
            nameWalk: 'MRun',
            walking: [1, 2, 3, 4, 5, 6, 7, 8],
            nameAttack: 'MAttack',
            attacking: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            framesPS: 12,
            health: 100,
            damage: 25,
            movingLeft: false,
            movingRight: false,
            attack: false,
            roundsWin: 0,
            audio: punchAudio
        }
        this.mushroom.events.onInputDown.add(this.pickCharacter, this);
        this.mushroom.animations.add('idleM', [0, 1, 2, 3], 12, true);
        this.mushroom.animations.play('idleM');

        /*MUSHROOM ANIMATIONS
        this.mushroom.animations.add('walkingM', [1, 2, 3, 4, 5, 6, 7, 8], 12, true);
        this.mushroom.animations.add('idleM', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true);*/

        //SKELETON
        this.skeleton = this.game.add.sprite(this.game.world.centerX + 250, this.game.world.centerY, 'SIdle');
        this.skeleton.anchor.setTo(0.5);
        this.skeleton.inputEnabled = true;
        this.skeleton.input.useHandCursor = true;
        this.skeleton.customParams = {
            name: 'SIdle',
            frames: [0, 1, 2, 3],
            nameWalk: 'SRun',
            walking: [0, 1, 2, 3],
            nameAttack: 'SAttack',
            attacking: [1, 2, 3, 4, 5, 6, 7, 8],
            framesPS: 12,
            health: 100,
            damage: 25,
            movingLeft: false,
            movingRight: false,
            attack: false,
            roundsWin: 0,
            audio: swordsAudio
        }
        this.skeleton.events.onInputDown.add(this.pickCharacter, this);
        this.skeleton.animations.add('idleS', [0, 1, 2, 3], 12, true);
        this.skeleton.animations.play('idleS');

        /*SKELETON ANIMATIONS
        this.skeleton.animations.add('runS', [0, 1, 2, 3], 12, true);
        this.skeleton.animations.add('idleS', [1, 2, 3, 4, 5, 6, 7, 8], 12, true);*/

    },
    pickCharacter: function (sprite, event) {
        if (firstplayer === '') {
            firstplayer = sprite.customParams;
            playerSelect.play();
            title.destroy();
            let title1 = this.game.add.text(this.game.world.centerX, 75, 'SECOND PLAYER SELECT YOUR CHARACTER', styleGS);
            title1.anchor.setTo(0.5);
            title1.setShadow(5, 5, 'rgba(0,0,0,0.7)', 5);
        } else if (secondplayer === '') {
            playerSelect.play();
            secondplayer = sprite.customParams;
            game.state.start('FightState');
        }
    }
}


/*let runAnimation = this.game.add.sprite(this.firstfighter.position.x, this.firstfighter.position.y, this.FIRSTPLAYER.nameWalk);
            runAnimation.scale.setTo(-1, 1);
            this.firstfighter.animations.add('runFP', this.FIRSTPLAYER.walking, 12, true);
            this.firstfighter.animations.play('runFP');*/