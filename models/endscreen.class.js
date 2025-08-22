class Endscreen extends DrawableObject{
    
    
    
    constructor(type){
        super();
        if (type === 'win'){
            this.loadImage('imgs/You won, you lost/You won A.png')
            this.width = 640
            this.height = 520
            this.y = -50;
            this.x = 80
        }else{
            this.loadImage('imgs/9_intro_outro_screens/game_over/you lost.png')
            this.width = 860
            this.height = 480
            this.x = 0;
            this.y = 0;
        }

    }





}