import {Serializable} from "@/helpers/serializableTypes";
import {parseValue, PersistentParser, stringifyValue} from "@/helpers/persistentStateHelpers/main";
import Cookie from "js-cookie";

export class LocalStorageParser<T extends Serializable> extends PersistentParser<T> {
    load(): T {
        const raw = localStorage.getItem(this._key);
        return parseValue(raw, this._defaultValue);
    }

    save(value: T) {
        localStorage.setItem(this._key, stringifyValue(value));
    }
}

export class CookieParser<T extends Serializable> extends PersistentParser<T> {
    load(): T {
        const raw = Cookie.get(this._key);
        return parseValue(raw, this._defaultValue);
    }

    save(value: T) {
        Cookie.set(this._key, stringifyValue(value));
    }
}
