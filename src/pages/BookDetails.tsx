import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '../redux/api/apiSlice';

function BookDetails() {
    const { id } = useParams<{ id?: string }>();

    // Check if the book ID is defined and not equal to 'undefined'
    const bookId = id !== undefined && id !== 'undefined' ? id : '';

    const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching book data</div>;
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div className='container mx-auto p-4 my-5'>
            <div className='grid grid-cols-1 place-items-center'>
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure><img className='w-80' src="https://img.freepik.com/free-photo/flowery-book-separator_52683-100675.jpg?w=996&t=st=1689513295~exp=1689513895~hmac=6e7b404d1c686e039bbed45d0f21016f9ccf66b9990136aef2805800a0e4676a" alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-primary">{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <p>Publication Date: {book.publicationDate}</p>
                    </div>
                </div>
            </div>
            <p className='text-center text-lg font-semibold mt-4'>Reviews: {book.reviews.join(', ')}</p>
        </div>
    );
}

export default BookDetails;