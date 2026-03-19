import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCheck, Loader, Calendar, ChevronDown } from 'lucide-react';
import styles from './AttendanceForm.module.css';
import API from '../api/axios';

const EMPTY = { name: '', email: '', eventId: '', eventName: '' };

const AttendanceForm = () => {
    const [form, setForm] = useState(EMPTY);
    const [events, setEvents] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [apiError, setApiError] = useState('');
    const [done, setDone] = useState(false);


    useEffect(() => {
        API.get('/api/events')
            .then(({ data }) => setEvents(data.data || []))
            .catch(() => { })
            .finally(() => setFetching(false));
    }, []);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required.';
        if (!form.email.trim()) e.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
        if (!form.eventId) e.eventId = 'Please select an event.';
        return e;
    };

    const handleChange = (field) => (ev) => {
        const value = ev.target.value;
        if (field === 'eventId') {
            const selected = events.find((e) => String(e.id) === value);
            setForm((p) => ({ ...p, eventId: value, eventName: selected?.name || '' }));
        } else {
            setForm((p) => ({ ...p, [field]: value }));
        }
        if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setApiError('');
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        try {
            await API.post('/api/attendance', {
                name: form.name,
                email: form.email,
                eventId: form.eventId,
                eventName: form.eventName,
            });
            setDone(true);
        } catch (err) {
            setApiError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (done) return (
        <main className={styles.page}>
            <div className={styles.successPage}>
                <div className={styles.successIcon}><UserCheck size={32} /></div>
                <h2>You're Registered!</h2>
                <p>You've successfully registered for <strong>{form.eventName}</strong>.</p>
                <p className={styles.successSub}>See you there! A confirmation has been noted.</p>
                <button className={styles.submitBtn} onClick={() => { setForm(EMPTY); setDone(false); }}>
                    Register for Another Event
                </button>
            </div>
        </main>
    );

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Register</p>
                <h1 className={styles.title}>Attendance Form</h1>
                <p className={styles.sub}>Sign up to attend an event and secure your spot.</p>
            </div>

            <div className={styles.formWrap}>
                <div className={styles.formCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardIcon}><Calendar size={20} /></div>
                        <div>
                            <h2 className={styles.cardTitle}>Event Registration</h2>
                            <p className={styles.cardSub}>Fill in your details below to confirm attendance.</p>
                        </div>
                    </div>

                    {apiError && <p className={styles.apiError}>{apiError}</p>}

                    <form onSubmit={handleSubmit} className={styles.form} noValidate>
                        <div className={styles.field}>
                            <label htmlFor="att-name">Full Name</label>
                            <input
                                id="att-name" type="text" placeholder="Muhammad Saad"
                                value={form.name} onChange={handleChange('name')}
                                className={errors.name ? styles.inputErr : ''}
                                disabled={loading}
                            />
                            {errors.name && <span className={styles.errMsg}>{errors.name}</span>}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="att-email">Email Address</label>
                            <input
                                id="att-email" type="email" placeholder="saad@example.com"
                                value={form.email} onChange={handleChange('email')}
                                className={errors.email ? styles.inputErr : ''}
                                disabled={loading}
                            />
                            {errors.email && <span className={styles.errMsg}>{errors.email}</span>}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="att-event">Select Event</label>
                            <div className={styles.selectWrap}>
                                <select
                                    id="att-event"
                                    value={form.eventId}
                                    onChange={handleChange('eventId')}
                                    className={`${styles.select} ${errors.eventId ? styles.inputErr : ''}`}
                                    disabled={loading || fetching}
                                >
                                    <option value="">
                                        {fetching ? 'Loading events…' : '— Choose an event —'}
                                    </option>
                                    {events.map((e) => (
                                        <option key={e.id} value={String(e.id)}>
                                            {e.name} — {e.location}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={15} className={styles.selectIcon} />
                            </div>
                            {errors.eventId && <span className={styles.errMsg}>{errors.eventId}</span>}
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading || fetching}>
                            {loading
                                ? <><Loader size={15} className={styles.spin} /> Registering…</>
                                : <><UserCheck size={15} /> Confirm Attendance</>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default AttendanceForm;