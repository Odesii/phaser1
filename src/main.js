import Phaser from './lib/phaser.js'
import { SCENE_KEYS } from './scenes/sceneKey.js';
import { PreloadScene } from './scenes/preloadScene.js';
import { WorldScene } from './scenes/worldScene.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [WorldScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    parent: 'game-container',
    scene:[
        WorldScene,
    ]
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

//these are for manually adding the scene and starting 
// game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene)
// game.scene.start(SCENE_KEYS.PRELOAD_SCENE);

