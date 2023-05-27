import { Player } from "src/app/models/player.model";

export const PLAYERS : Player[] = [
    {
        id: "1",
        name: "Player 1",
        healthPoints: 30,
        handCards: ["1", "2"],
        hiddenCards: [],
        isPlaying: true,
        mana: 0,
        turnNumber: 0,
        playOrder: 0,
        handCardsNumber: 2,
        hiddenCardsNumber: 0
    },
    {
        id: "2",
        name: "Player 2",
        healthPoints: 30,
        handCards: [],
        hiddenCards: [],
        isPlaying: false,
        mana: 0,
        turnNumber: 0,
        playOrder: 1,
        handCardsNumber: 0,
        hiddenCardsNumber: 0
    }
]