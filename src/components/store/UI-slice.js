import {createSlice} from '@reduxjs/toolkit';

const uiSlicec = createSlice({
    name: 'ui',
    initialState: {cartIsVisible: true},
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible
        }
    }
})

export default uiSlicec;

export const uiSliceActions = uiSlicec.actions;