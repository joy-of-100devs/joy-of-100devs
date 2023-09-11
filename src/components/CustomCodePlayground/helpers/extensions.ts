import mimeDB from "mime-db";

const extensionMap = new Map<string, string>();
const entries = Object.entries(mimeDB);
for (const [mimetype, entry] of entries) {
    if (!entry.extensions) {
        continue;
    }

    const extensions = entry.extensions as string[];
    if (extensions.length) {
        for (const ext of extensions) {
            extensionMap.set(ext, mimetype);
        }
    }
}

export const EXTENSIONS_MAP = extensionMap;
