Game.Settings = function(game){
};
var valor_edad;
var tipo_nave;
var rebote_bala;
var Puntuacion_violento;
var Puntuacion_no_violento;

Game.Settings.prototype ={
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
        /*this.background = this.add.image(0, 0, "fondoMenu");
        this.background.height = this.game.height;
        this.background.width = this.game.width;*/
		this.stage.backgroundColor = "Black";
		if(valor_edad=='Mayor'){
			this.button_rebote_balas = this.add.button(this.world.centerX - 280, 55, 'Boton', this.act_rebote, this, 2, 1, 0);
			this.button_rebote_balas.scale.setTo(2.5, 0.9);
			this.text0=this.game.add.text(0, 0, "Rebote de balas: "+ rebote_bala,style);
			this.text0.font = 'Press Start 2P';
			this.text0.setTextBounds(0, 50, this.game.world.width,100);
			
			this.button_tutorial_violento = this.add.button(this.world.centerX - 235, 155, 'Boton', this.click_button, this, 2, 1, 0);
			this.button_tutorial_violento.scale.setTo(2.1, 0.9);
			this.button_tutorial_violento.stage='Tutorial_Violento';
			this.text1=this.game.add.text(0, 0, "Tutorial violento",style);
			this.text1.font = 'Press Start 2P';
			this.text1.setTextBounds(0, 150, this.game.world.width,100);			
		}
		
		this.button_tutorial_no_violento = this.add.button(this.world.centerX - 280, 255, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_tutorial_no_violento.scale.setTo(2.5, 0.9);
		this.button_tutorial_no_violento.stage='Tutorial_No_Violento';
		this.text2=this.game.add.text(0, 0, "Tutorial No violento",style);
		this.text2.font = 'Press Start 2P';
		this.text2.setTextBounds(0, 250, this.game.world.width,100);
		
		this.button_elegir_nave = this.add.button(this.world.centerX - 160, 355, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_elegir_nave.scale.setTo(1.4, 0.9);
		this.button_elegir_nave.stage='Elegir_nave';
		this.text3=this.game.add.text(0, 0, "Elegir nave",style);
		this.text3.font = 'Press Start 2P';
		this.text3.setTextBounds(0, 350, this.game.world.width,100);
		
		this.button_volver = this.add.button(this.world.centerX - 160, 455, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_volver.scale.setTo(1.4, 0.9);
		this.button_volver.stage='MainMenu';
		this.text4=this.game.add.text(0, 0, "Volver",style);
		this.text4.font = 'Press Start 2P';
		this.text4.setTextBounds(0, 450, this.game.world.width,100);
	},
	update:function(){
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();		
	},

	click_button:function(button){
		this.state.start(button.stage,true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento);
	},
	
	act_rebote:function(){
		if (rebote_bala=='On'){
			rebote_bala='Off';
			this.text0.text="Rebote de balas: "+ rebote_bala;
		}else{
			rebote_bala='On';
			this.text0.text="Rebote de balas: "+ rebote_bala;
		}
	},
};