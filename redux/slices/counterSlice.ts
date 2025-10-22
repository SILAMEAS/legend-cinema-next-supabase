import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICinemaRedux, IMovieRedux, IUserRedux} from "@/redux/slices/type";

interface CounterState {
    user: IUserRedux | null,
    movie: IMovieRedux | null,
    cinema:ICinemaRedux|null
}

const initialState: CounterState = {
    user: null,
    movie: null,
    cinema:null
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
        setCinema: (state, action: PayloadAction<ICinemaRedux | null>) => {
            state.cinema = action.payload;
        },
    },
});

export const {setUser,setMovie,setCinema} = counterSlice.actions;
export default counterSlice.reducer;
