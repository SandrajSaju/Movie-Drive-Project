import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    actorEmail:localStorage.getItem("actorEmail") && localStorage.getItem("actorEmail") !== "undefined" ? JSON.parse(localStorage.getItem("actorEmail")) : null
};

const googleVerificationSlice = createSlice({
    name:'googleVerificationSlice',
    initialState,
    reducers:{
        setActorEmail:(state,action)=>{
            state.actorEmail = action.payload;
            localStorage.setItem("actorEmail",JSON.stringify(action.payload))
        },
        clearActorEmail:(state,action)=>{
            state.actorEmail = null;
            localStorage.removeItem("actorEmail")
        }
    }
});

export const {setActorEmail,clearActorEmail} = googleVerificationSlice.actions;

export default googleVerificationSlice.reducer;