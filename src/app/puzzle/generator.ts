
export type GridParams = { words: string[]; }

export type Grid = {
    placedWords: {
        word: string;
        position: {
            x: number;
            y: number;
        };
        direction: string;
    }[];
}

export class Generator {
    generate(input: { words: string[]; }): Grid {
        return {
            placedWords: [
                { word: input.words[0], position: { x: 0, y: 0 }, direction: "horizontal" }
            ]
        };
    }

}