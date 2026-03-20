import React from 'react';
import { Link } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import AttendanceWidget from '../components/Attendancewidget';
import styles from './Home.module.css';
import { ArrowRight,  Calendar, MapPin, Zap, Star } from 'lucide-react';

const WHY_CARDS = [
  { icon: <Calendar size={20} />, title: 'Curated Events', desc: 'Hand-picked events across tech, design, business & culture.' },
  { icon: <MapPin size={20} />, title: 'Local First', desc: 'Hyper-local discovery — events happening in your city.' },
  { icon: <Zap size={20} />, title: 'Instant Register', desc: 'One-click registration with instant confirmation.' },
];

const TESTIMONIALS = [
  { avatar: 'AR', name: 'Ayesha Raza', role: 'UX Designer · Karachi', text: 'EventSpark completely changed how I discover local tech events. I have attended 6 meetups this year and built real connections.' },
  { avatar: 'BT', name: 'Bilal Tariq', role: 'Startup Founder · Lahore', text: "Listed my startup summit here and sold out 200 seats in 3 days. The reach is incredible for Pakistan's event scene." },
  { avatar: 'SM', name: 'Sana Malik', role: 'Marketing Lead · Islamabad', text: 'The curated picks are always spot on. No noise, just events I actually care about. Registration is seamlessly fast.' },
];

const Home = () => {
  const { events, loading, error } = useEvents();

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.marqueeWrapper}>
            <div className={styles.marqueeTrack}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className={styles.marqueeItem}>
                   &nbsp;Pakistan's #1 Local Events Platform
                  <span className={styles.marqueeDot} aria-hidden="true">✦</span>
                </span>
              ))}
            </div>
          </div>
          <h1 className={styles.heroH1}>
            Discover Events<br />
            <span className={styles.gradient}>Near You</span>
          </h1>
          <p className={styles.heroSub}>
            From tech meetups to cultural festivals — find, explore, and register
            for the events shaping your city.
          </p>
          <div className={styles.heroActions}>
            <Link to="/events" className={styles.btnPrimary}>
              Explore Events <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className={styles.btnOutline}>Contact Us</Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}><strong>120+</strong><span>Events Monthly</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>40K+</strong><span>Attendees</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>15+</strong><span>Cities Covered</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>4.9★</strong><span>Avg Rating</span></div>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Upcoming</p>
            <h2 className={styles.sectionTitle}>Featured Events</h2>
          </div>
          <Link to="/events" className={styles.viewAll}>View all events →</Link>
        </div>
        {loading && <p className={styles.state}>Loading events…</p>}
        {error && <p className={styles.stateErr}>Error: {error}</p>}
        {!loading && !error && (
          <div className={styles.grid}>
            {events.slice(0, 3).map((ev, i) => (
              <EventCard key={ev.id} event={ev} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.why}>
        <div className={styles.whySectionHead}>
          <p className={styles.eyebrow}>Why Choose Us</p>
          <h2 className={styles.sectionTitle}>Built for Event Lovers</h2>
        </div>
        <div className={styles.whyInner}>
          {WHY_CARDS.map((item) => (
            <div key={item.title} className={styles.whyCard}>
              <div className={styles.whyIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.attendanceSection}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Live Activity</p>
            <h2 className={styles.sectionTitle}>Who's Attending</h2>
          </div>
          <Link to="/attendance" className={styles.viewAll}>Register now →</Link>
        </div>
        <div className={styles.attendanceGrid}>
          <div className={styles.attendanceLeft}>
            <h3>Real people. Real events. Right now.</h3>
            <p>
              See who’s registering for events happening across Pakistan in real time.
              Every sign-up you see here is a real attendee securing their spot.
            </p>
            <p>
              Don’t miss out — popular events fill up fast. Register in seconds
              and join thousands of attendees discovering their next experience.
            </p>
            <Link to="/attendance" className={styles.attendanceRegisterBtn}>
              <ArrowRight size={15} /> Register Your Attendance
            </Link>
          </div>
          <AttendanceWidget />
        </div>
      </section>

      <section className={styles.testimonials}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Real Stories</p>
            <h2 className={styles.sectionTitle}>What Attendees Say</h2>
          </div>
        </div>
        <div className={styles.tGrid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className={styles.tCard}>
              <div className={styles.tStars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="#f97316" color="#f97316" />
                ))}
              </div>
              <p className={styles.tText}>"{t.text}"</p>
              <div className={styles.tAuthor}>
                <div className={styles.tAvatar}>{t.avatar}</div>
                <div>
                  <p className={styles.tName}>{t.name}</p>
                  <p className={styles.tRole}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Find Your Next Event?</h2>
          <p className={styles.ctaSub}>
            Join 40,000+ attendees discovering Pakistan's best events every month.
            Free to use. No account needed for free events.
          </p>
          <div className={styles.heroActions}>
            <Link to="/events" className={styles.btnPrimary}>
              Browse Events <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className={styles.btnOutline}>List Your Event</Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;