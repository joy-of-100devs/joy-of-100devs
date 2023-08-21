import {cookies} from "next/headers";
import {parseValue, PersistentParser, stringifyValue} from "@/helpers/persistentStateHelpers/main";
import {Serializable} from "@/helpers/serializableTypes";

export class CookieParser<T extends Serializable> extends PersistentParser<T> {
    load(): T {
        const raw = cookies().get(this._key)?.value;
        return parseValue(raw, this._defaultValue);
    }

    save(value: T) {
        cookies().set(this._key, stringifyValue(value));
    }
}

