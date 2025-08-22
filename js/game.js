let canvas;
let world;
let keyboard = new Keyboard();
let mute = localStorage.getItem('mute') === 'true';
let allSounds =[];
let allIntervals = [];
let isPaused = false;
let isGameRunning = false;
let gameFinished = false;
let gameWin = false;
let gameLose = false;

function init(){
    canvas = document.getElementById('canvas');
    checkLocalStorageSound();

    // console.log("My Name is:", world.character.name)    
}


function startGame(){
    resetWorld();
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.add('hidden')
    document.getElementById('canvas').classList.remove('hidden')
    document.getElementById('returnIcon').classList.remove('hidden')
    isGameRunning = true
    return world;
}

function resetWorld(){
    isGameRunning = true
    gameFinished = false
    gameWin = false;
    gameLose = false;
    allSounds = [];
    allIntervals = [];
}

function returnToStartScreen(){
    world.collectedBottles = [];
    stopGame();
    stopSound();
    world = null;
    document.getElementById('startScreen').classList.remove('hidden')
    document.getElementById('canvas').classList.add('hidden')
    document.getElementById('returnIcon').classList.add('hidden')

    isGameRunning = false
}

function setStoppableInterval(fn, time){
    let intervalIds = setInterval(fn, time);
    allIntervals.push(intervalIds)
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
    })
    
}

function endgame(){
    console.log('Game Over');
}

function showWindow(id){
    document.getElementById(id).classList.remove('hidden');
}

function closeWindow(id){
    document.getElementById(id).classList.add('hidden');
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
        console.log('mute is false');
        
    }else if(mute === true){
        soundElement.src = 'imgs/icons/mute.png' 
        console.log('mute is true');
        
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

document.addEventListener('keydown', (event) => {
    if (event.code === "Space") {
        keyboard.SPACE = true;
    }
    if (event.code === "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (event.code === "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.code === "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (event.code === "ArrowUp") {
        keyboard.UP = true;
    }
    if (event.code === "KeyD") {
        keyboard.D = true;
    }
    if (event.code === "Numpad0") {
        keyboard.D = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === "Space") {
        keyboard.SPACE = false;
    }
    if (event.code === "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (event.code === "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.code === "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (event.code === "ArrowUp") {
        keyboard.UP = false;
    }
    if (event.code === "KeyD") {
        keyboard.D = false;
    }
    if (event.code === "Numpad0") {
        keyboard.D = false;
    }
});