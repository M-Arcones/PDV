Game.Tutorial_No_Violento = function(game){
};
var valor_edad;
var tipo_nave;
var rebote_bala;
var Puntuacion_violento;
var Puntuacion_no_violento;

Game.Tutorial_No_Violento.prototype ={
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
					
		this.text2=this.game.add.text(10, 50, "Objetivo: \nEsquivar el mayor numero \nde aliens posibles.\nCada fila de aliens superada \nsumara 100 puntos\n\nControles:\nMover nave: Teclas de direccion",style);
		this.text2.font = 'Press Start 2P';
		this.text2.setTextBounds(0, 100, this.game.world.width,100);
		
		this.button_volver = this.add.button(this.world.centerX - 160, 405, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_volver.scale.setTo(1.4, 0.9);
		this.button_volver.stage='Settings';
		this.text2=this.game.add.text(0, 0, "Volver",style);
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