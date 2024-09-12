import React from "react";
import { FaArrowUp, FaArrowDown, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";

interface Offer {
    type: "sent" | "received";
    status: "accepted" | "rejected" | "pending";
    bookTitle: string;
    bookCover: string;
    otherUser: string;
    timestamp: string;
}

const offerData: Offer[] = [
    {
        type: "sent",
        status: "accepted",
        bookTitle: "The Great Gatsby",
        bookCover: "https://covers.openlibrary.org/b/id/8221256-L.jpg",
        otherUser: "UserA",
        timestamp: "2024-09-10",
    },
    {
        type: "received",
        status: "pending",
        bookTitle: "Moby Dick",
        bookCover: "https://covers.openlibrary.org/b/id/7227890-L.jpg",
        otherUser: "UserB",
        timestamp: "2024-09-09",
    },
    {
        type: "sent",
        status: "rejected",
        bookTitle: "1984",
        bookCover: "https://covers.openlibrary.org/b/id/8244913-L.jpg",
        otherUser: "UserC",
        timestamp: "2024-09-08",
    },
    {
        type: "received",
        status: "accepted",
        bookTitle: "War and Peace",
        bookCover: "https://covers.openlibrary.org/b/id/8197329-L.jpg",
        otherUser: "UserD",
        timestamp: "2024-09-07",
    },
    {
        type: "sent",
        status: "pending",
        bookTitle: "Pride and Prejudice",
        bookCover: "https://covers.openlibrary.org/b/id/8153318-L.jpg",
        otherUser: "UserE",
        timestamp: "2024-09-06",
    },
    {
        type: "sent",
        status: "pending",
        bookTitle: "Pride and Prejudice",
        bookCover: "https://covers.openlibrary.org/b/id/8153318-L.jpg",
        otherUser: "UserE",
        timestamp: "2024-09-06",
    },
    {
        type: "sent",
        status: "pending",
        bookTitle: "Pride and Prejudice",
        bookCover: "https://covers.openlibrary.org/b/id/8153318-L.jpg",
        otherUser: "UserE",
        timestamp: "2024-09-06",
    },
];

const OfferActivity: React.FC = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-h-[56rem] overflow-auto scrollbar-hide">
            
            <div className="grid grid-cols-1 gap-4">
                {offerData.slice(0, 10).map((offer, index) => (
                    <div
                        key={index}
                        className={`flex items-center p-4 rounded-lg border ${offer.status === "accepted"
                            ? "border-green-500 bg-green-100"
                            : offer.status === "rejected"
                                ? "border-red-500 bg-red-100"
                                : "border-yellow-500 bg-yellow-100"
                            }`}
                    >
                        {/* Offer Type Icon */}
                        <div className="mr-4">
                            {offer.type === "sent" ? (
                                <FaArrowUp className="text-lg text-blue-500" />
                            ) : (
                                <FaArrowDown className="text-lg text-orange-500" />
                            )}
                        </div>

                        {/* Book Info */}
                        <div className="flex items-center space-x-4">
                            <img
                                src={offer.bookCover}
                                alt={offer.bookTitle}
                                className="w-16 h-20 object-cover rounded-md"
                            />
                            <div>
                                <h4 className="text-md font-semibold">{offer.bookTitle}</h4>
                                <p className="text-sm text-gray-500">With {offer.otherUser}</p>
                                <p className="text-xs text-gray-400">{offer.timestamp}</p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="ml-auto flex items-center space-x-2">
                            {offer.status === "accepted" && (
                                <FaCheckCircle className="text-green-500 text-2xl" />
                            )}
                            {offer.status === "rejected" && (
                                <FaTimesCircle className="text-red-500 text-2xl" />
                            )}
                            {offer.status === "pending" && (
                                <FaHourglassHalf className="text-yellow-500 text-2xl" />
                            )}
                            <span className="text-sm font-semibold capitalize">
                                {offer.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OfferActivity;
