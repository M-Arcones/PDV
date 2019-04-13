Game.No_Violento = function(game){
};

var valor_edad;
var tipo_nave;
var rebote_bala;

var nave;
var enemigos;
var cursors;
var explosions;
var vidas;
var TextoFinal;
var puntuacion = 0;
var TextoPuntos = 'Puntos : ';
var TextoPuntuacion;
var tween;
var tween1;
var tween2;
var tween3;


var estado=0;
var press=0;
var silencio=0;
var contMusica=0;
var arrayMusica=[];

Game.No_Violento.prototype ={
	init:function(edad, nave, rebotes,P_violento,P_no_violento){
		valor_edad=edad;
		tipo_nave=nave;
		rebote_bala=rebotes;
		Puntuacion_violento=P_violento;
		Puntuacion_no_violento=P_no_violento;
		min_punutacion_violento=Puntuacion_violento[4].split('|');
		estado=0;
		silencio=0;
	},
	
	create:function(){
		//Musica
		arrayMusica[0]=game.add.audio('Musica1');
		arrayMusica[1]=game.add.audio('Musica2');
		arrayMusica[2]=game.add.audio('Musica3');
		arrayMusica[3]=game.add.audio('Musica4');
		arrayMusica[4]=game.add.audio('Musica5');
		this.time.events.loop(Phaser.Timer.SECOND*20, this.cambiar_musica, this);
		arrayMusica[contMusica].play();
		if(silencio==1){
			arrayMusica[contMusica].stop()
		}

		puntuacion = 0;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		/*this.stage.backgroundColor = "Black";*/
        this.background = this.add.image(0, 0, "fondo");
        this.background.height = this.game.height;
        this.background.width = this.game.width;

		//Barreras
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
		nave.scale.setTo(0.5,0.5);
		game.physics.enable(nave, Phaser.Physics.ARCADE);

		enemigos = game.add.group();
		enemigos.enableBody = true;
		enemigos.physicsBodyType = Phaser.Physics.ARCADE;
		
		enemigos1 = game.add.group();
		enemigos1.enableBody = true;
		enemigos1.physicsBodyType = Phaser.Physics.ARCADE;

		enemigos2 = game.add.group();
		enemigos2.enableBody = true;
		enemigos2.physicsBodyType = Phaser.Physics.ARCADE;

		enemigos3 = game.add.group();
		enemigos3.enableBody = true;
		enemigos3.physicsBodyType = Phaser.Physics.ARCADE;
				
		this.createAliens();
		//  The score
		TextoPuntuacion = game.add.text(10, 10, TextoPuntos + puntuacion, { font: '24px Press Start 2P', fill: '#fff' });

		vidas = game.add.group();
		game.add.text(game.world.width - 140, 10, 'Vidas: ', { font: '24px Press Start 2P', fill: '#fff' });

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

		explosions = game.add.group();
		explosions.createMultiple(30, 'Explosion');
		explosions.forEach(this.setupInvader, this);

		cursors = game.input.keyboard.createCursorKeys();
		pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
		
		//Menu pausa
		Menu_pausa=this.add.sprite(200,200, 'Menu_pausa');
		Menu_pausa.visible = false;
		salir = this.add.button(220,250, 'salir', this.Volver_menu, this, 2, 1, 0);
		salir.visible = false;
		continuar = this.add.button(350,250, 'continuar', this.Continuar, this, 2, 1, 0);
		continuar.visible = false;
		silenciar = this.add.button(480,250, 'Sonido_SI', this.silenciar, this, 2, 1, 0);
		silenciar.visible = false;
	},
	
	cambiar_musica: function(){
		arrayMusica[contMusica].stop();
		contMusica++;
		if(contMusica==5){
			contMusica=0;
		}
		if(silencio==0){
			arrayMusica[contMusica].play();
		}
	},
	
	createAliens:function() {
		enemigos.y=0;
		enemigos1.y=0;
		enemigos2.y=0;
		enemigos3.y=0;
		for (var y = 0; y < 4; y++)
		{
			var hueco = game.rnd.integerInRange(0,6);
			for (var x = 0; x < 7; x++)
			{
				if(hueco!=x){
					switch(y){
						case 0:
							var alien = enemigos.create(15+(x * 48+ x*60) , 50, 'invader1');
							alien.scale.setTo(1.5,1.5);
						break;
						case 1:
							var alien = enemigos1.create(15+(x * 48+ x*60) , -150, 'invader1');
							alien.scale.setTo(1.5,1.5);
						break;
						case 2:
							var alien = enemigos2.create(15+(x * 48+ x*60) , -350, 'invader1');
							alien.scale.setTo(1.5,1.5);
						break;
						case 3:
							var alien = enemigos3.create(15+(x * 48+ x*60) , -550, 'invader1');
							alien.scale.setTo(1.5,1.5);
						break;
					}
					alien.anchor.setTo(0.5, 0.5);
					alien.animations.add('fly', [ 0, 1], 2, true);
					alien.play('fly');
					alien.body.moves = false;
				}
			}
		}

		/*enemigos.x = 10;
		enemigos.y = 50;*/

		tween = game.add.tween(enemigos).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween1 = game.add.tween(enemigos1).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween2 = game.add.tween(enemigos2).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween3 = game.add.tween(enemigos3).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);

		tween.onComplete.add(this.descend, this);
		tween1.onComplete.add(this.descend1, this);
		tween2.onComplete.add(this.descend2, this);
		tween3.onComplete.add(this.descend3, this);
	},
	
	render:function() {
		
	},
	
	setupInvader:function (invader) {
		invader.anchor.x = 0.5;
		invader.anchor.y = 0.5;
		invader.animations.add('Explosion');
	},
	
	descend:function() {
		tween = game.add.tween(enemigos).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween.onComplete.add(this.descend, this);
	},
	descend1:function() {
		tween1 = game.add.tween(enemigos1).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween1.onComplete.add(this.descend1, this);
	},
	descend2:function() {
		tween2 = game.add.tween(enemigos2).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween2.onComplete.add(this.descend2, this);
	},
	descend3:function() {
		tween3 = game.add.tween(enemigos3).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween3.onComplete.add(this.descend3, this);
	},

	Continuar:function(){
		//Continuar
		Menu_pausa.visible = false;
		salir.visible = false;
		continuar.visible = false;
		silenciar.visible = false;
		estado=0;
		tween.isPaused = false;
		tween1.isPaused = false;
		tween2.isPaused = false;
		tween3.isPaused = false;
	},	
	
	silenciar:function() {
		if(silencio==1){
			silencio=0;
			arrayMusica[contMusica].resume();
			silenciar.loadTexture('Sonido_SI');
		}else{
			silencio=1;
			arrayMusica[contMusica].pause();
			silenciar.loadTexture('Sonido_NO');
		}
	},
	
	update:function() {
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();

		if (pauseKey.isDown && press==0)
		{
			press=1;
			if(estado==0 && nave.alive){			
				if(silencio==1){
					silenciar.loadTexture('Sonido_NO');
				}else{
					silenciar.loadTexture('Sonido_SI');
				}
				//Pausar
				Menu_pausa.visible = true;
				salir.visible = true;
				continuar.visible = true;
				silenciar.visible = true;
				estado=1;
				tween.isPaused = true;
				tween1.isPaused = true;
				tween2.isPaused = true;
				tween3.isPaused = true;
				nave.body.velocity.x=0;
				nave.body.velocity.y=0;

			}else{
				if(nave.alive){
					this.Continuar();
				}
			}
		}		
		if(pauseKey.isDown==false){
			press=0;
		}
		if(estado==0){
			enemigos.y += 1;
			enemigos1.y += 1;
			enemigos2.y += 1;
			enemigos3.y += 1;
			if (nave.alive)
			{
				nave.body.velocity.setTo(0, 0);

				if (cursors.left.isDown && nave.body.x>0)
				{
					nave.body.velocity.x = -300;
				}
				else if (cursors.right.isDown&& nave.body.x<800-nave.width )
				{
					nave.body.velocity.x = 300;
				}
				if (cursors.up.isDown)
				{
					nave.body.velocity.y = -300;
				}
				else if (cursors.down.isDown)
				{
					nave.body.velocity.y = 300;
				}
				
				//colison de enemigos con barreras
				game.physics.arcade.overlap(barrera1, enemigos, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera2, enemigos, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera3, enemigos, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera4, enemigos, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera1, enemigos1, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera2, enemigos1, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera3, enemigos1, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera4, enemigos1, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera1, enemigos2, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera2, enemigos2, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera3, enemigos2, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera4, enemigos2, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera1, enemigos3, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera2, enemigos3, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera3, enemigos3, this.collisionbar_ali, null, this);
				game.physics.arcade.overlap(barrera4, enemigos3, this.collisionbar_ali, null, this);
				
				//colision de enemigos con nave
				game.physics.arcade.overlap(enemigos, nave, this.collisionbar_player, null, this);
				game.physics.arcade.overlap(enemigos1, nave, this.collisionbar_player, null, this);
				game.physics.arcade.overlap(enemigos2, nave, this.collisionbar_player, null, this);
				game.physics.arcade.overlap(enemigos3, nave, this.collisionbar_player, null, this);

				//colision de nave con barreras
				game.physics.arcade.overlap(barrera1, nave, this.collisionbar_nave, null, this);
				game.physics.arcade.overlap(barrera2, nave, this.collisionbar_nave, null, this);
				game.physics.arcade.overlap(barrera3, nave, this.collisionbar_nave, null, this);
				game.physics.arcade.overlap(barrera4, nave, this.collisionbar_nave, null, this);
			}
		}
		
		if (enemigos.getAt(1).body.y >=640){
			puntuacion += 100;
			enemigos.removeAll();
			enemigos.y=0;
			var hueco = Math.ceil(Math.random() * (2 - 6) + 6);
			for (var x = 0; x < 7; x++)
			{
				if(hueco!=x){
					var alien = enemigos.create(15+(x * 48+ x*60) ,  enemigos3.getAt(1).body.y -200, 'invader1');
					alien.scale.setTo(1.5,1.5);
					alien.anchor.setTo(0.5, 0.5);
					alien.animations.add('fly', [ 0, 1], 3, true);
					alien.play('fly');
					alien.body.moves = false;
				}
				alien.anchor.setTo(0.5, 0.5);
				alien.animations.add('fly', [ 0, 1], 2, true);
				alien.play('fly');
				alien.body.moves = false;
			}
		}

		if (enemigos1.getAt(1).body.y >=640){
			puntuacion += 100;
			enemigos1.removeAll();
			enemigos1.y=0;
			var hueco = Math.ceil(Math.random() * (2 - 6) + 6);
			for (var x = 0; x < 7; x++)
			{
				if(hueco!=x){
					var alien = enemigos1.create(15+(x * 48+ x*60) ,  enemigos.getAt(1).body.y -200, 'invader1');
					alien.scale.setTo(1.5,1.5);
					alien.anchor.setTo(0.5, 0.5);
					alien.animations.add('fly', [ 0, 1], 3, true);
					alien.play('fly');
					alien.body.moves = false;
				}
				alien.anchor.setTo(0.5, 0.5);
				alien.animations.add('fly', [ 0, 1], 2, true);
				alien.play('fly');
				alien.body.moves = false;
			}
		}

		if (enemigos2.getAt(1).body.y >=640){
			puntuacion += 100;
			enemigos2.removeAll();
			enemigos2.y=0;
			var hueco = Math.ceil(Math.random() * (2 - 6) + 6);
			for (var x = 0; x < 7; x++)
			{
				if(hueco!=x){
					var alien = enemigos2.create(15+(x * 48+ x*60) ,  enemigos1.getAt(1).body.y -200, 'invader1');
					alien.scale.setTo(1.5,1.5);
					alien.anchor.setTo(0.5, 0.5);
					alien.animations.add('fly', [ 0, 1], 3, true);
					alien.play('fly');
					alien.body.moves = false;
				}
				alien.anchor.setTo(0.5, 0.5);
				alien.animations.add('fly', [ 0, 1], 2, true);
				alien.play('fly');
				alien.body.moves = false;
			}
		}

		if (enemigos3.getAt(1).body.y >=640){
			puntuacion += 100;
			enemigos3.removeAll();
			enemigos3.y=0;
			var hueco = Math.ceil(Math.random() * (2 - 6) + 6);
			for (var x = 0; x < 7; x++)
			{
				if(hueco!=x){
					var alien = enemigos3.create(15+(x * 48+ x*60) ,  enemigos2.getAt(1).body.y -200, 'invader1');
					alien.scale.setTo(1.5,1.5);
					alien.anchor.setTo(0.5, 0.5);
					alien.animations.add('fly', [ 0, 1], 3, true);
					alien.play('fly');
					alien.body.moves = false;
				}
				alien.anchor.setTo(0.5, 0.5);
				alien.animations.add('fly', [ 0, 1], 2, true);
				alien.play('fly');
				alien.body.moves = false;
			}
		}
		TextoPuntuacion.text = TextoPuntos + puntuacion;
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

			if(min_punutacion_violento[1]<puntuacion){
				TextoFinal.text=" GAME OVER \n Nuevo RECORD";
				TextoFinal.visible = true;
				game.input.onTap.addOnce(this.Guardar_puntos,this);
			}else{
				TextoFinal.text=" GAME OVER \n Click para volver\n al menu";
				TextoFinal.visible = true;
				game.input.onTap.addOnce(this.Volver_menu,this);
			}
		}	
	},

	collisionbar_ali:function(barrera, alien){
		barrera.kill();
	},

	collisionbar_player:function(nave, enemigos){
		for(i=vidas.countLiving();i>1;i--){
			live = vidas.getFirstAlive();
			live.kill();
			nave.kill();
		}
		
		var explosion = explosions.getFirstExists(false);
		explosion.reset(nave.body.x +30, nave.body.y +30);
		explosion.play('Explosion', 30, false, true);
		nave.kill();
		
		if(min_punutacion_violento[1]<puntuacion){
			TextoFinal.text=" GAME OVER \n Nuevo RECORD";
			TextoFinal.visible = true;
			game.input.onTap.addOnce(this.Guardar_puntos,this);
		}else{
			TextoFinal.text=" GAME OVER \n Click para volver\n al menu";
			TextoFinal.visible = true;
			game.input.onTap.addOnce(this.Volver_menu,this);
		}
	},
	
	Volver_menu: function  () {
		arrayMusica[contMusica].stop();
		this.state.start('MainMenu',true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento);
	},
	Guardar_puntos: function  () {
		arrayMusica[contMusica].stop();
		this.state.start('GuardarPuntosNoV',true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento, puntuacion);
	}
}