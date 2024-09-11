import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const showPagesCount = 3; // Number of pages to show at the start and end

    // Add first few pages
    for (let i = 1; i <= showPagesCount && i <= totalPages; i++) {
      pages.push(i);
    }

    // Ellipsis if there are more pages between start and end
    if (currentPage > showPagesCount + 1) {
      pages.push("...");
    }

    // Add pages around the current page
    const startPage = Math.max(currentPage - 1, showPagesCount + 1);
    const endPage = Math.min(currentPage + 1, totalPages - showPagesCount);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Ellipsis if there are more pages between start and end
    if (currentPage < totalPages - showPagesCount) {
      pages.push("...");
    }

    // Add last few pages
    for (let i = totalPages - showPagesCount + 1; i <= totalPages; i++) {
      if (i > showPagesCount) {
        pages.push(i);
      }
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border ${
            currentPage === page
              ? "bg-primary text-white"
              : "bg-white text-primary"
          }`}
        >
          {page}
        </button>
      ) : (
        <button
          key={index}
          onClick={() => {
            const pageNumber = parseInt(prompt("Enter the page number") || "1", 10);
            if (pageNumber > 0 && pageNumber <= totalPages) {
              onPageChange(pageNumber);
            }
          }}
          className="px-3 py-1 border bg-white text-primary"
        >
          ...
        </button>
      )
    );
  };

  return (
    <div className="mt-6 flex justify-center">
      <button
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
        className={`px-3 py-1 border rounded-l ${
          currentPage === 1 ? "bg-gray-200" : "bg-primary text-white"
        }`}
      >
        Previous
      </button>

      {renderPagination()}

      <button
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
        className={`px-3 py-1 border rounded-r ${
          currentPage === totalPages ? "bg-gray-200" : "bg-primary text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
