/**
 * This file contains all the logic for updating the game state.
 */

import { Card, CardId, GameState, Zone, ZoneId } from "./ontology";

export function initializeGameState(): GameState {
    return {
        cards: new Map(),
        zones: new Map(),
        cardZones: new Map(),
    };
}

export function addCard(state: GameState, card: Card): CardId {
    const n = state.cards.size;
    const id = `card-${n.toString()}`;
    state.cards.set(id, card);
    return id;
}

export function addZone(state: GameState, zone: Zone): ZoneId {
    const n = state.zones.size;
    const id = `zone-${n.toString()}`;
    state.zones.set(id, zone);
    return id;
}
