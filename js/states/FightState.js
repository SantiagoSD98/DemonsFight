let title, timer, finalText, firstVictoryCounter = 0, secondVictoryCounter = 0, roundCounter = 1, maxRounds = 4, jump,
    gameOverSound, defeatSound, gameOver = false, fpHealth = 0, spHealth = 0;
const styleCounter = {
    fill: '#9e0707',
    fontSize: '25px',
    align: 'center',
    stroke: '#fff',
    strokeThickness: 2
};
const styleRoundCounter = {
    fill: '#000',
    fontSize: '45px',
    align: 'center',
    stroke: '#fff',
    strokeThickness: 2
};
const styleVictoryCounter = {
    fill: '#4f7719',
    fontSize: '20px',
    align: 'center',
    stroke: '#000000',
    strokeThickness: 2
}
const textWinner = {
    fill: '#f2ff31',
    align: 'center',
    fontSize: '50px',
    stroke: '#000000',
    strokeThickness: 2
}
const FightState = {
    create: function () {
        this.gameOver = false;

        //PLAYER MOVEMENT
        this.RUNNING_SPEED = 180;
        this.JUMPIN_SPEED = 375;

        //AUDIOS
        jump = this.game.add.audio('Jump');
        gameOverSound = this.game.add.audio('GameOver');
        defeatSound = this.game.add.audio('Defeat');

        //FIRST PLAYER CONTROLS
        this.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.v = game.input.keyboard.addKey(Phaser.Keyboard.V);

        //SECOND PLAYER CONTROLS
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
        this.jump = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
        this.attack = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);

        //BACKGROUND
        const background = this.game.add.sprite(this.game.world.centerX, 0, 'preloadBackground');
        background.anchor.setTo(0.5, 0.5);

        //ROUNDS
        this.roundText = this.game.add.text(this.game.world.centerX, 50, "Round " + roundCounter, styleRoundCounter);
        this.roundText.anchor.setTo(0.5);

        //VICTORY ROUND COUNTER
        firstVictoryCounter = this.game.add.text(35, 35, '1P Victories: ' + firstplayer.roundsWin, styleVictoryCounter);
        secondVictoryCounter = this.game.add.text(765, 35, '2P Victories: ' + secondplayer.roundsWin, styleVictoryCounter);

        //HEALTH COUNTER
        fpHealth = this.game.add.text(35, 65, 'Health: ' + firstplayer.health, styleVictoryCounter);
        spHealth = this.game.add.text(765, 65, 'Health: ' + secondplayer.health, styleVictoryCounter);

        //TIMER
        this.timeInSeconds = 30;
        this.timeText = this.game.add.text(this.game.world.centerX, 100, "30", styleCounter);
        this.timeText.anchor.set(0.5, 0.5);
        this.timer = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);

        //FIRST FIGHTER
        this.firstfighter = this.game.add.sprite(this.game.world.centerX - 250, this.game.world.centerY - 35, firstplayer.name);
        this.game.physics.arcade.enable(this.firstfighter);
        this.firstfighter.anchor.setTo(0.5);
        this.firstfighter.body.collideWorldBounds = true;

        //ANIMATION FIRST FIGHTER
        this.firstfighter.animations.add('idleFP', firstplayer.frames, firstplayer.framesPS, true);
        this.firstfighter.animations.add('walkFP', firstplayer.walking, firstplayer.framesPS, true);
        this.firstfighter.animations.add('attackFP', firstplayer.attacking, firstplayer.framesPS, false);
        this.firstfighter.animations.play('idleFP');

        //SECOND FIGHTER
        this.secondfighter = this.game.add.sprite(this.game.world.centerX + 250, this.game.world.centerY - 35, secondplayer.name);
        this.game.physics.arcade.enable(this.secondfighter);
        this.secondfighter.anchor.setTo(0.5);
        this.secondfighter.body.collideWorldBounds = true;

        //ANIMATION SECOND FIGHTER
        this.secondfighter.scale.setTo(-1, 1);
        this.secondfighter.animations.add('idleSP', secondplayer.frames, secondplayer.framesPS, true);
        this.secondfighter.animations.add('walkSP', secondplayer.walking, secondplayer.framesPS, true);
        this.secondfighter.animations.add('attackSP', secondplayer.attacking, secondplayer.framesPS, false);
        this.secondfighter.animations.play('idleSP');
    },
    updateTimer: function () {
        this.timeInSeconds--;
        this.timeText.text = this.timeInSeconds;

        if (this.timeInSeconds === 0) {
            roundCounter++;
            firstplayer.health = 100;
            secondplayer.health = 100;
            this.game.state.start('FightState');
        }
    },
    update: function () {
        this.game.physics.arcade.collide(this.firstfighter, this.secondfighter);

        //CHECK WINNER ROUND
        if (firstplayer.health === 0 && gameOver === false) {
            secondplayer.roundsWin++;
            roundCounter++;
            firstplayer.health = 100;
            secondplayer.health = 100;
            this.game.state.start('FightState');
        } else if (secondplayer.health === 0 && gameOver === false) {
            firstplayer.roundsWin++;
            roundCounter++;
            firstplayer.health = 100;
            secondplayer.health = 100;
            this.game.state.start('FightState');
        }

        //CHECK ROUNDS PLAYED
        if (roundCounter === maxRounds) {
            if (firstplayer.roundsWin === secondplayer.roundsWin) {
                this.destroySprites();
                finalText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'DRAW', textWinner);
                finalText.anchor.setTo(0.5);
                this.game.time.events.add(3500, this.clearGame, this);
            } else if (firstplayer.roundsWin === 2 || firstplayer.roundsWin > secondplayer.roundsWin) {
                this.destroySprites();
                if (gameOver && (roundCounter === maxRounds || firstplayer.roundsWin > secondplayer.roundsWin)) {
                    firstplayer.health = 100;
                    secondplayer.health = 100;
                }
                finalText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'FIRST PLAYER WINS', textWinner);
                finalText.anchor.setTo(0.5);
                this.game.time.events.add(3500, this.clearGame, this);
            } else if (secondplayer.roundsWin === 2 || secondplayer.roundsWin > firstplayer.roundsWin) {
                this.destroySprites();
                if (gameOver && (secondplayer.roundsWin > firstplayer.roundsWin || firstplayer.roundsWin > secondplayer.roundsWin)) {
                    firstplayer.health = 100;
                    secondplayer.health = 100;
                }
                finalText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'SECOND PLAYER WINS', textWinner);
                finalText.anchor.setTo(0.5);
                this.game.time.events.add(3500, this.clearGame, this);
            }
        }

        if (firstplayer.roundsWin === 2 && firstplayer.roundsWin > secondplayer.roundsWin) {
            this.destroySprites();
            if (gameOver && (roundCounter === maxRounds || firstplayer.roundsWin > secondplayer.roundsWin)) {
                firstplayer.health = 100;
                secondplayer.health = 100;
            }
            finalText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'FIRST PLAYER WINS', textWinner);
            finalText.anchor.setTo(0.5);
            this.game.time.events.add(3500, this.clearGame, this);
        }

        if (secondplayer.roundsWin === 2 && secondplayer.roundsWin > firstplayer.roundsWin) {
            this.destroySprites();
            if (gameOver && (secondplayer.roundsWin > firstplayer.roundsWin || firstplayer.roundsWin > secondplayer.roundsWin)) {
                firstplayer.health = 100;
                secondplayer.health = 100;
            }
            finalText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'SECOND PLAYER WINS', textWinner);
            finalText.anchor.setTo(0.5);
            this.game.time.events.add(3500, this.clearGame, this);
        }

        //DETECT JUMP DAMAGE
        if (this.firstfighter.body.touching.up) {
            defeatSound.play();
            firstplayer.health -= 25;
            fpHealth.setText('Health: ' + firstplayer.health);
            this.secondfighter.body.velocity.y = -425;
        } else if (this.secondfighter.body.touching.up) {
            defeatSound.play();
            secondplayer.health -= 25;
            spHealth.setText('Health: ' + secondplayer.health);
            this.firstfighter.body.velocity.y = -425;
        }

        //JUMP MOVEMENT FIRST PLAYER
        if (this.w.isDown && this.firstfighter.body.onFloor()) {
            jump.play();
            this.firstfighter.body.velocity.y = -this.JUMPIN_SPEED;
        }

        //JUMP MOVEMENT SECOND PLAYER
        if (this.jump.isDown && this.secondfighter.body.onFloor()) {
            jump.play();
            this.secondfighter.body.velocity.y = -this.JUMPIN_SPEED;
        }

        //LEFT/RIGHT MOVEMENT FIRST PLAYER
        if (this.a.isDown && !firstplayer.movingLeft) {
            this.firstfighter.animations.stop();
            this.firstfighter.loadTexture(firstplayer.nameWalk, 0, true);
            this.firstfighter.animations.play('walkFP');
            firstplayer.movingLeft = true;
            firstplayer.movingRight = false;
            firstplayer.attack = false;
            this.firstfighter.scale.setTo(-1, 1);
            this.firstfighter.body.velocity.x = -this.RUNNING_SPEED;
        } else if (this.d.isDown && !firstplayer.movingRight) {
            this.firstfighter.animations.stop();
            this.firstfighter.loadTexture(firstplayer.nameWalk, 0, true);
            this.firstfighter.animations.play('walkFP');
            firstplayer.movingRight = true;
            firstplayer.movingLeft = false;
            firstplayer.attack = false;
            this.firstfighter.body.velocity.x = this.RUNNING_SPEED;
            this.firstfighter.scale.setTo(1, 1);
        } else if ((this.a.isUp && firstplayer.movingLeft) || (this.d.isUp && firstplayer.movingRight)) {
            this.firstfighter.animations.stop();
            this.firstfighter.loadTexture(firstplayer.name, 0, true);
            this.firstfighter.animations.play('idleFP');
            firstplayer.movingLeft = false;
            firstplayer.movingRight = false;
            firstplayer.attack = false;
            this.firstfighter.body.velocity.x = 0;
        }

        //LEFT/RIGHT MOVEMENT SECOND PLAYER
        if (this.left.isDown && !secondplayer.movingLeft) {
            this.secondfighter.animations.stop();
            this.secondfighter.loadTexture(secondplayer.nameWalk, 0, true);
            this.secondfighter.animations.play('walkSP');
            secondplayer.movingLeft = true;
            secondplayer.movingRight = false;
            secondplayer.attack = false;
            this.secondfighter.scale.setTo(-1, 1);
            this.secondfighter.body.velocity.x = -this.RUNNING_SPEED;
        } else if (this.right.isDown && !secondplayer.movingRight) {
            this.secondfighter.animations.stop();
            this.secondfighter.loadTexture(secondplayer.nameWalk, 0, true);
            this.secondfighter.animations.play('walkSP');
            secondplayer.movingRight = true;
            secondplayer.movingLeft = false;
            secondplayer.attack = false;
            this.secondfighter.body.velocity.x = this.RUNNING_SPEED;
            this.secondfighter.scale.setTo(1, 1);
        } else if ((this.left.isUp && secondplayer.movingLeft) || (this.right.isUp && secondplayer.movingRight)) {
            this.secondfighter.animations.stop();
            this.secondfighter.loadTexture(secondplayer.name, 0, true);
            this.secondfighter.animations.play('idleSP');
            this.secondfighter.body.velocity.x = 0;
            secondplayer.movingLeft = false;
            secondplayer.movingRight = false;
            secondplayer.attack = false;
        }

        //DETECT ATTACK FIRST PLAYER
        if (this.v.isDown && firstplayer.attack === false) {
            if (this.firstfighter.body.wasTouching.left || this.firstfighter.body.wasTouching.right) {
                secondplayer.health -= 25;
                spHealth.setText('Health: ' + secondplayer.health);
            }
            firstplayer.attack = true;
            firstplayer.audio.play();
            this.firstfighter.animations.stop();
            this.firstfighter.loadTexture(firstplayer.nameAttack, 0, true);
            this.firstfighter.animations.play('attackFP');
            this.firstfighter.animations.currentAnim.onComplete.add(function () {
                firstplayer.attack = false;
                this.firstfighter.animations.stop();
                this.firstfighter.loadTexture(firstplayer.name, 0, true);
                this.firstfighter.animations.play('idleFP');
            }, this);
        }

        //DETECT ATTACK SECOND PLAYER
        if (this.attack.isDown && secondplayer.attack === false) {
            if (this.secondfighter.body.wasTouching.left || this.secondfighter.body.wasTouching.right) {
                firstplayer.health -= 25;
                fpHealth.setText('Health: ' + firstplayer.health);
            }
            secondplayer.attack = true;
            secondplayer.audio.play();
            this.secondfighter.animations.stop();
            this.secondfighter.loadTexture(secondplayer.nameAttack, 0, true);
            this.secondfighter.animations.play('attackSP');
            this.secondfighter.animations.currentAnim.onComplete.add(function () {
                secondplayer.attack = false;
                this.secondfighter.animations.stop();
                this.secondfighter.loadTexture(secondplayer.name, 0, true);
                this.secondfighter.animations.play('idleSP');
            }, this);
        }
    },
    clearGame: function () {
        this.game.state.start('GameState');
        this.game.input.enabled = true;
        roundCounter = 1;
        firstplayer = '';
        secondplayer = '';
        gameOver = false;
    },
    destroySprites: function () {
        this.game.input.enabled = false;

        gameOver = true;
        if (gameOver && roundCounter !== 0) {
            gameOverSound.play();
        }
        roundCounter = 0;
        this.timeText.destroy();
        this.roundText.destroy();
        firstVictoryCounter.destroy();
        secondVictoryCounter.destroy();
        fpHealth.destroy();
        spHealth.destroy();
    }
}