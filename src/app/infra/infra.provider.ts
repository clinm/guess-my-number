import { makeEnvironmentProviders } from "@angular/core";

export function infraProviders() {
    return infraRootProvider();
}

export function infraRootProvider() {
    return makeEnvironmentProviders([]);
}