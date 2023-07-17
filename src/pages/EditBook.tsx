import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetBookByIdQuery, useEditBookMutation } from '../redux/api/apiSlice';

type EditBookFormData = {
    title: string;
    author: string;
    authorEmail: string;
    genre: string;
    publicationDate: string;
};

function EditBook() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    // Check if the book ID is defined and not equal to 'undefined'
    const bookId = id !== undefined && id !== 'undefined' ? id : '';

    const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<EditBookFormData>();
    const [editBook, { isLoading: isEditing }] = useEditBookMutation();

    const onSubmit = async (data: EditBookFormData) => {
        try {
            await editBook({ id: id || '', book: data });
            console.log('Book updated successfully');
            // navigate('/managebook');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
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
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" {...register('title', { required: true })} />
                    {errors.title && <span>Title is required</span>}
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" {...register('author', { required: true })} />
                    {errors.author && <span>Author is required</span>}
                </div>
                <div>
                    <label htmlFor="authorEmail">Author Email:</label>
                    <input type="email" id="authorEmail" {...register('authorEmail', { required: true })} />
                    {errors.authorEmail && <span>Author Email is required</span>}
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" {...register('genre', { required: true })} />
                    {errors.genre && <span>Genre is required</span>}
                </div>
                <div>
                    <label htmlFor="publicationDate">Publication Date:</label>
                    <input type="text" id="publicationDate" {...register('publicationDate', { required: true })} />
                    {errors.publicationDate && <span>Publication Date is required</span>}
                </div>
                <button type="submit" disabled={isEditing}>
                    {isEditing ? 'Updating...' : 'Update Book'}
                </button>
            </form>
        </div>
    );
}

export default EditBook;