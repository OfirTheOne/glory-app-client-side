export function reduceArrayToEntities<T, K extends keyof T>(
    array: T[], v: K, startingElement: { [id: string]: T } = {}): { [id: string]: T } {
    if (!isNullOrUndefined(array)) {
        return array.reduce(
            (entities: { [id: string]: T }, element: T) => {
                return {
                    ...entities,
                    [element[`${v}`]]: element
                };
            }, { ...startingElement }
        );
    } else {
        return {};
    }
}


export function isNullOrUndefined(variable: any) {
    return variable === null || variable === undefined;
}

export function isStringEmpty(str: string) {
    return str === '';
}


export function allFiledsAre(object: Object, condition: (filed?: any) => boolean): boolean {
    if (!object || !condition) {
        return;
    }
    const keys = Object.keys(object);
    return keys.every((key) => {
        return condition(object[key]);
    });
}

export function not<T>(condition: ((param: T) => boolean)): (param: T) => boolean {
    return (param: T) => {
        return !condition(param);
    }
}


// need testing
export function andMarge<T>(...conditions: ((param: T) => boolean)[]): (param: T) => boolean {
    return (param: T) => {
        return conditions.every((condition) => {
            return condition(param);
        });
    }
}

// need testing
export function orMarge<T>(...conditions: ((param: T) => boolean)[]): (param: T) => boolean {
    return (param: T) => {
        return conditions.some((condition) => {
            return condition(param);
        });
    }
}

