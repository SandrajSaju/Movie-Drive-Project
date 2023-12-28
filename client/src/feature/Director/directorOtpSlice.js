import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    directorOtpInfo:localStorage.getItem("directorOtpInfo") && localStorage.getItem("directorOtpInfo") !== "undefined" ? JSON.parse(localStorage.getItem("directorOtpInfo")) : null
};

const directorOtpSlice = createSlice({
    name:'directorOtpSlice',
    initialState,
    reducers:{
        setDrectorOtpCredentials:(state,action)=>{
            state.directorOtpInfo = action.payload;
            localStorage.setItem("directorOtpInfo",JSON.stringify(action.payload))
        },
        clearDirectorOtpCredentials:(state,action)=>{
            state.directorOtpInfo = null;
            localStorage.removeItem("directorOtpInfo")
        }
    }
});

export const {setDrectorOtpCredentials,clearDirectorOtpCredentials} = directorOtpSlice.actions;

export default directorOtpSlice.reducer;