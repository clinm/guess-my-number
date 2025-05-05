import { makeEnvironmentProviders } from "@angular/core";
import { RandomGenerator } from "./random/random.infra";
import { MathRandom } from "./random/math-random.infra";

export function infraProviders() {
    return infraRootProvider(new MathRandom());
}

export function infraRootProvider(randomGenerator: RandomGenerator) {
    return makeEnvironmentProviders([
        {
            provide: RandomGenerator,
            useValue: randomGenerator
        }
    ]);
}