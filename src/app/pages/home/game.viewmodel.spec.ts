import { expect, test } from 'vitest';
import { InMemoryRandom } from '../../infra/random/in-memory-random.infra';
import { GameViewModel, GameVM } from "./game.viewmodel";

describe("GameViewModel", () => {

    test("Example : Beginning of game should show empty history", () => {
        // GIVEN
        const game = givenNewGame({ max: 20, attempt: 1});

        // WHEN
        const res = game.newGame();

        // THEN
        const expected: Partial<GameVM> = {
            isGameOver: false,
            remainingAttempt: 1,
            guesses: []
        }
        expect(res).toMatchObject(expected);
    });

    test("Example : Lose on last guess", () => {
        // GIVEN
        const game = givenNewGame({ max: 20, attempt: 1});

        // WHEN
        const res = game.guess(5);

        // THEN
        const expected: Partial<GameVM> = {
            isGameOver: true,
            guesses: [
                {
                    userGuess: 5,
                    response: "Lost ! The secret number was : 15"
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
            isGameOver: true,
            guesses: [
                {
                    userGuess: 15,
                    response: "Won !"
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
            isGameOver: false,
            remainingAttempt: 9,
            guesses: [
                {
                    userGuess: 20,
                    response: "Too high !"
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
            isGameOver: false,
            guesses: [
                {
                    userGuess: 5,
                    response: "Too low !"
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
            isGameOver: true,
            guesses: [
                {
                    userGuess: 5,
                    response: "Too low !"
                },{
                    userGuess: 15,
                    response: "Won !"
                }
            ]
        }
        expect(res).toMatchObject(expected);
    });

    test("Example : Duplicate guesss should be displayed but not counted", () => {
        // GIVEN
        const game = givenNewGame({ max: 20, attempt: 2});

        // WHEN
        game.guess(5);
        const res = game.guess(5);

        // THEN
        const expected: Partial<GameVM> = {
            isGameOver: false,
            remainingAttempt: 1,
            guesses: [
                {
                    userGuess: 5,
                    response: "Too low !"
                }, {
                    userGuess: 5,
                    response: "Proposition done before !"
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