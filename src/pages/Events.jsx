import React, { useState } from 'react';
import useEvents from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import styles from './Events.module.css';

const CATEGORIES = ['All', 'Technology', 'Design', 'Business', 'Culture'];

const Events = () => {
  const { events, loading, error } = useEvents();
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('All');

  const filtered = events.filter((ev) => {
    const matchSearch = ev.name.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = active === 'All' || ev.category === active;
    return matchSearch && matchCat;
  });

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Explore All</p>
        <h1 className={styles.title}>Events</h1>
        <p className={styles.sub}>Browse upcoming events across technology, design, business & culture.</p>
      </div>
      <div className={styles.controls}>

        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search events by name or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
          )}
        </div>


        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filter} ${active === cat ? styles.filterActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>


      {loading && <p className={styles.state}>Loading events…</p>}
      {error && <p className={styles.stateErr}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <p className={styles.count}>
            Showing <strong>{filtered.length}</strong> event{filtered.length !== 1 ? 's' : ''}
          </p>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <span>🔍</span>
              <p>No events found{search ? ` for "${search}"` : ''}.</p>
              <button onClick={() => { setSearch(''); setActive('All'); }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((ev, i) => (
                <EventCard key={ev.id} event={ev} index={i} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Events;
