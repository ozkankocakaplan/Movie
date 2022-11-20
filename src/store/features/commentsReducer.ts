import { createSlice } from "@reduxjs/toolkit"
import { Comments, Like } from "../../types/Entites";

export const INITIAL_STATE = {
    comments: [] as Array<Comments>,
    commentLikes: [] as Array<Like>,
}
export const commentSlice = createSlice({
    name: 'commentSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        setComment: (state, action) => {
            state.comments = [state.comments, action.payload];
        },
        setCommentLikes: (state, action) => {
            state.commentLikes = action.payload;
        },
        setCommentLike: (state, action) => {
            state.commentLikes = [...state.commentLikes, action.payload];
        }
    }
});
export const commentReducer = commentSlice.reducer;
export const {
    setComments,
    setComment,
    setCommentLikes,
    setCommentLike
} = commentSlice.actions;