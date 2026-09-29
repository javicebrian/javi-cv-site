import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import { sections } from './sections'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        {sections.map(({ id, Component }) => (
          <Component key={id} id={id} />
        ))}
      </main>
    </>
  )
}
