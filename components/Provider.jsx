"use client"

import { SessionProvider } from 'next-auth/react'

const Provider = ({ children, session }) => {
// this is high order componenet
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider