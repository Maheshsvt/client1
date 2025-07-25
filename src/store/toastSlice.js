import { createSlice} from "@reduxjs/toolkit";

const initialState = {
   toast: {
    isShow: false, 
    title:"",
    description: "",
    identifier: ""
   }
};

const toastSlice = createSlice({
    name: "toast",
    initialState: initialState, 
    reducers : {
        showToast(state, action){
            const { title, description, identifier } = action.payload;
            state.toast.isShow = true;
            state.toast.title = title;
            state.toast.description = description;
            state.toast.identifier = identifier;
        },
        hideToast(state, action){
            state.toast = {
                isShow: false,
                title: "",
                description: "",
                identifier: ""
            }
        }
    }
});

export const actions = toastSlice.actions;

export default toastSlice.reducer;

