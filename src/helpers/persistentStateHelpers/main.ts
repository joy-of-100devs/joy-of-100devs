import {Serializable, Function} from "@/helpers/serializableTypes";

function processSerializableValue<T extends Serializable>(value: T | Function<T>): T {
    if (typeof value === 'function') {
        return value();
    } else {
        return value;
    }
}

export function parseValue<T extends Serializable>(raw: string | null | undefined, defaultValue: T | (() => T)): T {
    if (typeof raw !== 'string') {
        return processSerializableValue(defaultValue);
    }
    try {
        return JSON.parse(raw).value as T;
    } catch (e) {
        return processSerializableValue(defaultValue);
    }
}

export function stringifyValue<T extends Serializable>(value: T) {
    const wrapper = {
        value: value,
    };
    return JSON.stringify(wrapper);
}

export abstract class PersistentParser<T extends Serializable> {
    protected readonly _key: string;
    protected readonly _defaultValue: Function<T>;

    constructor(key: string, defaultValue: Function<T>) {
        this._key = key;
        this._defaultValue = defaultValue;
    }

    abstract load(): T;
    abstract save(value: T): void;
}
