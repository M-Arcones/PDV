var Game ={
};


Game.Boot = function(game){
};


Game.Boot.prototype = {
	
	preload:function(){
		/*this.load.image('preloader_fondo','assets/Backgrounds/FondoPreload.png');
		this.load.image('preloader_bar','assets/Backgrounds/BarraCarga.png');*/
	},
	
	create:function(){
		//this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.game.physics.p2.setImpactEvents(true);
		this.state.start('Preloader');
	},
	update:function(){
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();		
	}

};