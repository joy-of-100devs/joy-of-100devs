import HighlightArea from "@/components/PathSimulator/HighlightArea";

export default function ClientSidePathSimulator() {
    return <div className={"absolute w-full h-full top-0 left-0"}>
        <HighlightArea width={12} height={19} top={0} left={38} path={"/"}/>
        <HighlightArea width={11.5} height={21} top={27.25} left={2.5} path={"/index.html"}/>
        <HighlightArea width={11.5} height={18} top={28.5} left={14.5} path={"/static"}/>
        <HighlightArea width={11.5} height={20} top={27.75} left={27} path={"/about.html"}/>
        <HighlightArea width={11.5} height={20} top={27.25} left={39} path={"/terms.html"}/>
        <HighlightArea width={11.5} height={18.25} top={28} left={51.25} path={"/assets"}/>
        <HighlightArea width={11.5} height={18} top={27.25} left={74.75} path={"/recipes"}/>
        <HighlightArea width={10} height={21} top={55} left={3.5} path={"/static/styles.css"}/>
        <HighlightArea width={10.5} height={22} top={54.5} left={14.5} path={"/static/app.js"}/>
        <HighlightArea width={10} height={21} top={54} left={27.5} path={"/static/module.js"}/>
        <HighlightArea width={11.5} height={18.25} top={55} left={38} path={"/assets/recipes"}/>
        <HighlightArea width={11.5} height={18} top={55} left={51} path={"/assets/web"}/>
        <HighlightArea width={11.5} height={19} top={54.5} left={62.75} path={"/recipes/apple-pie"}/>
        <HighlightArea width={12} height={18} top={54.5} left={75} path={"/recipes/ice-cream"}/>
        <HighlightArea width={11} height={18} top={54.5} left={88} path={"/recipes/index.html"}/>
        <HighlightArea width={13} height={22} top={78} left={26} path={"/assets/recipes/strawberry.jpg"}/>
        <HighlightArea width={10} height={22} top={78} left={39.5} path={"/assets/recipes/apple.jpg"}/>
        <HighlightArea width={9} height={22} top={78} left={52.5} path={"/assets/web/icon.svg"}/>
        <HighlightArea width={12} height={22} top={78} left={63.5} path={"/recipes/apple-pie/index.html"}/>
        <HighlightArea width={11} height={22} top={78} left={76} path={"/recipes/ice-cream/index.html"}/>
    </div>;
}
