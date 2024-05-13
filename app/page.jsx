import Link from "next/link"

function Home() {
  return (
    <section className="">
      <h1 className="">
        EngBlog
        <br className="max-md:hidden" />
        <span className="">Stuff here</span>
      </h1>

      <p className="desc text-center">some stuff here</p>
    </section>
  )
}

export default Home