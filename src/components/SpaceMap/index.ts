import dynamic from "next/dynamic";

export * from './SpaceMap';
const SpaceMap = dynamic(() => import("./SpaceMap"), {
    ssr: false,
})

export default SpaceMap;

