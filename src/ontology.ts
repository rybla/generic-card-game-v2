import z from "zod";

export type GameId = string;
export type UserId = string;
export type CardId = string;
export type ZoneId = string;

export type Game = { gameId: GameId; ownerId: UserId } & (
    | { status: "lobby" }
    | { status: "active"; state: GameState }
);

export type GameState = {
    cards: Map<CardId, Card>;
    zones: Map<ZoneId, Zone>;
    /**
     * Each card is mapped to the zone it is currently in.
     */
    cardZones: Map<CardId, ZoneId>;
};

export type Zone = {
    name: string;
    /**
     * If there is an ownerId specified, then this zone is a private zone,
     * which means that only the owner is able to view and interact with cards
     * in this zone. For example, a user's hand of cards should be a private
     * zone with their UserId as the ownerId of the Zone.
     */
    ownerId?: UserId;
};

export type Card = z.infer<typeof Card>;
export const Card = z.object({
    name: z.string(),
    content: z.string(),
});

export type Deck = z.infer<typeof Deck>;
export const Deck = z.object({
    name: z.string(),
    cards: z.array(Card),
});
