export type Function<T> = (() => T);
export type SerializablePrimitive = number | string | undefined | null | boolean;
export type SerializableObject = {[p: string|number]: Serializable}
export interface SerializableInterface {}
export type Serializable = SerializablePrimitive | SerializablePrimitive[] | SerializableObject | SerializableInterface;
export type RootSerializable = Exclude<Serializable, undefined>
