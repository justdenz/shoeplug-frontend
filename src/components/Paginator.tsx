import Pagination from "react-bootstrap/Pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const PaginationBasic = ({ page, totalPages }) => {
  const items = [];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePageSelect(number: number) {
    const params = new URLSearchParams(searchParams);
    if (number) {
      params.set("page", number.toString());
      params.delete("query");
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  for (let number = 1; number <= totalPages; number++) {
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
