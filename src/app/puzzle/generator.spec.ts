import { Direction, Generator, Grid } from "./generator";

describe("Generator", () => {

    it("Example : should place 'WORD' as horizontal", () => { 
        // GIVEN
        const generator = new Generator();

        // WHEN
        const expected: Grid = {
            placedWords: [
                { word: "WORD", position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL }
            ]
        };

        const res = generator.generate({
            words: ["WORD"],
        });

        // THEN
        expect(res).toEqual(expected);

    });

    it("Example : should place 'WORD' as hozizontal and 'WEEK' as vertical", () => { 
        // GIVEN
        const generator = new Generator();

        // WHEN
        const expected: Grid = {
            placedWords: [
                { word: "WORD", position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL },
                { word: "WEEK", position: { x: 0, y: 0 }, direction: Direction.VERTICAL }
            ]
        };

        const res = generator.generate({
            words: ["WORD", "WEEK"],
        });

        // THEN
        expect(res).toEqual(expected);

    });

    it("Example : should place 'WORD' as hozizontal and 'RUN' as vertical", () => {
        // GIVEN
        const generator = new Generator();

        // WHEN
        const expected: Grid = {
            placedWords: [
                { word: "WORD", position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL },
                { word: "RUN", position: { x: 2, y: 0 }, direction: Direction.VERTICAL }
            ]
        };

        const res = generator.generate({
            words: ["WORD", "RUN"],
        });

        // THEN
        expect(res).toEqual(expected);
    });

    it("Example : should place 'WORD' as hozizontal and 'WEEK','RUN' as vertical", () => {
        // GIVEN
        const generator = new Generator();

        // WHEN
        const expected: Grid = {
            placedWords: [
                { word: "WORD", position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL },
                { word: "WEEK", position: { x: 0, y: 0 }, direction: Direction.VERTICAL },
                { word: "RUN", position: { x: 2, y: 0 }, direction: Direction.VERTICAL }
            ]
        };

        const res = generator.generate({
            words: ["WORD", "WEEK", "RUN"],
        });

        // THEN
        expect(res).toEqual(expected);
    });

    it("Example : should place 'WORD' as horizontal and 'NIGHT' as not placed", () => {
        // GIVEN
        const generator = new Generator();

        // WHEN
        const expected: Grid = {
            placedWords: [
                { word: "WORD", position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL }
            ],
            unplacedWords: ["NIGHT"]
        };

        const res = generator.generate({
            words: ["WORD", "NIGHT"],
        });

        // THEN
        expect(res).toEqual(expected);
    });

    it("Example : should place 'WORD' as horizontal, 'RUN' vertical and 'NIGHT' horizontal", () => {
        // GIVEN
        const generator = new Generator();

        // WHEN
        const expected: Grid = {
            placedWords: [
                { word: "WORD", position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL },
                { word: "RUN", position: { x: 2, y: 0 }, direction: Direction.VERTICAL },
                { word: "NIGHT", position: { x: 2, y: 2 }, direction: Direction.HORIZONTAL }
            ]
        };

        const res = generator.generate({
            words: ["WORD", "RUN", "NIGHT"],
        });

        // THEN
        expect(res).toEqual(expected);
    });

    it("Example : should place 'WORD' as horizontal, 'LOL' vertical", () => {
        // GIVEN
        const generator = new Generator();

        // WHEN
        const expected: Grid = {
            placedWords: [
                { word: "WORD", position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL },
                { word: "LOL", position: { x: 1, y: -1 }, direction: Direction.VERTICAL }
            ]
        };

        const res = generator.generate({
            words: ["WORD", "LOL"],
        });

        // THEN
        expect(res).toEqual(expected);
    });

    it("Example : should place 'WORD' as horizontal, 'WEEK' vertical and not 'WHAT' because 'W' is already used", () => {
        // GIVEN
        const generator = new Generator();

        // WHEN
        const expected: Grid = {
            placedWords: [
                { word: "WORD", position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL },
                { word: "WEEK", position: { x: 0, y: 0 }, direction: Direction.VERTICAL }
            ],
            unplacedWords: ["WHAT"]
        };

        const res = generator.generate({
            words: ["WORD", "WEEK", "WHAT"],
        });

        // THEN
        expect(res).toEqual(expected);
    });

});

/**
 * x un seul mot hozizontal
 * x un mot horizontal et un mot vertical qui se croise sur la première lettre
 * x un mot horizontal et un mot vertical qui se croise sur la troisième lettre
 * x un mot horizontal et deux mots verticaux qui se croisent sur la première et troisième lettre   
 * x WORD hozirontal, NIGHT not placed
 * x WORD hozirontal, RUN vertical et NIGHT horizontal
 * X WORD hozirontal, LOL vertical
 * X peut pas utiliser la même lettre plusieurs fois
 * 
 * - si ajout d'un mot, alors tout ceux qu'on n'a pas placé peuvent être ressayés
 * -> WORD, WEEK, OAT cannot be placed
 * - tester plusieurs combinaisons si on ne peut pas tout placer sur la grille (récursif)
 * WORD
 *   U
 *   NIGHT
 * 
 * WORD
 * E U
 * E N
 * K
 * 
 *  L 
 * WORD
 *  L
 * 
 *  {
 *      "a": [ { placedWord, index} ]
 *  }
 */