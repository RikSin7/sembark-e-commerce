import { useEffect, useState } from "react";
import { getCategories } from "../api/productApi";
import { useSearchParams } from "react-router-dom";
import type { Category } from "../types";

function FilterPanel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const isValidCategory = (name: string) =>
    /^[a-zA-Z0-9\s&,'-]{2,50}$/.test(name);

  const visibleCategories = categories.filter((category) =>
    isValidCategory(category.name)
  );

  //get currently selected category IDs as array of strings
  const selectedIds = searchParams.get("categories")?.split(",").filter(Boolean) || [];

  const handleCheckboxChange = (categoryId: number, checked: boolean) => {
    const idStr = String(categoryId);
    let newSelected: string[];
    if (checked) newSelected = [...selectedIds, idStr];
    else newSelected = selectedIds.filter((id) => id !== idStr);

    const nextParams = new URLSearchParams(searchParams);
    if (newSelected.length > 0) nextParams.set("categories", newSelected.join(","));
    else nextParams.delete("categories");

    setSearchParams(nextParams);
  };

  return (
    <div className="mb-6 rounded border p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
        {visibleCategories.map((category) => (
          <label
            key={category.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(String(category.id))}
              onChange={(e) =>
                handleCheckboxChange(category.id, e.target.checked)
              }
            />
            <span>{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterPanel;