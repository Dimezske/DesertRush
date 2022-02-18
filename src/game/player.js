import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key, frame) {
    super(scene, x, y, 'player-sprite', 0);
        this.scene.add.existing(this);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.setScale(0.5);
        this.setCollideWorldBounds(true);
        //this.scene.cameras.main.startFollow(this);
        this.setVisible(true);
        this.keys = {
                duck: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
                attack: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
                clingOn: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
                clingOff: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        };    
}
__ani_setup(){
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player-sprite', {start: 0, end: 0 }),
        frameRate: 15
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player-sprite', { start: 1, end: 3 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player-sprite', { start: 4, end: 6 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('player-sprite', { start: 0, end: 0 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'duck-left',
        frames: this.anims.generateFrameNumbers('player-sprite', { start: 8, end: 8 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'duck',
        frames: this.anims.generateFrameNumbers('player-sprite', { start: 7, end: 7 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'duck-right',
        frames: this.anims.generateFrameNumbers('player-sprite', { start: 9, end: 9 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'cling-left',
        frames: this.anims.generateFrameNumbers('player-sprite', { start: 10, end: 10 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'cling-right',
        frames: this.anims.generateFrameNumbers('player-sprite', { start: 11, end: 11 }),
        frameRate: 10
    });
}
control_handler(){
    let isnotdown = true;
    
    if (this.cursors.left.isDown) {
        this.body.setVelocityX(-160);
        this.anims.play('left', true);
       //isnotdown = false;
    } 
    if (this.cursors.right.isDown) {
        this.body.setVelocityX(160);
        this.anims.play('right', true);
        //isnotdown = false;
    }
    else if (this.cursors.down.isDown) {
        this.body.setVelocityX(0);
        this.anims.play('duck');
        //isnotdown = false;
    }
    else if (this.cursors.up.isDown && this.body.touching.down){
        this.scene.sound.play('jump')
            this.body.setVelocityY(-330);
            //isnotdown = false;
    }
    if (this.cursors.down.isDown && this.cursors.left.isDown){
        this.body.setVelocityX(-80);
        this.anims.play('duck-left', true);
        //isnotdown = false;
    }
    if (this.cursors.down.isDown && this.cursors.right.isDown){
        this.body.setVelocityX(80);
        this.anims.play('duck-right', true);
        //isnotdown = false;
    }
    else if(!this.cursors.down.isdown || !this.cursors.up.isdown || !this.cursors.left.isdown || !this.cursors.right.isdown)
    {
        isnotdown = true
    }   
    //----------------Clinging Cliff Hang------------------------------
    if(this.keys['clingOn'].isDown ) {
        console.log('is clinging')
        this.body.setAcceleration(0,0)	
    }
    if(this.keys['clingOff'].isDown)	{	
        console.log('is not clinging')
        this.body.setAcceleration(0,0)	
    }
    if(this.keys['clingOn'].isDown && this.body.touching.left) {
        this.isClinging = true
        this.body.setVelocityY(0,0),
        this.body.setVelocityX(0,0),
        this.anims.play('cling-left');
        if (this.isClinging) {
            this.anims.play('cling-left',false);
        }
    }
    if(this.keys['clingOn'].isDown && this.body.touching.right) {
        this.isClinging = true
        this.body.setVelocityY(0,0),
        this.body.setVelocityX(0,0),
        this.anims.play('cling-right');
        if (this.isClinging){
            this.anims.play('cling-right',false);
        }
    }
    //----------------ClimbUp-------------------------
    /*
    if(this.keys['clingOn'].isDown && this.scene.physics.overlap(this, this.platforms)) {
        this.body.setAcceleration(0,0)
    }
    cliffHang() {
        if (this.keys['clingOn'].isDown && this.body.touching.left && this.keys['jump'].isDown) {
            this.sound.play('cling')
                    if(this.keys['jump'].isDown) {
                    climbUp();
                }
        }
        else if (this.keys['clingOn'].isDown && this.body.touching.right && this.keys['jump'].isDown) {
            this.sound.play('cling')
                this.body.setVelocityY(-50)
                if(this.keys['jump'].isDown) {
                    climbUp();
                }
        }
        else if (this.keys['clingOff'].isDown) {

        }*/
}   
}