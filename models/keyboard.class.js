class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    Numpad0 = false;

    constructor(){
    this.bindKeyPress();
    this.bindKeyTouch();

    }

    bindKeyPress(){ 
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
}

bindKeyTouch(){
    document.getElementById('left_mobile').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
        
    })
    
    document.getElementById('left_mobile').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    })

        document.getElementById('right_mobile').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    })
    
    document.getElementById('right_mobile').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    })

    document.getElementById('throw_mobile').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    })
    
    document.getElementById('throw_mobile').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.D = false;
    })

        document.getElementById('jump_mobile').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    })
    
    document.getElementById('jump_mobile').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    })









}


}