import React, { useState, useEffect } from 'react';
import { Users, Search, Calendar, Clock } from 'lucide-react';
import styles from './Attendance.module.css';
import API from '../api/axios';

const Attendence = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        API.get('/api/attendance')
            .then(({ data }) => setRecords(data.data || []))
            .catch(() => setError('Failed to load attendance records.'))
            .finally(() => setLoading(false));
    }, []);

    const filtered = records.filter((r) => {
        const q = search.toLowerCase();
        return (
            r.name.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q) ||
            r.eventName.toLowerCase().includes(q)
        );
    });

    const fmt = (iso) =>
        new Date(iso).toLocaleString('en-PK', {
            dateStyle: 'medium', timeStyle: 'short'
        });

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Records</p>
                <h1 className={styles.title}>Attendance</h1>
                <p className={styles.sub}>All event registrations in real time.</p>
            </div>

            <div className={styles.inner}>

                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <Users size={18} className={styles.statIcon} />
                        <div>
                            <strong>{records.length}</strong>
                            <span>Total Registrations</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <Calendar size={18} className={styles.statIcon} />
                        <div>
                            <strong>
                                {new Set(records.map((r) => r.eventId)).size}
                            </strong>
                            <span>Events Covered</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <Clock size={18} className={styles.statIcon} />
                        <div>
                            <strong>
                                {records.filter((r) => {
                                    const diff = Date.now() - new Date(r.registeredAt);
                                    return diff < 86400000;
                                }).length}
                            </strong>
                            <span>Registered Today</span>
                        </div>
                    </div>
                </div>

                <div className={styles.searchWrap}>
                    <Search size={15} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search by name, email or event…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {loading && <p className={styles.state}>Loading records…</p>}
                {error && <p className={styles.stateErr}>{error}</p>}

                {!loading && !error && (
                    filtered.length === 0 ? (
                        <p className={styles.state}>No records found.</p>
                    ) : (
                        <div className={styles.tableWrap}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Event</th>
                                        <th>Registered At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((r, i) => (
                                        <tr key={r.id}>
                                            <td className={styles.num}>{i + 1}</td>
                                            <td>
                                                <div className={styles.nameCell}>
                                                    <div className={styles.avatar}>{r.name.charAt(0).toUpperCase()}</div>
                                                    {r.name}
                                                </div>
                                            </td>
                                            <td className={styles.muted}>{r.email}</td>
                                            <td><span className={styles.eventBadge}>{r.eventName}</span></td>
                                            <td className={styles.muted}>{fmt(r.registeredAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>
        </main>
    );
};

export default Attendence;