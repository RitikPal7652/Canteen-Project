import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { signInWithGoogle } from "../firebase.js";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = { email, password };

    try {
      const res = await axios.post(
        "/api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (res.status === 201 || res.status === 200) {
        navigate("/");
        window.location.reload(); // Ensures navbar resets auth state gracefully
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Ensure the server is running.");
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
        <h1>Welcome Back to FreshBite</h1>
        <p>Order your favorite meals ahead of time and avoid the campus rush. Delicious food awaits!</p>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.formCard}>
          <h2>Sign In</h2>
          {error && <div style={{ color: 'white', background: '#ff4d4f', padding: '10px', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          
          <button 
            type="button" 
            className={styles.googleBtn} 
            onClick={handleGoogleLoginMock}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className={styles.googleIcon} />
            Sign in with Google
          </button>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="text"
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
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
            
            <div className={styles.footerText}>
              Don't have an account? 
              <Link to="/signup" className={styles.link}>
                Sign up here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
