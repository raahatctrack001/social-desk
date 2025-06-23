import { IOnlineStatus } from "@/types/conversations/onlineStatus.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IOnlineStatus = {
    users: {}
}

const onlineStatusSlice = createSlice({
    name: "onlineStatus",
    initialState,
    reducers: {
        setUserOnline(state, action: PayloadAction<{userId: string, timestamp: Date}>) {
          state.users[action.payload.userId] = {
            isOnline: true,
            lastSeen: action.payload.timestamp || new Date(),
          };
          console.log(`user ${action.payload.userId} is now online`);
        },
        setUserOffline(state, action: PayloadAction<{ userId: string; timestamp: Date }>) {
            state.users[action.payload.userId] = {
            isOnline: false,
            lastSeen: action.payload.timestamp || new Date(),
            };
        },    
    }
})

export const { 
    setUserOnline, 
    setUserOffline 
} = onlineStatusSlice.actions;

export default onlineStatusSlice.reducer;