import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get cart item count from Redux store
  const cartItems = useSelector((state) => state.cart.items) || [];
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        if (res?.data?.user) {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? { color: 'var(--primary)' } : {};
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: 'var(--glass-bg)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>
        <Link className="navbar-brand" to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>Fresh</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>Bite</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul className="navbar-nav" style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', margin: 0, padding: 0, listStyle: 'none', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" style={{ ...isActive('/'), textDecoration: 'none', fontWeight: 600 }}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/menu" style={{ ...isActive('/menu'), textDecoration: 'none', fontWeight: 600 }}>Menu</Link>
                </li>
                <li className="nav-item" style={{ position: 'relative' }}>
                  <Link className="nav-link" to="/cart" style={{ ...isActive('/cart'), textDecoration: 'none', fontWeight: 600 }}>
                    Cart
                    {getTotalQuantity() > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-15px',
                        background: 'var(--primary)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        borderRadius: '50%',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        {getTotalQuantity()}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item" style={{ marginLeft: '1rem' }}>
                  <button className="btn-secondary-custom" onClick={handleLogout} style={{ padding: '6px 16px', fontSize: '0.9rem' }}>
                    Logout
                  </button>
                </li>
              </>
            ): (
              <li className="nav-item">
                <Link className="btn-primary-custom" to="/login" style={{ textDecoration: 'none', padding: '8px 20px', fontSize: '0.9rem' }}>
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
