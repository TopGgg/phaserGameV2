let scene = new Phaser.Scene("Game");
let level2 = new Phaser.Scene("Level2");
let level3 = new Phaser.Scene("Level3");
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [scene,level2,level3],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 400 }
        }
    }
};
var gameObjects;
const DeathCause = {
    ENEMY: 1
 };
 Object.freeze(DeathCause);

var game = new Phaser.Game(config);


scene.preload = function() {
    
    this.load.image('background','assets/Images/background.png');
    this.load.image('player','assets/Images/player.jpg');
    this.load.image('enemy','assets/Images/enemy.png');
    this.load.image('ground','assets/Images/platform.png');
    this.load.image('finish','assets/Images/finish.png');

};

scene.create = function() {
    this.gameObjects = this.add.group();
    this.grounds = this.add.group();
    this.enemies = this.add.group();
    this.bg = this.add.sprite(0,0,'background');
    let width = this.sys.game.config.width;
    let height = this.sys.game.config.height;
    this.bg.setPosition(width/2,height/2);
    this.ground = this.physics.add.staticImage(400, 568, 'ground').setScale(2).refreshBody();
    this.platform1 = this.physics.add.staticImage(200, 340, 'ground').setScale(1).refreshBody();
    this.player = this.add.sprite(50,height/1.5, 'player');
    this.player.depth = 10;
    this.player.setScale(2);
    this.finish = this.physics.add.staticImage(50,280,"finish").setScale(0.1).refreshBody();
    this.grounds.add(this.ground);
    this.grounds.add(this.platform1);
    this.enemy = this.add.sprite(width - 50,height/2,'enemy');
    this.enemy.setScale(0.1);
    this.physics.world.enable(this.player);
    //this.player.body.enable = false;
    
    this.physics.world.enable(this.enemy);
    this.gameObjects.add(this.enemy);
    this.gameObjects.add(this.player);
    this.enemies.add(this.enemy);
    this.firstUpdate = true;
    this.physics.add.collider(this.player,this.grounds, function() {
        scene.onGround = true;
    });
    this.physics.add.overlap(this.player, this.finish, function() {
        //Level 2
        console.log("Starting Scene 2");
        scene.scene.start('Level2', {caller: 'Game'});
    });
    this.physics.add.collider(this.gameObjects,this.grounds);
    this.physics.add.collider(this.player,this.enemy,function() {
        gameOver(DeathCause.ENEMY,scene.enemy,scene);
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.gameObjects.getChildren().forEach(function(item) {
        item.body.setCollideWorldBounds(true);
        item.onWorldBounds = true;
        
    },this); 
    //this.scene.transition({ target: 'sceneB', duration: 2000 });
}

scene.update = function() {
    

    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-200);

    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(200);
    }
    else
    {
        this.player.body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.setVelocityY(-300);
    }
    //Start Enemy Walk
    try {
        if(this.enemy.x == 42) {
            this.enemy.flipX = true;
        }else if(this.enemy.x == 758){
            this.enemy.flipX = false;
        }
        if(this.enemy.x <= 43 && this.enemy.flipX) {
            this.enemy.body.setVelocityX(180);
        }else if(this.enemy.x >= 43 && !this.enemy.flipX){
            this.enemy.body.setVelocityX(-180);
        }
    }catch(e) {

    }
    //End Enemy Walk
   this.onGround = false;
   this.enemies.getChildren().forEach(function(item) {
       item.y = 493.05;
     
    },this);
} 

function gameOver(deathcause, enemy,tscene) {
    if( tscene.player.body.touching.down && !tscene.onGround && deathcause == DeathCause.ENEMY) {
        console.log(enemy);
        enemy.body.enable = false;
        enemy.destroy();
        tscene.player.body.setVelocityY(-340);
            return;

    }
    let width = tscene.sys.game.config.width;
    let height = tscene.sys.game.config.height;
    tscene.add.text(width/2.8, height/3, 'Game Over', { fontFamily: 'Press', fontSize: 60 });
    
    tscene.gameObjects.getChildren().forEach(function(item) {

       try{
        item.body.enable = false;
       }catch(e) {
        console.log("Exception: " + e);
       }
        
    },this);
      
    
}


level2.preload = function() {
    this.load.image('background','assets/Images/background.png');
    this.load.image('player','assets/Images/player.jpg');
    this.load.image('enemy','assets/Images/enemy.png');
    this.load.image('ground','assets/Images/platform.png');
    this.load.image('finish','assets/Images/finish.png');
}

level2.create = function() {
    this.gameObjects = this.add.group();
    this.grounds = this.add.group();
    this.enemies = this.add.group();
    this.bg = this.add.sprite(0,0,'background');
    let width = this.sys.game.config.width;
    let height = this.sys.game.config.height;
    this.bg.setPosition(width/2,height/2);
    this.ground = this.physics.add.staticImage(400, 568, 'ground').setScale(2).refreshBody();
    this.platform1 = this.physics.add.staticImage(200, 340, 'ground').setScale(1).refreshBody();
    this.platform2 = this.physics.add.staticImage(600, 180, 'ground').setScale(1).refreshBody();
    this.player = this.add.sprite(50,height/1.5, 'player');
    this.player.depth = 10;
    this.player.setScale(2);
    this.finish = this.physics.add.staticImage(width - 50,120,"finish").setScale(0.1).refreshBody();
    this.grounds.add(this.ground);
    this.grounds.add(this.platform1);
    this.grounds.add(this.platform2);
    this.enemy = this.add.sprite(width - 50,height/2,'enemy');
    //this.enemy1 = this.add.sprite(width - 50,50,'enemy').setScale(0.1);
    this.enemy1 = this.add.sprite(50,250,'enemy').setScale(0.1);
    this.enemy.setScale(0.1);
    
    //this.player.body.enable = false;
    
   
    this.gameObjects.add(this.enemy);
    this.gameObjects.add(this.player);
    this.enemies.add(this.enemy);
    this.enemies.add(this.enemy1);
    this.gameObjects.add(this.enemy1);
    this.firstUpdate = true;
    this.physics.world.enable(this.gameObjects);
    this.physics.add.collider(this.player,this.grounds, function() {
        level2.onGround = true;
    });
    this.physics.add.overlap(this.player, this.finish, function() {
        //Level 2
        console.log("Starting Scene 3");
        scene.scene.start('Level3', {caller: 'Level2'});
    });
    this.physics.add.collider(this.gameObjects,this.grounds);
    this.physics.add.collider(this.player,this.enemy,function() {
        gameOver(DeathCause.ENEMY,level2.enemy,level2);
    });
    
    this.physics.add.collider(this.player,this.enemy1,function() {
        gameOver(DeathCause.ENEMY,level2.enemy1,level2);
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.gameObjects.getChildren().forEach(function(item) {
        item.body.setCollideWorldBounds(true);
        item.onWorldBounds = true;
        
    },this); 
}

level2.update = function() {
    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-180);

    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(180);
    }
    else
    {
        this.player.body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.setVelocityY(-300);
    }
    //Start Enemy Walk
    try {
        let width = this.sys.game.config.width;
        let height = this.sys.game.config.height;
            if(this.enemy.x == 42) {
                this.enemy.flipX = true;
            }else if(this.enemy.x == width - 42){
                this.enemy.flipX = false;
            }
            if(this.enemy.x <= 43 && this.enemy.flipX) {
                this.enemy.body.setVelocityX(180);
            }else if(this.enemy.x >= 43 && !this.enemy.flipX){
                this.enemy.body.setVelocityX(-180);
            }

            

    }catch(e) {
        
    }

    try {
        if(this.enemy1.x <= 43 && this.enemy1.flipX) {
            this.enemy1.body.setVelocityX(180);
        }else if(this.enemy1.x >= 43 && !this.enemy1.flipX){
            this.enemy1.body.setVelocityX(-180);
        }

        if(this.enemy1.x == 42) 
            this.enemy1.flipX = true;
        else if(this.enemy1.x == 345)
            this.enemy1.flipX = false;
    }catch(e) {
        console.log(e)
    }
    //End Enemy Walk
    
   this.onGround = false;
   
}

