

export enum GameState {
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