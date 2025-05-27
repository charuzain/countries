import { createSlice } from '@reduxjs/toolkit';
// import { PayloadAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Theme = 'dark' | 'light';
const selectedTheme = localStorage.getItem('theme') || null;

const validTheme = selectedTheme === 'dark' || selectedTheme === 'light';

export interface ThemeState {
  mode: Theme;
}

const initialState: ThemeState = {
  mode: validTheme ? (selectedTheme as Theme) : 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
