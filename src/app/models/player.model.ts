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
    handCardsNumber: number;
    hiddenCardsNumber: number;
}

export interface PlayCardObject {
    playerId: string;
    cardId: string;
    gameId: string;
}

export interface HttpGetPlayerResponse {
    results: Player[];
}

export interface PlayerPropertyObject {
    label: string;
    propertyName: PlayerProperty;
    subProp?: SubProperty;
}

export type PlayerProperty = 'healthPoints'| 'mana'|'handCardsNumber'|'hiddenCardsNumber'
export type SubProperty = 'length'