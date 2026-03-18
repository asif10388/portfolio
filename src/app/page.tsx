import Layout from "../components/layout"
import Hero from "../components/hero/hero.component"
import Work from "../components/work/work.component"
import Contact from "../components/contact/contact.component"

export default function HomePage() {
  return (
    <Layout>
      <div style={{ backgroundColor: "#f2f4f6" }}>
        <Hero />
        <Work />
        <Contact />
      </div>
    </Layout>
  )
}
