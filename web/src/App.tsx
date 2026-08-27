import './App.css'

function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="tag">TRIP CONSENSUS</p>

        <h1>
          One trip.
          <br />
          <span>Everyone agrees.</span>
        </h1>

        <p className="intro">
          Plan a group trip without the endless back-and-forth.
          Trip Consensus gathers everyone’s needs before an AI agent
          recommends a plan.
        </p>

        <button className="primary-button">Create a group trip</button>
      </section>

      <section className="preview-card">
        <p className="tag">HOW IT WORKS</p>

        <div className="step">
          <b>01</b>
          <div>
            <h2>Collect preferences</h2>
            <p>Each traveller shares their budget, dates, and must-haves.</p>
          </div>
        </div>

        <div className="step">
          <b>02</b>
          <div>
            <h2>Find the best compromise</h2>
            <p>The agent compares options and explains its recommendation.</p>
          </div>
        </div>

        <div className="step">
          <b>03</b>
          <div>
            <h2>Book only with consensus</h2>
            <p>Nothing is booked until every traveller gives approval.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App