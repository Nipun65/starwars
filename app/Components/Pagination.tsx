"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";

const Pagination = ({
  totalCount,
  handleChange,
  perPageContent,
  currentPage,
}: any) => {
  const maxPagesToShow = 10;
  const totalPages = Math.ceil(totalCount / perPageContent);
  const currentBlock = Math.floor((currentPage - 1) / maxPagesToShow);
  const startPage = currentBlock * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  const router = useRouter();

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handleChange(currentPage - 1);
      router.push(`/characters/${currentPage - 1}`);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handleChange(currentPage + 1);
      router.push(`/characters/${currentPage + 1}`);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        className="border border-white p-2 cursor-pointer bg-black disabled:opacity-50 rounded-l-md hover:text-white hover:opacity-80 text-[#ffe81f]"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        prev
      </Button>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index;
        return (
          <Button
            key={pageNumber}
            className={`border border-white px-3 py-2 cursor-pointer ${
              pageNumber === currentPage
                ? "bg-[#ffe81f] text-black hover:text-white hover:opacity-80"
                : "bg-black text-white hover:text-[#ffe81f] hover:opacity-80"
            }`}
            onClick={() => handleChange(pageNumber)}
            onKeyPress={(e: any) => {
              if (e.key === "Enter" || e.key === " ") {
                handleChange(pageNumber);
              }
            }}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        className="border border-white p-2 cursor-pointer bg-black text-[#ffe81f] hover:text-white hover:opacity-80 disabled:opacity-50 rounded-r-md"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;
