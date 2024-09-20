import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import employeeLeaveDataSlice from './slices/employeeLeaveDataSlice';

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        employeeLeaveData: employeeLeaveDataSlice

    },
});

export default store;
