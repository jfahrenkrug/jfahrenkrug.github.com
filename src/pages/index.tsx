import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
    <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
      <p>Want to dig deeper into Tailwind?</p>
      <p>
        <a href="https://tailwindcss.com/docs" className="text-cyan-600 hover:text-cyan-700"> Read the docs &rarr; </a>
      </p>
    </div>
  </Layout>
)

export default IndexPage
