/**
 * @class Level
 * @extends {DrawableObject}
 */
class Level {
    enemies;
    backgroundObject;
    clouds;
    level_end_x = 3650;
    bottles;

/**
 * Creates an instance of Level.
 * @param {*} enemies the enemies in the level
 * @param {*} backgroundObject the background object of the level
 * @param {*} clouds the clouds in the level
 * @param {*} bottles the bottles in the level
 * @param {*} coins the coins in the level
 * @memberof Level
 */
constructor(enemies, backgroundObject, clouds, bottles, coins){
        this.enemies = enemies;
        this.backgroundObject = backgroundObject;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
    }




}