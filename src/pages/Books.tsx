import { Link } from 'react-router-dom';
import { useGetBooksQuery } from '../redux/api/apiSlice';

function Books() {
    const { data: books, isLoading, isError } = useGetBooksQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    if (!books || books.length === 0) {
        return <div>No books found</div>;
    }

    return (
        <>
            <div className='container mx-auto p-4'>
                <h1 className='text-3xl font-bold text-neutral-content text-center mb-8'>All <span className='text-primary'>Books</span></h1>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center'>
                    {books.map((book) => (
                        <>
                            <div className="card h-80 bg-neutral text-neutral-content" key={book._id}>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{book.title}</h2>
                                    <p>{book.author}</p>
                                    <p>{book.genre}</p>
                                    <p>{book.publicationDate}</p>
                                    <div className="card-actions flex flex-row justify-center mt-2">
                                        <button className="btn btn-primary">Add To Wishlist</button>
                                        <Link to={`/books/${book._id}`} className="btn btn-outline btn-primary">
                                            More Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Books
