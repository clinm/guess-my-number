
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

    private placedWords: PlacedWord[] = [];

    generate(input: GridParams ): Grid {
        this.placedWords = [
            { word: input.words[0], position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL }
        ];

        const unplacedWords = [];

        for (let i = 1; i < input.words.length; i++) {
            let wordWasPlaced = false;
            
            wordWasPlaced = this.placeWordOnGrid(input.words[i]);
            if (!wordWasPlaced) {
                unplacedWords.push(input.words[i]);
            }
        }

        const generatedGrid: Grid = {
            placedWords: this.placedWords
        };

        if (unplacedWords.length > 0) {
            generatedGrid.unplacedWords = unplacedWords;
        }

        return generatedGrid;
    }


    private placeWordOnGrid(wordToPlace: string) {
        for (let placedWord of this.placedWords) {
            for (var [candidateLetterIndex, letter] of wordToPlace.split("").entries()) { 
                const index = placedWord.word.indexOf(letter);
                if (index !== -1) {
                    const placedWordWithComputedPosition = this.computePlacedWord(wordToPlace, placedWord, index, candidateLetterIndex);
                    this.placedWords.push(placedWordWithComputedPosition);
                    return true;
                }
            }
        }
        return false;
    }

    private computePlacedWord(wordToPlace: string, placedWord: PlacedWord, index: number, shiffedStart: number): PlacedWord {
        const position: Position = { ...placedWord.position }; 
        let direction: Direction;
        
        if (placedWord.direction == Direction.VERTICAL) {
            direction = Direction.HORIZONTAL;
            position.y += index;
            position.x -= shiffedStart;
        } else {
            direction = Direction.VERTICAL;
            position.x += index;
            position.y -= shiffedStart;
        }
        return { word: wordToPlace, position: position, direction: direction };
    }
}