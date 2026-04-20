import { useState, useEffect } from "react";
import axios from "axios";
import FoodItems from "../components/FoodItems.jsx";

const Menu = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        
        if (res.data && res.data.meals) {
          // Map TheMealDB response to our app's expected structure
          const formattedItems = res.data.meals.map((meal) => ({
            _id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            varients: ["small", "medium", "large"],
            Quantity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            // Creating random-looking prices based on string length to simulate variety
            Prices: [{"small": 100 + (meal.strMeal.length * 5), "medium": 150 + (meal.strMeal.length * 5), "large": 200 + (meal.strMeal.length * 10)}],
            mealType: meal.strCategory
          }));
          // Get at least 20 items (TheMealDB search without query usually returns 25)
          setRecipes(formattedItems);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching menu data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="page-container" style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{ textAlign: 'center', margin: '2rem 0 3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
          Discover Our <span style={{ color: 'var(--primary)' }}>Menu</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
          Explore our wide range of delicious food items, prepared fresh every day just for you.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <input 
          type="text" 
          placeholder="Search for food items..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '12px 24px',
            fontSize: '1.1rem',
            width: '100%',
            maxWidth: '500px',
            borderRadius: '50px',
            border: '2px solid var(--border)',
            outline: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--text-muted)' }}>
          Loading fresh menu...
        </div>
      ) : (
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem',
            paddingBottom: '3rem'
          }}
        >
          {recipes.filter(recipe => recipe.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? 
            recipes.filter(recipe => recipe.name.toLowerCase().includes(searchQuery.toLowerCase())).map((recipee) => (
            <div key={recipee._id}>
              <FoodItems recipee={recipee} />
            </div>
          )) : (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', width: '100%', gridColumn: '1 / -1', fontSize: '1.2rem' }}>
              No food items found matching your search.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
