import * as PIXI from 'pixi.js';

// Configuration constants
const RANDOM_INTERVAL = 2000; 	// The content should change every 2 seconds

// Texts
const TEXTS = [
	"Game Developer",
    "PixiJS",
    "TypeScript",
    "Cats",
];

// Image assets
const IMAGES = [
	'cat1', 
	'cat2', 
	'cat3', 
	'cat4', 
];

/**
 * This includes the main functionality for Task 2
 */
export function task2(app: PIXI.Application) 
{
	// Set up container for text & image content
	const contentContainer = new PIXI.Container();
	app.stage.addChild(contentContainer);

	 // Create image textures from image paths
    const imageTextures: PIXI.Texture[] = IMAGES.map(path => PIXI.Texture.from(path));

	// Change content every # seconds
	setInterval(generateRandomContent, RANDOM_INTERVAL);
	
	/**
	 * The function generates random content (text + images)
	 */
	function generateRandomContent() {
	    // Clear the previous content
	    contentContainer.removeChildren();

	    // Add random text to the container
	    const text = createRandomText();
	    text.x = Math.floor(Math.random() * (app.screen.width - text.width)); 	// Random x position
	    text.y = Math.floor(Math.random() * (app.screen.height - text.height)); // Random y position
	    contentContainer.addChild(text);

	    // Add random number of images (between 1 to 3) to the container
	    const numImages = Math.floor(Math.random() * 3) + 1;
	    for (let i = 0; i < numImages; i++) {
	        const image = createRandomImage();
	        image.x = Math.floor(Math.random() * (app.screen.width - image.width)); 	// Random x position
	        image.y = Math.floor(Math.random() * (app.screen.height - image.height)); 	// Random y position
	        contentContainer.addChild(image);
	    }
	}

	/**
	 * Helper function to create random text with random font size
	 */
	function createRandomText(): PIXI.Text {
	    const randomText = getRandomItem(TEXTS);
	    const randomFontSize = Math.floor(Math.random() * 40) + 20; 	// Random font size between 20px and 60px
	    const randomTextColour = Math.floor(Math.random() * 0xFFFFFF); 	// Random hex colour
	    const style = new PIXI.TextStyle({
	        fontFamily: 'Arial',
	        fontSize: randomFontSize,
	        fill: randomTextColour,
	        wordWrap: true,
	        wordWrapWidth: 400,
	    });
	    return new PIXI.Text({text: randomText, style});
	}

	/**
	 * Helper function to create a random image sprite
	 */
	function createRandomImage(): PIXI.Sprite {
	    const randomTexture = getRandomItem(imageTextures);
	    const sprite = new PIXI.Sprite(randomTexture);
	    
	    const originalWidth = sprite.texture.width;
	    const originalHeight = sprite.texture.height;

	    const randomWidth = Math.floor(Math.random() * 100) + 50; // Random width between 50px and 150px
	    
	    // Scale the height based on the original aspect ratio
	    const aspectRatio = originalHeight / originalWidth;
	    const randomHeight = randomWidth * aspectRatio;

	    sprite.width = randomWidth;
	    sprite.height = randomHeight;

	    return sprite;
	}

	/**
	 * Helper function to get a random item from an array
	 */
	function getRandomItem<T>(array: T[]): T {
	    return array[Math.floor(Math.random() * array.length)];
	}
}