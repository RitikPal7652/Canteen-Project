import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value+=1
//     },
//     decrement : (state) => {
//       state.value-=1
//     },
//     reset : (state) => {
//       state.value=0
//     }
//   }
// })

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // We must check variant as well in case they add different sizes
      const existing = state.items.find((i) => i.id === item.id && i.variant === item.variant);

      if (existing) {
        // Increment the quantity by what they selected
        existing.quantity += item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if(item){
        item.quantity+=1
      }
    },
    decreaseQuantity : (state, action) => {
      const item = state.items.find(item => item.id === action.payload);

      if(item && item.quantity>1){
        item.quantity -=1;
      }else{
        state.items = state.items.filter(arr => arr.id !== action.payload)
      }
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;
// export const {increment, decrement, reset} = counterSlice.actions;

export const cartReducer = cartSlice.reducer;
// export const counterReducer = counterSlice.reducer
