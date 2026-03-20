import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MapPin, Mail, Phone, Twitter, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topBar} />
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Link to="/" className={styles.brand}>
            <span className={styles.logoIcon}>
              <Zap size={16} strokeWidth={2.5} />
            </span>
            Event<span className={styles.accent}>Spark</span>
          </Link>
          <p className={styles.tagline}>
            Discover, attend, and create unforgettable local experiences — all in one place.
          </p>
          <div className={styles.socials}>
            <a href="/twiiter" aria-label="Twitter" className={styles.socialLink}><Twitter size={16} /></a>
            <a href="/instagram" aria-label="Instagram" className={styles.socialLink}><Instagram size={16} /></a>
            <a href="/facebook" aria-label="Facebook" className={styles.socialLink}><Facebook size={16} /></a>
          </div>
        </div>
        <div className={styles.navCols}>
          <div className={styles.navCol}>
            <h4 className={styles.colHeading}>Platform</h4>
            <ul>
              <li><Link to="/events" className={styles.navLink}>Browse Events<ArrowUpRight size={12} /></Link></li>
              <li><Link to="/events/create" className={styles.navLink}>Host an Event<ArrowUpRight size={12} /></Link></li>
              <li><Link to="/pricing" className={styles.navLink}>Pricing<ArrowUpRight size={12} /></Link></li>
              <li><Link to="/faq" className={styles.navLink}>FAQ<ArrowUpRight size={12} /></Link></li>
            </ul>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colHeading}>Company</h4>
            <ul>
              <li><Link to="/" className={styles.navLink}>Home<ArrowUpRight size={12} /></Link></li>
              <li><Link to="/events" className={styles.navLink}>Event<ArrowUpRight size={12} /></Link></li>
              <li><Link to="/contact" className={styles.navLink}>Contact<ArrowUpRight size={12} /></Link></li>
              <li><Link to="/attendance" className={styles.navLink}>Attendance<ArrowUpRight size={12} /></Link></li>
            </ul>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colHeading}>Legal</h4>
            <ul>
              <li><Link to="/privacy" className={styles.navLink}>Privacy Policy<ArrowUpRight size={12} /></Link></li>
              <li><Link to="/terms" className={styles.navLink}>Terms of Service<ArrowUpRight size={12} /></Link></li>
              <li><Link to="/cookies" className={styles.navLink}>Cookie Policy<ArrowUpRight size={12} /></Link></li>
            </ul>
          </div>
        </div>


        <div className={styles.contactCol}>
          <h4 className={styles.colHeading}>Get in Touch</h4>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={14} className={styles.contactIcon} />
              <span> Sangjani Toll D17 street 38, Rawalpindi</span>
            </li>
            <li>
              <Mail size={14} className={styles.contactIcon} />
              <a href="mailto:saadhussaini678@gmail.com" className={styles.contactLink}>
                saadhussaini678@gmail.com
              </a>
            </li>
            <li>
              <Phone size={14} className={styles.contactIcon} />
              <a href="tel:+923275267613" className={styles.contactLink}>
                0327 5267613
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p className={styles.copy}>© {year} EventSpark, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;