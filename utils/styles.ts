export function classNames (...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function statusValues (...val: boolean[]) {
    return val.every((x) => x)
}