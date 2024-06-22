"use client"
// import Link from "next/link"
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";


const Home = () =>{
  const { data: session } = useSession();



  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  const lol = process.env.NEXT_PUBLIC_VARIABLE

  return (
    <section className="">
      <h1 className="">
        EngBlog
        <br className="max-md:hidden" />
        <span className="">Stuff here</span>
      </h1>

      <p className="desc text-center">this is your session</p>
      <div>{JSON.stringify(session)}</div>
      <hr />
      <div>lol is {lol}</div>
    </section>
  )
}

export default Home