import { RandomGenerator } from "../../infra/random/random.infra";


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

    private toGuessNumber!: number;

    private remainingAttempt!: number;

    constructor(private readonly randomGenerator: RandomGenerator,
                private readonly config: { max: number, attempt: number }) { }

    newGame(): GameVM {
        this.toGuessNumber = Math.floor(this.randomGenerator.get() * this.config.max);
        this.remainingAttempt = this.config.attempt;
        return {
            state: GameState.IN_PROGRESS,
            guesses: []
        };
    }

    guess(userGuess: number): GameVM {
        this.remainingAttempt--;
        if (userGuess === this.toGuessNumber) {
            return {
                state: GameState.WIN,
                guesses: [
                    {
                        userGuess: userGuess,
                        response: "Gagné !"
                    }
                ]
            };    
        }

        if (this.remainingAttempt === 0) {
            return {
                state: GameState.LOSE,
                guesses: [
                    {
                        userGuess: userGuess,
                        response: "Perdu !"
                    }
                ]
            };
        }

        if (this.toGuessNumber < userGuess) {
            return {
                state: GameState.IN_PROGRESS,
                guesses: [
                    {
                        userGuess: userGuess,
                        response: "Trop grand !"
                    }
                ]
            };
        } else {
            return {
                state: GameState.IN_PROGRESS,
                guesses: [
                    {
                        userGuess: userGuess,
                        response: "Trop petit !"
                    }
                ]
            };

        }

    }
}