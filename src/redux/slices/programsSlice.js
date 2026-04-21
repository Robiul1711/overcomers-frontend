import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskResults: []
};

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    updateTaskResult: (state, action) => {
      const { programTitle, tasks } = action.payload;
      const existingProgramIndex = state.taskResults.findIndex(p => p.programTitle === programTitle);
      
      if (existingProgramIndex >= 0) {
        state.taskResults[existingProgramIndex].tasks = tasks;
      } else {
        state.taskResults.push({ programTitle, tasks });
      }
    }
  }
});

export const { updateTaskResult } = programsSlice.actions;
export default programsSlice.reducer;
