let topPosition = 80;
let bottomPosition = 300;
let groundPosition = 350;
let groundBottle = 'imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png'
let hoveringBottle = 'imgs/6_salsa_bottle/salsa_bottle.png'
let level1;

function initLevel(){
level1 = new Level(
    [
    new Chicken(), 
    new Chicken(), 
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Endboss(),
    ],[
    new BackgroundObject('imgs/5_background/layers/air.png', -740),
    new BackgroundObject('imgs/5_background/layers/3_third_layer/2.png', -740),
    new BackgroundObject('imgs/5_background/layers/2_second_layer/2.png', -740),
    new BackgroundObject('imgs/5_background/layers/1_first_layer/2.png', -740),
    new BackgroundObject('imgs/5_background/layers/air.png', 0),
    new BackgroundObject('imgs/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('imgs/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('imgs/5_background/layers/1_first_layer/1.png', 0),
    new BackgroundObject('imgs/5_background/layers/air.png', 740),
    new BackgroundObject('imgs/5_background/layers/3_third_layer/2.png', 740),
    new BackgroundObject('imgs/5_background/layers/2_second_layer/2.png', 740),
    new BackgroundObject('imgs/5_background/layers/1_first_layer/2.png', 740),
    new BackgroundObject('imgs/5_background/layers/air.png', 1480),
    new BackgroundObject('imgs/5_background/layers/3_third_layer/1.png', 1480),
    new BackgroundObject('imgs/5_background/layers/2_second_layer/1.png', 1480),
    new BackgroundObject('imgs/5_background/layers/1_first_layer/1.png', 1480),
    new BackgroundObject('imgs/5_background/layers/air.png', 2220),
    new BackgroundObject('imgs/5_background/layers/3_third_layer/2.png', 2220),
    new BackgroundObject('imgs/5_background/layers/2_second_layer/2.png', 2220),
    new BackgroundObject('imgs/5_background/layers/1_first_layer/2.png', 2220),
    new BackgroundObject('imgs/5_background/layers/air.png', 2960),
    new BackgroundObject('imgs/5_background/layers/3_third_layer/1.png', 2960),
    new BackgroundObject('imgs/5_background/layers/2_second_layer/1.png', 2960),
    new BackgroundObject('imgs/5_background/layers/1_first_layer/1.png', 2960),
    new BackgroundObject('imgs/5_background/layers/air.png', 3700),
    new BackgroundObject('imgs/5_background/layers/3_third_layer/2.png', 3700),
    new BackgroundObject('imgs/5_background/layers/2_second_layer/2.png', 3700),
    new BackgroundObject('imgs/5_background/layers/1_first_layer/2.png', 3700),
    ],[
 new Clouds('imgs/5_background/layers/4_clouds/1.png', 0),
 new Clouds('imgs/5_background/layers/4_clouds/2.png', 740 + Math.random() * 740),
 new Clouds('imgs/5_background/layers/4_clouds/2.png', 1480 + Math.random() * 740),
    ],[
    new ThrowableObject(400, groundPosition,groundBottle),
    new ThrowableObject(500, groundPosition,groundBottle),
    new ThrowableObject(600, groundPosition,groundBottle),
    new ThrowableObject(700, topPosition,hoveringBottle),
    new ThrowableObject(800, topPosition,hoveringBottle),
    new ThrowableObject(900, topPosition,hoveringBottle),
    new ThrowableObject(1000, groundPosition, groundBottle),
    new ThrowableObject(1100, topPosition,hoveringBottle),
    new ThrowableObject(1200, topPosition,hoveringBottle),
    new ThrowableObject(1300, groundPosition, groundBottle),
    ],[
    new CollectibleObject(300, topPosition),
    new CollectibleObject(370, topPosition),
    new CollectibleObject(440, topPosition),
    new CollectibleObject(1850, bottomPosition),
    new CollectibleObject(1920, bottomPosition),
    new CollectibleObject(1990, bottomPosition),
    new CollectibleObject(2800, bottomPosition),
    new CollectibleObject(2870, topPosition),
    new CollectibleObject(2940, topPosition),
    new CollectibleObject(3010, bottomPosition),
]

);
}