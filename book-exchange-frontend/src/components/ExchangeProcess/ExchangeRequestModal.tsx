import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalWrapper from "../ModalWrapper"; // Import ModalWrapper

// Define the Zod schema for validation
const schema = z.object({
    selectedBook: z.string().min(1, "Please select a book."),
    message: z.string().min(0, "Message cannot be empty."),
});

type ExchangeFormInputs = {
    selectedBook: string;
    message: string;
};

interface Book {
    title: string;
    coverId: number;
    author: string;
    subject: string;
}

interface ExchangeRequestModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const ExchangeRequestModal: React.FC<ExchangeRequestModalProps> = ({ isOpen, closeModal }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>("fiction");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ExchangeFormInputs>({
        resolver: zodResolver(schema),
    });

    const fetchBooks = async (subject: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=20`);
            const data = await response.json();
            const fetchedBooks = data.works.map((work: any) => ({
                title: work.title,
                coverId: work.cover_id || null,
                author: work.authors?.[0]?.name || "Unknown Author",
                subject: subject,
            }));
            setBooks(fetchedBooks);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching books:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchBooks(selectedSubject);
        }
    }, [isOpen, selectedSubject]);

    const handleBookClick = (bookTitle: string) => {
        setSelectedBook(bookTitle);
        setValue("selectedBook", bookTitle);
    };

    const onSubmit = async (data: ExchangeFormInputs) => {
        console.log("Submitting Exchange Offer", data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        closeModal();
    };



    return (
        <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Request Exchange</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Subject Filter */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Filter by Subject</label>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="fiction">Fiction</option>
                        <option value="science">Science</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="history">History</option>
                        <option value="art">Art</option>
                    </select>
                </div>

                {/* Grid View of Books */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Select a Book</label>
                    {isLoading ? (
                        <div>Loading books...</div>
                    ) : (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:max-h-60 md:max-h-[40vh] overflow-y-scroll">
                            {books.slice(0, 20).map((book, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleBookClick(book.title)}
                                    className={`border p-2 rounded cursor-pointer ${selectedBook === book.title ? "border-primary-light bg-orange-100" : "border-gray-300"}`}
                                >
                                    {book.coverId ? (
                                        <img
                                            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                                            alt={book.title}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                                            No Cover
                                        </div>
                                    )}
                                    <div className="text-sm font-medium mt-2">{book.title}</div>
                                    <div className="text-xs text-gray-500">{book.author}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {errors.selectedBook && <p className="text-red-500 text-sm mt-1">{errors.selectedBook.message}</p>}
                </div>

                {/* Message Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Message to Owner</label>
                    <textarea
                        {...register("message")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Add a message to the book owner..."
                        rows={10}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end space-x-2">
                    <button
                        type="button"
                        className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                        onClick={closeModal}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending Offer..." : "Send Offer"}
                    </button>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default ExchangeRequestModal;
