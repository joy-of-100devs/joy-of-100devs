import axios from "axios";
import {getServerSession} from "@/domains/users/repository";
import {getAllSnippetsInRepository} from "@/domains/snippets/repository";
import {ObjectId} from "@/helpers/abbreviations";
import dynamic from "next/dynamic";
import {SandpackRepository} from "@/components/CustomCodePlayground/types";
import SandpackRepositoryData = SandpackRepository.SandpackRepositoryData;

const ClientSideCodePlayground = dynamic(() => import("./ClientSideCodePlayground"), {
    ssr: false,
});

interface CodePlaygroundProps {
    repository: string;
}

const axiosInstance = axios.create({
    baseURL: new URL("/api", process.env.NEXT_PUBLIC_REPOSITORY_SERVER_URL).toString()
});


export default async function CustomCodePlayground(props: CodePlaygroundProps) {
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
        startRoute={data.package.sandpack?.startRoute}
        externalResources={data.package.sandpack?.externalResources}
        environment={data.package.sandpack?.environment}></ClientSideCodePlayground>;
}
