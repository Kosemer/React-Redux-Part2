import {configureStore} from '@reduxjs/toolkit';
import UISlice from './UI-slice';
import cartSlice from './Cart-slice';

const store = configureStore({
    reducer: {ui: UISlice.reducer, cart: cartSlice.reducer}
})

export default store;