import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import styles from './AttendanceWidget.module.css';
import API from '../api/axios';

const timeAgo = (iso) => {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const AttendanceWidget = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = () => {
    API.get('/api/attendance')
      .then(({ data }) => setRecords(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecords();
    const id = setInterval(fetchRecords, 30000);
    return () => clearInterval(id);
  }, []);


  const byEvent = records.reduce((acc, r) => {
    acc[r.eventName] = (acc[r.eventName] || 0) + 1;
    return acc;
  }, {});
  const topEvents = Object.entries(byEvent).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const recent    = [...records].sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)).slice(0, 4);

  if (loading) return (
    <div className={styles.widget}>
      <div className={styles.skeleton} />
    </div>
  );

  return (
    <div className={styles.widget}>

      <div className={styles.widgetHeader}>
        <div className={styles.widgetIcon}><Users size={18} /></div>
        <div>
          <h3 className={styles.widgetTitle}>Live Attendance</h3>
          <p className={styles.widgetSub}>Real-time registrations</p>
        </div>
        <div className={styles.totalBadge}>
          <TrendingUp size={11} />
          {records.length} registered
        </div>
      </div>

      {records.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No registrations yet.</p>
          <Link to="/attendance" className={styles.emptyLink}>
            Be the first to register <ArrowRight size={13} />
          </Link>
        </div>
      ) : (
        <div className={styles.widgetBody}>

          {topEvents.length > 0 && (
            <div className={styles.topSection}>
              <p className={styles.subLabel}>Most Popular</p>
              {topEvents.map(([name, count]) => (
                <div key={name} className={styles.topRow}>
                  <span className={styles.topName}>{name}</span>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${Math.min((count / records.length) * 200, 100)}%` }}
                    />
                  </div>
                  <span className={styles.topCount}>{count}</span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.recentSection}>
            <p className={styles.subLabel}>Recent Sign-ups</p>
            <ul className={styles.recentList}>
              {recent.map((r) => (
                <li key={r.id} className={styles.recentItem}>
                  <div className={styles.recentAvatar}>
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.recentInfo}>
                    <span className={styles.recentName}>{r.name}</span>
                    <span className={styles.recentEvent}>{r.eventName}</span>
                  </div>
                  <span className={styles.recentTime}>
                    <Clock size={10} /> {timeAgo(r.registeredAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/attendance" className={styles.widgetFooter}>
            View all registrations <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default AttendanceWidget;