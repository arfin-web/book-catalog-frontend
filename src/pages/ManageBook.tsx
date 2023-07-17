import { useState } from 'react';
import { useGetBooksQuery, useDeleteBookMutation } from '../redux/api/apiSlice';
import { Book } from '../types';
import { Link } from 'react-router-dom';

function ManageBooks() {
    const { data: books, isLoading, isError } = useGetBooksQuery()
    const [selectedBookId, setSelectedBookId] = useState('');
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

    const handleDeleteBook = async (bookId: Book['_id']) => {
        const confirmed = window.confirm('Are you sure you want to delete this book?');
        if (confirmed) {
            try {
                await deleteBook(bookId);
                console.log('Book deleted successfully');
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-neutral-content text-center mb-8">
                    Manage <span className="text-primary">Books</span>
                </h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
                    {books?.map((book) => (
                        <div className="card h-80 bg-neutral text-neutral-content" key={book._id}>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{book.title}</h2>
                                <p>{book.author}</p>
                                <p>{book.genre}</p>
                                <p>{book.publicationDate}</p>
                                <div className="card-actions flex flex-row justify-center mt-2">
                                    <Link to={`/book/${book._id}`} className="btn btn-outline btn-primary">
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleDeleteBook(book._id)}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ManageBooks;