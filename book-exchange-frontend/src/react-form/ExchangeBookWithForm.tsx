import { useForm, SubmitHandler } from 'react-hook-form';

interface ExchangeBookFormInputs {
  selectedBook: string;
  yourBookTitle: string;
  yourBookCondition: string;
  message?: string;
}

function ExchangeBookForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ExchangeBookFormInputs>();

  const onSubmit: SubmitHandler<ExchangeBookFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Select a Book to Exchange:</label>
        <select {...register('selectedBook', { required: true })}>
          <option value="">Select a book</option>
          <option value="book1">Book 1</option>
          <option value="book2">Book 2</option>
          <option value="book3">Book 3</option>
        </select>
        {errors.selectedBook && <span>This field is required</span>}
      </div>

      <div>
        <label>Your Book Title:</label>
        <input
          type="text"
          {...register('yourBookTitle', { required: true, maxLength: 100 })}
          placeholder="Enter your book's title"
        />
        {errors.yourBookTitle && <span>This field is required</span>}
      </div>

      <div>
        <label>Your Book Condition:</label>
        <select {...register('yourBookCondition', { required: true })}>
          <option value="">Select condition</option>
          <option value="new">New</option>
          <option value="used-good">Used - Good</option>
          <option value="used-fair">Used - Fair</option>
        </select>
        {errors.yourBookCondition && <span>This field is required</span>}
      </div>

      <div>
        <label>Message to the Owner:</label>
        <textarea
          {...register('message')}
          placeholder="Optional message"
        />
      </div>

      <button type="submit">Submit Exchange Offer</button>
    </form>
  );
}

export default ExchangeBookForm;
