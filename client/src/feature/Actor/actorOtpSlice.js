import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    otpInfo:localStorage.getItem("otpInfo") && localStorage.getItem("otpInfo") !== "undefined" ? JSON.parse(localStorage.getItem("otpInfo")) : null
};

const actorOtpSlice = createSlice({
    name:'otpSlice',
    initialState,
    reducers:{
        setActorOtpCredentials:(state,action)=>{
            state.otpInfo = action.payload;
            localStorage.setItem("otpInfo",JSON.stringify(action.payload))
        },
        clearActorOtpCredentials:(state,action)=>{
            state.otpInfo = null;
            localStorage.removeItem("otpInfo")
        }
    }
});

export const {setActorOtpCredentials,clearActorOtpCredentials} = actorOtpSlice.actions;

export default actorOtpSlice.reducer;