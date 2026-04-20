import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#111827', color: '#f3f4f6', padding: '4rem 2rem 2rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        
        {/* Brand Section */}
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '-1px' }}>
            Fresh<span style={{ color: 'white' }}>Bite</span>
          </h2>
          <p style={{ color: '#9ca3af', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Revolutionizing campus dining. Pre-order, skip the lines, and enjoy fresh, hot food directly from our kitchens to your hands.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Explore</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link to="/menu" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Our Menu</Link></li>
            <li><Link to="/cart" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Your Cart</Link></li>
            <li><Link to="/track-order" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Track Order</Link></li>
            <li><Link to="/admin" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Admin Dashboard</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Legal</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms of Service</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Cookie Policy</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #374151', marginTop: '3rem', paddingTop: '2rem', textAlign: 'center', color: '#6b7280' }}>
        <p>&copy; {new Date().getFullYear()} FreshBite Canteen System. Crafted with 💛 according to latest standards.</p>
      </div>
    </footer>
  );
};

export default Footer;
