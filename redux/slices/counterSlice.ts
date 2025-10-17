import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUserResponse} from "@/redux/services/user/type";

interface CounterState {
    user:IUserResponse|null
}

const initialState: CounterState = {
    user:null
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserResponse|null>) => {
            state.user= action.payload;
        },
    },
});

export const { setUser} = counterSlice.actions;
export default counterSlice.reducer;
