import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { signInWithGoogle } from "../firebase.js";

export const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    
    setLoading(true);

    const formData = { username: name, email, password };

    try {
      const res = await axios.post("/api/auth/signup", formData, {
        withCredentials: true
      });

      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.data?.message?.includes("duplicate")) {
        setError("This email is already registered. Please log in.");
      } else {
        setError(err.response?.data?.message || "Failed to sign up. Ensure the backend is running.");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLoginMock = async () => {
    try {
      setLoading(true);
      setError("");
      
      const result = await signInWithGoogle();
      const user = result.user;
      
      const formData = { email: user.email, name: user.displayName || user.email.split("@")[0] };

      const res = await axios.post("/api/auth/google", formData, { withCredentials: true });

      if (res.status === 201 || res.status === 200) {
        navigate("/");
        window.location.reload();
      } else {
        setError("Google Backend Auth failed.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Google authentication popup closed or failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.leftSide}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <h1>Join FreshBite Today</h1>
        <p>Create an account to browse menus, save your favorite meals, and enjoy lightning-fast ordering on campus.</p>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.formCard}>
          <h2>Create Account</h2>
          {error && <div style={{ color: 'white', background: '#ff4d4f', padding: '10px', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          
          <button 
            type="button" 
            className={styles.googleBtn} 
            onClick={handleGoogleLoginMock}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className={styles.googleIcon} />
            Sign up with Google
          </button>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>Full Name</label>
              <input
                type="text"
                id="username"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            
            <div className={styles.footerText}>
              Already have an account? 
              <Link to="/login" className={styles.link}>
                Log in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
