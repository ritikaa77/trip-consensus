import { useState } from 'react'
import './App.css'
import TripForm, { type TripFormData } from './TripForm'
import TripDashboard from './TripDashboard'

export interface Member {
  name: string
  preferencesReceived: boolean
  approved: boolean
}

export interface Trip {
  tripName: string
  destination: string
  startDate: string
  endDate: string
  budgetPerPerson: string
  members: Member[]
}

function App() {
  const [showForm, setShowForm] = useState(false)
  const [trip, setTrip] = useState<Trip | null>(null)

  const handleCreateTrip = (data: TripFormData) => {
    const newTrip: Trip = {
      tripName: data.tripName,
      destination: data.destination,
      startDate: data.startDate,
      endDate: data.endDate,
      budgetPerPerson: data.budgetPerPerson,
      members: data.travellers.map((name) => ({
        name,
        preferencesReceived: false,
        approved: false,
      })),
    }
    setTrip(newTrip)
    setShowForm(false)
  }

  const togglePreferences = (index: number) => {
    if (!trip) return
    const updatedMembers = [...trip.members]
    updatedMembers[index] = {
      ...updatedMembers[index],
      preferencesReceived: !updatedMembers[index].preferencesReceived,
    }
    setTrip({ ...trip, members: updatedMembers })
  }

  const toggleApproval = (index: number) => {
    if (!trip) return
    const updatedMembers = [...trip.members]
    updatedMembers[index] = {
      ...updatedMembers[index],
      approved: !updatedMembers[index].approved,
    }
    setTrip({ ...trip, members: updatedMembers })
  }

  if (trip) {
    return (
      <TripDashboard
        trip={trip}
        onTogglePreferences={togglePreferences}
        onToggleApproval={toggleApproval}
      />
    )
  }

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

        <button className="primary-button" onClick={() => setShowForm(true)}>
          Create a group trip
        </button>
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

      {showForm && (
        <TripForm onSubmit={handleCreateTrip} onCancel={() => setShowForm(false)} />
      )}
    </main>
  )
}

export default App