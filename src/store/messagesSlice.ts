import { createSlice } from "@reduxjs/toolkit";

export interface messagesState {
    postId: number,
    friendId: number,
}

const initialState: messagesState = {
    postId: 0,
    friendId: 0,
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setPostId: (state, action) => {
            state.postId = action.payload
        },
        setFriendId: (state, action) => {
            state.friendId = action.payload
        }
    }
})

export const { setPostId, setFriendId} = messagesSlice.actions

export default messagesSlice.reducer