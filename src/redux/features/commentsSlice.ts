import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IComment } from '../../models/comment.model';

const initialState: { comments: IComment[] } = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    setComment: (state, action: PayloadAction<IComment>) => {
      state.comments = state.comments.map(
        (comment: IComment) => (
          comment.id === action.payload.id ? action.payload
            : comment
        ),
      );
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comment: IComment) => (
          comment.id !== action.payload
        ),
      );
    },
  },
});

export const { setComments, setComment, deleteComment } = commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;
