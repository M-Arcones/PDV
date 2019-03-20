Game.Elegir_nave = function(game){
};
var valor_edad;
var tipo_nave;
var rebote_bala;
var Puntuacion_violento;
var Puntuacion_no_violento;

Game.Elegir_nave.prototype ={
	init:function(edad, nave, rebotes,P_violento,P_no_violento){
		valor_edad=edad;
		tipo_nave=nave;
		rebote_bala=rebotes;
		Puntuacion_violento=P_violento;
		Puntuacion_no_violento=P_no_violento;
	},
	create:function(){
		this.seleccion;
		/*this.game.physics.p2.gravity.y = 0;*/
        var style = {	font: "25px Press Start",
						fill: "White",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
		/*this.game.physics.p2.gravity.y = 0;*/
		
        this.button_nave1 = this.add.button(this.world.centerX - 370, 105, 'Boton', this.selec_nave, this, 2, 1, 0);
		this.button_nave1.scale.setTo(1, 2);
		this.button_nave1.nave='Nave1';
		this.img_nave=this.add.sprite(this.world.centerX - 340, 155, 'Nave1');
		this.img_nave.scale.setTo(2, 2);
		
        this.button_nave2 = this.add.button(this.world.centerX - 110, 105, 'Boton', this.selec_nave, this, 2, 1, 0);
		this.button_nave2.scale.setTo(1, 2);
		this.button_nave2.nave='Nave2';
		this.img_nave1=this.add.sprite(this.world.centerX - 80, 155, 'Nave2');
		this.img_nave1.scale.setTo(2, 2);
		
        this.button_nave3 = this.add.button(this.world.centerX + 150, 105, 'Boton', this.selec_nave, this, 2, 1, 0);
		this.button_nave3.scale.setTo(1, 2);
		this.button_nave3.nave='Nave3';
		this.img_nave2=this.add.sprite(this.world.centerX + 180, 155, 'Nave3');
		this.img_nave2.scale.setTo(2, 2);
		
		switch (tipo_nave){
			case ('Nave1'):
				this.button_nave1.tint=1 * 0xffffff;
				this.button_nave2.tint=0.4 * 0xffffff;
				this.button_nave3.tint=0.4 * 0xffffff;
				break;
			case ('Nave2'):
				this.button_nave2.tint=1 * 0xffffff;
				this.button_nave1.tint=0.4 * 0xffffff;
				this.button_nave3.tint=0.4 * 0xffffff;
				break;
			case ('Nave3'):
				this.button_nave3.tint=1 * 0xffffff;
				this.button_nave1.tint=0.4 * 0xffffff;
				this.button_nave2.tint=0.4 * 0xffffff;
				break;
		}
		this.button_volver = this.add.button(this.world.centerX - 160, 405, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_volver.scale.setTo(1.4, 0.9);
		this.button_volver.stage='Settings';
		this.text2=this.game.add.text(0, 0, "Volver",style);
		this.text2.font = 'Press Start';
		this.text2.setTextBounds(0, 400, this.game.world.width,100);
	},
	update:function(){
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();		
	},

	click_button:function(button){
		this.state.start(button.stage,true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento);
	},
	
	selec_nave:function(button){
		tipo_nave=button.nave;
		switch (tipo_nave){
			case ('Nave1'):
				this.button_nave1.tint=1 * 0xffffff;
				this.button_nave2.tint=0.4 * 0xffffff;
				this.button_nave3.tint=0.4 * 0xffffff;
				break;
			case ('Nave2'):
				this.button_nave2.tint=1 * 0xffffff;
				this.button_nave1.tint=0.4 * 0xffffff;
				this.button_nave3.tint=0.4 * 0xffffff;
				break;
			case ('Nave3'):
				this.button_nave3.tint=1 * 0xffffff;
				this.button_nave1.tint=0.4 * 0xffffff;
				this.button_nave2.tint=0.4 * 0xffffff;
				break;
		}
	},
};