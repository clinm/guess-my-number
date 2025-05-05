import { infraRootProvider } from "./infra.provider";
import { InMemoryRandom } from "./random/in-memory-random.infra";

export function infraProviders() {
    return infraRootProvider(new InMemoryRandom(0.15));
}