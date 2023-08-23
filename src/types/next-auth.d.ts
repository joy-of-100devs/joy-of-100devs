import {ISessionUser} from "@/domains/users/model"; // What

declare module "next-auth" {
    interface Session {
        user: ISessionUser
    }
}
