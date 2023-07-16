import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Book = {
    _id: string;
    title: string;
    author: string;
    authorEmail: string,
    genre: string;
    publicationDate: string;
    reviews: string[];
};

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
    }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = api;