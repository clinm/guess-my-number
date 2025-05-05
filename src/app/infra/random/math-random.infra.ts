import { RandomGenerator } from "./random.infra";

export class MathRandom extends RandomGenerator {
    get(): number {
        return Math.random();
    }
}