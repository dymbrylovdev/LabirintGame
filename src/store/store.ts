import { configureStore } from '@reduxjs/toolkit';
import cubesReducer from "./reducers/cubeSlice";
import navigateReducer from "./reducers/navigateSLice";

export const store = configureStore({
    reducer: {
        cubes: cubesReducer,
        navigate: navigateReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;