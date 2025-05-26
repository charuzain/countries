import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { AppDispatch, RootState } from '../app/store';

type Status = 'idle' | 'loading' | 'error';
type Country = {
  name: string;
  population: number;
};

export interface CountryState {
  data: Country[];
  status: Status;
}

const initialState: CountryState = {
  data: [],
  status: 'idle',
};

// const countrySlice = createSlice({
//   name: 'country',
//   initialState,
//   reducers: {
//     setCountry(state, action) {
//       state.data = action.payload;
//     },
//     setStatus(state, action: PayloadAction<Status>) {
//       state.status = action.payload;
//     },
//   },
// });

// THUNKS

// export const fetchCountries = () => {
//   return async function countryThunk(
//     dispatch: AppDispatch,
//     getState:() => RootState
//   ) {
//     dispatch(setStatus('loading'));
//     try {
//       const res = await fetch('https://restcountries.com/v3.1/all');
//       const data = await res.json();
//       dispatch(setCountry(data));
//       dispatch(setStatus('idle'));
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus('error'));
//     }
//   };
// };

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    // setCountry(state, action) {
    //   state.data = action.payload;
    // },
    // setStatus(state, action: PayloadAction<Status>) {
    //   state.status = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.status = 'error';
      });
  },
});

//second way using createasyncthunk method for better error handling ,  first parameter is identifier , second is async function.

export const fetchCountries = createAsyncThunk<Country[]>(
  'country/fetch',
  async () => {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    return data;
  }
);

// export const { setCountry, setStatus } = countrySlice.actions;
export default countrySlice.reducer;
