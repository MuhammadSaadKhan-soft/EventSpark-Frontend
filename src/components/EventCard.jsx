import React, { useState } from 'react';
import styles from './EventCard.module.css';

const CATEGORY_COLORS = {
  Technology: { color: '#60a5fa', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)' },
  Design: { color: '#f472b6', bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.3)' },
  Business: { color: '#4ade80', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)' },
  Culture: { color: '#facc15', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.3)' },
  default: { color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)' },
};

const EventCard = ({ event, index }) => {
  const [registered, setRegistered] = useState(false);
  const cat = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.default;
  const lowSpots = event.spots <= 10;

  const handleRegister = () => {
    setRegistered(true);
    setTimeout(() => setRegistered(false), 3000);
  };

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.09}s` }}
    >

      <div className={styles.topRow}>
        <span
          className={styles.catPill}
          style={{ color: cat.color, background: cat.bg, border: `1px solid ${cat.border}` }}
        >
          {event.category}
        </span>
        <span className={styles.emoji}>{event.emoji}</span>
      </div>

      <h3 className={styles.name}>{event.name}</h3>

      <div className={styles.meta}>
        <div className={styles.metaRow}>

          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <line x1="16" y1="1" x2="16" y2="5" />
            <line x1="8" y1="1" x2="8" y2="5" />
            <line x1="2" y1="9" x2="22" y2="9" />
          </svg>
          <span>{event.date} &nbsp;·&nbsp; {event.time}</span>
        </div>
        <div className={styles.metaRow}>

          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span>{event.location}</span>
        </div>
      </div>


      <p className={styles.desc}>{event.description}</p>


      <div className={styles.footer}>
        <span className={lowSpots ? styles.spotsLow : styles.spotsOk}>
          {lowSpots ? `🔥 Only ${event.spots} spots left` : `${event.spots} spots available`}
        </span>

        <button
          className={`${styles.btn} ${registered ? styles.btnDone : ''}`}
          onClick={handleRegister}
        >
          {registered ? '✓ Registered!' : 'Register'}
        </button>
      </div>
    </article>
  );
};

export default EventCard;
