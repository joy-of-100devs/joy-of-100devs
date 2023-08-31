import {ISessionUser} from "@/domains/users/model";
import {ObjectId} from "@/helpers/abbreviations";

export interface SessionUser extends ISessionUser {
    _id: string|ObjectId
}

declare module "next-auth" {
    interface Session {
        user: SessionUser
    }
}
