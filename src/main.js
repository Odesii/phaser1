import Phaser from './lib/phaser.js'
import { SCENE_KEYS } from './scenes/sceneKey.js';
import { PreloadScene } from './scenes/preloadScene.js';
import { WorldScene } from './scenes/worldScene.js';

const config = {
    type: Phaser.AUTO,
    width: 240,
    height: 160,
    scene: [WorldScene],
    scale: {
        mode: Phaser.Scale.FILL,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    pixelArt: true,
    scene:[
        WorldScene,
    ],
    
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,

};

window.sizeChanged = () => {
    if (window.game.isBooted) {
      setTimeout(() => {
        window.game.scale.resize(window.innerWidth, window.innerHeight);
  
        window.game.canvas.setAttribute(
          'style',
          `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
        );
      }, 100);
    }
  };
  
  window.onresize = () => window.sizeChanged();

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});