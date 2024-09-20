import { createSlice } from '@reduxjs/toolkit';

const employeeLeaveDataSlice = createSlice({
    name: 'employeeLeaveData',
    initialState: {
        empData: []
    },
    reducers: {
        receiveData: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.empData.push(...action.payload);
            } else {
                state.empData.push(action.payload);
            }
        }
    }
});

export const { receiveData } = employeeLeaveDataSlice.actions;
export default employeeLeaveDataSlice.reducer;
