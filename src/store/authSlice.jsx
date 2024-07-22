import {createSlice} from "react-redux"

const initialState = {
    status : false,
    userData : null
}

export const authSlice = createSlice({
    name :"user",
    initialState : initialState,
    reducer : {
        login : (state, action)=> {
            state.status = true,
            state.userData = action.payload.userData
        },
        logout : (state, action) => {
            state.status = false,
            state.userData = null
        }
    }
})

export const {login, logout} = userSlice.actions;
export default authSlice.reducer