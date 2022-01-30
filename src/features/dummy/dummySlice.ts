import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchDummy } from './dummyAPI';

export interface IDummy {
    id: number;
    value: string;
}

export interface DummyState {
    data: IDummy[];
}

const initialState: DummyState = {
    data: []
};

export const fetchAsync = createAsyncThunk(
    'dummy/fetch',
    async () => {
        const response = await fetchDummy();
        // The value we return becomes the `fulfilled` action payload
        let data: IDummy[] = [];
        response.data.forEach((item: IDummy) => {
            data.push(item);
        });
        return data;
    }
);

export const dummySlice = createSlice({
    name: 'counter',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addDummy: (state, action: PayloadAction<IDummy>) => {
            state.data.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsync.pending, (state) => {
                state.data = [];
            })
            .addCase(fetchAsync.fulfilled, (state, action) => {
                state.data = action.payload
            });
    },
});

export const { addDummy } = dummySlice.actions;

export const selectDummy = (state: RootState) => state.dummy.data;

export default dummySlice.reducer;