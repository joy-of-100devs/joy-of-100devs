import * as React from 'react';

type AuthorNoteVariant = "error" | "warning" | "success" | "info";

const classNames: Record<AuthorNoteVariant, string> = {
    error: "bg-error",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
}

function AuthorNotes(props: { variant: AuthorNoteVariant, heading?: React.ReactNode, children?: React.ReactNode }) {
    return <div className={`my-12 rounded-[8px] p-[16px] mx-[-16px] bg-opacity-20 ${classNames[props.variant]}`}>
        <h3 className={`text-lg mt-4`}>{props.heading}</h3>
        <div className={''}>{props.children}</div>
    </div>;
}

export default AuthorNotes;
