import {createSlice} from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{'refresh':""},
    reducers:{
        addToken(state,action){
            state.refresh=action.payload
        },
    }
});
console.log(userSlice.actions)

export default userSlice.reducer;
export const {addToken} =userSlice.actions;