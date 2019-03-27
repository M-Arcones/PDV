Game.Violento = function(game){
};

var valor_edad;
var tipo_nave;
var rebote_bala;
var Puntuacion_violento;
var min_punutacion_violento;
var Puntuacion_no_violento;

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
var arraybalas = [];
var filas_enemigo=3;
var columnas_enemigo=10;
var control_tiempo=0;
var contador_golpes_barrera=0;
var tiempo_entre_golpes=0.075;
var arrayColores = ["0x40FF00", "0xFF0040", "0x58ACFA", "0xF4FA58","0xE2A9F3","0xB43104","0xE6E6E6","0xFFFFFFF","0xFF00FF"];

Game.Violento.prototype ={
	init:function(edad, nave, rebotes,P_violento,P_no_violento){
		valor_edad=edad;
		tipo_nave=nave;
		rebote_bala=rebotes;
		Puntuacion_violento=P_violento;
		Puntuacion_no_violento=P_no_violento;
		min_punutacion_violento=Puntuacion_violento[4].split('|');
	},
	
	create:function(){
		Tiempo_nave_alien=this.time.create();
		Tiempo1=Tiempo_nave_alien.add(Phaser.Timer.SECOND * 5, this.moverNaveAlien);
		Tiempo_nave_alien.start();
		
		puntuacion = 0;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		/*this.stage.backgroundColor = "Black";*/
        this.background = this.add.image(0, 0, "fondo");
        this.background.height = this.game.height;
        this.background.width = this.game.width;

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
		if(rebote_bala=='On'){
			balasEnemigo.tiempo=0;
		}else{
			balasEnemigo.setAll('outOfBoundsKill', true);
		}
		balasEnemigo.setAll('checkWorldBounds', true);

		balas_nave_alien = game.add.group();
		balas_nave_alien.enableBody = true;
		balas_nave_alien.physicsBodyType = Phaser.Physics.ARCADE;
		balas_nave_alien.createMultiple(35, 'bala_nave_alien');
		balas_nave_alien.setAll('anchor.x', 0.5);
		balas_nave_alien.setAll('anchor.y', 1);
		balas_nave_alien.setAll('outOfBoundsKill', true);
		balas_nave_alien.setAll('checkWorldBounds', true);
		
		Buff1 = game.add.group();
		Buff1.enableBody = true;
		Buff1.physicsBodyType = Phaser.Physics.ARCADE;
		Buff1.createMultiple(5, 'buff1');
		Buff1.setAll('anchor.x', 0.5);
		Buff1.setAll('anchor.y', 1);
		Buff1.setAll('outOfBoundsKill', true);
		Buff1.setAll('checkWorldBounds', true);

		Buff2 = game.add.group();
		Buff2.enableBody = true;
		Buff2.physicsBodyType = Phaser.Physics.ARCADE;
		Buff2.createMultiple(1, 'buff2');
		Buff2.setAll('anchor.x', 0.5);
		Buff2.setAll('anchor.y', 1);
		Buff2.setAll('outOfBoundsKill', true);
		Buff2.setAll('checkWorldBounds', true);	

		Buff3 = game.add.group();
		Buff3.enableBody = true;
		Buff3.physicsBodyType = Phaser.Physics.ARCADE;
		Buff3.createMultiple(1, 'buff3');
		Buff3.setAll('anchor.x', 0.5);
		Buff3.setAll('anchor.y', 1);
		Buff3.setAll('outOfBoundsKill', true);
		Buff3.setAll('checkWorldBounds', true);		
		
		nave_alien = game.add.sprite(-50, -50, 'nave_alien');
		game.physics.enable(nave_alien, Phaser.Physics.ARCADE);
		nave_alien.scale.setTo(0.5,0.5);
		nave_alien.tipo=1;
		//nave_alien.vida=4;
		
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
	
	moverNaveAlien:function(){
		if(nave_alien.alive==false){
			nave_alien.revive();
		}
		Tiempo_nave_alien.destroy();
		nave_alien.x = -10;
		nave_alien.y = 10;
		control_tiempo=0;
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
				enemigo.tipo=0;
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
				enemigo.tipo=0;
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
			if(nave_alien.body.x>=650 && control_tiempo==0){
				Tiempo_nave_alien=this.time.create();
				Tiempo1=Tiempo_nave_alien.add(Phaser.Timer.SECOND * 10, this.moverNaveAlien);
				Tiempo_nave_alien.start();
				control_tiempo=1;
			}
			nave_alien.body.velocity.x = 200;
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
				this.nave_alien_Fires();
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
			
			//colision de barreras con balas enemigas
			game.physics.arcade.overlap(barrera1, balas_nave_alien, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera2, balas_nave_alien, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera3, balas_nave_alien, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera4, balas_nave_alien, this.collisionbar, null, this);			
			
			//colision de barreras con balas propias
			game.physics.arcade.overlap(barrera1, balas, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera2, balas, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera3, balas, this.collisionbar, null, this);
			game.physics.arcade.overlap(barrera4, balas, this.collisionbar, null, this);
			
			//colisones de enemigos con balas
			game.physics.arcade.overlap(balas, enemigos, this.collisionHandler, null, this);
			game.physics.arcade.overlap(balas, nave_alien, this.collisionHandler, null, this);
			
			//colisones propias con balas
			game.physics.arcade.overlap(balasEnemigo, nave, this.enemyHitsPlayer, null, this);
			game.physics.arcade.overlap(balas_nave_alien, nave, this.enemyHitsPlayer, null, this);
			
			//colison de enemigos con barreras
			game.physics.arcade.overlap(barrera1, enemigos, this.collisionbar_ali, null, this);
			game.physics.arcade.overlap(barrera2, enemigos, this.collisionbar_ali, null, this);
			game.physics.arcade.overlap(barrera3, enemigos, this.collisionbar_ali, null, this);
			game.physics.arcade.overlap(barrera4, enemigos, this.collisionbar_ali, null, this);	
			
			//colision de enemigos con nave
			game.physics.arcade.overlap(enemigos, nave, this.collisionbar_player, null, this);
			
			//colision de buff1 con nave
			game.physics.arcade.overlap(Buff1, nave, this.collisionbar_buff1, null, this);
			//colision de buff2 con nave
			game.physics.arcade.overlap(Buff2, nave, this.collisionbar_buff2, null, this);
			//colision de buff3 con nave
			game.physics.arcade.overlap(Buff3, nave, this.collisionbar_buff3, null, this);
			
			
			//colision de nave con barreras
			game.physics.arcade.overlap(barrera1, nave, this.collisionbar_nave, null, this);
			game.physics.arcade.overlap(barrera2, nave, this.collisionbar_nave, null, this);
			game.physics.arcade.overlap(barrera3, nave, this.collisionbar_nave, null, this);
			game.physics.arcade.overlap(barrera4, nave, this.collisionbar_nave, null, this);

			if(rebote_bala=='On'){
				arraybalas.length=0;
				balasEnemigo.forEachAlive(function(balasEnemigo){
					//arrayEnemigos.push(enemigo);
					arraybalas.push(balasEnemigo);
				});
				
				for(i=0;i<arraybalas.length-1;i++){
					arraybalas[i].tiempo++;
					if(arraybalas[i].tiempo>300){
						arraybalas[i].tiempo=0;
						arraybalas[i].kill();
					}
					if(arraybalas[i].body.y>=550){
						arraybalas[i].body.velocity.y = -200;
						var randir=game.rnd.integerInRange(0,1);
						if(randir==1){
							arraybalas[i].body.velocity.x = 100;
							
						}else{
							arraybalas[i].body.velocity.x = -100;
						}
						//Rotar sprite
					};
				}
			}
		}
	},

	collisionbar_buff1:function(nave, Buff1){
		Buff1.kill();
		puntuacion=puntuacion+500;
		TextoPuntuacion.text = TextoPuntos + puntuacion;
	},	

	collisionbar_buff2:function(nave, Buff2){
		Buff2.kill();
		
		barrera1.revive();
		barrera1.vida=4;
		barrera1.loadTexture('Barrera1');
		
		barrera2.revive();
		barrera2.vida=4;
		barrera2.loadTexture('Barrera1');
		
		barrera3.revive();
		barrera3.vida=4;
		barrera3.loadTexture('Barrera1');
		
		barrera4.revive();
		barrera4.vida=4;
		barrera4.loadTexture('Barrera1');
	},	
	
	
	collisionbar_buff3:function(nave, Buff3){
		Buff3.kill();
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

			if(min_punutacion_violento[1]<puntuacion){
				TextoFinal.text=" GAME OVER \n Nuevo RECORD\n al menu";
				TextoFinal.visible = true;
				game.input.onTap.addOnce(this.Guardar_puntos,this);
			}else{
				TextoFinal.text=" GAME OVER \n Click para volver\n al menu";
				TextoFinal.visible = true;
				game.input.onTap.addOnce(this.Volver_menu,this);
			}
		}	
	},

	collisionbar_ali:function(barrera, enemigo){
		barrera.kill();
	},
	
	collisionbar_player:function(nave, enemigos){
		do{
			live = vidas.getFirstAlive();
			if (live)
			{
				live.kill();
			}
			nave.kill();
		}while (vidas.countLiving()>1);
		
		var explosion = explosions.getFirstExists(false);
		explosion.reset(nave.body.x +30, nave.body.y +30);
		explosion.play('Explosion', 30, false, true);

		if(min_punutacion_violento[1]<puntuacion){
			TextoFinal.text=" GAME OVER \n Nuevo RECORD\n al menu";
			TextoFinal.visible = true;
			game.input.onTap.addOnce(this.Guardar_puntos,this);
		}else{
			TextoFinal.text=" GAME OVER \n Click para volver\n al menu";
			TextoFinal.visible = true;
			game.input.onTap.addOnce(this.Volver_menu,this);
		}
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

			if(min_punutacion_violento[1]<puntuacion){
				TextoFinal.text=" GAME OVER \n Nuevo RECORD\n al menu";
				TextoFinal.visible = true;
				game.input.onTap.addOnce(this.Guardar_puntos,this);
			}else{
				TextoFinal.text=" GAME OVER \n Click para volver\n al menu";
				TextoFinal.visible = true;
				game.input.onTap.addOnce(this.Volver_menu,this);
			}
		}
	},
	
	collisionbar:function(barrera, balasEnemigo){
		if(contador_golpes_barrera==0){
			tiempo_colision_balas=this.time.create();
			Tiempo2=tiempo_colision_balas.add(Phaser.Timer.SECOND * tiempo_entre_golpes, this.control_colores);
			tiempo_colision_balas.start();
		}
		contador_golpes_barrera+=1;
		enemigos.forEachAlive(function(enemigo){
			arrayEnemigos.push(enemigo);
		});
		if(contador_golpes_barrera==1){
			var random=game.rnd.integerInRange(0,arrayColores.length-1);
			for(i=0;i<arrayEnemigos.length;i++){
				arrayEnemigos[i].tint=1 * arrayColores[random]
			}
		}
		else{
			for(i=0;i<arrayEnemigos.length;i++){
				var random=game.rnd.integerInRange(0,arrayColores.length-1);
				arrayEnemigos[i].tint=1 * arrayColores[random]
			}
		}
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
	
	control_colores:function(){
		contador_golpes_barrera=0;
		tiempo_colision_balas.destroy();
	},
	
	collisionHandler:function  (bullet, enemigo) {
		if(enemigo.tipo==0){
			puntuacion += 100;
			var random=game.rnd.integerInRange(0,20);
			if(random==1){
				buf1 = Buff1.getFirstExists(false);
				if (buf1)
				{
					buf1.reset(enemigo.body.x, enemigo.body.y);
					buf1.body.velocity.y = 200;
				}
			}
			if(random==5){
				buf2 = Buff2.getFirstExists(false);
				if (buf2)
				{
					buf2.reset(enemigo.body.x, enemigo.body.y);
					buf2.body.velocity.y = 200;
				}
			}
			/*if(random==3){
				buf3 = Buff3.getFirstExists(false);
				if (buf3)
				{
					buf3.reset(enemigo.body.x, enemigo.body.y);
					buf3.body.velocity.y = 200;
				}
			}*/
		}else{
			puntuacion += 500;
			Tiempo_nave_alien=this.time.create();
			Tiempo1=Tiempo_nave_alien.add(Phaser.Timer.SECOND * 20, this.moverNaveAlien);
			Tiempo_nave_alien.start();
			control_tiempo=1;
		}
		bullet.kill();
		enemigo.kill();
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
			if(rebote_bala=='On'){
				enemyBullet.body.bounce.set(1);
				enemyBullet.body.collideWorldBounds = true;
				enemyBullet.tiempo=0;
			}
			var random=game.rnd.integerInRange(0,arrayEnemigos.length-1);
			var shooter=arrayEnemigos[random];
			enemyBullet.reset(shooter.body.x, shooter.body.y);
			/*game.physics.arcade.moveToObject(enemyBullet,player,120);*/
			enemyBullet.body.velocity.y = 200;
			tiempoDisparo = game.time.now + 1000;
		}
	},

	nave_alien_Fires:function() {
		Balas_nave_alien = balas_nave_alien.getFirstExists(false);
		if (Balas_nave_alien && nave_alien.body.x < 650 && nave_alien.body.y==10 && nave_alien.alive)
		{
			Balas_nave_alien.reset(nave_alien.body.x+50, nave_alien.body.y);
			Balas_nave_alien.body.velocity.y = 200;
			tiempoDisparo = game.time.now + 300;
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
		this.state.start('MainMenu',true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento);
	},
	Guardar_puntos: function  () {
		this.state.start('GuardarPuntosV',true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento, puntuacion);
	},
	
	render:function() {
		game.debug.text( "This:"+min_punutacion_violento[1], 100, 380 );
	}
}

	