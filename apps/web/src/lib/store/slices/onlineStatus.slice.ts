import { IOnlineStatus } from "@/types/conversations/onlineStatus.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IOnlineStatus = {
    users: {}
}

const onlineStatusSlice = createSlice({
    name: "onlineStatus",
    initialState,
    reducers: {
        setUserOnline(state, action: PayloadAction<string>) {
          state.users[action.payload] = {
            isOnline: true,
            lastSeen: null,
          };
        },
        setUserOffline(state, action: PayloadAction<{ userId: string; lastSeen: Date }>) {
            state.users[action.payload.userId] = {
            isOnline: false,
            lastSeen: action.payload.lastSeen || new Date(),
            };
        },    
    }
})

export const { 
    setUserOnline, 
    setUserOffline 
} = onlineStatusSlice.actions;

export default onlineStatusSlice.reducer;