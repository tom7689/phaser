import Phaser from 'phaser'
const GROUND_KEY = 'ground';
const Dude_KEY = 'dude';
export default class HelloWorldScene extends Phaser.Scene
{

    constructor()
    {
        super('game_scene')
        this.player = undefined
        this.cursors = undefined
    }

    preload()
    {
        this.load.image('sky', 'assets/sky.png')
        this.load.image(GROUND_KEY, 'assets/platform.png')
        this.load.image('star', 'assets/star.png')
        this.load.image('bomb', 'assets/bomb.png')
        this.load.spritesheet(Dude_KEY,
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        )
    }

    create()
    {
        this.add.image(400, 300, 'sky')

        const platforms = this.createPlatforms()
        this.player = this.createPlayer()
        this.physics.add.collider(this.player, this.platforms)

        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160)
            this.player.anims.play('left', true)
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160)
            this.player.anims.play('right', true)
        }
        else
        {
            this.player.setVelocityX(0)
            this.player.anims.play('turn')
        }
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330)
        }
    }
    createPlatforms()
    {
        const platforms = this.physics.add.staticGroup()

        platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()

        platforms.create(600, 400, GROUND_KEY)
        platforms.create(50, 250, GROUND_KEY)
        platforms.create(750, 220, GROUND_KEY)

        return platforms
    }

    createPlayer() {

        const player = this.physics.add.sprite(100, 450, Dude_KEY)
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(Dude_KEY, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [ { key: Dude_KEY, frame: 4 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(Dude_KEY, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })
        return player
    }
}
