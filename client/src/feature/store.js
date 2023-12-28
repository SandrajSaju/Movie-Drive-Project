import { configureStore } from "@reduxjs/toolkit";
import actorAuthSlice from "./Actor/actorAuthSlice";
import directorAuthSlice from "./Director/directorAuthSlice";
import castingCallsSlice from "./CastingCalls/castingCallsSlice";
import actorOtpSlice from "./Actor/actorOtpSlice";
import adminAuthSlice from "./Admin/adminAuthSlice";
import actorApplicationsSlice from "./Applications/actorApplicationsSlice";
import directorOtpSlice from "./Director/directorOtpSlice";

const store = configureStore({
    reducer:{
        actorAuth:actorAuthSlice,
        directorAuth:directorAuthSlice,
        adminAuth:adminAuthSlice,
        castingCalls:castingCallsSlice,
        actorOtp:actorOtpSlice,
        actorApplications:actorApplicationsSlice,
        directorOtp:directorOtpSlice
    }
})

export default store;