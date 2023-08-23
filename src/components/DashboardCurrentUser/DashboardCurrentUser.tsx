"use client";

import * as React from 'react';
import {useSession} from "next-auth/react";

function DashboardCurrentUser() {
  const user = useSession();
  console.log(user);

  return <div></div>;
}

export default DashboardCurrentUser;
