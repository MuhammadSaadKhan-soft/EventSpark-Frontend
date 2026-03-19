import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const BoltIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <span className={styles.logo}><BoltIcon /></span>
          Event<span className={styles.brandAccent}>Spark</span>
        </Link>
        <ul className={styles.links}>
          {[
            { to: '/', label: 'Home' },
            { to: '/events', label: 'Events' },
            { to: '/contact', label: 'Contact' },
            { to: '/attendance', label: 'Attendance' },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>


        <Link to="/events" className={styles.cta}>Browse Events</Link>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {[
          { to: '/', label: 'Home' },
          { to: '/events', label: 'Events' },
          { to: '/contact', label: 'Contact' },
          { to: '/attendance', label: 'Attendance' }
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.mobileLink} ${isActive ? styles.active : ''}`
            }
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}
        <Link to="/events" className={styles.cta} onClick={closeMenu}>
          Browse Events
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
