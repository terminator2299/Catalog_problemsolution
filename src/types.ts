export interface Root {
    base: string;
    value: string;
}

interface Keys {
    n: number;
    k: number;
}

export interface Data {
    keys: Keys;
    [key: string]: Root | Keys;  // Index signature to handle dynamic keys
}
