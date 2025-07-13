// import Pagination from "react-bootstrap/Pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "@mui/material/Pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
}

const PaginationBasic: React.FC<PaginationProps> = ({ page, totalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePageSelect(event: unknown, value: { toString: () => string }) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("page", value.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="justify-items-center">
      <Pagination
        count={Math.ceil(totalPages)}
        siblingCount={1}
        page={page}
        onChange={handlePageSelect}
        size="large"
      />
    </div>
  );
};

export default PaginationBasic;
