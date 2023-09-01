import * as React from 'react';

type AuthorNoteVariant = "critical" | "warning" | "recommendation" | "info";

const classNames: Record<AuthorNoteVariant, string> = {
    critical: "bg-error",
    info: "bg-info",
    recommendation: "bg-success",
    warning: "bg-warning",
}

function AuthorNotes(props: { variant: AuthorNoteVariant, heading?: React.ReactNode, children?: React.ReactNode }) {
    return <aside className={`my-12 rounded-[8px] p-[16px] mx-[-16px] bg-opacity-20 ${classNames[props.variant]}`}>
        <h3 className={`text-lg mt-4`}>{props.heading}</h3>
        <div className={''}>{props.children}</div>
    </aside>;
}

export default AuthorNotes;
