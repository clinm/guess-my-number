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

    private guesses!: Guess[];

    constructor(private readonly randomGenerator: RandomGenerator,
                private readonly config: { max: number, attempt: number }) { }

    newGame(): GameVM {
        this.toGuessNumber = Math.floor(this.randomGenerator.get() * this.config.max);
        this.remainingAttempt = this.config.attempt;
        this.guesses = [];

        return {
            state: GameState.IN_PROGRESS,
            guesses: this.guesses
        };
    }

    guess(userGuess: number): GameVM {
        this.remainingAttempt--;
        if (userGuess === this.toGuessNumber) {
            this.guesses.push({
                userGuess: userGuess,
                response: "Gagné !"
            });

            return {
                state: GameState.WIN,
                guesses: this.guesses
            };    
        }

        if (this.remainingAttempt === 0) {
            this.guesses.push({
                userGuess: userGuess,
                response: "Perdu !"
            });

            return {
                state: GameState.LOSE,
                guesses: this.guesses
            };
        }

        if (this.toGuessNumber < userGuess) {
            this.guesses.push({
                userGuess: userGuess,
                response: "Trop grand !"
            });

            return {
                state: GameState.IN_PROGRESS,
                guesses: this.guesses
            };

        } else {
            this.guesses.push({
                userGuess: userGuess,
                response: "Trop petit !"
            });
            
            return {
                state: GameState.IN_PROGRESS,
                guesses: this.guesses
            };

        }

    }
}