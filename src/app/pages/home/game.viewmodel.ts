

export enum GameState {
    IN_PROGRESS,
    WIN,
    LOSE
}

export type Guess = {
    userGuess: number;
    response: String;
}

export type GameVM = {
    state: GameState
    guesses: Guess[]
}

export class GameViewModel {

    constructor() { }

    newGame(): GameVM {
        return {
            state: GameState.IN_PROGRESS,
            guesses: [
                {
                    userGuess: 10,
                    response: "Trop grand"
                }, {
                    userGuess: 5,
                    response: "Trop petit"
                }
            ]
        };
    }

    guess(userGuess: number): GameVM {
        return {
            state: GameState.WIN,
            guesses: [
                {
                    userGuess: 10,
                    response: "Trop grand"
                }, {
                    userGuess: 5,
                    response: "Trop petit"
                }, {
                    userGuess: userGuess,
                    response: "Trouvé !"
                }
            ]
        };
    }
}