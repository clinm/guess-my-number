import { RandomGenerator } from "../../infra/random/random.infra";


export enum GuessState {
    TOO_LOW,
    TOO_HIGH,
    WIN,
    LOSE
}

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
    state: GameState,
    isGameOver: boolean,
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
            isGameOver: false,
            guesses: this.guesses
        };
    }

    guess(userGuess: number): GameVM {

        const wasProposedEarlier = this.guesses.some(g => g.userGuess === userGuess);
        if (wasProposedEarlier) {
            return this.generateInProgressState(userGuess, "Proposition déjà faite !");
        }

        this.remainingAttempt--;
        
        if (userGuess === this.toGuessNumber) {
            return this.generateWinState(userGuess);    
        }

        if (this.remainingAttempt === 0) {
            return this.generateLoseState(userGuess);
        }

        const response = this.toGuessNumber < userGuess ? "Trop grand !" : "Trop petit !";
        return this.generateInProgressState(userGuess, response);

    }

    private generateLoseState(userGuess: number): GameVM {
        this.guesses.push({
            userGuess: userGuess,
            response: "Perdu ! La valeur était : " + this.toGuessNumber
        });

        return {
            state: GameState.LOSE,
            isGameOver: true,
            guesses: this.guesses
        };
    }

    private generateWinState(userGuess: number): GameVM {
        this.guesses.push({
            userGuess: userGuess,
            response: "Gagné !"
        });

        return {
            state: GameState.WIN,
            isGameOver: true,
            guesses: this.guesses
        };
    }

    private generateInProgressState(userGuess: number, response: string): GameVM {
        this.guesses.push({
            userGuess: userGuess,
            response: response
        });

        return {
            state: GameState.IN_PROGRESS,
            isGameOver: false,
            guesses: this.guesses
        };
    }
}