
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedin: false,
        authUser: null
    },
    reducers: {
        setIsLoggedin: (state, action) => {
            state.isLoggedin = action.payload
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        }
    }
})

export const { setAuthUser, setIsLoggedin } = userSlice.actions
export default userSlice.reducer
