
BasicGame.Preloader = function (game) {


	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		// show preloader background and load bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(254, 620, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		
		//load image assets
		this.load.image('menuBackground', 'images/menupanel.png');
		this.load.image('soil', 'images/bush.png');
		this.load.image('bullet', 'images/bullet.png');
		this.load.image('reload', 'images/reload.png');
		this.load.image('background', 'images/background.jpg');
		this.load.image('sky', 'images/sky.jpg');
		this.load.image('star', 'images/star.png');
		this.load.image('scoreboard', 'images/scoreboard.png');
		this.load.image('finalScore', 'images/finalscorepanel.png');
		
		//load character animations spritesheet
		this.load.atlas('horse', 'images/hunter.png', 'images/hunter.json');
		
		//load bitmap font
		this.load.bitmapFont('stoned', 'images/stoned.png', 'images/stoned.fnt');
		
		//load sounds dependent on device
		if(navigator.userAgent.match(/Android/gi))
		{
			this.load.audio('shot', ['audio/shotgun-old_school-RA_The_Sun_God-1129942741.ogg']);
			this.load.audio('dry', ['audio/Dry Fire Gun.ogg']);
			this.load.audio('wolfcry', ['audio/wolfcry.ogg']);
			this.load.audio('gag', ['audio/pain.ogg']);
		}
		else
		
		{
			this.load.audio('shot', ['audio/shotgun-old_school-RA_The_Sun_God-1129942741.mp3']);
			this.load.audio('dry', ['audio/Dry Fire Gun.mp3']);
			this.load.audio('gag', ['audio/pain.mp3']);
			this.load.audio('wolfcry', ['audio/wolfcry.mp3']);
			
		}

	},

	create: function () {

		
	},
	

	update: function () {

		
			this.ready = true;
			this.state.start('MainMenu');
		

	}

};
