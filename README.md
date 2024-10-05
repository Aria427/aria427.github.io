# Game Developer Assignment

This project was created using Typescript and PixiJS for rendering. 

It can be accessed through https://aria427.github.io/game-dev-assignment.html.

The project contains three tasks in total:
- Task 1: “Ace of Shadows". This creates 144 sprites that are stacked on top of each other like cards in a deck. The top card always covers the bottom card, but not completely. Every 1 second the top card moves to a different stack - the animation of the movement taking 2 seconds.
- Task 2: “Magic Words”. This tool mixes text and images in an easy way. Every 2 seconds it displays a random text (with a random font size and colour) along with a random amount of images (having a random sizing) in random positions.
- Task 3: “Phoenix Flame”. This renders a particle-effect demo showing a great fire effect. The number of images on the screen at the same time are set at a maximum of 10 sprites.

Each task can be accessed via the in-game menu you are first presented with when you load the project. The FPS are continously displayed and updated in the top-left hand corner.

It was ensured that the project is run in full screen mode and that it renders responsively for both mobile and desktop devices.

The source code (apart from the HTML file which is in the project root) can be found in the src folder. This contains the main game-dev-assignment TypeScript and game-dev-assignment CSS files. Each task's functionality is separated into its own TypeScriptfile - task1, task2 and task3. The images used throughout can be found in the images folder.

The compiled JavaScript code (built using NPM) can be found in the dist folder.

The project's configuration can be found in package.json, tsconfig.json and webpack.config.js.
