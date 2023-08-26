import dynamic from "next/dynamic";

const CodePlayground = dynamic(() => import("./CodePlayground"), {
    ssr: false,
    loading: () => <p>Loading...</p>
});

export default CodePlayground;
