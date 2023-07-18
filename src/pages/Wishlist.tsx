import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeBook } from '../redux/features/wishlistSlice';

function Wishlist() {
    const wishlist = useAppSelector((state) => state.wishlist.books);
    const dispatch = useAppDispatch();

    const handleRemoveBook = (bookId: string) => {
        dispatch(removeBook(bookId));
    };


    return (
        <div className="container mx-auto p-4 mb-6">
            <h1 className="text-3xl font-bold text-neutral-content text-center mb-8">
                My <span className='text-primary'>Wishlist</span>
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
                {wishlist.length === 0 ? (
                    <div>No books in the wishlist</div>
                ) : (
                    wishlist.map((book) => (
                        <div className="card h-80 bg-neutral text-neutral-content" key={book._id}>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{book.title}</h2>
                                <p>{book.author}</p>
                                <p>{book.genre}</p>
                                <p>{book.publicationDate}</p>
                                <div className="card-actions flex flex-row justify-center mt-2">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleRemoveBook(book._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Wishlist;