import type { Trip } from './App'
import './TripDashboard.css'

interface TripDashboardProps {
  trip: Trip
  onTogglePreferences: (index: number) => void
  onToggleApproval: (index: number) => void
}

function TripDashboard({ trip, onTogglePreferences, onToggleApproval }: TripDashboardProps) {
  const approvedCount = trip.members.filter((m) => m.approved).length
  const totalMembers = trip.members.length
  const allApproved = approvedCount === totalMembers

  return (
    <main className="dashboard">
      <section className="dashboard-card">
        <p className="tag">TRIP CONSENSUS</p>
        <h1 className="dashboard-title">{trip.tripName}</h1>

        <div className="dashboard-meta">
          <div>
            <span className="dashboard-meta-label">Destination</span>
            <span className="dashboard-meta-value">{trip.destination}</span>
          </div>
          <div>
            <span className="dashboard-meta-label">Dates</span>
            <span className="dashboard-meta-value">
              {trip.startDate} → {trip.endDate}
            </span>
          </div>
          <div>
            <span className="dashboard-meta-label">Budget / person</span>
            <span className="dashboard-meta-value">₹{trip.budgetPerPerson}</span>
          </div>
        </div>
      </section>

      <section className="dashboard-card">
        <p className="tag">MEMBERS</p>

        <ul className="member-list">
          {trip.members.map((member, i) => (
            <li key={i} className="member-row">
              <span className="member-name">{member.name}</span>

              <button
                className={`status-badge ${member.preferencesReceived ? 'status-received' : 'status-waiting'}`}
                onClick={() => onTogglePreferences(i)}
              >
                {member.preferencesReceived ? 'Preferences received' : 'Waiting for preferences'}
              </button>

              <button
                className={`status-badge ${member.approved ? 'status-approved' : 'status-pending'}`}
                onClick={() => onToggleApproval(i)}
              >
                {member.approved ? 'Approved' : 'Not approved'}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="dashboard-card approval-summary">
        <p className="tag">APPROVAL STATUS</p>
        <p className="approval-count">
          {approvedCount} / {totalMembers} approved
        </p>
        <p className={`approval-note ${allApproved ? 'approval-note-ready' : ''}`}>
          {allApproved
            ? 'All travellers have approved — booking can proceed.'
            : 'Booking requires unanimous approval from every traveller before it can proceed.'}
        </p>
      </section>
    </main>
  )
}

export default TripDashboard