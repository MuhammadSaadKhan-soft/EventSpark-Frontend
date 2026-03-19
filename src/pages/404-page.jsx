const DostNotExists = () => {
   return( <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '16px',
        color: 'var(--muted2)', textAlign: 'center', padding: '24px'
    }}>
        <span style={{ fontSize: '4rem' }}>🌌</span>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', color: '#fff' }}>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/" style={{
            marginTop: '8px', color: 'var(--accent)', textDecoration: 'none',
            fontWeight: 600, fontSize: '0.9rem'
        }}>← Back to Home</a>
    </div>);
}
export default DostNotExists;