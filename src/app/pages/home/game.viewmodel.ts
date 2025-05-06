import { RandomGenerator } from "../../infra/random/random.infra";


export type Guess = {
    userGuess: number;
    response: String;
}

export type GameVM = {
    isGameOver: boolean,
    remainingAttempt: number,
    guesses: Guess[]
}

export class GameViewModel {

    private toGuessNumber!: number;

    private remainingAttempt!: number;

    private guesses!: Guess[];

    private isGameOver!: boolean;

    constructor(private readonly randomGenerator: RandomGenerator,
                private readonly config: { max: number, attempt: number }) { }

    newGame(): GameVM {
        this.toGuessNumber = Math.floor(this.randomGenerator.get() * this.config.max);
        this.remainingAttempt = this.config.attempt;
        this.guesses = [];
        this.isGameOver = false;

        return this.generateGameVM();
    }

    guess(userGuess: number): GameVM {

        const wasProposedEarlier = this.guesses.some(g => g.userGuess === userGuess);
        if (wasProposedEarlier) {
            return this.generateProgressWithNewGuess(userGuess, "Proposition done before !");
        }

        this.remainingAttempt--;
        
        if (userGuess === this.toGuessNumber) {
            return this.generateWinState(userGuess);    
        }

        if (this.remainingAttempt === 0) {
            return this.generateLoseState(userGuess);
        }

        const response = this.toGuessNumber < userGuess ? "Too high !" : "Too low !";
        return this.generateProgressWithNewGuess(userGuess, response);

    }

    private generateLoseState(userGuess: number): GameVM {
        this.isGameOver = true;
        const lostMessage = "Lost ! The secret number was : " + this.toGuessNumber;
        return this.generateProgressWithNewGuess(userGuess, lostMessage);
    }

    private generateWinState(userGuess: number): GameVM {
        this.isGameOver = true;
        return this.generateProgressWithNewGuess(userGuess, "Won !");
    }

    private generateProgressWithNewGuess(userGuess: number, response: string): GameVM {
        this.guesses.push({
            userGuess: userGuess,
            response: response
        });

        return this.generateGameVM();
    }

    private generateGameVM(): GameVM {
        return {
            isGameOver: this.isGameOver,
            remainingAttempt: this.remainingAttempt,
            guesses: this.guesses
        };
    }
}