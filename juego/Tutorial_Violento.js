Game.Tutorial_Violento = function(game){
};
var valor_edad;
Game.Tutorial_Violento.prototype ={
	init:function(edad){
		valor_edad=edad;
	},
	create:function(){
		this.seleccion;
		/*this.game.physics.p2.gravity.y = 0;*/
        var style = {	font: "25px Press Start 2P",
						fill: "White",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
					
		this.text2=this.game.add.text(0, 0, "Introducir aqui el texto del \ntutorial violento.",style);
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
		this.state.start(button.stage,true, false, valor_edad, tipo_nave);
	},
};