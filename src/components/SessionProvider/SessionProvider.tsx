import * as React from 'react';
import {getServerSession} from "@/domains/users/repository";
import ClientSessionProvider from "@/components/SessionProvider/ClientSessionProvider";

async function SessionProvider(props: {children?: React.ReactNode}) {
  const serverSession = await getServerSession();
  console.log(serverSession);

  return <ClientSessionProvider initialSession={serverSession}>
    {props.children}
  </ClientSessionProvider>
}

export default SessionProvider;
