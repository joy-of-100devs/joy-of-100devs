import HighlightArea from "@/components/PathSimulator/HighlightArea";

export default function ClientSidePathSimulator() {
    return <div className={"absolute w-full h-full top-0 left-0"}>
        <HighlightArea width={12} height={18} top={3} left={38} path={"/"}/>
        <HighlightArea width={11.5} height={20} top={29} left={2.5} path={"/index.html"}/>
        <HighlightArea width={11.5} height={18} top={29} left={14.5} path={"/static"}/>
        <HighlightArea width={11.5} height={19} top={29} left={27} path={"/about.html"}/>
        <HighlightArea width={11.5} height={19} top={29} left={39} path={"/terms.html"}/>
        <HighlightArea width={11.5} height={17.25} top={29} left={51.25} path={"/assets"}/>
        <HighlightArea width={11.5} height={17.25} top={29} left={74.75} path={"/recipes"}/>
        <HighlightArea width={11.5} height={20} top={54} left={2.5} path={"/static/styles.css"}/>
        <HighlightArea width={10.5} height={20} top={54} left={14.5} path={"/static/app.js"}/>
        <HighlightArea width={10} height={20} top={54} left={27.5} path={"/static/module.js"}/>
        <HighlightArea width={11.5} height={17} top={55} left={38} path={"/assets/recipes"}/>
    </div>;
}
