# Poker101 UI Documentation 

typescript
react
npm 
jest

## To run the application
Run `npm run start` in root directory. The application will use http://localhost:3000/ 

## Components

### App
- /src/app/components 
- Root component that contains the switch and routes for all the UI components including Dashboard, Profile and Game components

### Navbar
- /src/app/components/navigation
- UI contains the top navigation bar with the links for the various page routes such as Dashboard, 
### Dashboard
- /src/app/components/dashboard
- UI displays the top navbar, and the user's game statistics such as all the games they have played/if they won or lost
- Contains the create game button that allows users to start a new game, 
  see the win/loss/draw record of themselves and others, 
  see game moves of completed games, 
  join an existing game that needs players.

### Game
- /src/game/components
- UI contains the game board that displays the users cards and the the opposing players cards face down in circle. 
- Contains a real time game log that displays all events that occur in the game
- If users turn, set timer for turn limit - detect if their session ended or closed browser

HTTP 
- Communicates with the server to store game state in the Game table in the database 
- Parameters, return types

Validation
- When user creates a game, they must invite at least one player and at most 5. 
- Number of chips and ante inputs only accepts numeric values and positive integers and less than a million. 

### Profile
- /src/profile/components
- UI displays the user's data such as name, email and profile picture 