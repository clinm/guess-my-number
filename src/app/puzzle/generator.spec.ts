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

});

/**
 * x un seul mot hozizontal
 * x un mot horizontal et un mot vertical qui se croise sur la première lettre
 * x un mot horizontal et un mot vertical qui se croise sur la troisième lettre
 * - un mot horizontal et deux mots verticaux qui se croisent sur la première et troisième lettre   
 * - WORD hozirontal, RUN vertical et NIGHT horizontal
 * - WORD hozirontal, DOLL vertical
 * - WORD hozirontal, NIGHT not placed
 */