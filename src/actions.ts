/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */

import { Game, GameId, UserId } from "./ontology";

/**
 * Map of each game's {@link GameId} to the {@link Game} itself.
 */
const games: Map<GameId, Game> = new Map();

/**
 * Map of each user's {@link UserId} to the {@link GameId} of the game they are a member of (if any).
 */
const userGames: Map<UserId, GameId> = new Map();

/**
 * The session user creates a new {@link LobbyGame} with themselves as the first member.
 */
export async function createLobbyGame(): Promise<GameId> {
    throw new Error("Not implemented");
}

/**
 * The session user joins an existing {@link LobbyGame}.
 */
export async function joinLobbyGame(gameId: GameId): Promise<GameId> {
    throw new Error("Not implemented");
}

/**
 * If the client user is the owner of a LobbyGame, then they can start the game. The LobbyGame is removed from {@link lobbyGames}, a new {@link ActiveGame} is initialized (using {@link initializeGameState}), and the new {@link ActiveGame} is added to {@link activeGames} with the same {@link GameId} as the original {@link LobbyGame}.
 */
export async function startLobbyGame(): Promise<void> {
    throw new Error("Not implemented");
}
