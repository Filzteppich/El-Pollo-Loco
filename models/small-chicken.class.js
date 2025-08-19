class SmallChicken extends Chicken {


    x = 400 + Math.random() * 2220;
    y = 330;
    height = 100;
    width = 100;


    IMAGES_WALK = [
        'imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    constructor(){
        super();
        this.loadImages(this.IMAGES_WALK)
        this.animate(1.5)

    }
}