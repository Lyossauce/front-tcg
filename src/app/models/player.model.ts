export interface Player {
    id: string;
    isPlaying: boolean;
    name: string;
    healthPoints: number;
    handCards: string[];
    hiddenCards: string[];
    mana: number;
    turnNumber: number;
    playOrder: number;
}

export interface PlayCardObject {
    playerId: string;
    cardId: string;
    gameId: string;
}