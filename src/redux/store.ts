import {configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ticketSlice from './features/ticketSlice';

import packageSlice from './features/listPackageSlice'
import reconciliation_ticketSlice from './reconciliation_ticketSlice';
import eventSlice from './features/eventSlice';


const store = configureStore({
    reducer: {
        tickets: ticketSlice,
        packages: packageSlice,
        reconciliation: reconciliation_ticketSlice,
        events: eventSlice
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch : () => AppDispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector

export default store