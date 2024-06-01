import Phaser from '../lib/phaser.js'

export class Player {
    constructor(scene) {
        // Create the sprite and assign it to a class property
        this.sprite = scene.physics.add.sprite(32, 32, 'RougeWalk');
        
        // Create animations
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('RougeWalk', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'down',
            frames: scene.anims.generateFrameNumbers('RougeWalk', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'downRight',
            frames: scene.anims.generateFrameNumbers('RougeWalk', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
    
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('RougeWalk', { start: 4, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'downLeft',
            frames: scene.anims.generateFrameNumbers('RougeWalk', { start: 4, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
    
        scene.anims.create({
            key: 'upRight',
            frames: scene.anims.generateFrameNumbers('RougeWalk', { start: 8, end: 11 }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'up',
            frames: scene.anims.generateFrameNumbers('RougeWalk', { start: 8, end: 11 }),
            frameRate: 6,
            repeat: -1
        });

        scene.anims.create({
            key: 'upLeft',
            frames: scene.anims.generateFrameNumbers('RougeWalk', { start: 12, end: 15 }),
            frameRate: 6,
            repeat: -1
        });

        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('RougeIdle', { start: 2, end: 3 }),
            frameRate: 4,
            repeat: -1
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
    }
    update() {
        const speed = 75; // Movement speed
        let velocityX = 0;
        let velocityY = 0;
    
        // Calculate velocities based on key input
        if (this.keys.left.isDown) {
            velocityX = -1;
        } else if (this.keys.right.isDown) {
            velocityX = 1;
        }
    
        if (this.keys.up.isDown) {
            velocityY = -1;
        } else if (this.keys.down.isDown) {
            velocityY = 1;
        }
    
        // Normalize diagonal velocity
        if (velocityX !== 0 || velocityY !== 0) {
            const length = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            velocityX = (velocityX / length) * speed;
            velocityY = (velocityY / length) * speed;
        }
    
        // Velocity smoothing
        const smoothing = 0.2; // Adjust smoothing factor
        const lerp = (a, b, t) => a + (b - a) * t;
    
        velocityX = lerp(this.sprite.body.velocity.x, velocityX, smoothing);
        velocityY = lerp(this.sprite.body.velocity.y, velocityY, smoothing);
    
        // Update velocity
        this.sprite.setVelocity(velocityX, velocityY);
    
        // Update animation statedw
        if (velocityX !== 0 || velocityY !== 0) {
            if (velocityX > 0 && velocityY > 0) {
                this.sprite.anims.play('downRight', true);
            } else if (velocityX < 0 && velocityY > 0) {
                this.sprite.anims.play('downLeft', true);
            } else if (velocityX > 0 && velocityY < 0) {
                this.sprite.anims.play('upRight', true);
            } else if (velocityX < 0 && velocityY < 0) {
                this.sprite.anims.play('upLeft', true);
            } else if (velocityX > 0) {
                this.sprite.anims.play('right', true);
            } else if (velocityX < 0) {
                this.sprite.anims.play('left', true);
            } else if (velocityY > 0) {
                this.sprite.anims.play('down', true);
            } else if (velocityY < 0) {
                this.sprite.anims.play('up', true);
            }
        } else {
            this.sprite.anims.stop();
        }
    }
}