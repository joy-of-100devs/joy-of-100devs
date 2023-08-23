import * as React from 'react';
import ClientSessionProvider from "@/components/SessionProvider/ClientSessionProvider";
import {getServerSession} from "@/domains/users/repository";


async function SessionProvider(props: {children?: React.ReactNode}) {
  const serverSession = await getServerSession();

  return <ClientSessionProvider initialSession={serverSession}>
    {props.children}
  </ClientSessionProvider>
}

export default SessionProvider;
