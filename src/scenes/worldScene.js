import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./sceneKey.js";


export class WorldScene extends Phaser.Scene {

    constructor() {
        super({
            key: SCENE_KEYS.WORLD_SCENE});
    };

    preload(){
        // Load the tileset images
        this.load.image('Minifantasy_ForgottenPlainsTiles', '../../assets/map/Minifantasy_ForgottenPlainsTiles.png');
        this.load.image('OutdoorTileset', '../../assets/map/OutdoorTileset.png');

        // Load the tilemap JSON file
        this.load.tilemapTiledJSON('map', '../../assets/map/Map.tmj');
    }

    create(){
        // Create the tilemap
        const map = this.make.tilemap({ key: 'map' });

        // Add the tilesets to the map (ensure the names match those used in Tiled)
        const tiles = map.addTilesetImage('Minifantasy_ForgottenPlainsTiles', 'Minifantasy_ForgottenPlainsTiles');
        const tiles1 = map.addTilesetImage('OutdoorTileset', 'OutdoorTileset');

        // Create layers from the tilemap (ensure the layer names match those in Tiled)
        const baseLayer = map.createLayer('base', tiles);
        const waterLayer = map.createLayer('water', tiles);
        const roadLayer = map.createLayer('roads', tiles);
        const underLayer = map.createLayer('under_build', tiles);
        const buildingLayer = map.createLayer('buildings', tiles);
        const castleLayer = map.createLayer('Castle_wall', tiles1);
        const doorLayer = map.createLayer('Castle_Door', tiles1);
        
        console.log('create');
    }

    update(){
        console.log('update');
    }
}



