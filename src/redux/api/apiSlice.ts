import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book } from '../../types';

type BooksResponse = Book[];

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://book-catalog-backend.onrender.com' }),
    endpoints: (builder) => ({
        getBooks: builder.query<BooksResponse, void>({
            query: () => '/books',
        }),
        getBookById: builder.query<Book, Book['_id']>({
            query: (id) => `/books/${id}`,
        }),
        addBook: builder.mutation<Book, Partial<Book>>({
            query: (book) => ({
                url: '/books',
                method: 'POST',
                body: book,
            }),
        }),
        editBook: builder.mutation<Book, { id: string; book: Partial<Book> }>({
            query: ({ id, book }) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body: book,
            }),
        }),
        deleteBook: builder.mutation<void, Book['_id']>({
            query: (bookId) => ({
                url: `/books/${bookId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useAddBookMutation, useEditBookMutation, useDeleteBookMutation } = api;