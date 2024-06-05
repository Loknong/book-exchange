import React, { useState } from "react";
import { Book } from "../../models/Books";
import { FILE_BASE_URL, addBook } from "../../api/api";
import { AxiosError } from "axios";
// title,
// author,
// genre,
// bookCondition,
// description,
// thumbnail

const Optional = () => {
  return <span className="text-red-300 text-sm">(option)</span>;
};

export default function AddBookForm() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [bookCondition, setBookCondition] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState<string | null>("");
  const [book, setBook] = useState<Book | null>(null);
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit form");
    if (!thumbnail) {
      setError("Thumbnail image is required");
      return;
    }

    // Form Data
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genreId", genre);
    formData.append("bookCondition", bookCondition);
    formData.append("description", description);
    formData.append("ownerId", "1");
    formData.append("thumbnail", thumbnail);

    try {
      setError(null);
      const book = await addBook(formData);
      setBook(book);
    } catch (err) {
      setBook(null);
      if (err instanceof AxiosError) {
        setError(err.response?.data.message || "An error occurred");
      } else {
        setError("Unexpected error");
      }
    }
  };
  console.log(book?.thumbnail);

  return (
    <div className="flex flex-row gap-3 justify-center">
      <form
        onSubmit={handleSubmitForm}
        className="bg-orange-200 max-w-xl w-full px-4 py-4 pb-6 rounded shadow-md"
      >
        <div>AddBookForm</div>
        {/* title */}
        <div className="my-4">
          <label htmlFor="title" className="block my-2 text-gray-800">
            Title
          </label>
          <input
            className="w-full px-4 py-2 rounded border border-orange-400"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* author */}
        <div className="my-4">
          <label htmlFor="author" className="block my-2 text-gray-800">
            Author <Optional />
          </label>
          <input
            className="w-full px-4 py-2 rounded border border-orange-400"
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* genre */}
        <div className="my-4">
          <label htmlFor="genre" className="block my-2 text-gray-800">
            Genre <Optional />
          </label>
          <input
            className="w-full px-4 py-2 rounded border border-orange-400"
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        {/* bookCondition */}
        <div className="my-4">
          <label htmlFor="bookCondition" className="block my-2 text-gray-800">
            Book Conditon
          </label>
          <input
            className="w-full px-4 py-2 rounded border border-orange-400"
            type="text"
            id="bookCondition"
            value={bookCondition}
            onChange={(e) => setBookCondition(e.target.value)}
            required
          />
        </div>

        {/* description */}
        <div className="my-4">
          <label htmlFor="description" className="block my-2 text-gray-800">
            Description <Optional />
          </label>
          <textarea
            className="w-full px-4 py-2 rounded border min-h-40"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* thumbnail */}
        <div className="my-4">
          <label htmlFor="thumbnail" className="block my-2 text-gray-800">
            Thumnbnail
          </label>
          <input
            className="w-full px-4 py-2 rounded border border-orange-400"
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={(e) =>
              setThumbnail(e.target.files ? e.target.files[0] : null)
            }
            required
          />
        </div>
        <button
          className="bg-yellow-600 text-white px-4 py-4 w-full rounded my-4"
          type="submit"
        >
          Add Book
        </button>
      </form>

      <div className="bg-gray-200 w-full max-w-md flex flex-col gap-3 rounded shadow-md">
        {/* <span> Preview Book Detail</span> */}
        {error && <div>{error}</div>}
        {book && (
          <div className="py-4 px-4 flex flex-col justify-start items-center">
            <span className="text-xl mb-2 text-gray-400 font-bold">
              Title: {book.title}
            </span>
            <img
              className="rounded-md shadow-md max-h-2/3"
              src={`${FILE_BASE_URL}/books/${book.thumbnail}`}
              alt={`${book.title}-${new Date()}`}
            />
            <div className="bg-gray-400 text-white py-8 px-8 my-5 w-full rounded shadow-md">
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Condition: {book.bookCondition}</p>
              <p>Description: {book.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
