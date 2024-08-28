import ProductImg from "../../assets/book.jpg";
import OtherImage from "../../assets/images/complete.png";

// Enums for specific values
enum ConditionEnum {
    NEW = "New",
    USED_LIKE_NEW = "Used - Like New",
    USED_GOOD = "Used - Good",
    USED_ACCEPTABLE = "Used - Acceptable",
}

export enum AvailabilityStatusEnum {
    AVAILABLE = "Available",
    PENDING = "Pending",
    EXCHANGED = "Exchanged",
}

// Interface for the owner details
interface BookOwner {
    username: string;
    location: string;
    memberSince: string; // Assuming a string format like "January 2021"
}

// Interface for the exchange-related options
interface ExchangeOptions {
    preferredBooks: string[]; // Array of book titles that the owner prefers for exchange
    exchangeLocation: string; // Location where the exchange can occur
    exchangeCondition: string; // Condition required for the exchange
}

// Interface for availability details
interface Availability {
    status: AvailabilityStatusEnum;
    listedDate: string; // Assuming a string format for date like "August 15, 2024"
}

// Main Book interface
export interface Book {
    id: string; // Assuming the ID is a string
    title: string;
    author: string;
    condition: ConditionEnum;
    views: number;
    description: string;
    genres: string[]; // Array of genres
    language: string;
    images: string[]; // Array of image URLs or paths
    owner: BookOwner;
    exchangeOptions: ExchangeOptions;
    availability: Availability;
}

// Extended genres pool
const genresPool = [
    "Fiction", "Mystery", "Thriller", "Science Fiction", "Fantasy", "Romance",
    "Non-Fiction", "Biography", "Self-Help", "History", "Philosophy", "Science",
    "Business", "Poetry", "Horror", "Adventure", "Graphic Novel", "Memoir",
    "Young Adult", "Children's", "Drama", "Classics", "Crime", "Humor"
];

// Function to randomly select 1-2 genres from the pool
const getRandomGenres = () => {
    const shuffled = genresPool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 1);
};

// Mocking 50 book details
const books: Book[] = Array.from({ length: 1000 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Book Title ${i + 1}`,
    author: `Author ${i + 1}`,
    condition: Object.values(ConditionEnum)[Math.floor(Math.random() * Object.values(ConditionEnum).length)] as ConditionEnum,
    views: Math.floor(Math.random() * 1000),
    description: `This is the description for Book Title ${i + 1}. It's a fascinating book that covers a wide range of topics.`,
    genres: getRandomGenres(),
    language: "English",
    images: [ProductImg, OtherImage],
    owner: {
        username: `User${i + 1}`,
        location: `Location ${i + 1}`,
        memberSince: `January ${2021 + (i % 5)}`,
    },
    exchangeOptions: {
        preferredBooks: ["Book A", "Book B", "Book C"],
        exchangeLocation: "Local meet-up or mail",
        exchangeCondition: "Book of similar condition or better",
    },
    availability: {
        status: Object.values(AvailabilityStatusEnum)[Math.floor(Math.random() * Object.values(AvailabilityStatusEnum).length)] as AvailabilityStatusEnum,
        listedDate: `August ${15 + (i % 15)}, 2024`,
    },
}));


export default books;
