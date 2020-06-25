const PreloadState = {
    preload: function () {

        //CARGAS IMAGENES AQUI
        this.load.image('preloadBackground', 'assets/backgrounds/ArtForest/Background.png');

        //FLYING EYE
        this.load.spritesheet('FEAttack', 'assets/characters/FlyingEye/Attack.png', 48, 47, 8, 55, 102);
        this.load.spritesheet('FEDeath', 'assets/characters/FlyingEye/Death.png', 100, 83, 5, 1, 1);
        this.load.spritesheet('FEFlight', 'assets/characters/FlyingEye/Flight.png', 48, 47, 8, 50, 102);

        //GOBLIN
        this.load.spritesheet('GAttack', 'assets/characters/Goblin/Attack.png', 70, 52, 8, 50, 80);
        this.load.spritesheet('GDeath', 'assets/characters/Goblin/Death.png', 100, 100, 5, 1, 1);
        this.load.spritesheet('GIdle', 'assets/characters/Goblin/Idle.png', 50, 52, 4, 50, 100);
        this.load.spritesheet('GRun', 'assets/characters/Goblin/Run.png', 50, 52, 8, 50, 100);

        //MUSHROOM
        this.load.spritesheet('MAttack', 'assets/characters/Mushroom/Attack.png', 60, 48, 8, 50, 90);
        this.load.spritesheet('MDeath', 'assets/characters/Mushroom/Death.png', 100, 100, 5, 1, 1);
        this.load.spritesheet('MIdle', 'assets/characters/Mushroom/Idle.png', 40, 50, 4, 50, 110);
        this.load.spritesheet('MRun', 'assets/characters/Mushroom/Run.png', 40, 48, 8, 50, 110);

        //SKELETON
        this.load.spritesheet('SAttack', 'assets/characters/Skeleton/Attack.png', 100, 55, 8, 45, 50);
        this.load.spritesheet('SDeath', 'assets/characters/Skeleton/Death.png', 100, 100, 5, 1, 1);
        this.load.spritesheet('SIdle', 'assets/characters/Skeleton/Idle.png', 60, 55, 4, 45, 90);
        this.load.spritesheet('SRun', 'assets/characters/Skeleton/Walk.png', 60, 55, 4, 45, 90);

        //AUDIOS
        this.load.audio('Jump', 'assets/audios/JumpSound.mp3');
        this.load.audio('Soundtrack', 'assets/audios/Soundtrack.mp3');
        this.load.audio('StartSound', 'assets/audios/StartSound.mp3');
        this.load.audio('Defeat', 'assets/audios/DefeatSound.mp3');
        this.load.audio('Swords', 'assets/audios/Sword.mp3');
        this.load.audio('Punch', 'assets/audios/Punch.mp3');
        this.load.audio('Bite', 'assets/audios/Bite.mp3');
        this.load.audio('Select', 'assets/audios/Select.mp3');
        this.load.audio('GameOver', 'assets/audios/GameOverVoice.mp3');
    },
    create: function () {
        this.state.start('HomeState');
    }
}