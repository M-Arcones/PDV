Game.Violento = function(game){
};

var valor_edad;
var tipo_nave;

var nave;
var enemigos;
var balas;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var puntuacion = 0;
var TextoPuntos = 'Puntos : ';
var TextoPuntuacion;
var vidas;
var enemyBullet;
var tiempoDisparo = 0;
var TextoFinal;
var arrayEnemigos = [];
var filas_enemigo=3;
var columnas_enemigo=10;

Game.Violento.prototype ={
	init:function(edad, nave){
		valor_edad=edad;
		tipo_nave=nave;
	},
	
	create:function(){
		puntuacion = 0;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.stage.backgroundColor = "Black";

		balas = game.add.group();
		balas.enableBody = true;
		balas.physicsBodyType = Phaser.Physics.ARCADE;
		balas.createMultiple(30, 'Bala_nave');
		balas.setAll('anchor.x', 0.5);
		balas.setAll('anchor.y', 1);
		balas.setAll('outOfBoundsKill', true);
		balas.setAll('checkWorldBounds', true);

		balasEnemigo = game.add.group();
		balasEnemigo.enableBody = true;
		balasEnemigo.physicsBodyType = Phaser.Physics.ARCADE;
		balasEnemigo.createMultiple(30, 'Bala_invaders');
		balasEnemigo.setAll('anchor.x', 0.5);
		balasEnemigo.setAll('anchor.y', 1);
		balasEnemigo.setAll('outOfBoundsKill', true);
		balasEnemigo.setAll('checkWorldBounds', true);

		barrera1 = game.add.sprite(50, 400, 'Barrera1');
		game.physics.enable(barrera1, Phaser.Physics.ARCADE);
		barrera1.scale.setTo(3,1.5);
		barrera1.vida=4;

		barrera2 = game.add.sprite(250, 400, 'Barrera1');
		game.physics.enable(barrera2, Phaser.Physics.ARCADE);
		barrera2.scale.setTo(3,1.5);
		barrera2.vida=4;
		
		barrera3 = game.add.sprite(450, 400, 'Barrera1');
		game.physics.enable(barrera3, Phaser.Physics.ARCADE);
		barrera3.scale.setTo(3,1.5);
		barrera3.vida=4;
		
		barrera4 = game.add.sprite(650, 400, 'Barrera1');
		game.physics.enable(barrera4, Phaser.Physics.ARCADE);
		barrera4.scale.setTo(3,1.5);
		barrera4.vida=4;
		
		nave = game.add.sprite(400, 500, tipo_nave);
		nave.anchor.setTo(0.5, 0.5);
		game.physics.enable(nave, Phaser.Physics.ARCADE);

		enemigos = game.add.group();
		enemigos.enableBody = true;
		enemigos.physicsBodyType = Phaser.Physics.ARCADE;

		this.IniciarEnemigos();

		//  The score
		TextoPuntuacion = game.add.text(10, 10, TextoPuntos + puntuacion, { font: '24px Press Start 2P', fill: '#fff' });

		//  Lives
		vidas = game.add.group();
		game.add.text(game.world.width - 140, 10, 'Vidas: ', { font: '24px Press Start 2P', fill: '#fff' });

		//  Text
		TextoFinal = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '35px Press Start 2P', fill: '#fff' });
		TextoFinal.anchor.setTo(0.5, 0.5);
		TextoFinal.visible = false;

		for (var i = 0; i < 1; i++) 
		{
			var ship = vidas.create(game.world.width - 50 + (30 * i), 60, 'Life');
			ship.anchor.setTo(0.2, 0.5);
			ship.scale.setTo(0.1,0.1);
			ship.alpha = 0.8;
		}

		//  An explosion pool
		explosions = game.add.group();
		explosions.createMultiple(30, 'Explosion');
		explosions.forEach(this.setupInvader, this);

		//  And some controls to play the game with
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	
	IniciarEnemigos:function() {
		for (var y = 0; y < filas_enemigo; y++)
		{
			for (var x = 0; x < columnas_enemigo; x++)
			{
				var enemigo = enemigos.create(15+(x * 48+ x*20) , y * 50+ y*25, 'invader1');
				enemigo.anchor.setTo(0.5, 0.5);
				enemigo.animations.add('fly', [ 0, 1], 3, true);
				enemigo.play('fly');
				enemigo.body.moves = false;
			}
		}

		enemigos.x = 10;
		enemigos.y = 50;

		var tween = game.add.tween(enemigos).to( { x: 150 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween.onComplete.add(this.descend, this);
	},
	
	
	revivirEnemigos:function() {
		
		this.tweens.removeAll()
		enemigos.destroy();
		enemigos = game.add.group();
		enemigos.enableBody = true;
		enemigos.physicsBodyType = Phaser.Physics.ARCADE;
		
		for (var y = 0; y < filas_enemigo; y++)
		{
			for (var x = 0; x < columnas_enemigo; x++)
			{
				var enemigo = enemigos.create(15+(x * 48+ x*20) , y * 50+ y*25, 'invader1');
				enemigo.anchor.setTo(0.5, 0.5);
				enemigo.animations.add('fly', [ 0, 1], 3, true);
				enemigo.play('fly');
				enemigo.body.moves = false;
			}
		}

		enemigos.x = 10;
		enemigos.y = 50;
		
		var tween = game.add.tween(enemigos).to( { x: 150 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween.onComplete.add(this.descend, this);
	},
	
	setupInvader:function (invader) {
		invader.anchor.x = 0.5;
		invader.anchor.y = 0.5;
		invader.animations.add('Explosion');
	},
	
	descend:function() {
		enemigos.y += 10;
		var tween = game.add.tween(enemigos).to( { x: 150 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween.onComplete.add(this.descend, this);
	},	

	update:function() {

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();		

		if (nave.alive)
		{
			nave.body.velocity.setTo(0, 0);

			if (cursors.left.isDown)
			{
				nave.body.velocity.x = -200;
			}
			else if (cursors.right.isDown)
			{
				nave.body.velocity.x = 200;
			}
			if (cursors.up.isDown)
			{
				nave.body.velocity.y = -200;
			}
			else if (cursors.down.isDown)
			{
				nave.body.velocity.y = 200;
			}
			
			if (fireButton.isDown)
			{
				this.fireBullet();
			}

			if (game.time.now > tiempoDisparo)
			{
				this.enemyFires();
			}

			if(enemigos.countLiving()==0){
				/*enemigos.callAll('revive');
				enemigos.position.x=10;
				enemigos.position.y=50;*/
				this.revivirEnemigos()
			}
			
			//colision de barreras con balas enemigas
			game.physics.arcade.overlap(barrera1, balasEnemigo, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera2, balasEnemigo, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera3, balasEnemigo, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera4, balasEnemigo, this.collisionbar, null, this);
			
			//colision de barreras con balas propias
			game.physics.arcade.overlap(barrera1, balas, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera2, balas, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera3, balas, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera4, balas, this.collisionbar, null, this);
			
			//colisones de enemigos con balas
			game.physics.arcade.overlap(balas, enemigos, this.collisionHandler, null, this);
			
			//colisones propias con balas
			game.physics.arcade.overlap(balasEnemigo, nave, this.enemyHitsPlayer, null, this);
			
			//colison de enemigos con barreras
			game.physics.arcade.overlap(barrera1, enemigos, this.collisionbar_ali, null, this);
			game.physics.arcade.overlap(barrera2, enemigos, this.collisionbar_ali, null, this);
			game.physics.arcade.overlap(barrera3, enemigos, this.collisionbar_ali, null, this);
			game.physics.arcade.overlap(barrera4, enemigos, this.collisionbar_ali, null, this);	
			
			//colision de enemigos con nave
			game.physics.arcade.overlap(enemigos, nave, this.collisionbar_player, null, this);
			
			//colision de nave con barreras
			game.physics.arcade.overlap(barrera1, nave, this.collisionbar_nave, null, this);
			game.physics.arcade.overlap(barrera2, nave, this.collisionbar_nave, null, this);
			game.physics.arcade.overlap(barrera3, nave, this.collisionbar_nave, null, this);
			game.physics.arcade.overlap(barrera4, nave, this.collisionbar_nave, null, this);
		}
	},
	
	collisionbar_nave:function(barrera, nave){
		barrera.kill();

		live = vidas.getFirstAlive();
		if (live)
		{
			live.kill();
		}

		var explosion = explosions.getFirstExists(false);
		explosion.reset(nave.body.x +30, nave.body.y +30);
		explosion.play('Explosion', 30, false, true);

		if (vidas.countLiving() < 1)
		{
			nave.kill();
			balasEnemigo.callAll('kill');

			TextoFinal.text=" GAME OVER \n Click para volver\n al menu";
			TextoFinal.visible = true;

			game.input.onTap.addOnce(this.Volver_menu,this);
		}	
	},

	collisionbar_ali:function(barrera, enemigo){
		barrera.kill();
	},
	
	collisionbar_player:function(nave, enemigos){

		do{
			live = vidas.getFirstAlive();
			live.kill();
			nave.kill();
		}while (vidas.countLiving()>1);
		
		var explosion = explosions.getFirstExists(false);
		explosion.reset(nave.body.x +30, nave.body.y +30);
		explosion.play('Explosion', 30, false, true);
		
		TextoFinal.text=" GAME OVER \n Click para volver al menu";
		TextoFinal.visible = true;

		game.input.onTap.addOnce(this.Volver_menu,this);
	},

	enemyHitsPlayer:function (nave,bullet) {
		
		bullet.kill();

		live = vidas.getFirstAlive();
		if (live)
		{
			live.kill();
		}

		var explosion = explosions.getFirstExists(false);
		explosion.reset(nave.body.x +30, nave.body.y +30);
		explosion.play('Explosion', 30, false, true);

		if (vidas.countLiving() < 1)
		{
			nave.kill();
			balasEnemigo.callAll('kill');

			TextoFinal.text=" GAME OVER \n Click para volver\n al menu";
			TextoFinal.visible = true;

			game.input.onTap.addOnce(this.Volver_menu,this);
		}
	},
	
	collisionbar:function(barrera, balasEnemigo){
		balasEnemigo.kill();
		switch(barrera.vida){
			case 4:
				barrera.vida--;
				barrera.loadTexture('Barrera2');
				break;
			case 3:
				barrera.vida--;
				barrera.loadTexture('Barrera3');
				break;
			case 2:
				barrera.vida--;
				barrera.loadTexture('Barrera4');
				break;
			case 1:
				barrera.vida--;
				barrera.kill();
				break;
		}
	},
	
	collisionHandler:function  (bullet, enemigo) {

		bullet.kill();
		enemigo.kill();

		puntuacion += 100;
		TextoPuntuacion.text = TextoPuntos + puntuacion;

		var explosion = explosions.getFirstExists(false);
		explosion.reset(enemigo.body.x +30, enemigo.body.y+30);
		explosion.play('Explosion', 30, false, true);

/*		if (enemigos.countLiving() == 0)
		{
			puntuacion += 100;
			TextoPuntuacion.text = TextoPuntos + puntuacion;

			balasEnemigo.callAll('kill',this);
			TextoFinal.text = " Ganaste, \n Puntuacion:" + puntuacion;
			TextoFinal.visible = true;

			game.input.onTap.addOnce(this.Volver_menu,this);
		}*/
	},


	enemyFires:function() {

		enemyBullet = balasEnemigo.getFirstExists(false);

		arrayEnemigos.length=0;

		enemigos.forEachAlive(function(enemigo){

			arrayEnemigos.push(enemigo);
		});
		if (enemyBullet && arrayEnemigos.length > 0)
		{
			var random=game.rnd.integerInRange(0,arrayEnemigos.length-1);

			var shooter=arrayEnemigos[random];
			enemyBullet.reset(shooter.body.x, shooter.body.y);

			/*game.physics.arcade.moveToObject(enemyBullet,player,120);*/
			enemyBullet.body.velocity.y = 200;
			tiempoDisparo = game.time.now + 1000;
		}
	},

	fireBullet:function() {

		if (game.time.now > bulletTime)
		{
			bullet = balas.getFirstExists(false);

			if (bullet)
			{
				bullet.reset(nave.x, nave.y + 8);
				bullet.body.velocity.y = -400;
				bulletTime = game.time.now + 600;
			}
		}
	},

	resetBullet:function(bullet) {
		bullet.kill();
	},

	Volver_menu: function  () {
		this.state.start('MainMenu',true, false, valor_edad, tipo_nave);		
	},
	render:function() {
		game.debug.text('normal baddies: ' + enemigos.position.x, 16, 60);
	}
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	