import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { firestore } from '../../firebase/config'


export interface ListPackage {
  id: string;
  key?: number;
  packageCode: string;
  packageName: string;
  dateStart: string | null
  dateEnd: string | null;
  timeStart: string,
  timeEnd: string,
  priceTicket: number;
  priceCombo: number;
  numCombo: number;
  status: boolean;
}


interface PackageState {
  packages: ListPackage[];
  loading: boolean;
  error: string | null;
  selectedPackage: string | null;
}

const initialState: PackageState = {
  packages: [],
  loading: false,
  error: null,
  selectedPackage: null,
}


// Fetch data packages
export const fetchDataPackage = createAsyncThunk('firestore/package', async () => {
  const collection = firestore.collection('packages');
  const snapshot = await collection.get();
  const data: ListPackage[] = snapshot.docs.map((doc, index) => {
    const { id, ...rest } = doc.data();
    return { id: doc.id,key: index + 1, ...rest } as ListPackage;
  })
  return data;

})

// Add list package 
export const addPackage = createAsyncThunk('firestore/add', async (packages: Omit<ListPackage, 'id'>) => {
  const collection = await firestore.collection('packages').add(packages);
  const newPackage: ListPackage = { id: collection.id, ...packages };
  return newPackage;
})

export const editPackage = createAsyncThunk('firestore/edit', async(packages: ListPackage) => {
  const {id, ...data} = packages;
  const collection = await firestore.collection('packages').doc(id).update(data);
  return packages;
})




const packageSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    selectPackages: (state, action: PayloadAction<string>) => {
      state.selectedPackage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataPackage.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchDataPackage.fulfilled, (state, action: PayloadAction<ListPackage[]>) => {
      state.loading = false;
      state.error = null;
      state.packages = action.payload;
    }).addCase(fetchDataPackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error occurred while fetching data';
    }).addCase(addPackage.fulfilled, (state, action: PayloadAction<ListPackage>) => {
      state.loading = false;
      state.error = null;
      state.packages.push(action.payload);
    }).addCase(editPackage.fulfilled, (state, action: PayloadAction<ListPackage>) => {
      const updatePackages = action.payload;
      const idx = state.packages.findIndex((packages) => packages.id === updatePackages.id);
      if(idx !== -1) {
        state.packages[idx] = updatePackages;
      }
    })
  },
});

export const {selectPackages} = packageSlice.actions
export default packageSlice.reducer;
