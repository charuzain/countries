import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { AppDispatch, RootState } from '../app/store';

type Status = 'idle' | 'loading' | 'error';
type Country = {
  name: string;
  population: number;
  region: string;
  capital: string[];
  flag: string;
};

export interface CountryState {
  data: Country[];
  status: Status;
  filteredData: Country[];
  selectedCountry?: Country | null;
}

const initialState: CountryState = {
  data: [],
  status: 'idle',
  filteredData: [],
  selectedCountry: null,
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
    filterCountries: (state, action: PayloadAction<string>) => {
      const filter = action.payload.toLowerCase();

      if (filter === 'all') {
        state.filteredData = state.data;
      } else {
        state.filteredData = state.data.filter(
          (country) => country.region.toLowerCase() === filter
        );
      }
    },
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
      .addCase(
        fetchCountries.fulfilled,
        (state, action: PayloadAction<Country[]>) => {
          state.data = action.payload;
          state.filteredData = action.payload;
          state.status = 'idle';
        }
      )
      .addCase(fetchCountries.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchCountryByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountryByName.fulfilled, (state, action) => {
        state.selectedCountry = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchCountryByName.rejected, (state) => {
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
    const countryData: Country[] = data.map(
      (country: any): Country => ({
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flag: country.flags.png,
      })
    );
    return countryData;
  }
);

export const fetchCountryByName = createAsyncThunk(
  'countryByName',
  async (name:string) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = response.json();

    console.log(data);
    return data;
  }
);

export const { filterCountries } = countrySlice.actions;
export default countrySlice.reducer;
