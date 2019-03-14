Game.Preloader = function(game){
	this.preloadBar=null;
};

Game.Preloader.prototype={
	preload:function(){
		//Musica
		/*this.load.audio('menuMusic','assets/Sounds/MusicaInicioJuego_Menu.mp3');
		this.load.audio('batallaMusic','assets/Sounds/MusicaGameplay.mp3');*/

		//Menu Images
		/*this.load.image("fondoMenu", 'assets/Backgrounds/fondoMenu.png');*/
		
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
		this.load.image('Barrera1', 'assets/sprites/barrera1.png');
		this.load.image('Barrera2', 'assets/sprites/barrera2.png');
		this.load.image('Barrera3', 'assets/sprites/barrera3.png');
		this.load.image('Barrera4', 'assets/sprites/barrera4.png');
		this.load.spritesheet('invader1', 'assets/sprites/invader1.png', 52, 52, 2);
		this.load.spritesheet('invader2', 'assets/sprites/invader2.png', 52, 52, 2);
		this.load.spritesheet('invader3', 'assets/sprites/invader3.png', 52, 52, 2);
		this.load.spritesheet('nave_alien', 'assets/sprites/nave_alien.png', 192, 85, 2);
		
        /*this.background = this.add.image(0, 0, "preloader_fondo");
        this.background.height = this.game.height;
        this.background.width = this.game.width;*/
		this.stage.backgroundColor = "Black";
		
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
