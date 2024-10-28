export default class Resources {
    static PlayerSheet = Resources.ImageFromUrl("./img/shadow_dog.png");
    static Background = Resources.ImageFromUrl("./img/background_single.png")
    static RavenSheet = Resources.ImageFromUrl("./img/raven.png")
    static WormSheet = Resources.ImageFromUrl("./img/enemy_worm.png")
    static BoomSheet = Resources.ImageFromUrl("./img/boom.png")


    static ImageFromUrl(url) {
        let img = new Image();
        img.src = url;
        return img;
    }
}
