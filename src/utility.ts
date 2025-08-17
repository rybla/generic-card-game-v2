export type Result<E, A> =
    | { type: "ok"; value: A }
    | { type: "error"; value: E };

export function ok<A>(value: A): Result<never, A> {
    return { type: "ok", value };
}

export function error<E>(value: E): Result<E, never> {
    return { type: "error", value };
}

export function defined<A>(x: A | undefined): A {
    if (x === undefined)
        throw new Error(
            `Unexpected undefined value: ${JSON.stringify(x, null, 4)}`,
        );
    return x;
}
