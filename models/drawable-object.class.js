/**
 * @class DrawableObject
 */
class DrawableObject {
    x = 120;
    y = 100;
    img;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    

    constructor(){
      
}


/**
 * @description Loads an image from the specified path and sets it as the current image.
 * @param {*} path path of the image to load
 * @memberof DrawableObject
 */
loadImage(path){
    this.img = new Image();
    this.img.src = path;
}


/**
 * @description Loads multiple images from the specified array of paths.
 * @param {*} arr array of image paths to load
 * @memberof DrawableObject
 */
loadImages(arr){
    arr.forEach((path) => {
    this.img = new Image();
    this.img.src = path;
    this.imageCache[path] = this.img;
    });
}

}