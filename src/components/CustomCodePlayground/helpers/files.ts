import path from "path";
import {SandpackBundlerFiles} from "@codesandbox/sandpack-client";

// From a set of files, we generate the respective directories and their states.
// TODO: use Jest to test
export function generateDirectoriesFromFiles(files: string[]) {
    // Removes dot notations.
    const parsedFiles = files.map(i => path.normalize(i));
    const directories = [];

    for (let file of parsedFiles) {
        // Ensure URLs are absolute URLs. (starts with slash)
        if (!file.startsWith("/")) {
            throw new Error("Relative directories are not supported.");
        }
        // For example: /assets/recipes/ice-cream.jpg -> ["", "assets", "recipes", "ice-cream.jpg"]
        // We want to get ["/assets", "/recipes"]
        directories.push(...getIntermediateDirectories(file));
    }

    return directories;
}

export function getIntermediateDirectories(filePath: string): string[] {
    const partitions = filePath.split("/");
    const intermediateDirectories: string[] = [];

    // In case of trailing slash - pop it.
    if (!partitions.at(-1)) {
        partitions.pop();
    }

    for (let i = 1; i < partitions.length; i++) {
        const slice = partitions.slice(0, i);
        intermediateDirectories.push(slice.join("/"));
    }

    return intermediateDirectories;
}

export function getFilename(filePath: string): string {
    return path.parse(filePath).base;
}

export const fromPropsToModules = ({autoHiddenFiles, visibleFiles, files, prefixedPath}: {
    prefixedPath: string;
    files: SandpackBundlerFiles;
    autoHiddenFiles?: boolean;
    visibleFiles: string[];
}): { directories: string[]; modules: string[] } => {
    const hasVisibleFilesOption = visibleFiles.length > 0;

    /**
     * When visibleFiles or activeFile are set, the hidden and active flags on the files prop are ignored.
     */
    const filterByHiddenProperty = autoHiddenFiles && !hasVisibleFilesOption;
    const filterByVisibleFilesOption = autoHiddenFiles && hasVisibleFilesOption;

    const fileListWithoutPrefix = Object.keys(files)
        .filter((filePath) => {
            const isValidatedPath = filePath.startsWith(prefixedPath);
            if (filterByVisibleFilesOption) {
                return isValidatedPath && visibleFiles.includes(filePath);
            }

            if (filterByHiddenProperty) {
                return isValidatedPath && !files[filePath]?.hidden;
            }

            return isValidatedPath;
        })
        .map((file) => file.substring(prefixedPath.length));

    const directories = new Set(
        fileListWithoutPrefix
            .filter((file) => file.includes("/"))
            .map((file) => `${prefixedPath}${file.split("/")[0]}/`)
    );

    const modules = fileListWithoutPrefix
        .filter((file) => !file.includes("/"))
        .map((file) => `${prefixedPath}${file}`);

    return { directories: Array.from(directories), modules };
};
