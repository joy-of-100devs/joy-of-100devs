import axios from "axios";
import ClientSideCodePlayground from "@/components/CodePlayground/ClientSideCodePlayground";
import {SandboxEnvironment, SandpackPredefinedTemplate} from "@codesandbox/sandpack-react/unstyled";
import SandpackRepositoryData = SandpackRepository.SandpackRepositoryData;

interface CodePlaygroundProps {
    repository: string;
}

export namespace SandpackRepository {
    export interface SandpackFileConfig {
        active?: boolean,
        hidden?: boolean,
        readOnly?: boolean,
    }

    export type StorableSandpackFileConfig = Omit<SandpackFileConfig, "active">;

    export interface SandpackFileConfigWithCode extends SandpackFileConfig {
        code: string,
    }

    export interface SandpackSetupData {
        template?: SandpackPredefinedTemplate;
        environment?: SandboxEnvironment;
        initialActiveFile?: string;
        files?: Record<string, SandpackFileConfig>;
    }

    export interface SandpackPackageData {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        sandpack?: SandpackSetupData;
    }

    export interface SandpackRepositoryData {
        package: SandpackPackageData;
        files: Record<string, SandpackFileConfigWithCode>;
    }
}

const axiosInstance = axios.create({
    baseURL: new URL("/api", process.env.NEXT_PUBLIC_REPOSITORY_SERVER_URL).toString()
});


export default async function CodePlayground(props: CodePlaygroundProps) {
    const data = await axiosInstance.get<Api.Response<SandpackRepositoryData>>(props.repository).then(res => res.data.data);

    return <ClientSideCodePlayground template={data.package.sandpack?.template} files={data.files}
                                     dependencies={data.package.dependencies}
                                     devDependencies={data.package.devDependencies}
                                     environment={data.package.sandpack?.environment}></ClientSideCodePlayground>;
}
