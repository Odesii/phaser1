import { CHARACTER_ASSET_KEY } from "../../assets/index.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./sceneKey.js";
import { Player } from "../characters/Player.js";

export class WorldScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.WORLD_SCENE
        });
    }

    preload() {
        const RoguePath = '../../assets/character/Rogue/RogueWalk.png';
        const RougeIdle = '../../assets/character/Rogue/RogueJump.png';
        // Load the tileset images
        this.load.image('Minifantasy_ForgottenPlainsTiles', '../../assets/map/Minifantasy_ForgottenPlainsTiles.png');
        this.load.image('OutdoorTileset', '../../assets/map/OutdoorTileset.png');

        // Load the tilemap JSON file
        this.load.tilemapTiledJSON('map', '../../assets/map/Map.tmj');

        // Load character assets
        this.load.spritesheet('RougeWalk', RoguePath, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('RougeIdle', RougeIdle, { frameWidth: 32, frameHeight: 32 });
    }

    create() {

        // Create the tilemap
        const map = this.make.tilemap({ key: 'map'});

        // Add the tilesets to the map (ensure the names match those used in Tiled)
        const tiles = map.addTilesetImage('Minifantasy_ForgottenPlainsTiles', 'Minifantasy_ForgottenPlainsTiles');
        const tiles1 = map.addTilesetImage('OutdoorTileset', 'OutdoorTileset');

        
        // Create layers from the tilemap (ensure the layer names match those in Tiled)

        //! the 0,0 is the x and y position of the layer and needs to be changed 
        const baseLayer = map.createLayer('base', tiles);
        const waterLayer = map.createLayer('water', tiles);
        const roadLayer = map.createLayer('roads', tiles);
        const underLayer = map.createLayer('under_build', tiles);
        const buildingLayer = map.createLayer('buildings', tiles);
        const castleLayer = map.createLayer('Castle_wall', tiles1);
        const doorLayer = map.createLayer('Castle_Door', tiles1);

        buildingLayer.setCollisionFromCollisionGroup();
        underLayer.setCollisionFromCollisionGroup();
        waterLayer.setCollisionFromCollisionGroup();
        castleLayer.setCollisionFromCollisionGroup();
        doorLayer.setCollisionFromCollisionGroup();

         // Set the world bounds
        const bounds = baseLayer.getBounds();
        this.physics.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
        // Create the player
        this.player = new Player(this);
        this.player.sprite.setScale(1);

        // Set up collision with the tilemap layers
        this.physics.add.collider(this.player.sprite, buildingLayer);
        this.physics.add.collider(this.player.sprite, underLayer);
        this.physics.add.collider(this.player.sprite, waterLayer);
        this.physics.add.collider(this.player.sprite, castleLayer);
        this.physics.add.collider(this.player.sprite, doorLayer);
        this.player.sprite.body.setSize(6 * 0.5, 8 * 0.5);

        // Set up the camera
        const camera = this.cameras.main;
        camera.startFollow(this.player.sprite, true, 0.1, 0.1, 0.06, 0.06);

        // Enable debug graphics
        this.debugGraphics = this.add.graphics().setAlpha(0.75);
        buildingLayer.renderDebug(this.debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(0, 155, 225, 255) // Color of colliding face edges
        });
        underLayer.renderDebug(this.debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255),
            faceColor: new Phaser.Display.Color(0, 255, 0, 255)
        });
        waterLayer.renderDebug(this.debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255),
            faceColor: new Phaser.Display.Color(0, 255, 0, 255)
        });
        castleLayer.renderDebug(this.debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255),
            faceColor: new Phaser.Display.Color(0, 255, 0, 255)
        });
        doorLayer.renderDebug(this.debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255),
            faceColor: new Phaser.Display.Color(0, 255, 0, 255)
        });
        
        console.log('create');
    }

    update() {
        console.log(this.player.update);
        this.player.update(); // Call the player's update method to handle movement
    }
}