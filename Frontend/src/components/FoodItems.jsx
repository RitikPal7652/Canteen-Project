import { useState } from "react";
import styles from "./FoodItems.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cart/cartSlice";

const FoodItems = ({ recipee }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState("small");
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const itemForCart = {
      id: recipee._id || recipee.id || Math.random().toString(),
      name: recipee.name,
      image: recipee.image,
      variant: varient,
      quantity: quantity,
      price: recipee.Prices[0][varient] * quantity,
    };
    dispatch(addToCart(itemForCart));
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000); // Reset button after 2 seconds
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src={recipee.image} className={styles.img} alt={recipee.name} />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{recipee.name}</h3>
        
        <div className={styles.optionsContainer}>
          <div className={styles.optionWrapper}>
            <span className={styles.label}>Size</span>
            <select
              className={styles.select}
              value={varient}
              onChange={(e) => setVarient(e.target.value)}
            >
              {recipee.varients.map((v, index) => (
                <option key={index} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.optionWrapper}>
            <span className={styles.label}>Quantity</span>
            <select
              className={styles.select}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {recipee.Quantity.map((q, index) => (
                <option key={index} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            ₹{recipee.Prices[0][varient] * quantity}
          </div>
          <button
            className="btn-primary-custom" 
            style={{ 
              padding: '8px 16px', 
              fontSize: '0.9rem',
              backgroundColor: isAdded ? '#10b981' : 'var(--primary)',
              transition: 'background-color 0.3s ease'
            }}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItems;
