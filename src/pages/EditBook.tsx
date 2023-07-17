import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetBookByIdQuery, useEditBookMutation } from '../redux/api/apiSlice';
import Loading from '../components/Loading';

type EditBookFormData = {
    title: string;
    author: string;
    authorEmail: string;
    genre: string;
    publicationDate: string;
    reviews: string[];
};

function EditBook() {
    const { id } = useParams<{ id?: string }>();
    // Check if the book ID is defined and not equal to 'undefined'
    const bookId = id !== undefined && id !== 'undefined' ? id : '';

    const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<EditBookFormData>();
    const [editBook, { isLoading: isEditing }] = useEditBookMutation();

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

    if (isError || !book) {
        return <div>Error occurred while fetching book data</div>;
    }

    // Populate the form fields with the book data
    setValue('title', book.title);
    setValue('author', book.author);
    setValue('authorEmail', book.authorEmail);
    setValue('genre', book.genre);
    setValue('publicationDate', book.publicationDate);

    return (
        <div>
            <div className='container mx-auto p-4'>
                <h2 className='text-3xl font-bold text-center'>Edit <span className='text-primary'>New Book</span></h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 place-items-center my-8'>
                    <img className='rounded-3xl mb-6 lg:mb-0' src='https://img.freepik.com/free-psd/hard-cover-book-mockup-scene_358694-4809.jpg?w=996&t=st=1689526799~exp=1689527399~hmac=017d379c5c26b7289952ac63666252f89f43ddf589624ec129dae8556ace1f4d' alt='addbook' />
                    <form onSubmit={handleSubmit(onSubmit)} className='w-80 lg:w-96'>
                        <div>
                            <input type="text" id="title" {...register('title', { required: true })} placeholder="Title" className="input input-bordered input-primary w-full mb-4" />
                            {errors.title && <span>Title is required</span>}
                        </div>
                        <div>
                            <input type="text" id="author" {...register('author', { required: true })} placeholder="Author" className="input input-bordered input-primary w-full mb-4" />
                            {errors.author && <span>Author is required</span>}
                        </div>
                        <div>
                            <input type="text" id="authorEmail" {...register('authorEmail', { required: true })} placeholder="Author Email" className="input input-bordered input-primary w-full mb-4" />
                            {errors.authorEmail && <span>Author Email is required</span>}
                        </div>
                        <div>
                            <input type="text" id="genre" {...register('genre', { required: true })} placeholder="Genre" className="input input-bordered input-primary w-full mb-4" />
                            {errors.genre && <span>Genre is required</span>}
                        </div>
                        <div>
                            <input type="text" id="publicationDate" {...register('publicationDate', { required: true })} placeholder="Publication Date" className="input input-bordered input-primary w-full mb-4" />
                            {errors.publicationDate && <span>Publication Date is required</span>}
                        </div>
                        <div>
                            <input type="text" id="reviews" {...register('reviews')} placeholder="Reviews" className="input input-bordered input-primary w-full mb-4" />
                        </div>
                        <button type="submit" disabled={isEditing} className='btn btn-outline btn-primary'>
                            {isEditing ? 'Updating...' : 'Update Book'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditBook;