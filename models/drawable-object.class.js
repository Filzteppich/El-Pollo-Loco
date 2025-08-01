class DrawableObject {
    x = 120;
    y = 100;
    img;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    


    constructor(){
      
}





loadImage(path){
    this.img = new Image();
    this.img.src = path;
}

loadImages(arr){
    arr.forEach((path) => {
    this.img = new Image();
    this.img.src = path;
    this.imageCache[path] = this.img;
    });
}




}