import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className={styles['hero-wrapper']}>
        <div className={styles['hero-content']}>
          <h1 className={styles.title}>
            Fresh Food, <span className={styles.highlight}>Delivered Fast</span>
          </h1>
          <p className={styles.subtitle}>
            Experience the ultimate campus dining. Skip the queues, customize your orders, and enjoy hot meals on your schedule. 
          </p>
          <div className={styles['button-group']}>
            <Link to="/menu" className="btn-primary-custom" style={{ textDecoration: 'none' }}>
              Explore Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose FreshBite?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>⏱️</span>
            <h3 className={styles.featureTitle}>Skip the Line</h3>
            <p className={styles.featureDesc}>Pre-order your favorite meals and pick them up instantly without wasting time in long queues.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>💳</span>
            <h3 className={styles.featureTitle}>Secure Payments</h3>
            <p className={styles.featureDesc}>Pay seamlessly using Razorpay integration supporting UPI, Wallets, and Credit/Debit Cards.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🥗</span>
            <h3 className={styles.featureTitle}>Fresh & Healthy</h3>
            <p className={styles.featureDesc}>All our meals are prepared fresh daily using high-quality, locally sourced ingredients.</p>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className={styles.gallerySection}>
        <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Delicious Pizza" className={styles.galleryImage} />
        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tasty Burger" className={styles.galleryImage} />
      </div>

      {/* Call to Action Section */}
      <div className={styles.ctaSection}>
        <h2>Hungry Yet?</h2>
        <p>Join hundreds of students ordering through FreshBite today.</p>
        <Link to="/signup" className="btn-secondary-custom" style={{ textDecoration: 'none', background: 'white', color: 'var(--primary)' }}>
          Create an Account
        </Link>
      </div>
    </div>
  );
};

export default Home;
