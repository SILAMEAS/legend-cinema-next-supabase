import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import {user} from "@/redux/services/user/user";
import {banner} from "@/redux/services/banner/banner";
import {movie} from "@/redux/services/movie/movie";
import {cinema} from "@/redux/services/cinema/cinema";
import {offer} from "@/redux/services/offer/offer";
import {category} from "@/redux/services/category/category";
import {promotion} from "@/redux/services/promotion/promotion";
import {dashboard} from "@/redux/services/dashboard/dashboard";
import {food_and_beverage} from "@/redux/services/food_and_beverage/food_and_beverage";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [user.reducerPath]: user.reducer,
        [banner.reducerPath]: banner.reducer,
        [movie.reducerPath]: movie.reducer,
        [cinema.reducerPath]: cinema.reducer,
        [category.reducerPath]: category.reducer,
        [offer.reducerPath]: offer.reducer,
        [dashboard.reducerPath]: dashboard.reducer,
        [promotion.reducerPath]: promotion.reducer,
        [food_and_beverage.reducerPath]: food_and_beverage.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            user.middleware,
            banner.middleware,
            movie.middleware,
            offer.middleware,
            category.middleware,
            cinema.middleware,
            dashboard.middleware,
            promotion.middleware,
            food_and_beverage.middleware
        ),
});

// ✅ Typed hooks and types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
