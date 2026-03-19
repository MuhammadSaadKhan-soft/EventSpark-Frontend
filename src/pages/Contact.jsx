import React, { useState } from 'react';
import styles from './Contact.module.css';
import API from '../api/axios';

const INFO = [
  { icon: '📧', label: 'Email', value: 'saadhussaini678@gmail.com' },
  { icon: '📞', label: 'Phone', value: '+92 327 5267613' },
  { icon: '📍', label: 'Location', value: 'Rawalpindi, Pakistan' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat, 9AM–6PM' },
];

const EMPTY = { name: '', email: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await API.post('/api/contact', form);
      setSent(true);
      setForm(EMPTY);
      setErrors({});
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Get In Touch</p>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.sub}>Have an event to list or a question? We'd love to hear from you.</p>
      </div>

      <div className={styles.layout}>

        <div className={styles.infoCol}>
          <h2 className={styles.infoTitle}>Reach Out</h2>
          <p className={styles.infoSub}>We respond to all inquiries within 24 hours.</p>
          <div className={styles.infoGrid}>
            {INFO.map((item) => (
              <div key={item.label} className={styles.infoCard}>
                <span className={styles.infoIcon}>{item.icon}</span>
                <div>
                  <p className={styles.infoLabel}>{item.label}</p>
                  <p className={styles.infoValue}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formCard}>
          {sent ? (
            <div className={styles.success}>
              <span>🎉</span>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <h2 className={styles.formTitle}>Send a Message</h2>

              {apiError && <p className={styles.apiError}>{apiError}</p>}

              <div className={styles.field}>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name" type="text" placeholder="Muhammad Saad"
                  value={form.name}
                  onChange={handleChange('name')}
                  className={errors.name ? styles.inputErr : ''}
                  disabled={loading}
                />
                {errors.name && <span className={styles.errMsg}>{errors.name}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email" type="email" placeholder="saad@example.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  className={errors.email ? styles.inputErr : ''}
                  disabled={loading}
                />
                {errors.email && <span className={styles.errMsg}>{errors.email}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message" rows={5} placeholder="Tell us about your event or question…"
                  value={form.message}
                  onChange={handleChange('message')}
                  className={errors.message ? styles.inputErr : ''}
                  disabled={loading}
                />
                {errors.message && <span className={styles.errMsg}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Contact;