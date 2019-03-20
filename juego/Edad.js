Game.Edad = function(game){
};

Game.Edad.prototype ={

	create:function(){
		this.seleccion;
		/*this.game.physics.p2.gravity.y = 0;*/
        var style = {	font: "28px Press Start 2P",
						fill: "White",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
        /*this.background = this.add.image(0, 0, "fondoMenu");
        this.background.height = this.game.height;
        this.background.width = this.game.width;*/
		this.stage.backgroundColor = "Black";
		
		this.button_menor = this.add.button(this.world.centerX - 200, 305, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_menor.scale.setTo(0.8, 0.9);
		this.button_menor.valor='Menor';
		this.button_mayor = this.add.button(this.world.centerX  +50, 305, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_mayor.scale.setTo(0.8, 0.9);
		this.button_mayor.valor='Mayor';
		
		
		this.text1=this.game.add.text(0, 0, "Eres mayor de 13?",style);
		this.text1.font = 'Press Start 2P';
		this.text2=this.game.add.text(140, 0, "Si",style);
		this.text2.font = 'Press Start 2P';
		this.text3=this.game.add.text(-120, 0, "No",style);
		this.text3.font = 'Press Start 2P';
		this.text1.setTextBounds(0, 200, this.game.world.width,100);
		this.text2.setTextBounds(0, 300, this.game.world.width,100);
		this.text3.setTextBounds(0, 300, this.game.world.width,100);

	},

	update:function(){
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.refresh();		
	},

	click_button:function(button){
		var Puntuacion_violento=['...|5','...|4','...|3','...|2','...|1'];
		var Puntuacion_no_violento=['...|5','...|4','...|3','...|2','...|1']
		if(button.valor=='Mayor'){
			this.state.start('MainMenu',true, false, 'Mayor','Nave1', 'Off',Puntuacion_violento,Puntuacion_no_violento);
		}else{
			this.state.start('MainMenu',true, false, 'Menor','Nave1', 'Off',Puntuacion_violento,Puntuacion_no_violento);
		}
	},
};

