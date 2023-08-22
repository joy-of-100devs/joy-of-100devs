import path from "path";
import * as fs from "fs";
import matter from "gray-matter";
import React from "react";
import SerializableFileHelper from "@/helpers/fileHelper";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export interface ModuleInfo {
    title: string;
    description: string;
}

export interface LessonMetadata {
    title: string;
    description: string;
}

export const loadLesson = React.cache(async function loadLesson(slug: string) {
    const processedSlug = slug.split(/[\\/]/);
    const realPath = path.join(CONTENT_ROOT, ...processedSlug) + ".mdx";
    const raw = (await fs.promises.readFile(realPath)).toString();
    const data = matter(raw);

    return {
        slug: [...processedSlug],
        content: data.content,
        meta: data.data as LessonMetadata,
    };
});
export const scanModule = React.cache(async function scanModule(slug: string) {
    const realPath = path.join(CONTENT_ROOT, slug);
    const entries = await fs.promises.readdir(realPath);
    const metadataArray: { slug: string, meta: LessonMetadata }[] = [];
    const promises: Promise<void>[] = [];

    async function getMetadata(slug: string, idx: number) {
        metadataArray[idx - 1] = {
            slug: slug.replaceAll("\\", "/"),
            meta: (await loadLesson(slug)).meta
        };
    }

    for (let entry of entries) {
        const parsedEntry = path.parse(entry);
        if (parsedEntry.ext === ".mdx") {
            const [_, idx] = parsedEntry.name.match(/^(\d+)-(.*)/) ?? [];
            promises.push(getMetadata(path.join(slug, parsedEntry.name), +idx));
        }
    }

    await Promise.all(promises);
    return metadataArray;
});

const ModuleInfoLoader = new SerializableFileHelper<ModuleInfo>();

export const loadModuleInfo = React.cache(async function loadModuleInfo(slug: string) {
    const processedSlug = slug.split(/[\\/]/);

    const slugName = processedSlug.at(-1);
    if (!slugName) throw new Error("Empty slug!");

    const parsedSlug = slugName.match(/^(\d+)-(.*)/);
    const index = +parsedSlug![1];

    const modulePath = path.join(CONTENT_ROOT, ...processedSlug);
    const jsonPath = path.join(modulePath, "module.json");

    const data = await ModuleInfoLoader.loadFile(jsonPath);

    return {
        slug: slug,
        number: index,
        data,
        lessons: await scanModule(slug),
    };
});

export const scanModules = React.cache(async function scanModules() {
    const promises = [];
    for (let path of await fs.promises.readdir(CONTENT_ROOT)) {
        promises.push(loadModuleInfo(path));
    }
    const resolved = await Promise.allSettled(promises);
    const modules = [];
    for (let resolvedItem of resolved) {
        if (resolvedItem.status === 'fulfilled') {
            modules.push(resolvedItem.value);
        }
    }
    return modules;
});
