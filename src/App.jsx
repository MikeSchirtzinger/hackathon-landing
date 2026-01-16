import { useEffect, useState } from 'react'
import './App.css'
import ParticleBackground from './components/ParticleBackground'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <ParticleBackground />
      <div className="grid-background"></div>

      {/* Hero Section */}
      <section className="section hero">
        <h1 className="hero-title">
          Building Beautiful Frontends<br />
          With <span className="accent">ADA</span>
        </h1>
        <p className="hero-subtitle">
          This page was built using the exact orchestration workflow it describes.
          Watch how multi-agent AI transforms complex tasks into production-ready code.
        </p>
        <button onClick={() => document.getElementById('process').scrollIntoView({ behavior: 'smooth' })}>
          See The Process
        </button>
        <div className="hero-meta">
          /o "Build a landing page showcasing ADA's orchestration workflow"
        </div>
      </section>

      {/* The Orchestrator Process */}
      <section id="process" className="section section-narrow">
        <h2>The Orchestrator Workflow</h2>
        <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          Instead of a single AI agent doing everything, ADA uses <code>/o</code> (orchestrator)
          to decompose complex tasks and spawn specialized agents in parallel.
        </p>

        <div className="process-grid">
          <div className="process-card">
            <span className="process-number">1</span>
            <h3>Decompose</h3>
            <p>
              Orchestrator breaks the landing page task into phases: research, structure,
              design system, implementation, validation.
            </p>
          </div>

          <div className="process-card">
            <span className="process-number">2</span>
            <h3>Delegate</h3>
            <p>
              Spawns specialized agents: researcher for trends, engineer for implementation,
              browser-tools for visual validation.
            </p>
          </div>

          <div className="process-card">
            <span className="process-number">3</span>
            <h3>Execute</h3>
            <p>
              Agents work in parallel with full context. Research happens while structure
              is being designed, maximizing efficiency.
            </p>
          </div>

          <div className="process-card">
            <span className="process-number">4</span>
            <h3>Validate</h3>
            <p>
              Browser tools CLI validates visual output. Each iteration improves validation
              rules - self-improving system.
            </p>
          </div>

          <div className="process-card">
            <span className="process-number">5</span>
            <h3>Synthesize</h3>
            <p>
              Orchestrator combines results, ensures consistency with ADA aesthetic,
              and produces production-ready output.
            </p>
          </div>

          <div className="process-card">
            <span className="process-number">6</span>
            <h3>Iterate</h3>
            <p>
              Visual validation with screenshots, responsive checks, accessibility audits.
              Fast feedback loops via browser automation.
            </p>
          </div>
        </div>
      </section>

      {/* The Stack */}
      <section className="section">
        <h2>The ADA Stack</h2>
        <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          ADA isn't just Claude - it's a complete orchestration system with specialized tools,
          custom skills, and validated workflows.
        </p>

        <div className="stack-grid">
          <div className="stack-item">
            <span className="stack-icon">🎭</span>
            <h3>Claude Opus 4.5</h3>
            <p>Orchestrator brain - decomposes tasks, routes work, synthesizes results</p>
          </div>

          <div className="stack-item">
            <span className="stack-icon">⚡</span>
            <h3>Multi-Agent System</h3>
            <p>Specialized agents: researcher, engineer, architect - parallel execution</p>
          </div>

          <div className="stack-item">
            <span className="stack-icon">🌐</span>
            <h3>Browser Tools</h3>
            <p>CLI automation for visual validation - screenshot, inspect, iterate</p>
          </div>

          <div className="stack-item">
            <span className="stack-icon">🎨</span>
            <h3>ADA Aesthetic</h3>
            <p>Tron-meets-Excalidraw design system - dark slate, neon orange/cyan</p>
          </div>

          <div className="stack-item">
            <span className="stack-icon">📚</span>
            <h3>Custom Skills</h3>
            <p>Reusable workflows: Orchestrator, Art, Research, AgentExperts</p>
          </div>

          <div className="stack-item">
            <span className="stack-icon">🔄</span>
            <h3>Self-Improving</h3>
            <p>Validation enhances after each run - feedback loop that learns</p>
          </div>
        </div>
      </section>

      {/* Live Proof */}
      <section className="section section-narrow">
        <h2>Live Proof: This Page's DNA</h2>
        <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          Here's the actual code that powers what you're seeing right now.
          Meta by design - the page proves the process.
        </p>

        <div className="code-demo" data-language="css">
          <pre><code>{`/* ADA Color System */
:root {
  --color-bg: #1A202C;           /* Deep Slate */
  --color-accent-orange: #FF6B35; /* Neon Orange */
  --color-accent-cyan: #00D9FF;   /* Cyan Glow */
}

.hero-title .accent::after {
  background: linear-gradient(
    90deg,
    var(--color-accent-orange),
    var(--color-accent-cyan)
  );
  box-shadow: 0 0 10px var(--color-accent-orange);
}`}</code></pre>
        </div>

        <div className="code-demo" data-language="jsx">
          <pre><code>{`// Scroll progress indicator
const [scrollProgress, setScrollProgress] = useState(0)

useEffect(() => {
  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight -
      window.innerHeight
    const progress = (window.scrollY / totalHeight) * 100
    setScrollProgress(progress)
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])`}</code></pre>
        </div>

        <div className="code-demo" data-language="bash">
          <pre><code>{`# The command that built this page
/o "Build a landing page showcasing ADA's orchestration"

# Orchestrator spawned:
- researcher (2026 design trends)
- engineer (React + Vite implementation)
- browser-tools validator (visual QA)

# Result: You're looking at it`}</code></pre>
        </div>
      </section>

      {/* Key Insights */}
      <section className="section section-narrow">
        <h2>Key Insights</h2>

        <div className="process-grid">
          <div className="process-card">
            <h3>Design Systems Feed AI</h3>
            <p>
              ADA has a documented aesthetic (Tron-meets-Excalidraw). The AI doesn't guess -
              it reads <code>aesthetic.md</code> and applies consistent style.
            </p>
          </div>

          <div className="process-card">
            <h3>Validation is Code</h3>
            <p>
              Browser tools aren't just for demos. They're in the validation loop -
              automated screenshots, responsive checks, accessibility audits.
            </p>
          </div>

          <div className="process-card">
            <h3>Parallel &gt; Sequential</h3>
            <p>
              While research agent gathered trends, engineer agent scaffolded the project.
              Orchestration unlocks true parallelism.
            </p>
          </div>

          <div className="process-card">
            <h3>Meta Shows Mastery</h3>
            <p>
              This page isn't about the process - it IS the process. The best demo is
              shipping the actual workflow output.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer section">
        <h3>Built with ADA Orchestrator</h3>
        <p>
          This landing page was created in response to a frontend hackathon challenge.
          Everything you see - design system, animations, code structure - came from
          the <code>/o</code> command workflow.
        </p>
        <div className="footer-signature">
          $ /o "Ship beautiful frontends, fast"
        </div>
      </footer>
    </div>
  )
}

export default App
