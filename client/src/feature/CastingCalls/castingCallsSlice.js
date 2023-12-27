import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    success: false,
    castingCalls: [],
    error: ''
}

export const getCastingCalls = createAsyncThunk('getCastingCall', async () => {
    const token = localStorage.getItem('directorToken');
    const res = await axios.get("http://localhost:4000/director/getcastingcalls", {
        headers: {
            'Authorization': token
        }
    })
    return res.data
})

export const deleteCastingCall = createAsyncThunk('deleteCastingCall', async (id) => {
    const token = localStorage.getItem('directorToken');
    return await axios.delete(`http://localhost:4000/director/deletecastingcall/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
})

export const editCastingCall = createAsyncThunk('editCastingCall', async ({ id, editedCastingCall }) => {
    return await axios.put(`http://localhost:4000/director/editcastingcall/${id}`, editedCastingCall, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('directorToken')
        }
    })
})

export const actorDetailedCastingCall = createAsyncThunk('viewDetails', async (id) => {
    const { data } = await axios.get(`http://localhost:4000/actor/viewdetailedcastingcall/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'ActorAuthorization': localStorage.getItem('actorToken')
        }
    });
    return data
})

const castingCallsSlice = createSlice({
    name: 'castingCall',
    initialState,
    extraReducers: builder => {
        builder.addCase(deleteCastingCall.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteCastingCall.fulfilled, (state) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(deleteCastingCall.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.error.message
        })

        builder.addCase(getCastingCalls.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCastingCalls.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.castingCalls = action.payload
        })
        builder.addCase(getCastingCalls.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.error.message
        })

        builder.addCase(editCastingCall.pending, (state) => {
            state.loading = true
        })
        builder.addCase(editCastingCall.fulfilled, (state) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(editCastingCall.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.error.message
        })

        builder.addCase(actorDetailedCastingCall.pending, (state) => {
            state.loading = true
        })
        builder.addCase(actorDetailedCastingCall.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.castingCalls = action.payload
        })
        builder.addCase(actorDetailedCastingCall.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.error.message
        })
    }
})

export default castingCallsSlice.reducer