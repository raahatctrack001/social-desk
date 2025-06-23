export interface IOnlineStatus{
    users: Record<string, {
        isOnline: boolean,
        lastSeen: Date|null,
    }>
}