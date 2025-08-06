let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    

    // console.log("My Name is:", world.character.name)    
}


function startGame(){
    let world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.add('hidden')
    document.getElementById('canvas').classList.remove('hidden')
    return world;
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