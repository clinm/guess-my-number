import { RandomGenerator } from "./random.infra";

export class InMemoryRandom extends RandomGenerator {

    constructor(private readonly fixedNumber: number) {
        super();
    }

    get(): number {
        return this.fixedNumber;
    }

}