Game.Tutorial_Violento = function(game){
};
var valor_edad;
var tipo_nave;
var rebote_bala;
var Puntuacion_violento;
var Puntuacion_no_violento;

Game.Tutorial_Violento.prototype ={
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
        var style = {	font: "25px Press Start 2P",
						fill: "White",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
					
        this.background = this.add.image(0, 0, "fondo");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
		this.text2=this.game.add.text(10, 20, "Objetivo: \nEliminar el mayor numero\nde aliens\n\nControles:\nDispara: Tecla espacio\nMover nave: Teclas de direccion\nLaser: Tecla V\nMenu Pausa: Tecla P",style);
		this.text2.font = 'Press Start 2P';
		this.text2.setTextBounds(0, 100, this.game.world.width,100);
		
		this.text3=this.game.add.text(-62, 235, "Buffs:\n Repara Barreras\n Suma 500 Puntos\n Teletransporte aleatorio",style);
		this.text3.font = 'Press Start 2P';
		this.text3.setTextBounds(0, 100, this.game.world.width,100);
		
		this.img_buff1=this.add.sprite(22, 327+60, 'buff1');
		this.img_buff1.scale.setTo(2, 2);
		this.img_buff2=this.add.sprite(22, 298+60, 'buff2');
		this.img_buff2.scale.setTo(2, 2);
		this.img_buff3=this.add.sprite(22, 358+60, 'buff3');
		this.img_buff3.scale.setTo(2, 2);
		
		
		this.button_volver = this.add.button(this.world.centerX - 160, 475, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_volver.scale.setTo(1.4, 0.9);
		this.button_volver.stage='Settings';
		this.text2=this.game.add.text(0, 0, "Volver",style);
		this.text2.font = 'Press Start 2P';
		this.text2.setTextBounds(0, 470, this.game.world.width,100);
	},
	update:function(){
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();		
	},

	click_button:function(button){
		this.state.start(button.stage,true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento);
	},
};