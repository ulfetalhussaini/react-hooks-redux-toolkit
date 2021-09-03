import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// async actions
export const fetchCats = createAsyncThunk("cats/fetchCats", async () => {
  const request = await fetch(
    "https://learn-co-curriculum.github.io/cat-api/cats.json"
  );

  const data = await request.json();

  return data.images;
});

// Reducer
const initialState = {
  entities: [], // array of cats
  status: "idle", // loading state
};

const catsSlice = createSlice({
  initialState: initialState,
  name: "cats",
  reducers: {
    catAdded(state, action) {
      state.entities.push(action.payload);
    },

    catRemoved(state, action) {
      state.entities = state.entities.filter(
        (cat) => cat.id !== action.payload
      );
    },

    catUpdated(state, action) {
      const cat = state.entities.find((cat) => cat.id === action.payload.id);
      cat.url = action.payload.url;
    },
  },
  extraReducers: {
    [fetchCats.pending](state) {
      state.status = "loading";
    },

    [fetchCats.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { catUpdated, catRemoved, catAdded } = catsSlice.actions;

export default catsSlice.reducer;