# Poker101 UI (User Interface) Documentation 

## To run the application
`npm run start` in root directory

## Components

### App
- /src/app/components 
- Root component that contains the switch and routes for all the UI components including Dashboard, Profile and Game components

## Navbar
- /src/app/components/navigation
- UI contains the top navigation bar with the links for the various page routes such as Dashboard, 
## Dashboard
- /src/app/components/dashboard
- UI displays the top navbar, and the user's game statistics such as all the games they have played/if they won or lost
- Contains the create game button that allows users to start a new game
- 
### Game
- /src/game/components
- UI contains the game board that displays the users cards and the the opposing players cards face down in circle. 
- Contains a real time game log that displays all events that occur in the game
- Communicates with the server to store game state in the Game table in the database 

### Profile
- - /src/profile/components
- UI displays the user's data such as name, email and profile picture 
- When a user signs in, either through auth0 or a third party (gmail), the users data is sent back to the frontend. 
The frontend will then query the backend to check if the user already exists through their email. 
If it doesn't we will store it in the database. 






