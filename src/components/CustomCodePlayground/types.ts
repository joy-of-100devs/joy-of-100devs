import {SandboxEnvironment, SandpackPredefinedTemplate} from "@codesandbox/sandpack-react/unstyled";

export namespace SandpackRepository {
    export interface SandpackFileConfig {
        active?: boolean,
        hidden?: boolean,
        readOnly?: boolean,
    }

    export interface SandpackFileConfigWithCode extends SandpackFileConfig {
        code: string,
    }

    export interface SandpackSetupData {
        template?: SandpackPredefinedTemplate;
        environment?: SandboxEnvironment;
        initialActiveFile?: string;
        files?: Record<string, SandpackFileConfig>;
        externalResources?: string[];
        startRoute?: string;
    }

    export interface SandpackPackageData {
        sandpack?: SandpackSetupData;
    }

    export interface SandpackRepositoryData {
        package: SandpackPackageData;
        files: Record<string, SandpackFileConfigWithCode>;
    }
}
