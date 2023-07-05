import {   createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firestore } from '../../firebase/config';

export interface Event {
    id: string;
    key: number;
    bookingCode: string;
    numberTicket: string;
    usageStatus: string;
    dateUsage: string;
    dateIssue: string;
    checkinGate: string;
    eventName: string;
}

interface EventState {
    events: Event[],
}

const initialState: EventState = {
    events: [],
}

export const fetchDataEvent = createAsyncThunk('firestore/event', async () => {
    const collection = firestore.collection('manage_ticket_event');
    const snapshot = collection.get();
    const data:Event[] = (await snapshot).docs.map((doc, idx) => {
        const {id, ...rest} = doc.data();
        return {id: doc.id, key: idx + 1, ...rest} as Event;
    })
    return data;
})

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataEvent.fulfilled, (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload
        })
    }
})

export default eventSlice.reducer