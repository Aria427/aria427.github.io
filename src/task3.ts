import * as PIXI from 'pixi.js';

// Configuration constants
const NUM_PARTICLES = 10; 		// Maximum number of particles / sprites 

// Fire particle images
const FIRE_PARTICLES = [
	'fire1',
	'fire2',
	'fire3',
	'fire4',
	'fire5',
	'fire6',
];

/**
 * This includes the main functionality for Task 3
 */
export function task3(app: PIXI.Application) 
{
	/**
	 * Class containing the fire particle functionality
	 */ 
	class Particle {
	    sprite: PIXI.Sprite;
	    life: number;
	    maxLife: number;

	    constructor(sprite: PIXI.Sprite) {
	        this.sprite = sprite;
	        this.sprite.anchor.set(0.5);
	        this.sprite.scale.set(0.5);
	        this.sprite.alpha = 0;
	        this.life = 0;
	        this.maxLife = Math.random() * 50 + 50; // Lifespan between 50 and 100
	        this.reset();
	    }

	    reset() {
	        this.sprite.x = Math.random() * app.screen.width;
	        this.sprite.y = app.screen.height; // Start at the bottom
	        this.sprite.alpha = Math.random() * 0.5 + 0.5; 		// Random alpha
	        this.sprite.scale.set(Math.random() * 0.5 + 0.5); 	// Random scale
	        this.life = 0; // Reset life
	    }

	    update() {
	        this.life++;
	        this.sprite.y -= 5; 							// Move up
	        this.sprite.x += (Math.random() - 0.5) * 0.5; 	// Random horizontal drift
	        this.sprite.alpha -= 0.02; 						// Fade out
	        if (this.life >= this.maxLife || this.sprite.alpha <= 0) {
	            this.reset();
	        }
	    }
	}

	// Set up fire particle container
	const fireContainer = new PIXI.Container();
	app.stage.addChild(fireContainer);

	// Create particles
	const particles: Particle[] = [];
	for (let i = 0; i < NUM_PARTICLES; i++) {
		const fireItem = getRandomItem(FIRE_PARTICLES);
		const fire = PIXI.Sprite.from(fireItem);
		const particle = new Particle(fire);
		particles.push(particle);
		fireContainer.addChild(particle.sprite);
	}

	// Game loop / demo
	app.ticker.add(() => {
		particles.forEach(particle => {
		    particle.update();
		});
	});
	
	/**
	 * Helper function to get a random item from an array
	 */
	function getRandomItem<T>(array: T[]): T {
	    return array[Math.floor(Math.random() * array.length)];
	}
}