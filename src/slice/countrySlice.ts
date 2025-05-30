import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Status = 'idle' | 'loading' | 'error';
export type Country = {
  name: string;
  population: number;
  region: string;
  capital: string[];
  flag: string;
  cca3: string;
};

type Currency = {
  symbol: string;
  name: string;
};

type Currencies = {
  [code: string]: Currency;
};

export type Native = {
  official: string;
  common: string;
};

export type NativeName = {
  [languageCode: string]: Native;
};

export type CountryDetail = {
  name: { common: string; nativeName: NativeName };
  flags: { png: string };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flag: string;
  tld: string;
  languages: Record<string, string>;
  borders: string[];
  currencies: Currencies;
};

export interface CountryState {
  data: Country[];
  status: Status;
  filteredData: Country[];
  selectedCountry?: CountryDetail[] | null;
  error: string | null;
}

const initialState: CountryState = {
  data: [],
  status: 'idle',
  filteredData: [],
  selectedCountry: null,
  error: null,
};

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
    searchCountries: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      console.log(searchTerm);

      state.filteredData = state.data.filter((country) =>
        country.name.toLowerCase().startsWith(searchTerm)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
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
        state.error = null;
      })
      .addCase(fetchCountryByName.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedCountry = action.payload;
        state.error = null;
      })
      .addCase(fetchCountryByName.rejected, (state, action) => {
        state.status = 'error';
        state.selectedCountry = null;
        state.error = action.payload as string;
      });
  },
});

export const fetchCountries = createAsyncThunk<Country[]>(
  'country/fetch',
  async () => {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    // console.log(data);
    const countryData: Country[] = data.map(
      (country: any): Country => ({
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flag: country.flags.png,
        cca3: country.cca3,
      })
    );
    return countryData;
  }
);

export const fetchCountryByName = createAsyncThunk(
  'countryByName',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );
      if (!response.ok) {
        return rejectWithValue(`Country "${name}" not found`);
        // this tells Redux Toolkit to dispatch the rejected action with error message as the payload.
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Something went wrong');
    }
  }
);

export const { filterCountries, searchCountries } = countrySlice.actions;
export default countrySlice.reducer;
