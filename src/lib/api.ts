import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "@/domains/users/repository";
import {SessionUser} from "@/types/next-auth";
import {HTTPError} from "@/lib/errors";

interface Request extends NextRequest {
    user: SessionUser | null
}

export function withMiddleware(callback: (request: Request) => any) {
    return async function (request: NextRequest) {
        const modifiedRequest: Request = request as Request;
        modifiedRequest.user = await getServerSession().then(session => session?.user ?? null);
        try {
            const result = await callback(modifiedRequest);
            return NextResponse.json({
                success: true,
                data: result,
            })
        } catch (e) {
            console.error(e);
            if (e instanceof HTTPError) {
                return NextResponse.json({
                    success: false,
                    error: e.message,
                }, {
                    status: e.httpCode,
                })
            }
            else if (e instanceof Error) {
                return NextResponse.json({
                    success: false,
                    error: e.message,
                }, {
                    status: 500,
                })
            } else {
                return NextResponse.json({
                    success: false,
                    error: "Unspecified error",
                }, {
                    status: 500,
                })
            }
        }
    }
}
