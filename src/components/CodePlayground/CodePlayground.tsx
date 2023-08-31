import axios from "axios";
import ClientSideCodePlayground from "@/components/CodePlayground/ClientSideCodePlayground";
import {SandboxEnvironment, SandpackPredefinedTemplate} from "@codesandbox/sandpack-react/unstyled";
import SandpackRepositoryData = SandpackRepository.SandpackRepositoryData;
import {getServerSession} from "@/domains/users/repository";
import {getAllSnippetsInRepository} from "@/domains/snippets/repository";
import {ObjectId} from "@/helpers/abbreviations";

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
    let data;
    try {
        data = await axiosInstance.get<Api.Response<SandpackRepositoryData>>(props.repository).then(res => res.data.data);
    } catch (e) {
        throw new Error(`Failed to get code repository ${props.repository}: ${(e as any).message ?? "Unspecified error"}`);
    }
    const sessionUser = (await getServerSession())?.user;
    let savedFiles: Record<string, string|null>;
    if (sessionUser) {
        savedFiles = await getAllSnippetsInRepository({
            userId: new ObjectId(sessionUser._id),
            repository: props.repository,
        });
    } else {
        savedFiles = {};
    }
    return <ClientSideCodePlayground
        initialActiveFile={data.package.sandpack?.initialActiveFile}
        repository={props.repository}
        template={data.package.sandpack?.template}
        files={data.files}
        userFiles={savedFiles}
        dependencies={data.package.dependencies}
        devDependencies={data.package.devDependencies}
        environment={data.package.sandpack?.environment}></ClientSideCodePlayground>;
}
