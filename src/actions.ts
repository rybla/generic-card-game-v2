import { auth } from "./auth";
import { initializeGameState } from "./game";
import { Game, GameId, UserId } from "./ontology";
import { error, ok, Result } from "./utility";

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
export async function createLobbyGame(): Promise<Result<string, GameId>> {
    const session = await auth();
    if (!session) return error("no session");
    if (!session.user) return error("no user");
    if (!session.user.id) return error("no user id");
    const userId = session.user.id;

    if (userGames.has(userId)) {
        return error("user is already in a game");
    }

    const gameId = Math.random().toString(36).substring(2, 15);

    const lobbyGame: Game = {
        type: "lobby",
        gameId,
        ownerId: userId,
    };

    games.set(gameId, lobbyGame);
    userGames.set(userId, gameId);

    return ok(lobbyGame.gameId);
}

/**
 * The session user joins an existing {@link LobbyGame}.
 */
export async function joinLobbyGame(
    gameId: GameId,
): Promise<Result<string, GameId>> {
    const session = await auth();
    if (!session) return error("no session");
    if (!session.user) return error("no user");
    if (!session.user.id) return error("no user id");
    const userId = session.user.id;

    if (userGames.has(userId)) {
        return error("user is already in a game");
    }

    const game = games.get(gameId);
    if (!game) {
        return error("game not found");
    }

    if (game.type !== "lobby") {
        return error("game is not a lobby game");
    }

    userGames.set(userId, gameId);

    return ok(gameId);
}

/**
 * If the client user is the owner of a LobbyGame, then they can start the game. The LobbyGame is removed from {@link lobbyGames}, a new {@link ActiveGame} is initialized (using {@link initializeGameState}), and the new {@link ActiveGame} is added to {@link activeGames} with the same {@link GameId} as the original {@link LobbyGame}.
 */
export async function startLobbyGame(): Promise<Result<string, void>> {
    const session = await auth();
    if (!session) return error("no session");
    if (!session.user) return error("no user");
    if (!session.user.id) return error("no user id");
    const userId = session.user.id;

    const gameId = userGames.get(userId);
    if (!gameId) {
        return error("user is not in a game");
    }

    const game = games.get(gameId);
    if (!game) {
        return error("game not found");
    }

    if (game.ownerId !== userId) {
        return error("user is not the owner of the game");
    }

    if (game.type !== "lobby") {
        return error("game is not a lobby game");
    }

    games.set(gameId, {
        ...game,
        type: "active",
        state: initializeGameState(),
    });

    return ok(undefined);
}
