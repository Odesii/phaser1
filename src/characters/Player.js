import Phaser from '../lib/phaser.js'

export class Player {
    constructor(scene) {
        this.scene = scene; // Store the scene reference

        // Create the sprite and assign it to a class property
        this.sprite = scene.physics.add.sprite(32, 32, 'RogueWalk');
        
        // Create animations
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('RogueWalk', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'down',
            frames: scene.anims.generateFrameNumbers('RogueWalk', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'downRight',
            frames: scene.anims.generateFrameNumbers('RogueWalk', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('RogueWalk', { start: 4, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'downLeft',
            frames: scene.anims.generateFrameNumbers('RogueWalk', { start: 4, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'upRight',
            frames: scene.anims.generateFrameNumbers('RogueWalk', { start: 8, end: 11 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'up',
            frames: scene.anims.generateFrameNumbers('RogueWalk', { start: 8, end: 11 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'upLeft',
            frames: scene.anims.generateFrameNumbers('RogueWalk', { start: 12, end: 15 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('RogueIdle', { start: 2, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        // Define the attack animation
        scene.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNumbers('RogueAttack', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: 0  // Set repeat to 0 to play the animation once
        });

        // Add WASD input
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Store previous velocity and animation
        this.prevVelocityX = 0;
        this.prevVelocityY = 0;
        this.prevAnimation = '';

        // Add pointer down listener for left mouse button
        scene.input.on('pointerdown', this.handlePointerDown, this);
    }

    handlePointerDown = (pointer) => {
        if (pointer.leftButtonDown()) {
            this.attack();
        }
    }

    attack() {
        console.log('Attack triggered'); // Debug
        this.sprite.anims.stop();
        this.sprite.anims.play('attack', true);
        // Add attack logic here -- dealing damage to enemies
        // this.sprite.body.position to get the player's position
    }
    update() {
        const speed = 75;
        let velocityX = 0;
        let velocityY = 0;
    
        // Calculate velocities based on key input
        if (this.keys.left.isDown) velocityX = -1;
        if (this.keys.right.isDown) velocityX = 1;
        if (this.keys.up.isDown) velocityY = -1;
        if (this.keys.down.isDown) velocityY = 1;
    
        // Normalize diagonal velocity
        if (velocityX !== 0 || velocityY !== 0) {
            const length = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            velocityX = (velocityX / length) * speed;
            velocityY = (velocityY / length) * speed;
        }
    
        // Update velocity
        this.sprite.setVelocity(velocityX, velocityY);
    
        // Update animation state
        if (velocityX !== 0 || velocityY !== 0) {
            const animationKey = (velocityX > 0 ? 'right' : velocityX < 0 ? 'left' : velocityY > 0 ? 'down' : 'up');
            this.sprite.anims.play(animationKey, true);
        } else {
            this.sprite.anims.stop();
        }
    }
}
