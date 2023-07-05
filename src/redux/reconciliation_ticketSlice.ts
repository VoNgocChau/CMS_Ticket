import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../firebase/config";


export interface ReconciliationTicket {
    id: string;
    key: number;
    numberTicket: string;
    nameTicket: string;
    dateUsage: string;
    checkinGate: string;
    status: string;
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

export const updateReconciliationData = createAsyncThunk(
    "reconciliation/updateData",
    async (updatedTickets: ReconciliationTicket[]) => {
      // Gửi yêu cầu cập nhật dữ liệu trong Firestore hoặc API của bạn
      // Ví dụ:
      for (const ticket of updatedTickets) {
        const { id, ...data } = ticket;
        await firestore.collection("reconciliation_ticket").doc(id).update(data);
      }
    }
  );

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