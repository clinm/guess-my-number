import { expect, test } from 'vitest'
import { GameState, GameViewModel, GameVM } from "./game.viewmodel";
import { InMemoryRandom } from '../../infra/random/in-memory-random.infra';

describe("GameViewModel", () => {

    test("Example : Lose on last guess", () => {
        // GIVEN
        const game = givenNewGame({ max: 20, attempt: 1});

        // WHEN
        const res = game.guess(5);

        // THEN
        const expected: Partial<GameVM> = {
            state: GameState.LOSE,
            isGameOver: true,
            guesses: [
                {
                    userGuess: 5,
                    response: "Perdu ! La valeur était : 15"
                }
            ]
        }
        expect(res).toMatchObject(expected);
    });

    test("Example : Win on last guess", () => {
        // GIVEN
        const game = givenNewGame({ max: 20, attempt: 1});

        // WHEN
        const res = game.guess(15);

        // THEN
        const expected: Partial<GameVM> = {
            state: GameState.WIN,
            isGameOver: true,
            guesses: [
                {
                    userGuess: 15,
                    response: "Gagné !"
                }
            ]
        }
        expect(res).toMatchObject(expected);
    });

    test("Example : Guess is too high with remaining attempts", () => {
        // GIVEN
        const game = givenNewGame({ max: 20, attempt: 10});

        // WHEN
        const res = game.guess(20);

        // THEN
        const expected: Partial<GameVM> = {
            state: GameState.IN_PROGRESS,
            isGameOver: false,
            guesses: [
                {
                    userGuess: 20,
                    response: "Trop grand !"
                }
            ]
        }
        expect(res).toMatchObject(expected);
    });

    test("Example : Guess is too low with remaining attempts", () => {
        // GIVEN
        const game = givenNewGame({ max: 20, attempt: 10});

        // WHEN
        const res = game.guess(5);

        // THEN
        const expected: Partial<GameVM> = {
            state: GameState.IN_PROGRESS,
            isGameOver: false,
            guesses: [
                {
                    userGuess: 5,
                    response: "Trop petit !"
                }
            ]
        }
        expect(res).toMatchObject(expected);
    });

    test("Example : Guess in two attempts show history", () => {
        // GIVEN
        const game = givenNewGame({ max: 20, attempt: 10});

        // WHEN
        game.guess(5);
        const res = game.guess(15);

        // THEN
        const expected: Partial<GameVM> = {
            state: GameState.WIN,
            isGameOver: true,
            guesses: [
                {
                    userGuess: 5,
                    response: "Trop petit !"
                },{
                    userGuess: 15,
                    response: "Gagné !"
                }
            ]
        }
        expect(res).toMatchObject(expected);
    });

    function givenNewGame( config: { max: number, attempt: number}): GameViewModel {
        const game = new GameViewModel(new InMemoryRandom(0.75), config);
        game.newGame();
        return game;
    }
});