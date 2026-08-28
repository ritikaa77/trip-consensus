import { useState, useEffect, useRef } from 'react';
import './TripForm.css';

export interface TripFormData {
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetPerPerson: string;
  travellers: string[];
}

interface TripFormProps {
  onSubmit: (data: TripFormData) => void;
  onCancel: () => void;
}

function TripForm({ onSubmit, onCancel }: TripFormProps) {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budgetPerPerson, setBudgetPerPerson] = useState('');
  const [travellers, setTravellers] = useState(['', '']);
  const [error, setError] = useState('');

  const firstInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Remember whatever had focus before the modal opened (the trigger button)
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    firstInputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to whatever triggered the modal, once it closes/unmounts
      previouslyFocusedRef.current?.focus();
    };
  }, [onCancel]);

  const updateTraveller = (index: number, value: string) => {
    const next = [...travellers];
    next[index] = value;
    setTravellers(next);
  };

  const addTraveller = () => setTravellers([...travellers, '']);

  const removeTraveller = (index: number) => {
    if (travellers.length <= 2) return;
    setTravellers(travellers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanedTravellers = travellers.map((t) => t.trim()).filter(Boolean);

    if (!tripName.trim() || !destination.trim() || !startDate || !endDate) {
      setError('Please fill in trip name, destination, and dates.');
      return;
    }
    const budgetValue = Number(budgetPerPerson);
    if (!budgetPerPerson || Number.isNaN(budgetValue) || budgetValue <= 0) {
      setError('Please enter a valid per-person budget.');
      return;
    }
    if (cleanedTravellers.length < 2) {
      setError('Please enter at least 2 traveller names.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError('End date cannot be before start date.');
      return;
    }

    onSubmit({
      tripName: tripName.trim(),
      destination: destination.trim(),
      startDate,
      endDate,
      budgetPerPerson,
      travellers: cleanedTravellers,
    });
  };

  return (
    <div
      className="trip-form-overlay"
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onCancel();
      }}
    >
      <form
        className="trip-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trip-form-title"
        onSubmit={handleSubmit}
      >
        <h2 id="trip-form-title">Create a Group Trip</h2>

        {error && <p className="trip-form-error">{error}</p>}

        <label>
          Trip Name
          <input
            ref={firstInputRef}
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            placeholder="Goa Squad Trip"
          />
        </label>

        <label>
          Destination
          <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Goa, India" />
        </label>

        <div className="trip-form-row">
          <label>
            Start Date
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
        </div>

        <label>
          Per-Person Budget (₹)
          <input
            type="number"
            min="0"
            step="0.01"
            value={budgetPerPerson}
            onChange={(e) => setBudgetPerPerson(e.target.value)}
            placeholder="15000"
          />
        </label>

        <div className="trip-form-travellers">
          <span className="trip-form-travellers-label">Travellers (min 2)</span>
          {travellers.map((name, i) => (
            <div key={i} className="trip-form-traveller-row">
              <input
                value={name}
                onChange={(e) => updateTraveller(i, e.target.value)}
                placeholder={`Traveller ${i + 1} name`}
              />
              {travellers.length > 2 && (
                <button type="button" onClick={() => removeTraveller(i)} aria-label="Remove traveller">
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="trip-form-add-btn" onClick={addTraveller}>
            + Add traveller
          </button>
        </div>

        <div className="trip-form-actions">
          <button type="button" className="trip-form-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="trip-form-submit">
            Create Trip
          </button>
        </div>
      </form>
    </div>
  );
}

export default TripForm;