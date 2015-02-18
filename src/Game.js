

var redmoled;
var positions;
var speed = 1;
var shown = 0;
var displayed =0;
var missed =0;
var killed = 0;
var gameOver = false;
var level;
var speedUp = 0;
var score;
var bullet = 6;
var bullets;
var relo;
var background;
var sky;
var scoreboard;
var emitter;
var gunshot;
var dry;
var gag;
var wolfcry;
var bluekill;
var redkill;
var wolfkill;

BasicGame.Game = function (game) {

	
};

BasicGame.Game.prototype = {

	create: function () {
		//clear global vars for new game
		BasicGame.score = 0;
		BasicGame.redkill = 0;
		BasicGame.bluekill = 0;
		BasicGame.wolfkill = 0;
		//set amount of bullets
		bullet = 6;
		//add audio
		gunshot = this.add.audio('shot',1,false);
		dry = this.add.audio('dry',1,false);
		gag = this.add.audio('gag',1,false);
		wolfcry = this.add.audio('wolfcry',1,false);
		//add background and other gui assets
		background = this.game.add.sprite(0,0,'background');
		sky = this.game.add.sprite(0,0,'sky');
		scoreboard = this.game.add.sprite(10,10,'scoreboard');
		
		positions = [];
		bullets = [];
		//reset vars
		shown = 0;
		displayed =0;
		missed =0;
		killed = 0;
		bluekill = 0;
		redkill = 0;
		wolfkill = 0;
		gameOver = false;
		level = BasicGame.level;
		
		speed = 2;
		scoreTxt = this.game.add.bitmapText(140, 18, 'stoned',''+BasicGame.score, 36);
		//create characters and animations
		for(var t=0; t < 4; t++){
			for(var i = 0;i < 4; i++){
				hp = this.game.add.sprite(0, 0, 'horse');
			    hp.animations.add('hunter1', Phaser.Animation.generateFrameNames('hunter', 1,7, '.png', 4), 6, true);
				hp.animations.add('hunter2', Phaser.Animation.generateFrameNames('hunter2', 1,7, '.png', 4), 6, true);
				hp.animations.add('wolfanim', Phaser.Animation.generateFrameNames('wolf', 1,5, '.png', 4), 6, true);
				hp.animations.add('death', Phaser.Animation.generateFrameNames('huntershot', 1,5, '.png', 4), 6, false);
				hp.animations.add('death2', Phaser.Animation.generateFrameNames('huntershot2', 1,4, '.png', 4), 6, false);
				hp.animations.add('wolfdeath', Phaser.Animation.generateFrameNames('wolfdeath', 1,1, '.png', 4), 6, false);
				hp.inputEnabled = true;
				hp.hit = false;
				hp.width = 96;
				hp.x = 80+256*t;
				hp.y = 220+(140*i);
				hp.fired = false;
				hp.up = false;
				hp.damage = 0;
				hp.events.onInputDown.add(this.killer, this);
				positions.push(hp);
				var soil = this.game.add.sprite(hp.x+50,hp.y+80,'soil');
				soil.anchor.setTo(0.5, 0.5);
				soil.height = 190;
				soil.width = 190;
				
				
			}
		}
		// create six bullets
		for(var s=1;s<7;s++){
			bu = this.game.add.sprite(0, 0, 'bullet');
			bu.x = 820+ 16*s;
			bu.y = 700;
			bullets.push(bu);
		}
		//create reload gun button
		relo = this.game.add.sprite(770, 690, 'reload');
		relo.visible = false;
		relo.inputEnabled = true;
		relo.events.onInputDown.add(this.loadGun, this);
		
		//create event listeners for stage	
		this.game.input.onDown.add(this.shotCount, this);	
		this.game.time.events.add(Phaser.Timer.SECOND * 1, this.fireMole, this);
		//create emitter for hit shots
		emitter = this.game.add.emitter(0, 0, 200);
		emitter.makeParticles('star');
		emitter.gravity = 0;
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;
		emitter.setAll('anchor.x', 0.5);
	    emitter.setAll('anchor.y', 0.5);
		emitter.minParticleSpeed.setTo(-200, -200);
	    emitter.maxParticleSpeed.setTo(400, 400);

			    
	},
	
	//when bullet chamber empty reload
	loadGun: function(targ){
		bullet = 6;
		for(var b=0;b<bullet;b++)
		{
			bullets[b].visible = true;
		}
	},
	//bullet fired
	shotCount: function(){
		
		bullet -= 1;
		if(bullet >=0)
		{
			gunshot.play();
			bullets[bullet].visible = false;
			
		}else{
			dry.play();
		}
		
		
	},
	//show character
	fireMole: function(){
		
		shown +=1;
		if(shown > 10){
			level = 2;
		}
		var rd = Math.round(Math.random()*15);
		
		var newPos = positions[rd];
		while(newPos.fired != false){
			 rd = Math.round(Math.random()*15);

			 newPos = positions[rd];
		}
		
		var newColor = Math.round(Math.random()*3);
		
		if(newColor == 3 && level > 1){
			newPos.animations.play('hunter2');
			newPos.name ="blue";
			newPos.damage = 2;
	}else if(newColor == 2){
			newPos.animations.play('hunter1');
			newPos.name ="red";
			newPos.damage = 1;
	}else if(newColor == 1){
		newPos.animations.play('wolfanim');
		newPos.name ="wolf";
		newPos.damage = 1;
	}else{
		newPos.animations.play('hunter1');
		newPos.name ="red";
		newPos.damage = 1;
	}
		if(newPos.fired == false)
		{
			
			this.showMole(newPos);
			if(speed > 0.2)
			{
				speed -= 0.025;
			}
		
	}
		
		if(shown <=99 ){
		this.game.time.events.add(Phaser.Timer.SECOND *  speed, this.fireMole, this);
	}

	},
	shuffleArray:function(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	},
	
	killer:function(targ){
		
		if(bullet >=0){
			
			if(targ.up == true){
			targ.damage -=1;
			
			emitter.start(true, 1000, null, 20);
			emitter.x = targ.x + (targ.width *0.5);
			emitter.y = targ.y + (targ.height *0.5);
			
			if(targ.damage ==0)
			{
				
					targ.hit = true;
					if(targ.name =="blue")
					{
						targ.animations.play('death2');
						killed +=15;
						redkill +=1;
						gag.play();
					}else if(targ.name == "red")
					{
						targ.animations.play('death');
						killed +=10;
						bluekill += 1;
						gag.play();
					}else if(targ.name == "wolf")
					{
				targ.animations.play('wolfdeath');
						killed -=20;
						wolfkill+=1;
						wolfcry.play();
					}
			targ.inputEnabled = false;
			scoreTxt.text = ""+killed;
			BasicGame.score = killed;
		}
			}
		}else{
	
			
			bullet = 0;
		}
	},
	
	showMole: function(targ){
		
		displayed +=1;
		targ.inputEnabled = true;
		targ.fired = true;
		targ.hit = false; 
		targ.up = true;
		tween = this.game.add.tween(targ).to( {y:targ.y-160 }, 500, Phaser.Easing.Bounce.Out, false);
		tween.onComplete.add(function(){
				this.hideMole(targ);
					}, this);
		tween.start();
		
	},
	
	hideMole: function(targ){
		
		var tween = this.game.add.tween(targ).to( {y:targ.y+160 }, 400, Phaser.Easing.Bounce.Out, false,1000);
		tween.onComplete.add(function(){
			targ.fired = false;
			targ.up = false;
			displayed -=1;
			//end game and show score
			if(shown >= 100 && displayed == 0){
			BasicGame.redkill = redkill;
			BasicGame.bluekill = bluekill;
			BasicGame.wolfkill = wolfkill;
				
				this.game.time.events.add(Phaser.Timer.SECOND * 2, this.finalScore, this);
			}
					}, this);
		tween.start();
	},
	
	finalScore:function(){
		this.state.start('FinalScore');
	},
	update: function () {

		if(gameOver == true){
			this.state.start('Preloader');
		}
	 if(bullet <= 0){
		
		relo.visible = true;
		relo.inputEnabled = true;
	}else{
		relo.visible = false;
		relo.inputEnabled = false;
	}
	},
	
	particleBurst: function(buX,buY) {
		
	    emitter.x = buX;
	    emitter.y = buY;
	    emitter.start(true, 800, null, 100);

	},
	
	quitGame: function (pointer) {

		
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
