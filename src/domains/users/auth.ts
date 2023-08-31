import "server-only";
import NextAuth, {NextAuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import {pendingRawClient} from "@/lib/database";
import {COLLECTION_NAME as USER_COLLECTION_NAME} from "@/domains/users/model";

const adapter = MongoDBAdapter(pendingRawClient, {
    databaseName: process.env.DB_NAME,
    collections: {
        Users: USER_COLLECTION_NAME
    }
});

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            allowDangerousEmailAccountLinking: true,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    adapter: adapter,
    callbacks: {
        session ({session, user})  {
            session.user._id = user.id
            return session;
        }
    }
};

export default NextAuth(authOptions);
