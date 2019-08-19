export const tuple = <T extends string[]>(...args: T) => args;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
