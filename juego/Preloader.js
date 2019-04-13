Game.Preloader = function(game){
	this.preloadBar=null;
};

Game.Preloader.prototype={
	preload:function(){
		//Sonidos
		this.load.audio('invaderkilled','assets/Sounds/invaderkilled.wav');
		this.load.audio('shoot_player','assets/Sounds/shoot_player.wav');
		this.load.audio('hit_player','assets/Sounds/explosion.wav');
		this.load.audio('shoot_ship','assets/Sounds/shoot_ship.wav');
		this.load.audio('golpe_barrera','assets/Sounds/golpe_barrera.wav');
		this.load.audio('ship_move','assets/Sounds/ship_move.wav');
		this.load.audio('destroy_ship','assets/Sounds/destroy_ship.mp3');
		this.load.audio('drop','assets/Sounds/drop.mp3');
		this.load.audio('shot_invader','assets/Sounds/shot_invader.mp3');

		//Musica
		this.load.audio('Musica1','assets/Sounds/Musica1.ogg');
		this.load.audio('Musica2','assets/Sounds/Musica2.ogg');
		this.load.audio('Musica3','assets/Sounds/Musica3.ogg');
		this.load.audio('Musica4','assets/Sounds/Musica4.ogg');
		this.load.audio('Musica5','assets/Sounds/Musica5.ogg');
		
		//Menu Images
		this.load.image("fondoMain", 'assets/Backgrounds/fondoMain.png');
		
		//Game Images
		
		this.load.image('Boton', 'assets/sprites/botonTipo1.png');
		this.load.image('Nave1', 'assets/sprites/nave1.png');
		this.load.image('Nave2', 'assets/sprites/nave2.png');
		this.load.image('Nave3', 'assets/sprites/nave3.png');
		this.load.image('Life', 'assets/sprites/life.png');
		this.load.image('Bala_invaders', 'assets/sprites/bala_invaders.png');
		this.load.image('bala_nave_alien', 'assets/sprites/bala_nave_alien.png');
		this.load.image('Bala_nave', 'assets/sprites/bala_nave.png');
		this.load.image('Explosion', 'assets/sprites/explosion.png');
		this.load.image('buff1', 'assets/sprites/buff1.png');
		this.load.image('buff2', 'assets/sprites/buff2.png');
		this.load.image('buff3', 'assets/sprites/buff3.png');
		this.load.image('Barrera1', 'assets/sprites/barrera1.png');
		this.load.image('Barrera2', 'assets/sprites/barrera2.png');
		this.load.image('Barrera3', 'assets/sprites/barrera3.png');
		this.load.image('Barrera4', 'assets/sprites/barrera4.png');
		this.load.spritesheet('invader1', 'assets/sprites/invader1.png', 52, 52, 2);
		this.load.spritesheet('invader2', 'assets/sprites/invader2.png', 52, 52, 2);
		this.load.spritesheet('invader3', 'assets/sprites/invader3.png', 52, 52, 2);
		this.load.spritesheet('nave_alien', 'assets/sprites/nave_alien.png', 192, 85, 2);
		this.load.spritesheet('Menu_pausa', 'assets/sprites/Menu_pausa.png', 400, 200);
		this.load.spritesheet('salir', 'assets/sprites/salir.png', 100, 100);
		this.load.spritesheet('continuar', 'assets/sprites/continuar.png', 100, 100);
		this.load.spritesheet('Sonido_SI', 'assets/sprites/Sonido_SI.png', 100, 100);
		this.load.spritesheet('Sonido_NO', 'assets/sprites/Sonido_NO.png', 100, 100);
		
        this.background = this.add.image(0, 0, "fondo");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		/*this.stage.backgroundColor = "Black";*/
		
		this.preloadBar=this.add.sprite(this.world.centerX,this.world.centerY + this.world.centerY/2,'preloader_bar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.preloadBar.scale.x *= 0.5;
		this.time.advancedTiming = true;
			
		
		this.load.setPreloadSprite(this.preloadBar);
	},

	update:function(){
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();		
	},

	create:function(){
		this.state.start('Edad');
	}
};
