import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../firebase/config";


export interface ReconciliationTicket {
    id: string;
    key: number;
    numberTicket: string;
    nameTicket: string;
    dateUsage: string;
    checkinGate: string;
}

interface ReconciliationState {
    tickets: ReconciliationTicket[]
}

const initialState: ReconciliationState = {
    tickets: []
}

export const fetchDataReconciliation = createAsyncThunk('firestore/reconciliation', async () => {
    const collection = firestore.collection("reconciliation_ticket");
    const snapshot = collection.get();
    const data: ReconciliationTicket[] = (await snapshot).docs.map((doc, idx) => {
        const { id, ...rest } = doc.data();
        return { id: doc.id, key: idx + 1, ...rest } as ReconciliationTicket
    })
    return data
})

const reconciliationSlice = createSlice({
    name: 'reconciliations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataReconciliation.fulfilled, (state, action: PayloadAction<ReconciliationTicket[]>) => {
            state.tickets = action.payload
        })
    }
})

export default reconciliationSlice.reducer