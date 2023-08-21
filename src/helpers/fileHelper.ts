import fs from "fs";

type SerializablePrimitive = number | string | undefined | null | boolean;
type SerializableObject = {[p: string|number]: Serializable}
interface SerializableInterface {}
type Serializable = SerializablePrimitive | SerializablePrimitive[] | SerializableObject | SerializableInterface;
type RootSerializable = Exclude<Serializable, undefined>

export default class SerializableFileHelper<T extends RootSerializable> {
    async loadFile(path: string) {
        const raw = (await fs.promises.readFile(path)).toString();
        return JSON.parse(raw) as T;
    }

    async saveFile(path: string, data: T) {
        const raw = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(path, raw);
    }
}
