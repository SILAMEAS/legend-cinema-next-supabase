export const $safeValue = <T,>(value: T | undefined | null, fallback: T | undefined = undefined): T | undefined =>
    value ?? fallback;
