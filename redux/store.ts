import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import {user} from "@/redux/services/user/user";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [user.reducerPath]: user.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(user.middleware),
});

// ✅ Typed hooks and types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
