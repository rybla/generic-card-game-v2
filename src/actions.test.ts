import {
  createLobbyGame,
  games,
  joinLobbyGame,
  startLobbyGame,
  userGames,
} from "./actions";
import { auth } from "./auth";
import { Game } from "./ontology";

jest.mock("./auth", () => ({
  auth: jest.fn(),
}));

const mockAuth = auth as jest.Mock;

describe("Lobby Actions", () => {
  beforeEach(() => {
    // Clear all mocks and reset the in-memory stores before each test
    jest.clearAllMocks();
    games.clear();
    userGames.clear();
  });

  describe("createLobbyGame", () => {
    it("should create a new lobby game and add the user to it", async () => {
      mockAuth.mockResolvedValue({ user: { id: "user1" } });

      const result = await createLobbyGame();

      expect(result.type).toBe("ok");
      if (result.type === "ok") {
        const gameId = result.value;
        expect(games.has(gameId)).toBe(true);
        expect(games.get(gameId)?.ownerId).toBe("user1");
        expect(userGames.get("user1")).toBe(gameId);
      }
    });

    it("should return an error if the user is already in a game", async () => {
      mockAuth.mockResolvedValue({ user: { id: "user1" } });
      userGames.set("user1", "some-game-id");

      const result = await createLobbyGame();

      expect(result.type).toBe("error");
      expect(result.value).toBe("user is already in a game");
    });
  });

  describe("joinLobbyGame", () => {
    const gameId = "test-game";

    beforeEach(() => {
      const lobbyGame: Game = {
        type: "lobby",
        gameId,
        ownerId: "owner-id",
      };
      games.set(gameId, lobbyGame);
    });

    it("should allow a user to join a lobby game", async () => {
      mockAuth.mockResolvedValue({ user: { id: "user2" } });

      const result = await joinLobbyGame(gameId);

      expect(result.type).toBe("ok");
      expect(userGames.get("user2")).toBe(gameId);
    });

    it("should return an error if the user is already in a game", async () => {
      mockAuth.mockResolvedValue({ user: { id: "user2" } });
      userGames.set("user2", "another-game");

      const result = await joinLobbyGame(gameId);

      expect(result.type).toBe("error");
      expect(result.value).toBe("user is already in a game");
    });

    it("should return an error if the game is not found", async () => {
      mockAuth.mockResolvedValue({ user: { id: "user2" } });

      const result = await joinLobbyGame("non-existent-game");

      expect(result.type).toBe("error");
      expect(result.value).toBe("game not found");
    });

    it("should return an error if the game is not a lobby game", async () => {
      const activeGame: Game = {
        type: "active",
        gameId: "active-game",
        ownerId: "owner-id",
        state: { cards: new Map(), zones: new Map(), cardZones: new Map() },
      };
      games.set(activeGame.gameId, activeGame);
      mockAuth.mockResolvedValue({ user: { id: "user2" } });

      const result = await joinLobbyGame(activeGame.gameId);

      expect(result.type).toBe("error");
      expect(result.value).toBe("game is not a lobby game");
    });
  });

  describe("startLobbyGame", () => {
    const gameId = "test-game";
    const ownerId = "owner-id";

    beforeEach(() => {
      const lobbyGame: Game = {
        type: "lobby",
        gameId,
        ownerId,
      };
      games.set(gameId, lobbyGame);
      userGames.set(ownerId, gameId);
    });

    it("should allow the owner to start the game", async () => {
      mockAuth.mockResolvedValue({ user: { id: ownerId } });

      const result = await startLobbyGame();

      expect(result.type).toBe("ok");
      const game = games.get(gameId);
      expect(game?.type).toBe("active");
    });

    it("should return an error if the user is not in a game", async () => {
      mockAuth.mockResolvedValue({ user: { id: "user-not-in-game" } });

      const result = await startLobbyGame();

      expect(result.type).toBe("error");
      expect(result.value).toBe("user is not in a game");
    });

    it("should return an error if the user is not the owner", async () => {
      const otherUserId = "not-the-owner";
      userGames.set(otherUserId, gameId);
      mockAuth.mockResolvedValue({ user: { id: otherUserId } });

      const result = await startLobbyGame();

      expect(result.type).toBe("error");
      expect(result.value).toBe("user is not the owner of the game");
    });

    it("should return an error if the game is not a lobby game", async () => {
      const activeGameId = "active-game";
      const activeGame: Game = {
        type: "active",
        gameId: activeGameId,
        ownerId,
        state: { cards: new Map(), zones: new Map(), cardZones: new Map() },
      };
      games.set(activeGameId, activeGame);
      userGames.set(ownerId, activeGameId); // User is now in the active game
      mockAuth.mockResolvedValue({ user: { id: ownerId } });

      // Need to clear the original game for this test case
      games.delete(gameId);

      const result = await startLobbyGame();

      expect(result.type).toBe("error");
      expect(result.value).toBe("game is not a lobby game");
    });
  });
});
