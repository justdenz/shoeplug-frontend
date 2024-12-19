import Pagination from "react-bootstrap/Pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const PaginationBasic = ({ page }) => {
  const [activePage, setActivePage] = useState(1);
  const items = [];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  console.log(page);
  function handlePageSelect(number: number) {
    setActivePage(number);
    const params = new URLSearchParams(searchParams);
    if (number) {
      params.set("page", number.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => handlePageSelect(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination size="lg">{items}</Pagination>
    </div>
  );
};

export default PaginationBasic;
