Game.PuntuacionesV = function(game){
};

Game.PuntuacionesV.prototype ={
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
        var style1 = {	font: "40px Press Start 2P",
						fill: "White",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
        var style2 = {	font: "20px Press Start 2P",
						fill: "White",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
        /*this.background = this.add.image(0, 0, "fondoMenu");
        this.background.height = this.game.height;
        this.background.width = this.game.width;*/
		this.stage.backgroundColor = "Black";
		
		cursors = game.input.keyboard.createCursorKeys();

		var var1=Puntuacion_violento[0].split('|');
		var var2=Puntuacion_violento[1].split('|');
		var var3=Puntuacion_violento[2].split('|');
		var var4=Puntuacion_violento[3].split('|');
		var var5=Puntuacion_violento[4].split('|');
		
		
		this.text0=this.game.add.text(0, 0, "RANKING VIOLENTO",style1);
		this.text0.font = 'Press Start 2P';
		this.text0.setTextBounds(0, 50, this.game.world.width,100);

		this.text1=this.game.add.text(0, 0,var1[0]+ " ------ " +var1[1],style2);
		this.text1.font = 'Press Start 2P';
		this.text1.setTextBounds(0, 150, this.game.world.width,100);

		this.text2=this.game.add.text(0, 0,var2[0]+ " ------ " +var2[1],style2);
		this.text2.font = 'Press Start 2P';
		this.text2.setTextBounds(0, 200, this.game.world.width,100);

		this.text3=this.game.add.text(0, 0,var3[0]+ " ------ " +var3[1],style2);
		this.text3.font = 'Press Start 2P';
		this.text3.setTextBounds(0, 250, this.game.world.width,100);

		this.text4=this.game.add.text(0, 0,var4[0]+ " ------ " +var4[1],style2);
		this.text4.font = 'Press Start 2P';
		this.text4.setTextBounds(0, 300, this.game.world.width,100);
		
		this.text5=this.game.add.text(0, 0,var5[0]+ " ------ " +var5[1],style2);
		this.text5.font = 'Press Start 2P';
		this.text5.setTextBounds(0, 350, this.game.world.width,100);

		
		this.button_volver = this.add.button(this.world.centerX - 160, 455, 'Boton', this.click_button, this, 2, 1, 0);
		this.button_volver.scale.setTo(1.4, 0.9);
		this.button_volver.stage='MainMenu';
		this.text4=this.game.add.text(0, 0, "Volver",style2);
		this.text4.font = 'Press Start 2P';
		this.text4.setTextBounds(0, 450, this.game.world.width,100);
	},

	click_button:function(button){
		this.state.start(button.stage,true, false, valor_edad, tipo_nave, rebote_bala, Puntuacion_violento, Puntuacion_no_violento);
	},
};