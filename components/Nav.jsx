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
    <nav className="fixed top-0 w-full flex justify-between items-center bg-blue-200 ">
      <Link href={"/"} className="flex items-center gap-2">
        <Image 
          src={"/assets/icons/favicon.ico"}
          width={32}
          height={32}
        ></Image>
        <p>Enggie is Veggie</p>
      </Link>
      <div>
        {session?.user ? (
          <div className="flex gap-2">
            <p className="bg-green-100 p-2">curr user: {session?.user.name}</p>
            <button type='button' onClick={signOut} className="p-2">signout</button>
          </div>
        ) : (
          <div>
            {providers &&
             Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>{provider.name} Sign In</button>
             )) }
          </div>

        )}
      </div>
    </nav>
  )
}

export default Nav