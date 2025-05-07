
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
    unplacedWords?: string[];
}

export class Generator {
    generate(input: { words: string[]; }): Grid {
        const placedWords = [
            { word: input.words[0], position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL }
        ];

        const unplacedWords = [];

        for (let i = 1; i < input.words.length; i++) {
            const index = input.words[0].indexOf(input.words[i][0]);
            if (index === -1) {
                unplacedWords.push(input.words[i]);
            } else {
                placedWords.push({ word: input.words[i], position: { x: index, y: 0 }, direction: Direction.VERTICAL });
            }
        }

        const generatedGrid: Grid = {
            placedWords: placedWords
        };

        if (unplacedWords.length > 0) {
            generatedGrid.unplacedWords = unplacedWords;
        }

        return generatedGrid;
    }

}