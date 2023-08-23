import {authOptions} from '@/domains/users/auth';
import {getServerSession as _getServerSession} from "next-auth";

export async function getServerSession() {
    return await _getServerSession(authOptions);
}
