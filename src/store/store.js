import {configurestore} from "react-redux"
import authSlice from "./authSlice"

const store = configurestore({
    reducer : {
        auth : authSlice
    }
})

export default store;