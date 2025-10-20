import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IMovieRedux, IUserRedux} from "@/redux/slices/type";

interface CounterState {
    user: IUserRedux | null,
    movie: IMovieRedux | null,
}

const initialState: CounterState = {
    user: null,
    movie: null
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserRedux | null>) => {
            state.user = action.payload;
        },
        setMovie: (state, action: PayloadAction<IMovieRedux | null>) => {
            state.movie = action.payload;
        },
    },
});

export const {setUser,setMovie} = counterSlice.actions;
export default counterSlice.reducer;
