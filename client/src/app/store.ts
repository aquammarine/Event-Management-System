import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { eventsApi } from '../features/events/eventsApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [eventsApi.reducerPath]: eventsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(eventsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
