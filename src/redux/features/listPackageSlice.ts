import {   createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { firestore } from '../../firebase/config'
import firebase from '../../firebase/config';

export interface ListPackage {
    id: string;
    key: number;
    codePackage: string;
    namePackage: string;
    startDate: firebase.firestore.Timestamp;
    endDate: firebase.firestore.Timestamp;
    priceTicket: number;
    priceCombo: number;
    status: boolean;
  }

interface PackageState {
    packages: ListPackage[];
    loading: boolean;
    error: string | null;
}

const initialState: PackageState = {
    packages: [],
    loading: false,
    error: null
}

export const fetchDataPackage = createAsyncThunk('firestore/package', async () => {
    const collection = firestore.collection('packages');
    const snapshot = await collection.get();
    const data: ListPackage[] = snapshot.docs.map((doc, index) => {
        const { id, ...rest } = doc.data();
        return { id: doc.id, key: index + 1, ...rest } as ListPackage;
    })
    return data;

})

const packageSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
      addPackage: (state, action: PayloadAction<ListPackage>) => {
        state.packages.push(action.payload);
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchDataPackage.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchDataPackage.fulfilled, (state, action: PayloadAction<ListPackage[]>) => {
          state.loading = false;
          state.packages = action.payload;
        })
        .addCase(fetchDataPackage.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message!;
        });
    }
  });
  
  export const { addPackage } = packageSlice.actions;
  
  export default packageSlice.reducer;