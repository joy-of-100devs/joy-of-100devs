import "server-only";
import NextAuth, {NextAuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import {pendingMongoRawClient} from "@/lib/database";
import {COLLECTION_NAME as USER_COLLECTION_NAME} from "@/domains/users/model";

const adapter = MongoDBAdapter(pendingMongoRawClient, {
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
};

export default NextAuth(authOptions);
