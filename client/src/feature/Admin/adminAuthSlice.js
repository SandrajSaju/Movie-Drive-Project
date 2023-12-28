import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminEmail: localStorage.getItem("adminEmail") ? JSON.parse(localStorage.getItem("adminEmail")) : null
}

const adminAuthSlice = createSlice({
    name:"adminEmail",
    initialState,
    reducers:{
        setAdminCredentials:(state,action)=>{
            state.adminEmail = action.payload;
            localStorage.setItem('adminEmail', JSON.stringify(action.payload))
        },
        setAdminToken:(state,action)=>{
            localStorage.setItem('token', action.payload)
            console.log(action.payload);
        },
        adminLogout: (state, action) => {
            state.adminEmail = null;
            localStorage.removeItem("adminEmail");
            localStorage.removeItem("token");
        }
    }
})

export const { setAdminCredentials, setAdminToken, adminLogout} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;