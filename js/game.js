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

function init(){
    canvas = document.getElementById('canvas');
    checkLocalStorageSound();
    keyboard = new Keyboard();
}


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

function resetWorld(){
    isGameRunning = true
    gameFinished = false
    gameLose = false;
    allSounds = [];
    allIntervals = [];
}

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

function setStoppableInterval(fn, time){
    let intervalId = setInterval(fn, time);
    allIntervals.push(intervalId)
    return intervalId
}


function stopGameIntervals(){
        allIntervals.forEach((interval) => {
        clearInterval(interval)
    });
}


function stopGame(){
    allIntervals.forEach((interval) => {
        clearInterval(interval)
    });
    allSounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
    });


    allSounds = [];
}


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

// onclick funktion

function endgame(type){
    if (type === 'win') {
        document.getElementById('gameUi').classList.add('hidden');
        winDisplay();
    }else if (type === 'lose'){
        document.getElementById('gameUi').classList.add('hidden');
        loseDisplay();
    }
}

function winDisplay(){
        document.getElementById('endscreen').classList.remove('hidden')
        document.getElementById('returnIcon').classList.add('hidden');
        endscreenDiv = document.createElement('div');
        endscreenDiv.classList.add('endscreen-content')
        endscreenDiv.innerHTML = showWinScreen();
        document.getElementById('endscreen').appendChild(endscreenDiv);
}

function loseDisplay(){
        document.getElementById('endscreen').classList.remove('hidden')
        document.getElementById('returnIcon').classList.add('hidden');
        endscreenDiv = document.createElement('div');
        endscreenDiv.classList.add('endscreen-content')
        endscreenDiv.innerHTML = showLoseScreen();
        document.getElementById('endscreen').appendChild(endscreenDiv);
}

function showWindow(id){
    document.getElementById(id).classList.remove('hidden');
    document.getElementById('info_window_wrapper').classList.remove('hidden');
}

function closeWindow(id){
    document.getElementById(id).classList.add('hidden');
    document.getElementById('info_window_wrapper').classList.add('hidden');
}

function toggleFullscreen(){
    let fullscreen = document.getElementById('fullscreen')
    if (!document.fullscreenElement){
        openFullscreen(fullscreen);
    }else{
        closeFullscreen();
    }
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { 
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function registerSounds(audio){
    if (audio instanceof Audio){
        allSounds.push(audio)
    }
}

function stopSound(){
    allSounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
    })
}

function checkLocalStorageSound(){
    let soundElement = document.getElementById('soundIcon');
    if (mute === false){
        soundElement.src = 'imgs/icons/volume.png'
    }else if(mute === true){
        soundElement.src = 'imgs/icons/mute.png' 
    }
}



function toggleSound(){
    let soundElement = document.getElementById('soundIcon');
    if (mute) {
        unmuted(soundElement);
    }else{
        muted(soundElement);
    }
}

function unmuted(soundElement){
    mute = false;
        soundElement.src = 'imgs/icons/volume.png'
        allSounds.forEach((sound) => {
            if (world) {
                sound.volume = 1;
                world.setAudioVolume();
                world.character.setAudioVolume();
            }
        })
        localStorage.setItem('mute', mute);
}

function muted(soundElement){
    mute = true
    soundElement.src = 'imgs/icons/mute.png' 
    allSounds.forEach((sound) => {
    sound.volume = 0;
    });
    localStorage.setItem('mute', mute);
}

