import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../Redux/cart/cartSlice";
import { selectCartItems, selectTotalPrice } from "../Redux/cart/createSelectors";
import styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const items = useSelector(selectCartItems);
  const total = useSelector(selectTotalPrice);

  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleCheckoutOpen = () => {
    if (items.length === 0) return;
    setShowPaymentModal(true);
  };

  const submitPayment = async (e) => {
    e.preventDefault();
    try {
      if (items.length === 0) return;
      setLoading(true);

      // We are mocking Razorpay with our own custom modal UI.

      // Simulate network processing delay for authentic feel
      await new Promise(resolve => setTimeout(resolve, 1500));

      const orderData = {
        totalAmount: total,
        paymentMethod: "card",
        items: items.map(item => ({
          id: item.id.toString(),
          name: item.name,
          variant: item.variant,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const res = await axios.post("http://localhost:3000/orders/place", orderData, {
        withCredentials: true
      });
      
      if (res.data.success) {
        alert("✅ Payment Successful! Order has been placed and saved to MongoDB.");
        window.location.href = '/';
      }

    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("You must be logged in to place an order!");
        navigate("/login");
      } else {
        alert("Checkout failed. Ensure backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* LEFT SIDE - Cart Items */}
      <div className={styles.cartItemsSection}>
        <h2 className={styles.heading}>🛒 Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className={styles.emptyMessage}>Your cart is completely empty. Add some delicious food!</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className={styles.cartItem} key={`${item.id}-${item.variant}`}>
                <img src={item.image} className={styles.itemImage} alt={item.name} />

                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name} <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>({item.variant})</span></h3>
                  <div className={styles.itemPrice}>₹{item.price * item.quantity}</div>
                  
                  <div className={styles.controlsRow}>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className={styles.qtyText}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* RIGHT SIDE - Cart Summary */}
      <div className={styles.summarySection}>
        <div className={styles.summaryBox}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          {items.length === 0 ? (
             <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No items to summarize.</p>
          ) : (
            <>
              <div>
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant}`} className={styles.summaryItem}>
                    <span>{item.quantity}x {item.name} ({item.variant})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span style={{color: 'var(--primary)'}}>₹{total}</span>
              </div>

              <button className={styles.payButton} onClick={handleCheckoutOpen} disabled={loading}>
                {loading ? "Processing..." : "Checkout Securely"}
              </button>
            </>
          )}
        </div>
      </div>
      {/* Payment Modal */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', 
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'white', padding: '2rem', borderRadius: '12px', 
            width: '90%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--text-main)' }}>Secure Payment Simulation</h3>
            <form onSubmit={submitPayment}>
              <div style={{ marginBottom: '1rem' }}>
                 <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Card Number</label>
                 <input type="text" placeholder="1234 5678 9101 1121" required
                   style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                 />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                 <div style={{ flex: 1 }}>
                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Expiry</label>
                   <input type="text" placeholder="MM/YY" required
                     style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                   />
                 </div>
                 <div style={{ flex: 1 }}>
                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>CVV</label>
                   <input type="password" placeholder="123" required
                     style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                   />
                 </div>
              </div>
              
              <button type="submit" className={styles.payButton} disabled={loading} style={{ width: '100%', marginBottom: '1rem' }}>
                {loading ? "Processing..." : `Pay ₹${total}`}
              </button>
              <button type="button" onClick={() => setShowPaymentModal(false)} style={{
                width: '100%', padding: '12px', background: 'transparent', border: 'none', 
                color: 'var(--text-muted)', cursor: 'pointer', fontWeight: '500'
              }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
