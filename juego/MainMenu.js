Game.MainMenu = function(game){
};
var valor_edad;
var tipo_nave;
var rebote_bala;
var Puntuacion_violento;
var Puntuacion_no_violento;

Game.MainMenu.prototype ={
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
        this.background = this.add.image(0, 0, "fondoMain");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		this.stage.backgroundColor = "Black";
		if(valor_edad=='Mayor'){
			this.button_violento = this.add.button(this.world.centerX - 210, 205, 'Boton', this.click_button, this, 2, 1, 0);
			this.button_violento.scale.setTo(1.9, 0.9);
			this.button_violento.stage='Violento';
			this.text1=this.game.add.text(0, 0, "Juego violento",style);
			this.text1.font = 'Press Start 2P';
			this.text1.setTextBounds(0, 200, this.game.world.width,100);
		}
		this.button_no_violento = this.add.button(this.world.centerX - 260, 305, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_no_violento.scale.setTo(2.4, 0.9);
		this.button_no_violento.stage='No_Violento';
		this.text2=this.game.add.text(0, 0, "Juego No violento",style);
		this.text2.font = 'Press Start 2P';
		this.text2.setTextBounds(0, 300, this.game.world.width,100);
		
		this.button_settings = this.add.button(this.world.centerX - 160, 405, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_settings.scale.setTo(1.4, 0.9);
		this.button_settings.stage='Settings';
		this.text2=this.game.add.text(0, 0, "Settings",style);
		this.text2.font = 'Press Start 2P';
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
};