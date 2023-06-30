import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {firestore} from '../firebase/config'

export interface Ticket {
    id: string;
    key: number;
    bookingCode: string;
    numberTicket: number;
    usageStatus: string;
    dateUsage: string;
    dateIssue: string;
    checkinGate: string;
}

interface TicketState {
    tickets: Ticket[],
    loading: boolean;
    error: string | null;
}

const initialState: TicketState = {
    tickets: [],
    loading: false,
    error: null
}

export const fetchTicketData = createAsyncThunk('firestore/fetchData', async () => {
    const collectionRef = firestore.collection('manage_ticket');
    const snapshot = await collectionRef.get();
    const data: Ticket[] = snapshot.docs.map((doc, index) => {
      const { id, ...rest } = doc.data();
      return { id: doc.id, key: index + 1, ...rest } as Ticket;
    });
    return data;
  });

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTicketData.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchTicketData.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
            state.loading = false;
            state.tickets = action.payload;
        })
        .addCase(fetchTicketData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        })
    }

})

// export const {selectTicket} = ticketSlice.actions;
 
export default ticketSlice.reducer