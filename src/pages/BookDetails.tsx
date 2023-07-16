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
                    <figure><img className='w-80' src="https://img.freepik.com/free-psd/hard-cover-book-mockup-scene_358694-4813.jpg?w=996&t=st=1689526401~exp=1689527001~hmac=1f88be36af0c19a2acb15aea7acdd1fd92266378b35aa005ba3ca29974cefa54" alt="Album" /></figure>
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