
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

        for (let i = 1; i < input.words.length; i++) {
            const index = input.words[0].indexOf(input.words[i][0]);
            placedWords.push({ word: input.words[i], position: { x: index, y: 0 }, direction: Direction.VERTICAL });
        }
        
        return {
            placedWords: placedWords
        };
    }

}