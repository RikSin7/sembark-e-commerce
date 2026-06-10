import { useSearchParams } from "react-router-dom";

function SortDropdown() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const sortValue = e.target.value;

    if (sortValue) newParams.set("sort", sortValue);
    else newParams.delete("sort");
    setSearchParams(newParams);
  };

  return (
    <div className="mb-6 p-4 border rounded-lg">
      <label htmlFor="sort" className="mr-2 font-semibold">Sort by:</label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="border rounded px-3 py-1 bg-white"
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="title-asc">Name: A to Z</option>
        <option value="title-desc">Name: Z to A</option>
      </select>
    </div>
  );
}

export default SortDropdown;