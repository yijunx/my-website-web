"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Nav = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  
  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setupProviders()
  }, [])

  return (
    <nav className="fixed top-0 w-full py-3 bg-blue-200">
      This is nav
    </nav>
  )
}

export default Nav