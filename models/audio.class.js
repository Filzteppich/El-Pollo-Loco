

/**
 * @description Handles audio playback for the game.
 * @class Audio
 */
class Sound {

 bounceSound = new Audio('audio/swoop_bound.wav');
 throwSound = new Audio('audio/throw.wav');
 splashSound = new Audio('audio/splash_sound.mp3');
 chickenHurtSound = new Audio('audio/chicken_hurt_sound_.wav');
 characterHurtSound = new Audio('audio/character_hurt.wav');
 finalBossTheme = new Audio('audio/final_boss.wav');
 coinSound = new Audio('audio/coin_sound.mp3');
 bottleSound = new Audio('audio/bottle_collect.wav');
 themeSong = new Audio('audio/theme_song.wav');
 endbossSound = new Audio('audio/endboss_sound.wav');
 endbossHurtSound = new Audio('audio/endboss_hurt.wav');
 loseSound = new Audio('audio/lose_sound.mp3');
 winSound = new Audio('audio/win_sound.wav');


    constructor(){
        this.setAudioVolume();  
        this.playIntroSound();
        this.collectSounds();
        this.checkAudioBeforeStart();
    }


/**
 * @description Collects all the sounds used in the game and registers them for global control.
 * @memberof World
 */
collectSounds(){
registerSounds(this.bounceSound);
registerSounds(this.throwSound);
registerSounds(this.splashSound);
registerSounds(this.chickenHurtSound);
registerSounds(this.characterHurtSound);
registerSounds(this.finalBossTheme);
registerSounds(this.coinSound);
registerSounds(this.bottleSound);
registerSounds(this.themeSong);
registerSounds(this.endbossSound);
registerSounds(this.endbossHurtSound);
registerSounds(this.loseSound);
registerSounds(this.winSound);
}


/**
 * @description Checks if audio is muted before starting the game.
 * @memberof World
 */
checkAudioBeforeStart(){
    if (mute){
        allSounds.forEach((sound) => {
            sound.volume = 0;
        })
    }
}


/**
 * @description Sets the audio volume for all game sounds.
 * @memberof World
 */
setAudioVolume(){
    this.bounceSound.volume = 1.0;
    this.finalBossTheme.volume = 0.3;
    this.themeSong.volume = 0.2;
    this.endbossSound.volume = 0.2;
    this.endbossHurtSound.volume = 0.2;
    this.loseSound.volume = 0.6;
}


/**
 * @description Plays the intro theme song and sets it to loop.
 * @memberof World
 */
playIntroSound(){
    this.themeSong.play();
    this.themeSong.loop = true;
}


playAudio(audio){
    audio.currentTime = 0;
    audio.play();
}

}