import FAQ from "./components/faq"
import Hero from "./components/hero"
import HowItWorks from "./components/how-it-works"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <HowItWorks />
      <FAQ />
    </main>
  )
}
