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


Game.No_Violento.prototype ={
	init:function(edad, nave, rebotes,P_violento,P_no_violento){
		valor_edad=edad;
		tipo_nave=nave;
		rebote_bala=rebotes;
		Puntuacion_violento=P_violento;
		Puntuacion_no_violento=P_no_violento;
		min_punutacion_violento=Puntuacion_violento[4].split('|');
	},
	
	create:function(){
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
	},
	
	createAliens:function() {
		enemigos.y=0;
		enemigos1.y=0;
		enemigos2.y=0;
		enemigos3.y=0;
		for (var y = 0; y < 4; y++)
		{
			var hueco = Math.ceil(Math.random() * (2 - 6) + 6);
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

		var tween = game.add.tween(enemigos).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		var tween1 = game.add.tween(enemigos1).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		var tween2 = game.add.tween(enemigos2).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		var tween3 = game.add.tween(enemigos3).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);

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
		var tween = game.add.tween(enemigos).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween.onComplete.add(this.descend, this);
	},
	descend1:function() {
		var tween1 = game.add.tween(enemigos1).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween1.onComplete.add(this.descend1, this);
	},
	descend2:function() {
		var tween2 = game.add.tween(enemigos2).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween2.onComplete.add(this.descend2, this);
	},
	descend3:function() {
		var tween3 = game.add.tween(enemigos3).to( { x: 100 }, 1700, Phaser.Easing.Linear.None, true, 0, 0, true);
		tween3.onComplete.add(this.descend3, this);
	},
	
	update:function() {
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();

		enemigos.y += 1;
		enemigos1.y += 1;
		enemigos2.y += 1;
		enemigos3.y += 1;
		
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
		this.state.start('MainMenu',true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento);
	},
	Guardar_puntos: function  () {
		this.state.start('GuardarPuntosNoV',true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento, puntuacion);
	}
}