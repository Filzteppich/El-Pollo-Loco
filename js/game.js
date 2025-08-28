let canvas;
let world;
let endscreenDiv = null;
let keyboard;
let mute = localStorage.getItem('mute') === 'true';
let allSounds =[];
let allIntervals = [];
let allTimeouts = [];
let isPaused = false;
let isGameRunning = false;
let gameFinished = false;
let gameLose = false;




/**
 * @description Initializes the game by setting up the canvas, checking orientation, and initializing keyboard input.
 * This function is called when the window loads.
 */
function init(){
    checkOrientation();
    canvas = document.getElementById('canvas');
    checkLocalStorageSound();
    keyboard = new Keyboard();
}


/**
 * @description Starts the game by resetting the world, creating a new World instance, and updating the UI to show the game screen.
 * @returns {*} The newly created World instance.
 */
function startGame(){
    resetWorld();
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('canvas').classList.remove('hidden');
    document.getElementById('returnIcon').classList.remove('hidden');
    document.getElementById('gameUi').classList.remove('hidden');
    isGameRunning = true
    return world;
}

/**
 * @description Resets the game world to its initial state.
 */
function resetWorld(){
    isGameRunning = true
    gameFinished = false
    gameLose = false;
    allSounds = [];
    allIntervals = [];
}


/**
 * @description Returns the player to the start screen, resetting the game state.
 */
function returnToStartScreen(){
    if (endscreenDiv !== null) {
        endscreenDiv.remove();
        endscreenDiv = null;
        document.getElementById('endscreen').classList.add('hidden')
    }
    world.collectedBottles = [];
    stopGame();
    stopSound();
    world = null;
    document.getElementById('startScreen').classList.remove('hidden')
    document.getElementById('canvas').classList.add('hidden')
    document.getElementById('returnIcon').classList.add('hidden')
    document.getElementById('gameUi').classList.add('hidden');
    isGameRunning = false
}

/**
 * @description Sets up a stoppable interval that can be cleared later.
 * @param {*} fn The function to be executed at each interval.
 * @param {*} time The time (in milliseconds) between each execution.
 * @returns {*} The ID of the created interval.
 */
function setStoppableInterval(fn, time){
    let intervalId = setInterval(fn, time);
    allIntervals.push(intervalId)
    return intervalId
}

/**
 * @description Stops all game intervals that have been set up.
 */
function stopGameIntervals(){
        allIntervals.forEach((interval) => {
        clearInterval(interval)
    });
}

/**
 * @description Stops the game and clears all intervals.
 */
function stopGame(){
    allIntervals.forEach((interval) => {
        clearInterval(interval)
    });
    allSounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
    });
}

/**
 * @description Restarts the game.
 */
function restartGame(){
    if (endscreenDiv !== null) {
        endscreenDiv.remove();
        endscreenDiv = null;
    }
    document.getElementById('endscreen').classList.add('hidden')
    stopGame();
    resetWorld();
    world = null;
    startGame();
}

/**
 * @description Ends the game and displays the appropriate end screen.
 * @param {*} type The type of end game scenario (win/lose).
 */
function endgame(type){
    if (type === 'win') {
        document.getElementById('gameUi').classList.add('hidden');
        winDisplay();
    }else if (type === 'lose'){
        document.getElementById('gameUi').classList.add('hidden');
        loseDisplay();
    }
}


/**
 * @description Displays the win screen.
 */
function winDisplay(){
        document.getElementById('endscreen').classList.remove('hidden')
        document.getElementById('returnIcon').classList.add('hidden');
        endscreenDiv = document.createElement('div');
        endscreenDiv.classList.add('endscreen-content')
        endscreenDiv.innerHTML = showWinScreen();
        document.getElementById('endscreen').appendChild(endscreenDiv);
}

/**
 * @description Displays the lose screen.
 */
function loseDisplay(){
        document.getElementById('endscreen').classList.remove('hidden')
        document.getElementById('returnIcon').classList.add('hidden');
        endscreenDiv = document.createElement('div');
        endscreenDiv.classList.add('endscreen-content')
        endscreenDiv.innerHTML = showLoseScreen();
        document.getElementById('endscreen').appendChild(endscreenDiv);
}


/**
 * @description Shows a window with the specified ID.
 * @param {*} id The ID of the window to show.
 */
function showWindow(id){
    document.getElementById(id).classList.remove('hidden');
    document.getElementById('info_window_wrapper').classList.remove('hidden');
}


/**
 * @description Closes a window with the specified ID.
 * @param {*} id The ID of the window to close.
 */
function closeWindow(id){
    document.getElementById(id).classList.add('hidden');
    document.getElementById('info_window_wrapper').classList.add('hidden');
}


/**
 * @description Toggles fullscreen mode.
 */
function toggleFullscreen(){
    let fullscreen = document.getElementById('fullscreen')
    if (!document.fullscreenElement){
        openFullscreen(fullscreen);
    }else{
        closeFullscreen();
    }
}


/**
 * @description Enters fullscreen mode for the specified element.
 * @param {*} elem The element to make fullscreen.
 */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { 
    elem.msRequestFullscreen();
  }
}


/**
 * @description Exits fullscreen mode.
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { 
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { 
    document.msExitFullscreen();
  }
}


/**
 * @description Registers a sound for the game.
 * @param {*} audio The audio element to register.
 */
function registerSounds(audio){
    if (audio instanceof Audio){
        allSounds.push(audio)
    }
}


/**
 * @description Stops all registered sounds.
 */
function stopSound(){
    allSounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
    })
}


/**
 * @description Checks the local storage for the sound settings.
 */
function checkLocalStorageSound(){
    let soundElement = document.getElementById('soundIcon');
    if (mute === false){
        soundElement.src = 'imgs/icons/volume.png'
    }else if(mute === true){
        soundElement.src = 'imgs/icons/mute.png' 
    }
}


/**
 * @description Toggles the sound on and off.
 */
function toggleSound(){
    let soundElement = document.getElementById('soundIcon');
    if (mute) {
        unmuted(soundElement);
    }else{
        muted(soundElement);
    }
}


/**
 * @description Unmutes the sound.
 * @param {*} soundElement The sound element to unmute.
 */
function unmuted(soundElement){
    mute = false;
        soundElement.src = 'imgs/icons/volume.png'
        allSounds.forEach((sound) => {
            if (world) {
                sound.volume = 1;
                world.audio.setAudioVolume();
                world.character.setAudioVolume();
            }
        })
        localStorage.setItem('mute', mute);
}


/**
 * @description Mutes the sound.
 * @param {*} soundElement The sound element to mute.
 */
function muted(soundElement){
    mute = true
    soundElement.src = 'imgs/icons/mute.png' 
    allSounds.forEach((sound) => {
    sound.volume = 0;
    });
    localStorage.setItem('mute', mute);
}

