
export type GridParams = { words: string[]; }

export enum Direction {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}

type Position = {
    x: number;
    y: number;
};

type PlacedWord = {
    word: string;
    position: Position;
    direction: Direction;
};

export type Grid = {
    placedWords: PlacedWord[];
}

export class Generator {
    generate(input: { words: string[]; }): Grid {
        const placedWords = [
            { word: input.words[0], position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL }
        ];

        if (input.words.length === 2) {
            placedWords.push({ word: input.words[1], position: { x: 0, y: 0 }, direction: Direction.VERTICAL });
        }
        return {
            placedWords: placedWords
        };
    }

}