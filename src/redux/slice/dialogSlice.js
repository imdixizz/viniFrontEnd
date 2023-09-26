import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  dialogue: false,
  dialogueType: "",
  dialogueData: null,
  alertBox: false,
  isLoading: false,
};


const dialogSlice = createSlice({
  name: "dialogSlice",
  initialState,
  reducers: {
    setDialogInitialState: (state, action) => {
      return { ...state, ...action.payload };
    },
    openDialog(state, action) {
      console.log("action", action);

      state.dialogue = true;
      state.dialogueType = action.payload.type || "";
      state.dialogueData = action.payload.data || null;
    },
    closeDialog(state, action) {
      state.dialogue = false;
      state.dialogueType = "";
      state.dialogueData = null;
    },
    openAlert(state, action) {
      state.alertBox = true
    },
    closeAlert(state, action) {
      state.alertBox = false
    },
    loaderOn(state, action) {
      state.isLoading = true
    },
    loaderOff(state, action) {
      state.isLoading = false
    }
  },
});
export default dialogSlice.reducer; 
export const { openDialog, closeDialog, openAlert, closeAlert, loaderOn, loaderOff,setDialogInitialState } = dialogSlice.actions


