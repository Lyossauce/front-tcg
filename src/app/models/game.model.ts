export interface Game {
    id: string;
    turnNumber: number;
    isFinished: boolean;
    winner?: {
        playerId: string;
        name: string;
    }
}

export interface GameCreationObject {
    player1Name: string;
    player2Name: string;
}