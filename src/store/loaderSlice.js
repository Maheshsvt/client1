import { createSlice } from "@reduxjs/toolkit";

const initialState = { showLoader : false, text: "" };
const loaderSlice = createSlice({
    name: "loader",
    initialState, 
    reducers: {
        startLoading(state, action){
            state.text = action.payload;
            state.showLoader = true;
        },
        stopLoading(state, action){
            state.text = "";
            state.showLoader = false;
        }
    }
});

export const actions = loaderSlice.actions;
export default loaderSlice.reducer;