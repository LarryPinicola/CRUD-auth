import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  contacts: [],
  searchTerms: "",
};

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    addContacts: (state, { payload }) => {
      state.contacts = payload;
    },
    setSearchTerms: (state, { payload }) => {
      state.searchTerms = payload;
    },
  },
});

export const { addContacts, setSearchTerms } = contactSlice.actions;
export default contactSlice.reducer;
