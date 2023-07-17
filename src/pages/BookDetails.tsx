import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetBookByIdQuery, useEditBookMutation } from '../redux/api/apiSlice';
import Loading from '../components/Loading';
import { useAuth0 } from "@auth0/auth0-react";

type EditBookFormData = {
    title: string;
    author: string;
    authorEmail: string;
    genre: string;
    publicationDate: string;
    reviews: string[];
};

function BookDetails() {
    const { id } = useParams<{ id?: string }>();

    // Check if the book ID is defined and not equal to 'undefined'
    const bookId = id !== undefined && id !== 'undefined' ? id : '';

    const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<EditBookFormData>();
    const [editBook, { isLoading: isEditing }] = useEditBookMutation();
    const { isAuthenticated } = useAuth0();

    const onSubmit = async (data: EditBookFormData) => {
        try {
            await editBook({ id: id || '', book: data });
            console.log('Book updated successfully');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error occurred while fetching book data</div>;
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    // Populate the form fields with the book data
    setValue('title', book.title);
    setValue('author', book.author);
    setValue('authorEmail', book.authorEmail);
    setValue('genre', book.genre);
    setValue('publicationDate', book.publicationDate);
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
            {
                isAuthenticated && <>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-80 lg:w-96 mx-auto mt-6'>
                        <div className='hidden'>
                            <input type="text" id="title" {...register('title', { required: true })} placeholder="Title" className="input input-bordered input-primary w-full mb-4" />
                            {errors.title && <span>Title is required</span>}
                        </div>
                        <div className='hidden'>
                            <input type="text" id="author" {...register('author', { required: true })} placeholder="Author" className="input input-bordered input-primary w-full mb-4" />
                            {errors.author && <span>Author is required</span>}
                        </div>
                        <div className='hidden'>
                            <input type="text" id="authorEmail" {...register('authorEmail', { required: true })} placeholder="Author Email" className="input input-bordered input-primary w-full mb-4" />
                            {errors.authorEmail && <span>Author Email is required</span>}
                        </div>
                        <div className='hidden'>
                            <input type="text" id="genre" {...register('genre', { required: true })} placeholder="Genre" className="input input-bordered input-primary w-full mb-4" />
                            {errors.genre && <span>Genre is required</span>}
                        </div>
                        <div className='hidden'>
                            <input type="text" id="publicationDate" {...register('publicationDate', { required: true })} placeholder="Publication Date" className="input input-bordered input-primary w-full mb-4" />
                            {errors.publicationDate && <span>Publication Date is required</span>}
                        </div>
                        <div>
                            <input type="text" id="reviews" {...register('reviews')} placeholder="Give Your Review" className="input input-bordered input-primary w-full mb-4" />
                        </div>
                        <button type="submit" disabled={isEditing} className='btn btn-outline btn-primary'>
                            {isEditing ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </>
            }
            <div className='px-4 lg:px-48'>
                <p className='text-2xl text-primary font-bold mt-4'>Reviews: </p>
                <p className='mt-4 text-xl font-semibold'>{book?.reviews}</p>
            </div>
        </div>
    );
}

export default BookDetails;