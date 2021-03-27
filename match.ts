interface Predicate<T> {
    (value: T): boolean;
}

type Case<T, R> = [Predicate<T>, () => R]

class Matcher<T> {
    constructor(private value: T) {
    }

    with<R>(...cases: Case<T, R>[]): R | undefined {
        return cases.find(([predicate]) => predicate(this.value))?.[1]();
    }
}

export function match<T>(value: T): Matcher<T> {
    return new Matcher(value);
}
