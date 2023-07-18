import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types';

type WishlistState = {
    books: Book[];
};

const initialState: WishlistState = {
    books: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<Book>) => {
            state.books.push(action.payload);
        },
        removeBook: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter((book) => book._id !== action.payload);
        },
    },
});

export const { addBook, removeBook } = wishlistSlice.actions;
export default wishlistSlice.reducer;