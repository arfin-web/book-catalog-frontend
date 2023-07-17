import Loading from '../components/Loading';
import { useGetBooksQuery } from '../redux/api/apiSlice';
import { Link, NavLink } from 'react-router-dom';

const Home = () => {
    const { data: books, isLoading, isError } = useGetBooksQuery();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    if (!books || books.length === 0) {
        return <div>No books found</div>;
    }

    const sortedBooks = [...books].sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());

    const top10Books = sortedBooks.slice(0, 10);

    return (
        <>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://img.freepik.com/free-psd/decorative-objects-old-books-vases-black-wall-japanese-style_176382-57.jpg?w=1060&t=st=1689420685~exp=1689421285~hmac=e5c3650dc708a107151f3b1afa59efb8bdbae76165e26bbed7541398da4e655b)' }}>
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Book <span className="text-primary-focus">Verse: Buzzing</span> with Literary <span className="text-primary-focus">Treasures</span></h1>
                        <p className="mb-5">Dive into a World of Literary Delights! Explore, Organize, and Share Your Favorite Books Effortlessly.</p>
                        <NavLink to="/books" className="btn btn-active btn-primary text-neutral-content font-bold">Get Started</NavLink>
                    </div>
                </div>
            </div>

            <div className='container mx-auto p-4 mb-8'>
                <h1 className='text-3xl font-bold text-neutral-content text-center my-8'>Top <span className='text-primary'>Books</span></h1>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center'>
                    {top10Books.map((book) => (
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
    )
}

export default Home