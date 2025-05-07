import { Generator, Grid } from "./generator";

describe("Generator", () => {

    it("Example : should place 'WORD' as horizontal", () => { 
        // GIVEN
        const generator = new Generator();

        // WHEN
        const expected: Grid = {
            placedWords: [
                { word: "WORD", position: { x: 0, y: 0 }, direction: "horizontal" }
            ]
        };

        const res = generator.generate({
            words: ["WORD"],
        });

        // THEN
        expect(res).toEqual(expected);

    });

});

/**
 * x un seul mot hozizontal
 * - un mot horizontal et un mot vertical qui se croise sur la première lettre
 * - un mot horizontal et un mot vertical qui se croise sur la deuxième lettre
 * - un mot horizontal et un mot vertical qui se croise sur la troisième lettre
 */