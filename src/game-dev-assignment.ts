import * as PIXI from 'pixi.js';
import { task1 } from './task1';
import { task2 } from './task2';
import { task3 } from './task3';

// Create the PIXI Application
const app = new PIXI.Application();

// Create the In-Game Menu
const menu = new PIXI.Container();

// Create the FPS Display Counter
const fps = new PIXI.Container();

// Run application using Asynchronous IIFE
(async () => {
  // Initialise the application in full screen
  await app.init({ background: 'D3D3D3', resizeTo: window });
  document.body.appendChild(app.canvas);

  // Preload assets
  await preload();

  // Set up responsive rendering
  window.addEventListener('resize', resize);
  resize(); // initial call

  // Create a text style
  const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fill: '#000000'
  });

  // Initialise the in-game menu
  const title = new PIXI.Text({text:'Game Menu', style});
  title.x = app.screen.width / 2 - title.width / 2;
  title.y = 100;
  menu.addChild(title);

  // Add buttons for each task
  const centerY = app.screen.height / 2;
  const task1Button = createMenuButton(app, 'Ace of Shadows', centerY - 100, startTask1);
  const task2Button = createMenuButton(app, 'Magic Words', centerY, startTask2);
  const task3Button = createMenuButton(app, 'Phoenix Flame', centerY + 100, startTask3);

  // Add buttons to menu 
  menu.addChild(task1Button);
  menu.addChild(task2Button);
  menu.addChild(task3Button);

  // Add menu to application
  app.stage.addChild(menu);

  // Set up FPS text
  const fpsText = new PIXI.Text({text: 'FPS: 0', style});
  fpsText.position.set(10, 10); // Set position in the top left corner
  fps.addChild(fpsText);
  app.stage.addChild(fps);

  // Update FPS text
  let frameCount = 0;
  let lastTime = performance.now();
  app.ticker.add(() => {
      frameCount++;
      const currentTime = performance.now();
      const elapsedTime = currentTime - lastTime;

      if (elapsedTime >= 1000) { // Update every second
          fpsText.text = `FPS: ${frameCount}`;
          lastTime = currentTime;
          frameCount = 0;
      }
  });
})();

/**
 * This method takes care of the preloading of the assets / images used
 */
async function preload()
{
  const assets = [
    { alias: 'cat1', src: 'src/images/cat1.jpg' },
    { alias: 'cat2', src: 'src/images/cat2.jpg' },
    { alias: 'cat3', src: 'src/images/cat3.jpg' },
    { alias: 'cat4', src: 'src/images/cat4.jpg' },
    { alias: 'fire1', src: 'src/images/flame1.png' },
    { alias: 'fire2', src: 'src/images/flame2.png' },
    { alias: 'fire3', src: 'src/images/flame3.png' },
    { alias: 'fire4', src: 'src/images/flame4.png' },
    { alias: 'fire5', src: 'src/images/flame5.png' },
    { alias: 'fire6', src: 'src/images/flame6.png' },
  ];

  await PIXI.Assets.load(assets);
}

/**
 * This method resizes the canvas responsively for both mobile and desktop devices
 */
function resize() {
    // Resize the renderer
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Scale the content to fit the new size
    const scaleX = window.innerWidth / app.screen.width;
    const scaleY = window.innerHeight / app.screen.height;
    app.stage.scale.set(scaleX, scaleY);
}

/**
 * This method sets up an In-Game Menu Button 
 */
function createMenuButton(app: PIXI.Application, text: string, y: number, onClick: () => void): PIXI.Container {
  const button = new PIXI.Container();
  const buttonBg = new PIXI.Graphics();
  buttonBg.fill(0x301934);
  buttonBg.roundRect(0, 0, 250, 50, 10);
  buttonBg.fill();
  button.addChild(buttonBg);

  const style = new PIXI.TextStyle({
      fill: 0xffffff,
      fontSize: 24
  });
  const buttonText = new PIXI.Text({text: text, style});

  buttonText.x = buttonBg.width / 2 - buttonText.width / 2;
  buttonText.y = buttonBg.height / 2 - buttonText.height / 2;
  button.addChild(buttonText);

  button.x = app.screen.width / 2 - buttonBg.width / 2;
  button.y = y;

  button.interactive = true;
  button.on('pointerdown', onClick);

  return button;
}

/**
 * This method loads task 1 - Ace of Shadows
 */
function startTask1() {
  loadScene('Task 1');
}

/**
 * This method loads task 2 - Magic Words
 */
function startTask2() {
  loadScene('Task 2');
}

/**
 * This method loads task 3 - Phoenix Flame
 */
function startTask3() {
  loadScene('Task 3');
}

/**
 * This method loads the scene depending on the task name
 */
function loadScene(sceneName: string) {
  // Clear current scene apart from FPS display counter
  removeAllChildrenExcept(app.stage, fps);

  switch(sceneName) {
    case 'Task 1': {
      task1(app);
      break;
    }
    case 'Task 2': {
      task2(app);
      break;
    }
    case 'Task 3': {
      task3(app);
      break;
    }
    default:
      break;
  }

  // Back button to return to the menu
  const backButton = createMenuButton(app, 'Back to Menu', app.screen.height - 100, () => {
    removeAllChildrenExcept(app.stage, fps);
    app.stage.addChild(menu); 
  });
  app.stage.addChild(backButton);
}

/**
 * Helper method to remove all children from the scene except for the one we want to keep
 */  
function removeAllChildrenExcept(container: PIXI.Container, keepChild: PIXI.Container) {
    const children = container.children.slice(); 
    children.forEach(child => {
        if (child !== keepChild) {
            container.removeChild(child);
        }
    });
}
