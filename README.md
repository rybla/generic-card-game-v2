# generic-card-game-v2

## Tech Stack

- project manager: [pnpm](https://pnpm.io)
- web framework: [NextJS](https://nextjs.org)
- auth: [next-auth](https://next-auth.js.org) with [Google sign-in](https://developers.google.com/identity/sign-in/web/sign-in)

## Organization

This project is a generic card game system.

The pages of the app:

- page `/`:
    - The user must sign in
    - A list of lobby games
        - The user can click on a lobby game to join it.
        - The user can click the "new game" button to create a new lobby game (by going to `/new`)
    - If the player is a member of a game, then information about that game is presented in a side component next to the list of lobby games.
        - If the player is the owner of that game, they have a button "start" which they can click to start the new game.
- page `/new`:
    - The user specifies the details of the new game, such as the name
    - When the user is finished customizing the game, they click "submit". This creates a new LobbyGame with the user as its owner.
    - The player is then redirected back to `/` where the lobby is.
- page `/deck`:
    - A page where the user can upload a deck file to view and edit in a nice GUI
- page `/play/[gameId]`:
    - This is where the actual game (of the route's specified `gameId`) is played once it is started.

## Contributing

Once you've made changes, run the script `./validate.sh`. This script must run successfully (NO warnings and NO errors) before you submit your changes.
