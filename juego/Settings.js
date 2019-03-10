Game.Settings = function(game){
};
var valor_edad;
var tipo_nave;
Game.Settings.prototype ={
	init:function(edad, nave){
		valor_edad=edad;
		tipo_nave=nave;
	},
	create:function(){
		this.seleccion;
		/*this.game.physics.p2.gravity.y = 0;*/
        var style = {	font: "25px Press Start",
						fill: "White",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
        /*this.background = this.add.image(0, 0, "fondoMenu");
        this.background.height = this.game.height;
        this.background.width = this.game.width;*/
		this.stage.backgroundColor = "Black";
		if(valor_edad=='Mayor'){
			this.button_tutorial_violento = this.add.button(this.world.centerX - 235, 105, 'Boton', this.click_button, this, 2, 1, 0);
			this.button_tutorial_violento.scale.setTo(2.1, 0.9);
			this.button_tutorial_violento.stage='Tutorial_Violento';
			this.text1=this.game.add.text(0, 0, "Tutorial violento",style);
			this.text1.font = 'Press Start';
			this.text1.setTextBounds(0, 100, this.game.world.width,100);
		}
		this.button_tutorial_no_violento = this.add.button(this.world.centerX - 280, 205, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_tutorial_no_violento.scale.setTo(2.5, 0.9);
		this.button_tutorial_no_violento.stage='Tutorial_No_Violento';
		this.text2=this.game.add.text(0, 0, "Tutorial No violento",style);
		this.text2.font = 'Press Start';
		this.text2.setTextBounds(0, 200, this.game.world.width,100);
		
		this.button_elegir_nave = this.add.button(this.world.centerX - 160, 305, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_elegir_nave.scale.setTo(1.4, 0.9);
		this.button_elegir_nave.stage='Elegir_nave';
		this.text2=this.game.add.text(0, 0, "Elegir nave",style);
		this.text2.font = 'Press Start';
		this.text2.setTextBounds(0, 300, this.game.world.width,100);
		
		this.button_volver = this.add.button(this.world.centerX - 160, 405, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_volver.scale.setTo(1.4, 0.9);
		this.button_volver.stage='MainMenu';
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
		this.state.start(button.stage,true, false, valor_edad, tipo_nave);
	},
};