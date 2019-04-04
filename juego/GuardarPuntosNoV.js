Game.GuardarPuntosNoV = function(game){
};
var valor_edad;
var nueva_puntuacion;
var tipo_nave;
var rebote_bala;
var Puntuacion_violento;
var Puntuacion_no_violento;
var position=0;
var cont1=0;
var cont2=0;
var cont3=0;
var press=0;
var press2=0;
var array_letras=['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];


Game.GuardarPuntosNoV.prototype ={
	init:function(edad, nave, rebotes,P_violento,P_no_violento, puntuacion){
		valor_edad=edad;
		tipo_nave=nave;
		rebote_bala=rebotes;
		Puntuacion_violento=P_violento;
		Puntuacion_no_violento=P_no_violento;
		nueva_puntuacion=puntuacion;
	},

	create:function(){
		this.seleccion;
		/*this.game.physics.p2.gravity.y = 0;*/
        var style1 = {	font: "35px Press Start 2P",
						fill: "White",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
        var style2 = {	font: "100px Press Start 2P",
						fill: "White",
					};
        this.background = this.add.image(0, 0, "fondo");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		/*this.stage.backgroundColor = "Black";*/
		position=0;
		cont1=0;
		cont2=0;
		cont3=0;
		press=0;
		press2=0;
		cursors = game.input.keyboard.createCursorKeys();

		this.text0=this.game.add.text(0, 0, "Guarda tu puntuacion",style1);
		this.text0.font = 'Press Start 2P';
		this.text0.setTextBounds(0, 50, this.game.world.width,100);
		
		this.text1=this.game.add.text(0, 0, "_",style2);
		this.text1.font = 'Press Start 2P';
		this.text1.setTextBounds(250, 250, this.game.world.width,100);
		this.text2=this.game.add.text(0, 0, "_",style2);
		this.text2.font = 'Press Start 2P';
		this.text2.setTextBounds(350, 250, this.game.world.width,100);
		this.text3=this.game.add.text(0, 0, "_",style2);
		this.text3.font = 'Press Start 2P';
		this.text3.setTextBounds(450, 250, this.game.world.width,100);
	
		this.button_guardar = this.add.button(this.world.centerX - 160, 455, 'Boton', this.Guardar, this, 2, 1, 0);
		this.button_guardar.scale.setTo(1.4, 0.9);
		this.button_guardar.stage='PuntuacionesNoV';
		this.text4=this.game.add.text(0, 0, "Guardar",style1);
		this.text4.font = 'Press Start 2P';
		this.text4.setTextBounds(0, 450, this.game.world.width,100);	
	},
	update:function(){
		
		switch(position){
			case 0:
				this.text1.tint=1 * "0xFF0040"
				this.text2.tint=1 * "0xFFFFFF"
				this.text3.tint=1 * "0xFFFFFF"
			break;
			case 1:
				this.text1.tint=1 * "0xFFFFFF"
				this.text2.tint=1 * "0xFF0040"
				this.text3.tint=1 * "0xFFFFFF"
			break;
			case 2:
				this.text1.tint=1 * "0xFFFFFF"
				this.text2.tint=1 * "0xFFFFFF"
				this.text3.tint=1 * "0xFF0040"
			break;
		}

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();
		
		if (cursors.left.isDown && press==0)
		{
			press=1;
			switch(position){
				case 0:
					position=2;
				break;
				case 1:
					position--;
				break;
				case 2:
					position--;
				break;
			}
		}
		else if (cursors.right.isDown && press==0)
		{
			press=1;
			switch(position){
				case 0:
					position++;
				break;
				case 1:
					position++;
				break;
				case 2:
					position=0;
				break;
			}
		}
		if(cursors.right.isDown==false &&  cursors.left.isDown==false){
			press=0;
		}
		if (cursors.up.isDown && press2==0)
		{
			press2=1;
			switch(position){
				case 0:
					if(cont1==0){
						cont1=24;
					}else{
						cont1--;
					}
					this.text1.text=array_letras[cont1];
				break;
				case 1:
					if(cont2==0){
						cont2=24;
					}else{
						cont2--;
					}
					this.text2.text=array_letras[cont2];
				break;
				case 2:
					if(cont3==0){
						cont3=24;
					}else{
						cont3--;
					}
					this.text3.text=array_letras[cont3];
				break;
			}
		}
		else if (cursors.down.isDown && press2==0)
		{
			press2=1;
			switch(position){
				case 0:
					if(cont1==24){
						cont1=0;
					}else{
						cont1++;
					}
					this.text1.text=array_letras[cont1];
				break;
				case 1:
					if(cont2==24){
						cont2=0;
					}else{
						cont2++;
					}
					this.text2.text=array_letras[cont2];
				break;
				case 2:
					if(cont3==24){
						cont3=0;
					}else{
						cont3++;
					}
					this.text3.text=array_letras[cont3];
				break;
			}
		}
		if(cursors.down.isDown==false &&  cursors.up.isDown==false){
			press2=0;
		}
	},

	Guardar:function(button){
		
		nuevo_nombre=this.text1.text+this.text2.text+this.text3.text;
		var i=Puntuacion_no_violento.length-1;
		var aux1;
		var aux0;
		
		do{
			aux0=Puntuacion_no_violento[i].split('|')[0]
			aux1=Puntuacion_no_violento[i].split('|')[1]
			Puntuacion_no_violento[i]=nuevo_nombre+'|'+ nueva_puntuacion;
			if(i!=Puntuacion_no_violento.length-1){
				Puntuacion_no_violento[i+1]=aux0+'|'+aux1;
			}
			i--;
		}while(i>=0 && Puntuacion_no_violento[i].split('|')[1]<nueva_puntuacion);
		
		
		this.state.start(button.stage,true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_no_violento, Puntuacion_no_violento);
	},	
	
	render:function() {
		/*game.debug.text( "This:"+position, 100, 380 );*/
	},
};
