import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createContactAPI, deleteContactAPI, getAllContactAPI, updateContactAPI } from "./contactApi";



// CREATE
export const createContact = createAsyncThunk(
  "contact/create",
  async (data, thunkAPI) => {
    try {
      return await createContactAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// GET
export const getAllContact = createAsyncThunk(
  "contact/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllContactAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// UPDATE
export const updateContact = createAsyncThunk(
  "contact/update",
  async ({ contactId, data }, thunkAPI) => {
    try {
      return await updateContactAPI(contactId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// DELETE
export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (contactId, thunkAPI) => {
    try {
      await deleteContactAPI(contactId);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  contacts: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,

  reducers: {
    clearContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contacts.unshift(action.payload.data);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET
      .addCase(getAllContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.data;
      })
      .addCase(getAllContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          (item) =>
            item.contactId === action.payload.data.contactId
        );

        if (index !== -1) {
          state.contacts[index] = action.payload.data;
        }
      })

      // DELETE
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (item) => item.contactId !== action.payload
        );
      });
  },
});

export const { clearContactState } = contactSlice.actions;

export default contactSlice.reducer;