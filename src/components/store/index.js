import {configureStore} from '@reduxjs/toolkit';
import UISlice from './UI-slice';

const store = configureStore({
    reducer: {ui: UISlice.reducer}
})

export default store;