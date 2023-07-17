import { useState } from 'react';
import { useGetBooksQuery } from '../redux/api/apiSlice';
import { Link } from 'react-router-dom';

function Books() {
    const { data: books, isLoading, isError } = useGetBooksQuery();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    const searchedBooks = searchQuery
        ? books?.filter(
            (book) =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.genre.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : books;


    const filteredBooks =
        selectedGenre || selectedYear
            ? searchedBooks?.filter((book) => {
                const isGenreMatch = selectedGenre
                    ? book.genre.toLowerCase() === selectedGenre.toLowerCase()
                    : true;
                const isYearMatch = selectedYear ? book.publicationDate.includes(selectedYear) : true;

                return isGenreMatch && isYearMatch;
            })
            : searchedBooks;

    const genres = Array.from(new Set(books?.map((book) => book.genre)));

    const years = Array.from(new Set(books?.map((book) => book.publicationDate.substring(0, 4)))).sort();

    return (
        <>
            <div className='container mx-auto p-4'>
                <h1 className='text-3xl font-bold text-neutral-content text-center mb-8'>All <span className='text-primary'>Books</span></h1>
                <div className="form-control text-center px-6 lg:px-60 mb-8">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="input input-bordered w-24 md:w-auto"
                    />
                </div>
                <div className='mb-3'>
                    <select
                        id="genre"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="select select-primary w-full max-w-xs"
                    >
                        <option value="">All Genres</option>
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-8'>
                    <select
                        id="year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="select select-primary w-full max-w-xs"
                    >
                        <option value="">All Years</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center mb-6'>
                    {filteredBooks?.map((book) => (
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