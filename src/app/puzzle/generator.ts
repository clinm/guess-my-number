
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

    private dictionnary: Map<string, { placedWord: PlacedWord, letterIndex: number}[]> = new Map();

    public generate(input: GridParams ): Grid {
        const firstWord = { word: input.words[0], position: { x: 0, y: 0 }, direction: Direction.HORIZONTAL };
        this.addWordToGrid(firstWord);

        let unplacedWords = [];

        const wordsToPlaced = input.words.slice(1);
        while (wordsToPlaced.length > 0) {
            const w = wordsToPlaced.shift()!;
            let wordWasPlaced = this.placeWordOnGrid(w);
            if (wordWasPlaced) {
                wordsToPlaced.push(...unplacedWords);
                unplacedWords = [];
            } else {
                unplacedWords.push(w);
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
        for (var [candidateLetterIndex, letter] of wordToPlace.split("").entries()) { 
            
            if (this.dictionnary.has(letter)) {
                const matchingPlacedWords = this.dictionnary.get(letter)!;

                const {placedWord, letterIndex} = matchingPlacedWords[0];
                const placedWordWithComputedPosition = this.computePlacedWord(wordToPlace, placedWord, letterIndex, candidateLetterIndex);

                if (this.canAddOnGrid(placedWordWithComputedPosition)) {
                    matchingPlacedWords.pop();
                    if (matchingPlacedWords.length === 0) {
                        this.dictionnary.delete(letter);
                    }
                    
                    this.addWordToGrid(placedWordWithComputedPosition, candidateLetterIndex);
                    return true;
                }

            }
        }
        return false;
    }

    private canAddOnGrid(candidate: PlacedWord): boolean {
        return !this.placedWords
                    .filter(w => w.direction === candidate.direction)
                    .filter(w => {
                        if (candidate.direction === Direction.HORIZONTAL) {
                            return Math.abs(w.position.y - candidate.position.y) === 1;
                        }
                        
                        return Math.abs(w.position.x - candidate.position.x) === 1;
                    })
                    .some(w => this.isTooCloseToTheWord(w, candidate));
    }

    private isTooCloseToTheWord(w: PlacedWord, candidate: PlacedWord): boolean {
        if (candidate.direction === Direction.HORIZONTAL) {
            const beginW = w.position.x;
            const endW = w.position.x + w.word.length - 1;

            const beginC = candidate.position.x;
            const endC = candidate.position.x + candidate.word.length - 1;


            return this.hasIntersection(beginW, beginC, endC, endW);

        }

        const beginW = w.position.y;
        const endW = w.position.y + w.word.length - 1;

        const beginC = candidate.position.y;
        const endC = candidate.position.y + candidate.word.length - 1;


        return this.hasIntersection(beginW, beginC, endC, endW);
    }

    private hasIntersection(beginW: number, beginC: number, endC: number, endW: number): boolean {
        return (beginW > beginC && beginW < endC)
            || (endW > beginC && endW < endC)
            || (beginC > beginW && beginC < endW)
            || (endC > beginW && endC < endW);
    }

    private addWordToGrid(placedWord: PlacedWord, linkedLetterIndex: number = -1) {
        this.placedWords.push(placedWord);
        this.updateDictionnary(placedWord, linkedLetterIndex);
    }

    private updateDictionnary(placedWord: PlacedWord, linkedLetterIndex: number) {
        for (var [letterIndex, letter] of placedWord.word.split("").entries()) {
            if (letterIndex === linkedLetterIndex) {
                continue;
            }

            if (!this.dictionnary.has(letter)) {
                this.dictionnary.set(letter, []);
            }
            this.dictionnary.get(letter)!.push({ placedWord: placedWord, letterIndex: letterIndex });
        }
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