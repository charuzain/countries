import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../slice/countrySlice';
import themeReducer from '../slice/themeSlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
