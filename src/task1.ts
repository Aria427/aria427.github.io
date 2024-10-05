import * as PIXI from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';

// Configuration constants
const NUM_CARDS = 144;		// Number of sprites / cards
const CARD_OFFSET = 5;     	// Offset between cards in a stack
const NUM_STACKS = 6;		// Number of different stacks
const CARD_WIDTH = 100;		// Each card's width
const CARD_HEIGHT = 120;    // Each card's height
const STACK_SPACING = 10;  	// Distance between stacks
const TOP_CARD_MOVE_INTERVAL = 1000; 	// The top card should move to a different stack every 1 second
const TOP_CARD_ANIM_INTERVAL = 2000; 	// The animation of the top card movement lasts 2 seconds

/**
 * This includes the main functionality for Task 1 
 */
export function task1(app: PIXI.Application) 
{
	// Set up different card stacks 
	const cardStacks: PIXI.Container[] = [];

	for (let i = 0; i < NUM_STACKS; i++) {
	    const stackContainer = new PIXI.Container();
	    stackContainer.x = i * (CARD_WIDTH + STACK_SPACING);
	    stackContainer.y = CARD_HEIGHT;
	    app.stage.addChild(stackContainer);
	    cardStacks.push(stackContainer);
	}

	// Create card textures (just a simple rectangle)
	const cardTexture = PIXI.Texture.WHITE;

	// Create drop shadow filter 
	const dropShadowFilter = new DropShadowFilter({
	    blur: 1,
	    quality: 5,
	    color: 0x000000,
	    alpha: 0.4,
	});

	// Create cards and stack them in the first stack
	const cards: PIXI.Sprite[] = [];
	for (let i = 0; i < NUM_CARDS; i++) {
	    const card = new PIXI.Sprite(cardTexture);
	    card.width = CARD_WIDTH;
	    card.height = CARD_HEIGHT;
	    card.tint = Math.random() * 0xFFFFFF;  	// Random colour for each card
	    card.y = i * CARD_OFFSET;  				// Offset each card by a small value to simulate a stack
	    card.filters = [dropShadowFilter];		// Apply drop shadow for each card
	    cardStacks[0].addChild(card);
	    cards.push(card);
	}

	// Move the top card every # seconds
	setInterval(moveTopCard, TOP_CARD_MOVE_INTERVAL);

	/**
	 * The function moves the top card to a different stack every TOP_CARD_MOVE_INTERVAL 
	 */
	function moveTopCard() {
	    // Find the top card from the stack where cards exist
	    let sourceStack = cardStacks.find(stack => stack.children.length > 0);
	    if (!sourceStack) return;

	    // Get the top card from the source stack
	    const topCard = sourceStack.children[sourceStack.children.length - 1] as PIXI.Sprite;

	    // Choose a new stack to move the card to (must be different from the current stack)
	    let targetStack = cardStacks[Math.floor(Math.random() * NUM_STACKS)];
	    while (targetStack === sourceStack) {
	        targetStack = cardStacks[Math.floor(Math.random() * NUM_STACKS)];
	    }

	    // Remove the card from the source stack (simulating movement)
	    sourceStack.removeChild(topCard);

	    // Calculate the target, start and delta positions
	    const targetX: number = targetStack.x;
	    const targetY: number = targetStack.y + (targetStack.children.length * CARD_OFFSET);
	    const startX = topCard.x;
	    const startY = topCard.y;
	    const deltaX = targetX - startX;
	    const deltaY = targetY - startY;

	    // Animate the card to the new position (# seconds duration)
	    const startTime = performance.now();
	    app.ticker.add(function animateCard() {
	    	const elapsedTime = performance.now() - startTime;
	    	const progressTime = elapsedTime / TOP_CARD_ANIM_INTERVAL;
			const easedProgress = Math.min(progressTime, 1); 

	        if (easedProgress >= 1) {
	        	// Finish the animation
	            topCard.x = targetX;
	            topCard.y = targetY;

			    targetStack.addChild(topCard);
			    topCard.x = 0;  // Reset relative X position in the new stack
			    topCard.y = targetStack.children.length * CARD_OFFSET;  // Adjust for new stack height
			    
			    app.ticker.remove(animateCard);
	        } else {
				topCard.x = startX + deltaX * easedProgress;
				topCard.y = startY + deltaY * easedProgress;
	        }   
	    }); 
	}
}