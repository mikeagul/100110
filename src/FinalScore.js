var scoreTxt;
var blueTxt;
var redTxt;
var wolfTxt;
BasicGame.FinalScore = function (game) {

	
};

BasicGame.FinalScore.prototype = {

	create: function () {


		var backgound = this.add.sprite(0, 0, 'finalScore');
		//show final score and characters hit
		
		scoreTxt = this.game.add.bitmapText(320, 240, 'stoned','SCORE: '+BasicGame.score, 64);
		blueTxt = this.game.add.bitmapText(240, 565, 'stoned',''+BasicGame.bluekill, 48);
		redTxt = this.game.add.bitmapText(580, 565, 'stoned',''+BasicGame.redkill, 48);
		wolfTxt = this.game.add.bitmapText(910, 565, 'stoned',''+BasicGame.wolfkill, 48);
		
		//start new game
		this.input.onDown.add(this.startGame, this);	
		
	},

	

	startGame: function (pointer) {

		
		this.state.start('Game');

	}

};
